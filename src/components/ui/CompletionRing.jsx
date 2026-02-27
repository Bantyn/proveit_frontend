import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CompletionRing = ({ percentage = 0, size = 120, strokeWidth = 8, activeColor = 'var(--color-primary)' }) => {
    const [offset, setOffset] = useState(0);
    const radius = (size / 2) - strokeWidth;
    const circumference = 2 * Math.PI * radius;

    useEffect(() => {
        const progressOffset = ((100 - percentage) / 100) * circumference;
        setOffset(progressOffset);
    }, [percentage, circumference]);

    return (
        <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
            {/* Background Track */}
            <svg width={size} height={size} className="rotate-[-90deg]">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="var(--color-surface)"
                    strokeWidth={strokeWidth}
                    fill="none"
                    className="opacity-50"
                />
                {/* Animated Progress Ring */}
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={activeColor}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                    style={{
                        filter: `drop-shadow(0 0 6px ${activeColor}40)`
                    }}
                />
            </svg>
            {/* Inner Content (Percentage) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 }}
                    className="text-xl font-bold text-text-main"
                >
                    {percentage}%
                </motion.span>
            </div>
        </div>
    );
};

export default CompletionRing;
