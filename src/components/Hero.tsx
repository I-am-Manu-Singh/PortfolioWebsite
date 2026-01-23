import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown, Eye } from 'lucide-react';
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

    // Complex Particle Shooter Game State
    const [score, setScore] = useState(0);
    const [shatteredIndices, setShatteredIndices] = useState<Set<number>>(new Set());
    const textControls = useAnimation();

    const triggerUnlock = async () => {
        await textControls.start({
            scale: [1, 1.2, 0],
            opacity: [1, 1, 0],
            transition: { duration: 0.5 }
        });
        setActiveTab('personal');
    };

    const handleShardClick = (index: number) => {
        if (shatteredIndices.has(index)) return;

        const newSet = new Set(shatteredIndices);
        newSet.add(index);
        setShatteredIndices(newSet);

        // Calculate score based on percentage cleared (Total: 144 shards)
        const newScore = Math.floor((newSet.size / 144) * 100);
        setScore(newScore);

        if (newSet.size >= 144) {
            setTimeout(triggerUnlock, 500);
        }
    };

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

                {/* Profile Image with Complex Particle Shooter Game */}
                <motion.div
                    className="order-1 md:order-2 flex justify-center perspective-1000 relative z-20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                >
                    <div className="relative w-full max-w-sm md:max-w-md mx-auto aspect-square md:aspect-auto cursor-crosshair group perspective-1000">
                        {/* Score Card / Encryption Status */}
                        {score < 100 && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute -top-16 left-0 right-0 z-50 flex flex-col items-center pointer-events-none"
                            >
                                <div className="px-5 py-2 bg-black/80 backdrop-blur-xl border border-primary/50 rounded-full flex items-center gap-3 shadow-[0_0_25px_rgba(14,165,233,0.4)]">
                                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                    <span className="text-primary font-mono font-bold text-xs tracking-wider">
                                        ENCRYPTION LVS: {100 - score}%
                                    </span>
                                </div>
                                {/* Glitchy Progress Bar */}
                                <div className="w-56 h-1 bg-gray-900/50 rounded-full mt-2 overflow-hidden relative">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-primary via-blue-400 to-primary shadow-[0_0_15px_rgba(14,165,233,0.8)] relative"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${score}%` }}
                                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                                    >
                                        <div className="absolute inset-0 bg-white/20 w-full h-full animate-pulse" />
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}

                        {/* Underlay: Personal Profile (Visible through holes) */}
                        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-black transform-gpu transition-all duration-700">
                            <img
                                src={ProfileImagePersonal}
                                alt="Personal Profile"
                                className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center pointer-events-none">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={score === 100 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                    className="text-center"
                                >
                                    <div className="text-secondary font-mono font-bold text-2xl mb-2 tracking-widest drop-shadow-[0_0_10px_rgba(74,222,128,0.8)]">
                                        ACCESS GRANTED
                                    </div>
                                    <div className="text-xs text-secondary/70 font-mono tracking-widest">
                                        IDENTITY VERIFIED
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Overlay: Work Profile Swirling Shards (12x12 Grid = 144 shards) */}
                        <div className="absolute inset-0 w-full h-full grid grid-cols-12 grid-rows-12 z-20">
                            {[...Array(144)].map((_, i) => {
                                const row = Math.floor(i / 12);
                                const col = i % 12;
                                const isShattered = shatteredIndices.has(i);

                                return (
                                    <motion.div
                                        key={i}
                                        className="w-full h-full bg-no-repeat relative transform-gpu"
                                        style={{
                                            backgroundImage: `url(${ProfileImage})`,
                                            backgroundSize: '1200% 1200%',
                                            backgroundPosition: `${col * 9.09}% ${row * 9.09}%`,
                                            backfaceVisibility: 'hidden',
                                        }}
                                        initial={{ opacity: 1, scale: 1 }}
                                        animate={isShattered ? {
                                            opacity: 0,
                                            scale: 0,
                                            z: 500, // Fly towards screen when broken
                                            rotateX: (Math.random() - 0.5) * 720,
                                            rotateY: (Math.random() - 0.5) * 720,
                                            x: (Math.random() - 0.5) * 300,
                                            y: (Math.random() - 0.5) * 300
                                        } : {
                                            opacity: 1,
                                            z: 0,
                                            // Chaotic "Swirl" Idle Animation
                                            x: [0, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15, 0],
                                            y: [0, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15, 0],
                                            rotate: [0, (Math.random() - 0.5) * 10, -(Math.random() - 0.5) * 10, 0],
                                            scale: [1, 1.05, 0.95, 1]
                                        }}
                                        transition={isShattered ? { duration: 0.6, ease: "circOut" } : {
                                            duration: 4 + Math.random() * 4,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: Math.random() * -5 // Random start time
                                        }}
                                        onMouseEnter={() => handleShardClick(i)}
                                        onClick={() => handleShardClick(i)}
                                    >
                                        {/* Highlight/Glitch effect on hover */}
                                        <div className="absolute inset-0 bg-primary/20 opacity-0 hover:opacity-100 transition-opacity duration-75 border-[0.5px] border-primary/30" />
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Start Hint */}
                        {score === 0 && (
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-50 w-full">
                                <span className="inline-block px-4 py-2 bg-black/60 backdrop-blur-sm rounded-lg border border-primary/30 text-xs font-mono text-primary animate-pulse">
                                    HOVER TO DECRYPT
                                </span>
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
