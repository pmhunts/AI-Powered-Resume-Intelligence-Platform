import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import apiService from '../services/apiService';
import initialResumeData from '../data/initialData';

const ResumeContext = createContext();

export const useResume = () => {
    const context = useContext(ResumeContext);
    if (!context) {
        throw new Error('useResume must be used within a ResumeProvider');
    }
    return context;
};

export const ResumeProvider = ({ children }) => {
    // State
    const [resumeData, setResumeData] = useState(initialResumeData);
    const [jdText, setJdText] = useState('');
    const [analysisResults, setAnalysisResults] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [currentView, setCurrentView] = useState('LANDING'); // LANDING, JD_INPUT, DASHBOARD, EDITOR

    // actions
    const updateResumeData = (newData) => {
        setResumeData(newData);
    };

    const runAnalysis = async (text) => {
        console.log("Starting Analysis with text length:", text.length);
        setJdText(text);
        setIsAnalyzing(true);
        const toastId = toast.loading('Analyzing JD...');

        try {
            // Step 1: Analyze JD
            const jdAnalysisResponse = await apiService.analyzeJD(text);

            if (!jdAnalysisResponse.success) {
                throw new Error(jdAnalysisResponse.error || 'JD Analysis failed');
            }

            const jdData = jdAnalysisResponse.data;
            toast.loading('Scoring Resume...', { id: toastId });

            // Step 2: Score Resume
            const response = await apiService.scoreResume(resumeData, {
                ...jdData,
                text: text
            });

            if (response.success) {
                setAnalysisResults(response.data);
                setCurrentView('DASHBOARD');
                toast.success('Analysis Complete', { id: toastId });
            } else {
                throw new Error(response.error || 'Analysis failed');
            }
        } catch (error) {
            console.error("Analysis Failed:", error);
            toast.error(error.message || "Analysis Failed", { id: toastId });
            setAnalysisResults(null);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const exportPDF = async () => {
        await apiService.downloadPDF(resumeData, resumeData.personalInfo?.name || 'Resume');
    };

    const value = {
        resumeData,
        updateResumeData,
        jdText,
        analysisResults,
        isAnalyzing,
        runAnalysis,
        exportPDF,
        currentView,
        setCurrentView
    };

    return (
        <ResumeContext.Provider value={value}>
            {children}
        </ResumeContext.Provider>
    );
};
