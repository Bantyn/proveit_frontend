// ─── ProfileSection/CompanyHeader.jsx ─────────────────────────────────────
import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import {
    Building2, MapPin, Users, Globe,
    Edit3, CheckCircle2, Clock, Sparkles,
    ExternalLink, TrendingUp, Upload, ShieldCheck,
    Wifi,
} from 'lucide-react';
import { fade, Badge, ProgressBar, PrimaryBtn, GhostBtn, useIsDark } from './shared';

/* ── Meta Pill — upgraded with micro-lift hover ── */
const MetaPill = ({ icon: Icon, children, href }) => {
    const base = clsx(
        'flex items-center gap-1.5 text-[11px] font-semibold transition-all duration-200',
        'px-2 py-1 rounded-lg',
        'text-slate-500 dark:text-slate-400',
        'hover:-translate-y-[1px] hover:bg-slate-100 dark:hover:bg-white/[0.04]',
        '-mx-2'                // offset so hover bg doesn't shift layout
    );

    if (href) {
        return (
            <a href={href} target="_blank" rel="noreferrer"
                className={clsx(base, 'text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 cursor-pointer')}>
                <Icon size={12} className="flex-shrink-0" />
                {children}
                <ExternalLink size={9} className="opacity-50" />
            </a>
        );
    }
    return (
        <span className={base}>
            <Icon size={12} className="text-indigo-400/70 flex-shrink-0" />
            {children}
        </span>
    );
};

/* ── Verified Tooltip Badge ── */
const VerifiedBadge = () => (
    <div className="relative group/verified inline-flex">
        <Badge variant="success">
            <CheckCircle2 size={9} /> Verified
        </Badge>
        {/* Tooltip */}
        <div className={clsx(
            'absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50',
            'w-[180px] px-3 py-2 rounded-xl text-center',
            'bg-slate-900 dark:bg-[#1a1a2e] text-white text-[10px] font-medium leading-relaxed',
            'shadow-xl border border-white/10',
            'opacity-0 scale-95 group-hover/verified:opacity-100 group-hover/verified:scale-100',
            'transition-all duration-200 pointer-events-none'
        )}>
            <ShieldCheck size={10} className="text-emerald-400 mx-auto mb-1" />
            This company has been verified by Provelt.io
            {/* Arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900 dark:border-t-[#1a1a2e]" />
        </div>
    </div>
);

/* ── Logo Block — with Upload overlay ── */
const LogoBlock = ({ logo, isDark }) => (
    <div className="relative flex-shrink-0 group/logo">
        <div className={clsx(
            'w-[64px] h-[64px] rounded-2xl border-2 flex items-center justify-center transition-all duration-300 cursor-pointer overflow-hidden',
            isDark
                ? 'bg-gradient-to-br from-indigo-500/15 to-violet-500/10 border-indigo-500/30 group-hover/logo:border-indigo-400/60 shadow-lg shadow-indigo-500/10'
                : 'bg-gradient-to-br from-indigo-50 to-violet-50 border-indigo-200 group-hover/logo:border-indigo-400/70 shadow-md shadow-indigo-100'
        )}>
            {logo
                ? <img src={logo} alt="Company logo" className="w-full h-full object-cover" />
                : <Building2 size={28} className="text-indigo-500 dark:text-indigo-400 group-hover/logo:scale-110 transition-transform duration-300" strokeWidth={1.5} />
            }

            {/* Upload overlay on hover */}
            <div className={clsx(
                'absolute inset-0 flex flex-col items-center justify-center gap-0.5',
                'bg-indigo-600/80 dark:bg-indigo-700/85 backdrop-blur-[2px]',
                'opacity-0 group-hover/logo:opacity-100 transition-opacity duration-250',
                'rounded-2xl'
            )}>
                <Upload size={14} className="text-white" strokeWidth={2} />
                <span className="text-[8px] font-black text-white/90 tracking-wide">UPLOAD</span>
            </div>
        </div>

        {/* Glow ring (dark only) */}
        {isDark && (
            <div className="absolute inset-0 rounded-2xl blur-xl bg-indigo-400/30 -z-10 scale-110" />
        )}
    </div>
);

/* ══════════════════════════════════════════════════════ */
const CompanyHeader = ({ basicInfo }) => {
    const isDark = useIsDark();

    // Dynamic missing items for profile health copy
    const missingItems = [
        !basicInfo.logo && 'Logo',
        !basicInfo.customDomain && 'Custom Domain',
    ].filter(Boolean);

    return (
        <motion.div variants={fade} custom={0}>
            <div className={clsx(
                'rounded-2xl border relative overflow-hidden transition-colors duration-300',
                isDark
                    ? 'bg-[#0D0D18] border-white/[0.07]'
                    : 'bg-white border-slate-200/80 shadow-sm shadow-slate-100/60'
            )}>
                {/* Ambient blobs */}
                <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500/[0.07] dark:bg-indigo-500/[0.09] rounded-full blur-[80px] pointer-events-none -mr-16 -mt-16" />
                <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-violet-500/[0.05] dark:bg-violet-500/[0.07] rounded-full blur-[60px] pointer-events-none" />

                {/* Top accent stripe — more vivid */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent dark:via-indigo-400/80" />

                <div className="relative z-10 p-6">
                    <div className="flex flex-col md:flex-row gap-6 items-start justify-between">

                        {/* ── Left: Logo + Info ── */}
                        <div className="flex items-start gap-5">

                            <LogoBlock logo={basicInfo.logo} isDark={isDark} />

                            <div className="min-w-0">
                                {/* Company name — ONE gradient, this one earns it */}
                                <div className="flex items-baseline gap-3 flex-wrap mb-1">
                                    <h1 className="text-2xl md:text-[28px] font-black tracking-tight leading-none bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-400 bg-clip-text text-transparent">
                                        {basicInfo.name}
                                    </h1>
                                    <span className="text-slate-300 dark:text-slate-700 font-light text-xl hidden sm:inline">·</span>
                                    {/* Industry — clean semantic, no gradient */}
                                    <span className="text-[13px] font-bold tracking-wide text-slate-500 dark:text-slate-400">
                                        {basicInfo.industry}
                                    </span>
                                </div>

                                {/* Badges row */}
                                <div className="flex items-center gap-2 flex-wrap mb-3">
                                    {basicInfo.verified && <VerifiedBadge />}
                                    <Badge variant={basicInfo.status === 'Active' ? 'live' : 'danger'}>
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 inline-block" />
                                        {basicInfo.status}
                                    </Badge>
                                    <Badge variant="muted">
                                        <TrendingUp size={8} /> Est. {basicInfo.founded}
                                    </Badge>
                                </div>

                                {/* Tagline — clean, no gradient */}
                                <p className="text-sm italic font-medium mb-3 leading-relaxed text-slate-500 dark:text-slate-400">
                                    "{basicInfo.tagline}"
                                </p>

                                {/* Activity indicator */}
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                                        <Wifi size={10} />
                                        Active now
                                    </span>
                                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700 inline-block" />
                                    <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">
                                        Last updated {basicInfo.lastUpdated}
                                    </span>
                                </div>

                                {/* Meta row */}
                                <div className="flex flex-wrap items-center gap-x-1 gap-y-1">
                                    <MetaPill icon={MapPin}>{basicInfo.hq}</MetaPill>
                                    <MetaPill icon={Users}>{basicInfo.size}</MetaPill>
                                    <MetaPill icon={Globe} href={basicInfo.website}>{basicInfo.website}</MetaPill>
                                    <MetaPill icon={Clock}>Updated {basicInfo.lastUpdated}</MetaPill>
                                </div>
                            </div>
                        </div>

                        {/* ── Right: Profile Health + Stats + CTAs ── */}
                        <div className="flex flex-col gap-3 w-full md:w-[260px] flex-shrink-0">

                            {/* Profile completion card */}
                            <div className={clsx(
                                'p-4 rounded-xl border relative overflow-hidden',
                                isDark
                                    ? 'bg-gradient-to-br from-indigo-500/[0.09] to-violet-500/[0.05] border-indigo-500/20'
                                    : 'bg-gradient-to-br from-indigo-50/90 to-violet-50/70 border-indigo-200/70'
                            )}>
                                <div className="flex justify-between items-center mb-1.5">
                                    <span className={clsx(
                                        'text-[9px] font-black uppercase tracking-[0.18em] flex items-center gap-1.5',
                                        isDark ? 'text-indigo-300/60' : 'text-indigo-500/70'
                                    )}>
                                        <Sparkles size={9} />
                                        Profile Health
                                    </span>
                                    {/* Completion % — second gradient, intentional */}
                                    <span className={clsx(
                                        'text-lg font-black',
                                        isDark
                                            ? 'bg-gradient-to-br from-indigo-300 to-violet-300 bg-clip-text text-transparent'
                                            : 'bg-gradient-to-br from-indigo-600 to-violet-500 bg-clip-text text-transparent'
                                    )}>
                                        {basicInfo.completion}%
                                    </span>
                                </div>
                                <ProgressBar value={basicInfo.completion} max={100} />
                                {/* Dynamic missing items copy */}
                                <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-2 leading-relaxed">
                                    {missingItems.length > 0
                                        ? <>Missing: <span className="font-bold text-slate-600 dark:text-slate-300">{missingItems.join(', ')}</span></>
                                        : <span className="font-bold text-emerald-600 dark:text-emerald-400">Profile is complete 🎉</span>
                                    }
                                </p>
                            </div>

                            {/* Quick stats strip */}
                            <div className={clsx(
                                'grid grid-cols-2 gap-2 p-3 rounded-xl border',
                                isDark
                                    ? 'bg-[#12121F] border-white/[0.07]'
                                    : 'bg-indigo-50/40 border-indigo-100/60'
                            )}>
                                {[
                                    { label: 'Business Model', value: basicInfo.businessModel },
                                    { label: 'Market', value: basicInfo.targetMarket },
                                ].map(item => (
                                    <div key={item.label}>
                                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-600 mb-0.5">
                                            {item.label}
                                        </p>
                                        <p className="text-[10px] font-bold text-slate-700 dark:text-slate-300 leading-snug truncate">
                                            {item.value}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* CTA buttons — swapped hierarchy */}
                            <div className="flex gap-2">
                                {/* Primary = Edit Profile (most used on dashboard) */}
                                <PrimaryBtn full className="flex-1">
                                    <Edit3 size={12} /> Edit Profile
                                </PrimaryBtn>
                                {/* Secondary = Visit Website */}
                                <GhostBtn full className="flex-1">
                                    <ExternalLink size={12} /> Website
                                </GhostBtn>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default CompanyHeader;
