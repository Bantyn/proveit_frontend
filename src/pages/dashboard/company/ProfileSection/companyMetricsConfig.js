// ─── companyMetricsConfig.js ───────────────────────────────────────────────
// Single source of truth for all company metric definitions.
// bar[]     → sparkline history (oldest → newest)
// industryAvg → benchmark for comparison line
// No hardcoded trends — trends are computed dynamically from bar data.

import {
    Users, Briefcase, Building, DollarSign, TrendingUp, Activity,
    Zap, FileText, Layers, Calendar, Target, CircleDot,
} from 'lucide-react';

export const BUSINESS_METRICS = [
    {
        label: 'Total Employees',
        key: 'totalEmployees',
        icon: Users,
        color: 'indigo',
        industryAvg: 42,
        bar: [30, 38, 40, 45, 52, 58, 64],
        desc: 'Headcount growth',
    },
    {
        label: 'Revenue This Year',
        key: 'revenueThisYear',
        icon: DollarSign,
        color: 'emerald',
        industryAvg: 28,
        bar: [14, 18, 22, 26, 30, 36, 42],
        desc: 'Annual revenue (₹L)',
        prefix: '₹',
        suffix: 'L',
    },
    {
        label: 'Clients Served',
        key: 'clientsServed',
        icon: Building,
        color: 'violet',
        industryAvg: 180,
        bar: [80, 110, 140, 165, 190, 215, 240],
        desc: 'Lifetime client base',
    },
    {
        label: 'Active Projects',
        key: 'activeProjects',
        icon: Briefcase,
        color: 'blue',
        industryAvg: 6,
        bar: [3, 4, 5, 5, 6, 7, 9],
        desc: 'Ongoing engagements',
    },
    {
        label: 'Subscriptions',
        key: 'activeSubscriptions',
        icon: Activity,
        color: 'cyan',
        industryAvg: 10,
        bar: [5, 6, 7, 8, 9, 11, 14],
        desc: 'Active plans',
    },
    {
        label: 'Growth Rate',
        key: 'growthPercent',
        icon: TrendingUp,
        color: 'emerald',
        suffix: '%',
        industryAvg: 45,
        bar: [30, 36, 40, 47, 52, 58, 68],
        desc: 'Company YoY growth',
    },
];

export const HIRING_METRICS = [
    {
        label: 'Job Credits Left',
        key: 'jobCreditsRemaining',
        icon: Zap,
        color: 'amber',
        industryAvg: 35,
        bar: [50, 46, 43, 40, 36, 32, 28],
        desc: 'Remaining credits',
        invertTrend: true, // lower is good here → flip
    },
    {
        label: 'Jobs Posted',
        key: 'jobsPosted',
        icon: FileText,
        color: 'blue',
        industryAvg: 5,
        bar: [2, 3, 4, 4, 6, 7, 8],
        desc: 'Live listings',
    },
    {
        label: 'Candidate Pipeline',
        key: 'candidatePipeline',
        icon: Layers,
        color: 'violet',
        industryAvg: 120,
        bar: [20, 50, 80, 110, 145, 175, 200],
        desc: 'Active candidates',
    },
    {
        label: 'Interviews Scheduled',
        key: 'interviewScheduled',
        icon: Calendar,
        color: 'cyan',
        industryAvg: 4,
        bar: [1, 2, 3, 3, 5, 6, 7],
        desc: 'This month',
    },
    {
        label: 'Hiring Success Rate',
        key: 'hiringSuccessRate',
        icon: Target,
        color: 'emerald',
        suffix: '%',
        industryAvg: 65,
        bar: [58, 62, 64, 68, 70, 74, 78],
        desc: 'Offer acceptance',
    },
    {
        label: 'Open Job Roles',
        key: 'openJobRoles',
        icon: CircleDot,
        color: 'orange',
        industryAvg: 3,
        bar: [2, 2, 3, 4, 4, 5, 6],
        desc: 'Current openings',
    },
];

export const COLOR_PALETTE = {
    indigo: { bar: '#6366f1', glow: 'rgba(99,102,241,0.18)', text: 'text-indigo-500', darkText: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-400/25', accent: '#6366f1' },
    blue: { bar: '#3b82f6', glow: 'rgba(59,130,246,0.18)', text: 'text-blue-500', darkText: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-400/25', accent: '#3b82f6' },
    violet: { bar: '#8b5cf6', glow: 'rgba(139,92,246,0.18)', text: 'text-violet-500', darkText: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-400/25', accent: '#8b5cf6' },
    emerald: { bar: '#10b981', glow: 'rgba(16,185,129,0.18)', text: 'text-emerald-500', darkText: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-400/25', accent: '#10b981' },
    cyan: { bar: '#06b6d4', glow: 'rgba(6,182,212,0.18)', text: 'text-cyan-500', darkText: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-400/25', accent: '#06b6d4' },
    amber: { bar: '#f59e0b', glow: 'rgba(245,158,11,0.18)', text: 'text-amber-500', darkText: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-400/25', accent: '#f59e0b' },
    orange: { bar: '#f97316', glow: 'rgba(249,115,22,0.18)', text: 'text-orange-500', darkText: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-400/25', accent: '#f97316' },
};
