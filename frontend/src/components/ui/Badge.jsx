import React from 'react';

const Badge = ({
    children,
    variant = 'primary',
    size = 'md',
    icon = null,
    className = ''
}) => {
    const baseStyles = 'inline-flex items-center gap-1.5 font-semibold rounded-full';

    const variants = {
        primary: 'badge-primary',
        success: 'badge-success',
        warning: 'badge-warning',
        danger: 'badge-danger',
        secondary: 'bg-bg-tertiary/80 text-text-secondary border border-white/10'
    };

    const sizes = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm',
        lg: 'px-4 py-1.5 text-base'
    };

    return (
        <span className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}>
            {icon && <span className="w-3 h-3">{icon}</span>}
            {children}
        </span>
    );
};

export default Badge;
