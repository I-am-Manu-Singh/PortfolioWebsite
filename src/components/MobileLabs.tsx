import React from 'react';
import { motion } from 'framer-motion';
import { Play, Rocket, Github, CheckCircle2, Sparkles } from 'lucide-react';
import SectionBackground from './SectionBackground';

const apps = [
    {
        id: 'nitnem',
        name: 'Bani: Nitnem & Steek Companion',
        tagline: '14-Day Closed Testing on Google Play Console',
        description: 'Sacred Gurbani reading & devotional learning companion built with Compose Multiplatform. Features authentic line-by-line Steek (meanings), first-letter phonetic search (Shabad Khoj), synchronized audio recitation, customizable Gurmukhi typography, and daily Nitnem habit streaks.',
        tech: ['Compose Multiplatform', 'Offline SQLite', 'GurbaniDB', 'Media3 Audio', 'Habit Streaks', 'Material 3 Expressive'],
        logo: `${import.meta.env.BASE_URL}logos/nitnem.png`,
        github: 'https://github.com/I-am-Manu-Singh/NitnemGutkaSahib',
        gradient: 'from-amber-500/20 via-orange-500/20 to-yellow-500/20',
        status: 'Active 14-Day Testing',
        platform: 'Android & iOS'
    }
];

const MobileLabs: React.FC = () => {
    const bannerSrc = `${import.meta.env.BASE_URL}creativebliss_console_banner.png`;

    return (
        <section className="section bg-dark-card/20 relative overflow-hidden" id="mobile-labs">
            <SectionBackground variant="projects" />

            <div className="container relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="section-title text-left mb-2">
                            Mobile <span className="gradient-text-animated">Labs</span>
                        </h2>
                        <p className="text-text-muted font-mono text-sm tracking-widest">
                            // GOOGLE PLAY CONSOLE & ACTIVE PRODUCTION CANDIDATES
                        </p>
                    </motion.div>

                    <motion.div
                        className="flex gap-4"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-xs font-mono text-primary-light">
                            <Rocket size={14} className="animate-bounce" />
                            Creative Bliss Labs · Active Track
                        </div>
                    </motion.div>
                </div>

                {/* Play Store Console Feature Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-10 group relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black/40"
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-transparent to-transparent z-10 pointer-events-none" />
                    <img
                        src={bannerSrc}
                        alt="Creative Bliss Labs - Google Play Console Banner"
                        className="w-full h-auto max-h-72 object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                    />
                    <div className="absolute bottom-4 left-6 right-6 z-20 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-white text-xs font-mono">
                            <Sparkles size={14} className="text-primary-light" />
                            <span>Creative Bliss Labs · Android Ecosystem</span>
                        </div>
                        <span className="text-xs font-mono text-white/80 bg-black/60 px-3 py-1 rounded-full backdrop-blur-md border border-white/10 hidden sm:inline-block">
                            Ideas · Products · A Better Everyday
                        </span>
                    </div>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    {apps.map((app, index) => (
                        <motion.div
                            key={app.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="group relative"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${app.gradient} blur-3xl opacity-30 group-hover:opacity-70 transition-opacity duration-500 rounded-3xl`} />

                            <div className="glass-card p-8 md:p-10 relative flex flex-col md:flex-row gap-8 items-center border border-white/10 hover:border-primary/40 transition-all rounded-3xl bg-dark-card/80 backdrop-blur-xl shadow-2xl">
                                <div className="flex-shrink-0 flex items-center justify-center w-28 h-28 md:w-36 md:h-36 rounded-3xl bg-white/5 border border-white/15 group-hover:border-primary/50 group-hover:scale-105 transition-all duration-500 overflow-hidden shadow-2xl relative p-2">
                                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                                    <img 
                                        src={app.logo} 
                                        alt={app.name} 
                                        className="w-full h-full object-contain rounded-2xl relative z-10" 
                                    />
                                </div>

                                <div className="flex-grow flex flex-col justify-between w-full">
                                    <div>
                                        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                                            <h3 className="text-2xl md:text-3xl font-bold text-white font-outfit">{app.name}</h3>
                                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold">
                                                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                                                {app.status}
                                            </div>
                                        </div>

                                        <p className="text-primary-light font-mono text-xs mb-4 flex items-center gap-1.5">
                                            <CheckCircle2 size={13} />
                                            {app.tagline}
                                        </p>

                                        <p className="text-text-muted text-sm md:text-base leading-relaxed mb-6">
                                            {app.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {app.tech.map(t => (
                                                <span key={t} className="text-xs px-3 py-1 rounded-xl bg-white/5 text-white/80 font-mono border border-white/10 hover:border-primary/40 transition-colors">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white/70">
                                                <Play size={16} className="text-primary-light" />
                                                <span className="text-xs font-bold font-mono">14-Day Closed Track</span>
                                            </div>
                                            <span className="text-xs font-mono text-text-muted">Target: {app.platform}</span>
                                        </div>

                                        <a
                                            href={app.github}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-black font-bold font-mono text-xs hover:bg-primary-light transition-all shadow-lg shadow-primary/20 hover:scale-105"
                                        >
                                            <Github size={16} />
                                            View Source Code
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MobileLabs;
