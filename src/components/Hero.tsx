import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, useAnimation } from 'framer-motion';
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
    isUnlocked: boolean;
    setIsUnlocked: (unlocked: boolean) => void;
}

const Hero: React.FC<HeroProps> = ({ setActiveTab, isUnlocked, setIsUnlocked }) => {
    const nameLetters = resumeData.basics.name.split("");
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [visitCount, setVisitCount] = useState<number | null>(null);

    // Matrix Interaction State
    const [isShattered, setIsShattered] = useState(false);
    const [unlockProgress, setUnlockProgress] = useState(0);
    const [isPressing, setIsPressing] = useState(false);
    const isPressingRef = useRef(false);
    const [isReverting, setIsReverting] = useState(false);

    // Interaction Stages: 'idle' | 'breaking-grid' | 'breaking-disperse' | 'shattered' | 'reverting-grid' | 'reverting-flip' | 'unlock-grid' | 'unlock-flip' | 'unlock-disperse'
    const [interactionStage, setInteractionStage] = useState<'idle' | 'breaking-grid' | 'breaking-disperse' | 'shattered' | 'reverting-grid' | 'reverting-flip' | 'unlock-grid' | 'unlock-flip' | 'unlock-disperse'>('idle');



    // Container Ref for "Assembly" Target Coordinates
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerRect, setContainerRect] = useState<DOMRect | null>(null);

    // Animation Refs
    const pressTimerRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);
    const scrambleIntervalRef = useRef<number | null>(null);
    const [scrambleTick, setScrambleTick] = useState(0);
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

        // Pre-load personal profile image early
        const img = new Image();
        img.src = ProfileImagePersonal;

        const measure = () => {
            if (containerRef.current) setContainerRect(containerRef.current.getBoundingClientRect());
        };
        measure();
        const t = setTimeout(measure, 100);
        window.addEventListener('resize', measure);
        return () => {
            window.removeEventListener('resize', measure);
            clearTimeout(t);
        };
    }, []); // Only on mount

    // State Lifting: Reset detection
    useEffect(() => {
        if (!isUnlocked) {
            // Navbar reset triggered or site load
            setInteractionStage('idle');
            setIsShattered(false);
            setUnlockProgress(0);
            setIsReverting(false);
            textControls.start("visible"); // Robust restore!
        }
    }, [isUnlocked, textControls]); // Watch for isUnlocked reset from parent

    const triggerUnlock = async () => {
        if (!isPressingRef.current) return; // STRICT CHECK: If they released, don't unlock!

        // Stop scramble
        if (scrambleIntervalRef.current) clearInterval(scrambleIntervalRef.current);

        // Stage 1: Fly to Grid (Smoothly revert progress to 0%)
        setInteractionStage('unlock-grid');

        // Manual Progress Decay for visual re-assembly
        const duration = 1000;
        const start = Date.now();
        const startProgress = unlockProgress;

        const animateReturn = () => {
            const now = Date.now();
            const elapsed = now - start;
            const newProgress = Math.max(startProgress * (1 - elapsed / duration), 0);
            setUnlockProgress(newProgress);
            if (newProgress > 0 && isPressingRef.current) {
                requestAnimationFrame(animateReturn);
            }
        };
        requestAnimationFrame(animateReturn);

        await new Promise(r => setTimeout(r, 1000));
        if (!isPressingRef.current) return;

        // Stage 2: Flip to show Personal Face
        setInteractionStage('unlock-flip');
        await new Promise(r => setTimeout(r, 1200));
        if (!isPressingRef.current) return;

        // Stage 3: Final Personal Image Dispersal
        setInteractionStage('unlock-disperse');
        playScatter();
        await new Promise(r => setTimeout(r, 1500));
        if (!isPressingRef.current) return;

        setIsUnlocked(true);
        playUnlock();
        await textControls.start({
            scale: [1, 1.2, 0],
            opacity: [1, 1, 0],
            transition: { duration: 0.5 }
        });
        setActiveTab('personal');
    };

    const handleTap = async () => {
        if (interactionStage !== 'idle' || isUnlocked || isReverting) return;

        setIsShattered(true);
        // Stage 1: Break into Grid (In-place morph)
        setInteractionStage('breaking-grid');
        playScatter();

        // Stage 2: Disperse after a longer delay to show the "grid break" first
        setTimeout(() => {
            setInteractionStage('breaking-disperse');
        }, 1500);
    };

    // State for decay animation
    const decayTimerRef = useRef<number | null>(null);

    const startDecryption = () => {
        // Handle initial tap logic for mobile (unify)
        if (!isShattered && interactionStage === 'idle') {
            handleTap();
        }

        if (isUnlocked || isReverting) return;

        // Stop any active decay
        if (decayTimerRef.current) cancelAnimationFrame(decayTimerRef.current);

        setIsPressing(true);
        isPressingRef.current = true;

        // SCRAMBLE EFFECT: Randomize characters while holding
        scrambleIntervalRef.current = window.setInterval(() => {
            setScrambleTick(prev => prev + 1);
        }, 80);

        const now = Date.now();
        const duration = 7000; // 7s strict
        // If progress is at 0, we start from now. If progress > 0, we offset.
        const elapsedSoFar = (unlockProgress / 100) * duration;
        startTimeRef.current = now - elapsedSoFar;

        const animate = () => {
            if (!isPressingRef.current) return; // STRICT BAIL

            const currentTime = Date.now();
            const elapsed = currentTime - (startTimeRef.current || currentTime);
            const progress = Math.min((elapsed / duration) * 100, 100);

            setUnlockProgress(progress); // Progress goes 0 -> 100 (Away from grid)
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
        isPressingRef.current = false;
        stopCharge();

        if (pressTimerRef.current) cancelAnimationFrame(pressTimerRef.current);
        if (scrambleIntervalRef.current) clearInterval(scrambleIntervalRef.current);

        // STAGE 1 REVERT: Fly back to Grid (Towards 0%)
        if (isShattered) {
            setIsReverting(true);
            setInteractionStage('reverting-grid');

            const startDecay = () => {
                const initialProgress = unlockProgress;
                const decayStart = Date.now();
                const decayDuration = 1000; // 1s to bleed back to zero

                const animateDecay = () => {
                    const now = Date.now();
                    const decayElapsed = now - decayStart;
                    const newProgress = Math.max(initialProgress * (1 - decayElapsed / decayDuration), 0);

                    setUnlockProgress(newProgress); // Progress goes back to 0

                    if (newProgress > 0) {
                        decayTimerRef.current = requestAnimationFrame(animateDecay);
                    } else {
                        // STAGE 2 REVERT: Once at 0, flip back to photo
                        setInteractionStage('reverting-flip');

                        setTimeout(() => {
                            setIsShattered(false);
                            setIsReverting(false);
                            setInteractionStage('idle');
                            textControls.start("visible"); // Force restore!
                        }, 1200); // Slower flip reassembly
                    }
                };
                decayTimerRef.current = requestAnimationFrame(animateDecay);
            };

            startDecay();
        }
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

    // 20x20 Grid (400 Shards) for evenness and perfect percentage-based coverage
    const gridSize = 20;
    const totalShards = gridSize * gridSize;

    const shards = useMemo(() => Array.from({ length: totalShards }, (_, i) => ({
        id: i,
        row: Math.floor(i / gridSize),
        col: i % gridSize,
        char: String.fromCharCode(0x30A0 + Math.random() * 96),
        // Random "Chaos" Initial Position
        chaosX: (Math.random() - 0.5) * 1500,
        chaosY: (Math.random() - 0.5) * 1000,
        chaosZ: (Math.random() - 0.5) * 800
    })), [gridSize, totalShards]);

    return (
        <section
            className="min-h-screen flex items-center justify-center relative overflow-hidden perspective-1000"
            id="hero"
            style={{ touchAction: isShattered ? 'none' : 'auto' }} // Prevent scroll while interacting
        >
            <SectionBackground variant="hero" />

            <div className="container max-w-6xl mx-auto px-4 md:px-6 z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative">
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
                    <div className="relative w-full max-w-sm md:max-w-md mx-auto">
                        {/* Decryption Progress - OUTSIDE overflow container */}
                        {isShattered && !isUnlocked && (
                            <motion.div
                                className="absolute -top-24 left-0 right-0 z-[110] flex flex-col items-center pointer-events-none"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <div className="relative w-56 p-4 bg-black/90 backdrop-blur-lg border border-green-500/40 rounded-lg shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-[10px] text-green-500/80 font-mono tracking-widest uppercase">
                                            {isReverting ? 'REVERTING...' : 'DECRYPTING...'}
                                        </span>
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

                        <div
                            ref={containerRef}
                            className="relative w-full aspect-[3/4] cursor-pointer group perspective-1000 select-none touch-none rounded-2xl overflow-hidden shadow-2xl"
                            style={{ WebkitTouchCallout: 'none' }}
                            onContextMenu={(e) => e.preventDefault()}
                            onMouseDown={startDecryption}
                            onMouseUp={stopDecryption}
                            onMouseLeave={stopDecryption}
                            onTouchStart={startDecryption}
                            onTouchEnd={stopDecryption}
                        >
                            {/* PHANTOM IMAGE: Maintans spacing with fixed aspect ratio */}
                            <img src={ProfileImage} alt="Spacer" className="w-full h-full opacity-0 pointer-events-none absolute inset-0 z-0 block object-cover" aria-hidden="true" />

                            {/* Underlay: Personal Profile - HIDDEN until unlocked */}
                            <div className="absolute inset-0 w-full h-full shadow-2xl bg-black transform-gpu">
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
                            <motion.img
                                src={ProfileImage}
                                alt="Profile"
                                className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
                                style={{
                                    opacity: isShattered ? 0 : 1,
                                    scale: isPressing ? 1.05 : 1
                                }}
                            />

                            {/* MATRIX SHARDS - DIRECTLY IN DOM (No Portal) */}
                            {isShattered && (
                                <div className="absolute inset-0 z-[100] pointer-events-none perspective-[2000px]">
                                    {shards.map((shard) => {
                                        if (!containerRect) return null;

                                        // Local Grid Position (relative to this container)
                                        const shardWidth = "5%";
                                        const shardHeight = "5%";
                                        const targetX = shard.col * (containerRect.width / gridSize);
                                        const targetY = shard.row * (containerRect.height / gridSize);
                                        const bgX = targetX;
                                        const bgY = targetY;

                                        // Local Grid Position relative to cell (which is already at shard.col * 5%)
                                        // 0% = Grid (x:0, y:0)
                                        // 100% = Chaos (x:relChaosX, y:relChaosY)
                                        const relChaosX = shard.chaosX - targetX;
                                        const relChaosY = shard.chaosY - targetY;

                                        const t = unlockProgress / 100;
                                        const currentX = relChaosX * t;
                                        const currentY = relChaosY * t;
                                        const currentZ = shard.chaosZ * t;

                                        return (
                                            <motion.div
                                                key={shard.id}
                                                className="absolute bg-no-repeat backface-hidden"
                                                style={{
                                                    width: shardWidth,
                                                    height: shardHeight,
                                                    transformStyle: 'preserve-3d',
                                                    top: `${shard.row * 5}%`,
                                                    left: `${shard.col * 5}%`
                                                }}
                                                initial={{ x: 0, y: 0, z: 0, rotateY: 0, opacity: 1 }}
                                                animate={(() => {
                                                    switch (interactionStage) {
                                                        case 'breaking-grid':
                                                            return { x: 0, y: 0, z: 0, rotateY: 180, opacity: 1 };
                                                        case 'breaking-disperse':
                                                        case 'shattered':
                                                            return {
                                                                x: isPressing ? [currentX, currentX + Math.sin(shard.id) * 20, currentX] : currentX,
                                                                y: isPressing ? [currentY, currentY + Math.cos(shard.id) * 20, currentY] : currentY,
                                                                z: currentZ,
                                                                rotateY: isPressing ? [180, 0, 180] : 180, // TUMBLE while pressing
                                                                opacity: 1,
                                                                scale: isPressing ? 1.1 : 1.2
                                                            };
                                                        case 'reverting-grid':
                                                            return { x: 0, y: 0, z: 0, rotateY: 180, opacity: 1 };
                                                        case 'reverting-flip':
                                                            return { x: 0, y: 0, z: 0, rotateY: 0, opacity: 1 };
                                                        case 'unlock-grid':
                                                            return { x: 0, y: 0, z: 0, rotateY: 180, opacity: 1 };
                                                        case 'unlock-flip':
                                                            return { x: 0, y: 0, z: 0, rotateY: 360, opacity: 1 };
                                                        case 'unlock-disperse':
                                                            return {
                                                                x: relChaosX * 3,
                                                                y: relChaosY * 3,
                                                                z: 500,
                                                                rotateY: 720,
                                                                opacity: 0,
                                                                scale: 0.5
                                                            };
                                                        default:
                                                            return { x: 0, y: 0, rotateY: 0, opacity: 1 };
                                                    }
                                                })()}
                                                transition={{
                                                    duration: interactionStage.includes('grid') || interactionStage.includes('flip') ? 1.2 : 0.8,
                                                    ease: "easeInOut",
                                                    repeat: isPressing && interactionStage === 'shattered' ? Infinity : 0,
                                                    repeatType: "reverse"
                                                }}
                                            >
                                                <div
                                                    className="absolute inset-0 bg-no-repeat backface-hidden"
                                                    style={{
                                                        backgroundImage: `url(${interactionStage.startsWith('unlock') ? ProfileImagePersonal : ProfileImage})`,
                                                        backgroundSize: `${containerRect.width}px ${containerRect.height}px`,
                                                        backgroundPosition: `-${bgX}px -${bgY}px`,
                                                        outline: '1px solid transparent'
                                                    }}
                                                />
                                                <div
                                                    className="absolute inset-0 bg-black text-green-500 font-mono font-bold flex items-center justify-center text-[8px] md:text-[10px] backface-hidden"
                                                    style={{
                                                        transform: 'rotateY(180deg)',
                                                        border: '1px solid rgba(0, 255, 0, 0.1)'
                                                    }}
                                                >
                                                    {isPressing || interactionStage === 'shattered' || interactionStage.includes('grid')
                                                        ? "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890".charAt(Math.floor(Math.random() * 56 + scrambleTick) % 56)
                                                        : shard.char
                                                    }
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
            <motion.div
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 1 }}
                animate={{
                    y: [0, 10, 0],
                    opacity: isShattered ? 0 : 1
                }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <ChevronDown className="text-text-muted" size={32} />
            </motion.div>
            <ResumePreview isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} />
        </section>
    );
};

export default Hero;