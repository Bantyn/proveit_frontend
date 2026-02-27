import { useState, useEffect } from "react";
import { StaggerBlurEffect } from "@/components/ui/stagger-blur-effect";
import { motion, AnimatePresence } from "framer-motion";
import {
    Building2, MapPin, Send, Bookmark, BookmarkCheck,
    CheckCircle2, Layers, Zap, Users, Timer, Star,
    Code2, GitBranch, Upload, ExternalLink,
    ChevronRight, Award, Copy, Check, Clock, ArrowRight,
    Briefcase, GraduationCap, DollarSign, Shield, Target,
    FileText, Calendar, ArrowLeft, Share2, Eye,
    Rocket, BadgeCheck, Hash, Globe
} from "lucide-react";
import {
    RadarChart, Radar, PolarGrid, PolarAngleAxis,
    ResponsiveContainer, RadialBarChart, RadialBar,
    PolarRadiusAxis, Tooltip
} from "recharts";

/* ═══════════════════════════════════════════════════════════════════════════
   MOCK DATA — aligned with the data model
═══════════════════════════════════════════════════════════════════════════ */
const JOB = {
    _id: "job_92f4a1b3",
    role: "Build a Real-Time Chat App",
    department: "Engineering",
    experienceLevel: "Mid-Level",
    employmentType: "Full-Time",
    salaryRange: { min: 80000, max: 120000, currency: "USD" },
    requiredSkills: ["React", "Node.js", "WebSockets", "TypeScript", "CSS / Tailwind"],
    status: "active",
    companyName: "NovaTech Labs",
    companyLogo: "NT",
    companyVerified: true,
    industry: "Developer Tools",
    location: "Remote · Global",
    competition: {
        _id: "comp_001",
        title: "Real-Time Chat App Challenge",
        competitionType: "HIRING",
        description: `Design and build a fully functional real-time chat application that supports instant messaging between multiple users. Your solution should demonstrate proficiency in real-time data handling, modern frontend frameworks, and scalable backend architecture.\n\nThe application should handle concurrent users gracefully, provide a responsive and intuitive UI, and implement proper authentication. We're looking for clean, maintainable code that follows industry best practices.`,
        rules: "All submissions must be original work. Use of AI assistants for code generation is permitted but must be disclosed. Plagiarized submissions will be disqualified.",
        requiredSkills: ["React", "WebSockets", "Node.js"],
        projectInfo: {
            title: "Real-Time Chat Application",
            difficulty: "MEDIUM",
            deadline: new Date(Date.now() + 6 * 86400000 + 11 * 3600000 + 24 * 60000).toISOString(),
            maxSubmissions: 50,
        },
        visibility: "public",
        status: "ACTIVE",
        totalApplications: 34,
    },
    techStack: ["React", "Vite", "Socket.io", "Tailwind CSS", "Node.js"],
    bonusObjectives: [
        "Support message reactions (emoji).",
        "Implement a dark / light theme toggle within the app.",
        "Add typing indicators and read receipts.",
        "Implement file/image sharing in chat.",
    ],
    submissionTypes: ["GITHUB", "FILE_UPLOAD", "EXTERNAL_LINK"],
    evaluation: {
        criteriaScores: [
            { criteriaTitle: "Code Quality", weight: 25 },
            { criteriaTitle: "UI/UX Design", weight: 20 },
            { criteriaTitle: "Real-time Performance", weight: 25 },
            { criteriaTitle: "Architecture & Scalability", weight: 20 },
            { criteriaTitle: "Documentation", weight: 10 },
        ],
        autoScore: 30,
        manualScore: 50,
        plagiarismPenalty: 20,
    },
    postedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
};

/* ═══════════════════════════════════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════════════════════════════════ */
function useCountdown(iso) {
    const calc = () => {
        const diff = Math.max(0, new Date(iso) - Date.now());
        return {
            days: Math.floor(diff / 86400000),
            hours: Math.floor((diff % 86400000) / 3600000),
            minutes: Math.floor((diff % 3600000) / 60000),
            seconds: Math.floor((diff % 60000) / 1000),
        };
    };
    const [t, setT] = useState(calc);
    useEffect(() => {
        const id = setInterval(() => setT(calc()), 1000);
        return () => clearInterval(id);
    }, [iso]);
    return t;
}

/* ═══════════════════════════════════════════════════════════════════════════
   ANIMATION VARIANTS
═══════════════════════════════════════════════════════════════════════════ */
/* Section fade — slides up smoothly when entering viewport */
const fadeIn = {
    hidden: { opacity: 0, y: 32 },
    visible: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }),
};

/* Card slide — staggered left-to-right for card rows (AOS style) */
const slideInCard = {
    hidden: { opacity: 0, x: -28, y: 12 },
    visible: (i = 0) => ({
        opacity: 1, x: 0, y: 0,
        transition: {
            delay: i * 0.12,
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
};

/* ═══════════════════════════════════════════════════════════════════════════
   SUB-COMPONENTS
═══════════════════════════════════════════════════════════════════════════ */

function Section({ children, title, icon: Icon, delay = 0 }) {
    return (
        <motion.section
            custom={delay}
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
        >
            {title && (
                <div className="flex items-center gap-3 mb-5">
                    {Icon && (
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                            style={{ background: "color-mix(in srgb, var(--color-primary) 10%, transparent)" }}>
                            <Icon size={17} style={{ color: "var(--color-primary)" }} />
                        </div>
                    )}
                    <h2 className="text-lg font-bold tracking-tight"
                        style={{ color: "var(--color-text-main)" }}>
                        {title}
                    </h2>
                </div>
            )}
            {children}
        </motion.section>
    );
}

/* SlideInCard — wraps a card for staggered AOS-style left-to-right entrance */
function SlideInCard({ children, index = 0, className = "", style = {} }) {
    return (
        <motion.div
            custom={index}
            variants={slideInCard}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className={className}
            style={style}
        >
            {children}
        </motion.div>
    );
}

function SideCard({ children, className = "" }) {
    return (
        <div className={`rounded-2xl p-5 ${className}`}
            style={{
                background: "var(--color-surface)",
                border: "1px solid color-mix(in srgb, var(--color-text-secondary) 10%, transparent)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
            }}>
            {children}
        </div>
    );
}

function CountdownUnit({ value, label }) {
    return (
        <div className="flex flex-col items-center flex-1">
            <div className="w-full aspect-square max-w-[56px] rounded-xl flex items-center justify-center text-xl font-bold tabular-nums"
                style={{
                    background: "color-mix(in srgb, var(--color-primary) 8%, transparent)",
                    color: "var(--color-primary)",
                    border: "1px solid color-mix(in srgb, var(--color-primary) 14%, transparent)",
                }}>
                <AnimatePresence mode="popLayout">
                    <motion.span key={value}
                        initial={{ y: -6, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 6, opacity: 0 }}
                        transition={{ duration: 0.14 }}>
                        {String(value ?? 0).padStart(2, "0")}
                    </motion.span>
                </AnimatePresence>
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-widest mt-1.5"
                style={{ color: "var(--color-text-secondary)" }}>
                {label}
            </span>
        </div>
    );
}

function ProgressBar({ pct, label, sublabel }) {
    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium" style={{ color: "var(--color-text-main)" }}>{label}</span>
                <span className="text-sm font-bold" style={{ color: "var(--color-primary)" }}>{pct}%</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: "color-mix(in srgb, var(--color-text-secondary) 10%, transparent)" }}>
                <motion.div
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, var(--color-primary), var(--color-secondary))" }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                />
            </div>
            {sublabel && <span className="text-xs mt-1.5 block" style={{ color: "var(--color-text-secondary)" }}>{sublabel}</span>}
        </div>
    );
}

function SkillPill({ label, isRequired = false }) {
    return (
        <motion.span
            whileHover={{ scale: 1.04, y: -1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium cursor-default"
            style={{
                background: isRequired
                    ? "color-mix(in srgb, var(--color-primary) 8%, transparent)"
                    : "color-mix(in srgb, var(--color-text-secondary) 6%, transparent)",
                color: isRequired ? "var(--color-primary)" : "var(--color-text-secondary)",
                border: `1px solid ${isRequired
                    ? "color-mix(in srgb, var(--color-primary) 15%, transparent)"
                    : "color-mix(in srgb, var(--color-text-secondary) 8%, transparent)"}`,
            }}
        >
            {isRequired && <Star size={11} className="fill-current" />}
            {label}
        </motion.span>
    );
}

const SUBMIT_MAP = {
    GITHUB: { icon: GitBranch, label: "GitHub Repo", desc: "Link your repository" },
    FILE_UPLOAD: { icon: Upload, label: "ZIP Upload", desc: "Upload your project files" },
    EXTERNAL_LINK: { icon: ExternalLink, label: "Live Demo", desc: "Share a hosted demo" },
    DOCUMENT: { icon: FileText, label: "Document", desc: "Upload documentation" },
};

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════════════════════ */
export default function JobDetailPage() {
    const job = JOB;
    const comp = job.competition;
    const cd = useCountdown(comp.projectInfo.deadline);
    const daysAgo = Math.floor((Date.now() - new Date(job.postedAt)) / 86400000);
    const filledPct = Math.round((comp.totalApplications / comp.projectInfo.maxSubmissions) * 100);
    const slotsLeft = comp.projectInfo.maxSubmissions - comp.totalApplications;

    const [saved, setSaved] = useState(false);
    const [applied, setApplied] = useState(false);
    const [copied, setCopied] = useState(false);

    /* Scroll-aware floating bar */
    const [showBar, setShowBar] = useState(false);
    const [barExpanded, setBarExpanded] = useState(false);
    useEffect(() => {
        const onScroll = () => {
            const scrollPct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            setShowBar(scrollPct > 0.2);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    useEffect(() => {
        if (showBar) {
            const t = setTimeout(() => setBarExpanded(true), 400);
            return () => clearTimeout(t);
        }
        setBarExpanded(false);
    }, [showBar]);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const handleCopy = () => {
        navigator.clipboard?.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
    };

    const fmt = (n) => n >= 1000 ? `${(n / 1000).toFixed(0)}k` : n.toString();

    return (
        <div className="min-h-screen pb-32" style={{ background: "var(--color-background)" }}>

            {/* ════════════════════════════════════════════════════════════════
          PREMIUM HERO HEADER — Gladia / Linear-inspired
      ════════════════════════════════════════════════════════════════ */}
            <div className="relative overflow-hidden">

                {/* ── Deep mesh gradient background ── */}
                <div className="absolute inset-0 pointer-events-none"
                    style={{
                        background: `
              radial-gradient(ellipse 80% 60% at 50% -10%, color-mix(in srgb, var(--color-primary) 18%, transparent), transparent),
              radial-gradient(ellipse 50% 40% at 90% 20%, color-mix(in srgb, var(--color-secondary) 12%, transparent), transparent),
              radial-gradient(ellipse 40% 50% at 10% 80%, color-mix(in srgb, var(--color-accent) 7%, transparent), transparent),
              var(--color-background)
            `,
                    }}
                />

                {/* ── Dot grid ── */}
                <div className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: "radial-gradient(circle, color-mix(in srgb, var(--color-text-main) 12%, transparent) 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                        maskImage: "radial-gradient(ellipse 90% 80% at 50% 50%, black 40%, transparent 100%)",
                        WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 50% 50%, black 40%, transparent 100%)",
                    }}
                />

                {/* ── Glowing border at bottom ── */}
                <div className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
                    style={{
                        background: "linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-primary) 40%, transparent), color-mix(in srgb, var(--color-secondary) 40%, transparent), transparent)",
                    }}
                />

                <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* ── Hero body ── */}
                    <div className="pb-12 pt-24">

                        {/* Company pill — at the top, before title */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="inline-flex items-center gap-3 mb-7 pl-1.5 pr-4 py-1.5 rounded-full"
                            style={{
                                background: "color-mix(in srgb, var(--color-surface) 70%, transparent)",
                                backdropFilter: "blur(16px)",
                                WebkitBackdropFilter: "blur(16px)",
                                border: "1px solid color-mix(in srgb, var(--color-primary) 20%, transparent)",
                                boxShadow: "0 0 0 4px color-mix(in srgb, var(--color-primary) 5%, transparent), 0 2px 12px rgba(0,0,0,0.08)",
                            }}
                        >
                            {/* Logo */}
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold"
                                style={{
                                    background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
                                    color: "#fff",
                                    boxShadow: "0 2px 8px color-mix(in srgb, var(--color-primary) 40%, transparent)",
                                }}>
                                {job.companyLogo}
                            </div>
                            <span className="text-sm font-semibold" style={{ color: "var(--color-text-main)" }}>
                                {job.companyName}
                            </span>
                            {job.companyVerified && (
                                <BadgeCheck size={15} style={{ color: "var(--color-primary)" }} />
                            )}
                            <span className="w-px h-4 opacity-20" style={{ background: "var(--color-text-secondary)" }} />
                            <span className="text-xs font-medium" style={{ color: "var(--color-text-secondary)" }}>
                                <MapPin size={11} className="inline mr-1" />{job.location}
                            </span>
                        </motion.div>

                        {/* Status badges row */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.18 }}
                            className="flex flex-wrap items-center gap-2.5 mb-5"
                        >
                            {/* Live / Active */}
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wide"
                                style={{
                                    background: "rgba(52,211,153,0.1)",
                                    color: "#34d399",
                                    border: "1px solid rgba(52,211,153,0.22)",
                                }}>
                                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#34d399" }} />
                                LIVE
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide"
                                style={{
                                    background: "color-mix(in srgb, var(--color-secondary) 10%, transparent)",
                                    color: "var(--color-secondary)",
                                    border: "1px solid color-mix(in srgb, var(--color-secondary) 20%, transparent)",
                                }}>
                                <Zap size={11} /> {comp.projectInfo.difficulty}
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide"
                                style={{
                                    background: "color-mix(in srgb, var(--color-primary) 10%, transparent)",
                                    color: "var(--color-primary)",
                                    border: "1px solid color-mix(in srgb, var(--color-primary) 20%, transparent)",
                                }}>
                                <Briefcase size={11} /> {job.employmentType}
                            </span>
                            <span className="text-xs font-medium opacity-50" style={{ color: "var(--color-text-secondary)" }}>
                                · Posted {daysAgo === 0 ? "today" : `${daysAgo}d ago`}
                            </span>
                        </motion.div>

                        {/* —— The BIG title —— */}
                        <h1
                            className="text-4xl sm:text-5xl lg:text-[3.6rem] font-black leading-[1.08] mb-4"
                            style={{ letterSpacing: "-0.035em" }}
                        >
                            {/* "Build a " — plain colour */}
                            <StaggerBlurEffect
                                delay={0.22}
                                stagger={0.04}
                                color="var(--color-text-main)"
                            >
                                {"Build a "}
                            </StaggerBlurEffect>

                            {/* "Real-Time" — gradient; isGradient keeps the
                                gradient on the wrapper so it spans the full word */}
                            <StaggerBlurEffect
                                delay={0.22 + "Build a ".length * 0.04}
                                stagger={0.04}
                                isGradient
                                gradientStyle={{
                                    background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 50%, color-mix(in srgb, var(--color-secondary) 70%, var(--color-primary)) 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                {"Real-Time"}
                            </StaggerBlurEffect>

                            <br />

                            {/* "Chat App" — plain colour */}
                            <StaggerBlurEffect
                                delay={0.22 + ("Build a " + "Real-Time").length * 0.04}
                                stagger={0.04}
                                color="var(--color-text-main)"
                            >
                                {"Chat App"}
                            </StaggerBlurEffect>
                        </h1>

                        {/* Subline */}
                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.32 }}
                            className="text-base sm:text-lg mb-9 max-w-xl leading-relaxed"
                            style={{ color: "var(--color-text-secondary)" }}
                        >
                            A project-based hiring challenge. Build, submit, and get ranked by our AI + expert panel.
                        </motion.p>

                        {/* ── Stat chips row — horizontal, pill-shaped ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="inline-flex flex-wrap items-center gap-0 rounded-2xl overflow-hidden"
                            style={{
                                background: "color-mix(in srgb, var(--color-surface) 65%, transparent)",
                                backdropFilter: "blur(20px)",
                                WebkitBackdropFilter: "blur(20px)",
                                border: "1px solid color-mix(in srgb, var(--color-text-secondary) 10%, transparent)",
                                boxShadow: "0 4px 24px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.05)",
                            }}
                        >
                            {[
                                { icon: GraduationCap, label: "Experience", value: job.experienceLevel },
                                { icon: DollarSign, label: "Salary", value: `${fmt(job.salaryRange.min)}–${fmt(job.salaryRange.max)} ${job.salaryRange.currency}` },
                                { icon: Users, label: "Applicants", value: `${comp.totalApplications}/${comp.projectInfo.maxSubmissions}` },
                                { icon: Globe, label: "Type", value: job.competitionType ?? "Hiring" },
                            ].map(({ icon: Ic, label, value }, idx, arr) => (
                                <div key={label} className="flex items-center">
                                    <div className="flex items-center gap-2.5 px-5 py-4">
                                        <Ic size={16} style={{ color: "var(--color-primary)", opacity: 0.8 }} />
                                        <div>
                                            <p className="text-[10px] font-semibold uppercase tracking-widest leading-none mb-1"
                                                style={{ color: "var(--color-text-secondary)" }}>{label}</p>
                                            <p className="text-sm font-bold leading-none"
                                                style={{ color: "var(--color-text-main)" }}>{value}</p>
                                        </div>
                                    </div>
                                    {idx < arr.length - 1 && (
                                        <div className="w-px h-10 self-center"
                                            style={{ background: "color-mix(in srgb, var(--color-text-secondary) 10%, transparent)" }} />
                                    )}
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* ════════════════════════════════════════════════════════════════
          MAIN CONTENT — Two-column layout
      ════════════════════════════════════════════════════════════════ */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* ── LEFT COLUMN (2/3) ── */}
                    <div className="lg:col-span-2 space-y-10">

                        {/* About */}
                        <Section title="About the Challenge" icon={Target} delay={0}>
                            <div className="space-y-4">
                                {comp.description.split("\n\n").map((p, i) => (
                                    <p key={i} className="text-[15px] leading-[1.85]" style={{ color: "var(--color-text-secondary)" }}>
                                        {p}
                                    </p>
                                ))}
                            </div>
                        </Section>

                        {/* Skills */}
                        <Section title="Required Skills" icon={Layers} delay={1}>
                            <div className="flex flex-wrap gap-2.5">
                                {comp.requiredSkills.map((s) => (
                                    <SkillPill key={s} label={s} isRequired />
                                ))}
                                {job.requiredSkills
                                    .filter(s => !comp.requiredSkills.includes(s))
                                    .map((s) => <SkillPill key={s} label={s} />)}
                            </div>
                        </Section>

                        {/* Tech Stack */}
                        <Section title="Tech Stack" icon={Code2} delay={2}>
                            <div className="flex flex-wrap gap-2.5">
                                {job.techStack.map((t) => (
                                    <motion.span key={t}
                                        whileHover={{ scale: 1.04, y: -1 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium cursor-default"
                                        style={{
                                            background: "color-mix(in srgb, var(--color-text-secondary) 5%, transparent)",
                                            color: "var(--color-text-main)",
                                            border: "1px solid color-mix(in srgb, var(--color-text-secondary) 8%, transparent)",
                                        }}>
                                        <Hash size={12} style={{ color: "var(--color-text-secondary)" }} />
                                        {t}
                                    </motion.span>
                                ))}
                            </div>
                        </Section>

                        {/* Bonus Objectives */}
                        {job.bonusObjectives?.length > 0 && (
                            <Section title="Bonus Objectives" icon={Rocket} delay={3}>
                                <div className="space-y-3">
                                    {job.bonusObjectives.map((obj, i) => (
                                        <SlideInCard key={i} index={i} className="flex items-start gap-3.5">
                                            <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-bold"
                                                style={{
                                                    background: "color-mix(in srgb, var(--color-accent) 10%, transparent)",
                                                    color: "var(--color-accent)",
                                                    border: "1px solid color-mix(in srgb, var(--color-accent) 18%, transparent)",
                                                }}>
                                                {i + 1}
                                            </div>
                                            <p className="text-[15px] leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                                                {obj}
                                            </p>
                                        </SlideInCard>
                                    ))}
                                </div>
                            </Section>
                        )}

                        {/* Evaluation */}
                        <Section title="Evaluation Criteria" icon={Award} delay={4}>
                            <div className="space-y-5">
                                {/* ── Recharts RadarChart for criteria weights ── */}
                                <div className="w-full" style={{ height: 260 }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadarChart
                                            data={job.evaluation.criteriaScores.map(c => ({
                                                subject: c.criteriaTitle.length > 14
                                                    ? c.criteriaTitle.slice(0, 13) + "…"
                                                    : c.criteriaTitle,
                                                value: c.weight,
                                                fullMark: 100,
                                            }))}
                                            margin={{ top: 10, right: 20, bottom: 10, left: 20 }}
                                        >
                                            <PolarGrid
                                                stroke="color-mix(in srgb, currentColor 10%, transparent)"
                                                strokeDasharray="3 3"
                                            />
                                            <PolarAngleAxis
                                                dataKey="subject"
                                                tick={({ x, y, payload }) => (
                                                    <text x={x} y={y} textAnchor="middle" dominantBaseline="central"
                                                        fill="var(--color-text-secondary)" fontSize={11} fontWeight={600}>
                                                        {payload.value}
                                                    </text>
                                                )}
                                            />
                                            <Tooltip
                                                contentStyle={{
                                                    background: "var(--color-surface)",
                                                    border: "1px solid color-mix(in srgb, var(--color-text-secondary) 12%, transparent)",
                                                    borderRadius: 12,
                                                    fontSize: 12,
                                                    color: "var(--color-text-main)",
                                                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                                                }}
                                                itemStyle={{ color: "var(--color-primary)" }}
                                                formatter={(val) => [`${val}%`, "Weight"]}
                                            />
                                            <Radar
                                                name="Weight"
                                                dataKey="value"
                                                stroke="var(--color-primary)"
                                                fill="var(--color-primary)"
                                                fillOpacity={0.12}
                                                strokeWidth={2}
                                                dot={{ r: 4, fill: "var(--color-primary)", strokeWidth: 0 }}
                                            />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </div>

                                {/* Score breakdown pills */}
                                <div className="grid grid-cols-3 gap-4 pt-2"
                                    style={{ borderTop: "1px solid color-mix(in srgb, var(--color-text-secondary) 8%, transparent)" }}>
                                    {[
                                        { label: "Auto Score (AI)", value: `${job.evaluation.autoScore}%`, icon: Zap, cv: "--color-primary" },
                                        { label: "Manual Review", value: `${job.evaluation.manualScore}%`, icon: Eye, cv: "--color-secondary" },
                                        { label: "Plagiarism Check", value: `${job.evaluation.plagiarismPenalty}%`, icon: Shield, cv: "--color-accent" },
                                    ].map(({ label, value, icon: Ic, cv }, i) => (
                                        <SlideInCard key={label} index={i}
                                            className="text-center p-4 rounded-xl"
                                            style={{
                                                background: `color-mix(in srgb, var(${cv}) 5%, transparent)`,
                                                border: `1px solid color-mix(in srgb, var(${cv}) 10%, transparent)`,
                                            }}>
                                            <Ic size={18} className="mx-auto mb-2" style={{ color: `var(${cv})` }} />
                                            <p className="text-lg font-bold" style={{ color: "var(--color-text-main)" }}>{value}</p>
                                            <p className="text-xs font-medium mt-1" style={{ color: "var(--color-text-secondary)" }}>{label}</p>
                                        </SlideInCard>
                                    ))}
                                </div>
                            </div>
                        </Section>

                        {/* Submission Types */}
                        <Section title="How to Submit" icon={Upload} delay={5}>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {job.submissionTypes.map((type, i) => {
                                    const m = SUBMIT_MAP[type] || SUBMIT_MAP.DOCUMENT;
                                    return (
                                        <SlideInCard key={type} index={i}
                                            className="flex items-center gap-3.5 p-5 rounded-xl cursor-default"
                                            style={{
                                                background: "color-mix(in srgb, var(--color-text-secondary) 4%, transparent)",
                                                border: "1px solid color-mix(in srgb, var(--color-text-secondary) 8%, transparent)",
                                            }}>
                                            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                                style={{
                                                    background: "color-mix(in srgb, var(--color-primary) 10%, transparent)",
                                                    color: "var(--color-primary)",
                                                }}>
                                                <m.icon size={18} />
                                            </div>
                                            <div>
                                                <p className="text-[15px] font-semibold" style={{ color: "var(--color-text-main)" }}>{m.label}</p>
                                                <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>{m.desc}</p>
                                            </div>
                                        </SlideInCard>
                                    );
                                })}
                            </div>
                        </Section>

                        {/* Rules */}
                        {comp.rules && (
                            <Section title="Rules & Guidelines" icon={FileText} delay={6}>
                                <div className="rounded-xl p-5"
                                    style={{
                                        background: "color-mix(in srgb, var(--color-accent) 4%, transparent)",
                                        border: "1px solid color-mix(in srgb, var(--color-accent) 12%, transparent)",
                                    }}>
                                    <p className="text-[15px] leading-[1.85]" style={{ color: "var(--color-text-secondary)" }}>
                                        {comp.rules}
                                    </p>
                                </div>
                            </Section>
                        )}
                    </div>

                    {/* ── RIGHT SIDEBAR (1/3) ── */}
                    <div className="space-y-4 lg:sticky lg:top-8 lg:self-start">

                        {/* ── Deadline Countdown Card ── */}
                        <motion.div initial={{ opacity: 0, x: 30, y: 10 }} animate={{ opacity: 1, x: 0, y: 0 }}
                            transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
                            <div className="relative rounded-2xl overflow-hidden"
                                style={{
                                    background: "var(--color-surface)",
                                    border: "1px solid color-mix(in srgb, var(--color-primary) 14%, transparent)",
                                    boxShadow: "0 0 0 1px color-mix(in srgb, var(--color-primary) 4%, transparent), 0 8px 32px rgba(0,0,0,0.07)",
                                }}>
                                {/* Glowing top border accent */}
                                <div className="absolute top-0 left-0 right-0 h-[2px]"
                                    style={{ background: "linear-gradient(90deg, var(--color-primary), var(--color-secondary))" }} />
                                {/* Faint mesh on card background */}
                                <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
                                    style={{
                                        backgroundImage: "radial-gradient(circle, var(--color-primary) 1px, transparent 1px)",
                                        backgroundSize: "20px 20px",
                                    }} />
                                <div className="relative p-5">
                                    {/* Header */}
                                    <div className="flex items-center justify-between mb-5">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                                                style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))", boxShadow: "0 3px 10px color-mix(in srgb, var(--color-primary) 28%, transparent)" }}>
                                                <Timer size={15} color="#fff" />
                                            </div>
                                            <span className="text-sm font-bold tracking-tight" style={{ color: "var(--color-text-main)" }}>Application Deadline</span>
                                        </div>
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold"
                                            style={{ background: "rgba(52,211,153,0.1)", color: "#34d399", border: "1px solid rgba(52,211,153,0.2)" }}>
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />LIVE
                                        </span>
                                    </div>
                                    {/* Countdown digits */}
                                    <div className="flex items-center gap-1 mb-4">
                                        <CountdownUnit value={cd.days} label="Days" />
                                        <span className="text-sm font-light mb-5 shrink-0 opacity-40" style={{ color: "var(--color-text-main)" }}>:</span>
                                        <CountdownUnit value={cd.hours} label="Hrs" />
                                        <span className="text-sm font-light mb-5 shrink-0 opacity-40" style={{ color: "var(--color-text-main)" }}>:</span>
                                        <CountdownUnit value={cd.minutes} label="Min" />
                                        <span className="text-sm font-light mb-5 shrink-0 opacity-40" style={{ color: "var(--color-text-main)" }}>:</span>
                                        <CountdownUnit value={cd.seconds} label="Sec" />
                                    </div>
                                    {/* End date chip */}
                                    <div className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium"
                                        style={{ background: "color-mix(in srgb, var(--color-primary) 5%, transparent)", color: "var(--color-text-secondary)" }}>
                                        <Calendar size={12} style={{ color: "var(--color-primary)" }} />
                                        Closes on <span className="font-semibold" style={{ color: "var(--color-text-main)" }}>
                                            {new Date(comp.projectInfo.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* ── Application Slots Card ── */}
                        <motion.div initial={{ opacity: 0, x: 30, y: 10 }} animate={{ opacity: 1, x: 0, y: 0 }}
                            transition={{ duration: 0.55, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}>
                            <div className="relative rounded-2xl overflow-hidden"
                                style={{
                                    background: "var(--color-surface)",
                                    border: "1px solid color-mix(in srgb, var(--color-secondary) 14%, transparent)",
                                    boxShadow: "0 0 0 1px color-mix(in srgb, var(--color-secondary) 4%, transparent), 0 8px 32px rgba(0,0,0,0.07)",
                                }}>
                                <div className="absolute top-0 left-0 right-0 h-[2px]"
                                    style={{ background: "linear-gradient(90deg, var(--color-secondary), var(--color-accent))" }} />
                                <div className="relative p-5">
                                    <div className="flex items-center gap-2.5 mb-5">
                                        <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                                            style={{ background: "linear-gradient(135deg, var(--color-secondary), var(--color-accent))", boxShadow: "0 3px 10px color-mix(in srgb, var(--color-secondary) 28%, transparent)" }}>
                                            <Users size={15} color="#fff" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold" style={{ color: "var(--color-text-main)" }}>Application Slots</p>
                                            <p className="text-[11px]" style={{ color: "var(--color-text-secondary)" }}>{slotsLeft} spots remaining</p>
                                        </div>
                                    </div>
                                    {/* ── Recharts RadialBarChart donut gauge ── */}
                                    <div className="relative flex items-center justify-center" style={{ height: 168 }}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <RadialBarChart
                                                innerRadius="62%"
                                                outerRadius="88%"
                                                startAngle={210}
                                                endAngle={-30}
                                                data={[
                                                    { name: "filled", value: filledPct, fill: "url(#slotGrad)" },
                                                    { name: "empty", value: 100 - filledPct, fill: "transparent" },
                                                ]}
                                                barSize={14}
                                            >
                                                <defs>
                                                    <linearGradient id="slotGrad" x1="0" y1="0" x2="1" y2="0">
                                                        <stop offset="0%" stopColor="var(--color-secondary)" />
                                                        <stop offset="100%" stopColor="var(--color-accent)" />
                                                    </linearGradient>
                                                </defs>
                                                <PolarGrid radialLines={false} gridType="circle"
                                                    stroke="color-mix(in srgb, currentColor 6%, transparent)" />
                                                <RadialBar dataKey="value" cornerRadius={8} background={{ fill: "color-mix(in srgb, var(--color-text-secondary) 6%, transparent)", cornerRadius: 8 }} />
                                            </RadialBarChart>
                                        </ResponsiveContainer>
                                        {/* Center label overlay */}
                                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                            <span className="text-3xl font-black tabular-nums leading-none"
                                                style={{
                                                    background: "linear-gradient(135deg, var(--color-secondary), var(--color-accent))",
                                                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                                                }}>
                                                {filledPct}%
                                            </span>
                                            <span className="text-[11px] font-semibold mt-1" style={{ color: "var(--color-text-secondary)" }}>filled</span>
                                        </div>
                                    </div>
                                    {/* Count row */}
                                    <div className="flex items-center justify-between px-1">
                                        <div>
                                            <p className="text-2xl font-black tabular-nums" style={{ color: "var(--color-text-main)", letterSpacing: "-0.03em" }}>
                                                {comp.totalApplications}
                                                <span className="text-sm font-semibold ml-1 opacity-40">/{comp.projectInfo.maxSubmissions}</span>
                                            </p>
                                            <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>candidates applied</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-base font-bold" style={{ color: "var(--color-text-main)" }}>{slotsLeft}</p>
                                            <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>slots remaining</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* ── Job Details Card ── */}
                        <motion.div initial={{ opacity: 0, x: 30, y: 10 }} animate={{ opacity: 1, x: 0, y: 0 }}
                            transition={{ duration: 0.55, delay: 0.44, ease: [0.22, 1, 0.36, 1] }}>
                            <div className="relative rounded-2xl overflow-hidden"
                                style={{
                                    background: "var(--color-surface)",
                                    border: "1px solid color-mix(in srgb, var(--color-text-secondary) 10%, transparent)",
                                    boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
                                }}>
                                <div className="absolute top-0 left-0 right-0 h-[2px]"
                                    style={{ background: "linear-gradient(90deg, color-mix(in srgb, var(--color-primary) 60%, var(--color-secondary)), color-mix(in srgb, var(--color-secondary) 60%, var(--color-accent)))" }} />
                                <div className="relative p-5">
                                    <p className="text-sm font-bold mb-4" style={{ color: "var(--color-text-main)" }}>Job Details</p>
                                    <div className="space-y-0 divide-y" style={{ borderColor: "color-mix(in srgb, var(--color-text-secondary) 7%, transparent)" }}>
                                        {[
                                            { icon: Briefcase, label: "Department", value: job.department, accent: "--color-primary" },
                                            { icon: GraduationCap, label: "Experience", value: job.experienceLevel, accent: "--color-secondary" },
                                            { icon: DollarSign, label: "Salary", value: `${fmt(job.salaryRange.min)}–${fmt(job.salaryRange.max)} ${job.salaryRange.currency}`, accent: "--color-accent" },
                                            { icon: Clock, label: "Type", value: job.employmentType, accent: "--color-primary" },
                                            { icon: MapPin, label: "Location", value: job.location, accent: "--color-secondary" },
                                        ].map(({ icon: Ic, label, value, accent }) => (
                                            <div key={label} className="flex items-center justify-between py-3">
                                                <span className="flex items-center gap-2.5 text-sm" style={{ color: "var(--color-text-secondary)" }}>
                                                    <span className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                                                        style={{ background: `color-mix(in srgb, var(${accent}) 8%, transparent)` }}>
                                                        <Ic size={13} style={{ color: `var(${accent})` }} />
                                                    </span>
                                                    {label}
                                                </span>
                                                <span className="text-sm font-semibold" style={{ color: "var(--color-text-main)" }}>{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* ── Company Card ── */}
                        <motion.div initial={{ opacity: 0, x: 30, y: 10 }} animate={{ opacity: 1, x: 0, y: 0 }}
                            transition={{ duration: 0.55, delay: 0.56, ease: [0.22, 1, 0.36, 1] }}>
                            <div className="relative rounded-2xl overflow-hidden"
                                style={{
                                    background: "var(--color-surface)",
                                    border: "1px solid color-mix(in srgb, var(--color-primary) 12%, transparent)",
                                    boxShadow: "0 8px 32px rgba(0,0,0,0.07)",
                                }}>
                                <div className="absolute top-0 left-0 right-0 h-[2px]"
                                    style={{ background: "linear-gradient(90deg, var(--color-primary), var(--color-secondary), var(--color-accent))" }} />
                                {/* Soft glow orb behind company logo */}
                                <div className="absolute top-0 left-0 w-32 h-32 pointer-events-none"
                                    style={{ background: "radial-gradient(ellipse at 0% 0%, color-mix(in srgb, var(--color-primary) 8%, transparent), transparent 70%)" }} />
                                <div className="relative p-5">
                                    <div className="flex items-center gap-3.5 mb-4">
                                        <div className="relative shrink-0">
                                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-extrabold shadow-lg"
                                                style={{
                                                    background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
                                                    color: "#fff",
                                                    boxShadow: "0 4px 14px color-mix(in srgb, var(--color-primary) 35%, transparent)",
                                                }}>
                                                {job.companyLogo}
                                            </div>
                                            {/* Verified dot */}
                                            {job.companyVerified && (
                                                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                                                    style={{ background: "var(--color-surface)", border: "2px solid var(--color-surface)" }}>
                                                    <BadgeCheck size={14} style={{ color: "var(--color-primary)" }} />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-base font-bold leading-tight" style={{ color: "var(--color-text-main)" }}>{job.companyName}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                                                    style={{ background: "color-mix(in srgb, var(--color-primary) 8%, transparent)", color: "var(--color-primary)" }}>
                                                    {job.industry}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Divider */}
                                    <div className="h-px mb-4" style={{ background: "color-mix(in srgb, var(--color-text-secondary) 7%, transparent)" }} />
                                    <motion.a whileHover={{ x: 4 }} href="#"
                                        className="flex items-center justify-between group cursor-pointer">
                                        <span className="text-sm font-semibold" style={{ color: "var(--color-primary)" }}>View Company Profile</span>
                                        <span className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200"
                                            style={{ background: "color-mix(in srgb, var(--color-primary) 8%, transparent)", color: "var(--color-primary)" }}>
                                            <ArrowRight size={14} />
                                        </span>
                                    </motion.a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* ════════════════════════════════════════════════════════════════
          FLOATING CTA DOCK
      ════════════════════════════════════════════════════════════════ */}
            <AnimatePresence>
                {showBar && (
                    <motion.div
                        key="cta-dock"
                        initial={{ y: 50, opacity: 0, scale: 0.8 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 50, opacity: 0, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 260, damping: 24 }}
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
                    >
                        <motion.div
                            layout
                            transition={{ layout: { type: "spring", stiffness: 300, damping: 28 } }}
                            className="flex items-center overflow-hidden"
                            style={{
                                background: "color-mix(in srgb, var(--color-surface) 68%, transparent)",
                                backdropFilter: "blur(32px) saturate(1.6)",
                                WebkitBackdropFilter: "blur(32px) saturate(1.6)",
                                border: "1px solid color-mix(in srgb, var(--color-text-secondary) 10%, transparent)",
                                boxShadow: "0 10px 50px rgba(0,0,0,0.20), 0 0 0 1px color-mix(in srgb, var(--color-text-secondary) 3%, transparent)",
                                borderRadius: barExpanded ? 56 : 18,
                                padding: barExpanded ? "7px 8px 7px 5px" : "7px",
                                gap: barExpanded ? 8 : 0,
                                transition: "border-radius 0.65s cubic-bezier(0.22,1,0.36,1), padding 0.65s cubic-bezier(0.22,1,0.36,1), gap 0.65s cubic-bezier(0.22,1,0.36,1), background 0.4s ease, box-shadow 0.4s ease",
                            }}
                        >
                            {/* Apply */}
                            <motion.button
                                layout
                                transition={{ layout: { type: "spring", stiffness: 300, damping: 28 } }}
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setApplied(!applied)}
                                className="relative overflow-hidden cursor-pointer flex items-center justify-center font-bold"
                                style={{
                                    borderRadius: barExpanded ? 9999 : 14,
                                    height: 48,
                                    minWidth: barExpanded ? 190 : 48,
                                    padding: barExpanded ? "0 26px" : "0",
                                    fontSize: 15,
                                    background: applied
                                        ? "rgba(52,211,153,0.14)"
                                        : "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
                                    border: applied ? "1px solid rgba(52,211,153,0.25)" : "none",
                                    color: applied ? "#34d399" : "#fff",
                                    boxShadow: applied ? "none" : "0 4px 20px color-mix(in srgb, var(--color-primary) 30%, transparent)",
                                    transition: "min-width 0.65s cubic-bezier(0.22,1,0.36,1), border-radius 0.65s cubic-bezier(0.22,1,0.36,1), padding 0.65s cubic-bezier(0.22,1,0.36,1), background 0.3s ease, box-shadow 0.3s ease",
                                }}
                            >
                                {!applied && barExpanded && (
                                    <motion.div className="absolute inset-0 pointer-events-none"
                                        style={{ background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.12) 50%, transparent 70%)" }}
                                        animate={{ x: ["-140%", "220%"] }}
                                        transition={{ duration: 3.2, repeat: Infinity, ease: "linear", repeatDelay: 3.5 }} />
                                )}
                                <AnimatePresence mode="wait">
                                    <motion.span key={`${applied}-${barExpanded}`}
                                        initial={{ opacity: 0, scale: 0.6 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.6 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 22 }}
                                        className="relative flex items-center justify-center gap-2.5 whitespace-nowrap">
                                        {applied ? <CheckCircle2 size={18} /> : <Send size={18} />}
                                        {barExpanded && (
                                            <motion.span initial={{ opacity: 0, width: 0 }}
                                                animate={{ opacity: 1, width: "auto" }}
                                                transition={{ duration: 0.4, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                                                className="overflow-hidden">
                                                {applied ? "Applied!" : "Apply Now"}
                                            </motion.span>
                                        )}
                                    </motion.span>
                                </AnimatePresence>
                            </motion.button>

                            {/* Save + Share */}
                            <AnimatePresence>
                                {barExpanded && (
                                    <>
                                        <motion.button key="save-btn"
                                            initial={{ opacity: 0, scale: 0.2, width: 0 }}
                                            animate={{ opacity: 1, scale: 1, width: saved ? 130 : 42 }}
                                            exit={{ opacity: 0, scale: 0.2, width: 0 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 26 }}
                                            whileHover={{ scale: 1.06 }}
                                            whileTap={{ scale: 0.92 }}
                                            onClick={() => setSaved(!saved)}
                                            className="h-10 flex items-center justify-center cursor-pointer shrink-0 overflow-hidden font-semibold"
                                            style={{
                                                borderRadius: 9999,
                                                background: saved ? "color-mix(in srgb, var(--color-accent) 14%, transparent)" : "color-mix(in srgb, var(--color-text-secondary) 7%, transparent)",
                                                border: saved ? "1px solid color-mix(in srgb, var(--color-accent) 22%, transparent)" : "1px solid color-mix(in srgb, var(--color-text-secondary) 8%, transparent)",
                                                color: saved ? "var(--color-accent)" : "var(--color-text-secondary)",
                                                fontSize: 13,
                                            }}>
                                            <motion.span className="flex items-center justify-center gap-2 whitespace-nowrap"
                                                key={saved ? "sv" : "unsv"}
                                                initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
                                                transition={{ type: "spring", stiffness: 400, damping: 22 }}>
                                                {saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                                                {saved && <span>Saved!</span>}
                                            </motion.span>
                                        </motion.button>

                                        <motion.button key="share-btn"
                                            initial={{ opacity: 0, scale: 0.2, width: 0 }}
                                            animate={{ opacity: 1, scale: 1, width: copied ? 130 : 42 }}
                                            exit={{ opacity: 0, scale: 0.2, width: 0 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 26, delay: copied ? 0 : 0.06 }}
                                            whileHover={{ scale: 1.06 }}
                                            whileTap={{ scale: 0.92 }}
                                            onClick={handleCopy}
                                            className="h-10 flex items-center justify-center cursor-pointer shrink-0 overflow-hidden font-semibold"
                                            style={{
                                                borderRadius: 9999,
                                                background: copied ? "rgba(52,211,153,0.12)" : "color-mix(in srgb, var(--color-text-secondary) 7%, transparent)",
                                                border: copied ? "1px solid rgba(52,211,153,0.22)" : "1px solid color-mix(in srgb, var(--color-text-secondary) 8%, transparent)",
                                                color: copied ? "#34d399" : "var(--color-text-secondary)",
                                                fontSize: 13,
                                            }}>
                                            <motion.span className="flex items-center justify-center gap-2 whitespace-nowrap"
                                                key={copied ? "cp" : "uncp"}
                                                initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
                                                transition={{ type: "spring", stiffness: 400, damping: 22 }}>
                                                {copied ? <Check size={16} /> : <Copy size={16} />}
                                                {copied && <span>Copied!</span>}
                                            </motion.span>
                                        </motion.button>
                                    </>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
