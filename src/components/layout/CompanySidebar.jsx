import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
    LayoutDashboard, Building2, Briefcase,
    LineChart, ClipboardCheck, MessageSquare,
    ShieldCheck, Wallet, Settings, LogOut,
    Sun, Moon, ChevronRight, CheckCircle2, Zap, BarChart2,
} from "lucide-react";
import { clsx } from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

const navGroups = [
    {
        name: "Main",
        items: [
            { icon: LayoutDashboard, label: "Dashboard", path: "/company/dashboard" },
            { icon: Building2, label: "Profile", path: "/company/profile" },
            { icon: Briefcase, label: "Missions", path: "/company/jobs-missions" },
        ],
    },
    {
        name: "Strategy",
        items: [
            { icon: LineChart, label: "Analytics", path: "/company/analytics" },
        ],
    },
    {
        name: "Operations",
        items: [
            { icon: ClipboardCheck, label: "Evaluation", path: "/company/evaluation" },
            { icon: MessageSquare, label: "Interviews", path: "/company/interviews" },
            { icon: ShieldCheck, label: "Security", path: "/company/messages" },
        ],
    },
    {
        name: "System",
        items: [
            { icon: Wallet, label: "Billing", path: "/company/subscription" },
            { icon: Settings, label: "Settings", path: "/company/settings" },
        ],
    },
];

/* ─────────────────────────────────────────────
   Global styles
───────────────────────────────────────────── */
const GLOBAL_CSS = `
  .sb * { font-family: 'Syne', sans-serif; }
  .sb-mono { font-family: 'DM Mono', monospace !important; }

  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

  .glass-light {
    background: rgba(255,255,255,0.76);
    backdrop-filter: blur(28px) saturate(190%);
    -webkit-backdrop-filter: blur(28px) saturate(190%);
    border: 1px solid rgba(255,255,255,0.92);
    box-shadow: 0 8px 40px rgba(99,102,241,0.10), inset 0 1.5px 0 rgba(255,255,255,0.95);
  }
  .glass-dark {
    background: rgba(10,10,22,0.82);
    backdrop-filter: blur(28px) saturate(160%);
    -webkit-backdrop-filter: blur(28px) saturate(160%);
    border: 1px solid rgba(255,255,255,0.06);
    box-shadow: 0 8px 60px rgba(0,0,0,0.58), inset 0 1px 0 rgba(255,255,255,0.04);
  }

  .pill-light {
    background: linear-gradient(135deg,#eef2ff 0%,#e0e7ff 100%);
    box-shadow: 0 2px 12px rgba(99,102,241,0.15), inset 0 1px 0 rgba(255,255,255,0.85);
  }
  .pill-dark {
    background: linear-gradient(135deg,rgba(99,102,241,0.15) 0%,rgba(139,92,246,0.11) 100%);
    box-shadow: 0 2px 14px rgba(99,102,241,0.20), inset 0 1px 0 rgba(255,255,255,0.05);
  }

  /* Hover on non-active items */
  .hover-pill-light:hover { background: rgba(99,102,241,0.05); }
  .hover-pill-dark:hover  { background: rgba(255,255,255,0.04); }

  .icon-glow { filter: drop-shadow(0 0 6px rgba(99,102,241,0.72)); }

  .noise {
    position: absolute; inset: 0; border-radius: inherit;
    pointer-events: none; z-index: 0; opacity: 0.03;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 180px;
  }

  .toggle-light {
    background: #fff;
    border: 1.5px solid #e0e7ff;
    box-shadow: 0 2px 8px rgba(99,102,241,0.16);
  }
  .toggle-dark {
    background: #13132a;
    border: 1.5px solid rgba(255,255,255,0.10);
    box-shadow: 0 2px 12px rgba(0,0,0,0.52);
  }

  /* GPU compositing hint for animated pill */
  .pill-wc { will-change: transform, opacity; }
`;

/* ─────────────────────────────────────────────
   SidebarNavItem
───────────────────────────────────────────── */
const SidebarNavItem = ({ item, isActive, theme, isCollapsed }) => {
    const isDark = theme === "dark";

    return (
        <NavLink
            to={item.path}
            className={clsx(
                "group relative flex items-center gap-3 rounded-2xl transition-colors duration-200 select-none outline-none",
                "focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1",
                isCollapsed ? "justify-center w-11 h-11 mx-auto" : "px-3.5 py-2.5 w-full",
                !isActive && (isDark ? "hover-pill-dark" : "hover-pill-light"),
            )}
        >
            {/* Active pill bg */}
            <AnimatePresence>
                {isActive && (
                    <motion.div
                        key="pill"
                        layoutId="active-pill"
                        className={clsx("absolute inset-0 rounded-2xl -z-10 pill-wc", isDark ? "pill-dark" : "pill-light")}
                        initial={{ opacity: 0, scale: 0.93 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 500, damping: 38 }}
                    />
                )}
            </AnimatePresence>

            {/* Left accent bar — inset so it's never clipped */}
            <AnimatePresence>
                {isActive && (
                    <motion.div
                        key="bar"
                        layoutId="active-bar"
                        className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-indigo-500 pill-wc"
                        initial={{ opacity: 0, scaleY: 0.4 }}
                        animate={{ opacity: 1, scaleY: 1 }}
                        exit={{ opacity: 0, scaleY: 0.4 }}
                        transition={{ type: "spring", stiffness: 500, damping: 36 }}
                    />
                )}
            </AnimatePresence>

            {/* Icon */}
            <div className={clsx(
                "relative flex items-center justify-center flex-shrink-0 rounded-xl transition-transform duration-300",
                isCollapsed ? "w-8 h-8" : "w-7 h-7",
                isActive ? "scale-110" : "scale-100 group-hover:scale-105",
            )}>
                {isActive && <div className="absolute inset-0 rounded-xl bg-indigo-500/20 blur-[10px]" />}
                <item.icon
                    size={isCollapsed ? 17 : 16}
                    strokeWidth={isActive ? 2.5 : 2}
                    className={clsx(
                        "relative z-10 transition-colors duration-200",
                        isActive
                            ? isDark ? "text-indigo-400 icon-glow" : "text-indigo-600"
                            : isDark
                                ? "text-white/30 group-hover:text-white/65"
                                : "text-slate-400 group-hover:text-indigo-400",
                    )}
                />
            </div>

            {/* Label */}
            {!isCollapsed && (
                <span className={clsx(
                    "text-[12.5px] font-bold tracking-tight flex-1 transition-colors duration-200",
                    isActive
                        ? isDark ? "text-indigo-300" : "text-indigo-700"
                        : isDark
                            ? "text-white/35 group-hover:text-white/72"
                            : "text-slate-400 group-hover:text-slate-700",
                )}>
                    {item.label}
                </span>
            )}

            {/* Active chevron */}
            {isActive && !isCollapsed && (
                <motion.div initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 }}>
                    <ChevronRight size={12} strokeWidth={3} className={isDark ? "text-indigo-400/55" : "text-indigo-400"} />
                </motion.div>
            )}

            {/* Collapsed tooltip */}
            {isCollapsed && (
                <div
                    role="tooltip"
                    className={clsx(
                        "absolute left-[3.4rem] px-3 py-1.5 rounded-xl",
                        "text-[10px] font-bold tracking-[0.12em] uppercase whitespace-nowrap",
                        "opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0",
                        "transition-all duration-200 pointer-events-none z-50",
                        isDark
                            ? "bg-[#13132a] border border-white/10 text-white shadow-xl"
                            : "bg-white border border-indigo-100 text-indigo-600 shadow-lg",
                    )}
                >
                    {item.label}
                    <span className={clsx(
                        "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[5px] w-2.5 h-2.5 rotate-45",
                        isDark ? "bg-[#13132a] border-l border-b border-white/10" : "bg-white border-l border-b border-indigo-100",
                    )} />
                </div>
            )}
        </NavLink>
    );
};

/* ─────────────────────────────────────────────
   CompanySidebar
───────────────────────────────────────────── */
const CompanySidebar = ({ isCollapsed, setIsCollapsed }) => {
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const isDark = theme === "dark";

    const groupHasActive = (group) =>
        group.items.some((i) => location.pathname.startsWith(i.path));

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@700;800&display=swap');
                ${GLOBAL_CSS}
            `}</style>

            <aside
                aria-label="Main navigation"
                className={clsx(
                    "sb fixed top-0 left-0 h-screen z-40 flex flex-col items-center py-5",
                    "transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                    isCollapsed ? "w-[76px]" : "w-[264px]",
                )}
            >
                <div className={clsx(
                    "relative w-[calc(100%-20px)] h-full rounded-[28px] px-3 py-6",
                    "flex flex-col overflow-visible transition-all duration-500",
                    isDark ? "glass-dark" : "glass-light",
                )}>
                    <div className="noise" />

                    {/* Ambient glows — size reacts to collapsed state */}
                    <div
                        className="absolute left-1/2 -translate-x-1/2 rounded-full blur-[80px] pointer-events-none transition-all duration-500 bg-indigo-500/10"
                        style={{
                            width: isCollapsed ? 80 : 192,
                            height: isCollapsed ? 80 : 192,
                            top: isCollapsed ? -20 : -128,
                        }}
                    />
                    <div
                        className="absolute left-1/2 -translate-x-1/2 rounded-full blur-[70px] pointer-events-none transition-all duration-500"
                        style={{
                            background: "rgba(139,92,246,0.08)",
                            width: isCollapsed ? 64 : 160,
                            height: isCollapsed ? 64 : 160,
                            bottom: isCollapsed ? -16 : -96,
                        }}
                    />

                    {/* ── Collapse toggle ── */}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                        className={clsx(
                            "absolute -right-[13px] top-[88px] z-50",
                            "w-6 h-6 rounded-full flex items-center justify-center",
                            "transition-all duration-300 hover:scale-110",
                            "outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
                            isDark ? "toggle-dark text-white/50 hover:text-white" : "toggle-light text-indigo-400 hover:text-indigo-600",
                        )}
                    >
                        <motion.div animate={{ rotate: isCollapsed ? 0 : 180 }} transition={{ duration: 0.4, ease: "anticipate" }}>
                            <ChevronRight size={11} strokeWidth={3} />
                        </motion.div>
                    </button>

                    {/* ── Brand ── */}
                    <div className={clsx(
                        "relative z-10 flex items-center gap-3 mb-8 transition-all duration-500",
                        isCollapsed ? "justify-center px-0" : "px-1",
                    )}>
                        <motion.div
                            whileHover={{ scale: 1.06 }}
                            whileTap={{ scale: 0.96 }}
                            role="button"
                            tabIndex={0}
                            aria-label="Toggle sidebar"
                            onKeyDown={(e) => e.key === "Enter" && setIsCollapsed(!isCollapsed)}
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="relative flex-shrink-0 w-9 h-9 rounded-2xl flex items-center justify-center cursor-pointer overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                            style={{
                                background: "linear-gradient(145deg,#6366f1 0%,#8b5cf6 100%)",
                                boxShadow: "0 4px 16px rgba(99,102,241,0.45), inset 0 1px 0 rgba(255,255,255,0.25)",
                            }}
                        >
                            <Zap size={18} className="text-white relative z-10" strokeWidth={3} />
                            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
                        </motion.div>

                        <AnimatePresence>
                            {!isCollapsed && (
                                <motion.div
                                    key="brand-text"
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -8 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex flex-col flex-1 min-w-0"
                                >
                                    <span className={clsx(
                                        "text-[15px] font-black tracking-[-0.04em] leading-none",
                                        isDark ? "text-white" : "text-slate-800",
                                    )}>PROVELT</span>
                                    <span className={clsx(
                                        "sb-mono text-[9px] tracking-[0.25em] uppercase leading-none mt-1.5",
                                        isDark ? "text-indigo-400/60" : "text-indigo-400",
                                    )}>Enterprise</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <AnimatePresence>
                            {!isCollapsed && (
                                <motion.button
                                    key="theme-exp"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={toggleTheme}
                                    title={isDark ? "Switch to light" : "Switch to dark"}
                                    aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                                    className={clsx(
                                        "flex-shrink-0 w-7 h-7 rounded-xl flex items-center justify-center",
                                        "transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
                                        isDark
                                            ? "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/70"
                                            : "bg-indigo-50 text-indigo-400 hover:bg-indigo-100 hover:text-indigo-600",
                                    )}
                                >
                                    {isDark ? <Sun size={13} /> : <Moon size={13} />}
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* ── Navigation ── */}
                    <nav
                        aria-label="Sidebar navigation"
                        className="relative z-10 flex-1 overflow-y-auto overflow-x-hidden no-scrollbar flex flex-col gap-5"
                    >
                        {navGroups.map((group, gi) => {
                            const active = groupHasActive(group);
                            return (
                                <div key={group.name} className="flex flex-col gap-0.5">

                                    {/* Section label (expanded) */}
                                    <AnimatePresence>
                                        {!isCollapsed && (
                                            <motion.div
                                                key={`label-${group.name}`}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.15 }}
                                                className="flex items-center gap-1.5 px-3.5 mb-1.5"
                                            >
                                                {/* Dot glows when a child route is active */}
                                                <span
                                                    className="inline-block w-1 h-1 rounded-full flex-shrink-0 transition-all duration-300"
                                                    style={{
                                                        background: active ? "#6366f1" : isDark ? "rgba(99,102,241,0.35)" : "#c7d2fe",
                                                        boxShadow: active ? "0 0 6px rgba(99,102,241,0.8)" : "none",
                                                    }}
                                                />
                                                <span className={clsx(
                                                    "sb-mono text-[9.5px] tracking-[0.18em] uppercase font-medium transition-colors duration-300",
                                                    active
                                                        ? isDark ? "text-indigo-400/80" : "text-indigo-500"
                                                        : isDark ? "text-white/20" : "text-slate-300",
                                                )}>
                                                    {group.name}
                                                </span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Collapsed group gap */}
                                    {isCollapsed && gi > 0 && (
                                        <div className={clsx(
                                            "mx-auto w-5 h-px mb-1 mt-0.5",
                                            isDark ? "bg-white/[0.07]" : "bg-indigo-100/60",
                                        )} />
                                    )}

                                    {group.items.map((item) => (
                                        <SidebarNavItem
                                            key={item.path}
                                            item={item}
                                            theme={theme}
                                            isCollapsed={isCollapsed}
                                            isActive={location.pathname.startsWith(item.path)}
                                        />
                                    ))}

                                    {/* Expanded divider */}
                                    {!isCollapsed && gi < navGroups.length - 1 && (
                                        <div className={clsx(
                                            "mt-3 mx-3 h-px",
                                            isDark ? "bg-white/[0.05]" : "bg-slate-100",
                                        )} />
                                    )}
                                </div>
                            );
                        })}
                    </nav>

                    {/* ── Footer ── */}
                    <div className={clsx(
                        "relative z-10 mt-4 pt-4 flex flex-col gap-2",
                        isDark ? "border-t border-white/[0.05]" : "border-t border-slate-100",
                        isCollapsed ? "items-center" : "",
                    )}>

                        {/* Theme toggle (collapsed) */}
                        <AnimatePresence>
                            {isCollapsed && (
                                <motion.button
                                    key="theme-col"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={toggleTheme}
                                    title={isDark ? "Switch to light" : "Switch to dark"}
                                    aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                                    className={clsx(
                                        "w-9 h-9 rounded-xl flex items-center justify-center mb-1",
                                        "transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
                                        isDark
                                            ? "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/70"
                                            : "bg-indigo-50 text-indigo-400 hover:bg-indigo-100 hover:text-indigo-600",
                                    )}
                                >
                                    {isDark ? <Sun size={13} /> : <Moon size={13} />}
                                </motion.button>
                            )}
                        </AnimatePresence>

                        {/* Profile card — uniform in both states */}
                        <div className={clsx(
                            "flex items-center rounded-2xl cursor-pointer transition-all duration-200",
                            isCollapsed ? "p-1 justify-center w-11 mx-auto" : "gap-2.5 p-2 w-full",
                            isDark ? "hover:bg-white/[0.05]" : "hover:bg-indigo-50/70",
                        )}>
                            <div className="relative flex-shrink-0">
                                <img
                                    src="https://ui-avatars.com/api/?name=Kishan+Mistry&background=6366f1&color=fff&bold=true&size=80"
                                    className="w-8 h-8 rounded-xl object-cover"
                                    style={isDark
                                        ? { boxShadow: "0 0 0 2px #0A0A14, 0 0 0 3.5px rgba(99,102,241,0.45)" }
                                        : { boxShadow: "0 0 0 2px #fff, 0 0 0 3.5px #c7d2fe" }}
                                    alt="Kishan Mistry"
                                />
                                <span
                                    className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full"
                                    style={{ boxShadow: isDark ? "0 0 0 1.5px #0A0A14" : "0 0 0 1.5px white" }}
                                />
                            </div>

                            <AnimatePresence>
                                {!isCollapsed && (
                                    <motion.div
                                        key="profile-text"
                                        initial={{ opacity: 0, x: -6 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -6 }}
                                        transition={{ duration: 0.18 }}
                                        className="flex flex-col min-w-0 flex-1"
                                    >
                                        <div className="flex items-center gap-1.5 min-w-0">
                                            <span className={clsx(
                                                "text-[12px] font-bold tracking-tight truncate",
                                                isDark ? "text-white/90" : "text-slate-700",
                                            )}>Kishan Mistry</span>
                                            <CheckCircle2 size={10} className="text-emerald-500 flex-shrink-0" />
                                        </div>
                                        <span className={clsx(
                                            "sb-mono text-[9px] truncate leading-tight mt-0.5",
                                            isDark ? "text-white/30" : "text-slate-400",
                                        )}>kishan@provelt.io</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <AnimatePresence>
                                {!isCollapsed && (
                                    <motion.button
                                        key="logout-exp"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        aria-label="Log out"
                                        title="Log out"
                                        className={clsx(
                                            "flex-shrink-0 w-7 h-7 rounded-xl flex items-center justify-center",
                                            "transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-red-400",
                                            isDark
                                                ? "text-white/20 hover:text-red-400 hover:bg-red-400/10"
                                                : "text-slate-300 hover:text-red-500 hover:bg-red-50",
                                        )}
                                    >
                                        <LogOut size={13} />
                                    </motion.button>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Logout (collapsed) */}
                        <AnimatePresence>
                            {isCollapsed && (
                                <motion.button
                                    key="logout-col"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    aria-label="Log out"
                                    title="Log out"
                                    className={clsx(
                                        "w-9 h-9 rounded-xl flex items-center justify-center",
                                        "transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-red-400",
                                        isDark
                                            ? "text-white/20 hover:text-red-400 hover:bg-red-400/10"
                                            : "text-slate-300 hover:text-red-500 hover:bg-red-50",
                                    )}
                                >
                                    <LogOut size={13} />
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default CompanySidebar;