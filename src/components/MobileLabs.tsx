import React from 'react';
import { motion } from 'framer-motion';
import { 
    Play, Rocket, Github, CheckCircle2, Sparkles, 
    Smartphone,   Cpu, Database, Radio, 
    Activity, Layers, ArrowUpRight, Clock
} from 'lucide-react';
import SectionBackground from './SectionBackground';

// Play Store SVG Badge Icon
const PlayStoreIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M3.609 1.814L13.793 12 3.61 22.186a1.503 1.503 0 0 1-.22-.796V2.61c0-.294.079-.569.219-.796z" fill="#00C1A6"/>
        <path d="M17.556 8.243l-3.763 3.757 3.763 3.757 4.28-2.47c.74-.427.74-1.616 0-2.044l-4.28-2.5z" fill="#FFBA00"/>
        <path d="M3.609 1.814c.257-.197.58-.314.933-.314.475 0 .937.211 1.258.397l11.756 6.346-3.763 3.757L3.609 1.814z" fill="#00E676"/>
        <path d="M13.793 12l3.763 3.757-11.756 6.346a1.988 1.988 0 0 1-1.258.397c-.353 0-.676-.117-.933-.314L13.793 12z" fill="#FF3D00"/>
    </svg>
);

const MobileLabs: React.FC = () => {
    const bannerSrc = `${import.meta.env.BASE_URL}creativebliss_console_banner.png`;

    return (
        <section className="section bg-dark relative overflow-hidden" id="mobile-labs">
            <SectionBackground variant="projects" />

            <div className="container relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <span className="p-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20">
                                <Smartphone size={18} />
                            </span>
                            <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
                                Production Mobile Labs
                            </span>
                        </div>
                        <h2 className="section-title text-left mb-2">
                            Mobile <span className="text-primary-light">Labs</span>
                        </h2>
                        <p className="text-text-muted font-mono text-xs md:text-sm tracking-wide">
                            Google Play Console production tracks & active multiplatform release candidates.
                        </p>
                    </motion.div>

                    <motion.div
                        className="flex flex-wrap items-center gap-3"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-2 px-3.5 py-2 bg-dark-card border border-white/5 rounded-2xl text-xs font-mono text-text shadow-sm">
                            <Rocket size={14} className="text-primary animate-bounce" />
                            <span>Creative Bliss Labs · Android</span>
                        </div>
                        <div className="flex items-center gap-2 px-3.5 py-2 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-xs font-mono text-amber-500">
                            <Clock size={14} />
                            <span>14-Day Closed Testing</span>
                        </div>
                    </motion.div>
                </div>

                {/* Google Play Console Full-Width Aspect-Ratio Banner (No Cropping) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-10 rounded-2xl overflow-hidden border border-white/5 shadow-xl bg-dark-card"
                >
                    <div className="w-full bg-[#0a0a14] flex items-center justify-center p-1 sm:p-2">
                        <img
                            src={bannerSrc}
                            alt="Creative Bliss Labs - Google Play Console Banner"
                            className="w-full h-auto max-h-[380px] object-contain mx-auto"
                        />
                    </div>
                    <div className="p-3 bg-dark-card border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-text-muted">
                        <div className="flex items-center gap-2">
                            <Sparkles size={14} className="text-primary" />
                            <span>Creative Bliss Labs · Active Production Roster</span>
                        </div>
                        <span>Google Play Console · Target: Android 15 (API 35)</span>
                    </div>
                </motion.div>

                {/* Sole Featured Production Flagship: Bani: Nitnem & Steek Companion */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto bg-dark-card border border-white/5 rounded-2xl p-6 md:p-10 shadow-xl space-y-6"
                >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-dark border border-white/10 p-1.5 shadow-md shrink-0 flex items-center justify-center">
                                <img 
                                    src={`${import.meta.env.BASE_URL}logos/nitnem.png`} 
                                    alt="Bani Logo" 
                                    className="w-full h-full object-contain rounded-xl"
                                />
                            </div>
                            <div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <h3 className="text-xl md:text-2xl font-bold text-text font-outfit">
                                        Bani: Nitnem & Steek Companion
                                    </h3>
                                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-500 border border-amber-500/30 font-semibold flex items-center gap-1">
                                        <Activity size={12} className="animate-pulse" />
                                        <span>14-Day Closed Testing Active</span>
                                    </span>
                                </div>
                                <p className="text-xs font-mono text-primary flex items-center gap-1.5 mt-1">
                                    <CheckCircle2 size={13} />
                                    <span>Google Play Console Production Release Candidate · Coming Soon to Public</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-text-muted text-sm md:text-base leading-relaxed">
                        Sacred Gurbani reading & devotional learning companion engineered with Compose Multiplatform. Features authentic line-by-line Steek (meanings), first-letter phonetic search (Shabad Khoj), synchronized background audio recitation, customizable Gurmukhi typography, and offline habit tracking.
                    </p>

                    {/* Architectural Core Callout */}
                    <div className="p-4 rounded-xl bg-dark border border-white/5 space-y-1.5">
                        <div className="flex items-center gap-2 text-xs font-mono font-bold text-text uppercase tracking-wide">
                            <Layers size={14} className="text-primary" />
                            <span>System & Hardware Architecture</span>
                        </div>
                        <p className="text-xs text-text-muted font-mono leading-relaxed">
                            Offline-first SQLite SQLiteDelight cache with GurbaniDB indexation, Media3 ExoPlayer foreground media service with lock-screen notification media session controls, and adaptive Material 3 UI.
                        </p>
                    </div>

                    {/* Telemetry Matrix */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="p-3 rounded-xl bg-dark border border-white/5">
                            <div className="text-[10px] font-mono uppercase text-text-muted flex items-center gap-1">
                                <Radio size={12} className="text-primary" /> Track
                            </div>
                            <div className="text-xs font-mono font-bold text-text mt-1 truncate">
                                Closed (20 Testers)
                            </div>
                        </div>
                        <div className="p-3 rounded-xl bg-dark border border-white/5">
                            <div className="text-[10px] font-mono uppercase text-text-muted flex items-center gap-1">
                                <Smartphone size={12} className="text-secondary" /> Target SDK
                            </div>
                            <div className="text-xs font-mono font-bold text-text mt-1 truncate">
                                Android 15 (API 35)
                            </div>
                        </div>
                        <div className="p-3 rounded-xl bg-dark border border-white/5">
                            <div className="text-[10px] font-mono uppercase text-text-muted flex items-center gap-1">
                                <Cpu size={12} className="text-emerald-500" /> Pipeline
                            </div>
                            <div className="text-xs font-mono font-bold text-text mt-1 truncate">
                                CMP Shared UI
                            </div>
                        </div>
                        <div className="p-3 rounded-xl bg-dark border border-white/5">
                            <div className="text-[10px] font-mono uppercase text-text-muted flex items-center gap-1">
                                <Database size={12} className="text-amber-500" /> Storage
                            </div>
                            <div className="text-xs font-mono font-bold text-text mt-1 truncate">
                                SQLite + GurbaniDB
                            </div>
                        </div>
                    </div>

                    {/* Tech Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                        {['Compose Multiplatform', 'Offline SQLite', 'GurbaniDB', 'Media3 Audio', 'Habit Streaks', 'Material 3 Expressive'].map(t => (
                            <span 
                                key={t} 
                                className="text-[11px] px-3 py-1 rounded-lg bg-dark text-text font-mono border border-white/5"
                            >
                                {t}
                            </span>
                        ))}
                    </div>

                    {/* CTA Actions with Play Store Closed Testing Button */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/5">
                        <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
                            <Play size={14} className="text-primary" />
                            <span>Target Platform: Android (Google Play) & iOS</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            {/* Play Store Link with 14-day testing badge */}
                            <a
                                href="https://play.google.com/apps/testing/com.creativeblisslabs.nitnem"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold font-mono text-xs transition-all hover:scale-105"
                            >
                                <PlayStoreIcon />
                                <span>Google Play Store (14-Day Testing)</span>
                                <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-500 border border-amber-500/30 font-normal">Coming Soon</span>
                            </a>

                            <a
                                href="https://github.com/I-am-Manu-Singh/NitnemGutkaSahib"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-light text-white font-bold font-mono text-xs transition-all shadow-md shadow-primary/25 hover:scale-105"
                            >
                                <Github size={15} />
                                <span>Inspect Source Code</span>
                                <ArrowUpRight size={13} />
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default MobileLabs;
