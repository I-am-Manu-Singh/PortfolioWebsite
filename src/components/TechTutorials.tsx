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
                    <a href="https://www.youtube.com/channel/UCyC9lIwchCmfVTHbPsruOBA?sub_confirmation=1" target="_blank" className="ml-4 px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-full transition-colors flex items-center gap-2">
                        <Youtube size={16} fill="white" /> Subscribe
                    </a>
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
