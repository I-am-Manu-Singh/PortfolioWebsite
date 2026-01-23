import React from 'react';
import { motion } from 'framer-motion';
import { Code, Music, Cpu, Instagram, Terminal, Database, Globe } from 'lucide-react';

type BackgroundVariant = 'hero' | 'skills' | 'experience' | 'music' | 'instagram' | 'default';

interface SectionBackgroundProps {
    variant?: BackgroundVariant;
    className?: string;
}

const SectionBackground: React.FC<SectionBackgroundProps> = ({ variant = 'default', className = '' }) => {
    // Common float animation
    const floatTransition = {
        duration: 20,
        repeat: Infinity,
        ease: "linear" as const
    };

    const renderVariant = () => {
        switch (variant) {
            case 'hero':
                return (
                    <>
                        {/* Coding Symbols */}
                        <motion.div
                            animate={{ rotate: 360, y: [0, -50, 0] }}
                            transition={floatTransition}
                            className="absolute top-20 right-[10%] opacity-40 text-primary-light"
                        >
                            <Code size={120} />
                        </motion.div>
                        <motion.div
                            animate={{ rotate: -360, x: [0, 50, 0] }}
                            transition={{ ...floatTransition, duration: 25 }}
                            className="absolute bottom-40 left-[5%] opacity-10 text-secondary"
                        >
                            <Terminal size={100} />
                        </motion.div>
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                            transition={{ duration: 8, repeat: Infinity }}
                            className="absolute top-1/4 right-1/3 w-64 h-64 bg-primary/20 rounded-full blur-[100px]"
                        />
                        {/* Floating bits */}
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute text-primary/20 font-mono text-2xl font-bold"
                                initial={{ x: Math.random() * 1000, y: Math.random() * 800 }}
                                animate={{
                                    y: [null, Math.random() * -100],
                                    opacity: [0, 1, 0]
                                }}
                                transition={{
                                    duration: Math.random() * 5 + 5,
                                    repeat: Infinity,
                                    delay: Math.random() * 5
                                }}
                            >
                                {['{ }', '< />', 'const', 'func', '01'][i]}
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
                            className="absolute -top-20 -right-20 opacity-30 text-secondary"
                        >
                            <Cpu size={300} />
                        </motion.div>
                        <motion.div
                            animate={{ rotate: -180 }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                            className="absolute bottom-10 left-10 opacity-5 text-primary"
                        >
                            <Database size={200} />
                        </motion.div>
                        {/* Circuit lines horizontal */}
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent w-full"
                                style={{ top: `${20 + i * 30}%` }}
                                animate={{
                                    x: ['-100%', '100%'],
                                    opacity: [0, 1, 0]
                                }}
                                transition={{
                                    duration: 8 + i * 2,
                                    repeat: Infinity,
                                    ease: "linear",
                                    delay: i
                                }}
                            />
                        ))}
                    </>
                );
            case 'experience':
                return (
                    <>
                        <motion.div
                            className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px]"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 10, repeat: Infinity }}
                        />
                        <motion.div
                            className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[100px]"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 12, repeat: Infinity, delay: 2 }}
                        />
                        <motion.div
                            animate={{ y: [0, -30, 0] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-20 left-[10%] opacity-30 text-white"
                        >
                            <Globe size={150} />
                        </motion.div>
                    </>
                );

            case 'music':
                return (
                    <>
                        <motion.div
                            animate={{ rotate: [0, 10, 0], y: [0, -20, 0] }}
                            transition={{ duration: 5, repeat: Infinity }}
                            className="absolute top-20 left-[20%] opacity-10 text-pink-500"
                        >
                            <Music size={100} />
                        </motion.div>
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute text-pink-500/20"
                                style={{
                                    left: `${Math.random() * 90}%`,
                                    top: `${Math.random() * 80}%`
                                }}
                                animate={{
                                    y: -100,
                                    opacity: [0, 1, 0],
                                    x: Math.sin(i) * 50
                                }}
                                transition={{
                                    duration: 4 + Math.random() * 4,
                                    repeat: Infinity,
                                    delay: Math.random() * 2
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
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-tr from-yellow-500/5 via-pink-500/5 to-purple-500/5 mix-blend-screen"
                        />
                        {[...Array(4)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute text-purple-500/10"
                                style={{
                                    right: `${Math.random() * 40}%`,
                                    bottom: `${Math.random() * 40}%`
                                }}
                                animate={{
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 90, 0]
                                }}
                                transition={{
                                    duration: 10 + Math.random() * 10,
                                    repeat: Infinity,
                                }}
                            >
                                <Instagram size={60 + Math.random() * 60} />
                            </motion.div>
                        ))}
                    </>
                )

            default: // Lava lamp generic
                return (
                    <>
                        <motion.div
                            className="absolute -top-20 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[100px]"
                            animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }}
                            transition={{ duration: 8, repeat: Infinity }}
                        />
                        <motion.div
                            className="absolute bottom-20 right-20 w-80 h-80 bg-secondary/10 rounded-full blur-[80px]"
                            animate={{ scale: [1, 1.3, 1], y: [0, -30, 0] }}
                            transition={{ duration: 10, repeat: Infinity }}
                        />
                    </>
                );
        }
    };

    return (
        <div className={`absolute inset-0 pointer-events-none overflow-hidden z-0 ${className}`}>
            {renderVariant()}
        </div>
    );
};

export default SectionBackground;
