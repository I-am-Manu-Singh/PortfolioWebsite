import React from 'react';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';

import SectionBackground from './SectionBackground';
import SpotifyPlayer from './SpotifyPlayer';

const Interests: React.FC = () => {
    return (
        <section className="section relative overflow-hidden" id="interests">
            {/* Split backgrounds */}
            <div className="absolute inset-x-0 top-0 h-2/3 overflow-hidden">
                <SectionBackground variant="music" className="h-full" />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-2/3 overflow-hidden pointer-events-none">
                <SectionBackground variant="instagram" className="h-full" />
            </div>

            <div className="container relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-title text-center mb-16"
                >
                    Life <span className="text-primary-light">Beyond Code</span>
                </motion.h2>

                <div className="mb-12 text-center max-w-2xl mx-auto">
                    <p className="text-text-muted text-lg leading-relaxed">
                        Music is my escape and my fuel. whether it's jamming on the guitar or finding the perfect melody on the piano, I love the creative freedom it provides.
                    </p>
                </div>


                <div className="space-y-12">
                    {/* SPOTIFY PLAYER SECTION */}
                    <div className="relative mb-20">
                        {/* Floating Caricatures - Positioning relative to the player */}
                        {/* Piano - Left side */}
                        <motion.img
                            src={`${import.meta.env.BASE_URL}caricature_piano.png`}
                            alt="Pianist"
                            className="absolute -left-10 md:-left-20 top-20 w-32 md:w-56 drop-shadow-2xl z-20 pointer-events-none opacity-80" // Reduced opacity here
                            initial={{ x: -100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 0.8 }} // Animate to 0.8
                            viewport={{ once: true }}
                            animate={{ y: [0, 10, 0], rotate: [0, 2, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        />
                        {/* Guitar - Right side */}
                        <motion.img
                            src={`${import.meta.env.BASE_URL}caricature_guitar.png`}
                            alt="Guitarist"
                            className="absolute -right-10 md:-right-20 bottom-20 w-32 md:w-56 drop-shadow-2xl z-20 pointer-events-none opacity-80" // Reduced opacity here
                            initial={{ x: 100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 0.8 }} // Animate to 0.8
                            viewport={{ once: true }}
                            animate={{ y: [0, -10, 0], rotate: [0, -2, 0] }}
                            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                        />

                        <SpotifyPlayer />
                    </div>


                    {/* Spacer to visually separate YouTube/Music from Instagram */}
                    <div className="h-12"></div>

                    {/* Instagram Section */}
                    <div className="pt-16 border-t border-white/10 relative">
                        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
                            <h3 className="text-3xl font-bold flex items-center gap-3 text-white">
                                <span className="p-2 bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 rounded-xl text-white shadow-lg"><Instagram /></span>
                                Life in Frames
                            </h3>
                            <a
                                href="https://www.instagram.com/manu.singh_001/"
                                target="_blank"
                                className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all flex items-center gap-2 font-medium"
                            >
                                <Instagram size={18} /> @manu.singh_001
                            </a>
                        </div>

                        {/* Instagram Grid Mockup - made more visible */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { link: 'https://www.instagram.com/manu.singh_001/p/DT0RPOzknGX/', img: 'https://images.unsplash.com/photo-1607799275518-d58726b1e670?w=400&q=80', caption: 'Code Life' }, // Android/Code
                                { link: 'https://www.instagram.com/manu.singh_001/p/DTSDRz8kuYm/', img: 'https://images.unsplash.com/photo-1552422535-c45813c61732?w=400&q=80', caption: 'Music Vibes' }, // Piano/Music
                                { link: 'https://www.instagram.com/manu.singh_001/', img: 'https://images.unsplash.com/photo-1525609004556-c3f538e3bd33?w=400&q=80', caption: 'Travel' }, // Car/Travel
                                { link: 'https://www.instagram.com/manu.singh_001/', img: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&q=80', caption: 'Lifestyle' }  // Lifestyle
                            ].map((item, i) => (
                                <motion.a
                                    key={i}
                                    href={item.link}
                                    target="_blank"
                                    className="aspect-square bg-dark-card rounded-2xl overflow-hidden relative group border border-white/10 shadow-lg"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                        <div className="text-center">
                                            <Instagram className="text-white mx-auto mb-2" size={32} />
                                            <span className="text-white font-bold text-sm">View Post</span>
                                        </div>
                                    </div>
                                    <img
                                        src={item.img}
                                        alt={item.caption}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Interests;
