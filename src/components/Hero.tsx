import React, { useState, useRef, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown, Eye, Unlock, Code } from 'lucide-react';
import { resumeData } from '../data/resume';
const ProfileImage = `${import.meta.env.BASE_URL}profile.jpg`;
const ProfileImagePersonal = `${import.meta.env.BASE_URL}profile_personal.png`;
import SectionBackground from './SectionBackground';
import ResumePreview from './ResumePreview';

// ... (Variants remain same)
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

const Hero: React.FC<{ setActiveTab: (tab: 'work' | 'personal') => void }> = ({ setActiveTab }) => {
    const nameLetters = resumeData.basics.name.split("");
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [visitCount, setVisitCount] = useState<number | null>(null);

    // Matrix Interaction State
    const [isShattered, setIsShattered] = useState(false);
    const [unlockProgress, setUnlockProgress] = useState(0);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [isPressing, setIsPressing] = useState(false);

    // Portal Target (Body)
    const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
    // Container Ref for "Assembly" Target Coordinates
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerRect, setContainerRect] = useState<DOMRect | null>(null);

    // Animation Refs
    const pressTimerRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);
    const textControls = useAnimation();

    useEffect(() => {
        setPortalTarget(document.body);
        // Initial measurement
        const measure = () => {
            if (containerRef.current) setContainerRect(containerRef.current.getBoundingClientRect());
        };
        measure();
        window.addEventListener('resize', measure);
        window.addEventListener('scroll', measure);
        return () => {
            window.removeEventListener('resize', measure);
            window.removeEventListener('scroll', measure);
        };
    }, []);

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
            // Measure again to be sure
            if (containerRef.current) setContainerRect(containerRef.current.getBoundingClientRect());
        }
    };

    const startDecryption = () => {
        if (!isShattered || isUnlocked) return;

        setIsPressing(true);
        startTimeRef.current = Date.now();
        const initialProgress = unlockProgress;
        const totalDuration = 10000; // 10s

        const animate = () => {
            const now = Date.now();
            const elapsed = now - (startTimeRef.current || now);
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

    // 1024 Shards (32x32)
    const shards = useMemo(() => Array.from({ length: 1024 }, (_, i) => ({
        id: i,
        row: Math.floor(i / 32),
        col: i % 32,
        char: String.fromCharCode(0x30A0 + Math.random() * 96),
        // Random "Chaos" Initial Position (Fixed Screen Coords)
        chaosX: Math.random() * window.innerWidth,
        chaosY: Math.random() * window.innerHeight,
        chaosZ: (Math.random() - 0.5) * 500
    })), []);

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

                {/* IMAGE CONTAINER */}
                <motion.div
                    className="order-1 md:order-2 flex justify-center perspective-1000 relative z-20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                >
                    <div
                        ref={containerRef}
                        className="relative w-full max-w-sm md:max-w-md mx-auto aspect-auto cursor-pointer group perspective-1000 select-none"
                        onClick={handleTap}
                        onMouseDown={startDecryption}
                        onMouseUp={stopDecryption}
                        onMouseLeave={stopDecryption}
                        onTouchStart={startDecryption}
                        onTouchEnd={stopDecryption}
                    >
                        {/* PHANTOM IMAGE */}
                        <img src={ProfileImage} alt="Spacer" className="w-full h-auto opacity-0 pointer-events-none relative z-0 block" aria-hidden="true" />

                        {/* Status / Hint Overlay */}
                        {!isShattered && (
                            <motion.div
                                className="absolute inset-0 z-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                                initial={{ scale: 0.9 }}
                                whileHover={{ scale: 1 }}
                            >
                                <div className="bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full border border-green-500/50 text-green-500 font-mono text-sm flex items-center gap-2 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                                    <Code size={16} className="animate-pulse" /> TAP TO ENTER MATRIX
                                </div>
                            </motion.div>
                        )}

                        {/* Decryption Progress (Global Overlay or Local?) Let's keep local but visible */}
                        {isShattered && !isUnlocked && (
                            <motion.div
                                className="absolute -top-24 left-0 right-0 z-50 flex flex-col items-center pointer-events-none"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <div className="relative w-56 p-4 bg-black/90 backdrop-blur-lg border border-green-500/40 rounded-lg shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-[10px] text-green-500/80 font-mono tracking-widest">REASSEMBLING...</span>
                                        <span className="text-xl font-bold font-mono text-green-500 tabular-nums">{unlockProgress.toFixed(2)}%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-gray-900 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]"
                                            style={{ width: `${unlockProgress}%` }}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Underlay: Personal Profile */}
                        <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-black transform-gpu">
                            <img src={ProfileImagePersonal} alt="Personal Profile" className="w-full h-full object-cover opacity-80" />
                            <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center pointer-events-none">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={isUnlocked ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                    className="text-center"
                                >
                                    <div className="p-4 rounded-full bg-green-500/20 border border-green-500/50 mb-4 inline-flex">
                                        <Unlock size={32} className="text-green-500" />
                                    </div>
                                    <div className="text-white font-mono font-bold text-xl tracking-widest drop-shadow-lg">ACCESS GRANTED</div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Overlay: Work Profile (Static) */}
                        <AnimatePresence>
                            {!isShattered && (
                                <motion.div
                                    className="absolute inset-0 z-20 rounded-2xl overflow-hidden shadow-2xl"
                                    exit={{ opacity: 0 }}
                                >
                                    <img src={ProfileImage} alt="Work Profile" className="w-full h-full object-cover grayscale contrast-125" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 via-transparent to-transparent opacity-60 mix-blend-overlay" />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* MATRIX SHARDS PORTAL */}
                        {isShattered && portalTarget && createPortal(
                            <div className="fixed inset-0 w-screen h-screen z-[9999] pointer-events-none perspective-[2000px] overflow-hidden">
                                {shards.map((shard) => {
                                    // Calculate "Target" position (grid assembly) if we want to reform image
                                    // We need to map shard row/col to screen coordinates based on containerRect
                                    if (!containerRect) return null;

                                    const shardWidth = containerRect.width / 32;
                                    const shardHeight = containerRect.height / 32;
                                    const targetX = containerRect.left + (shard.col * shardWidth);
                                    const targetY = containerRect.top + (shard.row * shardHeight);

                                    return (
                                        <motion.div
                                            key={shard.id}
                                            className="absolute bg-no-repeat backface-hidden"
                                            style={{
                                                width: shardWidth,
                                                height: shardHeight,
                                                transformStyle: 'preserve-3d',
                                                // Default: Chaos
                                            }}
                                            initial={{
                                                x: shard.chaosX,
                                                y: shard.chaosY,
                                                z: shard.chaosZ,
                                                rotateX: Math.random() * 360,
                                                rotateY: Math.random() * 360,
                                                opacity: 0
                                            }}
                                            animate={isUnlocked ? {
                                                opacity: 0, // Vanish on unlock
                                            } : {
                                                opacity: 1,
                                                // If Pressing: Converge to Target
                                                x: isPressing ? targetX : [shard.chaosX, shard.chaosX + (Math.random() - 0.5) * 100, shard.chaosX],
                                                y: isPressing ? targetY : [shard.chaosY, shard.chaosY + (Math.random() - 0.5) * 100, shard.chaosY],
                                                z: isPressing ? 0 : [shard.chaosZ, shard.chaosZ + (Math.random() - 0.5) * 100, shard.chaosZ],
                                                // If Pressing: Flip to show Image
                                                rotateX: isPressing ? 0 : [0, 360],
                                                rotateY: isPressing ? 180 : [0, 360],
                                                scale: isPressing ? 1.05 : 1
                                            }}
                                            transition={{
                                                duration: isPressing ? 0.8 : 10 + Math.random() * 10,
                                                ease: isPressing ? "circOut" : "linear",
                                                repeat: isPressing ? 0 : Infinity,
                                                repeatType: "mirror"
                                            }}
                                        >
                                            {/* FRONT FACE: Matrix Code */}
                                            <div className="absolute inset-0 bg-transparent text-green-500 font-mono font-bold flex items-center justify-center text-[10px] backface-hidden shadow-[0_0_5px_rgba(0,255,0,0.5)]">
                                                {shard.char}
                                            </div>

                                            {/* BACK FACE: Image Slice (for Reassembly) */}
                                            <div
                                                className="absolute inset-0 bg-no-repeat backface-hidden"
                                                style={{
                                                    backgroundImage: `url(${ProfileImage})`,
                                                    backgroundSize: `${containerRect.width}px ${containerRect.height}px`,
                                                    backgroundPosition: `-${shard.col * shardWidth}px -${shard.row * shardHeight}px`,
                                                    transform: 'rotateY(180deg)' // Back face rotated
                                                }}
                                            />
                                        </motion.div>
                                    );
                                })}
                            </div>,
                            portalTarget
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
