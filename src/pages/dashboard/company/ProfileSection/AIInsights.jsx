// ─── ProfileSection/AIInsights.jsx ────────────────────────────────────────
// Provelt-exclusive AI Hiring Insights panel
import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { Sparkles, TrendingUp, Clock, AlertTriangle, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { fade, ProgressBar, Badge, useIsDark } from './shared';

const AIInsights = ({ aiInsights }) => {
    const isDark = useIsDark();

    const kpis = [
        {
            label: 'Candidate Quality Score',
            value: aiInsights.candidateQualityScore,
            max: 100,
            suffix: '/100',
            color: 'emerald',
            icon: CheckCircle2,
            note: 'Above industry avg (72)',
            good: true,
        },
        {
            label: 'Interview Drop Rate',
            value: aiInsights.interviewDropRate,
            max: 100,
            suffix: '%',
            color: 'amber',
            icon: AlertTriangle,
            note: 'Industry avg: 22%',
            good: false,
        },
    ];

    return (
        <motion.div variants={fade} custom={3}>
            <div className={clsx(
                'rounded-2xl border p-6 relative overflow-hidden transition-colors duration-300',
                isDark
                    ? 'bg-gradient-to-br from-indigo-950/60 to-violet-950/40 border-indigo-500/15'
                    : 'bg-gradient-to-br from-indigo-50/80 to-violet-50/60 border-indigo-200/60'
            )}>
                {/* Background glow */}
                <div className="absolute top-0 right-0 w-60 h-60 bg-indigo-500/[0.07] rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-violet-500/[0.06] rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2.5">
                            <div className="p-1.5 rounded-lg bg-indigo-500/15 dark:bg-indigo-500/20">
                                <Sparkles size={14} className="text-indigo-500 dark:text-indigo-300" />
                            </div>
                            <h3 className="text-[11px] font-black uppercase tracking-[0.16em] text-indigo-600 dark:text-indigo-200">
                                AI Hiring Insights
                            </h3>
                        </div>
                        <Badge variant="default">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                            Live
                        </Badge>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {/* KPI cards */}
                        {kpis.map(kpi => (
                            <div
                                key={kpi.label}
                                className={clsx(
                                    'p-4 rounded-xl border',
                                    isDark
                                        ? 'bg-slate-800 border-slate-700/60'
                                        : 'bg-white border-indigo-200/60'
                                )}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <kpi.icon
                                        size={13}
                                        className={kpi.good
                                            ? 'text-emerald-500'
                                            : 'text-amber-500'
                                        }
                                    />
                                    <span className={clsx(
                                        'text-[9px] font-bold',
                                        kpi.good ? clsx('text-emerald-600', isDark && 'text-emerald-400') : clsx('text-amber-600', isDark && 'text-amber-400')
                                    )}>
                                        {kpi.note}
                                    </span>
                                </div>
                                <p className={clsx('text-[9px] font-black uppercase tracking-widest mb-1', isDark ? 'text-slate-500' : 'text-slate-400')}>
                                    {kpi.label}
                                </p>
                                <p className={clsx('text-2xl font-black mb-2', isDark ? 'text-white' : 'text-slate-900')}>
                                    {kpi.value}{kpi.suffix}
                                </p>
                                <ProgressBar value={kpi.value} max={kpi.max} color={kpi.color} />
                            </div>
                        ))}

                        {/* Avg Time to Hire */}
                        <div className={clsx(
                            'p-4 rounded-xl border flex flex-col justify-between',
                            isDark ? 'bg-slate-800 border-slate-700/60' : 'bg-white border-indigo-200/60'
                        )}>
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Clock size={13} className="text-blue-500 dark:text-blue-400" />
                                    <p className={clsx('text-[9px] font-black uppercase tracking-widest', isDark ? 'text-slate-500' : 'text-slate-400')}>
                                        Avg Time to Hire
                                    </p>
                                </div>
                                <p className={clsx('text-2xl font-black', isDark ? 'text-white' : 'text-slate-900')}>
                                    {aiInsights.avgTimeToHire}
                                </p>
                                <p className={clsx('text-[10px] mt-1', isDark ? 'text-slate-400' : 'text-slate-500')}>Industry avg: 18 days</p>
                            </div>
                            <div className="flex items-center gap-1 mt-3 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                                <TrendingUp size={11} />
                                <span>6 days faster than peers</span>
                            </div>
                        </div>
                    </div>

                    {/* AI Recommendation */}
                    <div className={clsx(
                        'mt-4 p-4 rounded-xl border flex items-start gap-3',
                        isDark
                            ? 'bg-indigo-500/[0.08] border-indigo-500/20'
                            : 'bg-indigo-50 border-indigo-200/70'
                    )}>
                        <Sparkles size={14} className="text-indigo-500 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-[9px] font-black uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-1">
                                AI Recommendation
                            </p>
                            <p className={clsx('text-[12px] leading-relaxed', isDark ? 'text-slate-300' : 'text-slate-700')}>
                                {aiInsights.recommendation}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default AIInsights;
