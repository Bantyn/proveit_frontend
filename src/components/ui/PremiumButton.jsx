import React from 'react';
import { motion } from 'framer-motion';

const PremiumButton = ({
    children,
    variant = 'magnetic', // 'magnetic', 'gradient-glow', 'liquid-fill', 'neon-pulse', '3d-press', 'shimmer'
    onClick,
    className = '',
    type = 'button',
    disabled = false,
    ...props
}) => {
    // Common base classes respecting the theme
    const baseClasses = `relative inline-flex items-center justify-center font-bold tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${className}`;

    switch (variant) {
        case 'gradient-glow':
            return (
                <motion.button
                    type={type}
                    onClick={onClick}
                    disabled={disabled}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`${baseClasses} px-6 py-3 rounded-full text-white bg-surface overflow-hidden group`}
                    {...props}
                >
                    {/* Animated Gradient Border Glow */}
                    <div className="absolute inset-[-2px] rounded-full bg-gradient-to-r from-primary via-secondary to-accent opacity-70 group-hover:opacity-100 blur-sm transition-opacity duration-500 animate-pulse-slow" />
                    <div className="absolute inset-[1px] rounded-full bg-surface" />
                    <div className="relative z-10 flex items-center gap-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-200 group-hover:via-violet-400 group-hover:to-primary transition-all duration-300">
                        {children}
                    </div>
                </motion.button>
            );

        case 'neon-pulse':
            return (
                <motion.button
                    type={type}
                    onClick={onClick}
                    disabled={disabled}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`${baseClasses} px-5 py-2.5 rounded-xl border border-primary/50 text-primary bg-primary/10 hover:bg-primary/20 hover:border-primary shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_25px_rgba(99,102,241,0.6)]`}
                    {...props}
                >
                    {children}
                </motion.button>
            );

        case 'shimmer':
            return (
                <motion.button
                    type={type}
                    onClick={onClick}
                    disabled={disabled}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`${baseClasses} px-6 py-3 rounded-full text-white bg-primary overflow-hidden shadow-lg shadow-primary/25`}
                    {...props}
                >
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <span className="relative z-10 flex items-center gap-2 drop-shadow-sm">{children}</span>
                </motion.button>
            );

        case '3d-press':
            return (
                <button
                    type={type}
                    onClick={onClick}
                    disabled={disabled}
                    className={`${baseClasses} px-6 py-3 rounded-2xl bg-surface border border-white/10 text-text-main shadow-[0_4px_0_rgba(255,255,255,0.05)] hover:bg-white/5 active:translate-y-[4px] active:shadow-[0_0px_0_rgba(255,255,255,0.05)]`}
                    {...props}
                >
                    {children}
                </button>
            );

        case 'liquid-fill':
            return (
                <button
                    type={type}
                    onClick={onClick}
                    disabled={disabled}
                    className={`${baseClasses} px-6 py-3 rounded-full text-text-main border border-color-border overflow-hidden group`}
                    {...props}
                >
                    <div className="absolute inset-0 bg-primary translate-y-[100%] rounded-t-[50%] group-hover:translate-y-[0%] group-hover:rounded-t-none transition-all duration-500 ease-out" />
                    <span className="relative z-10 group-hover:text-white transition-colors duration-300">{children}</span>
                </button>
            );

        case 'magnetic':
        default:
            // Simple Framer Motion implementation of a magnetic-feeling button
            return (
                <motion.button
                    type={type}
                    onClick={onClick}
                    disabled={disabled}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`${baseClasses} px-6 py-3 rounded-full bg-surface/50 border border-white/5 backdrop-blur-md text-text-main hover:bg-surface hover:shadow-md hover:border-white/10`}
                    {...props}
                >
                    {children}
                </motion.button>
            );
    }
};

export default PremiumButton;
