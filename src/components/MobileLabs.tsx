import React from 'react';
import { motion } from 'framer-motion';
import { Play, Github, CheckCircle2, ArrowUpRight } from 'lucide-react';
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
                        <h2 className="section-title text-left mb-2">
                            Mobile <span className="text-primary-light">Labs</span>
                        </h2>
                      
                    </motion.div>
                </div>

            {/* Google Play Full-Width Aspect-Ratio Banner (No Cropping) */}
<motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mb-10 rounded-2xl overflow-hidden border border-dark shadow-xl bg-dark-card"
>
    {/* Added rounded-2xl here so the inner background snaps to the border */}
    <div className="w-full bg-[#0a0a14] flex items-center justify-center p-1 sm:p-2 rounded-2xl">
        <img
            src={bannerSrc}
            alt="Creative Bliss Labs - Google Play Banner"
            className="w-full h-auto max-h-[380px] object-contain mx-auto rounded-xl"
        />
    </div>
</motion.div>

                {/* Sole Featured Production Flagship: Bani: Nitnem & Steek Companion */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto bg-dark-card border border-dark rounded-2xl p-6 md:p-10 shadow-xl space-y-6"
                >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-dark border border-dark p-1.5 shadow-md shrink-0 flex items-center justify-center">
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
                               
                                </div>
                                <p className="text-xs font-mono text-primary flex items-center gap-1.5 mt-1">
                                    <CheckCircle2 size={13} />
                                    <span>Google Play Release · Coming Soon to Public</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-text-muted text-sm md:text-base leading-relaxed">
                        Sacred Gurbani reading & devotional learning companion engineered with Compose Multiplatform. Features authentic line-by-line Steek (meanings), Shabad Khoj, synchronized background audio recitation, customizable Gurmukhi typography, and offline habit tracking.
                    </p>

                    {/* Tech Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                        {['Compose Multiplatform', 'Offline SQLite', 'LocalDB', 'Media3 Audio', 'Habit Streaks', 'Material 3 Expressive'].map(t => (
                            <span 
                                key={t} 
                                className="text-[11px] px-3 py-1 rounded-lg bg-dark text-text font-mono border border-dark"
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
