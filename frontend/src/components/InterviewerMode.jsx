import React from 'react';
import { motion } from 'framer-motion';
import { User, MessageCircle, Clock, Star } from 'lucide-react';
import Card from './ui/Card';
import Badge from './ui/Badge';

const InterviewerMode = ({ simulation }) => {
    if (!simulation) {
        return (
            <Card variant="glass" className="h-full">
                <div className="text-center py-8">
                    <User className="w-12 h-12 text-text-muted mx-auto mb-3" />
                    <h3 className="font-bold text-white mb-2">Recruiter Perspective</h3>
                    <p className="text-sm text-text-secondary">Run analysis to see how recruiters view your resume</p>
                </div>
            </Card>
        );
    }

    const {
        recruiter_perspective = {},
        likely_questions = []
    } = simulation;

    const {
        first_impression = '',
        concerns = [],
        recommendation = '',
        rating = 0
    } = recruiter_perspective;

    return (
        <Card variant="glass" className="h-full">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-lg">Recruiter Perspective</h3>
                            <p className="text-sm text-text-secondary">How hiring managers see you</p>
                        </div>
                    </div>
                    {rating > 0 && (
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-4 h-4 ${i < Math.floor(rating)
                                            ? 'fill-warning text-warning'
                                            : 'text-text-muted'
                                        }`}
                                />
                            ))}
                            <span className="ml-2 text-sm font-bold text-white">{rating}/5</span>
                        </div>
                    )}
                </div>

                {/* First Impression */}
                {first_impression && (
                    <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-4 rounded-xl border border-primary/20">
                        <p className="text-xs font-semibold text-primary uppercase mb-2 flex items-center gap-2">
                            <MessageCircle className="w-3 h-3" />
                            First Impression
                        </p>
                        <p className="text-sm text-white leading-relaxed">{first_impression}</p>
                    </div>
                )}

                {/* Concerns */}
                {concerns && concerns.length > 0 && (
                    <div>
                        <p className="text-xs font-semibold text-text-muted uppercase mb-3">Potential Concerns</p>
                        <div className="space-y-2">
                            {concerns.map((concern, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-start gap-2 text-sm text-text-secondary"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-warning mt-1.5 flex-shrink-0" />
                                    <span>{concern}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Recommendation */}
                {recommendation && (
                    <div className="pt-4 border-t border-white/5">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-text-muted uppercase">Recommendation</span>
                            <Badge variant={recommendation.toLowerCase().includes('forward') ? 'success' : 'warning'}>
                                {recommendation}
                            </Badge>
                        </div>
                    </div>
                )}

                {/* Likely Questions Preview */}
                {likely_questions && likely_questions.length > 0 && (
                    <div className="pt-4 border-t border-white/5">
                        <p className="text-xs font-semibold text-text-muted uppercase mb-3">Likely Interview Questions</p>
                        <div className="space-y-2">
                            {likely_questions.slice(0, 3).map((q, i) => (
                                <div
                                    key={i}
                                    className="flex items-start gap-2 p-2 bg-bg-primary/30 rounded-lg text-sm"
                                >
                                    <span className="text-primary font-bold flex-shrink-0">Q{i + 1}:</span>
                                    <span className="text-text-secondary">{q.question}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Card>
    );
};

export default InterviewerMode;
