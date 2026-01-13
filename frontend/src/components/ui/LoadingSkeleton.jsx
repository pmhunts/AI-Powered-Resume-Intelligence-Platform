import React from 'react';

const LoadingSkeleton = ({
    width = '100%',
    height = '20px',
    variant = 'rectangular',
    count = 1,
    className = ''
}) => {
    const variants = {
        rectangular: 'rounded-lg',
        circular: 'rounded-full',
        text: 'rounded'
    };

    const skeletons = Array.from({ length: count }, (_, i) => (
        <div
            key={i}
            className={`shimmer ${variants[variant]} ${className}`}
            style={{
                width,
                height,
                marginBottom: count > 1 && i < count - 1 ? '12px' : '0'
            }}
        />
    ));

    return <>{skeletons}</>;
};

// Preset skeleton patterns
export const SkeletonCard = () => (
    <div className="glass-panel rounded-2xl p-6 space-y-4">
        <LoadingSkeleton width="60%" height="24px" />
        <LoadingSkeleton width="100%" height="16px" count={3} />
        <LoadingSkeleton width="40%" height="32px" />
    </div>
);

export const SkeletonList = ({ items = 3 }) => (
    <div className="space-y-4">
        {Array.from({ length: items }, (_, i) => (
            <div key={i} className="flex items-center gap-4">
                <LoadingSkeleton variant="circular" width="48px" height="48px" />
                <div className="flex-1 space-y-2">
                    <LoadingSkeleton width="70%" height="16px" />
                    <LoadingSkeleton width="40%" height="12px" />
                </div>
            </div>
        ))}
    </div>
);

export default LoadingSkeleton;
