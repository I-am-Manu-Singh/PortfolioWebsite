import React from 'react';
import { motion } from 'framer-motion';
import { Music, Instagram } from 'lucide-react';
import { resumeData } from '../data/resume';
import CaricatureGuitar from '../assets/caricature_guitar.png';
import CaricaturePiano from '../assets/caricature_piano.png';

const Interests: React.FC = () => {
    return (
        <section className="section bg-dark-card/30 relative overflow-hidden" id="interests">
            {/* Floating Caricatures */}
            <motion.img
                src={CaricatureGuitar}
                alt="Guitarist"
                className="absolute -left-10 md:left-10 top-20 w-32 md:w-48 opacity-40 md:opacity-80 pointer-events-none z-0 mix-blend-overlay md:mix-blend-normal"
                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.img
                src={CaricaturePiano}
                alt="Pianist"
                className="absolute -right-10 md:right-10 bottom-20 w-32 md:w-48 opacity-40 md:opacity-80 pointer-events-none z-0 mix-blend-overlay md:mix-blend-normal"
                animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Background decoration */}
            <div className="absolute -right-20 top-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>

            <div className="container relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-title"
                >
                    Life <span className="text-primary-light">Beyond Code</span>
                </motion.h2>

                <div className="space-y-16">
                    {/* Music Categories */}
                    {/* @ts-ignore - interests structure changed */}
                    {resumeData.interests.music.categories.map((category: any, idx: number) => (
                        <div key={idx}>
                            <h3 className="text-2xl font-bold mb-6 text-white border-l-4 border-primary pl-4">{category.title}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {category.playlists.map((playlist: any, pIdx: number) => (
                                    <motion.div
                                        key={pIdx}
                                        className="glass-card overflow-hidden group"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: pIdx * 0.1 }}
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
                                        <div className="p-4 bg-white/5 flex justify-between items-center">
                                            <h4 className="font-bold text-white group-hover:text-primary transition-colors">{playlist.title}</h4>
                                            <div className="p-2 bg-red-600 rounded-full">
                                                <Music size={16} className="text-white" />
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Instagram Section */}
                    <div className="pt-10 border-t border-white/10">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-bold flex items-center gap-2 text-white">
                                <Instagram className="text-pink-500" /> Instagram Feed
                                <a href="https://www.instagram.com/manu.singh_001/" target="_blank" className="ml-2 px-3 py-1 bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold rounded-full transition-colors">Follow</a>
                            </h3>
                            <a href="https://www.instagram.com/manu.singh_001/" target="_blank" className="text-sm text-primary hover:underline">View Profile</a>
                        </div>

                        {/* Instagram Grid Mockup */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((item) => (
                                <a
                                    key={item}
                                    href="https://www.instagram.com/manu.singh_001/"
                                    target="_blank"
                                    className="aspect-square bg-white/5 rounded-xl overflow-hidden relative group"
                                >
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Instagram className="text-white" />
                                    </div>
                                    <img
                                        src={`https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&q=80`}
                                        alt="Instagram Post"
                                        className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-500"
                                    />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Interests;
