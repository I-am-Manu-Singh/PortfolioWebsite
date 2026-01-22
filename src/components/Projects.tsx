
import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Code } from 'lucide-react';
import { resumeData } from '../data/resume';

const ProjectCard: React.FC<{ project: typeof resumeData.projects[0]; index: number }> = ({ project, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-card p-8 flex flex-col h-full group hover:border-primary/30 transition-colors"
        >
            <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Code size={32} />
                </div>
                <div className="flex gap-3">
                    {project.links.map((link, i) => (
                        <a
                            key={i}
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 hover:bg-white/10 rounded-full transition-colors text-text-muted hover:text-white"
                            title={link.label}
                        >
                            {link.label.toLowerCase().includes('github') || link.label.toLowerCase().includes('repo') ? <Github size={20} /> : <ExternalLink size={20} />}
                        </a>
                    ))}
                </div>
            </div>

            {/* Video Preview */}
            {project.videoId && (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4 border border-white/10 group-hover:border-primary/50 transition-colors">
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${project.videoId}`}
                        title={project.name}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0"
                    ></iframe>
                </div>
            )}

            <h3 className="text-2xl font-bold mb-3 group-hover:text-primary-light transition-colors">{project.name}</h3>
            <p className="text-text-muted mb-6 flex-grow leading-relaxed">
                {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map((tag, i) => (
                    <span key={i} className="text-xs font-mono py-1 px-3 rounded-full bg-white/5 text-secondary border border-white/5">
                        {tag}
                    </span>
                ))}
            </div>
        </motion.div>
    );
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -10 },
    visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
            type: "spring",
            damping: 20,
            stiffness: 100
        }
    }
};

const Projects: React.FC = () => {
    return (
        <section className="section bg-dark-card/30 perspective-1000" id="projects">
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-title text-glow"
                >
                    Selected <span className="gradient-text-animated">Projects</span>
                </motion.h2>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {resumeData.projects.map((project, index) => (
                        <motion.div key={index} variants={cardVariants}>
                            <ProjectCard project={project} index={index} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
