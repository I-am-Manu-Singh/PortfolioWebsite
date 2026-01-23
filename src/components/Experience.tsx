
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, ChevronRight } from 'lucide-react';
import { resumeData } from '../data/resume';

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

import CaricatureProfessional from '../assets/caricature_professional.png';

// ... (existing imports)

const Experience: React.FC = () => {
    return (
        <section className="section" id="experience">
            <div className="container relative">
                <div className="flex justify-center items-center mb-16 relative">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-title mb-0"
                    >
                        Work <span className="text-primary-light">Experience</span>
                    </motion.h2>

                    {/* Professional Caricature */}
                    <motion.div
                        className="absolute -right-4 top-0 lg:right-20 lg:-top-6 z-10 hidden md:block"
                        initial={{ scale: 0, rotate: -10 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    >
                        <img
                            src={CaricatureProfessional}
                            alt="Professional"
                            className="w-24 h-24 lg:w-32 lg:h-32 object-contain drop-shadow-xl hover:scale-110 transition-transform"
                        />
                    </motion.div>
                </div>

                <div className="flex flex-col gap-8 md:gap-10 relative">
                    {resumeData.experience.map((job, index) => (
                        <ExperienceItem key={index} job={job} index={index} />
                    ))}
                </div>

                {/* LinkedIn Featured Section */}
                <div className="mt-20 pt-10 border-t border-white/10">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-bold flex items-center gap-2 text-white">
                            <span className="p-2 bg-[#0077b5] rounded-md text-white"><Briefcase size={20} /></span>
                            LinkedIn Featured
                        </h3>
                        <a href="https://www.linkedin.com/in/manpreetsingh-android/" target="_blank" className="text-sm text-primary hover:underline">View Profile</a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.a
                            href="https://www.linkedin.com/in/manpreetsingh-android/"
                            target="_blank"
                            className="glass-card p-6 hover:bg-white/5 transition-all group"
                            whileHover={{ y: -5 }}
                        >
                            <div className="flex items-start gap-4">
                                <img
                                    src="https://media.licdn.com/dms/image/v2/D5603AQGjCltwOpw8Tw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1718261309867?e=1743033600&v=beta&t=M_eKaaDJKXGvP3BNyC0tbwbNYjWUAoN8DdXyD7TBw_o"
                                    alt="Profile"
                                    className="w-12 h-12 rounded-full border-2 border-primary"
                                />
                                <div>
                                    <h4 className="font-bold text-white group-hover:text-primary transition-colors">Manpreet Singh</h4>
                                    <p className="text-xs text-text-muted mb-2">Android Developer | KMP | React Native</p>
                                    <p className="text-sm text-gray-300 line-clamp-3">
                                        Check out my latest updates, project showcases, and technical articles on LinkedIn. I regularly share insights about Android Development, Jetpack Compose, and Kotlin Multiplatform.
                                    </p>
                                </div>
                            </div>
                        </motion.a>

                        {/* Placeholder for a specific post or achievement */}
                        <motion.div
                            className="glass-card p-6 flex flex-col justify-center items-center text-center hover:bg-white/5 transition-all cursor-pointer"
                            whileHover={{ scale: 1.02 }}
                            onClick={() => window.open("https://www.linkedin.com/in/manpreetsingh-android/", "_blank")}
                        >
                            <div className="mb-3 p-3 bg-white/5 rounded-full">
                                <Briefcase size={24} className="text-primary-light" />
                            </div>
                            <h4 className="font-bold text-white mb-1">Open for Opportunities</h4>
                            <p className="text-sm text-text-muted">
                                Connect with me to discuss potential collaborations or job roles.
                            </p>
                        </motion.div>
                    </div>

                </div>


            </div>
        </section>
    );
};

export default Experience; 
