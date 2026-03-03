// ─── pages/dashboard/company/CompanyProfile.jsx ────────────────────────────
// Thin orchestrator — only imports, layout grid, and stagger animation.
// ALL section logic lives in ProfileSection/*.jsx
// NO inline data — data lives in services/mock/companyProfileData.js

import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

import { ShieldCheck, Activity } from 'lucide-react';

import { useTheme } from '../../../context/ThemeContext';
import { companyData } from '../../../services/mock/companyProfileData';

// ── Section components ─────────────────────────────────────────
import CompanyHeader from './ProfileSection/CompanyHeader';
import CompanyOverview from './ProfileSection/CompanyOverview';
import CompanyMetrics from './ProfileSection/CompanyMetrics';
import AIInsights from './ProfileSection/AIInsights';
import TeamAccess from './ProfileSection/TeamAccess';
import BillingSection from './ProfileSection/BillingSection';
import SecuritySection from './ProfileSection/SecuritySection';

// ── Root stagger container ──────────────────────────────────────
const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } },
};

/* ══════════════════════════════════════════════════════════════ */
const CompanyProfile = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark'; // kept for footer border colour

    const { basicInfo, overview, metrics, aiInsights, team, billing, security, branding } = companyData;

    return (
        <div className="relative z-10 w-full h-screen overflow-y-auto overflow-x-hidden no-scrollbar">

            {/* ── Page-level ambient atmospheric blobs ── */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
                {isDark ? (
                    <>
                        {/* Dark: indigo top-right glow */}
                        <div className="ambient-blob absolute top-[-12%] right-[-8%] w-[560px] h-[560px] rounded-full"
                            style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.055) 0%, transparent 70%)', filter: 'blur(80px)' }} />
                        {/* Dark: violet bottom-left glow */}
                        <div className="ambient-blob-slow absolute bottom-[5%] left-[-6%] w-[480px] h-[480px] rounded-full"
                            style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.045) 0%, transparent 70%)', filter: 'blur(90px)' }} />
                        {/* Dark: cyan mid accent */}
                        <div className="ambient-blob-medium absolute top-[40%] left-[35%] w-[360px] h-[360px] rounded-full"
                            style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.025) 0%, transparent 70%)', filter: 'blur(70px)' }} />
                    </>
                ) : (
                    <>
                        {/* Light: soft indigo top-right bloom */}
                        <div className="ambient-blob absolute top-[-8%] right-[-5%] w-[700px] h-[500px] rounded-full"
                            style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 65%)', filter: 'blur(120px)' }} />
                        {/* Light: violet bottom-left bloom */}
                        <div className="ambient-blob-slow absolute bottom-[-5%] left-[-5%] w-[600px] h-[400px] rounded-full"
                            style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.06) 0%, transparent 65%)', filter: 'blur(110px)' }} />
                        {/* Light: faint indigo mid-page shimmer */}
                        <div className="ambient-blob-medium absolute top-[45%] right-[20%] w-[400px] h-[300px] rounded-full"
                            style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.04) 0%, transparent 70%)', filter: 'blur(100px)' }} />
                    </>
                )}
            </div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="visible"
                className="max-w-[1300px] mx-auto px-4 sm:px-6 pb-24 pt-6 space-y-6"
            >
                {/* ── 1. Header (full width) ─────────────────── */}
                <CompanyHeader basicInfo={basicInfo} />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-12">
                        <CompanyOverview overview={overview} metrics={metrics} />
                    </div>
                </div>

                {/* ── 3. Unified Metrics (full width, tabbed) ─── */}
                <CompanyMetrics metrics={metrics} />

                {/* ── 4. AI Insights (full width) ─────────────── */}
                <AIInsights aiInsights={aiInsights} />

                {/* ── 5. Team (8) | Billing (4) ───────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-8">
                        <TeamAccess team={team} />
                    </div>
                    <div className="lg:col-span-4">
                        <BillingSection billing={billing} />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-12">
                        <SecuritySection security={security} />
                    </div>
                </div>

                {/* ── Footer ──────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.4 }}
                    className={clsx(
                        'pt-6 border-t flex flex-col sm:flex-row justify-between items-center gap-3 opacity-40',
                        isDark ? 'border-white/[0.05]' : 'border-slate-300/60'
                    )}
                >
                    <div className="flex items-center gap-5 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                        <span className="flex items-center gap-1.5"><ShieldCheck size={11} />Reg #PV-2023-IN</span>
                        <span className="hidden sm:inline text-slate-400">|</span>
                        <span className="flex items-center gap-1.5"><Activity size={11} />Live Sync Active</span>
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
                        © 2026 Provelt.io · All Rights Reserved
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default CompanyProfile;