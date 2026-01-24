import React, { useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown, Eye, Fingerprint, Unlock } from 'lucide-react';
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

    // Tap-to-Shatter & Long Press Unlock State
    const [isShattered, setIsShattered] = useState(false);
    const [unlockProgress, setUnlockProgress] = useState(0);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const pressTimerRef = useRef<number | null>(null);
    const textControls = useAnimation();

    const triggerUnlock = async () => {
        setIsUnlocked(true);
        await textControls.start({
            scale: [1, 1.2, 0],
            opacity: [1, 1, 0],
            transition: { duration: 0.5 }
        });
        setActiveTab('personal');
    };

    // Handle Tap to Shatter
    const handleTap = () => {
        if (!isShattered && !isUnlocked) {
            setIsShattered(true);
        }
    };

    // Handle Long Press for Decryption
    const startDecryption = () => {
        if (!isShattered || isUnlocked) return;

        // Clear any existing timer
        if (pressTimerRef.current) clearInterval(pressTimerRef.current);

        pressTimerRef.current = window.setInterval(() => {
            setUnlockProgress(prev => {
                if (prev >= 100) {
                    if (pressTimerRef.current) clearInterval(pressTimerRef.current);
                    triggerUnlock();
                    return 100;
                }
                return prev + 2; // Speed of unlock
            });
        }, 30); // Validated interval
    };

    const stopDecryption = () => {
        if (isUnlocked) return;
        if (pressTimerRef.current) clearInterval(pressTimerRef.current);
        setUnlockProgress(0); // Reset on release
    };

    React.useEffect(() => {
        fetch('https://api.countapi.xyz/hit/manpreet-portfolio-v1/visits')
            .then(res => res.json())
            .then(data => setVisitCount(data.value))
            .catch(err => console.error("CountAPI error:", err));

        return () => {
            if (pressTimerRef.current) clearInterval(pressTimerRef.current);
        }
    }, []);

    return (
        <section className="min-h-screen flex flex-col justify-center relative overflow-hidden px-4 md:px-0" id="hero">
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

                {/* Interactive Profile Area */}
                <motion.div
                    className="order-1 md:order-2 flex justify-center perspective-1000 relative z-20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                >
                    <div
                        className="relative w-full max-w-sm md:max-w-md mx-auto aspect-auto cursor-pointer group perspective-1000 select-none"
                        onClick={handleTap}
                        onMouseDown={startDecryption}
                        onMouseUp={stopDecryption}
                        onMouseLeave={stopDecryption}
                        onTouchStart={startDecryption}
                        onTouchEnd={stopDecryption}
                    >
                        {/* PHANTOM IMAGE: Forces container height to match image aspect ratio naturally */}
                        <img
                            src={ProfileImage}
                            alt="Spacer"
                            className="w-full h-auto opacity-0 pointer-events-none relative z-0 block"
                            aria-hidden="true"
                        />

                        {/* Status / Hint Overlay */}
                        {!isShattered ? (
                            <motion.div
                                className="absolute inset-0 z-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                                initial={{ scale: 0.9 }}
                                whileHover={{ scale: 1 }}
                            >
                                <div className="bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 text-white font-mono text-sm flex items-center gap-2">
                                    <Fingerprint size={16} className="text-primary animate-pulse" /> TAP TO INITIALIZE
                                </div>
                            </motion.div>
                        ) : !isUnlocked && (
                            <motion.div
                                className="absolute -top-16 left-0 right-0 z-50 flex flex-col items-center pointer-events-none"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                {/* Unlock Progress Ring/Bar */}
                                <div className="relative w-16 h-16 flex items-center justify-center mb-2">
                                    <svg className="absolute inset-0 w-full h-full rotate-[-90deg]">
                                        <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-gray-800" />
                                        <motion.circle
                                            cx="32" cy="32" r="28"
                                            stroke="currentColor" strokeWidth="4" fill="transparent"
                                            className="text-primary drop-shadow-[0_0_10px_rgba(14,165,233,0.8)]"
                                            strokeDasharray="176"
                                            strokeDashoffset={176 - (176 * unlockProgress) / 100}
                                        />
                                    </svg>
                                    <div className="text-xs font-bold font-mono text-primary">{Math.round(unlockProgress)}%</div>
                                </div>
                                <div className="text-xs font-mono text-primary/80 tracking-widest animate-pulse">
                                    HOLD TO DECRYPT
                                </div>
                            </motion.div>
                        )}

                        {/* Underlay: Personal Profile (The "Secret") - Now Absolute to match container */}
                        <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-black transform-gpu">
                            <img
                                src={ProfileImagePersonal}
                                alt="Personal Profile"
                                className="w-full h-full object-cover opacity-80"
                            />
                            <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center pointer-events-none">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={isUnlocked ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                    className="text-center"
                                >
                                    <div className="p-4 rounded-full bg-green-500/20 border border-green-500/50 mb-4 inline-flex">
                                        <Unlock size={32} className="text-green-500" />
                                    </div>
                                    <div className="text-white font-mono font-bold text-xl tracking-widest drop-shadow-lg">
                                        IDENTITY VERIFIED
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Overlay: Work Profile (The "Mask") */}
                        {/* If NOT shattered, show full static image */}
                        {!isShattered && (
                            <motion.div
                                className="absolute inset-0 z-20 rounded-2xl overflow-hidden shadow-2xl"
                                exit={{ opacity: 0 }}
                            >
                                <img src={ProfileImage} alt="Work Profile" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                            </motion.div>
                        )}

                        {/* If SHATTERED, show 12x12 grid of particles */}
                        {isShattered && (
                            <div className="absolute inset-0 w-full h-full grid grid-cols-12 grid-rows-12 z-20 pointer-events-none">
                                {[...Array(144)].map((_, i) => {
                                    const row = Math.floor(i / 12);
                                    const col = i % 12;

                                    return (
                                        <motion.div
                                            key={i}
                                            className="w-full h-full bg-no-repeat relative transform-gpu"
                                            style={{
                                                backgroundImage: `url(${ProfileImage})`,
                                                backgroundSize: '1200% 1200%',
                                                backgroundPosition: `${col * 9.09}% ${row * 9.09}%`,
                                            }}
                                            initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                                            animate={isUnlocked ? {
                                                // Explode/Vanish on Unlock
                                                opacity: 0,
                                                scale: 2,
                                                x: (Math.random() - 0.5) * 500,
                                                y: (Math.random() - 0.5) * 500,
                                                rotate: Math.random() * 360
                                            } : {
                                                // Idle Swirl after shatter
                                                opacity: 1,
                                                scale: [1, 0.8, 1], // Breathing effect
                                                x: [0, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30, 0],
                                                y: [0, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30, 0],
                                                rotate: [0, (Math.random() - 0.5) * 20, 0],
                                                filter: unlockProgress > 0 ? [`hue-rotate(0deg)`, `hue-rotate(${unlockProgress * 2}deg)`] : "none"
                                            }}
                                            transition={isUnlocked ? { duration: 0.8, ease: "circOut" } : {
                                                duration: 3 + Math.random() * 2,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            }}
                                        >
                                            <div className={`absolute inset-0 border-[0.5px] border-primary/20 transition-opacity ${unlockProgress > 50 ? 'opacity-100' : 'opacity-0'}`} />
                                        </motion.div>
                                    );
                                })}
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
