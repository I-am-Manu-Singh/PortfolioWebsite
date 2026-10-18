import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Code, Smartphone } from 'lucide-react';
import { resumeData } from '../data/resume';
import { useTheme } from '../context/ThemeContext';
import SectionBackground from './SectionBackground';

const Projects: React.FC = () => {
    const { theme } = useTheme();
    return (
        <section className="section bg-dark-card/30 perspective-1000 relative overflow-hidden" id="projects">
            <SectionBackground variant="projects" />
            <div className="container relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-14"
                >
                    <h2 className="section-title text-glow mb-4">
                        Featured <span className="gradient-text-animated">Engineering Projects</span>
                    </h2>
                    <p className="text-text-muted text-sm sm:text-base">
                        Production-grade mobile applications, cross-platform audio DAWs, real-time multimedia streaming suites, and enterprise automation hubs built across Kotlin Multiplatform, Flutter, and React Native.
                    </p>
                </motion.div>

                {/* Projects Caricature */}
                <div className="hidden lg:block absolute -left-10 -top-20 z-0 pointer-events-none">
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
                            className="w-56 object-contain drop-shadow-2xl pointer-events-auto cursor-grab active:cursor-grabbing hover:scale-110 transition-transform rounded-3xl border border-white/10 shadow-lg bg-white/10 backdrop-blur-sm opacity-80"
                            animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
                            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                            drag
                            dragConstraints={{ left: -30, right: 30, top: -30, bottom: 30 }}
                            onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
                        />
                    </motion.div>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        visible: { transition: { staggerChildren: 0.08 } }
                    }}
                >
                    {resumeData.projects.map((project, index) => {
                        const logoSrc = project.logo
                            ? (project.logo.startsWith('/') ? `${import.meta.env.BASE_URL}${project.logo.slice(1)}` : project.logo)
                            : null;

                        return (
                            <motion.div
                                key={index}
                                variants={{
                                    hidden: { opacity: 0, y: 25 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                                className="glass-card overflow-hidden group flex flex-col h-full border border-white/5 hover:border-primary/40 transition-all duration-300 shadow-md hover:shadow-primary/10 rounded-2xl bg-dark-card"
                            >
                                {/* Header Media / Logo Banner */}
                                <div className="relative overflow-hidden h-44 bg-gradient-to-br from-white/[0.07] via-white/[0.02] to-transparent p-5 flex items-center justify-center border-b border-white/5">
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent opacity-80 z-10 pointer-events-none" />

                                    {/* App Logo Display with Glow */}
                                    {logoSrc ? (
                                        <div className="relative z-10 flex flex-col items-center justify-center">
                                            <div className="relative group-hover:scale-110 transition-transform duration-300">
                                                <div className="absolute inset-0 bg-primary/25 blur-xl rounded-2xl" />
                                                <img
                                                    src={logoSrc}
                                                    alt={`${project.name} Logo`}
                                                    className={`w-20 h-20 object-contain rounded-2xl shadow-xl relative z-10 border border-white/20 bg-dark-bg/80 p-1.5 ${project.name.toLowerCase().includes("hostel shop") && theme === "light" ? "filter invert contrast-200 brightness-0" : ""}`}
                                                    onError={(e) => {
                                                        (e.target as HTMLElement).style.display = 'none';
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ) : ('videoId' in project && (project as any).videoId) ? (
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={`https://www.youtube.com/embed/${(project as any).videoId}?controls=0&mute=1&loop=1`}
                                            title={project.name}
                                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                        />
                                    ) : (
                                        <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary-light">
                                            <Code size={32} />
                                        </div>
                                    )}

                                    {/* Action Links Pill */}
                                    <div className="absolute top-3 right-3 z-20 flex gap-2">
                                        {project.links?.map((link, i) => (
                                            <a
                                                key={i}
                                                href={link.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="p-2 bg-dark-card/90 backdrop-blur-md rounded-xl text-text/80 hover:text-primary transition-all duration-200 border border-white/10 hover:border-primary/40 shadow-sm"
                                                title={link.label}
                                            >
                                                {link.label.toLowerCase().includes('github') ? (
                                                    <Github size={16} />
                                                ) : link.label.toLowerCase().includes('play store') || link.label.toLowerCase().includes('app store') ? (
                                                    <Smartphone size={16} />
                                                ) : (
                                                    <ExternalLink size={16} />
                                                )}
                                            </a>
                                        ))}
                                    </div>
                                </div>

                                {/* Body Information */}
                                <div className="p-5 flex flex-col flex-grow">
                                    <h3 className="text-lg font-bold text-text mb-2.5 group-hover:text-primary-light transition-colors duration-200 leading-snug">
                                        {project.name}
                                    </h3>
                                    <p className="text-text-muted text-xs sm:text-sm mb-5 line-clamp-4 leading-relaxed font-normal">
                                        {project.description}
                                    </p>

                                    {/* Tags / Skills Chips */}
                                    <div className="mt-auto pt-3 border-t border-white/5 flex flex-col gap-3">
                                        <div className="flex flex-wrap gap-1.5">
                                            {project.tags.map((tag, i) => (
                                                <span
                                                    key={i}
                                                    className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] text-secondary-light border border-white/10 hover:border-primary/30 transition-colors"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {project.links && project.links.length > 0 && (
                                            <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                                                {project.links.map((link, i) => (
                                                    <a
                                                        key={i}
                                                        href={link.url}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-primary-light hover:text-white px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 border border-primary/20 transition-all"
                                                    >
                                                        <Github size={14} />
                                                        <span>{link.label}</span>
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
