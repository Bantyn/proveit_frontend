import React from 'react';
//import GlassElement from '../ui/glass-ui/GlassElement';
import { Users, Target, Calendar, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ActiveJobsOverview = ({ jobs }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {jobs.map((job, index) => (
                <motion.div
                    key={job.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.4, ease: "circOut" }}
                    className="p-7 flex flex-col gap-5 group relative overflow-hidden rounded-[2.5rem] glass-panel shadow-xl hover:shadow-2xl hover:shadow-secondary/10 transition-all duration-500"
                >
                    {/* Top Color Accent */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-secondary via-primary to-secondary opacity-30 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Dynamic Color Glow */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-secondary/20 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary/10 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    {/* Hover Glow Effect */}
                    <div className="absolute -inset-20 bg-secondary/5 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    {/* Animated Scanning Line */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent h-[10%] w-full -translate-y-full group-hover:animate-[scanline_3s_linear_infinite] pointer-events-none" />
                    {/* Status Badge */}
                    <div className="flex justify-between items-start">
                        <div className="text-[10px] font-black uppercase tracking-widest text-secondary bg-secondary/15 px-2.5 py-1 rounded-lg">
                            {job.status}
                        </div>
                        <div className="text-[10px] text-text-main flex items-center gap-1.5 font-mono font-bold opacity-70">
                            <Calendar size={13} />
                            {new Date(job.deadline).toLocaleDateString()}
                        </div>
                    </div>

                    <h4 className="text-lg font-bold text-text-main group-hover:text-primary transition-colors leading-tight">
                        {job.title}
                    </h4>

                    <div className="flex gap-4 mt-2">
                        <div className="flex-1 flex flex-col gap-2">
                            <div className="flex items-center gap-2.5 text-text-secondary text-[10px] uppercase font-bold tracking-wider opacity-60">
                                <span className="p-1.5 rounded-lg bg-primary/5 text-primary group-hover:bg-primary/10 transition-colors">
                                    <Users size={14} />
                                </span>
                                <span>Applied</span>
                            </div>
                            <span className="text-xl font-black text-secondary">{job.applied}</span>
                        </div>

                        <div className="flex-1 flex flex-col gap-2">
                            <div className="flex items-center gap-2.5 text-text-secondary text-[10px] uppercase font-bold tracking-wider opacity-60">
                                <span className="p-1.5 rounded-lg bg-secondary/5 text-secondary group-hover:bg-secondary/10 transition-colors">
                                    <Target size={14} />
                                </span>
                                <span>Shortlisted</span>
                            </div>
                            <span className="text-xl font-black text-secondary">{job.shortlisted}</span>
                        </div>
                    </div>

                    {/* Mini Progress Bar */}
                    <div className="w-full h-1.5 bg-muted/20 rounded-full mt-2 overflow-hidden relative">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(job.shortlisted / job.applied) * 100}%` }}
                            transition={{ duration: 1.5, delay: index * 0.2, ease: "circOut" }}
                            className="h-full bg-secondary relative"
                        >
                            <div className="absolute inset-0 shadow-[0_0_12px_rgba(var(--color-secondary-rgb),0.8)]" />
                            {/* Animated Pulse */}
                            <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]" />
                        </motion.div>
                    </div>

                    <div className="mt-4 flex justify-between items-center text-[10px] font-black text-secondary cursor-pointer uppercase tracking-[0.2em] group/matrix">
                        <span className="relative">
                            Candidate Matrix
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-secondary group-hover/matrix:w-full transition-all duration-300" />
                        </span>
                        <div className="p-1.5 rounded-lg bg-secondary/0 group-hover/matrix:bg-secondary/10 transition-colors">
                            <ChevronRight size={16} className="group-hover/matrix:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default ActiveJobsOverview;
