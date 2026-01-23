import React from 'react';
import { motion } from 'framer-motion';
import { Code, Music, Cpu, Instagram, Terminal, Database, Globe, Folder, FileText, Users, Star, MessageCircle, Hash, Layout, GitBranch } from 'lucide-react';

type BackgroundVariant = 'hero' | 'skills' | 'experience' | 'music' | 'instagram' | 'projects' | 'writing' | 'community' | 'default';

interface SectionBackgroundProps {
    variant?: BackgroundVariant;
    className?: string;
}

const SectionBackground: React.FC<SectionBackgroundProps> = ({ variant = 'default', className = '' }) => {
    // Common float animation settings
    const randomDuration = () => Math.random() * 10 + 10;
    const randomDelay = () => Math.random() * 5;

    const renderVariant = () => {
        switch (variant) {
            case 'hero':
                return (
                    <>
                        <motion.div
                            animate={{ rotate: 360, y: [0, -50, 0] }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            className="absolute top-[10%] right-[5%] opacity-30 text-primary-light"
                        >
                            <Code size={140} />
                        </motion.div>
                        <motion.div
                            animate={{ rotate: -360, x: [0, 50, 0] }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            className="absolute bottom-[20%] left-[5%] opacity-20 text-secondary"
                        >
                            <Terminal size={120} />
                        </motion.div>
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                            transition={{ duration: 8, repeat: Infinity }}
                            className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]"
                        />
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute text-primary/30 font-mono font-bold"
                                style={{
                                    left: `${Math.random() * 90}%`,
                                    top: `${Math.random() * 90}%`,
                                    fontSize: `${Math.random() * 20 + 14}px`
                                }}
                                animate={{
                                    y: [0, Math.random() * -60, 0],
                                    opacity: [0.1, 0.5, 0.1]
                                }}
                                transition={{
                                    duration: randomDuration(),
                                    repeat: Infinity,
                                    delay: randomDelay()
                                }}
                            >
                                {['{ }', '< />', 'const', 'func', 'var', 'let', 'if', 'return'][i % 8]}
                            </motion.div>
                        ))}
                    </>
                );

            case 'projects':
                return (
                    <>
                        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:60px_60px]" />
                        <motion.div
                            animate={{ rotate: 180 }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                            className="absolute top-[15%] left-[10%] opacity-20 text-white"
                        >
                            <Folder size={100} />
                        </motion.div>
                        <motion.div
                            animate={{ rotate: -180 }}
                            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                            className="absolute bottom-[20%] right-[10%] opacity-20 text-primary"
                        >
                            <Layout size={120} />
                        </motion.div>
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute text-secondary/20"
                                style={{
                                    left: `${Math.random() * 90}%`,
                                    top: `${Math.random() * 90}%`
                                }}
                                animate={{
                                    y: [0, -40, 0],
                                    rotate: [0, 20, 0]
                                }}
                                transition={{ duration: 15, repeat: Infinity, delay: i * 2 }}
                            >
                                <GitBranch size={40 + Math.random() * 30} />
                            </motion.div>
                        ))}
                    </>
                );

            case 'skills':
                return (
                    <>
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                            className="absolute top-[5%] right-[-5%] opacity-25 text-secondary"
                        >
                            <Cpu size={250} />
                        </motion.div>
                        <motion.div
                            animate={{ rotate: -180 }}
                            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                            className="absolute bottom-[10%] left-[-5%] opacity-20 text-primary"
                        >
                            <Database size={200} />
                        </motion.div>
                        {/* More Tech Symbols */}
                        {[...Array(10)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute text-white/10"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`
                                }}
                                animate={{ opacity: [0.1, 0.4, 0.1] }}
                                transition={{ duration: 4, repeat: Infinity, delay: i }}
                            >
                                <Hash size={24} />
                            </motion.div>
                        ))}
                    </>
                );
            case 'experience':
                return (
                    <>
                        {/* Full height timeline-like visuals */}
                        <div className="absolute left-[10%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                        <div className="absolute right-[10%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />

                        <motion.div
                            animate={{ y: [0, -50, 0] }}
                            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-[20%] right-[15%] opacity-20 text-white"
                        >
                            <Globe size={180} />
                        </motion.div>
                        <motion.div
                            animate={{ y: [0, 50, 0] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-[20%] left-[15%] opacity-20 text-primary-light"
                        >
                            <BriefcaseIcon size={140} />
                        </motion.div>
                    </>
                );

            case 'writing':
                return (
                    <>
                        <motion.div
                            animate={{ rotate: [0, 10, 0], y: [0, -20, 0] }}
                            transition={{ duration: 8, repeat: Infinity }}
                            className="absolute top-[10%] left-[5%] opacity-20 text-white"
                        >
                            <FileText size={120} />
                        </motion.div>
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute text-primary/20"
                                style={{
                                    right: `${Math.random() * 40}%`,
                                    top: `${Math.random() * 90}%`
                                }}
                                animate={{ x: [0, -30, 0], opacity: [0.1, 0.4, 0.1] }}
                                transition={{ duration: 10 + i, repeat: Infinity }}
                            >
                                <div className="w-32 h-2 bg-white/20 rounded-full mb-2" />
                                <div className="w-24 h-2 bg-white/10 rounded-full" />
                            </motion.div>
                        ))}
                    </>
                );

            case 'community':
                return (
                    <>
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 5, repeat: Infinity }}
                            className="absolute top-[15%] right-[20%] opacity-20 text-yellow-400"
                        >
                            <Star size={100} />
                        </motion.div>
                        {[...Array(12)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute text-white/10"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`
                                }}
                                animate={{ y: -50, opacity: [0, 1, 0] }}
                                transition={{ duration: 8 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 5 }}
                            >
                                {i % 2 === 0 ? <Users size={30} /> : <MessageCircle size={24} />}
                            </motion.div>
                        ))}
                    </>
                );

            case 'music':
                return (
                    <>
                        <motion.div
                            animate={{ rotate: [0, 10, 0], y: [0, -20, 0] }}
                            transition={{ duration: 5, repeat: Infinity }}
                            className="absolute top-[10%] left-[10%] opacity-30 text-pink-500"
                        >
                            <Music size={120} />
                        </motion.div>
                        <motion.div
                            animate={{ rotate: [0, -10, 0], y: [0, 20, 0] }}
                            transition={{ duration: 7, repeat: Infinity }}
                            className="absolute bottom-[20%] right-[10%] opacity-20 text-purple-500"
                        >
                            <Music size={150} />
                        </motion.div>
                        {/* Distributed Notes */}
                        {[...Array(15)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute text-pink-500/30"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`
                                }}
                                animate={{
                                    y: -150,
                                    opacity: [0, 0.8, 0],
                                    x: Math.sin(i) * 30
                                }}
                                transition={{
                                    duration: 5 + Math.random() * 5,
                                    repeat: Infinity,
                                    delay: Math.random() * 5
                                }}
                            >
                                <Music size={20 + Math.random() * 20} />
                            </motion.div>
                        ))}
                    </>
                );

            case 'instagram':
                return (
                    <>
                        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/10 via-pink-500/10 to-purple-500/10 mix-blend-screen" />
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute text-white/10"
                                style={{
                                    left: `${Math.random() * 90}%`,
                                    top: `${Math.random() * 80}%`
                                }}
                                animate={{
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 360, 0],
                                    opacity: [0.1, 0.3, 0.1]
                                }}
                                transition={{
                                    duration: 15 + Math.random() * 10,
                                    repeat: Infinity,
                                    delay: Math.random() * 5
                                }}
                            >
                                <Instagram size={40 + Math.random() * 40} />
                            </motion.div>
                        ))}
                    </>
                )

            default:
                return (
                    <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:40px_40px]" />
                );
        }
    };

    return (
        <div className={`absolute inset-0 pointer-events-none overflow-hidden z-0 ${className}`}>
            {renderVariant()}
        </div>
    );
};

// Helper for Briefcase icon
const BriefcaseIcon = ({ size }: { size: number }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
);

export default SectionBackground;
