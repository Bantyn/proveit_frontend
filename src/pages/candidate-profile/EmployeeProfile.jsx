import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Formik, Form, Field, FieldArray } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDropzone } from 'react-dropzone';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Icons
import {
    User, Mail, Phone, MapPin, Briefcase, GraduationCap,
    FileText, Link as LinkIcon, Github, Linkedin, Globe,
    Edit2, Save, X, Upload, CheckCircle, Plus, AlertCircle, Award
} from 'lucide-react';

// Custom UI & Utilities
import { CursorCard } from './sections/CursorCards';
import PremiumButton from '../../components/ui/PremiumButton';
import SkillChip from '../../components/ui/SkillChip';
import CompletionRing from '../../components/ui/CompletionRing';
import { candidateProfileSchema } from '../../utils/validationSchemas';
import dummyData from '../../data/dummyCandidateProfile.json';

const EmployeeProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [profileData, setProfileData] = useState(dummyData);

    useEffect(() => {
        AOS.init({ duration: 800, once: true, easing: 'ease-out-cubic' });
    }, []);

    // Calculate completion percentage based on essential fields
    const calculateCompletion = (data) => {
        const fields = ['candidateName', 'title', 'bio', 'location', 'skills', 'githubLink', 'resumeUrl'];
        let filled = 0;
        fields.forEach(field => {
            if (Array.isArray(data[field]) ? data[field].length > 0 : !!data[field]) {
                filled += 1;
            }
        });
        return Math.round((filled / fields.length) * 100);
    };

    const completionPercentage = calculateCompletion(profileData);

    const handleSubmit = async (values, { setSubmitting }) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setProfileData(values);
        setSubmitting(false);
        setIsEditing(false);
        toast.success("Profile updated successfully", { position: "top-right", theme: "dark" });
    };

    const tabs = [
        { id: 'overview', label: 'Overview', icon: User },
        { id: 'resume', label: 'Resume & Skills', icon: FileText },
        { id: 'portfolio', label: 'Portfolio', icon: Globe }
    ];

    const inputClasses = 'w-full px-4 py-3 rounded-xl border bg-surface/50 border-white/5 text-text-main focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200 placeholder-text-secondary/50';
    const errorClasses = 'text-red-400 text-xs font-medium mt-1 flex items-center gap-1';

    // Dropzone component for Resume Upload
    const ResumeDropzone = ({ setFieldValue, values }) => {
        const { getRootProps, getInputProps, isDragActive } = useDropzone({
            accept: { 'application/pdf': ['.pdf'] },
            onDrop: acceptedFiles => {
                if (acceptedFiles.length > 0) {
                    // In a real app, upload to cloud and get URL. Here we simulate.
                    setFieldValue('resumeUrl', `https://storage.proveit.io/${acceptedFiles[0].name}`);
                    toast.info(`Uploaded ${acceptedFiles[0].name}`, { theme: 'dark' });
                }
            }
        });

        return (
            <div {...getRootProps()} className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${isDragActive ? 'border-primary bg-primary/5' : 'border-white/10 hover:border-primary/50 hover:bg-white/5'}`}>
                <input {...getInputProps()} />
                <Upload className={`w-10 h-10 mx-auto mb-4 ${isDragActive ? 'text-primary' : 'text-text-secondary'}`} />
                <p className="text-text-main font-medium mb-1">Drag & drop your resume here</p>
                <p className="text-text-secondary text-sm">Or click to browse files (PDF only)</p>
                {values.resumeUrl && (
                    <div className="mt-4 p-3 rounded-xl bg-surface/80 border border-white/5 flex items-center justify-between">
                        <span className="text-sm font-medium text-primary truncate max-w-[200px]">{values.resumeUrl.split('/').pop()}</span>
                        <CheckCircle className="w-4 h-4 text-green-400" />
                    </div>
                )}
            </div>
        );
    };

    return (
        <Formik
            initialValues={profileData}
            validationSchema={candidateProfileSchema}
            onSubmit={handleSubmit}
            enableReinitialize
        >
            {({ values, errors, touched, isSubmitting, setFieldValue, isValid }) => (
                <Form className="min-h-screen bg-background text-text-main pb-24 font-sans selection:bg-primary/20 selection:text-primary relative">

                    {/* Header Background */}
                    <div className="h-64 md:h-80 w-full relative overflow-hidden border-b border-white/5">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
                        <div className="absolute inset-0 grid-bg opacity-[0.15]" />
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                    </div>

                    {/* Top Right Actions */}
                    <div className="fixed top-24 right-6 md:right-12 z-40">
                        <AnimatePresence mode="popLayout">
                            {isEditing ? (
                                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="flex items-center gap-3">
                                    <PremiumButton variant="3d-press" onClick={() => setIsEditing(false)} className="!py-2 !px-4 text-sm">
                                        Cancel
                                    </PremiumButton>
                                    <PremiumButton type="submit" variant="shimmer" disabled={!isValid || isSubmitting} className="!py-2 !px-4 text-sm">
                                        <Save className="w-4 h-4" /> {isSubmitting ? 'Saving...' : 'Save Profile'}
                                    </PremiumButton>
                                </motion.div>
                            ) : (
                                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
                                    <PremiumButton variant="magnetic" onClick={() => setIsEditing(true)} className="!py-2 !px-4 text-sm bg-surface/80 backdrop-blur-xl">
                                        <Edit2 className="w-4 h-4" /> Edit Profile
                                    </PremiumButton>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto -mt-32 relative z-10">

                        {/* ───────── PROFILE HEADER ───────── */}
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
                            <CursorCard className="p-8 md:p-10 rounded-[2.5rem] glass-panel flex flex-col md:flex-row items-center md:items-start gap-8 relative overflow-hidden shadow-2xl shadow-black/40 border-white/5" borderColor="rgba(99, 102, 241, 0.15)">

                                {/* Avatar & Completion */}
                                <div className="relative shrink-0 flex flex-col items-center">
                                    <div className="relative">
                                        <CompletionRing percentage={completionPercentage} size={150} strokeWidth={4} />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-br from-primary via-secondary to-accent shadow-lg">
                                                <div className="w-full h-full rounded-full overflow-hidden bg-surface flex items-center justify-center relative group">
                                                    <User className="w-16 h-16 text-text-secondary/30" />
                                                    {isEditing && (
                                                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <Upload className="w-8 h-8 text-white" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {!isEditing && (
                                        <div className="mt-4 text-xs font-bold text-text-secondary tracking-widest uppercase bg-surface/50 px-3 py-1 rounded-full border border-white/5">
                                            {completionPercentage}% Complete
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1 text-center md:text-left w-full pt-2">
                                    {isEditing ? (
                                        <div className="space-y-4 max-w-xl mx-auto md:mx-0">
                                            <div>
                                                <Field name="candidateName" placeholder="Full Name" className={`text-2xl md:text-3xl font-bold bg-transparent border-b ${errors.candidateName && touched.candidateName ? 'border-red-400' : 'border-primary/30'} focus:outline-none w-full text-text-main pb-1`} />
                                                {errors.candidateName && touched.candidateName && <div className={errorClasses}><AlertCircle className="w-3 h-3" />{errors.candidateName}</div>}
                                            </div>
                                            <div>
                                                <Field name="title" placeholder="Professional Title" className={`text-lg bg-transparent border-b ${errors.title && touched.title ? 'border-red-400' : 'border-primary/30'} focus:outline-none w-full text-primary pb-1`} />
                                                {errors.title && touched.title && <div className={errorClasses}><AlertCircle className="w-3 h-3" />{errors.title}</div>}
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <Field name="location" placeholder="Location" className={inputClasses + ' text-sm'} />
                                                <Field as="select" name="experienceLevel" className={inputClasses + ' text-sm'}>
                                                    <option value="Fresher" className="bg-surface">Fresher</option>
                                                    <option value="Junior" className="bg-surface">Junior</option>
                                                    <option value="Mid-Level" className="bg-surface">Mid-Level</option>
                                                    <option value="Senior" className="bg-surface">Senior</option>
                                                    <option value="Lead" className="bg-surface">Lead</option>
                                                </Field>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 text-gradient-primary inline-block pb-1">{values.candidateName}</h1>
                                            <p className="text-xl text-text-secondary font-medium mb-6 tracking-wide">{values.title}</p>
                                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                                                <span className="px-5 py-2 rounded-full bg-surface/60 border border-white/5 text-text-secondary text-sm font-medium flex items-center gap-2 shadow-sm backdrop-blur-md">
                                                    <MapPin className="w-4 h-4 text-primary" /> {values.location}
                                                </span>
                                                <span className="px-5 py-2 rounded-full bg-surface/60 border border-white/5 text-text-secondary text-sm font-medium flex items-center gap-2 shadow-sm backdrop-blur-md">
                                                    <Briefcase className="w-4 h-4 text-secondary" /> {values.experienceLevel}
                                                </span>
                                                <span className="px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold flex items-center gap-2 shadow-sm backdrop-blur-md">
                                                    <Award className="w-4 h-4" /> {values.availabilityStatus}
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </CursorCard>
                        </motion.div>

                        {/* ───────── NAVIGATION ───────── */}
                        <div className="mt-12 flex items-center gap-2 p-1.5 rounded-2xl bg-surface/40 backdrop-blur-xl border border-white/5 w-fit mx-auto md:mx-0 shadow-sm" data-aos="fade-up" data-aos-delay="100">
                            {tabs.map((tab) => (
                                <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${activeTab === tab.id
                                        ? 'bg-surface text-text-main shadow-md border border-white/10 scale-[1.02]'
                                        : 'text-text-secondary hover:text-text-main hover:bg-white/5'
                                        }`}>
                                    <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-primary' : ''}`} />
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* ═══════════ TAB CONTENT ═══════════ */}
                        <div className="mt-8">
                            <AnimatePresence mode="wait">

                                {/* OVERVIEW TAB */}
                                {activeTab === 'overview' && (
                                    <motion.div key="overview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4, ease: "easeOut" }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                        <div className="lg:col-span-2 space-y-6">
                                            <CursorCard className="p-8 rounded-[2.5rem] glass-panel shadow-sm border-white/5">
                                                <h3 className="text-xl font-bold text-text-main mb-6 flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center"><User className="w-4 h-4 text-primary" /></div>
                                                    Professional Bio
                                                </h3>
                                                {isEditing ? (
                                                    <div>
                                                        <Field as="textarea" name="bio" rows={4} className={inputClasses} placeholder="Tell us about yourself..." />
                                                        {errors.bio && touched.bio && <div className={errorClasses}><AlertCircle className="w-3 h-3" />{errors.bio}</div>}
                                                    </div>
                                                ) : (
                                                    <p className="text-text-secondary leading-relaxed text-[1.05rem] font-medium opacity-90">{values.bio || "No bio added yet."}</p>
                                                )}
                                            </CursorCard>

                                            <CursorCard className="p-8 rounded-[2.5rem] glass-panel shadow-sm border-white/5">
                                                <h3 className="text-xl font-bold text-text-main mb-6 flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center"><GraduationCap className="w-4 h-4 text-secondary" /></div>
                                                    Education
                                                </h3>
                                                <FieldArray name="education">
                                                    {({ push, remove }) => (
                                                        <div className="space-y-4">
                                                            {values.education.map((edu, index) => (
                                                                <div key={index} className="p-5 rounded-2xl bg-surface/50 border border-white/5 relative group">
                                                                    {isEditing ? (
                                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                            <Field name={`education.${index}.degree`} placeholder="Degree" className={inputClasses + ' text-sm'} />
                                                                            <Field name={`education.${index}.college`} placeholder="Institution" className={inputClasses + ' text-sm'} />
                                                                            <Field type="number" name={`education.${index}.year`} placeholder="Graduation Year" className={inputClasses + ' text-sm'} />
                                                                            <button type="button" onClick={() => remove(index)} className="text-red-400 text-sm font-bold text-left hover:text-red-300">Remove</button>
                                                                        </div>
                                                                    ) : (
                                                                        <div>
                                                                            <div className="font-bold text-lg text-text-main mb-1">{edu.degree}</div>
                                                                            <div className="text-sm text-text-secondary font-medium flex items-center gap-2">
                                                                                <MapPin className="w-3 h-3 text-primary/70" /> {edu.college} • {edu.year}
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            ))}
                                                            {isEditing && (
                                                                <button type="button" onClick={() => push({ degree: '', college: '', year: new Date().getFullYear() })} className="text-sm font-bold text-primary flex items-center gap-1 hover:text-primary/80 transition-colors">
                                                                    <Plus className="w-4 h-4" /> Add Education
                                                                </button>
                                                            )}
                                                        </div>
                                                    )}
                                                </FieldArray>
                                            </CursorCard>
                                        </div>

                                        <div className="space-y-6">
                                            <CursorCard className="p-8 rounded-[2.5rem] glass-panel shadow-sm border-white/5">
                                                <h3 className="text-xl font-bold text-text-main mb-6 flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center"><Mail className="w-4 h-4 text-accent" /></div>
                                                    Contact
                                                </h3>
                                                <div className="space-y-5">
                                                    <div>
                                                        <div className="text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-1">Email</div>
                                                        {isEditing ? <Field type="email" name="email" className={inputClasses + ' text-sm mt-0 py-2'} /> : <div className="text-sm font-bold">{values.email}</div>}
                                                    </div>
                                                    <div>
                                                        <div className="text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-1">Phone</div>
                                                        {isEditing ? <Field type="text" name="phone" className={inputClasses + ' text-sm mt-0 py-2'} /> : <div className="text-sm font-bold">{values.phone}</div>}
                                                    </div>
                                                </div>
                                            </CursorCard>
                                        </div>
                                    </motion.div>
                                )}

                                {/* SKILLS TAB */}
                                {activeTab === 'resume' && (
                                    <motion.div key="resume" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="space-y-6">
                                        <CursorCard className="p-8 md:p-10 rounded-[2.5rem] glass-panel border-white/5" borderColor="rgba(139, 92, 246, 0.2)">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                                                <h3 className="text-2xl font-bold text-text-main flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Briefcase className="w-5 h-5 text-primary" /></div>
                                                    Core Competencies
                                                </h3>
                                            </div>

                                            <FieldArray name="skills">
                                                {({ push, remove }) => (
                                                    <>
                                                        {isEditing && (
                                                            <div className="mb-8 p-6 rounded-2xl bg-surface/30 border border-white/5">
                                                                <h4 className="text-sm font-bold text-text-main mb-4">Add New Skill</h4>
                                                                <div className="flex flex-col md:flex-row gap-3">
                                                                    <input id="newSkillName" placeholder="e.g. Node.js" className={inputClasses + ' flex-[2]'} />
                                                                    <select id="newSkillLevel" className={inputClasses + ' flex-1'}>
                                                                        <option value="Beginner" className="bg-surface">Beginner</option>
                                                                        <option value="Intermediate" className="bg-surface">Intermediate</option>
                                                                        <option value="Advanced" className="bg-surface">Advanced</option>
                                                                        <option value="Expert" className="bg-surface">Expert</option>
                                                                    </select>
                                                                    <PremiumButton variant="neon-pulse" type="button" onClick={() => {
                                                                        const name = document.getElementById('newSkillName').value;
                                                                        const level = document.getElementById('newSkillLevel').value;
                                                                        if (name) { push({ name, level, years: 1 }); document.getElementById('newSkillName').value = ''; }
                                                                    }}>
                                                                        Add
                                                                    </PremiumButton>
                                                                </div>
                                                                {typeof errors.skills === 'string' && touched.skills && <div className={errorClasses + ' mt-3'}>{errors.skills}</div>}
                                                            </div>
                                                        )}

                                                        <div className="flex flex-wrap gap-3">
                                                            <AnimatePresence>
                                                                {values.skills.map((skill, index) => (
                                                                    <SkillChip
                                                                        key={`${skill.name}-${index}`}
                                                                        skill={skill.name}
                                                                        level={skill.level}
                                                                        isEditing={isEditing}
                                                                        onRemove={() => remove(index)}
                                                                    />
                                                                ))}
                                                            </AnimatePresence>
                                                        </div>
                                                    </>
                                                )}
                                            </FieldArray>
                                        </CursorCard>
                                    </motion.div>
                                )}

                                {/* PORTFOLIO TAB */}
                                {activeTab === 'portfolio' && (
                                    <motion.div key="portfolio" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                                        <CursorCard className="p-8 rounded-[2.5rem] glass-panel border-white/5" borderColor="rgba(59, 130, 246, 0.2)">
                                            <h3 className="text-xl font-bold text-text-main mb-6 flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center"><Github className="w-4 h-4 text-blue-400" /></div>
                                                External Links
                                            </h3>
                                            <div className="space-y-6">
                                                {[
                                                    { name: 'Portfolio Website', icon: Globe, field: 'portfolioLink', placeholder: 'https://...' },
                                                    { name: 'GitHub Profile', icon: Github, field: 'githubLink', placeholder: 'https://github.com/...' },
                                                    { name: 'LinkedIn', icon: Linkedin, field: 'linkedinLink', placeholder: 'https://linkedin.com/in/...' }
                                                ].map((item, idx) => (
                                                    <div key={idx}>
                                                        {isEditing ? (
                                                            <div>
                                                                <label className="text-[11px] font-bold uppercase tracking-widest text-text-secondary mb-1 flex items-center gap-2">
                                                                    <item.icon className="w-3 h-3" /> {item.name}
                                                                </label>
                                                                <Field name={item.field} placeholder={item.placeholder} className={inputClasses + ' text-sm py-2'} />
                                                                {errors[item.field] && touched[item.field] && <div className={errorClasses}>{errors[item.field]}</div>}
                                                            </div>
                                                        ) : (
                                                            <a href={values[item.field] || '#'} target="_blank" rel="noreferrer" className="flex items-center gap-4 group p-3 rounded-2xl hover:bg-white/5 transition-all border border-transparent hover:border-white/5">
                                                                <div className="p-3 rounded-xl bg-surface border border-white/5 text-text-secondary group-hover:text-primary transition-colors shadow-sm">
                                                                    <item.icon className="w-5 h-5" />
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="text-sm font-bold text-text-main mb-1">{item.name}</div>
                                                                    <div className="text-sm text-text-secondary group-hover:text-primary truncate font-medium transition-colors">
                                                                        {values[item.field] ? values[item.field].replace(/^https?:\/\//, '') : 'Not provided'}
                                                                    </div>
                                                                </div>
                                                                <ChevronRight className="w-4 h-4 text-text-secondary/50 group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
                                                            </a>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </CursorCard>

                                        <CursorCard className="p-8 rounded-[2.5rem] glass-panel border-white/5" borderColor="rgba(249, 115, 22, 0.2)">
                                            <h3 className="text-xl font-bold text-text-main mb-6 flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center"><FileText className="w-4 h-4 text-accent" /></div>
                                                Resume & Documents
                                            </h3>

                                            {isEditing ? (
                                                <div className="space-y-4">
                                                    <ResumeDropzone setFieldValue={setFieldValue} values={values} />
                                                    <div className="text-center text-text-secondary text-sm font-medium my-2">OR</div>
                                                    <div>
                                                        <Field name="resumeUrl" placeholder="Paste Resume URL (G-Drive, Dropbox)" className={inputClasses + ' text-sm py-2'} />
                                                        {errors.resumeUrl && touched.resumeUrl && <div className={errorClasses}>{errors.resumeUrl}</div>}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="h-full flex flex-col items-center justify-center text-center p-8 border border-white/5 rounded-2xl bg-surface/30">
                                                    {values.resumeUrl ? (
                                                        <>
                                                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                                                                <FileText className="w-8 h-8 text-primary" />
                                                            </div>
                                                            <h4 className="text-lg font-bold text-text-main mb-2">Resume Uploaded</h4>
                                                            <a href={values.resumeUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-4 px-6 py-2.5 rounded-full bg-surface border border-white/10 hover:border-primary/50 hover:text-primary transition-all text-sm font-bold shadow-sm">
                                                                <LinkIcon className="w-4 h-4" /> View Document
                                                            </a>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="w-16 h-16 rounded-2xl bg-surface border border-white/5 flex items-center justify-center mb-4 opacity-50">
                                                                <AlertCircle className="w-8 h-8 text-text-secondary" />
                                                            </div>
                                                            <h4 className="text-lg font-bold text-text-secondary mb-2">No Resume Provided</h4>
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                        </CursorCard>

                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default EmployeeProfile;

// Temporary helper icon
const ChevronRight = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
);
