
import React from 'react';
import { motion } from 'framer-motion';
import { Music, Instagram } from 'lucide-react';
import { resumeData } from '../data/resume';
import CaricatureGuitar from '../assets/caricature_guitar.png';
import CaricaturePiano from '../assets/caricature_piano.png';

const Socials: React.FC = () => {
    return (
        <section className="section bg-dark-card/30 relative overflow-hidden" id="socials">
            {/* Floating Caricatures - Adjusted to not dangle over content */}
            <motion.img
                src={CaricatureGuitar}
                alt="Guitarist"
                className="absolute -left-16 md:left-0 top-10 w-40 md:w-56 opacity-10 pointer-events-none z-0"
                animate={{ y: [0, -15, 0], rotate: [0, 3, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.img
                src={CaricaturePiano}
                alt="Pianist"
                className="absolute -right-16 md:right-0 bottom-10 w-40 md:w-56 opacity-10 pointer-events-none z-0"
                animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }}
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
                    Socials <span className="text-primary-light">& Interests</span>
                </motion.h2>

                <div className="space-y-16">
                    {/* Music Categories */}
                    {/* @ts-ignore - interests structure changed */}
                    {resumeData.interests.music.categories.map((category: any, idx: number) => (
                        <div key={idx}>
                            <h3 className="text-2xl font-bold mb-6 text-white border-l-4 border-primary pl-4">{category.title}</h3>
                            {/* Changed to 3 columns for smaller thumbnails */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                                            <h4 className="font-bold text-white group-hover:text-primary transition-colors text-sm">{playlist.title}</h4>
                                            <div className="p-2 bg-red-600 rounded-full scale-75">
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
                            </h3>
                            <a href="https://www.instagram.com/manu.singh_001/" target="_blank" className="text-sm text-primary hover:underline">View Profile</a>
                        </div>

                        {/* Instagram Grid Mockup - Linking to Profile */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((item) => (
                                <a
                                    key={item}
                                    href="https://www.instagram.com/manu.singh_001/"
                                    target="_blank"
                                    className="aspect-square bg-white/5 rounded-xl overflow-hidden relative group"
                                >
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                        <div className="flex items-center gap-2 text-white font-bold">
                                            <Instagram size={24} />
                                            <span>Follow</span>
                                        </div>
                                    </div>
                                    {/* Using placeholders or maybe previous images if available. For now using generic attractive placeholders */}
                                    <img
                                        src={`https://images.unsplash.com/photo-${item === 1 ? '1511379938547-c1f69419868d' : item === 2 ? '1514320291840-2e0a962a2b43' : item === 3 ? '1506157788536-d241597402dc' : '1507838153419-f4d3656c5253'}?w=400&q=80`}
                                        alt="Instagram Post"
                                        className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500"
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

export default Socials;
