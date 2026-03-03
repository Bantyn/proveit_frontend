import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import {
    Palette, Upload, Edit3,
    CheckCircle2, Copy, Check,
    Sparkles, ImageIcon,
} from 'lucide-react';
import { fade, SectionCard, GhostBtn, PrimaryBtn, useIsDark } from './shared';

/* ── Palette extras ─────────────────────────────────────────────── */
const PALETTE_EXTRAS = ['#818cf8', '#c084fc', '#34d399', '#fb923c', '#f87171', '#38bdf8'];

/* ── Sub-label — matches CompanyMetrics / CompanyOverview ───────── */
const SubLabel = ({ children, isDark }) => (
    <p className={clsx(
        'text-[9px] font-mono font-black uppercase tracking-[0.2em] mb-3 flex items-center gap-2',
        isDark ? 'text-text-secondary' : 'text-slate-400'
    )}>
        <span className="w-3 h-px flex-shrink-0" style={{ background: 'linear-gradient(90deg,#6366f1,transparent)' }} />
        {children}
    </p>
);

/* ── Clickable swatch with copy feedback ────────────────────────── */
const Swatch = ({ color, size = 'sm', isDark }) => {
    const [ok, setOk] = useState(false);
    const copy = () => {
        navigator.clipboard.writeText(color).catch(() => { });
        setOk(true);
        setTimeout(() => setOk(false), 1400);
    };
    const dim = size === 'lg' ? 'w-14 h-14 rounded-2xl' : 'w-8 h-8 rounded-xl';
    return (
        <motion.button
            whileHover={{ y: -3, scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={copy}
            title={`Copy ${color}`}
            className={clsx('relative flex-shrink-0 ring-1 ring-black/10 focus:outline-none shadow-md', dim)}
            style={{ background: color }}
        >
            {ok && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 rounded-[inherit] flex items-center justify-center bg-black/30 backdrop-blur-sm"
                >
                    <Check size={ok && size === 'lg' ? 16 : 10} className="text-white" />
                </motion.div>
            )}
        </motion.button>
    );
};

/* ── Logo drop zone ─────────────────────────────────────────────── */
const LogoZone = ({ uploaded, isDark }) => {
    const [hovered, setHovered] = useState(false);
    return (
        <motion.div
            whileHover={{ scale: 1.01 }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            className={clsx(
                'relative flex flex-col items-center justify-center gap-2.5 rounded-2xl border-2 border-dashed p-6 cursor-pointer overflow-hidden transition-colors duration-300',
                hovered
                    ? isDark ? 'border-indigo-500/50 bg-indigo-500/5' : 'border-indigo-400 bg-indigo-50/60'
                    : isDark ? 'border-white/[0.08] bg-[#12121F]' : 'border-indigo-100/70 bg-[#F8F8FE]'
            )}
        >
            {/* Radial glow on hover */}
            <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-500 rounded-2xl"
                style={{
                    background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.10) 0%, transparent 70%)',
                    opacity: hovered ? 1 : 0,
                }}
            />

            <div className={clsx(
                'p-3 rounded-xl transition-all duration-300 relative z-10',
                hovered ? 'bg-indigo-500/15' : isDark ? 'bg-[#1A1A2E]' : 'bg-indigo-50'
            )}>
                {uploaded
                    ? <ImageIcon size={18} className={hovered ? 'text-indigo-500' : isDark ? 'text-slate-300' : 'text-slate-500'} />
                    : <Upload size={18} className={hovered ? 'text-indigo-500' : isDark ? 'text-slate-400' : 'text-slate-400'} />
                }
            </div>

            <div className="text-center relative z-10">
                <p className={clsx(
                    'text-[12px] font-bold transition-colors duration-300',
                    hovered ? 'text-indigo-500' : isDark ? 'text-slate-300' : 'text-slate-600'
                )}>
                    {uploaded ? 'Logo Uploaded · Click to Replace' : 'Drop logo here · or click to browse'}
                </p>
                <p className={clsx('text-[9px] font-mono mt-0.5', isDark ? 'text-slate-600' : 'text-slate-400')}>
                    SVG · PNG · WebP &nbsp;·&nbsp; Max 2 MB
                </p>
            </div>

            {uploaded && (
                <span className="relative z-10 flex items-center gap-1 text-[9px] font-mono font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
                    <CheckCircle2 size={8} /> Active
                </span>
            )}
        </motion.div>
    );
};

/* ── Main Component ─────────────────────────────────────────────── */
const BrandingSection = ({ branding }) => {
    const isDark = useIsDark();
    const [hexCopied, setHexCopied] = useState(false);

    const copyHex = () => {
        navigator.clipboard.writeText(branding.primaryColor ?? '').catch(() => { });
        setHexCopied(true);
        setTimeout(() => setHexCopied(false), 1400);
    };

    return (
        <motion.div variants={fade} custom={6}>
            <SectionCard
                title="Brand Identity"
                action={
                    <div className="flex items-center gap-2">
                        <GhostBtn><Sparkles size={10} />Preview</GhostBtn>
                        <PrimaryBtn><Edit3 size={10} />Save</PrimaryBtn>
                    </div>
                }
            >
                <div className="space-y-7">

                    {/* ── Brand Color ─────────────────────────── */}
                    <div>
                        <SubLabel isDark={isDark}>Brand Color</SubLabel>
                        <div className="flex items-center gap-4">
                            {/* Hero swatch */}
                            <Swatch color={branding.primaryColor ?? '#6366f1'} size="lg" isDark={isDark} />

                            <div className="flex-1 min-w-0">
                                {/* Hex + copy */}
                                <div className="flex items-center gap-2 mb-2">
                                    <span className={clsx('text-xl font-black tracking-tighter', isDark ? 'text-text-main' : 'text-slate-900')}>
                                        {(branding.primaryColor ?? '#6366f1').toUpperCase()}
                                    </span>
                                    <button
                                        onClick={copyHex}
                                        className={clsx(
                                            'p-1.5 rounded-lg border transition-all duration-200',
                                            isDark
                                                ? 'border-slate-700 hover:bg-slate-700 text-slate-500'
                                                : 'border-slate-200 hover:bg-slate-100 text-slate-400'
                                        )}
                                    >
                                        {hexCopied
                                            ? <Check size={11} className="text-emerald-500" />
                                            : <Copy size={11} />
                                        }
                                    </button>
                                </div>
                                {/* Palette strip */}
                                <div className="flex items-center gap-1.5 flex-wrap">
                                    {PALETTE_EXTRAS.map(c => (
                                        <Swatch key={c} color={c} size="sm" isDark={isDark} />
                                    ))}
                                    <span className={clsx('text-[8.5px] font-mono ml-0.5', isDark ? 'text-slate-600' : 'text-slate-300')}>
                                        tap to copy
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Logo ────────────────────────────────── */}
                    <div>
                        <SubLabel isDark={isDark}>Logo</SubLabel>
                        <LogoZone uploaded={branding.logoUploaded} isDark={isDark} />
                    </div>

                </div>
            </SectionCard>
        </motion.div>
    );
};

export default BrandingSection;
