import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown, Eye, Unlock, Binary } from 'lucide-react';
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

// Lightning Bolt Component
const LightningBolt = ({ delay = 0 }: { delay?: number }) => (
    <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full pointer-events-none z-50 overflow-visible"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0, 1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: Math.random() * 2 + delay }}
    >
        <motion.path
            d={`M${40 + Math.random() * 20} 0 L${30 + Math.random() * 40} 40 L${50 + Math.random() * 20} 50 L${20 + Math.random() * 60} 100`}
            stroke="#0ea5e9"
            strokeWidth="2"
            fill="none"
            filter="url(#glow)"
        />
        <defs>
            <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
    </motion.svg>
);

const Hero: React.FC<{ setActiveTab: (tab: 'work' | 'personal') => void }> = ({ setActiveTab }) => {
    const nameLetters = resumeData.basics.name.split("");
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [visitCount, setVisitCount] = useState<number | null>(null);

    // Cyberpunk Interaction State
    const [isShattered, setIsShattered] = useState(false);
    const [unlockProgress, setUnlockProgress] = useState(0);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [isPressing, setIsPressing] = useState(false);

    // Animation Refs
    const pressTimerRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);
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

    const handleTap = () => {
        if (!isShattered && !isUnlocked) {
            setIsShattered(true);
        }
    };

    const startDecryption = () => {
        if (!isShattered || isUnlocked) return;

        setIsPressing(true);
        startTimeRef.current = Date.now();
        // Resume from current progress if needed (converting % back to time)
        const initialProgress = unlockProgress;
        const totalDuration = 10000; // 10 seconds

        const animate = () => {
            const now = Date.now();
            const elapsed = now - (startTimeRef.current || now);
            // Calculate progress based on 10s duration + previously accumulated
            const progress = Math.min(initialProgress + (elapsed / totalDuration) * 100, 100);

            setUnlockProgress(progress);

            if (progress < 100) {
                pressTimerRef.current = requestAnimationFrame(animate);
            } else {
                triggerUnlock();
            }
        };
        pressTimerRef.current = requestAnimationFrame(animate);
    };

    const stopDecryption = () => {
        if (isUnlocked) return;
        setIsPressing(false);
        if (pressTimerRef.current) cancelAnimationFrame(pressTimerRef.current);
        // Optional: Decay progress or keep it? Let's reset for difficulty.
        setUnlockProgress(0);
    };

    useEffect(() => {
        fetch('https://api.countapi.xyz/hit/manpreet-portfolio-v1/visits')
            .then(res => res.json())
            .then(data => setVisitCount(data.value))
            .catch(err => console.error("CountAPI error:", err));

        return () => {
            if (pressTimerRef.current) cancelAnimationFrame(pressTimerRef.current);
        }
    }, []);

    // Generate 400 shards (20x20)
    const shards = Array.from({ length: 400 }, (_, i) => ({
        id: i,
        row: Math.floor(i / 20),
        col: i % 20,
        // Random "Code" character
        char: Math.random() > 0.5 ? '1' : '0'
    }));

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

                {/* Cyberpunk Glitch Profile Area */}
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
                        {/* PHANTOM IMAGE: Preserves Layout */}
                        <img
                            src={ProfileImage}
                            alt="Spacer"
                            className="w-full h-auto opacity-0 pointer-events-none relative z-0 block"
                            aria-hidden="true"
                        />

                        {/* Lightning Effects (Show on Press) */}
                        <AnimatePresence>
                            {isPressing && !isUnlocked && (
                                <>
                                    <LightningBolt delay={0} />
                                    <LightningBolt delay={0.5} />
                                    <LightningBolt delay={1.2} />
                                </>
                            )}
                        </AnimatePresence>

                        {/* Status / Hint Overlay */}
                        {!isShattered ? (
                            <motion.div
                                className="absolute inset-0 z-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                                initial={{ scale: 0.9 }}
                                whileHover={{ scale: 1 }}
                            >
                                <div className="bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 text-white font-mono text-sm flex items-center gap-2">
                                    <Binary size={16} className="text-primary animate-pulse" /> TAP TO INITIALIZE
                                </div>
                            </motion.div>
                        ) : !isUnlocked && (
                            <motion.div
                                className="absolute -top-24 left-0 right-0 z-50 flex flex-col items-center pointer-events-none"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                {/* Biometric/Cyber Decryption UI */}
                                <div className="relative w-48 p-3 bg-black/80 backdrop-blur-lg border border-primary/30 rounded-lg shadow-[0_0_20px_rgba(14,165,233,0.3)]">
                                    <div className="flex justify-between items-end mb-1">
                                        <span className="text-[10px] text-primary/60 font-mono">DECRYPTION SEQUENCE</span>
                                        <span className="text-lg font-bold font-mono text-primary tabular-nums">
                                            {unlockProgress.toFixed(2)}%
                                        </span>
                                    </div>
                                    <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-primary shadow-[0_0_10px_rgba(14,165,233,0.8)]"
                                            style={{ width: `${unlockProgress}%` }}
                                        />
                                    </div>
                                    <div className="flex justify-between mt-1 opacity-50">
                                        <span className="text-[8px] text-white/40 font-mono">SEC_LEVEL_9</span>
                                        <span className="text-[8px] text-white/40 font-mono animate-pulse">{isPressing ? 'DECRYPTING...' : 'WAITING'}</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Underlay: Personal Profile (The "Secret") */}
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
                                        ACCESS GRANTED
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Overlay: Work Profile (The "Mask") */}
                        <AnimatePresence>
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
                        </AnimatePresence>

                        {/* Matrix Code Shards (20x20) */}
                        {isShattered && (
                            <div className="absolute inset-0 w-full h-full grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(20,1fr)] z-20 pointer-events-none">
                                {shards.map((shard) => {
                                    return (
                                        <motion.div
                                            key={shard.id}
                                            className="w-full h-full bg-no-repeat relative transform-gpu overflow-hidden"
                                            style={{
                                                backgroundImage: `url(${ProfileImage})`,
                                                backgroundSize: '2000% 2000%', // 20x20
                                                backgroundPosition: (`${shard.col * 5.26}% ${shard.row * 5.26}%` as any),
                                            }}
                                            initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                                            animate={isUnlocked ? {
                                                // Explode/Vanish on Unlock
                                                opacity: 0,
                                                scale: 0,
                                                x: (Math.random() - 0.5) * 800,
                                                y: (Math.random() - 0.5) * 800,
                                                rotate: Math.random() * 720
                                            } : {
                                                // Swirl & Glitch
                                                x: isPressing ? [0, (Math.random() - 0.5) * 5, 0] : [0, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40, 0],
                                                y: isPressing ? [0, (Math.random() - 0.5) * 5, 0] : [0, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40, 0],
                                                filter: isPressing
                                                    ? [`hue-rotate(0deg) contrast(1)`, `hue-rotate(${Math.random() * 90}deg) contrast(1.5)`, `hue-rotate(0deg) contrast(1)`]
                                                    : "none",
                                                zIndex: isPressing ? 50 : 20
                                            }}
                                            transition={isUnlocked ? { duration: 0.8, ease: "circOut" } : {
                                                duration: isPressing ? 0.2 : 3 + Math.random() * 2,
                                                repeat: Infinity,
                                                ease: isPressing ? "linear" : "easeInOut",
                                            }}
                                        >
                                            {/* The "CODE" aspect - Binary overlay on shards */}
                                            <div className={`absolute inset-0 flex items-center justify-center text-[6px] font-mono font-bold text-primary/50 mix-blend-overlay ${isPressing ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
                                                {shard.char}
                                            </div>
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
