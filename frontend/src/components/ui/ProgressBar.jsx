import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({
    value = 0,
    max = 100,
    showLabel = false,
    variant = 'primary',
    height = 'md',
    className = ''
}) => {
    const [animatedValue, setAnimatedValue] = useState(0);
    const percentage = Math.min((value / max) * 100, 100);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimatedValue(percentage);
        }, 100);
        return () => clearTimeout(timer);
    }, [percentage]);

    const variants = {
        primary: 'gradient-primary',
        success: 'gradient-success',
        warning: 'bg-gradient-to-r from-warning to-orange-500',
        danger: 'bg-gradient-to-r from-danger to-red-600',
        purple: 'gradient-purple-pink'
    };

    const heights = {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-3'
    };

    return (
        <div className={`w-full ${className}`}>
            {showLabel && (
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-text-secondary">Progress</span>
                    <span className="text-sm font-semibold text-text-primary">{Math.round(percentage)}%</span>
                </div>
            )}
            <div className={`w-full bg-bg-tertiary rounded-full overflow-hidden ${heights[height]}`}>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${animatedValue}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className={`${heights[height]} ${variants[variant]} rounded-full relative overflow-hidden`}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shimmer-fast" />
                </motion.div>
            </div>
        </div>
    );
};

// Circular Progress variant
export const CircularProgress = ({
    value = 0,
    max = 100,
    size = 120,
    strokeWidth = 8,
    showLabel = true,
    variant = 'primary',
    className = ''
}) => {
    const [animatedValue, setAnimatedValue] = useState(0);
    const percentage = Math.min((value / max) * 100, 100);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimatedValue(percentage);
        }, 100);
        return () => clearTimeout(timer);
    }, [percentage]);

    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (animatedValue / 100) * circumference;

    const colors = {
        primary: '#6366F1',
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444'
    };

    return (
        <div className={`relative inline-flex items-center justify-center ${className}`}>
            <svg width={size} height={size} className="transform -rotate-90">
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="rgba(51, 65, 85, 0.3)"
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                {/* Progress circle */}
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={colors[variant]}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeLinecap="round"
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    style={{
                        strokeDasharray: `${circumference} ${circumference}`,
                        filter: `drop-shadow(0 0 8px ${colors[variant]}40)`
                    }}
                />
            </svg>
            {showLabel && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{Math.round(animatedValue)}%</span>
                </div>
            )}
        </div>
    );
};

export default ProgressBar;
