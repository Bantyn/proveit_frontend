import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, PieChart, Pie, Cell,
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { Target, Clock, Zap, TrendingUp } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { clsx } from 'clsx';

/* ───── Custom Tooltip ───── */
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const d = payload[0];
        return (
            <div className="bg-[#0D0D1C]/95 backdrop-blur-xl border border-white/10 px-3 py-2.5 rounded-xl shadow-2xl">
                <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-1">
                    {d.name || label}
                </p>
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: d.fill || d.stroke || 'var(--color-primary)' }} />
                    <p className="text-sm font-black text-white">
                        {d.value}
                        <span className="text-[10px] opacity-40 ml-1">
                            {d.name ? '%' : ''}
                        </span>
                    </p>
                </div>
            </div>
        );
    }
    return null;
};

/* ───── Pie Center Label ───── */
const PieCenterLabel = ({ cx, cy, total }) => (
    <g>
        <text x={cx} y={cy - 8} textAnchor="middle" dominantBaseline="central"
            className="font-black" style={{ fill: 'var(--color-text-main)', fontSize: 22, fontWeight: 900, fontFamily: 'Outfit, sans-serif' }}>
            {total}
        </text>
        <text x={cx} y={cy + 14} textAnchor="middle" dominantBaseline="central"
            style={{ fill: 'rgba(136,146,176,0.6)', fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'Outfit, sans-serif' }}>
            TOTAL
        </text>
    </g>
);

/* ───── Time-to-hire area chart ───── */
const TimeToHireChart = ({ data }) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    return (
        <div className={clsx(
            "rounded-2xl p-5 border",
            isDark
                ? "bg-[#0A0A14]/60 border-white/[0.05]"
                : "bg-gray-50/80 border-gray-100"
        )}>
            <div className="flex items-center justify-between mb-4">
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest mb-0.5"
                        style={{ color: isDark ? 'rgba(136,146,176,0.5)' : '#9CA3AF' }}>
                        Time-to-hire trend
                    </p>
                    <p className="text-lg font-black tracking-tight"
                        style={{ color: isDark ? 'var(--color-text-main)' : '#1A1A2E' }}>
                        12.1 <span className="text-[12px] font-semibold"
                            style={{ color: isDark ? 'rgba(136,146,176,0.5)' : '#9CA3AF' }}>days avg</span>
                    </p>
                </div>
                <span className="text-[10px] font-black px-2.5 py-1 rounded-full" style={{ background: 'rgba(74,222,128,0.12)', color: '#4ade80' }}>
                    ↓ 18% faster
                </span>
            </div>
            <ResponsiveContainer width="100%" height={100}>
                <AreaChart data={data} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
                    <defs>
                        <linearGradient id="tthGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.04)'} vertical={false} />
                    <XAxis dataKey="month" tick={{ fill: isDark ? 'rgba(136,146,176,0.4)' : '#9CA3AF', fontSize: 9, fontWeight: 700 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: isDark ? 'rgba(136,146,176,0.4)' : '#9CA3AF', fontSize: 9 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="days" stroke="#818cf8" strokeWidth={2}
                        fill="url(#tthGrad)" dot={false} activeDot={{ r: 4, fill: '#818cf8', stroke: 'rgba(129,140,248,0.3)', strokeWidth: 6 }} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

/* ───── Main Component ───── */
const HiringAnalytics = ({ data }) => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const { timeToHire } = data;

    const [hoveredPie, setHoveredPie] = useState(null);

    const sourcingData = [
        { name: 'AI Sourcing', value: 45, color: '#818cf8' },
        { name: 'Referrals', value: 25, color: '#c084fc' },
        { name: 'Direct Applied', value: 20, color: '#38bdf8' },
        { name: 'Outreach', value: 10, color: '#fb923c' },
    ];

    const performanceData = [
        { axis: 'Technical', value: 92, fullMark: 100 },
        { axis: 'Cognitive', value: 85, fullMark: 100 },
        { axis: 'Cultural', value: 74, fullMark: 100 },
        { axis: 'Stability', value: 88, fullMark: 100 },
        { axis: 'Velocity', value: 81, fullMark: 100 },
    ];

    const totalSourcing = sourcingData.reduce((s, d) => s + d.value, 0);

    // timeToHire already comes as [{month, days}] objects from dashboardData
    const timeToHireFormatted = Array.isArray(timeToHire) && timeToHire.length > 0
        ? timeToHire
        : [
            { month: 'Jan', days: 18 },
            { month: 'Feb', days: 15 },
            { month: 'Mar', days: 12 },
            { month: 'Apr', days: 10 },
            { month: 'May', days: 9 },
        ];

    return (
        <div className="flex flex-col gap-6 w-full">

            {/* ── Charts Row ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                {/* Radar Chart — Competency Matrix */}
                <div className={clsx(
                    "rounded-2xl p-5 border flex flex-col gap-3",
                    isDark
                        ? "bg-[#0A0A14]/60 border-white/[0.05]"
                        : "bg-gray-50/80 border-gray-100"
                )}>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest mb-0.5"
                            style={{ color: isDark ? 'rgba(136,146,176,0.5)' : '#9CA3AF' }}>
                            Competency Matrix
                        </p>
                        <p className="text-base font-black tracking-tight"
                            style={{ color: isDark ? 'var(--color-text-main)' : '#1A1A2E' }}>
                            Success Delta
                        </p>
                    </div>

                    <div className="h-[180px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart data={performanceData} cx="50%" cy="50%" outerRadius="75%">
                                <defs>
                                    <linearGradient id="radarFill" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#818cf8" stopOpacity="0.35" />
                                        <stop offset="100%" stopColor="#c084fc" stopOpacity="0.10" />
                                    </linearGradient>
                                </defs>
                                <PolarGrid
                                    stroke={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}
                                    strokeDasharray="2 4"
                                />
                                <PolarAngleAxis
                                    dataKey="axis"
                                    tick={{ fill: isDark ? 'rgba(136,146,176,0.7)' : '#6B7280', fontSize: 10, fontWeight: 700, fontFamily: 'Outfit, sans-serif' }}
                                    tickLine={false}
                                />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar
                                    name="Score"
                                    dataKey="value"
                                    stroke="#818cf8"
                                    strokeWidth={2}
                                    fill="url(#radarFill)"
                                    dot={{ r: 3, fill: '#818cf8', stroke: 'rgba(129,140,248,0.4)', strokeWidth: 4 }}
                                    activeDot={{ r: 5, fill: '#c084fc', stroke: 'rgba(192,132,252,0.5)', strokeWidth: 6 }}
                                    animationDuration={1200}
                                />
                                <Tooltip content={<CustomTooltip />} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Score legend row */}
                    <div className="flex flex-wrap gap-2 mt-1">
                        {performanceData.map(d => (
                            <div key={d.axis} className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#818cf8' }} />
                                <span className="text-[9px] font-bold"
                                    style={{ color: isDark ? 'rgba(136,146,176,0.6)' : '#9CA3AF' }}>
                                    {d.axis} <span style={{ color: isDark ? 'rgba(235,235,255,0.7)' : '#374151' }}>{d.value}</span>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Donut Chart — Channel Mix */}
                <div className={clsx(
                    "rounded-2xl p-5 border flex flex-col gap-3",
                    isDark
                        ? "bg-[#0A0A14]/60 border-white/[0.05]"
                        : "bg-gray-50/80 border-gray-100"
                )}>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest mb-0.5"
                            style={{ color: isDark ? 'rgba(136,146,176,0.5)' : '#9CA3AF' }}>
                            Tactical Origins
                        </p>
                        <p className="text-base font-black tracking-tight"
                            style={{ color: isDark ? 'var(--color-text-main)' : '#1A1A2E' }}>
                            Channel Mix
                        </p>
                    </div>

                    <div className="h-[150px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={sourcingData}
                                    cx="40%"
                                    cy="50%"
                                    innerRadius={48}
                                    outerRadius={68}
                                    paddingAngle={6}
                                    dataKey="value"
                                    stroke="none"
                                    animationBegin={100}
                                    animationDuration={1200}
                                    onMouseEnter={(_, idx) => setHoveredPie(idx)}
                                    onMouseLeave={() => setHoveredPie(null)}
                                >
                                    {sourcingData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.color}
                                            opacity={hoveredPie === null || hoveredPie === index ? 1 : 0.35}
                                            style={{ filter: hoveredPie === index ? `drop-shadow(0 0 8px ${entry.color}90)` : 'none', transition: 'all 0.2s' }}
                                        />
                                    ))}
                                </Pie>
                                <PieCenterLabel cx="40%" cy="50%" total={totalSourcing + '%'} />
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Legend */}
                    <div className="flex flex-col gap-1.5">
                        {sourcingData.map((d, i) => (
                            <motion.div
                                key={d.name}
                                className="flex items-center justify-between group cursor-default"
                                onHoverStart={() => setHoveredPie(i)}
                                onHoverEnd={() => setHoveredPie(null)}
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full transition-all duration-200"
                                        style={{ background: d.color, boxShadow: hoveredPie === i ? `0 0 8px ${d.color}` : 'none' }} />
                                    <span className="text-[11px] font-semibold transition-colors duration-200"
                                        style={{
                                            color: hoveredPie === i
                                                ? (isDark ? 'var(--color-text-main)' : '#1A1A2E')
                                                : (isDark ? 'rgba(136,146,176,0.65)' : '#6B7280')
                                        }}>
                                        {d.name}
                                    </span>
                                </div>
                                <span className="text-[11px] font-black" style={{ color: d.color }}>
                                    {d.value}%
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Time-to-Hire chart */}
                <TimeToHireChart data={timeToHireFormatted.length > 0 ? timeToHireFormatted : [
                    { month: 'Jan', days: 18 },
                    { month: 'Feb', days: 17 },
                    { month: 'Mar', days: 15 },
                    { month: 'Apr', days: 14 },
                    { month: 'May', days: 14 },
                    { month: 'Jun', days: 13 },
                    { month: 'Jul', days: 12 },
                ]} />
            </div>
        </div>
    );
};

export default HiringAnalytics;
