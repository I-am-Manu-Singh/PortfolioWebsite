
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown, ExternalLink } from 'lucide-react';
import { resumeData } from '../data/resume';

const Hero: React.FC = () => {
    return (
        <section className="min-h-screen flex flex-col justify-center relative overflow-hidden px-4 md:px-0">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-secondary/10 blur-[100px]" />
            </div>

            <div className="container max-w-5xl mx-auto z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-secondary font-mono text-xl md:text-2xl mb-4">Hello, I'm</h2>
                    <h1 className="text-5xl md:text-8xl font-bold mb-6 tracking-tight">
                        {resumeData.basics.name}
                        <span className="text-primary">.</span>
                    </h1>

                    <div className="md:hidden mb-8">
                        <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl shadow-primary/20">
                            <img
                                src="/src/assets/profile.jpg"
                                alt={resumeData.basics.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <h3 className="text-3xl md:text-5xl text-text-muted font-bold mb-8">
                        I build <span className="text-white">mobile experiences</span>.
                    </h3>
                    <p className="max-w-2xl text-lg md:text-xl text-text-muted leading-relaxed mb-10">
                        {resumeData.basics.summary}
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <motion.a
                            href={`mailto:${resumeData.basics.email}`}
                            className="px-8 py-3 bg-transparent border border-primary text-primary hover:bg-primary/10 rounded-full font-mono transition-all flex items-center gap-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Mail size={18} /> Contact Me
                        </motion.a>
                        <motion.a
                            href="#projects"
                            className="px-8 py-3 bg-primary text-white rounded-full font-mono hover:bg-primary-light transition-all shadow-lg shadow-primary/25"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            View Work
                        </motion.a>
                    </div>

                    <div className="mt-16 flex gap-6">
                        {resumeData.basics.profiles.map((profile, index) => (
                            <motion.a
                                key={index}
                                href={profile.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-text-muted hover:text-secondary transition-colors"
                                whileHover={{ y: -5 }}
                                title={profile.network}
                            >
                                {profile.network === 'GitHub' && <Github size={24} />}
                                {profile.network === 'LinkedIn' && <Linkedin size={24} />}
                                {profile.network === 'LeetCode' && <ExternalLink size={24} />}
                            </motion.a>
                        ))}
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
