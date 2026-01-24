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

                {/* Teacher Caricature - Added here */}
                <div className="absolute right-0 top-0 lg:right-10 lg:-top-16 z-0 hidden lg:block pointer-events-none">
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full transform scale-75" />
                        <motion.img
                            src={`${import.meta.env.BASE_URL}caricature_teacher.png`}
                            alt="Teaching Tech"
                            className="w-40 h-40 lg:w-48 lg:h-48 object-contain drop-shadow-2xl relative z-10 hover:scale-110 transition-transform cursor-pointer pointer-events-auto rounded-3xl border-4 border-white shadow-[0_0_20px_rgba(255,255,255,0.3)] bg-white/10 backdrop-blur-sm opacity-80"
                            animate={{ y: [0, -10, 0], rotate: [5, 0, 5] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            drag
                            dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
                        />
                    </motion.div>
                </div>

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
