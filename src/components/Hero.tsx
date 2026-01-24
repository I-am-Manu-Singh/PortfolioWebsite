import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown, Eye, Unlock } from 'lucide-react';
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

import { useCyberpunkSound } from '../hooks/useCyberpunkSound';
import { useKonamiCode } from '../hooks/useKonamiCode';

// Simple heuristic for low power mode
const isLowPower = typeof navigator !== 'undefined' && (navigator.hardwareConcurrency || 4) < 4;


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

    const [isReverting, setIsReverting] = useState(false);

    // Container Ref for "Assembly" Target Coordinates
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerRect, setContainerRect] = useState<DOMRect | null>(null);

    // Animation Refs
    const pressTimerRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);
    const textControls = useAnimation();

    // Audio Hook
    const { playCharge, stopCharge, playUnlock, playScatter } = useCyberpunkSound();

    // Konami Code: Instant Unlock
    useKonamiCode(() => {
        if (!isUnlocked) {
            playUnlock();
            triggerUnlock();
        }
    });

    useEffect(() => {
        // Start entry animation
        textControls.start("visible");

        // Force measurement for mobile stability
        const measure = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setContainerRect(rect);
            }
        };

        // Measure immediately and after short delay for layout
        measure();
        const t = setTimeout(measure, 100);

        window.addEventListener('resize', measure);
        return () => {
            window.removeEventListener('resize', measure);
            clearTimeout(t);
        };
    }, []); // Only on mount

    const triggerUnlock = async () => {
        setIsUnlocked(true);
        playUnlock(); // Success Sound
        await textControls.start({
            scale: [1, 1.2, 0],
            opacity: [1, 1, 0],
            transition: { duration: 0.5 }
        });
        setActiveTab('personal');
    };

    const handleTap = () => {
        if (!isShattered && !isUnlocked && !isReverting) {
            setIsShattered(true);
            playScatter(); // Scatter Sound
            // Rect is already measured on mount, but re-measure for good measure
            if (containerRef.current) setContainerRect(containerRef.current.getBoundingClientRect());
        }
    };

    // State for decay animation
    const decayTimerRef = useRef<number | null>(null);

    const startDecryption = () => {
        // Handle initial tap logic for mobile (unify)
        if (!isShattered) {
            handleTap();
        }

        if (isUnlocked || isReverting) return;

        // Prevent default only for touch to stop menus, but be careful with scrolling logic
        // if (e && 'touches' in e) e.preventDefault(); 

        // Stop any active decay
        if (decayTimerRef.current) cancelAnimationFrame(decayTimerRef.current);

        setIsPressing(true);
        const now = Date.now();
        const duration = 10000; // 10s strict
        const elapsedSoFar = (unlockProgress / 100) * duration;
        startTimeRef.current = now - elapsedSoFar;

        const animate = () => {
            const currentTime = Date.now();
            const elapsed = currentTime - (startTimeRef.current || currentTime);
            const progress = Math.min((elapsed / duration) * 100, 100);

            setUnlockProgress(progress);
            playCharge(progress);

            if (progress < 100) {
                pressTimerRef.current = requestAnimationFrame(animate);
            } else {
                triggerUnlock();
            }
        };
        pressTimerRef.current = requestAnimationFrame(animate);
    };

    const stopDecryption = () => {
        if (isUnlocked || isReverting) return;

        setIsPressing(false);
        stopCharge();
        if (pressTimerRef.current) cancelAnimationFrame(pressTimerRef.current);

        const startDecay = () => {
            const initialProgress = unlockProgress;
            const decayStart = Date.now();
            const decayDuration = 1000; // 1s to lose all progress

            const animateDecay = () => {
                const now = Date.now();
                const decayElapsed = now - decayStart;
                const newProgress = Math.max(initialProgress * (1 - decayElapsed / decayDuration), 0);

                setUnlockProgress(newProgress);

                if (newProgress > 0) {
                    decayTimerRef.current = requestAnimationFrame(animateDecay);
                } else {
                    // Revert Condition: Progress reached 0
                    if (isShattered) {
                        setIsReverting(true);
                        // Wait for Revert Animation (1s) to finish then hide shards
                        setTimeout(() => {
                            setIsShattered(false);
                            setIsReverting(false);
                        }, 1000);
                    }
                }
            };
            decayTimerRef.current = requestAnimationFrame(animateDecay);
        };

        startDecay();
    };

    useEffect(() => {
        fetch('https://api.countapi.xyz/hit/manpreet-portfolio-v1/visits')
            .then(res => res.json())
            .then(data => setVisitCount(data.value))
            .catch(err => console.error("CountAPI error:", err));

        return () => {
            if (pressTimerRef.current) cancelAnimationFrame(pressTimerRef.current);
            if (decayTimerRef.current) cancelAnimationFrame(decayTimerRef.current);
        }
    }, []);

    // 1024 Shards (32x32) or 144 (12x12) for Low Power
    const gridSize = isLowPower ? 12 : 32;
    const totalShards = gridSize * gridSize;

    const shards = useMemo(() => Array.from({ length: totalShards }, (_, i) => ({
        id: i,
        row: Math.floor(i / gridSize),
        col: i % gridSize,
        char: String.fromCharCode(0x30A0 + Math.random() * 96),
        // Random "Chaos" Initial Position (Relative to Hero Section now)
        // Spread wider than container to cover "Name to Socials"
        chaosX: (Math.random() - 0.5) * 1500, // Spread across screen width
        chaosY: (Math.random() - 0.5) * 1000, // Spread vertically
        chaosZ: (Math.random() - 0.5) * 800
    })), [gridSize, totalShards]);

    return (
        <section
            className="min-h-screen flex flex-col justify-center relative overflow-hidden px-4 md:px-0 perspective-1000"
            id="hero"
            style={{ touchAction: isShattered ? 'none' : 'auto' }} // Prevent scroll while interacting
        >
            <SectionBackground variant="hero" />

            <div className="container max-w-6xl mx-auto z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative">
                <motion.div
                    className="order-2 md:order-1"
                    initial="hidden"
                    animate={textControls}
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
                        className="text-4xl md:text-6xl font-bold mb-6 tracking-tight flex flex-wrap"
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
                        className="text-2xl md:text-4xl font-bold mb-8"
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

                    <div className="flex flex-wrap gap-4 z-20 relative">
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
                    <div className="mt-12 flex gap-6 z-20 relative">
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
                        className="relative w-full max-w-sm md:max-w-md mx-auto aspect-auto cursor-pointer group perspective-1000 select-none touch-none"
                        style={{ WebkitTouchCallout: 'none' }}
                        onContextMenu={(e) => e.preventDefault()}
                        onMouseDown={startDecryption}
                        onMouseUp={stopDecryption}
                        onMouseLeave={stopDecryption}
                        onTouchStart={startDecryption}
                        onTouchEnd={stopDecryption}
                    >
                        {/* PHANTOM IMAGE: Maintans spacing */}
                        <img src={ProfileImage} alt="Spacer" className="w-full h-auto opacity-0 pointer-events-none relative z-0 block" aria-hidden="true" />



                        {/* Decryption Progress */}
                        {isShattered && !isUnlocked && (
                            <motion.div
                                className="absolute -top-24 left-0 right-0 z-50 flex flex-col items-center pointer-events-none"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <div className="relative w-56 p-4 bg-black/90 backdrop-blur-lg border border-green-500/40 rounded-lg shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-[10px] text-green-500/80 font-mono tracking-widest">REASSEMBLING...</span>
                                        <span className="text-xl font-bold font-mono text-green-500 tabular-nums">{unlockProgress.toFixed(0)}%</span>
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

                        {/* Underlay: Personal Profile - HIDDEN until unlocked */}
                        <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-black transform-gpu">
                            <motion.img
                                src={ProfileImagePersonal}
                                alt="Personal Profile"
                                className="w-full h-full object-cover"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isUnlocked ? 0.8 : 0 }} // Reveal only when unlocked
                            />
                            {isUnlocked && <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center pointer-events-none">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center"
                                >
                                    <div className="p-4 rounded-full bg-green-500/20 border border-green-500/50 mb-4 inline-flex">
                                        <Unlock size={32} className="text-green-500" />
                                    </div>
                                    <div className="text-white font-mono font-bold text-xl tracking-widest drop-shadow-lg">ACCESS GRANTED</div>
                                </motion.div>
                            </div>}
                        </div>

                        {/* Overlay: Work Profile (Static) */}
                        <AnimatePresence>
                            {!isShattered && (
                                <motion.div
                                    className="absolute inset-0 z-20 rounded-2xl overflow-hidden shadow-2xl"
                                    exit={{ opacity: 0 }}
                                >
                                    <img src={ProfileImage} alt="Work Profile" className="w-full h-full object-cover shadow-2xl" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/10 via-transparent to-transparent opacity-40 mix-blend-overlay" />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* MATRIX SHARDS - DIRECTLY IN DOM (No Portal) */}
                        {isShattered && (
                            <div className="absolute top-0 left-0 w-full h-full z-[100] pointer-events-none perspective-[2000px]">
                                {shards.map((shard) => {
                                    if (!containerRect) return null;

                                    // Local Grid Position (relative to this container)
                                    // 32x32 Grid
                                    const shardWidth = containerRect.width / gridSize;
                                    const shardHeight = containerRect.height / gridSize;
                                    const targetX = shard.col * shardWidth;
                                    const targetY = shard.row * shardHeight;

                                    return (
                                        <motion.div
                                            key={shard.id}
                                            className="absolute bg-no-repeat backface-hidden"
                                            style={{
                                                width: shardWidth,
                                                height: shardHeight,
                                                transformStyle: 'preserve-3d',
                                                top: 0,
                                                left: 0
                                            }}
                                            initial={{
                                                // Explosion Start: Start at "Assembled" position (0,0 relative)
                                                x: targetX,
                                                y: targetY,
                                                z: 0,
                                                rotateX: 0,
                                                rotateY: 0,
                                                opacity: 1,
                                                scale: 1
                                            }}
                                            animate={isReverting ? {
                                                // Revert to Assembled (Work)
                                                x: targetX,
                                                y: targetY,
                                                z: 0,
                                                rotateX: 0,
                                                rotateY: 0,
                                                opacity: 1,
                                                scale: 1
                                            } : isUnlocked ? {
                                                // UNLOCK EXPLOSION: Fly off screen
                                                x: shard.chaosX * 5,
                                                y: shard.chaosY * 5,
                                                z: 1000,
                                                rotateX: Math.random() * 720,
                                                rotateY: Math.random() * 720,
                                                opacity: 0,
                                                scale: 0.5
                                            } : {
                                                // Standard Interaction
                                                opacity: 1,
                                                // If Pressing: Target (Assembled Personal). Else: Chaos (Explosion)
                                                x: isPressing ? targetX : shard.chaosX,
                                                y: isPressing ? targetY : shard.chaosY,
                                                z: isPressing ? 0 : shard.chaosZ,
                                                // Flip to Image (180deg) IF pressing
                                                rotateX: isPressing ? 0 : [0, 360],
                                                rotateY: isPressing ? 180 : [0, 360],
                                                scale: isPressing ? 1 : 1.5
                                            }}
                                            transition={{
                                                // Unlock: Fast & Aggressive (0.8s). Explosion/Revert: Fast (1s). Assembly: Slow (10s)
                                                duration: isUnlocked ? 0.8 : (isReverting ? 1 : (isPressing ? 10 : 0.8)),
                                                ease: isUnlocked ? "circIn" : (isPressing ? "linear" : "circOut"),
                                            }}
                                        >
                                            {/* FRONT FACE: Matrix Code */}
                                            <div className="absolute inset-0 bg-transparent text-green-500 font-mono font-bold flex items-center justify-center text-[10px] backface-hidden shadow-[0_0_2px_rgba(0,255,0,0.8)]">
                                                {shard.char}
                                            </div>

                                            {/* BACK FACE: Personal Image Slice with Green Tint */}
                                            <div
                                                className="absolute inset-0 bg-no-repeat backface-hidden"
                                                style={{
                                                    backgroundImage: `url(${ProfileImagePersonal})`,
                                                    backgroundSize: `${containerRect.width}px ${containerRect.height}px`,
                                                    backgroundPosition: `-${targetX}px -${targetY}px`,
                                                    transform: 'rotateY(180deg)',
                                                    opacity: 0.8, // Slightly more visible for the green effect
                                                    // Green Tint: High contrast sepia + hue rotate
                                                    filter: isPressing ? 'sepia(1) hue-rotate(70deg) saturate(3)' : 'none',
                                                    boxShadow: 'inset 0 0 5px rgba(0,255,0,0.4)',
                                                    transition: 'filter 0.5s ease'
                                                }}
                                            />
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
