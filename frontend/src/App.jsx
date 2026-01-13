import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/Sidebar';
import LandingPage from './components/LandingPage';
import JDInputView from './components/JDInputView';
import ResumeEditor from './components/ResumeEditor';
import GapAnalysisDashboard from './components/GapAnalysisDashboard';
import InterviewerMode from './components/InterviewerMode';
import ScoreWidget from './components/ScoreWidget';
import { ResumeProvider, useResume } from './context/ResumeContext';

// Main Content Component that consumes the Context
const AppContent = () => {
  const {
    currentView,
    setCurrentView,
    resumeData,
    updateResumeData,
    runAnalysis,
    isAnalyzing,
    analysisResults,
    exportPDF
  } = useResume();

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
                            onClick={exportPDF}
                            className="bg-primary hover:bg-primary-dark px-6 py-2 rounded-xl text-white font-bold transition-all shadow-lg hover:shadow-primary/25"
                          >
                            Export PDF
                          </button>
                        </div>
                      </div>
                      <div className="flex-1 min-h-0">
                        <ResumeEditor initialData={resumeData} onUpdate={updateResumeData} />
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
                              { name: "Formatting", score: analysisResults?.ats_score?.breakdown?.format_compliance || 0 },
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

  return renderView();
};

function App() {
  return (
    <div className="font-sans antialiased text-text-primary bg-bg-primary min-h-screen selection:bg-primary/30">
      <Toaster position="top-right" toastOptions={{
        style: {
          background: '#1E293B',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.1)'
        }
      }} />
      <ResumeProvider>
        <AppContent />
      </ResumeProvider>
    </div>
  );
}

export default App;
