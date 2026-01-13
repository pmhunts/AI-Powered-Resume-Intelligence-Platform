import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, Sparkles, FileText, Loader2 } from 'lucide-react';
import Button from './ui/Button';
import Card from './ui/Card';
import ProgressBar from './ui/ProgressBar';

const JDInputView = ({ onAnalyze, isAnalyzing }) => {
    const [jdText, setJdText] = useState('');
    const [uploadMethod, setUploadMethod] = useState('paste'); // 'paste' or 'upload'

    const handleAnalyzeClick = () => {
        if (!jdText) return;
        onAnalyze(jdText);
    };

    const characterCount = jdText.length;
    const wordCount = jdText.trim() ? jdText.trim().split(/\s+/).length : 0;
    const isValid = wordCount >= 50; // Minimum 50 words for meaningful analysis

    return (
        <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] float" />
                <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-secondary/20 rounded-full blur-[100px] float" style={{ animationDelay: '1.5s' }} />
            </div>

            <div className="relative z-10 flex-1 flex flex-col">
                {/* Header with Steps */}
                <div className="max-w-4xl mx-auto w-full px-6 pt-12 pb-6">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                                    1
                                </div>
                                <span className="font-semibold text-white">Job Description</span>
                            </div>
                            <div className="h-px w-12 bg-white/10" />
                            <div className="flex items-center gap-2 opacity-50">
                                <div className="w-8 h-8 rounded-full bg-bg-tertiary flex items-center justify-center text-text-muted font-bold text-sm">
                                    2
                                </div>
                                <span className="text-text-muted">Analysis</span>
                            </div>
                            <div className="h-px w-12 bg-white/10" />
                            <div className="flex items-center gap-2 opacity-50">
                                <div className="w-8 h-8 rounded-full bg-bg-tertiary flex items-center justify-center text-text-muted font-bold text-sm">
                                    3
                                </div>
                                <span className="text-text-muted">Optimize</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex items-center justify-center px-6 pb-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="w-full max-w-4xl space-y-8"
                    >
                        {/* Title Section */}
                        <div className="text-center space-y-4">
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex"
                            >
                                <span className="badge badge-primary text-base px-4 py-2">
                                    <Sparkles className="w-4 h-4" />
                                    Step 1: Input Job Description
                                </span>
                            </motion.div>

                            <h2 className="text-4xl md:text-5xl font-bold">
                                Paste the <span className="gradient-text">Job Description</span>
                            </h2>

                            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                                Our AI will analyze keywords, required skills, and experience levels to tailor your resume perfectly.
                            </p>


                        </div>

                        {/* Input Method Tabs */}
                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={() => setUploadMethod('paste')}
                                className={`px-6 py-2 rounded-lg font-semibold transition-all ${uploadMethod === 'paste'
                                    ? 'bg-primary text-white'
                                    : 'bg-bg-tertiary text-text-secondary hover:bg-bg-elevated'
                                    }`}
                            >
                                Paste Text
                            </button>
                            <button
                                onClick={() => setUploadMethod('upload')}
                                className={`px-6 py-2 rounded-lg font-semibold transition-all ${uploadMethod === 'upload'
                                    ? 'bg-primary text-white'
                                    : 'bg-bg-tertiary text-text-secondary hover:bg-bg-elevated'
                                    }`}
                            >
                                <Upload className="w-4 h-4 inline mr-2" />
                                Upload File
                            </button>
                        </div>

                        {/* Input Area */}
                        {uploadMethod === 'paste' ? (
                            <Card variant="glass" hover={false} className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent-pink rounded-2xl opacity-20 group-hover:opacity-30 blur transition-opacity" />
                                <div className="relative">
                                    <textarea
                                        value={jdText}
                                        onChange={(e) => setJdText(e.target.value)}
                                        placeholder="Paste the full job description here...

Include job title, responsibilities, requirements, and any specific skills or keywords mentioned."
                                        className="w-full h-80 bg-transparent text-text-primary p-6 focus:outline-none resize-none text-base leading-relaxed placeholder:text-text-muted"
                                    />

                                    {/* Character/Word Count */}
                                    <div className="flex justify-between items-center px-6 pb-4 text-sm">
                                        <div className="flex gap-4 text-text-muted">
                                            <span>{wordCount} words</span>
                                            <span>•</span>
                                            <span>{characterCount} characters</span>
                                        </div>
                                        {wordCount > 0 && (
                                            <span className={`font-semibold ${isValid ? 'text-success' : 'text-warning'}`}>
                                                {isValid ? '✓ Sufficient' : `${50 - wordCount} more words needed`}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        ) : (
                            <Card variant="glass" hover={false} className="relative group">
                                <div className="flex flex-col items-center justify-center py-16 px-6">
                                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <Upload className="w-10 h-10 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-2">Upload Job Description</h3>
                                    <p className="text-text-secondary text-center mb-6">
                                        Drag and drop or click to upload (.txt, .pdf, .docx)
                                    </p>
                                    <Button variant="secondary">
                                        Choose File
                                    </Button>
                                </div>
                            </Card>
                        )}

                        {/* Analyze Button */}
                        <div className="flex flex-col items-center gap-4">
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={handleAnalyzeClick}
                                disabled={!isValid || isAnalyzing}
                                loading={isAnalyzing}
                                className="min-w-[300px]"
                                icon={!isAnalyzing && <Sparkles size={20} />}
                            >
                                {isAnalyzing ? 'Analyzing with AI...' : 'Analyze Job Description'}
                            </Button>

                            {/* Progress Bar during analysis */}
                            {isAnalyzing && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="w-full max-w-md"
                                >
                                    <ProgressBar value={100} variant="primary" height="md" showLabel={false} />
                                    <p className="text-center text-sm text-text-secondary mt-2">
                                        🤖 Extracting keywords and analyzing requirements...
                                    </p>
                                </motion.div>
                            )}

                            {!isAnalyzing && (
                                <p className="text-sm text-text-muted text-center">
                                    Analysis takes ~2 seconds  •  100% secure & confidential
                                </p>
                            )}
                        </div>

                        {/* Trust Indicators */}
                        <div className="flex flex-wrap justify-center gap-6 pt-6 text-sm text-text-muted">
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                                    <span className="text-success text-xs">✓</span>
                                </div>
                                <span>AI-Powered Analysis</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                                    <span className="text-success text-xs">✓</span>
                                </div>
                                <span>90%+ Match Rate</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                                    <span className="text-success text-xs">✓</span>
                                </div>
                                <span>Instant Results</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default JDInputView;
