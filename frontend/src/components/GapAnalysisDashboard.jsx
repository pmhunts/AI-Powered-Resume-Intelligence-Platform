import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle2, ArrowRight, Zap, Sparkles, TrendingUp, ChevronDown, Star, AlertCircle } from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';
import Badge from './ui/Badge';

const SuggestionCard = ({ suggestion, index }) => {
    const [expanded, setExpanded] = useState(false);

    const priorityColors = {
        High: 'danger',
        Medium: 'warning',
        Low: 'secondary'
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
        >
            <Card variant="glass" hover={true} className="group">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-4 flex-1">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${suggestion.priority === 'High' ? 'bg-danger/20 text-danger' :
                                suggestion.priority === 'Medium' ? 'bg-warning/20 text-warning' :
                                    'bg-bg-tertiary text-text-secondary'
                            }`}>
                            {suggestion.priority === 'High' ? <AlertTriangle size={20} /> :
                                suggestion.priority === 'Medium' ? <AlertCircle size={20} /> :
                                    <Sparkles size={20} />}
                        </div>

                        <div className="flex-1 space-y-3">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <h4 className="font-bold text-white text-base">{suggestion.title}</h4>
                                    <Badge variant={priorityColors[suggestion.priority]} size="sm">
                                        {suggestion.priority}
                                    </Badge>
                                    {suggestion.aiGenerated && (
                                        <Badge variant="primary" size="sm">
                                            <Sparkles className="w-3 h-3" />
                                            AI
                                        </Badge>
                                    )}
                                </div>
                                <p className="text-sm text-text-secondary">
                                    Category: <span className="text-text-primary font-medium">{suggestion.category}</span>
                                </p>
                            </div>

                            {/* Current vs Suggested */}
                            <div className="space-y-2">
                                <div className="bg-bg-primary/50 p-3 rounded-lg border border-white/5">
                                    <p className="text-xs font-semibold text-text-muted uppercase mb-1 flex items-center gap-1">
                                        Current
                                    </p>
                                    <p className="text-sm text-text-secondary">
                                        {suggestion.current}
                                    </p>
                                </div>

                                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-3 rounded-lg border border-primary/20">
                                    <p className="text-xs font-semibold text-primary uppercase mb-1 flex items-center gap-1">
                                        <Sparkles className="w-3 h-3" />
                                        AI Suggestion
                                    </p>
                                    <p className="text-sm text-white font-medium">
                                        {suggestion.suggested}
                                    </p>
                                </div>
                            </div>

                            {/* Impact */}
                            <div className="flex items-start gap-2 text-sm">
                                <TrendingUp className="w-4 h-4 text-success flex-shrink-0 mt-1" />
                                <p className="text-text-secondary">
                                    <span className="font-semibold text-success">Impact:</span> {suggestion.impact}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Action Button */}
                    <Button
                        variant="primary"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        Apply
                        <ArrowRight size={14} />
                    </Button>
                </div>
            </Card>
        </motion.div>
    );
};

const StrengthCard = ({ strength, index }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1 }}
    >
        <Card variant="glass" hover={false} className="border-l-4 border-success">
            <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-white">{strength.area}</h4>
                        <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-success text-success" />
                            <span className="text-sm font-bold text-success">{strength.score}%</span>
                        </div>
                    </div>
                    <p className="text-sm text-text-secondary">{strength.description}</p>
                </div>
            </div>
        </Card>
    </motion.div>
);

const GapAnalysisDashboard = ({ analysis }) => {
    const [activeTab, setActiveTab] = useState('suggestions'); // 'suggestions' | 'strengths' | 'keywords'

    if (!analysis) {
        return (
            <Card variant="glass" className="text-center py-12">
                <Sparkles className="w-16 h-16 text-text-muted mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">No Analysis Yet</h3>
                <p className="text-text-secondary">Run an analysis to see gaps and suggestions</p>
            </Card>
        );
    }

    const suggestions = analysis.improvement_suggestions || [];
    const strengths = analysis.strengths || [];
    const keywordGaps = analysis.keyword_gaps || [];
    const missingSkills = analysis.missing_skills || [];

    const highPriority = suggestions.filter(s => s.priority === 'High').length;
    const mediumPriority = suggestions.filter(s => s.priority === 'Medium').length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h3 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        <span className="w-1.5 h-8 bg-gradient-to-b from-primary to-secondary rounded-full" />
                        Gap Analysis & Recommendations
                    </h3>
                    <p className="text-text-secondary">AI-powered insights to boost your ATS score</p>
                </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card variant="glass" hover={false} className="text-center">
                    <div className="text-3xl font-bold gradient-text mb-1">{suggestions.length}</div>
                    <div className="text-sm text-text-secondary">Total Suggestions</div>
                </Card>
                <Card variant="glass" hover={false} className="text-center border-l-2 border-danger">
                    <div className="text-3xl font-bold text-danger mb-1">{highPriority}</div>
                    <div className="text-sm text-text-secondary">High Priority</div>
                </Card>
                <Card variant="glass" hover={false} className="text-center border-l-2 border-warning">
                    <div className="text-3xl font-bold text-warning mb-1">{mediumPriority}</div>
                    <div className="text-sm text-text-secondary">Medium Priority</div>
                </Card>
                <Card variant="glass" hover={false} className="text-center border-l-2 border-success">
                    <div className="text-3xl font-bold text-success mb-1">{strengths.length}</div>
                    <div className="text-sm text-text-secondary">Strengths</div>
                </Card>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-white/5">
                <button
                    onClick={() => setActiveTab('suggestions')}
                    className={`px-6 py-3 font-semibold transition-all relative ${activeTab === 'suggestions'
                            ? 'text-primary'
                            : 'text-text-muted hover:text-text-secondary'
                        }`}
                >
                    AI Suggestions
                    {activeTab === 'suggestions' && (
                        <motion.div
                            layoutId="activeTab"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
                        />
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('strengths')}
                    className={`px-6 py-3 font-semibold transition-all relative ${activeTab === 'strengths'
                            ? 'text-primary'
                            : 'text-text-muted hover:text-text-secondary'
                        }`}
                >
                    Your Strengths
                    {activeTab === 'strengths' && (
                        <motion.div
                            layoutId="activeTab"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
                        />
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('keywords')}
                    className={`px-6 py-3 font-semibold transition-all relative ${activeTab === 'keywords'
                            ? 'text-primary'
                            : 'text-text-muted hover:text-text-secondary'
                        }`}
                >
                    Keyword Gaps
                    {activeTab === 'keywords' && (
                        <motion.div
                            layoutId="activeTab"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
                        />
                    )}
                </button>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
                {activeTab === 'suggestions' && (
                    <motion.div
                        key="suggestions"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4"
                    >
                        {suggestions.length > 0 ? (
                            suggestions.map((suggestion, i) => (
                                <SuggestionCard key={suggestion.id || i} suggestion={suggestion} index={i} />
                            ))
                        ) : (
                            <Card variant="glass" className="text-center py-12">
                                <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-success mb-2">Perfect Match!</h3>
                                <p className="text-text-secondary">No improvement suggestions needed</p>
                            </Card>
                        )}
                    </motion.div>
                )}

                {activeTab === 'strengths' && (
                    <motion.div
                        key="strengths"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="grid md:grid-cols-2 gap-4"
                    >
                        {strengths.map((strength, i) => (
                            <StrengthCard key={i} strength={strength} index={i} />
                        ))}
                    </motion.div>
                )}

                {activeTab === 'keywords' && (
                    <motion.div
                        key="keywords"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4"
                    >
                        <Card variant="glass">
                            <h4 className="font-bold text-white mb-4">Missing Keywords</h4>
                            <div className="space-y-3">
                                {keywordGaps.map((gap, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 bg-bg-primary/50 rounded-lg">
                                        <span className="text-text-primary font-medium">{gap.keyword}</span>
                                        <div className="flex items-center gap-4 text-sm">
                                            <span className="text-text-muted">
                                                Found: <span className={gap.found ? 'text-success' : 'text-danger'}>{gap.occurrences}</span>
                                            </span>
                                            <span className="text-text-muted">
                                                Recommended: <span className="text-primary">{gap.recommended}</span>
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <Card variant="glass">
                            <h4 className="font-bold text-white mb-4">Missing Skills</h4>
                            <div className="grid md:grid-cols-2 gap-3">
                                {missingSkills.map((skill, i) => (
                                    <div key={i} className="p-3 bg-bg-primary/50 rounded-lg">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-semibold text-white">{skill.skill}</span>
                                            <Badge variant={skill.importance === 'High' ? 'danger' : 'warning'} size="sm">
                                                {skill.importance}
                                            </Badge>
                                        </div>
                                        <p className="text-xs text-text-secondary">{skill.suggestions}</p>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default GapAnalysisDashboard;
