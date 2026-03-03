import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, BarChart3, Globe, Cpu, ChevronRight, Clock } from 'lucide-react';
import { NeonOrbs } from '../../../components/ui/NeonOrbs';
import { GlowCard } from '../../../components/ui/GlowCard';
import { BentoGrid } from '../../../components/ui/BentoGrid';
import VerticalSlider from '../../../components/ui/VerticalSlider';
import ActiveJobsOverview from '../../../components/dashboard/ActiveJobsOverview';
import HiringAnalytics from '../../../components/dashboard/HiringAnalytics';
import JobCreditTracker from '../../../components/dashboard/JobCreditTracker';

import { dashboardData } from '../../../services/mock/dashboardData';
import { useTheme } from '../../../context/ThemeContext';
import { clsx } from 'clsx';

const CompanyDashboard = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const scrollRef = useRef(null);
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    const formattedDate = time.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }).toUpperCase();

    return (
        <div ref={scrollRef} className="relative z-10 w-full h-screen overflow-y-auto overflow-x-hidden no-scrollbar scroll-smooth">
            <div className="max-w-7xl mx-auto flex flex-col gap-4 pt-2">

                {/* Header: Command HUD Section */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 px-6 py-2">

                    {/* LEFT SIDE */}
                    <div className="flex flex-col gap-6">

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="flex items-center gap-5"
                        >
                            {/* Refined Icon Container */}
                            <div
                                className="relative w-12 h-12 rounded-2xl 
    bg-gradient-to-br from-primary/10 to-secondary/10 
    border border-border 
    flex items-center justify-center 
    text-primary
    shadow-sm"
                            >
                                <Cpu size={20} strokeWidth={1.7} />
                            </div>

                            {/* Title Area */}
                            <div className="flex flex-col">
                                <h1 className="text-2xl md:text-3xl font-semibold text-text-main leading-tight tracking-tight flex flex-wrap items-baseline gap-x-2">
                                    {dashboardData.company?.name
                                        ?.trim()
                                        .split(" ")
                                        .map((word, i, arr) => {
                                            const isLast = i === arr.length - 1;

                                            return (
                                                <span
                                                    key={i}
                                                    className={
                                                        isLast
                                                            ? isDark
                                                                ? "bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent"
                                                                : "text-gradient-vivid"
                                                            : "text-text-main"
                                                    }
                                                >
                                                    {word}
                                                </span>
                                            );
                                        })}
                                </h1>

                                {/* Company Subtitle & Status */}
                                <div className="flex items-center gap-3 mt-1.5">
                                    <span className="text-sm text-text-muted">
                                        Control Center
                                    </span>
                                    {dashboardData.company?.verificationStatus === 'approved' && (
                                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                                            <div className="relative flex h-1.5 w-1.5">
                                                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-40 animate-ping"></span>
                                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                                            </div>
                                            <span className="text-[9px] font-black font-mono text-emerald-500 uppercase tracking-widest leading-none">Verified Operator</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>

                        {/* Status Bar */}
                        <div className="flex items-center gap-6 text-sm text-text-secondary border-t border-[var(--color-border)] pt-4">

                            {/* Pipeline Status Bar */}
                            <div className="flex items-center gap-8 pl-1 pt-2">
                                <div className="flex items-center gap-2.5 group/status cursor-default">
                                    <div className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500/40 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
                                    </div>
                                    <span className="text-[10px] font-black font-mono text-cyan-400/40 uppercase tracking-[0.2em] group-hover/status:text-text-main transition-colors duration-300">
                                        Pipeline: <span className="text-emerald-500 font-bold">Active</span>
                                    </span>
                                </div>

                                <div className="h-4 w-[1px] bg-white/5" />

                                <div className="flex items-center gap-4">
                                    <span className="text-[10px] font-black font-mono text-cyan-400/40 uppercase tracking-[0.2em]">Match Rate:</span>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-lg font-black text-text-main tracking-tighter">94.2</span>
                                        <span className="text-[10px] font-bold text-primary opacity-60">%</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="flex items-center gap-10">

                        {/* Last Updated Panel */}
                        <div className="hidden md:flex flex-col items-end text-sm text-text-secondary">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span>Last Updated 2m ago</span>
                            </div>
                            <span className="text-xs text-text-secondary/50">
                                Auto-sync enabled
                            </span>
                        </div>

                        <JobCreditTracker data={dashboardData.company} />

                    </div>
                </header>

                {/* ⚡ Quick Actions Bar - Temporarily Hidden
                <div className="flex items-center gap-3 px-6 pb-2 flex-wrap">
                    {[
                        { label: '+ Post New Job', color: 'primary', glow: 'rgba(var(--color-primary-rgb),0.2)' },
                        { label: '📋 Review Applicants', color: 'secondary', glow: 'rgba(var(--color-secondary-rgb),0.15)' },
                        { label: '📅 Schedule Interview', color: 'accent', glow: 'rgba(251,146,60,0.15)' },
                        { label: '📊 Run Report', color: 'muted', glow: 'rgba(255,255,255,0.05)' },
                    ].map(({ label, glow }) => (
                        <motion.button
                            key={label}
                            whileHover={{ scale: 1.03, y: -1 }}
                            whileTap={{ scale: 0.97 }}
                            className="relative group px-4 py-2 rounded-full text-[11px] font-semibold tracking-wide uppercase glass-panel text-text-secondary hover:text-text-main transition-all duration-300 overflow-hidden"
                            style={{ '--btn-glow': glow }}
                        >
                            <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{ background: glow, filter: 'blur(8px)' }}
                            />
                            <span className="relative z-10">{label}</span>
                        </motion.button>
                    ))}
                </div>
                */}

                {/* Main Bento Grid HUD */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20 px-6">

                    {/* Main Content Grid (12 cols) */}
                    <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Top Analytics Block */}
                        <GlowCard
                            customSize
                            className="md:col-span-2 h-auto min-h-[400px]"
                            glowColor="blue"
                            noBorder
                        >
                            <div className="relative z-10 flex flex-col gap-6 w-full">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-1.5 h-6 bg-primary rounded-full shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.3)]" />
                                        <h2 className={clsx(
                                            "text-2xl font-black uppercase tracking-tighter pb-1",
                                            isDark ? "text-text-main" : "text-gradient-electric"
                                        )}>Hiring Intelligence</h2>
                                    </div>
                                    {/* <div className="flex gap-2">
                                        <button className="group/telemetry relative flex items-center gap-4 px-5 py-2 rounded-full bg-[#0a0a0f]/60 border border-white/10 backdrop-blur-xl cursor-pointer overflow-hidden transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_25px_rgba(var(--color-primary-rgb),0.2)] active:scale-[0.97]">
                                            ----------- Holographic Shimmer Layer 
                                            <div className="absolute inset-0 opacity-0 group-hover/telemetry:opacity-10 transition-opacity duration-1000 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover/telemetry:translate-x-full" />

                                            --------- Tactical Signal Wave 
                                            <div className="flex gap-1 items-end h-3 relative z-10">
                                                {[0.3, 0.6, 0.4, 0.8].map((h, i) => (
                                                    <motion.div
                                                        key={i}
                                                        className="w-[1px] bg-primary/40 rounded-full shadow-[0_0_8px_rgba(var(--color-primary-rgb),0.3)]"
                                                        animate={{
                                                            height: [`${h * 100}%`, `${(h * 0.4) * 100}%`, `${h * 100}%`],
                                                            backgroundColor: i === 3 ? ['rgba(var(--color-primary-rgb),0.4)', 'rgba(var(--color-primary-rgb),1)', 'rgba(var(--color-primary-rgb),0.4)'] : 'rgba(var(--color-primary-rgb),0.4)'
                                                        }}
                                                        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
                                                    />
                                                ))}
                                            </div>

                                            <div className="flex items-center gap-3 relative z-10 pr-1">
                                                <span className="text-[10px] font-black text-white/30 group-hover/telemetry:text-primary transition-colors duration-500 uppercase tracking-[0.25em]">
                                                    Signal: Nominal
                                                </span>
                                                <div className="relative flex h-2 w-2">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500/30"></span>
                                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)]"></span>
                                                    <span className="absolute inset-[30%] bg-white/40 rounded-full" />
                                                </div>
                                            </div>
                                        </button>
                                    </div> */}
                                </div>
                                <HiringAnalytics data={dashboardData.analytics} />
                            </div>
                        </GlowCard>

                        {/* Middle Block: Active Competitions */}
                        <GlowCard
                            customSize
                            className="md:col-span-2 h-auto"
                            glowColor="purple"
                            noBorder
                        >
                            <div className="relative z-10 flex flex-col gap-6 w-full">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-1.5 h-6 bg-secondary rounded-full shadow-[0_0_15px_rgba(var(--color-secondary-rgb),0.6)]" />
                                        <h2 className={clsx(
                                            "text-2xl font-black uppercase tracking-tighter pb-1",
                                            isDark ? "text-text-main" : "text-gradient-aurora"
                                        )}>Active Missions</h2>
                                    </div>
                                    <button
                                        className="
                                                relative group flex items-center gap-4
                                                px-8 py-3.5 rounded-full
                                                bg-gradient-to-b from-white/10 to-white/[0.04]
                                                border border-white/10
                                                backdrop-blur-xl
                                                transition-all duration-500
                                                hover:border-secondary/50
                                                hover:shadow-[0_0_30px_rgba(var(--color-secondary-rgb),0.15)]
                                                active:scale-[0.98]
                                                overflow-hidden
                                                ">
                                        {/* Glow Pulse Background */}
                                        <div className="
                                                absolute inset-0
                                                bg-secondary/5
                                                opacity-0
                                                group-hover:opacity-100
                                                transition-opacity duration-500
                                                " />

                                        {/* Moving Shine */}
                                        <div className="
                                                absolute inset-0    
                                                bg-gradient-to-r
                                                from-transparent
                                                via-white/10
                                                to-transparent
                                                translate-x-[-120%]
                                                group-hover:translate-x-[120%]
                                                transition-transform duration-1000 ease-in-out
                                                " />

                                        {/* Left Indicator */}
                                        <span className="
                                                relative z-10 flex items-center gap-2.5
                                                text-xs font-semibold uppercase tracking-widest
                                                text-text-main
                                                ">
                                            <span className="
                                                w-2 h-2 rounded-full
                                                bg-secondary
                                                shadow-[0_0_12px_rgba(var(--color-secondary-rgb),0.9)]
                                                group-hover:scale-125
                                                transition-transform duration-300
                                                " />
                                            Initiate New Mission
                                        </span>

                                        {/* Icon Container */}
                                        <div className="
                                            relative z-10 flex items-center justify-center
                                            w-8 h-8 rounded-full
                                            bg-white/5 border border-white/10
                                            group-hover:bg-secondary/20
                                            group-hover:border-secondary/40
                                            transition-all duration-500"
                                        >
                                            <ChevronRight
                                                size={16}
                                                className="transition-transform duration-300 group-hover:translate-x-1"
                                            />
                                        </div>
                                    </button>
                                </div>
                                <ActiveJobsOverview jobs={dashboardData.activeJobs} />
                            </div>
                        </GlowCard>

                        {/* Footer Grid: HR KPI Stats */}
                        <GlowCard customSize className="h-[180px] group/stat" glowColor="green" noBorder>
                            <div className="relative z-10 flex flex-col justify-between h-full w-full">
                                <div className="flex justify-between items-start">
                                    <Clock className="text-emerald-500" size={24} />
                                    {/* Pulse Wave Micro-visual */}
                                    <div className="flex items-end gap-1 h-6">
                                        {[0.4, 0.7, 0.5, 0.9, 0.6].map((h, i) => (
                                            <motion.div
                                                key={i}
                                                className="w-1 bg-emerald-500/40 rounded-full"
                                                animate={{ height: [`${h * 100}%`, `${(h * 0.5) * 100}%`, `${h * 100}%`] }}
                                                transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[10px] font-black font-mono text-text-secondary uppercase tracking-[0.2em] mb-1">Avg. Time-to-Hire</div>
                                    <div className={clsx(
                                        "text-3xl font-black flex items-baseline gap-2",
                                        isDark ? "text-text-main" : "text-gradient-vivid"
                                    )}>
                                        12 <span className="text-sm font-bold text-text-secondary">days</span>
                                        <span className="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-1.5 rounded">↓ FASTER</span>
                                    </div>
                                </div>
                            </div>
                        </GlowCard>

                        <GlowCard customSize className="h-[180px] group/stat" glowColor="orange" noBorder>
                            <div className="relative z-10 flex flex-col justify-between h-full w-full">
                                <div className="flex justify-between items-start">
                                    <Globe className="text-orange-500" size={24} />
                                    {/* Node Matrix Micro-visual */}
                                    <div className="grid grid-cols-3 gap-1">
                                        {[1, 1, 1, 1, 0.4, 1, 1, 1, 0.7].map((o, i) => (
                                            <div
                                                key={i}
                                                className={`w-1.5 h-1.5 rounded-[2px] ${o === 1 ? 'bg-orange-500/40' : 'bg-orange-500/10'}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[10px] font-black font-mono text-text-secondary uppercase tracking-[0.2em] mb-1">Active Candidates</div>
                                    <div className={clsx(
                                        "text-3xl font-black",
                                        isDark ? "text-text-main" : "text-gradient-aurora"
                                    )}>
                                        1,420 <span className="text-sm font-bold text-text-secondary">profiles</span>
                                    </div>
                                </div>
                            </div>
                        </GlowCard>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyDashboard;
