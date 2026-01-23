import React from 'react';
import { motion } from 'framer-motion';
import { Youtube } from 'lucide-react';
import { resumeData } from '../data/resume';

const TechTutorials: React.FC = () => {
    return (
        <section className="section" id="tech-tutorials">
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-title mb-12 flex items-center justify-center gap-3"
                >
                    <span className="p-2 bg-red-600 rounded-lg text-white shadow-lg shadow-red-600/20"><Youtube size={32} /></span>
                    Tech <span className="text-primary-light">Tutorials</span> & Solutions
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* @ts-ignore */}
                    {resumeData.techPlaylists?.map((playlist: any, index: number) => (
                        <motion.div
                            key={index}
                            className="glass-card overflow-hidden group"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="relative w-full aspect-video">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/videoseries?list=${playlist.id}`}
                                    title={playlist.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="absolute inset-0"
                                ></iframe>
                            </div>
                            <div className="p-4 bg-white/5">
                                <h4 className="font-bold text-white group-hover:text-primary transition-colors">{playlist.title}</h4>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechTutorials;
