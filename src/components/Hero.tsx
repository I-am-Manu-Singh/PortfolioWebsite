import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown, Eye, Bug } from 'lucide-react';
import { resumeData } from '../data/resume';
const ProfileImage = `${import.meta.env.BASE_URL}profile.jpg`;
const ProfileImagePersonal = `${import.meta.env.BASE_URL}profile_personal.png`;
import SectionBackground from './SectionBackground';
import ResumePreview from './ResumePreview';

const letterContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.5
        }
    }
};

const letterVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring" as const,
            damping: 15,
            stiffness: 200
        }
    }
};

interface HeroProps {
    setActiveTab: (tab: 'work' | 'personal') => void;
}

const Hero: React.FC<HeroProps> = ({ setActiveTab }) => {
    const nameLetters = resumeData.basics.name.split("");
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [visitCount, setVisitCount] = useState<number | null>(null);

    interface Target {
        id: number;
        x: number;
        y: number;
    }

    // Shooting Game State
    const [score, setScore] = useState(0);
    const [targets, setTargets] = useState<Target[]>([]);
    const [gameActive, setGameActive] = useState(true);
    const textControls = useAnimation();

    const triggerUnlock = async () => {
        await textControls.start({
            scale: [1, 1.2, 0],
            opacity: [1, 1, 0],
            transition: { duration: 0.5 }
        });
        setActiveTab('personal');
    };

    const handleTargetClick = (id: number) => {
        setTargets(prev => prev.filter(t => t.id !== id));
        setScore(prev => {
            const newScore = Math.min(prev + 10, 100);
            if (newScore === 100) {
                setGameActive(false);
                setTimeout(triggerUnlock, 1000);
            }
            return newScore;
        });
    };

    // Game Loop - Spawn targets
    React.useEffect(() => {
        if (!gameActive || score >= 100) return;

        const interval = setInterval(() => {
            if (targets.length < 5) {
                const newTarget = {
                    id: Date.now(),
                    x: (Math.random() - 0.5) * 200, // Random X offset
                    y: (Math.random() - 0.5) * 200  // Random Y offset
                };
                setTargets(prev => [...prev, newTarget]);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [gameActive, score, targets.length]);

    React.useEffect(() => {
        // Simple visit counter using countapi.xyz
        fetch('https://api.countapi.xyz/hit/manpreet-portfolio-v1/visits')
            .then(res => res.json())
            .then(data => setVisitCount(data.value))
            .catch(err => console.error("CountAPI error:", err));
    }, []);

    return (
        <section className="min-h-screen flex flex-col justify-center relative overflow-hidden px-4 md:px-0" id="hero">
            {/* Background Elements */}
            <SectionBackground variant="hero" />

            <div className="container max-w-6xl mx-auto z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <motion.div
                    className="order-2 md:order-1"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0, x: -50 },
                        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
                    }}
                >
                    <motion.h2
                        className="text-secondary font-mono text-xl md:text-2xl mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        Hello, I'm
                    </motion.h2>

                    <motion.h1
                        className="text-5xl md:text-7xl font-bold mb-6 tracking-tight flex flex-wrap"
                        variants={letterContainerVariants}
                    >
                        {nameLetters.map((letter, index) => (
                            <motion.span key={index} variants={letterVariants} className="hover:text-primary transition-colors cursor-default">
                                {letter === " " ? "\u00A0" : letter}
                            </motion.span>
                        ))}
                        <motion.span variants={letterVariants} className="text-primary">.</motion.span>
                    </motion.h1>

                    <motion.h3
                        className="text-3xl md:text-5xl font-bold mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.8 }}
                    >
                        <span className="text-text-muted">I build </span>
                        <span className="gradient-text-animated text-glow">mobile experiences</span>
                    </motion.h3>

                    <p className="max-w-xl text-lg md:text-xl text-text-muted leading-relaxed mb-10">
                        {resumeData.basics.summary}
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <motion.a
                            href={`mailto:${resumeData.basics.email}`}
                            className="group px-8 py-3 bg-transparent border border-primary text-primary hover:bg-primary/10 rounded-full font-mono transition-all flex items-center gap-2 overflow-hidden relative"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="absolute inset-0 w-full h-full bg-primary/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                            <Mail size={18} className="relative z-10" /> <span className="relative z-10">Contact Me</span>
                        </motion.a>
                        <motion.button
                            onClick={() => setIsPreviewOpen(true)}
                            className="px-8 py-3 bg-primary text-white rounded-full font-mono hover:bg-primary-light transition-all shadow-lg shadow-primary/25 flex items-center gap-2"
                            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0,79,144,0.5)" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Preview Resume <Eye size={18} />
                        </motion.button>

                        {visitCount && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex items-center gap-2 px-4 py-3 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-text-muted cursor-help"
                                title="Total Portfolio Visits"
                            >
                                <Eye size={14} /> {visitCount.toLocaleString()} Visits
                            </motion.div>
                        )}
                    </div>

                    <div className="mt-12 flex gap-6">
                        {resumeData.basics.profiles.map((profile, index) => (
                            <motion.a
                                key={index}
                                href={profile.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 bg-white/5 rounded-full text-text-muted hover:text-white hover:bg-primary/20 hover:border-primary/50 border border-transparent transition-all"
                                whileHover={{ y: -5, scale: 1.1 }}
                                title={profile.network}
                            >
                                {profile.network === 'GitHub' && <Github size={24} />}
                                {profile.network === 'LinkedIn' && <Linkedin size={24} />}
                                {profile.network === 'LeetCode' && (
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/8/8e/LeetCode_Logo_1.png" alt="LeetCode" className="w-6 h-6 object-contain" />
                                )}
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

                {/* Profile Image with Floating Target Game */}
                <motion.div
                    className="order-1 md:order-2 flex justify-center perspective-1000 relative z-20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                >
                    <div className="relative w-64 h-64 md:w-80 md:h-80 cursor-pointer group">
                        {/* Score Card */}
                        {gameActive && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute -top-12 left-0 right-0 z-50 flex flex-col items-center pointer-events-none"
                            >
                                <div className="px-4 py-1 bg-black/80 backdrop-blur-md border border-red-500/50 rounded-full text-red-500 font-mono font-bold text-sm shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                                    SYSTEM BREACH: {score}%
                                </div>
                                <div className="w-48 h-1 bg-gray-800 rounded-full mt-2 overflow-hidden">
                                    <motion.div
                                        className="h-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${score}%` }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                </div>
                            </motion.div>
                        )}

                        {/* Background Reveal (Personal Image) */}
                        <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-black">
                            <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center pointer-events-none">
                                <span className="text-secondary font-mono font-bold text-center px-4 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity">
                                    ACCESS GRANTED<br />WELCOME
                                </span>
                            </div>
                            <img
                                src={ProfileImagePersonal}
                                alt="Personal Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Foreground (Work Image) - Fades out on win */}
                        <motion.div
                            className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-2xl z-20"
                            animate={score >= 100 ? { opacity: 0, scale: 1.1, filter: "blur(10px)" } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                            <img
                                src={ProfileImage}
                                alt="Work Profile"
                                className="w-full h-full object-cover"
                            />

                            {/* Scanning Line Effect */}
                            <motion.div
                                className="absolute inset-0 w-full h-1 bg-primary/50 shadow-[0_0_15px_rgba(14,165,233,0.8)] z-20"
                                animate={{ top: ["0%", "100%", "0%"] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            />
                        </motion.div>

                        {/* Floating Targets */}
                        <div className="absolute inset-0 z-30 pointer-events-none">
                            {targets.map((target) => (
                                <motion.div
                                    key={target.id}
                                    className="absolute cursor-crosshair pointer-events-auto"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{
                                        scale: 1,
                                        opacity: 1,
                                        x: target.x,
                                        y: target.y
                                    }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleTargetClick(target.id);
                                    }}
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-red-500/30 blur-md rounded-full animate-pulse" />
                                        <Bug className="text-red-500 drop-shadow-[0_0_5px_rgba(239,68,68,0.8)]" size={24} />
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Start Hint */}
                        {score === 0 && (
                            <div className="absolute -bottom-12 left-0 right-0 text-center text-xs font-mono text-primary animate-bounce pointer-events-none z-40">
                                NEUTRALIZE THREATS TO UNLOCK
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>

            <motion.div
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <ChevronDown className="text-text-muted" size={32} />
            </motion.div>

            <ResumePreview isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} />
        </section>
    );
};

export default Hero;
