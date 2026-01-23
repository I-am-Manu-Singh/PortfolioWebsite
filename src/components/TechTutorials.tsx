import React from 'react';
import { motion } from 'framer-motion';
import { Youtube } from 'lucide-react';
import { resumeData } from '../data/resume';
import SectionBackground from './SectionBackground';

const TechTutorials: React.FC = () => {
    return (
        <section className="section bg-dark-card/50 relative overflow-hidden" id="tech-tutorials">
            <SectionBackground variant="tutorials" />
            <div className="container relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-title mb-12 flex items-center justify-center gap-3"
                >
                    <span className="p-2 bg-red-600 rounded-lg text-white shadow-lg shadow-red-600/20"><Youtube size={32} /></span>
                    Tech <span className="text-primary-light">Tutorials</span>
                </motion.h2>

                {/* Piano moved back to Interests */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 relative z-10">
                    {/* @ts-ignore */}
                    {resumeData.techPlaylists?.map((playlist: any, index: number) => (
                        <motion.div
                            key={index}
                            className="glass-card overflow-hidden group flex flex-col"
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
                            <div className="p-4 bg-white/5 flex-grow flex items-center justify-between">
                                <h4 className="font-bold text-white text-sm group-hover:text-primary transition-colors line-clamp-2">{playlist.title}</h4>
                                <a href={`https://www.youtube.com/playlist?list=${playlist.id}`} target="_blank" className="text-red-500 hover:text-white transition-colors"><Youtube size={20} /></a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="flex justify-center mt-10">
                    <a href="https://www.youtube.com/channel/UCyC9lIwchCmfVTHbPsruOBA?sub_confirmation=1" target="_blank" className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-all flex items-center gap-2 shadow-lg hover:shadow-red-600/40 transform hover:-translate-y-1">
                        <Youtube size={20} fill="white" /> Subscribe for more
                    </a>
                </div>
            </div>
        </section>
    );
};

export default TechTutorials;
