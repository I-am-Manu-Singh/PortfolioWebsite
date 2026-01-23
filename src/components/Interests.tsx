import React from 'react';
import { motion } from 'framer-motion';
import { Music, Instagram } from 'lucide-react';
import { resumeData } from '../data/resume';
import CaricatureGuitar from '../assets/caricature_guitar.png';
import CaricaturePiano from '../assets/caricature_piano.png';
import SectionBackground from './SectionBackground';

const Interests: React.FC = () => {
    return (
        <section className="section relative overflow-hidden" id="interests">
            {/* Split backgrounds */}
            <div className="absolute inset-x-0 top-0 h-2/3 overflow-hidden">
                <SectionBackground variant="music" className="h-full" />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1/3 overflow-hidden">
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

                {/* Intro / Guitar */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <h3 className="text-3xl font-bold mb-6 text-secondary font-mono">
                            I pluck strings & <br /> <span className="text-white">create vibes.</span>
                        </h3>
                        <p className="text-text-muted text-lg leading-relaxed">
                            Music is my escape and my fuel. Whether it's jamming on the guitar or finding the perfect melody on the piano, I love the creative freedom it provides.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="flex justify-center"
                    >
                        <img
                            src={CaricatureGuitar}
                            alt="Guitarist"
                            className="w-48 md:w-64 drop-shadow-2xl filter hover:brightness-110 transition-all"
                        />
                    </motion.div>
                </div>


                <div className="space-y-24">
                    {/* Music Categories & Piano */}
                    {/* @ts-ignore - resumeData structure */}
                    {resumeData.interests.music.categories.map((category: any, idx: number) => (
                        <div key={idx} className="relative">
                            <h3 className="text-2xl font-bold mb-8 text-white border-l-4 border-primary pl-4 flex items-center gap-3">
                                {category.title}
                                {category.title.toLowerCase().includes('piano') && <Music size={24} className="text-primary-light animate-bounce" />}
                            </h3>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                                {/* Playlists */}
                                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {category.playlists.map((playlist: any, pIdx: number) => (
                                        <motion.div
                                            key={pIdx}
                                            className="glass-card overflow-hidden group hover:border-primary/50 transition-colors"
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
                                                <h4 className="font-bold text-white text-sm group-hover:text-primary transition-colors">{playlist.title}</h4>
                                                <div className="p-1.5 bg-red-600 rounded-full">
                                                    <Music size={14} className="text-white" />
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Piano Caricature */}
                                <motion.div
                                    className="hidden lg:flex justify-center"
                                    initial={{ x: 50, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
                                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <img
                                        src={CaricaturePiano}
                                        alt="Pianist"
                                        className="w-56 drop-shadow-2xl filter hover:brightness-110 transition-all"
                                    />
                                </motion.div>
                            </div>
                        </div>
                    ))}

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
                            {[1, 2, 3, 4].map((item, i) => (
                                <motion.a
                                    key={item}
                                    href="https://www.instagram.com/manu.singh_001/"
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
                                    {/* Using placeholders that look like real photos */}
                                    <img
                                        src={`https://source.unsplash.com/random/400x400?concert,music,code,travel&sig=${item}`}
                                        alt="Instagram Post"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&q=80';
                                        }}
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
