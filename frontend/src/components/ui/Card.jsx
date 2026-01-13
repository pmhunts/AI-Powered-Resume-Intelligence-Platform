import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
    children,
    variant = 'glass',
    hover = true,
    className = '',
    ...props
}) => {
    const variants = {
        glass: 'glass-panel',
        solid: 'bg-bg-secondary border border-white/5',
        elevated: 'bg-bg-elevated border border-white/10 shadow-2xl',
        gradient: 'bg-gradient-to-br from-bg-secondary to-bg-tertiary border border-white/5'
    };

    const cardClasses = `
    rounded-2xl p-6 
    ${variants[variant]} 
    ${hover ? 'card-hover cursor-pointer' : ''} 
    ${className}
  `;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className={cardClasses}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Card;
