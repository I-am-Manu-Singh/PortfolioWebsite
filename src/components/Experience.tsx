
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, ChevronRight } from 'lucide-react';
import { resumeData } from '../data/resume';

const ExperienceItem: React.FC<{ job: typeof resumeData.experience[0]; index: number }> = ({ job, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative pl-8 md:pl-0"
        >
            {/* Timeline Line (Mobile: Left, Desktop: Center) */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-white/10 top-0"></div>
            <div className="md:hidden absolute left-[19px] top-0 w-0.5 h-full bg-white/10"></div>

            {/* Timeline Dot */}
            <div className="absolute left-[10px] md:left-1/2 transform -translate-x-1/2 w-5 h-5 bg-primary rounded-full border-4 border-dark z-10 mt-6 md:mt-6 transition-transform hover:scale-150 duration-300"></div>

            <div className={`md:flex items-center justify-between w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                {/* Empty space for the other side */}
                <div className="hidden md:block w-5/12"></div>

                {/* Content Card */}
                <div className="w-full md:w-5/12 mb-8 md:mb-0">
                    <div className="glass-card p-6 md:p-8 hover:bg-white/5 transition-colors group relative overflow-hidden">
                        {/* Gradient Shine Effect */}
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shine pointer-events-none" />

                        <div className="flex items-center gap-2 text-primary-light mb-2 font-mono text-sm">
                            <Calendar size={14} />
                            <span>{job.startDate} — {job.endDate}</span>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{job.position}</h3>
                        <div className="text-xl text-text-muted mb-4 flex items-center gap-2">
                            <Briefcase size={16} />
                            {job.company}
                        </div>

                        <ul className="space-y-3">
                            {job.highlights.map((highlight, i) => (
                                <li key={i} className="flex gap-3 text-text-muted text-sm leading-relaxed">
                                    <ChevronRight size={16} className="text-primary mt-1 flex-shrink-0" />
                                    <span>{highlight}</span>
                                </li>
                            ))}
                        </ul>

                        {job.url && (
                            <div className="mt-4 pt-4 border-t border-white/5">
                                <a href={job.url} target="_blank" rel="noreferrer" className="text-sm text-secondary hover:underline flex items-center gap-1">
                                    View Certificate/Work
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Experience: React.FC = () => {
    return (
        <section className="section" id="experience">
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-title"
                >
                    Work <span className="text-primary-light">Experience</span>
                </motion.h2>

                <div className="flex flex-col gap-8 md:gap-16 relative">
                    {resumeData.experience.map((job, index) => (
                        <ExperienceItem key={index} job={job} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
