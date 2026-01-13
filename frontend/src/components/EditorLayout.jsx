import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const EditorLayout = ({ children, preview }) => {
    const [leftWidth, setLeftWidth] = useState(50); // Percent
    const [isDragging, setIsDragging] = useState(false);

    // Handle Drag
    const handleMouseDown = () => setIsDragging(true);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isDragging) return;
            const newWidth = (e.clientX / window.innerWidth) * 100;
            if (newWidth > 20 && newWidth < 80) setLeftWidth(newWidth);
        };
        const handleMouseUp = () => setIsDragging(false);

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    return (
        <div className="flex bg-bg-primary h-[calc(100vh-100px)] overflow-hidden rounded-2xl border border-white/5 shadow-2xl relative">
            {/* Left Panel (Form) */}
            <div
                style={{ width: `${leftWidth}%` }}
                className="h-full bg-bg-secondary/50 backdrop-blur-sm overflow-y-auto scrollbar-thin"
            >
                {children}
            </div>

            {/* Drag Handle */}
            <div
                onMouseDown={handleMouseDown}
                className="w-1 bg-white/10 hover:bg-primary cursor-col-resize h-full flex items-center justify-center transition-colors z-10"
            >
                <div className="h-8 w-1 bg-white/20 rounded-full" />
            </div>

            {/* Right Panel (Preview) */}
            <div
                style={{ width: `${100 - leftWidth}%` }}
                className="h-full bg-slate-900/50 relative overflow-hidden flex items-center justify-center"
            >
                {preview}
            </div>
        </div>
    );
};

export default EditorLayout;
