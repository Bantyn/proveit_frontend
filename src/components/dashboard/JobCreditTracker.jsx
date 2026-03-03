import React from 'react';
import { CreditCard, Zap, Activity, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { useTheme } from '../../context/ThemeContext';

const JobCreditTracker = ({ data }) => {
  const { theme } = useTheme();
  const percentage = (data.creditsRemaining / data.totalCredits) * 100;

  const getStatusColor = () => {
    if (percentage > 60) return "#10b981"; // Emerald
    if (percentage > 30) return "#f59e0b"; // Amber
    return "#f43f5e"; // Rose
  };

  const statusColor = getStatusColor();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={clsx(
        "relative p-7 rounded-[2.5rem] flex flex-col gap-6 overflow-hidden glass-panel transition-all duration-500 group",
        theme === 'light'
          ? "shadow-[0_20px_50px_rgba(0,0,0,0.04)]"
          : "shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
      )}
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-40 h-40 opacity-20 blur-[80px] rounded-full pointer-events-none transition-all duration-700 group-hover:opacity-30"
        style={{ backgroundColor: statusColor }} />
      <div className="absolute inset-0 grid-bg opacity-[0.03] pointer-events-none" />

      {/* Header telemetry */}
      <div className="flex justify-between items-start relative z-10">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            {/* <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: statusColor }} />
            <span className="text-[10px] font-black font-mono tracking-[0.3em] uppercase opacity-40">
              System_Resource
            </span> */}
          </div>
          <h3 className="text-xl font-black tracking-tight text-text-main flex items-center gap-4">
            <span className="p-2.5 rounded-2xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
              <CreditCard size={22} />
            </span>
            JOB STORAGE
          </h3>
        </div>

        <div className="flex flex-col items-end gap-1">
          <div className={clsx(
            "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border backdrop-blur-md",
            theme === 'light' ? "bg-slate-100 border-slate-200" : "bg-white/5 border-white/10"
          )}>
            {data.plan} PROTOCOL
          </div>
          {/* <span className="text-[8px] font-mono opacity-30">REF_ID: PRC_772</span> */}
        </div>
      </div>

      {/* Main Data Display */}
      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex justify-between items-end">
          <div className="flex items-baseline gap-2">
            <motion.span
              key={data.creditsRemaining}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-5xl font-black tracking-tighter"
            >
              {data.creditsRemaining}
            </motion.span>
            <span className="text-sm font-mono font-bold opacity-30">/ {data.totalCredits}</span>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-sm font-black font-mono" style={{ color: statusColor }}>
              {Math.round(percentage)}%
            </span>
            <span className="text-[9px] font-mono opacity-30 uppercase">Capacity</span>
          </div>
        </div>

        {/* Tactical Progress Bar */}
        <div className={clsx(
          "w-full h-4 p-1 rounded-full border overflow-hidden relative",
          theme === 'light' ? "bg-slate-50 border-slate-200" : "bg-black/40 border-white/5"
        )}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1.5, ease: "circOut" }}
            className="h-full rounded-full relative overflow-hidden"
            style={{ backgroundColor: statusColor }}
          >
            {/* Animated scanline effect inside bar */}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)] -translate-x-full animate-[shimmer_2s_infinite]" />
          </motion.div>
        </div>
      </div>

      {/* Analytics Footer */}
      <div className={clsx(
        "relative z-10 mt-2 pt-5 border-t flex items-center justify-between",
        theme === 'light' ? "border-slate-100" : "border-white/5"
      )}>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-1.5">
            {[1, 2, 3].map(i => (
              <div key={i} className={clsx(
                "w-5 h-5 rounded-full border-2",
                theme === 'light' ? "bg-slate-200 border-white" : "bg-white/10 border-[#0d0d12]"
              )} />
            ))}
          </div>
          <span className="text-[10px] font-bold opacity-50 uppercase tracking-wide">
            Team Usage Active
          </span>
        </div>

        <button className={clsx(
          "flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300",
          theme === 'light'
            ? "bg-slate-900 text-white hover:bg-primary"
            : "bg-primary text-white hover:shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.4)]"
        )}>
          <Zap size={14} fill="currentColor" />
          UPGRADE
        </button>
      </div>
    </motion.div>
  );
};

export default JobCreditTracker;
