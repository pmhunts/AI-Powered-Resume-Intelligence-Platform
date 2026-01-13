import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import LandingPage from './components/LandingPage';
import JDInputView from './components/JDInputView';
import ResumeEditor from './components/ResumeEditor';
import GapAnalysisDashboard from './components/GapAnalysisDashboard';
import InterviewerMode from './components/InterviewerMode';
import ScoreWidget from './components/ScoreWidget';
import initialResumeData from './data/initialData';
import apiService from './services/apiService';

function App() {
  const [currentView, setCurrentView] = useState('LANDING'); // LANDING, JD_INPUT, DASHBOARD, EDITOR
  const [resumeData, setResumeData] = useState(initialResumeData);
  const [jdText, setJdText] = useState('');
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Real-time Analysis Logic with Backend API
  const runAnalysis = async (text) => {
    console.log("Starting Analysis with text length:", text.length);
    setJdText(text);
    setIsAnalyzing(true);
    const toastId = toast.loading('Analyzing JD...');

    try {
      // Step 1: Analyze JD to extract structured data (skills, role, etc.)
      console.log("Step 1: Calling analyzeJD...");
      const jdAnalysisResponse = await apiService.analyzeJD(text);
      console.log("Step 1 Response:", jdAnalysisResponse);

      if (!jdAnalysisResponse.success) {
        throw new Error(jdAnalysisResponse.error || 'JD Analysis failed');
      }

      const jdData = jdAnalysisResponse.data;
      toast.loading('Scoring Resume...', { id: toastId });

      // Step 2: Score Resume against the analyzed JD
      console.log("Step 2: Calling scoreResume with data:", jdData);
      const response = await apiService.scoreResume(resumeData, {
        ...jdData,
        text: text
      });
      console.log("Step 2 Response:", response);

      if (response.success) {
        setAnalysisResults(response.data);
        setCurrentView('DASHBOARD');
        toast.dismiss(toastId);
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

  // PDF Export Handler
  const handleExportPDF = async () => {
    await apiService.downloadPDF(resumeData, resumeData.personalInfo?.name || 'Resume');
  };

  const renderView = () => {
    switch (currentView) {
      case 'LANDING':
        return <LandingPage onGetStarted={() => setCurrentView('JD_INPUT')} />;

      case 'JD_INPUT':
        return <JDInputView onAnalyze={runAnalysis} isAnalyzing={isAnalyzing} />;

      case 'DASHBOARD':
      case 'EDITOR':
        return (
          <div className="flex bg-bg-primary min-h-screen text-text-primary">
            <Sidebar currentView={currentView} setView={setCurrentView} />
            <main className="flex-1 md:ml-64 p-8 overflow-y-auto h-screen">
              <AnimatePresence mode='wait'>
                <motion.div
                  key={currentView}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  {currentView === 'EDITOR' && (
                    <div className="space-y-6 h-full flex flex-col">
                      <div className="flex justify-between items-center">
                        <div>
                          <h2 className="text-3xl font-bold text-white">Resume Editor</h2>
                          <p className="text-text-secondary text-sm">Craft your ATS-optimized resume.</p>
                        </div>
                        <div className="flex gap-4">
                          {analysisResults?.ats_score && (
                            <div className="flex items-center gap-2 bg-bg-secondary px-4 py-2 rounded-lg border border-white/5">
                              <span className="text-text-secondary text-sm">ATS Score:</span>
                              <span className="text-green-400 font-bold">{analysisResults.ats_score.overall_score}%</span>
                            </div>
                          )}
                          <button
                            onClick={handleExportPDF}
                            className="bg-primary hover:bg-primary-dark px-6 py-2 rounded-xl text-white font-bold transition-all shadow-lg hover:shadow-primary/25"
                          >
                            Export PDF
                          </button>
                        </div>
                      </div>
                      <div className="flex-1 min-h-0">
                        <ResumeEditor initialData={resumeData} onUpdate={setResumeData} />
                      </div>
                    </div>
                  )}
                  {currentView === 'DASHBOARD' && (
                    <div className="space-y-8 max-w-6xl mx-auto pb-20">
                      <div className="flex justify-between items-end">
                        <div>
                          <h2 className="text-4xl font-bold text-white mb-2">Analysis Dashboard</h2>
                          <p className="text-text-secondary">Insights and recommendations for {resumeData.personalInfo.name}</p>
                        </div>
                        <button
                          onClick={() => setCurrentView('EDITOR')}
                          className="bg-primary hover:bg-primary-dark px-6 py-3 rounded-xl text-white font-bold shadow-lg hover:scale-105 transition-all"
                        >
                          Edit Resume →
                        </button>
                      </div>

                      {/* Score Widget Section */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Main Score */}
                        <div className="md:col-span-1">
                          <ScoreWidget
                            score={analysisResults?.ats_score?.overall_score || 0}
                            breakdown={[
                              { name: "Skills Match", score: analysisResults?.ats_score?.breakdown?.skill_match || 0 },
                              { name: "Keywords", score: analysisResults?.ats_score?.breakdown?.keyword_coverage || 0 },
                              { name: "Experience", score: analysisResults?.ats_score?.breakdown?.experience_relevance || 0 },
                              { name: "Formatting", score: analysisResults?.ats_score?.breakdown?.formatting || 0 },
                            ]}
                            industryAverage={analysisResults?.ats_score?.industry_average || 68}
                          />
                        </div>

                        {/* Recruiter Sim */}
                        <div className="md:col-span-2 h-full">
                          <InterviewerMode simulation={analysisResults?.interviewer_simulation} />
                        </div>
                      </div>

                      {/* Gap Analysis */}
                      <div>
                        <GapAnalysisDashboard analysis={analysisResults?.gap_analysis} />
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        );
      default:
        return <div>View Not Found</div>;
    }
  };

  return (
    <div className="font-sans antialiased text-text-primary bg-bg-primary min-h-screen selection:bg-primary/30">
      <Toaster position="top-right" toastOptions={{
        style: {
          background: '#1E293B',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.1)'
        }
      }} />
      {renderView()}
    </div>
  );
}

export default App;
