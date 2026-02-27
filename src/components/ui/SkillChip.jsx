import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';

const SkillChip = ({
    skill,
    level,
    onRemove,
    isEditing = false
}) => {
    const chipRef = useRef(null);

    useEffect(() => {
        const el = chipRef.current;
        if (!el || isEditing) return;

        // Simple GSAP Hover Physics (Magnetic float)
        const handleMouseEnter = (e) => {
            gsap.to(el, {
                y: -4,
                scale: 1.05,
                boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                borderColor: "var(--color-primary)",
                duration: 0.4,
                ease: "power3.out"
            });
        };

        const handleMouseLeave = (e) => {
            gsap.to(el, {
                y: 0,
                x: 0,
                scale: 1,
                boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                borderColor: "rgba(255,255,255,0.05)",
                duration: 0.6,
                ease: "elastic.out(1, 0.4)"
            });
        };

        const handleMouseMove = (e) => {
            const rect = el.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.2;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.2;

            gsap.to(el, {
                x: x,
                y: y - 4,
                duration: 0.2,
                ease: "power1.out"
            });
        };

        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
        el.addEventListener('mousemove', handleMouseMove);

        return () => {
            el.removeEventListener('mouseenter', handleMouseEnter);
            el.removeEventListener('mouseleave', handleMouseLeave);
            el.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isEditing]);

    const levelColors = {
        'Beginner': 'bg-blue-400/20 text-blue-400',
        'Intermediate': 'bg-accent/20 text-accent',
        'Advanced': 'bg-primary/20 text-primary',
        'Expert': 'bg-secondary/20 text-secondary'
    };

    const levelColor = levelColors[level] || 'bg-white/10 text-text-secondary';

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            ref={chipRef}
            className={`relative flex items-center gap-3 pl-4 pr-2 py-2 rounded-full bg-surface border border-white/5 transition-colors cursor-default select-none ${isEditing ? 'hover:border-red-400/30' : ''}`}
        >
            <span className="text-sm font-bold text-text-main tracking-wide">{skill}</span>

            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full tracking-wider ${levelColor}`}>
                {level}
            </span>

            {isEditing && (
                <button
                    onClick={(e) => { e.preventDefault(); onRemove(); }}
                    className="p-1 rounded-full text-text-secondary hover:text-white hover:bg-red-500 transition-colors ml-1"
                >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}
        </motion.div>
    );
};

export default SkillChip;
