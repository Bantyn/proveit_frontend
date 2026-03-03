import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Layers, Zap, Plus, Search, Filter, ChevronRight,
    Users, Target, Calendar, Clock, BarChart2, Trophy,
    Star, Flame, Globe, CheckCircle2, AlertCircle,
    ArrowUpRight, Play, Pause, XCircle, Briefcase,
    TrendingUp, Award, Cpu, Activity
} from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import { clsx } from 'clsx';
import { motion as m } from 'framer-motion';

// ─── Mock Data ────────────────────────────────────────────────────────────────

const mockJobs = [
    {
        id: 'job-1',
        title: 'Senior Full Stack Engineer',
        department: 'Engineering',
        type: 'Full-time',
        location: 'Remote · Global',
        applied: 145,
        shortlisted: 28,
        status: 'active',
        deadline: '2026-03-15',
        salary: '$120k–$160k',
        level: 'Senior',
        tags: ['React', 'Node.js', 'AWS'],
    },
    {
        id: 'job-2',
        title: 'AI/ML Research Scientist',
        department: 'AI Research',
        type: 'Full-time',
        location: 'San Francisco, CA',
        applied: 82,
        shortlisted: 12,
        status: 'active',
        deadline: '2026-03-20',
        salary: '$160k–$220k',
        level: 'Lead',
        tags: ['Python', 'TensorFlow', 'LLMs'],
    },
    {
        id: 'job-3',
        title: 'UX Designer — Enterprise',
        department: 'Product',
        type: 'Full-time',
        location: 'Remote · US',
        applied: 210,
        shortlisted: 35,
        status: 'active',
        deadline: '2026-03-10',
        salary: '$90k–$130k',
        level: 'Mid',
        tags: ['Figma', 'Prototyping', 'Research'],
    },
    {
        id: 'job-4',
        title: 'DevOps Platform Engineer',
        department: 'Infrastructure',
        type: 'Contract',
        location: 'Remote · EU',
        applied: 58,
        shortlisted: 9,
        status: 'paused',
        deadline: '2026-04-01',
        salary: '$110k–$145k',
        level: 'Senior',
        tags: ['Kubernetes', 'CI/CD', 'Terraform'],
    },
    {
        id: 'job-5',
        title: 'Product Manager — Growth',
        department: 'Product',
        type: 'Full-time',
        location: 'New York, NY',
        applied: 174,
        shortlisted: 22,
        status: 'closed',
        deadline: '2026-02-28',
        salary: '$130k–$170k',
        level: 'Senior',
        tags: ['GTM', 'Analytics', 'B2B SaaS'],
    },
];

const mockCompetitions = [
    {
        id: 'comp-1',
        title: 'Neural Code Challenge — Season 4',
        type: 'Coding',
        difficulty: 'Expert',
        participants: 1420,
        slots: 2000,
        prize: '$25,000',
        endsAt: '2026-03-22',
        status: 'live',
        tags: ['Algorithms', 'ML', 'Python'],
        topScore: 98.6,
        linkedJob: 'AI/ML Research Scientist',
    },
    {
        id: 'comp-2',
        title: 'Frontend Frontier — React Sprint',
        type: 'UI Build',
        difficulty: 'Hard',
        participants: 832,
        slots: 1000,
        prize: '$10,000',
        endsAt: '2026-03-18',
        status: 'live',
        tags: ['React', 'Tailwind', 'Performance'],
        topScore: 94.2,
        linkedJob: 'Senior Full Stack Engineer',
    },
    {
        id: 'comp-3',
        title: 'UX Redesign — HealthTech Hackathon',
        type: 'Design',
        difficulty: 'Medium',
        participants: 456,
        slots: 500,
        prize: '$5,000',
        endsAt: '2026-04-05',
        status: 'upcoming',
        tags: ['Figma', 'UX Research', 'Prototyping'],
        topScore: null,
        linkedJob: 'UX Designer — Enterprise',
    },
    {
        id: 'comp-4',
        title: 'Cloud Architecture Showdown',
        type: 'Architecture',
        difficulty: 'Expert',
        participants: 298,
        slots: 300,
        prize: '$15,000',
        endsAt: '2026-02-20',
        status: 'ended',
        tags: ['AWS', 'Kubernetes', 'Terraform'],
        topScore: 91.5,
        linkedJob: 'DevOps Platform Engineer',
    },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const statusColors = {
    active: { bg: 'bg-emerald-500/15', text: 'text-emerald-500', dot: 'bg-emerald-500', label: 'Active' },
    paused: { bg: 'bg-amber-500/15', text: 'text-amber-500', dot: 'bg-amber-500', label: 'Paused' },
    closed: { bg: 'bg-rose-500/15', text: 'text-rose-500', dot: 'bg-rose-500', label: 'Closed' },
    live: { bg: 'bg-emerald-500/15', text: 'text-emerald-500', dot: 'bg-emerald-500', label: 'Live' },
    upcoming: { bg: 'bg-blue-500/15', text: 'text-blue-500', dot: 'bg-blue-500', label: 'Upcoming' },
    ended: { bg: 'bg-slate-500/15', text: 'text-slate-400', dot: 'bg-slate-400', label: 'Ended' },
};

const difficultyColors = {
    Medium: 'text-blue-400',
    Hard: 'text-amber-400',
    Expert: 'text-rose-400',
};

const StatusBadge = ({ status }) => {
    const s = statusColors[status] || statusColors.closed;
    return (
        <span className={clsx('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest', s.bg, s.text)}>
            <span className={clsx('w-1.5 h-1.5 rounded-full', s.dot, status === 'live' && 'animate-pulse')} />
            {s.label}
        </span>
    );
};

const Tag = ({ children }) => (
    <span className="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-widest bg-primary/10 text-primary border border-primary/20">
        {children}
    </span>
);

const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] } }),
};

// ─── Job Card ─────────────────────────────────────────────────────────────────

const JobCard = ({ job, isDark, index }) => (
    <motion.div
        custom={index}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ y: -4, scale: 1.01 }}
        className={clsx(
            'relative group rounded-[2rem] p-7 flex flex-col gap-5 border overflow-hidden transition-all duration-300 cursor-pointer',
            isDark
                ? 'bg-white/[0.025] border-white/8 hover:border-primary/30 hover:shadow-[0_0_40px_rgba(129,140,248,0.12)]'
                : 'bg-white border-slate-200 hover:border-primary/30 hover:shadow-[0_8px_40px_rgba(99,102,241,0.12)] shadow-sm'
        )}
    >
        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-[2rem]" />
        {/* Ambient glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Header */}
        <div className="flex justify-between items-start gap-3">
            <div className="flex-1">
                <h3 className={clsx(
                    'text-base font-black tracking-tight leading-tight group-hover:text-primary transition-colors duration-300',
                    isDark ? 'text-white' : 'text-slate-900'
                )}>
                    {job.title}
                </h3>
                <p className="text-[10px] text-text-secondary font-semibold uppercase tracking-widest mt-1">
                    {job.department} · {job.type}
                </p>
            </div>
            <StatusBadge status={job.status} />
        </div>

        {/* Location + Salary */}
        <div className="flex flex-wrap gap-3">
            <span className="flex items-center gap-1.5 text-[10px] font-semibold text-text-secondary">
                <Globe size={12} className="text-primary" /> {job.location}
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-semibold text-text-secondary">
                <Calendar size={12} className="text-primary" /> Due {new Date(job.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
            <span className={clsx('flex items-center gap-1.5 text-[10px] font-bold', isDark ? 'text-emerald-400' : 'text-emerald-600')}>
                <TrendingUp size={12} /> {job.salary}
            </span>
        </div>

        {/* Stats Row */}
        <div className="flex gap-4">
            <div className="flex-1 flex flex-col gap-1">
                <span className="text-[9px] font-black uppercase tracking-widest text-text-secondary opacity-60 flex items-center gap-1">
                    <Users size={10} /> Applied
                </span>
                <span className={clsx('text-2xl font-black tracking-tighter', isDark ? 'text-white' : 'text-gradient-aurora')}>{job.applied}</span>
            </div>
            <div className="flex-1 flex flex-col gap-1">
                <span className="text-[9px] font-black uppercase tracking-widest text-text-secondary opacity-60 flex items-center gap-1">
                    <Target size={10} /> Shortlisted
                </span>
                <span className="text-2xl font-black tracking-tighter text-primary">{job.shortlisted}</span>
            </div>
            <div className="flex-1 flex flex-col gap-1">
                <span className="text-[9px] font-black uppercase tracking-widest text-text-secondary opacity-60 flex items-center gap-1">
                    <Activity size={10} /> Rate
                </span>
                <span className="text-2xl font-black tracking-tighter text-secondary">
                    {Math.round((job.shortlisted / job.applied) * 100)}%
                </span>
            </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 rounded-full overflow-hidden bg-primary/10">
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(job.shortlisted / job.applied) * 100}%` }}
                transition={{ duration: 1.2, delay: index * 0.1, ease: 'circOut' }}
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full shadow-[0_0_12px_rgba(129,140,248,0.6)]"
            />
        </div>

        {/* Tags + Action */}
        <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
                {job.tags.map(t => <Tag key={t}>{t}</Tag>)}
            </div>
            <div className={clsx(
                'flex items-center gap-1 text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300',
                'text-primary'
            )}>
                Review <ArrowUpRight size={12} />
            </div>
        </div>
    </motion.div>
);

// ─── Competition Card ─────────────────────────────────────────────────────────

const CompetitionCard = ({ comp, isDark, index }) => {
    const fillPct = Math.round((comp.participants / comp.slots) * 100);
    return (
        <motion.div
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ y: -4, scale: 1.01 }}
            className={clsx(
                'relative group rounded-[2rem] p-7 flex flex-col gap-5 border overflow-hidden transition-all duration-300 cursor-pointer',
                isDark
                    ? 'bg-white/[0.025] border-white/8 hover:border-secondary/30 hover:shadow-[0_0_40px_rgba(192,132,252,0.12)]'
                    : 'bg-white border-slate-200 hover:border-secondary/30 hover:shadow-[0_8px_40px_rgba(168,85,247,0.12)] shadow-sm'
            )}
        >
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-secondary via-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-[2rem]" />
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-secondary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Header */}
            <div className="flex justify-between items-start gap-3">
                <div className="flex-1">
                    <h3 className={clsx(
                        'text-base font-black tracking-tight leading-tight group-hover:text-secondary transition-colors duration-300',
                        isDark ? 'text-white' : 'text-slate-900'
                    )}>
                        {comp.title}
                    </h3>
                    <p className="text-[10px] text-text-secondary font-semibold uppercase tracking-widest mt-1 flex items-center gap-2">
                        <span>{comp.type}</span>
                        <span>·</span>
                        <span className={clsx('font-black', difficultyColors[comp.difficulty])}>
                            {comp.difficulty}
                        </span>
                    </p>
                </div>
                <StatusBadge status={comp.status} />
            </div>

            {/* Prize + Deadline */}
            <div className="flex flex-wrap gap-3">
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-amber-500">
                    <Trophy size={12} /> Prize: {comp.prize}
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-semibold text-text-secondary">
                    <Calendar size={12} className="text-secondary" />
                    Ends {new Date(comp.endsAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
            </div>

            {/* Stats Row */}
            <div className="flex gap-4">
                <div className="flex-1 flex flex-col gap-1">
                    <span className="text-[9px] font-black uppercase tracking-widest text-text-secondary opacity-60 flex items-center gap-1">
                        <Users size={10} /> Participants
                    </span>
                    <span className={clsx('text-2xl font-black tracking-tighter', isDark ? 'text-white' : 'text-gradient-vivid')}>
                        {comp.participants.toLocaleString()}
                    </span>
                </div>
                <div className="flex-1 flex flex-col gap-1">
                    <span className="text-[9px] font-black uppercase tracking-widest text-text-secondary opacity-60 flex items-center gap-1">
                        <Target size={10} /> Capacity
                    </span>
                    <span className="text-2xl font-black tracking-tighter text-secondary">{`${fillPct}%`}</span>
                </div>
                {comp.topScore && (
                    <div className="flex-1 flex flex-col gap-1">
                        <span className="text-[9px] font-black uppercase tracking-widest text-text-secondary opacity-60 flex items-center gap-1">
                            <Star size={10} /> Top Score
                        </span>
                        <span className="text-2xl font-black tracking-tighter text-emerald-500">{comp.topScore}%</span>
                    </div>
                )}
            </div>

            {/* Fill bar */}
            <div className="w-full h-1.5 rounded-full overflow-hidden bg-secondary/10">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${fillPct}%` }}
                    transition={{ duration: 1.2, delay: index * 0.1, ease: 'circOut' }}
                    className="h-full bg-gradient-to-r from-secondary to-primary rounded-full shadow-[0_0_12px_rgba(192,132,252,0.5)]"
                />
            </div>

            {/* Linked job + Tags */}
            <div className="flex items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                    {comp.tags.map(t => <Tag key={t}>{t}</Tag>)}
                </div>
                {comp.linkedJob && (
                    <span className="flex items-center gap-1 text-[9px] font-black text-text-secondary opacity-0 group-hover:opacity-60 transition-all duration-300 whitespace-nowrap">
                        <Briefcase size={9} /> {comp.linkedJob}
                    </span>
                )}
            </div>
        </motion.div>
    );
};

// ─── Main Page ─────────────────────────────────────────────────────────────────

const JobsAndMissions = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [activeTab, setActiveTab] = useState('jobs');
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const tabs = [
        { id: 'jobs', label: 'Job Manager', icon: Layers, count: mockJobs.length },
        { id: 'competitions', label: 'Running Competitions', icon: Zap, count: mockCompetitions.length },
    ];

    const filteredJobs = mockJobs.filter(j => {
        const matchSearch = j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            j.department.toLowerCase().includes(searchQuery.toLowerCase());
        const matchStatus = statusFilter === 'all' || j.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const filteredComps = mockCompetitions.filter(c => {
        const matchSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.type.toLowerCase().includes(searchQuery.toLowerCase());
        const matchStatus = statusFilter === 'all' || c.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const jobStatuses = ['all', 'active', 'paused', 'closed'];
    const compStatuses = ['all', 'live', 'upcoming', 'ended'];
    const statusOptions = activeTab === 'jobs' ? jobStatuses : compStatuses;

    // Summary stats
    const jobStats = {
        total: mockJobs.length,
        active: mockJobs.filter(j => j.status === 'active').length,
        totalApplied: mockJobs.reduce((s, j) => s + j.applied, 0),
        totalShortlisted: mockJobs.reduce((s, j) => s + j.shortlisted, 0),
    };
    const compStats = {
        total: mockCompetitions.length,
        live: mockCompetitions.filter(c => c.status === 'live').length,
        totalParticipants: mockCompetitions.reduce((s, c) => s + c.participants, 0),
        totalPrize: '$55,000',
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full overflow-y-auto no-scrollbar pb-20 px-2 md:px-6"
        >
            <div className="max-w-[1400px] mx-auto space-y-8">

                {/* ── Page Header ── */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-2">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/20 flex items-center justify-center">
                                {activeTab === 'jobs'
                                    ? <Layers size={18} className="text-primary" />
                                    : <Zap size={18} className="text-secondary" />}
                            </div>
                            <div>
                                <h1 className={clsx(
                                    'text-3xl font-black tracking-tight',
                                    isDark ? 'text-white' : 'text-gradient-vivid'
                                )}>
                                    Jobs & Missions
                                </h1>
                                <p className="text-[11px] text-text-secondary font-semibold uppercase tracking-widest">
                                    Unified Talent Acquisition Hub
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <motion.button
                        whileHover={{ scale: 1.03, y: -1 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300"
                    >
                        <Plus size={14} strokeWidth={3} />
                        {activeTab === 'jobs' ? 'Post New Job' : 'Launch Mission'}
                    </motion.button>
                </div>

                {/* ── Summary Stats ── */}
                <AnimatePresence mode="wait">
                    {activeTab === 'jobs' ? (
                        <motion.div
                            key="job-stats"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.35 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-4"
                        >
                            {[
                                { label: 'Total Postings', value: jobStats.total, icon: Briefcase, color: 'text-primary' },
                                { label: 'Active Roles', value: jobStats.active, icon: CheckCircle2, color: 'text-emerald-500' },
                                { label: 'Total Applicants', value: jobStats.totalApplied, icon: Users, color: 'text-secondary' },
                                { label: 'Shortlisted', value: jobStats.totalShortlisted, icon: Star, color: 'text-amber-500' },
                            ].map((s, i) => (
                                <motion.div
                                    key={s.label}
                                    initial={{ opacity: 0, scale: 0.92 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.07 }}
                                    className={clsx(
                                        'p-5 rounded-[1.75rem] border flex items-center gap-4',
                                        isDark ? 'bg-white/[0.03] border-white/8' : 'bg-white border-slate-200 shadow-sm'
                                    )}
                                >
                                    <div className={clsx('p-3 rounded-xl bg-primary/10', s.color)}>
                                        <s.icon size={18} />
                                    </div>
                                    <div>
                                        <p className={clsx(
                                            'text-2xl font-black tracking-tighter',
                                            isDark ? 'text-white' : 'text-gradient-aurora'
                                        )}>{s.value}</p>
                                        <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">{s.label}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="comp-stats"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.35 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-4"
                        >
                            {[
                                { label: 'Total Competitions', value: compStats.total, icon: Trophy, color: 'text-amber-500' },
                                { label: 'Live Now', value: compStats.live, icon: Flame, color: 'text-rose-500' },
                                { label: 'Participants', value: compStats.totalParticipants.toLocaleString(), icon: Users, color: 'text-primary' },
                                { label: 'Total Prize Pool', value: compStats.totalPrize, icon: Award, color: 'text-emerald-500' },
                            ].map((s, i) => (
                                <motion.div
                                    key={s.label}
                                    initial={{ opacity: 0, scale: 0.92 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.07 }}
                                    className={clsx(
                                        'p-5 rounded-[1.75rem] border flex items-center gap-4',
                                        isDark ? 'bg-white/[0.03] border-white/8' : 'bg-white border-slate-200 shadow-sm'
                                    )}
                                >
                                    <div className={clsx('p-3 rounded-xl bg-secondary/10', s.color)}>
                                        <s.icon size={18} />
                                    </div>
                                    <div>
                                        <p className={clsx(
                                            'text-2xl font-black tracking-tighter',
                                            isDark ? 'text-white' : 'text-gradient-vivid'
                                        )}>{s.value}</p>
                                        <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">{s.label}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── Tab Bar ── */}
                <div className={clsx(
                    'flex items-center gap-2 p-1.5 rounded-2xl w-fit',
                    isDark ? 'bg-white/[0.04] border border-white/8' : 'bg-slate-100 border border-slate-200'
                )}>
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => { setActiveTab(tab.id); setStatusFilter('all'); setSearchQuery(''); }}
                            className={clsx(
                                'relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300',
                                activeTab === tab.id
                                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25'
                                    : isDark
                                        ? 'text-white/40 hover:text-white/70'
                                        : 'text-slate-400 hover:text-slate-700'
                            )}
                        >
                            <tab.icon size={14} />
                            {tab.label}
                            <span className={clsx(
                                'ml-1 px-1.5 py-0.5 rounded-md text-[9px] font-black',
                                activeTab === tab.id
                                    ? 'bg-white/20 text-white'
                                    : isDark ? 'bg-white/10 text-white/40' : 'bg-slate-200 text-slate-500'
                            )}>
                                {tab.count}
                            </span>
                        </button>
                    ))}
                </div>

                {/* ── Filter Bar ── */}
                <div className="flex flex-col sm:flex-row gap-3">
                    {/* Search */}
                    <div className={clsx(
                        'flex items-center gap-2 flex-1 px-4 py-2.5 rounded-2xl border text-sm transition-all duration-300',
                        isDark
                            ? 'bg-white/[0.03] border-white/8 focus-within:border-primary/40 text-white'
                            : 'bg-white border-slate-200 focus-within:border-primary/50 focus-within:shadow-[0_0_0_3px_rgba(99,102,241,0.1)] text-slate-900'
                    )}>
                        <Search size={14} className="text-text-secondary shrink-0" />
                        <input
                            type="text"
                            placeholder={activeTab === 'jobs' ? 'Search jobs…' : 'Search competitions…'}
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="bg-transparent outline-none w-full text-[12px] font-semibold placeholder:text-text-secondary/50"
                        />
                    </div>

                    {/* Status filter pills */}
                    <div className="flex items-center gap-2 flex-wrap">
                        {statusOptions.map(s => (
                            <button
                                key={s}
                                onClick={() => setStatusFilter(s)}
                                className={clsx(
                                    'px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-200',
                                    statusFilter === s
                                        ? 'bg-primary text-white shadow-md shadow-primary/30'
                                        : isDark
                                            ? 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/70'
                                            : 'bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-700'
                                )}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── Content Grid ── */}
                <AnimatePresence mode="wait">
                    {activeTab === 'jobs' ? (
                        <motion.div
                            key="jobs-grid"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {filteredJobs.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-24 gap-4 text-text-secondary opacity-40">
                                    <AlertCircle size={40} strokeWidth={1.5} />
                                    <p className="text-sm font-black uppercase tracking-widest">No postings match your filters</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {filteredJobs.map((job, i) => (
                                        <JobCard key={job.id} job={job} isDark={isDark} index={i} />
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="comps-grid"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {filteredComps.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-24 gap-4 text-text-secondary opacity-40">
                                    <AlertCircle size={40} strokeWidth={1.5} />
                                    <p className="text-sm font-black uppercase tracking-widest">No competitions match your filters</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {filteredComps.map((comp, i) => (
                                        <CompetitionCard key={comp.id} comp={comp} isDark={isDark} index={i} />
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default JobsAndMissions;
