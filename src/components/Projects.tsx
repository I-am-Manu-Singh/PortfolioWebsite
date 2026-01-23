
import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Code } from 'lucide-react';
import { resumeData } from '../data/resume';
import SectionBackground from './SectionBackground';
// import CaricatureCoding from '../assets/caricature_coding_profile.png';

const Projects: React.FC = () => {
    return (
        <section className="section bg-dark-card/30 perspective-1000 relative overflow-hidden" id="projects">
            <SectionBackground variant="projects" />
            <div className="container relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-title text-glow mb-10"
                >
                    Selected <span className="gradient-text-animated">Projects</span>
                </motion.h2>

                {/* Projects Caricature - Reduced Opacity */}
                <div className="hidden lg:block absolute -left-10 top-20 z-0 opacity-30 pointer-events-none">
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <div className="absolute inset-0 bg-primary/10 blur-[50px] rounded-full" />
                        <motion.img
                            src={`${import.meta.env.BASE_URL}caricature_professional.png`}
                            alt="Professional Caricature"
                            className="w-56 object-contain drop-shadow-2xl pointer-events-auto cursor-grab active:cursor-grabbing hover:scale-110 transition-transform rounded-3xl border-2 border-white/10 bg-black/20"
                            animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
                            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                            drag
                            dragConstraints={{ left: -30, right: 30, top: -30, bottom: 30 }}
                        />
                    </motion.div>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        visible: { transition: { staggerChildren: 0.1 } }
                    }}
                >
                    {resumeData.projects.map((project, index) => (
                        <motion.div
                            key={index}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            className="glass-card overflow-hidden group flex flex-col h-full"
                        >
                            <div className="relative overflow-hidden h-40 bg-white/5">
                                <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent opacity-60 z-10" />
                                {project.videoId ? (
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={`https://www.youtube.com/embed/${project.videoId}?controls=0&mute=1`}
                                        title={project.name}
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-white/20">
                                        <Code size={48} />
                                    </div>
                                )}

                                <div className="absolute top-3 right-3 z-20 flex gap-2">
                                    {project.links.map((link, i) => (
                                        <a
                                            key={i}
                                            href={link.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="p-1.5 bg-dark-card/80 backdrop-blur-md rounded-full text-white hover:text-primary transition-colors border border-white/10"
                                            title={link.label}
                                        >
                                            {link.label.toLowerCase().includes('github') ? <Github size={16} /> : <ExternalLink size={16} />}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            <div className="p-5 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-light transition-colors">{project.name}</h3>
                                <p className="text-text-muted text-sm mb-4 line-clamp-3 leading-relaxed">{project.description}</p>

                                <div className="mt-auto">
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.slice(0, 4).map((tag, i) => (
                                            <span key={i} className="text-xs px-2 py-1 rounded bg-white/5 text-secondary font-mono border border-white/5">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
