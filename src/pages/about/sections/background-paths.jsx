"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "./button";

export function FloatingPaths({ position }) {
    // Create elegant curved paths that flow from top, curve smoothly at center, 
    // and continue in a 180-degree arc flowing into the next section
    const paths = Array.from({ length: 36 }, (_, i) => {
        const offset = i * 5 * position;
        const yOffset = i * 4;

        // Create smooth bezier curves that arc gracefully
        // Starting from top, curving through the center, and arcing outward
        const startX = -380 + offset;
        const startY = -150 - yOffset;

        // Control points for smooth S-curve that transitions to horizontal
        const cp1X = -200 + offset;
        const cp1Y = 100 - yOffset * 0.5;

        const midX = 348; // Center of viewBox
        const midY = 200 + yOffset * 0.3;

        const cp2X = 550 - offset * 0.5;
        const cp2Y = 250 - yOffset * 0.3;

        // End point curves outward horizontally
        const endX = 800 - offset;
        const endY = 280 + yOffset * 0.2;

        return {
            id: i,
            d: `M${startX} ${startY} 
                C${cp1X} ${cp1Y}, ${midX} ${midY}, ${cp2X} ${cp2Y}
                S${endX} ${endY}, ${endX + 100} ${endY}`,
            width: 0.5 + i * 0.03,
        };
    });

    return (
        <div className="absolute inset-0 pointer-events-none overflow-visible">
            <svg
                className="w-full h-full text-slate-950 dark:text-white"
                viewBox="0 0 696 316"
                fill="none"
                preserveAspectRatio="xMidYMid slice"
                style={{ overflow: 'visible' }}
            >
                <title>Background Paths</title>
                <defs>
                    {/* Gradient for smooth fade effect */}
                    <linearGradient id={`pathFade${position}`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
                        <stop offset="50%" stopColor="currentColor" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
                    </linearGradient>
                </defs>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke={`url(#pathFade${position})`}
                        strokeWidth={path.width}
                        strokeOpacity={0.1 + path.id * 0.025}
                        strokeLinecap="round"
                        fill="none"
                        initial={{ pathLength: 0.3, opacity: 0.6 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.3, 0.5, 0.3],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: 25 + Math.random() * 15,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

export function BackgroundPaths({
    title = "Background Paths",
    subtitle = "",
    buttonText = "Discover Excellence",
    onButtonClick = () => { }
}) {
    const words = title.split(" ");

    return (
        <div className="relative min-h-[100vh] w-full flex items-center justify-center overflow-hidden bg-white dark:bg-black transition-colors duration-500 font-inter">
            {/* Floating Paths Container - clips the animated lines */}
            <div className="absolute inset-0 overflow-hidden">
                <FloatingPaths position={1} />
                <FloatingPaths position={-1} />
            </div>

            {/* Bottom gradient fade for seamless transition to next section */}
            <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent via-white/50 to-white dark:via-black/50 dark:to-black pointer-events-none z-[5]" />

            {/* Decorative curved connector lines that lead into the next section */}
            <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden pointer-events-none z-[4]">
                <svg
                    className="absolute w-full h-48 -bottom-24"
                    viewBox="0 0 1440 192"
                    preserveAspectRatio="none"
                    fill="none"
                >
                    {/* Multiple flowing curves that transition into the next section */}
                    {[...Array(6)].map((_, i) => (
                        <motion.path
                            key={i}
                            d={`M0,${60 + i * 12} Q360,${120 + i * 8} 720,${80 + i * 10} T1440,${100 + i * 8}`}
                            stroke="currentColor"
                            strokeWidth={0.5 + i * 0.1}
                            strokeOpacity={0.05 + i * 0.02}
                            className="text-slate-950 dark:text-white"
                            fill="none"
                            initial={{ pathOffset: 0 }}
                            animate={{ pathOffset: [0, 1] }}
                            transition={{
                                duration: 20 + i * 5,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "linear",
                            }}
                        />
                    ))}
                </svg>
            </div>

            <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Decorative badge above title */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="inline-flex items-center gap-2 px-5 py-2 mb-8 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-sm"
                    >
                        <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
                        <span className="text-xs font-medium tracking-wider uppercase text-black/60 dark:text-white/60">
                            Skill-First Platform
                        </span>
                    </motion.div>

                    <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-8 tracking-tighter leading-[0.85] font-outfit">
                        {words.map((word, wordIndex) => (
                            <span
                                key={wordIndex}
                                className="inline-block mr-4 last:mr-0"
                            >
                                {word.split("").map((letter, letterIndex) => (
                                    <motion.span
                                        key={`${wordIndex}-${letterIndex}`}
                                        initial={{ y: 100, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{
                                            delay:
                                                wordIndex * 0.1 +
                                                letterIndex * 0.03,
                                            type: "spring",
                                            stiffness: 150,
                                            damping: 25,
                                        }}
                                        className="inline-block text-transparent bg-clip-text 
                                        bg-gradient-to-r from-neutral-900 to-neutral-700/80 
                                        dark:from-white dark:to-white/80"
                                    >
                                        {letter}
                                    </motion.span>
                                ))}
                            </span>
                        ))}
                    </h1>

                    {subtitle && (
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="text-lg md:text-xl text-neutral-600 dark:text-white/60 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
                        >
                            {subtitle}
                        </motion.p>
                    )}

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.8 }}
                        className="inline-block group relative bg-gradient-to-b from-black/10 to-white/10 
                        dark:from-white/10 dark:to-black/10 p-px rounded-2xl backdrop-blur-lg 
                        overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        <Button
                            variant="ghost"
                            onClick={onButtonClick}
                            className="rounded-[1.15rem] px-12 py-8 text-xs font-bold uppercase tracking-[0.3em] backdrop-blur-md 
                            bg-white/95 hover:bg-white/100 dark:bg-black/95 dark:hover:bg-black/100 
                            text-black dark:text-white transition-all duration-300 
                            group-hover:-translate-y-0.5 border border-black/10 dark:border-white/10
                            hover:shadow-md dark:hover:shadow-neutral-800/50 font-inter"
                        >
                            <span className="opacity-90 group-hover:opacity-100 transition-opacity">
                                {buttonText}
                            </span>
                            <span
                                className="ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 
                                transition-all duration-300"
                            >
                                →
                            </span>
                        </Button>
                    </motion.div>

                    {/* Scroll indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, y: [0, 10, 0] }}
                        transition={{
                            opacity: { delay: 1.5, duration: 0.8 },
                            y: { delay: 2, duration: 2, repeat: Infinity }
                        }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
                    >
                        <span className="text-[10px] font-medium tracking-widest uppercase text-black/30 dark:text-white/30">
                            Scroll
                        </span>
                        <div className="w-6 h-10 rounded-full border-2 border-black/20 dark:border-white/20 flex justify-center p-1">
                            <motion.div
                                animate={{ y: [0, 16, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="w-1.5 h-1.5 rounded-full bg-violet-500"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
