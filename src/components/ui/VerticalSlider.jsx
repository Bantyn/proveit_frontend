import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence, useTransform } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { clsx } from 'clsx';

const VerticalSlider = ({ scrollRef, min = 0, max = 100, onChange }) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const containerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Core Motion Values
    const sliderY = useMotionValue(0);
    const springY = useSpring(sliderY, { stiffness: 400, damping: 40, mass: 0.8 });

    // UI Motion States
    const rawPercentage = useTransform(sliderY, (y) => {
        const height = containerRef.current?.offsetHeight || 1;
        return Math.max(0, Math.min(100, (y / height) * 100));
    });

    // Thumb scale & glow based on interaction
    const thumbScale = useSpring(isDragging ? 1.15 : (isHovered ? 1.05 : 1), { stiffness: 500, damping: 30 });
    const glowOpacity = useSpring(isDragging || isHovered ? 1 : 0, { stiffness: 200, damping: 30 });

    // Update scroll position
    const handleDrag = useCallback((event, info) => {
        if (!containerRef.current || !scrollRef?.current) return;
        const containerRect = containerRef.current.getBoundingClientRect();
        const height = containerRect.height;
        let percentage = (info.point.y - containerRect.top) / height;
        percentage = Math.max(0, Math.min(1, percentage));

        const scrollElement = scrollRef.current;
        const maxScroll = scrollElement.scrollHeight - scrollElement.clientHeight;
        if (maxScroll > 0) {
            scrollElement.scrollTop = percentage * maxScroll;
        }

        const newValue = Math.round(min + percentage * (max - min));
        if (onChange) onChange(newValue);
    }, [scrollRef, min, max, onChange]);

    // Sync with scroll
    useEffect(() => {
        const scrollElement = scrollRef?.current;
        if (!scrollElement || !containerRef.current) return;

        const handleScroll = () => {
            if (isDragging) return;
            const maxScroll = scrollElement.scrollHeight - scrollElement.clientHeight;
            if (maxScroll <= 0) return;
            const percentage = scrollElement.scrollTop / maxScroll;
            sliderY.set(percentage * containerRef.current.offsetHeight);
        };

        scrollElement.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => scrollElement.removeEventListener('scroll', handleScroll);
    }, [scrollRef, sliderY, isDragging]);

    return (
        <div
            className="relative flex flex-col items-center select-none h-full py-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Engineered Track Container */}
            <div
                ref={containerRef}
                className={clsx(
                    "relative w-1.5 h-full rounded-full transition-colors duration-500 overflow-visible",
                    isDark ? "bg-white/5" : "bg-indigo-100/50"
                )}
            >
                {/* Active Progress Gradient */}
                <motion.div
                    className="absolute top-0 inset-x-0 rounded-full bg-gradient-to-b from-primary to-secondary"
                    style={{ height: springY }}
                />

                {/* Technical Tick Marks */}
                <div className="absolute inset-y-0 -left-6 flex flex-col justify-between py-1 pointer-events-none">
                    {[0, 25, 50, 75, 100].map((tick) => (
                        <div
                            key={tick}
                            className={clsx(
                                "w-2.5 h-[1px] transition-all duration-300",
                                isDark ? "bg-white/10" : "bg-indigo-200",
                                isHovered && "w-3 opacity-100 shadow-[0_0_8px_rgba(var(--color-primary-rgb),0.5)]"
                            )}
                        />
                    ))}
                </div>

                {/* High-Fidelity Tactical Thumb */}
                <motion.div
                    drag="y"
                    dragConstraints={containerRef}
                    dragElastic={0}
                    dragMomentum={false}
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={() => setIsDragging(false)}
                    onDrag={handleDrag}
                    className={clsx(
                        "absolute left-1/2 -translate-x-1/2 w-5 h-10 z-20 cursor-grab active:cursor-grabbing flex items-center justify-center",
                        "group/thumb"
                    )}
                    style={{ y: springY, top: -20, scale: thumbScale }}
                >
                    {/* Ring Glow Effect */}
                    <motion.div
                        className="absolute inset-0 rounded-lg bg-primary/20 blur-md pointer-events-none"
                        style={{ opacity: glowOpacity }}
                    />

                    {/* Thumb Body */}
                    <div className={clsx(
                        "relative w-full h-full rounded-lg border flex flex-col items-center justify-center gap-1 transition-all duration-300 shadow-2xl backdrop-blur-md",
                        isDark
                            ? "bg-white/10 border-white/10 shadow-black/40"
                            : "bg-white/90 border-indigo-100 shadow-indigo-200/50"
                    )}>
                        {/* Machined Grips */}
                        <div className={clsx("w-3 h-[1px]", isDark ? "bg-white/20" : "bg-indigo-200")} />
                        <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--color-primary-rgb),0.8)]" />
                        <div className={clsx("w-3 h-[1px]", isDark ? "bg-white/20" : "bg-indigo-200")} />
                    </div>

                    {/* Precision Readout Tooltip */}
                    <AnimatePresence>
                        {(isDragging || isHovered) && (
                            <motion.div
                                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                                animate={{ opacity: 1, x: 45, scale: 1 }}
                                exit={{ opacity: 0, x: 20, scale: 0.9 }}
                                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                className={clsx(
                                    "absolute left-0 pointer-events-none whitespace-nowrap px-3 py-2 rounded-xl border backdrop-blur-xl shadow-2xl flex flex-col gap-0.5 min-w-[80px]",
                                    isDark
                                        ? "bg-[#0A0A14]/90 border-white/10 text-white"
                                        : "bg-white/95 border-indigo-100 text-indigo-900"
                                )}
                            >
                                <span className="text-[10px] font-mono font-bold tracking-widest uppercase opacity-40">Node_Pos</span>
                                <div className="flex items-baseline gap-1">
                                    <motion.span className="text-sm font-mono font-black text-primary">
                                        {Math.round(min + (sliderY.get() / (containerRef.current?.offsetHeight || 1)) * (max - min))}%
                                    </motion.span>
                                </div>

                                {/* Micro-Bar */}
                                <div className={clsx("h-1 w-full rounded-full mt-1 overflow-hidden", isDark ? "bg-white/5" : "bg-indigo-50")}>
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-primary to-secondary"
                                        style={{ width: `${Math.round((sliderY.get() / (containerRef.current?.offsetHeight || 1)) * 100)}%` }}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Ambient Depth Glow */}
                <motion.div
                    className="absolute inset-0 pointer-events-none bg-gradient-to-b from-primary/0 via-primary/5 to-primary/0 blur-xl"
                    style={{ opacity: glowOpacity }}
                />
            </div>
        </div>
    );
};

export default VerticalSlider;
