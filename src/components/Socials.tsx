import React from 'react';
import { motion } from 'framer-motion';
import { Youtube, Instagram } from 'lucide-react';
import { resumeData } from '../data/resume';


import SectionBackground from './SectionBackground';
import SpotifyPlayer from './SpotifyPlayer';

interface SocialsProps {
}

const Socials: React.FC<SocialsProps> = () => {
    return (
        <div className="relative overflow-hidden" id="socials">
            <SectionBackground variant="music" />

            {/* SECTION 1: Personal Profile Header (1:1 Twin of Hero) */}
            <section className="min-h-screen flex items-center justify-center relative z-20">
                <div className="container max-w-6xl mx-auto px-4 md:px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    {/* Left Column: Text & Stats */}
                    <div className="order-2 md:order-1 flex flex-col items-start text-left space-y-6">
                        <div className="relative">
                            <motion.div
                                initial={{ scale: 0, rotate: -20 }}
                                whileInView={{ scale: 1, rotate: 0 }}
                                viewport={{ once: true }}
                                className="absolute -top-10 -left-6 bg-yellow-400 text-black font-bold px-4 py-1 rounded-full text-sm shadow-lg z-20 transform -rotate-12"
                            >
                                Vibing 🎧
                            </motion.div>
                            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-2">
                                Socials <span className="text-primary-light">& Interests</span>
                            </h2>
                            <p className="text-xl text-white/60 max-w-lg leading-relaxed">
                                Beyond the code, I'm a musician, an introvert , and a tech enthusiast.
                                Exploring the world one beat at a time.
                            </p>
                        </div>

                        {/* Social Stats Buttons */}
                        <div className="flex flex-wrap gap-4 w-full">
                            <a href={resumeData.youtube.channel} target="_blank" className="flex-1 min-w-[140px] bg-red-600/10 border border-red-500/30 hover:bg-red-600/20 p-4 rounded-xl flex flex-col items-center gap-2 group transition-all">
                                <div className="p-2 bg-red-600 text-white rounded-full group-hover:scale-110 transition-transform">
                                    <Youtube size={20} />
                                </div>
                                <div className="text-center">
                                    <div className="text-xl font-bold text-white group-hover:text-red-400">Subscribe</div>
                                    <div className="text-xs text-white/50">My YouTube Channel</div>
                                </div>
                            </a>

                            <a href="https://www.instagram.com/manu.singh_001/" target="_blank" className="flex-1 min-w-[140px] bg-pink-600/10 border border-pink-500/30 hover:bg-pink-600/20 p-4 rounded-xl flex flex-col items-center gap-2 group transition-all">
                                <div className="p-2 bg-pink-600 text-white rounded-full group-hover:scale-110 transition-transform">
                                    <Instagram size={20} />
                                </div>
                                <div className="text-center">
                                    <div className="text-xl font-bold text-white group-hover:text-pink-400">Follow</div>
                                    <div className="text-xs text-white/50">On Instagram</div>
                                </div>
                            </a>
                        </div>

                        {/* Spotify Activity */}
                        <div className="w-full pt-6">
                            <SpotifyPlayer />
                        </div>
                    </div>

                    {/* Right Column: Profile Image (1:1 Alignment Wrapper) */}
                    <div className="order-1 md:order-2 flex flex-col items-center justify-center relative">
                        {/* Music Visualizer Above */}
                        <div className="flex items-end gap-1 mb-2 h-8 absolute -top-10 left-1/2 transform -translate-x-1/2">
                            {[...Array(12)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="w-1.5 bg-primary rounded-t-full"
                                    animate={{ height: [5, 20 + Math.random() * 15, 5] }}
                                    transition={{ duration: 0.4 + Math.random() * 0.4, repeat: Infinity, ease: "easeInOut" }}
                                />
                            ))}
                        </div>

                        <div className="relative w-full max-w-sm md:max-w-md mx-auto aspect-[3/4] rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl z-10 bg-dark/50 backdrop-blur-sm group cursor-pointer">
                            {/* Glitch Layers */}
                            <motion.img
                                src={`${import.meta.env.BASE_URL}profile_person.png`}
                                alt="Glitch Red"
                                className="absolute inset-0 w-full h-full object-cover opacity-0 mix-blend-screen filter hue-rotate-90 pointer-events-none"
                                whileHover={{ opacity: [0, 0.8, 0], x: [-3, 3, -1, 0, 2], y: [2, -2, 0, 1, -1] }}
                                transition={{ duration: 0.2, repeat: Infinity }}
                            />

                            {/* Main Image - Precise Alignment with Hero */}
                            <img
                                src={`${import.meta.env.BASE_URL}profile_person.png`}
                                alt="Personal Profile"
                                className="w-full h-full object-cover object-top transition-transform duration-700"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = `${import.meta.env.BASE_URL}profile.jpg`;
                                }}
                            />

                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-20 mix-blend-overlay"></div>
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none z-30"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 2: Sub-content (Interests & Playlists) */}
            <div className="container max-w-6xl mx-auto px-4 md:px-6 relative z-20 pb-24 space-y-24">
                {/* Music Categories */}
                {/* @ts-ignore */}
                {resumeData.interests.music.categories.map((category: any, idx: number) => (
                    <div key={idx} className="relative mb-16">
                        <div className="flex items-center justify-between mb-8 relative">
                            <h3 className="text-3xl font-bold text-white border-l-8 border-primary pl-6 py-2 bg-gradient-to-r from-primary/10 to-transparent rounded-r-xl w-full max-w-2xl">
                                {category.title}
                            </h3>

                            {/* Caricatures */}
                            {category.title.toLowerCase().includes('guitar') && (
                                <motion.img
                                    src={`${import.meta.env.BASE_URL}caricature_guitar.png`}
                                    alt="Guitarist"
                                    className="absolute right-0 -top-10 w-24 md:w-32 object-contain z-10 border-4 border-white rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.3)] bg-white/10 backdrop-blur-sm"
                                    animate={{ rotate: [0, 5, 0], y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
                                />
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-20">
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
                                        <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/videoseries?list=${playlist.id}`} title={playlist.title} frameBorder="0" allowFullScreen className="absolute inset-0"></iframe>
                                    </div>
                                    <div className="p-4 bg-white/5 flex justify-between items-center">
                                        <h4 className="font-bold text-text group-hover:text-primary transition-colors text-sm line-clamp-2">{playlist.title}</h4>
                                        <Youtube size={16} className="text-red-500" />
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
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { link: 'https://www.instagram.com/manu.singh_001/p/DTSDRz8kuYm/', img: 'https://images.unsplash.com/photo-1607799275518-d58726b1e670?w=400&q=80' },
                            { link: 'https://www.instagram.com/manu.singh_001/p/DTYWAtNkq7T/', img: 'https://images.unsplash.com/photo-1552422535-c45813c61732?w=400&q=80' },
                            { link: 'https://www.instagram.com/manu.singh_001/p/DT0RPOzknGX/', img: 'https://images.unsplash.com/photo-1525609004556-c3f538e3bd33?w=400&q=80' },
                            { link: 'https://www.instagram.com/manu.singh_001/', img: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&q=80' }
                        ].map((item, i) => (
                            <a key={i} href={item.link} target="_blank" className="aspect-square bg-white/5 rounded-xl overflow-hidden relative group">
                                <img src={item.img} className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Socials;
