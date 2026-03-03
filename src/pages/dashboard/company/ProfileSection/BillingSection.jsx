// ─── ProfileSection/BillingSection.jsx ────────────────────────────────────
import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { CreditCard, Crown, CheckCircle2, FileText, Rocket, Zap, Download } from 'lucide-react';
import { fade, SectionCard, ProgressBar, Badge, GhostBtn, PrimaryBtn, useIsDark } from './shared';

const BillingSection = ({ billing }) => {
    const isDark = useIsDark();

    const usagePct = Math.round((billing.creditsUsed / billing.creditsTotal) * 100);
    const remainingCredits = billing.creditsTotal - billing.creditsUsed;

    return (
        <motion.div variants={fade} custom={5}>
            <SectionCard
                title="Billing & Subscription"
                icon={CreditCard}
                action={<Badge variant="success">Active</Badge>}
            >
                <div className="space-y-5">
                    {/* Plan card — calmer gradient */}
                    <div className={clsx(
                        'p-5 rounded-xl border relative overflow-hidden',
                        isDark
                            ? 'bg-indigo-500/[0.06] border-indigo-500/15'
                            : 'bg-indigo-50/70 border-indigo-200/60'
                    )}>
                        <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
                        <div className="relative flex items-start justify-between">
                            <div>
                                <p className={clsx('text-[9px] font-black uppercase tracking-widest mb-1', isDark ? 'text-indigo-400' : 'text-indigo-500')}>
                                    Current Plan
                                </p>
                                <p className={clsx('text-lg font-black', isDark ? 'text-white' : 'text-slate-900')}>{billing.currentPlan}</p>
                                <p className={clsx('text-sm font-bold mt-0.5', isDark ? 'text-indigo-400' : 'text-indigo-500')}>{billing.planPrice}</p>
                            </div>
                            <Crown size={18} className="text-amber-500 flex-shrink-0" />
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                            {billing.features.map(f => (
                                <span key={f} className={clsx('flex items-center gap-1 text-[10px] font-semibold', isDark ? 'text-indigo-300' : 'text-indigo-600')}>
                                    <CheckCircle2 size={9} />{f}
                                </span>
                            ))}
                        </div>
                        <PrimaryBtn full className="mt-4">
                            <Rocket size={11} /> Upgrade Plan
                        </PrimaryBtn>
                    </div>

                    {/* Credit usage */}
                    <div className={clsx(
                        'p-4 rounded-xl border',
                        isDark ? 'bg-[#12121F] border-white/[0.07]' : 'bg-[#F3F4FF] border-indigo-100/70'
                    )}>
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-1.5">
                                <Zap size={12} className="text-amber-500 dark:text-amber-400" />
                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                                    Credit Usage
                                </p>
                            </div>
                            <span className={clsx('text-[10px] font-black', isDark ? 'text-indigo-400' : 'text-indigo-500')}>
                                {billing.creditsUsed}/{billing.creditsTotal}
                            </span>
                        </div>
                        <ProgressBar
                            value={billing.creditsUsed}
                            max={billing.creditsTotal}
                            color={usagePct > 80 ? 'amber' : 'indigo'}
                        />
                        <div className="flex justify-between mt-2">
                            <p className={clsx('text-[10px]', isDark ? 'text-slate-500' : 'text-slate-400')}>{remainingCredits} credits left</p>
                            <p className={clsx('text-[10px]', isDark ? 'text-slate-500' : 'text-slate-400')}>Resets {billing.nextBilling}</p>
                        </div>
                    </div>

                    {/* Payment method */}
                    <div className={clsx(
                        'flex items-center gap-3 p-4 rounded-xl border',
                        isDark ? 'bg-[#12121F] border-white/[0.07]' : 'bg-white border-indigo-100/60'
                    )}>
                        <div className="w-10 h-7 rounded bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center flex-shrink-0">
                            <CreditCard size={12} className="text-white" />
                        </div>
                        <div className="flex-1">
                            <p className={clsx('text-[12px] font-bold', isDark ? 'text-white' : 'text-slate-900')}>
                                {billing.paymentMethod.brand} •••• {billing.paymentMethod.last4}
                            </p>
                            <p className={clsx('text-[10px]', isDark ? 'text-slate-500' : 'text-slate-400')}>Next billing {billing.nextBilling}</p>
                        </div>
                        <Badge variant="success">Primary</Badge>
                    </div>

                    {/* Invoice link */}
                    <GhostBtn full>
                        <FileText size={11} /> View Billing History
                    </GhostBtn>
                </div>
            </SectionCard>
        </motion.div>
    );
};

export default BillingSection;
