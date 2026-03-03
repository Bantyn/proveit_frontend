// ─── ProfileSection/TeamAccess.jsx ────────────────────────────────────────
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { Users, Plus, Settings, Shield, Download } from 'lucide-react';
import { fade, SectionCard, MemberRow, Toggle, GhostBtn, PrimaryBtn, Badge, useIsDark } from './shared';

const PERMISSIONS = [
    { key: 'canPostJobs', label: 'Post Jobs', sub: 'Create & manage job listings' },
    { key: 'canViewCandidates', label: 'View Candidates', sub: 'Access candidate profiles' },
    { key: 'canManageBilling', label: 'Manage Billing', sub: 'Edit payment & subscription' },
    { key: 'canInviteMembers', label: 'Invite Members', sub: 'Add new team members' },
    { key: 'apiAccess', label: 'API Access', sub: 'Use integration keys' },
];

const TeamAccess = ({ team }) => {
    const isDark = useIsDark();
    const [perms, setPerms] = useState(team.permissions);
    const [showPerms, setShowPerms] = useState(false);

    const totalMembers = 1 + team.admins.length + team.members.length;

    return (
        <motion.div variants={fade} custom={4} className="space-y-4">
            {/* ── Members card ── */}
            <SectionCard
                title="Team & Access"
                icon={Users}
                action={
                    <div className="flex items-center gap-2">
                        <span className={clsx('text-[10px] font-bold', isDark ? 'text-slate-400' : 'text-slate-500')}>
                            {totalMembers} members
                        </span>
                        <PrimaryBtn>
                            <Plus size={11} /> Invite
                        </PrimaryBtn>
                    </div>
                }
            >
                {/* Compact avatar strip */}
                <div className="flex items-center gap-2 mb-4 px-1">
                    {[team.owner, ...team.admins, ...team.members].slice(0, 6).map((m, i) => (
                        <div
                            key={m.name}
                            className="relative group"
                            style={{ marginLeft: i > 0 ? '-8px' : '0' }}
                        >
                            <img
                                src={m.avatar}
                                alt={m.name}
                                title={m.name}
                                className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 group-hover:z-10 group-hover:scale-110 transition-transform cursor-pointer"
                            />
                        </div>
                    ))}
                    {totalMembers > 6 && (
                        <div className={clsx('w-8 h-8 rounded-full border-2 flex items-center justify-center text-[9px] font-black -ml-2', isDark ? 'border-slate-900 bg-indigo-500/10 text-indigo-400' : 'border-white bg-indigo-100 text-indigo-600')}>
                            +{totalMembers - 6}
                        </div>
                    )}
                </div>

                {/* Owner */}
                <p className={clsx('text-[9px] font-black uppercase tracking-widest mb-1 px-2', isDark ? 'text-slate-500' : 'text-slate-400')}>Owner</p>
                <MemberRow member={{ ...team.owner, badge: 'Owner' }} isOwner />

                {/* Admins */}
                <p className={clsx('text-[9px] font-black uppercase tracking-widest mt-3 mb-1 px-2', isDark ? 'text-slate-500' : 'text-slate-400')}>Admins</p>
                {team.admins.map(m => <MemberRow key={m.name} member={m} />)}

                {/* Members */}
                <div className={clsx('mt-3 pt-3 border-t', isDark ? 'border-slate-700/60' : 'border-slate-200')}>
                    <p className={clsx('text-[9px] font-black uppercase tracking-widest mb-1 px-2', isDark ? 'text-slate-500' : 'text-slate-400')}>Members</p>
                    {team.members.map(m => <MemberRow key={m.name} member={m} />)}
                </div>

                {/* Actions */}
                <div className={clsx('flex gap-2 mt-4 pt-4 border-t', isDark ? 'border-slate-700/60' : 'border-slate-200')}>
                    <GhostBtn full onClick={() => setShowPerms(v => !v)}>
                        <Shield size={11} /> {showPerms ? 'Hide' : 'Permissions'}
                    </GhostBtn>
                    <GhostBtn full>
                        <Download size={11} /> Export CSV
                    </GhostBtn>
                </div>
            </SectionCard>

            {/* ── Role permissions panel (expandable) ── */}
            {showPerms && (
                <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                >
                    <SectionCard title="Role Permissions" icon={Shield}>
                        <p className={clsx('text-[11px] mb-4', isDark ? 'text-slate-400' : 'text-slate-500')}>
                            Configure what team members can do.
                        </p>
                        <div className="space-y-2">
                            {PERMISSIONS.map(p => (
                                <div
                                    key={p.key}
                                    className={clsx(
                                        'flex items-center justify-between p-3.5 rounded-xl border transition-all',
                                        isDark
                                            ? 'bg-slate-800 border-slate-700/60 hover:border-slate-600'
                                            : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                                    )}
                                >
                                    <div>
                                        <p className={clsx('text-[12px] font-bold', isDark ? 'text-white' : 'text-slate-800')}>{p.label}</p>
                                        <p className={clsx('text-[10px]', isDark ? 'text-slate-500' : 'text-slate-400')}>{p.sub}</p>
                                    </div>
                                    <Toggle
                                        enabled={perms[p.key]}
                                        onChange={() => setPerms(prev => ({ ...prev, [p.key]: !prev[p.key] }))}
                                    />
                                </div>
                            ))}
                        </div>
                    </SectionCard>
                </motion.div>
            )}
        </motion.div>
    );
};

export default TeamAccess;
