import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, TrendingUp, Award, Target, Zap } from 'lucide-react';
import { CircularProgress } from './ui/ProgressBar';
import Card from './ui/Card';
import Badge from './ui/Badge';

const ScoreWidget = ({ score = 0, breakdown = [], industryAverage = 68 }) => {
    const [expanded, setExpanded] = useState(false);
    const [animatedScore, setAnimatedScore] = useState(0);

    useEffect(() => {
        // Animate score counting up
        const duration = 1500;
        const steps = 60;
        const increment = score / steps;
        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            if (currentStep <= steps) {
                setAnimatedScore(Math.min(Math.round(increment * currentStep), score));
            } else {
                clearInterval(timer);
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [score]);

    const getColor = (s) => {
        if (s >= 85) return 'success';
        if (s >= 70) return 'warning';
        return 'danger';
    };

    const getLabel = (s) => {
        if (s >= 85) return 'EXCELLENT';
        if (s >= 70) return 'GOOD';
        return 'NEEDS WORK';
    };

    const getGrade = (s) => {
        if (s >= 90) return 'A+';
        if (s >= 85) return 'A';
        if (s >= 80) return 'B+';
        if (s >= 75) return 'B';
        if (s >= 70) return 'C+';
        if (s >= 65) return 'C';
        return 'D';
    };

    const scoreDifference = score - industryAverage;
    const isAboveAverage = scoreDifference > 0;

    return (
        <Card variant="glass" hover={false} className="h-full">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-text-secondary font-bold text-sm tracking-widest uppercase">ATS SCORE</h3>
                    <p className="text-xs text-text-muted mt-1">Applicant Tracking System</p>
                </div>
                <Badge variant={getColor(score)}>
                    {getLabel(score)}
                </Badge>
            </div>

            {/* Main Score Display */}
            <div className="flex flex-col items-center mb-8">
                <CircularProgress
                    value={animatedScore}
                    max={100}
                    size={160}
                    strokeWidth={10}
                    variant={getColor(score) === 'success' ? 'success' : getColor(score) === 'warning' ? 'warning' : 'danger'}
                />

                {/* Grade Badge */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                    className="mt-6"
                >
                    <div className="px-6 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold text-xl">
                        Grade: {getGrade(score)}
                    </div>
                </motion.div>
            </div>

            {/* Comparison with Industry Average */}
            <div className="mb-6 p-4 rounded-xl bg-bg-tertiary/50 border border-white/5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-text-muted" />
                        <span className="text-sm text-text-secondary">vs Industry Avg</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-text-muted text-sm">{industryAverage}%</span>
                        <div className={`flex items-center gap-1 font-bold ${isAboveAverage ? 'text-success' : 'text-danger'}`}>
                            <TrendingUp className={`w-4 h-4 ${!isAboveAverage && 'rotate-180'}`} />
                            <span>{isAboveAverage ? '+' : ''}{scoreDifference}%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toggle Breakdown */}
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full flex items-center justify-center gap-2 text-text-secondary hover:text-white transition-all py-3 border-t border-white/5 group"
            >
                <span className="text-sm font-semibold">View Detailed Breakdown</span>
                <motion.div
                    animate={{ rotate: expanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronDown className="w-4 h-4 group-hover:text-primary transition-colors" />
                </motion.div>
            </button>

            {/* Animated Breakdown Content */}
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-6 space-y-4 border-t border-white/5 mt-4">
                            {breakdown.length > 0 ? breakdown.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="space-y-2"
                                >
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <Zap className="w-3 h-3 text-primary" />
                                            <span className="text-sm text-text-primary font-medium">{item.name}</span>
                                        </div>
                                        <span className="text-sm font-bold text-white">{item.score}%</span>
                                    </div>
                                    <div className="h-2 bg-bg-tertiary rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${item.score}%` }}
                                            transition={{ delay: 0.2 + (i * 0.1), duration: 0.8, ease: 'easeOut' }}
                                            className={`h-full rounded-full ${item.score >= 85 ? 'gradient-success' :
                                                item.score >= 70 ? 'bg-warning' :
                                                    'bg-danger'
                                                }`}
                                        />
                                    </div>
                                </motion.div>
                            )) : (
                                <p className="text-xs text-text-muted text-center py-4">
                                    Run analysis to see detailed breakdown
                                </p>
                            )}

                            {breakdown.length > 0 && (
                                <div className="pt-4 border-t border-white/5">
                                    <div className="flex items-start gap-2 text-xs text-text-muted">
                                        <Award className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                        <p>
                                            Your score is <span className="font-bold text-primary">{scoreDifference > 0 ? 'above' : 'below'}</span> the {industryAverage}% industry average for this role.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Card>
    );
};

export default ScoreWidget;
