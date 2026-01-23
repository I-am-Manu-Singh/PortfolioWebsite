import React, { useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown, Eye, Sparkles } from 'lucide-react';
import { resumeData } from '../data/resume';
const ProfileImage = `${import.meta.env.BASE_URL}profile.jpg`;
const ProfileImagePersonal = `${import.meta.env.BASE_URL}profile_personal.jpg`;
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

    // Long Press Logic
    const [isPressing, setIsPressing] = useState(false);
    const [progress, setProgress] = useState(0);
    const pressTimer = useRef<any>(null);
    const textControls = useAnimation();
    const PRESS_DURATION = 1500; // 1.5 seconds to unlock

    const handlePressStart = () => {
        setIsPressing(true);
        const startTime = Date.now();

        pressTimer.current = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const newProgress = Math.min((elapsed / PRESS_DURATION) * 100, 100);
            setProgress(newProgress);

            if (newProgress >= 100) {
                // Success!
                clearInterval(pressTimer.current);
                triggerUnlock();
            }
        }, 16);
    };

    const handlePressEnd = () => {
        if (progress < 100) {
            setIsPressing(false);
            setProgress(0);
            if (pressTimer.current) clearInterval(pressTimer.current);
        }
    };

    const triggerUnlock = async () => {
        await textControls.start({
            scale: [1, 1.2, 0],
            opacity: [1, 1, 0],
            transition: { duration: 0.5 }
        });
        setActiveTab('personal');
    };

    React.useEffect(() => {
        // Simple visit counter using countapi.xyz
        // Using a unique key for this portfolio
        fetch('https://api.countapi.xyz/hit/manpreet-portfolio-v1/visits')
            .then(res => res.json())
            .then(data => setVisitCount(data.value))
            .catch(err => console.error("CountAPI error:", err));

        return () => {
            if (pressTimer.current) clearInterval(pressTimer.current);
        }
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

                {/* Profile Image with Motion & Long Press Interaction */}
                <motion.div
                    className="order-1 md:order-2 flex justify-center perspective-1000 relative group"
                    initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <div
                        className="relative w-64 h-64 md:w-96 md:h-96 cursor-pointer"
                        onMouseDown={handlePressStart}
                        onMouseUp={handlePressEnd}
                        onMouseLeave={handlePressEnd}
                        onTouchStart={handlePressStart}
                        onTouchEnd={handlePressEnd}
                    >
                        {/* Tooltip Hint */}
                        <motion.div
                            className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-xs font-mono text-white flex items-center gap-2 whitespace-nowrap z-50 pointer-events-none"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 2, duration: 0.5 }}
                        >
                            <Sparkles size={12} className="text-secondary" />
                            Long press to reveal...
                        </motion.div>

                        {/* Progress Ring / Aura */}
                        {isPressing && (
                            <div className="absolute inset-[-20px] rounded-full border-4 border-secondary/50 border-t-secondary animate-spin z-0 pointer-events-none"
                                style={{ animationDuration: '1s' }} />
                        )}

                        {/* Glitch/Shake Effect wrapper */}
                        <motion.div
                            animate={isPressing ? {
                                x: [0, -2, 2, -2, 2, 0],
                                filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(0deg)"]
                            } : {}}
                            transition={{ duration: 0.2, repeat: Infinity }}
                            className="w-full h-full relative"
                        >
                            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse"></div>
                            <motion.div
                                className="relative w-full h-full"
                                animate={{ y: [0, -20, 0], rotate: [0, 2, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <motion.div
                                    className={`relative w-full h-full rounded-2xl overflow-hidden border-2 shadow-2xl glass-card transition-colors duration-300 ${isPressing ? 'border-secondary' : 'border-white/10'}`}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay z-10"></div>

                                    {/* Work Avatar */}
                                    <motion.img
                                        src={ProfileImage}
                                        alt={resumeData.basics.name}
                                        className="w-full h-full object-contain object-bottom absolute inset-0 transition-opacity duration-300"
                                        style={{ opacity: isPressing ? 0 : 1 }}
                                    />

                                    {/* Personal Avatar (Hidden until press) */}
                                    <motion.img
                                        src={ProfileImagePersonal}
                                        alt="Personal Side"
                                        className="w-full h-full object-cover object-top absolute inset-0 transition-opacity duration-300"
                                        style={{ opacity: isPressing ? 1 : 0 }}
                                    />

                                    {/* Fill-up Animation Overlay - Bottom Up */}
                                    {isPressing && (
                                        <div className="absolute bottom-0 left-0 w-full bg-secondary/60 backdrop-blur-[2px] z-20 transition-all duration-75 ease-linear flex items-center justify-center overflow-hidden border-t border-white/20"
                                            style={{ height: `${progress}%` }}>
                                            {/* Animated Text inside the fill */}
                                            <span className="text-white font-bold text-4xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                                                {Math.round(progress)}%
                                            </span>
                                        </div>
                                    )}
                                </motion.div>
                            </motion.div>
                        </motion.div>
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
