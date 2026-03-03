// ─── ProfileSection/CompanyMetrics.jsx ────────────────────────────────────
// 💎 PREMIUM EXECUTIVE INTELLIGENCE BOARD
// High-tech, data-dense, and aesthetically superior theme-aware dashboard.

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { Database, RefreshCw, BarChart3, TrendingUp, ArrowUpRight, ArrowDownRight, LayoutGrid } from 'lucide-react';
import { fade, useIsDark } from './shared';
import { BUSINESS_METRICS, HIRING_METRICS, COLOR_PALETTE } from './companyMetricsConfig';

/* ─── Premium Glass Sparkline ─────────────────────────────────── */
const GlassSparkline = ({ data, color }) => {
    const W = 100, H = 32;
    const min = Math.min(...data), max = Math.max(...data);
    const range = max - min || 1;
    const pts = data.map((v, i) => [
        (i / (data.length - 1)) * W,
        H - ((v - min) / range) * (H - 6) - 3,
    ]);
    const pathD = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');

    return (
        <div className="relative group/spark">
            <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="overflow-visible">
                {/* Glow Path */}
                <motion.path
                    d={pathD}
                    fill="none"
                    stroke={color}
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.15 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="blur-[3px]"
                />
                {/* Main Path */}
                <motion.path
                    d={pathD}
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />
                <circle cx={W} cy={pts[pts.length - 1][1]} r="2.5" fill={color} className="animate-pulse" />
            </svg>
        </div>
    );
};

/* ─── Utility: Compute Trend ───────────────────────────────────── */
const computeTrend = (bar, invertTrend = false) => {
    if (!bar || bar.length < 2) return { pct: 0, isPositive: true, label: '—' };
    const first = bar[0], last = bar[bar.length - 1];
    if (first === 0) return { pct: 0, isPositive: true, label: '—' };
    const pct = ((last - first) / first) * 100;
    const isRising = pct >= 0;
    const isPositive = invertTrend ? !isRising : isRising;
    return { pct, isPositive, label: `${isRising ? '+' : ''}${Math.abs(pct).toFixed(0)}%` };
};

/* ─── Metric Card ────────────────────────────────────────────── */
const MetricCard = ({ cfg, rawVal, viewMode }) => {
    const isDark = useIsDark();
    const cp = COLOR_PALETTE[cfg.color] || COLOR_PALETTE.indigo;
    const { isPositive, label: trendLabel, pct } = computeTrend(cfg.bar, cfg.invertTrend);

    const shownValue = viewMode === 'pct'
        ? `${pct >= 0 ? '+' : ''}${pct.toFixed(1)}%`
        : `${cfg.prefix ?? ''}${rawVal?.toLocaleString() ?? '—'}${cfg.suffix ?? ''}`;

    const Icon = cfg.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className={clsx(
                'relative p-5 rounded-[2rem] border transition-all duration-500 overflow-hidden cursor-default group',
                isDark
                    ? 'bg-[#0D0D1C]/60 backdrop-blur-xl border-white/[0.06] hover:border-white/[0.12] card-shadow-dark'
                    : 'bg-white/80 backdrop-blur-xl border-indigo-100/80 hover:border-indigo-200/50 card-shadow-light'
            )}
        >
            {/* Ambient Glow */}
            <div
                className="absolute -top-10 -right-10 w-32 h-32 blur-[60px] opacity-20 transition-opacity duration-500 group-hover:opacity-40"
                style={{ backgroundColor: cp.accent }}
            />

            {/* Top row: Icon + Label + Trend */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className={clsx(
                        'p-2 rounded-xl transition-all duration-300 group-hover:scale-110',
                        isDark ? 'bg-white/5' : 'bg-slate-50'
                    )}>
                        <Icon size={14} className={isDark ? cp.darkText : cp.text} />
                    </div>
                    <p className={clsx(
                        'font-mono text-[9px] font-black uppercase tracking-[0.2em]',
                        isDark ? 'text-slate-500' : 'text-slate-400'
                    )}>
                        {cfg.label}
                    </p>
                </div>

                <div className={clsx(
                    'flex items-center gap-1 px-2 py-0.5 rounded-full font-mono text-[10px] font-bold border transition-colors',
                    isPositive
                        ? 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'
                        : 'text-rose-500 bg-rose-500/10 border-rose-500/20'
                )}>
                    {isPositive ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                    {trendLabel}
                </div>
            </div>

            {/* Main Value */}
            <h2 className={clsx(
                'font-sans text-[2rem] font-black tracking-tighter leading-none mb-1.5',
                isDark ? 'text-white' : 'text-slate-900'
            )}>
                {shownValue}
            </h2>

            <p className={clsx(
                'font-sans text-[10px] font-medium opacity-60 mb-6',
                isDark ? 'text-slate-400' : 'text-slate-500'
            )}>
                {cfg.desc}
            </p>

            {/* Sparkline Baseline */}
            <div className="flex items-center justify-between mt-auto">
                <GlassSparkline data={cfg.bar} color={isDark ? cp.darkText : cp.accent} />
                <div className={clsx(
                    'flex flex-col items-end opacity-0 group-hover:opacity-100 transition-opacity duration-500',
                    isDark ? 'text-slate-600' : 'text-slate-300'
                )}>
                    <span className="font-mono text-[8px] font-bold uppercase tracking-tighter">7D Trend</span>
                </div>
            </div>
        </motion.div>
    );
};

/* ─── Main Component ────────────────────────────────────────────── */
const CompanyMetrics = ({ metrics }) => {
    const isDark = useIsDark();
    const [activeTab, setActiveTab] = useState('business');
    const [viewMode, setViewMode] = useState('abs');
    const [syncTime, setSyncTime] = useState('');

    useEffect(() => {
        setSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }));
    }, []);

    const cfgList = activeTab === 'business' ? BUSINESS_METRICS : HIRING_METRICS;

    return (
        <div className="relative space-y-8">
            {/* ── Header Section ── */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 px-2">
                <div>
                    <div className="flex items-center gap-3 mb-2.5">
                        <div className="w-1.5 h-6 rounded-full bg-primary shadow-[0_0_12px_rgba(var(--color-primary-rgb),0.5)]" />
                        <h3 className={clsx(
                            'font-sans text-3xl font-black tracking-tight leading-none',
                            isDark ? 'text-white' : 'text-gradient-vivid'
                        )}>
                            Executive Intelligence
                        </h3>
                    </div>
                    <p className={clsx(
                        'font-sans text-[11px] font-medium tracking-wide uppercase opacity-60 ml-4.5',
                        isDark ? 'text-slate-400' : 'text-slate-500'
                    )}>
                        Real-time organizational telemetry & benchmarking
                    </p>
                </div>

                {/* Advanced Controls */}
                <div className={clsx(
                    'flex items-center gap-6 p-1.5 rounded-2xl border backdrop-blur-md',
                    isDark ? 'bg-white/5 border-white/[0.08]' : 'bg-slate-50/80 border-slate-200'
                )}>
                    {/* Tab Switcher */}
                    <div className="flex p-1 gap-1">
                        {['business', 'hiring'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={clsx(
                                    'px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all relative overflow-hidden',
                                    activeTab === tab
                                        ? isDark ? 'bg-primary text-white shadow-[0_4px_12px_rgba(var(--color-primary-rgb),0.3)]' : 'bg-white text-primary shadow-sm border border-indigo-100'
                                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                                )}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="w-px h-6 bg-slate-200 dark:bg-white/10" />

                    {/* View Mode Switcher */}
                    <div className="flex p-1 gap-1">
                        {['abs', 'pct'].map(mode => (
                            <button
                                key={mode}
                                onClick={() => setViewMode(mode)}
                                className={clsx(
                                    'px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all',
                                    viewMode === mode
                                        ? isDark ? 'bg-white text-black' : 'bg-primary text-white shadow-lg shadow-primary/20'
                                        : 'text-slate-500'
                                )}
                            >
                                {mode === 'abs' ? 'Values' : 'Trends'}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Main Grid ── */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {cfgList.map((cfg, i) => (
                        <MetricCard
                            key={cfg.key}
                            cfg={cfg}
                            rawVal={metrics?.[cfg.key]}
                            viewMode={viewMode}
                        />
                    ))}
                </motion.div>
            </AnimatePresence>

            {/* ── Highlight Report Card ── */}
            <div className={clsx(
                'relative p-8 rounded-[2.5rem] border overflow-hidden group',
                isDark
                    ? 'bg-gradient-to-br from-indigo-500/10 via-[#0D0D1C] to-transparent border-white/[0.08]'
                    : 'bg-gradient-to-br from-white via-indigo-50/30 to-white border-indigo-100/60 shadow-lg shadow-indigo-100/40'
            )}>
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -mr-48 -mt-48 transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/5 rounded-full blur-[80px] -ml-32 -mb-32" />

                <div className="relative flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="flex items-center gap-8">
                        <div className={clsx(
                            'w-20 h-20 rounded-3xl flex items-center justify-center relative transition-transform duration-700 group-hover:rotate-6',
                            isDark ? 'bg-white/5 border border-white/10' : 'bg-indigo-50 border border-indigo-100'
                        )}>
                            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                            <TrendingUp size={36} className="text-primary relative z-10" />
                        </div>

                        <div className="space-y-2">
                            <h4 className={clsx(
                                'font-sans text-2xl font-black tracking-tight',
                                isDark ? 'text-white' : 'text-slate-900'
                            )}>
                                Global Performance Index
                            </h4>
                            <p className={clsx(
                                'font-sans text-[13px] leading-relaxed max-w-lg',
                                isDark ? 'text-slate-400' : 'text-slate-500'
                            )}>
                                Analyzing cross-departmental data through the lens of <span className="text-primary font-bold">top 8% global enterprises</span>. Your current trajectoy indicates a high probability of exceeding Q4 targets.
                            </p>
                        </div>
                    </div>

                    <button className={clsx(
                        'font-mono px-8 py-4 rounded-2xl font-black text-[12px] uppercase tracking-widest transition-all duration-300 relative group/btn overflow-hidden',
                        'bg-primary text-white shadow-[0_8px_20px_rgba(var(--color-primary-rgb),0.3)] hover:shadow-[0_12px_30px_rgba(var(--color-primary-rgb),0.5)] hover:-translate-y-1'
                    )}>
                        <span className="relative z-10 flex items-center gap-2">
                            Generate Board Deck <ArrowUpRight size={16} />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[scanline_2s_linear_infinite]" />
                    </button>
                </div>
            </div>

            {/* ── Intelligence Footer ── */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-2 border-t border-white/[0.04] dark:border-white/[0.04]">
                <div className="flex items-center gap-6 opacity-40">
                    <div className="flex items-center gap-2.5">
                        <RefreshCw size={12} className="text-primary animate-spin-slow" />
                        <span className="font-mono text-[10px] font-black uppercase tracking-widest">
                            Sync: {syncTime}
                        </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <Database size={12} className="text-violet-400" />
                        <span className="font-mono text-[10px] font-black uppercase tracking-widest">
                            Global Node: Mumbai-01
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-4 opacity-40 group cursor-help">
                    <span className="font-mono text-[10px] font-black uppercase tracking-widest transition-opacity group-hover:opacity-100">
                        Operational Status: Nominal
                    </span>
                    <LayoutGrid size={12} className="group-hover:text-primary transition-colors" />
                </div>
            </div>
        </div>
    );
};

export default CompanyMetrics;