// ─── ProfileSection/shared.jsx ───────────────────────────────────────────────
// Shared micro-components for all CompanyProfile section panels.
// Typography aligned with CompanyDashboard.jsx — Space Mono for labels,
// Outfit for body, gradient headings, CSS var colors.

import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { ArrowUpRight, Crown } from 'lucide-react';
import { useTheme } from '../../../../context/ThemeContext';

/* ── Animation variants ──────────────────────────────────────── */
export const fade = {
    hidden: { opacity: 0, y: 18 },
    visible: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.52, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
    }),
};

export const slideIn = {
    hidden: { opacity: 0, x: 14 },
    visible: (i = 0) => ({
        opacity: 1, x: 0,
        transition: { duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
    }),
    exit: { opacity: 0, x: -10, transition: { duration: 0.2 } },
};

/* ── useIsDark hook ──────────────────────────────────────────── */
export const useIsDark = () => {
    const { theme } = useTheme();
    return theme === 'dark';
};

/* ── Badge ───────────────────────────────────────────────────── */
const BADGE_LIGHT = {
    default: 'bg-indigo-500/10 text-indigo-600 border-indigo-400/25',
    success: 'bg-emerald-500/10 text-emerald-700 border-emerald-400/25',
    warning: 'bg-amber-500/10 text-amber-700 border-amber-400/25',
    muted: 'bg-[#EEF0FD] text-slate-500 border-indigo-100/80',
    owner: 'bg-violet-500/10 text-violet-700 border-violet-400/25',
    admin: 'bg-blue-500/10 text-blue-700 border-blue-400/25',
    live: 'bg-emerald-500/10 text-emerald-700 border-emerald-400/25 animate-pulse',
    danger: 'bg-rose-500/10 text-rose-700 border-rose-400/25',
};

const BADGE_DARK = {
    default: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/25',
    success: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
    warning: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
    muted: 'bg-[#1A1A2E] text-slate-400 border-white/[0.07]',
    owner: 'bg-violet-500/15 text-violet-300 border-violet-500/25',
    admin: 'bg-blue-500/15 text-blue-300 border-blue-500/25',
    live: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25 animate-pulse',
    danger: 'bg-rose-500/15 text-rose-400 border-rose-500/25',
};

export const Badge = ({ children, variant = 'default', className = '' }) => {
    const isDark = useIsDark();
    const map = isDark ? BADGE_DARK : BADGE_LIGHT;
    return (
        <span className={clsx(
            // font-mono matches dashboard data label style
            'inline-flex items-center gap-1.5 px-2.5 py-[3px] rounded-full font-mono font-bold border text-[10px] tracking-wide uppercase',
            map[variant] || map.default,
            className
        )}>
            {children}
        </span>
    );
};

/* ── Toggle ──────────────────────────────────────────────────── */
export const Toggle = ({ enabled, onChange }) => {
    const isDark = useIsDark();
    return (
        <button
            onClick={onChange}
            className={clsx(
                'relative inline-flex items-center w-11 h-[22px] rounded-full transition-all duration-300 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-indigo-500/30',
                enabled
                    ? 'bg-gradient-to-r from-indigo-500 to-violet-500 shadow-md shadow-indigo-500/25'
                    : isDark ? 'bg-slate-700' : 'bg-slate-200'
            )}
            aria-checked={enabled}
            role="switch"
        >
            <span className={clsx(
                'inline-block w-[16px] h-[16px] rounded-full bg-white shadow-sm transition-transform duration-300',
                enabled ? 'translate-x-[22px]' : 'translate-x-[3px]'
            )} />
        </button>
    );
};

/* ── Progress Bar ────────────────────────────────────────────── */
const PROGRESS_COLORS = {
    indigo: 'from-indigo-500 to-violet-500',
    emerald: 'from-emerald-500 to-teal-400',
    amber: 'from-amber-400 to-orange-400',
    rose: 'from-rose-500 to-pink-400',
    blue: 'from-blue-500 to-cyan-400',
};

export const ProgressBar = ({ value, max = 100, color = 'indigo', className = '' }) => {
    const isDark = useIsDark();
    const pct = Math.min((value / max) * 100, 100);
    return (
        <div className={clsx('h-1.5 w-full rounded-full overflow-hidden', isDark ? 'bg-[#1A1A2E]' : 'bg-[#EEF0FD]', className)}>
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                className={clsx('h-full rounded-full bg-gradient-to-r', PROGRESS_COLORS[color] || PROGRESS_COLORS.indigo)}
            />
        </div>
    );
};

/* ── Stat Card ───────────────────────────────────────────────── */
const STAT_COLORS = {
    indigo: { lightText: 'text-indigo-500', darkText: 'text-indigo-400', bg: 'bg-indigo-500/10', accent: 'from-indigo-500' },
    emerald: { lightText: 'text-emerald-600', darkText: 'text-emerald-400', bg: 'bg-emerald-500/10', accent: 'from-emerald-500' },
    amber: { lightText: 'text-amber-600', darkText: 'text-amber-400', bg: 'bg-amber-500/10', accent: 'from-amber-500' },
    violet: { lightText: 'text-violet-600', darkText: 'text-violet-400', bg: 'bg-violet-500/10', accent: 'from-violet-500' },
    blue: { lightText: 'text-blue-600', darkText: 'text-blue-400', bg: 'bg-blue-500/10', accent: 'from-blue-500' },
    rose: { lightText: 'text-rose-600', darkText: 'text-rose-400', bg: 'bg-rose-500/10', accent: 'from-rose-500' },
    cyan: { lightText: 'text-cyan-600', darkText: 'text-cyan-400', bg: 'bg-cyan-500/10', accent: 'from-cyan-500' },
    orange: { lightText: 'text-orange-600', darkText: 'text-orange-400', bg: 'bg-orange-500/10', accent: 'from-orange-500' },
};

export const StatCard = ({ label, value, icon: Icon, color = 'indigo', suffix = '', trend, custom = 0 }) => {
    const isDark = useIsDark();
    const c = STAT_COLORS[color] || STAT_COLORS.indigo;
    return (
        <motion.div
            variants={fade}
            custom={custom}
            whileHover={{ y: -3, transition: { duration: 0.18 } }}
            className={clsx(
                'group relative p-5 rounded-2xl border overflow-hidden cursor-default transition-all duration-300',
                isDark
                    ? 'bg-[#12121F] border-white/[0.07] hover:border-white/[0.12] shadow-[0_4px_20px_rgba(0,0,0,0.35)]'
                    : 'bg-white border-indigo-100/80 hover:border-indigo-200 shadow-md shadow-indigo-100/40 hover:shadow-lg hover:shadow-indigo-100/60'
            )}
        >
            {/* colour accent top bar on hover */}
            <div className={clsx(
                'absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300',
                c.accent
            )} />
            <div className="flex items-start justify-between mb-3">
                <div className={clsx('p-2.5 rounded-xl transition-transform duration-300 group-hover:scale-110', c.bg)}>
                    <Icon size={15} className={isDark ? c.darkText : c.lightText} strokeWidth={2.5} />
                </div>
                {trend && (
                    <span className="flex items-center gap-0.5 text-[10px] font-mono font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
                        <ArrowUpRight size={10} />{trend}
                    </span>
                )}
            </div>
            {/* Big value — matches dashboard text-3xl font-black style */}
            <p className={clsx(
                'text-3xl font-black tracking-tighter leading-none mb-1.5',
                isDark ? 'text-text-main' : 'text-gradient-vivid'
            )}>
                {value}{suffix}
            </p>
            {/* Label — matches dashboard font-mono label style */}
            <p className={clsx(
                'text-[10px] font-mono font-black tracking-[0.2em] uppercase',
                isDark ? 'text-text-secondary' : 'text-slate-400'
            )}>{label}</p>
        </motion.div>
    );
};

/* ── Section Card ────────────────────────────────────────────── */
export const SectionCard = ({ children, className = '', title, icon: Icon, action, noPad = false }) => {
    const isDark = useIsDark();
    return (
        <div className={clsx(
            'rounded-2xl border transition-all duration-300',
            isDark
                ? 'bg-[#0D0D1C] border-white/[0.07] shadow-[0_4px_24px_rgba(0,0,0,0.40)]'
                : 'bg-white border-indigo-100/70 shadow-md shadow-indigo-100/40 hover:shadow-lg hover:shadow-indigo-100/60',
            noPad ? '' : 'p-6',
            className
        )}>
            {(title || action) && (
                <div className={clsx('flex items-center justify-between', noPad ? 'px-6 pt-6 pb-5' : 'mb-5')}>
                    <div className="flex items-center gap-3">
                        {/* Left accent bar */}
                        <div className="w-1.5 h-6 rounded-full flex-shrink-0 bg-primary shadow-[0_0_12px_rgba(var(--color-primary-rgb),0.4)]" />
                        {title && (
                            <h3 className={clsx(
                                'text-xl font-black uppercase tracking-tighter pb-0.5',
                                isDark ? 'text-[#EBEBFF]' : 'text-gradient-vivid'
                            )}>
                                {title}
                            </h3>
                        )}
                    </div>
                    {action}
                </div>
            )}
            {children}
        </div>
    );
};

/* ── Member Row ──────────────────────────────────────────────── */
export const MemberRow = ({ member, isOwner = false }) => {
    const isDark = useIsDark();
    return (
        <div className={clsx(
            'flex items-center gap-3 py-2 px-2 rounded-xl transition-all cursor-pointer group',
            isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-50'
        )}>
            <div className="relative flex-shrink-0">
                <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-8 h-8 rounded-full border-2 border-transparent group-hover:border-indigo-400/30 transition-all"
                />
                {isOwner && (
                    <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-amber-400 flex items-center justify-center shadow">
                        <Crown size={7} className="text-amber-900" />
                    </div>
                )}
            </div>
            <div className="flex-1 min-w-0">
                {/* Name — font-sans bold, matches dashboard text-text-main */}
                <p className={clsx(
                    'text-[13px] font-bold truncate',
                    isDark ? 'text-text-main' : 'text-slate-800'
                )}>{member.name}</p>
                {/* Role — font-mono micro label */}
                <p className={clsx(
                    'text-[10px] font-mono font-medium truncate',
                    isDark ? 'text-text-secondary' : 'text-slate-400'
                )}>{member.role}</p>
            </div>
            <Badge variant={
                member.badge?.toLowerCase() === 'owner' ? 'owner' :
                    member.badge?.toLowerCase() === 'admin' ? 'admin' : 'muted'
            }>
                {member.badge}
            </Badge>
        </div>
    );
};

/* ── Ghost Button ────────────────────────────────────────────── */
export const GhostBtn = ({ children, className = '', onClick, danger = false, full = false }) => {
    const isDark = useIsDark();
    return (
        <button
            onClick={onClick}
            className={clsx(
                'flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl text-[11px] font-semibold tracking-wide border transition-all duration-200',
                danger
                    ? isDark
                        ? 'border-rose-500/20 text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/30'
                        : 'border-rose-400/30 text-rose-600 hover:bg-rose-50 hover:border-rose-400/50'
                    : isDark
                        ? 'border-white/[0.08] text-slate-400 hover:bg-indigo-500/[0.07] hover:border-indigo-500/25 hover:text-indigo-300'
                        : 'border-indigo-200/70 text-slate-600 hover:bg-indigo-50/70 hover:border-indigo-300 hover:text-indigo-700',
                full && 'w-full',
                className
            )}
        >
            {children}
        </button>
    );
};

/* ── Primary Button ──────────────────────────────────────────── */
export const PrimaryBtn = ({ children, className = '', onClick, full = false }) => (
    <button
        onClick={onClick}
        className={clsx(
            'flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-[11px] font-bold tracking-wide',
            'bg-primary hover:bg-primary/90 text-white',
            'shadow-[0_4px_14px_rgba(var(--color-primary-rgb),0.30)] hover:shadow-[0_6px_20px_rgba(var(--color-primary-rgb),0.40)]',
            'active:scale-[0.97] transition-all duration-200',
            full && 'w-full',
            className
        )}
    >
        {children}
    </button>
);
