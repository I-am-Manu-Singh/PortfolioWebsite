import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Calendar, ChevronRight, ExternalLink } from 'lucide-react';
import { resumeData } from '../data/resume';
import { resumesList } from '../data/resumesData';
import SectionBackground from './SectionBackground';

// Play Store SVG Badge Icon
const PlayStoreIcon: React.FC<{ size?: number }> = ({ size = 15 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M3.609 1.814L13.793 12 3.61 22.186a1.503 1.503 0 0 1-.22-.796V2.61c0-.294.079-.569.219-.796z" fill="#00C1A6"/>
        <path d="M17.556 8.243l-3.763 3.757 3.763 3.757 4.28-2.47c.74-.427.74-1.616 0-2.044l-4.28-2.5z" fill="#FFBA00"/>
        <path d="M3.609 1.814c.257-.197.58-.314.933-.314.475 0 .937.211 1.258.397l11.756 6.346-3.763 3.757L3.609 1.814z" fill="#00E676"/>
        <path d="M13.793 12l3.763 3.757-11.756 6.346a1.988 1.988 0 0 1-1.258.397c-.353 0-.676-.117-.933-.314L13.793 12z" fill="#FF3D00"/>
    </svg>
);

// App Store SVG Badge Icon
const AppStoreIcon: React.FC<{ size?: number }> = ({ size = 15 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.63 1.35-.58.67-1.09 1.74-.95 2.77.99.08 2.02-.52 2.65-1.27z"/>
    </svg>
);

interface UnifiedJob {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    highlights: string[];
    url?: string;
    playStore?: string | null;
    appStore?: string | null;
}

const ExperienceItem: React.FC<{
    job: UnifiedJob;
    index: number;
    total: number;
}> = ({ job, index, total }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="relative pl-8 md:pl-10"
        >
            {/* Timeline Line (Left Side) */}
            <div className={`absolute left-0 top-0 w-0.5 h-full bg-dark ${index === total - 1 ? 'h-0' : ''}`}></div>

            {/* Timeline Dot */}
            <div className="absolute left-[-5px] top-0 w-3 h-3 bg-primary rounded-full z-10 mt-6 ring-4 ring-dark"></div>

            <div className="glass-card p-5 hover:bg-dark-card/90 transition-colors group relative overflow-hidden">
                {/* Gradient Shine Effect */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shine pointer-events-none" />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                    <div>
                        <h3 className="text-xl font-bold text-text group-hover:text-primary transition-colors">{job.position}</h3>
                        <div className="text-lg text-text-muted flex items-center gap-2 font-medium">
                            <Briefcase size={16} className="text-secondary" />
                            <span>{job.company}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-primary-light font-mono text-sm bg-primary/10 px-3 py-1 rounded-full self-start md:self-auto">
                        <Calendar size={14} />
                        <span>{job.startDate} — {job.endDate}</span>
                    </div>
                </div>

                {/* Highlights List */}
                <ul className="space-y-2 mb-4">
                    {job.highlights.map((highlight, i) => (
                        <li key={i} className="flex gap-3 text-text-muted text-sm leading-relaxed">
                            <ChevronRight size={16} className="text-primary mt-0.5 flex-shrink-0" />
                            <span dangerouslySetInnerHTML={{
                                __html: highlight.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-medium">$1</strong>')
                            }} />
                        </li>
                    ))}
                </ul>

                {/* Direct Store Badges & Certificates */}
                {(job.playStore || job.appStore || job.url) && (
                    <div className="pt-3 border-t border-white/5 flex flex-wrap items-center gap-2.5">
                        {job.playStore && (
                            <a
                                href={job.playStore}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-mono transition-all hover:scale-105"
                            >
                                <PlayStoreIcon />
                                <span>Google Play Store</span>
                                <ExternalLink size={12} className="opacity-70" />
                            </a>
                        )}
                        {job.appStore && (
                            <a
                                href={job.appStore}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-400 text-xs font-mono transition-all hover:scale-105"
                            >
                                <AppStoreIcon />
                                <span>Apple App Store</span>
                                <ExternalLink size={12} className="opacity-70" />
                            </a>
                        )}
                        {job.url && (
                            <a
                                href={job.url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-sm text-secondary hover:underline font-medium ml-auto"
                            >
                                <span>View Certificate/Work</span>
                                <ExternalLink size={12} />
                            </a>
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

const Experience: React.FC = () => {
    const selectedTrack = 'all';

    // Build complete unified experience list combining base resume with domain resumes
    const baseExperiences: UnifiedJob[] = resumeData.experience.map(exp => {
        let playStore: string | null = null;
        let appStore: string | null = null;
        const compLower = exp.company.toLowerCase();

        if (compLower.includes('signyn')) {
            playStore = "https://play.google.com/store/apps/details?id=com.signyards&hl=en_IN";
            appStore = "https://apps.apple.com/us/app/signyn-messenger/id6754750370";
        } else if (compLower.includes('vimovi') || compLower.includes('pyngyn')) {
            playStore = "https://play.google.com/store/apps/details?id=com.pyngyn.io&pcampaignid=web_share";
        }

        return {
            company: exp.company,
            position: exp.position,
            startDate: exp.startDate,
            endDate: exp.endDate,
            highlights: exp.highlights,
            url: (exp as any).url,
            playStore,
            appStore
        };
    });

    // If user filters by a specific track (SDE, Flutter, React Native, etc.)
    const displayedExperiences: UnifiedJob[] = React.useMemo(() => {
        if (selectedTrack === 'all') return baseExperiences;

        const targetResume = resumesList.find(r => r.id === selectedTrack);
        if (!targetResume) return baseExperiences;

        return targetResume.experiences.map(e => {
            const [startDate, endDate] = e.period.includes('–') 
                ? e.period.split('–').map(s => s.trim()) 
                : e.period.split('-').map(s => s.trim());

            return {
                company: e.company || (e.role.includes('Intern') ? 'FreeMemory' : e.role.includes('Teaching Assistant') ? 'Pepcoding' : 'Contract'),
                position: e.role,
                startDate: startDate || e.period,
                endDate: endDate || 'Completed',
                highlights: e.highlights,
                playStore: e.playStore,
                appStore: e.appStore
            };
        });
    }, [selectedTrack, baseExperiences]);

    return (
        <section className="section bg-dark-card/30 relative overflow-hidden" id="experience">
            <SectionBackground variant="experience" />
            <div className="container relative z-10">
                <div className="flex flex-col items-center mb-10 relative">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-title mb-3"
                    >
                        Work <span className="text-primary-light">Experience</span>
                    </motion.h2>
                  



                    {/* Professional Caricature with Glow */}
                    <div className="absolute right-0 top-0 lg:right-10 lg:-top-16 z-0 hidden lg:block opacity-90 pointer-events-none">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-dark blur-[80px] rounded-full transform scale-75" />
                            <motion.img
                                src={`${import.meta.env.BASE_URL}caricature_professional.png`}
                                alt="Professional Manpreet"
                                className="w-48 md:w-64 object-contain drop-shadow-2xl relative z-10 rounded-3xl border border-white/10 shadow-lg bg-dark backdrop-blur-sm opacity-80 cursor-grab active:cursor-grabbing"
                                animate={{ y: [0, -15, 0], rotate: [0, 2, 0] }}
                                whileHover={{ scale: 1.05 }}
                                drag
                                dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </motion.div>
                    </div>
                </div>

                <div className="flex flex-col gap-8 md:gap-10 relative">
                    <AnimatePresence mode="wait">
                        {displayedExperiences.map((job, index) => (
                            <ExperienceItem
                                key={`${selectedTrack}-${job.company}-${index}`}
                                job={job}
                                index={index}
                                total={displayedExperiences.length}
                            />
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default Experience;
