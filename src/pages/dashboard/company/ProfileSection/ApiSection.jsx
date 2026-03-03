// ─── ProfileSection/ApiSection.jsx ────────────────────────────────────────
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { Key, Eye, EyeOff, Copy, Plus, RefreshCw, CheckCircle2 } from 'lucide-react';
import { fade, SectionCard, Badge, GhostBtn, PrimaryBtn, useIsDark } from './shared';

const ApiSection = () => {
    const isDark = useIsDark();
    const [visible, setVisible] = useState(false);
    const [copied, setCopied] = useState(false);

    const apiKey = 'pvlt_live_4xN8kQmJeZ9bR2aWv7cYuTpLdHfGsI3o';

    const handleCopy = () => {
        navigator.clipboard.writeText(apiKey).catch(() => { });
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.div variants={fade} custom={7}>
            <SectionCard
                title="API Access"
                icon={Key}
                action={<Badge variant="muted">Beta</Badge>}
            >
                {/* Active API key */}
                <div className={clsx(
                    'p-4 rounded-xl border mb-4',
                    isDark ? 'bg-slate-800 border-slate-700/60' : 'bg-slate-50 border-slate-200'
                )}>
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                            Live API Key
                        </p>
                        <Badge variant="success">Active</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                        <code className={clsx(
                            'text-[11px] font-mono flex-1 truncate',
                            isDark ? 'text-slate-300' : 'text-slate-600'
                        )}>
                            {visible ? apiKey : 'pvlt_live_••••••••••••••••••••••••••••'}
                        </code>
                        <button
                            onClick={() => setVisible(v => !v)}
                            className={clsx(
                                'p-1.5 rounded-lg transition-all flex-shrink-0',
                                isDark ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-slate-200 text-slate-500'
                            )}
                            title={visible ? 'Hide key' : 'Reveal key'}
                        >
                            {visible ? <EyeOff size={13} /> : <Eye size={13} />}
                        </button>
                        <button
                            onClick={handleCopy}
                            className={clsx(
                                'p-1.5 rounded-lg transition-all flex-shrink-0',
                                copied
                                    ? 'text-emerald-500 dark:text-emerald-400'
                                    : isDark ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-slate-200 text-slate-500'
                            )}
                            title="Copy key"
                        >
                            {copied ? <CheckCircle2 size={13} /> : <Copy size={13} />}
                        </button>
                    </div>
                </div>

                {/* Key meta */}
                <div className="space-y-2 mb-4">
                    {[
                        { label: 'Created', value: 'Jan 15, 2026' },
                        { label: 'Last Used', value: '28 Feb 2026' },
                        { label: 'Permissions', value: 'Read & Write' },
                        { label: 'Rate Limit', value: '1,000 req/hr' },
                    ].map(item => (
                        <div key={item.label} className="flex items-center justify-between">
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold">{item.label}</span>
                            <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">{item.value}</span>
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                    <PrimaryBtn full>
                        <Plus size={11} /> Generate New Key
                    </PrimaryBtn>
                    <GhostBtn full>
                        <RefreshCw size={11} /> Rotate Key
                    </GhostBtn>
                </div>
            </SectionCard>
        </motion.div>
    );
};

export default ApiSection;
