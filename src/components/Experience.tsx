
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, ChevronRight } from 'lucide-react';
import { resumeData } from '../data/resume';

import SectionBackground from './SectionBackground';

const ExperienceItem: React.FC<{
    job: {
        company: string;
        position: string;
        startDate: string;
        endDate: string;
        highlights: string[];
        url?: string
    }; index: number
}> = ({ job, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative pl-8 md:pl-10"
        >
            {/* Timeline Line (Left Side) */}
            <div className={`absolute left-0 top-0 w-0.5 h-full bg-white/10 ${index === resumeData.experience.length - 1 ? 'h-0' : ''}`}></div>

            {/* Timeline Dot */}
            <div className="absolute left-[-5px] top-0 w-3 h-3 bg-primary rounded-full z-10 mt-6 ring-4 ring-dark"></div>

            <div className="glass-card p-5 hover:bg-white/5 transition-colors group relative overflow-hidden">
                {/* Gradient Shine Effect */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shine pointer-events-none" />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                    <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{job.position}</h3>
                        <div className="text-lg text-text-muted flex items-center gap-2 font-medium">
                            <Briefcase size={16} className="text-secondary" />
                            {job.company}
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-primary-light font-mono text-sm bg-primary/10 px-3 py-1 rounded-full self-start md:self-auto">
                        <Calendar size={14} />
                        <span>{job.startDate} — {job.endDate}</span>
                    </div>
                </div>

                <ul className="space-y-2 mb-4">
                    {job.highlights.map((highlight, i) => (
                        <li key={i} className="flex gap-3 text-text-muted text-sm leading-relaxed">
                            <ChevronRight size={16} className="text-primary mt-0.5 flex-shrink-0" />
                            <span>{highlight}</span>
                        </li>
                    ))}
                </ul>

                {job.url && (
                    <div className="pt-3 border-t border-white/5">
                        <a href={job.url} target="_blank" rel="noreferrer" className="text-sm text-secondary hover:underline flex items-center gap-1 font-medium">
                            View Certificate/Work
                        </a>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

const Experience: React.FC = () => {
    return (
        <section className="section bg-dark-card/30 relative overflow-hidden" id="experience">
            <SectionBackground variant="experience" />
            <div className="container relative z-10">
                <div className="flex justify-center items-center mb-16 relative">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-title mb-0"
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
                            {/* Spotlight Glow matches Interests */}
                            <div className="absolute inset-0 bg-white/10 blur-[80px] rounded-full transform scale-75" />
                            <motion.img
                                src="/caricature_professional.png"
                                alt="Professional Manpreet"
                                className="w-48 md:w-64 object-contain drop-shadow-2xl relative z-10 rounded-3xl border-4 border-white/20 cursor-grab active:cursor-grabbing"
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
                    {resumeData.experience.map((job, index) => (
                        <ExperienceItem key={index} job={job} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
