
import React from 'react';
import { motion } from 'framer-motion';
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown, ExternalLink, Code } from 'lucide-react';
import { resumeData } from '../data/resume';
import ProfileImage from '../assets/profile.jpg';

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
            type: "spring",
            damping: 15,
            stiffness: 200
        }
    }
};

const Hero: React.FC = () => {
    const nameLetters = resumeData.basics.name.split("");

    return (
        <section className="min-h-screen flex flex-col justify-center relative overflow-hidden px-4 md:px-0" id="hero">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-secondary/10 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

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
                        className="text-5xl md:text-8xl font-bold mb-6 tracking-tight flex flex-wrap"
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
                        <motion.a
                            href="https://drive.google.com/file/d/1IlMIoxqCKINQq44ONK8rVXVBesvckNpM/view?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-3 bg-primary text-white rounded-full font-mono hover:bg-primary-light transition-all shadow-lg shadow-primary/25 flex items-center gap-2"
                            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0,79,144,0.5)" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            View Resume <ExternalLink size={18} />
                        </motion.a>
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
                                {profile.network === 'LeetCode' && <Code size={24} />}
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

                {/* Profile Image with Motion */}
                <motion.div
                    className="order-1 md:order-2 flex justify-center perspective-1000"
                    initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <div className="relative w-64 h-64 md:w-96 md:h-96">
                        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse"></div>
                        <motion.div
                            className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl glass-card"
                            whileHover={{ scale: 1.02, rotate: 2 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay z-10"></div>
                            <img
                                src={ProfileImage}
                                alt={resumeData.basics.name}
                                className="w-full h-full object-cover"
                            />
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
        </section>
    );
};

export default Hero;
