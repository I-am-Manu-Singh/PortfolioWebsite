import React, { useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown, Eye, Sparkles } from 'lucide-react';
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
    const [isHovered, setIsHovered] = useState(false);

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

                {/* Profile Image with Motion & Matrix Shatter */}
                <motion.div
                    className="order-1 md:order-2 flex justify-center perspective-1000 relative z-20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                >
                    <div
                        className="relative w-64 h-64 md:w-80 md:h-80 cursor-pointer"
                        onMouseDown={handlePressStart}
                        onMouseUp={handlePressEnd}
                        onMouseLeave={() => {
                            handlePressEnd();
                            setIsHovered(false);
                        }}
                        onMouseEnter={() => setIsHovered(true)}
                        onTouchStart={handlePressStart}
                        onTouchEnd={handlePressEnd}
                    >
                        {/* Shards Container - The Work Image */}
                        <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 w-full h-full pointer-events-none z-20">
                            {[...Array(100)].map((_, i) => {
                                const row = Math.floor(i / 10);
                                const col = i % 10;
                                return (
                                    <motion.div
                                        key={i}
                                        className="w-full h-full"
                                        style={{
                                            backgroundImage: `url(${ProfileImage})`,
                                            backgroundSize: '1000% 1000%', // 10x grid
                                            backgroundPosition: `${col * 11.1}% ${row * 11.1}%`,
                                            imageRendering: 'pixelated'
                                        }}
                                        initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                                        animate={isHovered ? {
                                            x: (Math.random() - 0.5) * 300,
                                            y: (Math.random() - 0.5) * 300,
                                            z: (Math.random() - 0.5) * 200,
                                            rotateX: Math.random() * 360,
                                            rotateY: Math.random() * 360,
                                            scale: Math.random() * 0.5 + 0.2,
                                            opacity: 0.8
                                        } : {
                                            x: 0, y: 0, z: 0,
                                            rotateX: 0, rotateY: 0,
                                            scale: 1,
                                            opacity: 1
                                        }}
                                        transition={{ duration: 0.8, ease: "anticipate" }}
                                    />
                                );
                            })}
                        </div>

                        {/* Background Reveal (Personal Image) - Visible through cracks */}
                        <div className={`absolute inset-0 w-full h-full rounded-2xl overflow-hidden transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-10 flex items-center justify-center">
                                <span className="text-secondary font-mono font-bold text-center px-4 animate-pulse">
                                    INITIALIZING<br />PROTOCOL...
                                </span>
                            </div>
                            <img
                                src={ProfileImagePersonal}
                                alt="Secret"
                                className="w-full h-full object-cover opacity-50 grayscale"
                            />
                        </div>

                        {/* Press Progress Overlay */}
                        {isPressing && (
                            <div className="absolute inset-[-10%] z-0">
                                <svg className="w-full h-full rotate-[-90deg]">
                                    <circle
                                        cx="50%" cy="50%" r="48%"
                                        stroke="var(--color-secondary)"
                                        strokeWidth="4"
                                        fill="none"
                                        strokeDasharray="300"
                                        strokeDashoffset={300 - (progress * 3)}
                                        className="transition-all duration-75 ease-linear"
                                    />
                                </svg>
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
