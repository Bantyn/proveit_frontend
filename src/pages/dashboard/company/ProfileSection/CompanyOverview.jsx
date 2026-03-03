// ─── ProfileSection/CompanyOverview.jsx ───────────────────────────────────
// Business Overview section — modular, scalable, industry-grade B2B SaaS design.
// Stripe / Linear / Notion inspired. Light + Dark theme support.

import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import {
    Target,
    Layers,
    DollarSign,
    Edit3,
    TrendingUp,
    Users,
    BarChart2,
    CheckCircle2,
    ArrowUpRight,
    Briefcase,
    Zap,
} from 'lucide-react';
import { fade, SectionCard, GhostBtn, useIsDark } from './shared';

/* ─── Color maps (theme-agnostic keys only — no dark: prefix) ──────────────── */
const INFO_CARD_CONFIG = {
    indigo: {
        darkCardBg: 'bg-[#12121F]',
        darkBorder: 'border-l-indigo-500/60 border-white/[0.07]',
        darkHoverBorder: 'hover:border-l-indigo-400 hover:border-white/[0.12]',
        lightCardBg: 'bg-white',
        lightBorder: 'border-slate-200/80 border-l-indigo-400',
        lightHoverBorder: 'hover:border-l-indigo-500 hover:border-indigo-200/80',
        lightIconBg: 'bg-indigo-50',
        darkIconBg: 'bg-indigo-500/[0.12]',
        lightIconText: 'text-indigo-600',
        darkIconText: 'text-indigo-300',
        lightLabel: 'text-indigo-600',
        darkLabel: 'text-indigo-400',
        accent: 'from-indigo-500',
        hoverShadow: 'hover:shadow-indigo-100/90',
    },
    violet: {
        darkCardBg: 'bg-[#12121F]',
        darkBorder: 'border-l-violet-500/60 border-white/[0.07]',
        darkHoverBorder: 'hover:border-l-violet-400 hover:border-white/[0.12]',
        lightCardBg: 'bg-white',
        lightBorder: 'border-slate-200/80 border-l-violet-400',
        lightHoverBorder: 'hover:border-l-violet-500 hover:border-violet-200/80',
        lightIconBg: 'bg-violet-50',
        darkIconBg: 'bg-violet-500/[0.12]',
        lightIconText: 'text-violet-600',
        darkIconText: 'text-violet-300',
        lightLabel: 'text-violet-600',
        darkLabel: 'text-violet-400',
        accent: 'from-violet-500',
        hoverShadow: 'hover:shadow-violet-100/90',
    },
    emerald: {
        darkCardBg: 'bg-[#12121F]',
        darkBorder: 'border-l-emerald-500/60 border-white/[0.07]',
        darkHoverBorder: 'hover:border-l-emerald-400 hover:border-white/[0.12]',
        lightCardBg: 'bg-white',
        lightBorder: 'border-slate-200/80 border-l-emerald-400',
        lightHoverBorder: 'hover:border-l-emerald-500 hover:border-emerald-200/80',
        lightIconBg: 'bg-emerald-50',
        darkIconBg: 'bg-emerald-500/[0.12]',
        lightIconText: 'text-emerald-600',
        darkIconText: 'text-emerald-300',
        lightLabel: 'text-emerald-700',
        darkLabel: 'text-emerald-400',
        accent: 'from-emerald-500',
        hoverShadow: 'hover:shadow-emerald-100/90',
    },
};

/* ─── Sub-component: Info Card ─────────────────────────────────────────────── */
const InfoCard = ({ label, value, description, icon: Icon, color = 'indigo', index = 0 }) => {
    const isDark = useIsDark();
    const c = INFO_CARD_CONFIG[color] || INFO_CARD_CONFIG.indigo;

    return (
        <motion.div
            variants={fade}
            custom={index}
            whileHover={{ y: -2, transition: { duration: 0.18 } }}
            className={clsx(
                'group relative flex flex-col gap-3 p-4 rounded-xl border-[1.5px] border-l-[3px] overflow-hidden cursor-default',
                'transition-all duration-200',
                isDark ? c.darkCardBg : c.lightCardBg,
                isDark
                    ? clsx(c.darkBorder, c.darkHoverBorder, 'hover:shadow-md hover:shadow-black/20')
                    : clsx(c.lightBorder, c.lightHoverBorder, 'hover:shadow-lg', c.hoverShadow)
            )}
        >
            {/* Icon + label */}
            <div className="flex items-center gap-2.5">
                <div className={clsx(
                    'p-2 rounded-lg transition-transform duration-200 group-hover:scale-105',
                    isDark ? c.darkIconBg : c.lightIconBg
                )}>
                    <Icon size={13} className={isDark ? c.darkIconText : c.lightIconText} strokeWidth={2.5} />
                </div>
                <span className={clsx(
                    'text-[10px] font-mono font-black uppercase tracking-[0.2em]',
                    isDark ? c.darkLabel : c.lightLabel
                )}>
                    {label}
                </span>
            </div>

            {/* Value */}
            <p className={clsx(
                'text-[15px] font-black leading-snug tracking-tight',
                isDark ? 'text-[#EBEBFF]' : 'text-slate-800'
            )}>
                {value}
            </p>

            {/* Description */}
            {description && (
                <p className={clsx(
                    'text-[11px] leading-relaxed font-medium',
                    isDark ? 'text-text-secondary' : 'text-slate-500'
                )}>
                    {description}
                </p>
            )}
        </motion.div>
    );
};

/* ─── Sub-component: KPI Metric ─────────────────────────────────────────────── */
const KPI_COLOR_MAP = {
    indigo: {
        lightText: 'text-indigo-600', darkText: 'text-indigo-300',
        lightBg: 'bg-indigo-50', darkBg: 'bg-indigo-500/[0.12]',
        lightCard: 'bg-white', darkCard: 'bg-[#12121F]',
        lightBorder: 'border-slate-200/80 border-l-[3px] border-l-indigo-400',
        darkBorder: 'border-white/[0.07] border-l-[3px] border-l-indigo-500/60',
        lightHover: 'hover:border-l-indigo-500 hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-100/60',
        darkHover: 'hover:border-l-indigo-400 hover:border-white/[0.12]',
    },
    emerald: {
        lightText: 'text-emerald-600', darkText: 'text-emerald-300',
        lightBg: 'bg-emerald-50', darkBg: 'bg-emerald-500/[0.12]',
        lightCard: 'bg-white', darkCard: 'bg-[#12121F]',
        lightBorder: 'border-slate-200/80 border-l-[3px] border-l-emerald-400',
        darkBorder: 'border-white/[0.07] border-l-[3px] border-l-emerald-500/60',
        lightHover: 'hover:border-l-emerald-500 hover:border-emerald-200 hover:shadow-md hover:shadow-emerald-100/60',
        darkHover: 'hover:border-l-emerald-400 hover:border-white/[0.12]',
    },
    violet: {
        lightText: 'text-violet-600', darkText: 'text-violet-300',
        lightBg: 'bg-violet-50', darkBg: 'bg-violet-500/[0.12]',
        lightCard: 'bg-white', darkCard: 'bg-[#12121F]',
        lightBorder: 'border-slate-200/80 border-l-[3px] border-l-violet-400',
        darkBorder: 'border-white/[0.07] border-l-[3px] border-l-violet-500/60',
        lightHover: 'hover:border-l-violet-500 hover:border-violet-200 hover:shadow-md hover:shadow-violet-100/60',
        darkHover: 'hover:border-l-violet-400 hover:border-white/[0.12]',
    },
};

const KpiMetric = ({ label, value, trend, icon: Icon, color = 'indigo' }) => {
    const isDark = useIsDark();
    const c = KPI_COLOR_MAP[color] || KPI_COLOR_MAP.indigo;

    return (
        <div className={clsx(
            'group flex items-center gap-3 px-4 py-3.5 rounded-xl border-[1.5px]',
            'transition-all duration-200 cursor-default flex-1 min-w-0',
            isDark ? c.darkCard : c.lightCard,
            isDark ? c.darkBorder : c.lightBorder,
            isDark ? c.darkHover : c.lightHover,
        )}>
            {/* Icon container */}
            <div className={clsx('p-2 rounded-lg flex-shrink-0', isDark ? c.darkBg : c.lightBg)}>
                <Icon size={14} className={isDark ? c.darkText : c.lightText} strokeWidth={2.5} />
            </div>

            {/* Data */}
            <div className="min-w-0">
                {/* Big number — matches dashboard text-3xl font-black */}
                <p className={clsx(
                    'text-2xl font-black tracking-tighter leading-none',
                    isDark ? 'text-text-main' : 'text-gradient-vivid'
                )}>
                    {value}
                </p>
                {/* Label — font-mono matches dashboard */}
                <p className={clsx(
                    'text-[10px] font-mono font-black uppercase tracking-[0.2em] mt-0.5 truncate',
                    isDark ? 'text-text-secondary' : 'text-slate-400'
                )}>
                    {label}
                </p>
            </div>

            {/* Trend badge */}
            {trend && (
                <span className="ml-auto flex-shrink-0 flex items-center gap-0.5 text-[10px] font-mono font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
                    <ArrowUpRight size={9} />
                    {trend}
                </span>
            )}
        </div>
    );
};

/* ─── Sub-component: Service Chip ───────────────────────────────────────────── */
const ServiceChip = ({ label, active = true }) => {
    const isDark = useIsDark();
    return (
        <motion.span
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.15 }}
            className={clsx(
                'group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg',
                'text-[11px] font-semibold border cursor-default select-none',
                'transition-all duration-200',
                active
                    ? isDark
                        ? 'bg-slate-800 border-slate-700 text-slate-300 hover:border-indigo-500/50 hover:bg-slate-700 hover:text-indigo-300'
                        : 'bg-slate-100 border-slate-200 text-slate-700 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700'
                    : isDark
                        ? 'bg-slate-800/60 border-slate-700/50 text-slate-600'
                        : 'bg-slate-50 border-slate-200 text-slate-400'
            )}
        >
            {/* Status dot */}
            <span className={clsx(
                'w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors duration-200',
                active
                    ? 'bg-emerald-500 group-hover:bg-indigo-500'
                    : isDark ? 'bg-slate-600' : 'bg-slate-300'
            )} />
            {label}
        </motion.span>
    );
};

/* ─── Divider ────────────────────────────────────────────────────────────────── */
const Divider = () => {
    const isDark = useIsDark();
    return <div className={clsx('border-t my-6', isDark ? 'border-slate-700/60' : 'border-slate-100')} />;
};

/* ─── Section label ─── font-mono, tracking-[0.2em] exactly like dashboard ── */
const SectionLabel = ({ children, isDark }) => (
    <p className={clsx(
        'text-[10px] font-mono font-black uppercase tracking-[0.2em] mb-3 flex items-center gap-2',
        isDark ? 'text-text-secondary' : 'text-slate-400'
    )}>
        <span className="w-4 h-px bg-gradient-to-r from-indigo-500 to-transparent" />
        {children}
    </p>
);

/* ─── Main Component ─────────────────────────────────────────────────────────── */
const CompanyOverview = ({ overview, metrics }) => {
    const isDark = useIsDark();

    const arr = metrics?.revenueThisYear ?? '—';
    const clients = metrics?.clientsServed ?? '—';
    const growth = metrics?.growthPercent != null ? `${metrics.growthPercent}%` : '—';

    const kpis = [
        { label: 'ARR', value: arr, icon: BarChart2, color: 'indigo', trend: null },
        { label: 'Clients', value: clients, icon: Users, color: 'emerald', trend: '+24 YoY' },
        { label: 'Growth', value: growth, icon: TrendingUp, color: 'violet', trend: 'YoY' },
    ];

    const infoCards = [
        {
            label: 'Target Market',
            value: overview.targetMarket,
            description: 'Primary addressable segment for customer acquisition and expansion.',
            icon: Target,
            color: 'indigo',
        },
        {
            label: 'Business Model',
            value: overview.businessModel,
            description: 'Core go-to-market motion and monetisation structure.',
            icon: Briefcase,
            color: 'violet',
        },
        {
            label: 'Revenue Model',
            value: overview.revenueModel,
            description: 'Predictable revenue stream underpinning financial growth.',
            icon: DollarSign,
            color: 'emerald',
        },
    ];

    return (
        <motion.div variants={fade} custom={1}>
            <SectionCard
                title="Business Overview"
                icon={Layers}
                action={
                    <GhostBtn>
                        <Edit3 size={11} />
                        Edit
                    </GhostBtn>
                }
            >
                {/* ── Company Description ─────────────────────── */}
                <div className={clsx(
                    'mb-5 p-4 rounded-xl border',
                    isDark ? 'bg-[#12121F] border-white/[0.07]' : 'bg-[#F3F4FF] border-indigo-100/70'
                )}>
                    <div className="flex items-center gap-2 mb-2.5">
                        <Zap size={11} className="text-indigo-500" strokeWidth={2.5} />
                        <span className={clsx(
                            'text-[10px] font-mono font-black uppercase tracking-[0.2em]',
                            isDark ? 'text-text-secondary' : 'text-slate-400'
                        )}>
                            About
                        </span>
                    </div>
                    <p className={clsx(
                        'text-[14px] leading-relaxed font-medium',
                        isDark ? 'text-text-secondary' : 'text-slate-600'
                    )}>
                        {overview.about}
                    </p>
                </div>

                <Divider />

                {/* ── 3 Info Cards ────────────────────────────── */}
                <div className="mb-1">
                    <SectionLabel isDark={isDark}>Business Profile</SectionLabel>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {infoCards.map((card, i) => (
                            <InfoCard key={card.label} {...card} index={i} />
                        ))}
                    </div>
                </div>

                <Divider />

                {/* ── KPI Micro Metrics Row ────────────────────── */}
                <div className="mb-1">
                    <SectionLabel isDark={isDark}>Key Metrics</SectionLabel>
                    <div className="flex flex-col sm:flex-row gap-2.5">
                        {kpis.map(kpi => (
                            <KpiMetric key={kpi.label} {...kpi} />
                        ))}
                    </div>
                </div>

                <Divider />

                {/* ── Core Services Chips ──────────────────────── */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <SectionLabel isDark={isDark}>Core Services</SectionLabel>
                        <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-600">
                            <CheckCircle2 size={10} strokeWidth={2.5} />
                            All Active
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {overview.coreServices.map((s) => (
                            <ServiceChip key={s} label={s} active />
                        ))}
                    </div>
                </div>

            </SectionCard>
        </motion.div >
    );
};

export default CompanyOverview;
