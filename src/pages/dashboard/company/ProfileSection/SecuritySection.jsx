// ─── ProfileSection/SecuritySection.jsx ───────────────────────────────────
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import {
    Shield, Fingerprint, Lock, Key, Monitor,
    CheckCircle2, AlertCircle, Clock, Download, Trash2,
} from 'lucide-react';
import { fade, SectionCard, Toggle, ProgressBar, Badge, GhostBtn, useIsDark } from './shared';

const CONTROLS = [
    { key: 'twoFA', label: 'Two-Factor Auth', sub: 'Extra login protection via TOTP/SMS', icon: Fingerprint },
    { key: 'ipWhitelist', label: 'IP Allowlist', sub: 'Restrict access to trusted IPs only', icon: Lock },
    { key: 'ssoEnabled', label: 'SSO Login', sub: 'Sign in with Google Workspace / Okta', icon: Key },
];

const CHECKPOINTS = [
    { label: '2FA Enabled', key: 'twoFA' },
    { label: 'IP Allowlist', key: 'ipWhitelist' },
    { label: 'SSO Configured', key: 'ssoEnabled' },
];

// Activity timeline (static for now)
const ACTIVITY = [
    { event: 'Login successful', device: 'MacBook Pro', time: 'Now', ok: true },
    { event: 'Login successful', device: 'iPhone 15', time: '2 hrs ago', ok: true },
    { event: 'Failed login attempt', device: 'Unknown', time: '3 days ago', ok: false },
];

const SecuritySection = ({ security }) => {
    const isDark = useIsDark();
    const [sec, setSec] = useState(security);

    const enabledCount = CHECKPOINTS.filter(c => sec[c.key]).length;
    const score = sec.score ?? Math.round((enabledCount / CHECKPOINTS.length) * 100);
    const scoreColor = score >= 80 ? 'emerald' : score >= 50 ? 'amber' : 'rose';
    const scoreBadge = score >= 80 ? 'success' : score >= 50 ? 'warning' : 'danger';
    const scoreLabel = score >= 80 ? 'Strong' : score >= 50 ? 'Fair' : 'Weak';

    return (
        <motion.div variants={fade} custom={5}>
            <SectionCard title="Security & Compliance" icon={Shield}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    {/* ── Left: Controls + Activity ── */}
                    <div className="space-y-3">
                        {/* Access control toggles */}
                        {CONTROLS.map(item => (
                            <div
                                key={item.key}
                                className={clsx(
                                    'flex items-center justify-between p-3.5 rounded-xl border transition-all',
                                    isDark
                                        ? 'bg-[#12121F] border-white/[0.07] hover:border-white/[0.12]'
                                        : 'bg-white border-indigo-100/60 hover:border-indigo-200'
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={clsx(
                                        'p-2 rounded-lg transition-colors',
                                        sec[item.key]
                                            ? 'bg-indigo-500/10 text-indigo-500'
                                            : isDark ? 'bg-slate-700 text-slate-500' : 'bg-slate-200 text-slate-400'
                                    )}>
                                        <item.icon size={13} />
                                    </div>
                                    <div>
                                        <p className={clsx('text-[12px] font-bold', isDark ? 'text-white' : 'text-slate-800')}>{item.label}</p>
                                        <p className={clsx('text-[10px]', isDark ? 'text-slate-500' : 'text-slate-400')}>{item.sub}</p>
                                    </div>
                                </div>
                                <Toggle
                                    enabled={sec[item.key]}
                                    onChange={() => setSec(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                                />
                            </div>
                        ))}

                        {/* Activity timeline */}
                        <div className={clsx(
                            'p-4 rounded-xl border',
                            isDark ? 'bg-[#12121F] border-white/[0.07]' : 'bg-[#F3F4FF] border-indigo-100/70'
                        )}>
                            <div className="flex items-center gap-2 mb-3">
                                <Clock size={12} className="text-indigo-400" />
                                <p className={clsx('text-[9px] font-black uppercase tracking-widest', isDark ? 'text-slate-500' : 'text-slate-400')}>
                                    Login Activity
                                </p>
                            </div>
                            <div className="space-y-2.5">
                                {ACTIVITY.map((a, i) => (
                                    <div key={i} className="flex items-center gap-2.5">
                                        <div className={clsx(
                                            'w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0',
                                            a.ok ? 'bg-emerald-500/10' : 'bg-rose-500/10'
                                        )}>
                                            {a.ok
                                                ? <CheckCircle2 size={10} className="text-emerald-500 dark:text-emerald-400" />
                                                : <AlertCircle size={10} className="text-rose-500" />
                                            }
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={clsx('text-[11px] font-semibold truncate', isDark ? 'text-slate-300' : 'text-slate-700')}>{a.event}</p>
                                            <p className={clsx('text-[10px]', isDark ? 'text-slate-500' : 'text-slate-400')}>{a.device} · {a.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── Right: Security Score + Meta ── */}
                    <div className="space-y-3">
                        {/* Score widget */}
                        <div className={clsx(
                            'p-5 rounded-xl border',
                            isDark ? 'bg-[#12121F] border-white/[0.07]' : 'bg-[#F3F4FF] border-indigo-100/70'
                        )}>
                            <p className={clsx('text-[9px] font-black uppercase tracking-widest mb-3', isDark ? 'text-slate-500' : 'text-slate-400')}>
                                Security Score
                            </p>
                            <div className="flex items-end gap-3 mb-3">
                                <span className={clsx('text-4xl font-black', isDark ? 'text-white' : 'text-slate-900')}>{score}</span>
                                <span className="text-slate-400 font-bold mb-1">/100</span>
                                <Badge variant={scoreBadge} className="mb-1">{scoreLabel}</Badge>
                            </div>
                            <ProgressBar value={score} max={100} color={scoreColor} />

                            <div className="mt-4 space-y-2">
                                {CHECKPOINTS.map(cp => (
                                    <div key={cp.key} className="flex items-center gap-2">
                                        <div className={clsx(
                                            'w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0',
                                            sec[cp.key]
                                                ? 'bg-emerald-500/10'
                                                : isDark ? 'bg-slate-700' : 'bg-slate-200'
                                        )}>
                                            {sec[cp.key]
                                                ? <CheckCircle2 size={10} className="text-emerald-600 dark:text-emerald-400" />
                                                : <AlertCircle size={10} className="text-slate-400 dark:text-slate-600" />
                                            }
                                        </div>
                                        <span className={clsx(
                                            'text-[11px] font-semibold',
                                            sec[cp.key]
                                                ? (isDark ? 'text-slate-300' : 'text-slate-700')
                                                : (isDark ? 'text-slate-600 line-through' : 'text-slate-400 line-through')
                                        )}>
                                            {cp.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Active sessions */}
                        <div className={clsx(
                            'p-4 rounded-xl border',
                            isDark ? 'bg-slate-800 border-slate-700/60' : 'bg-slate-50 border-slate-200'
                        )}>
                            <div className="flex items-center gap-2 mb-2">
                                <Monitor size={12} className="text-indigo-400" />
                                <p className={clsx('text-[9px] font-black uppercase tracking-widest', isDark ? 'text-slate-500' : 'text-slate-400')}>
                                    Active Sessions
                                </p>
                            </div>
                            <p className={clsx('text-2xl font-black', isDark ? 'text-white' : 'text-slate-900')}>{sec.activeSessions}</p>
                            <p className={clsx('text-[10px]', isDark ? 'text-slate-500' : 'text-slate-400')}>devices signed in</p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-2">
                            <GhostBtn full>
                                <Download size={11} /> Export Audit Log
                            </GhostBtn>
                            <GhostBtn danger full>
                                <Trash2 size={11} /> Delete Account
                            </GhostBtn>
                        </div>
                    </div>
                </div>
            </SectionCard>
        </motion.div>
    );
};

export default SecuritySection;
