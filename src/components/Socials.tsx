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
        <section className="min-h-screen flex items-center justify-center bg-dark-card/30 relative overflow-hidden" id="socials">

            <SectionBackground variant="music" />

            {/* Background decoration */}
            <div className="absolute -right-20 top-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>

            <div className="container max-w-6xl mx-auto px-4 md:px-6 relative z-20">
                {/* Personal Profile Header - Aligned to Hero for perfect overlap */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    {/* Left Column: Text & Stats */}
                    <div className="order-2 md:order-1 flex flex-col items-start text-left space-y-6">
                        <div className="relative">
                            <motion.div
                                initial={{ scale: 0, rotate: -20 }}
                                animate={{ scale: 1, rotate: 0 }}
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

                        {/* Social Stats Buttons - Updated: YouTube & Instagram */}
                        <div className="flex flex-wrap gap-4 w-full">
                            {/* YouTube */}
                            <a href={resumeData.youtube.channel} target="_blank" className="flex-1 min-w-[140px] bg-red-600/10 border border-red-500/30 hover:bg-red-600/20 p-4 rounded-xl flex flex-col items-center gap-2 group transition-all">
                                <div className="p-2 bg-red-600 text-white rounded-full group-hover:scale-110 transition-transform">
                                    <Youtube size={20} />
                                </div>
                                <div className="text-center">
                                    <div className="text-xl font-bold text-white group-hover:text-red-400">Subscribe</div>
                                    <div className="text-xs text-white/50">My YouTube Channel</div>
                                </div>
                            </a>

                            {/* Instagram (Replaces LinkedIn) */}
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


                    {/* Right Column: Profile Image (Full Body) */}
                    <div className="order-1 md:order-2 flex flex-col items-center justify-center relative">
                        {/* Music Visualizer Effect Above Image */}
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

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="relative w-full max-w-sm md:max-w-md aspect-[3/4] rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl z-10 bg-dark/50 backdrop-blur-sm group cursor-pointer"
                            whileHover={{ scale: 1.02 }}
                        >
                            {/* Glitch Layers - Red Channel */}
                            <motion.img
                                src={`${import.meta.env.BASE_URL}profile_person.png`}
                                alt="Glitch Red"
                                className="absolute inset-0 w-full h-full object-cover opacity-0 mix-blend-screen filter hue-rotate-90 pointer-events-none"
                                variants={{
                                    hover: {
                                        opacity: [0, 0.8, 0],
                                        x: [-3, 3, -1, 0, 2],
                                        y: [2, -2, 0, 1, -1],
                                        scale: [1, 1.02, 1]
                                    }
                                }}
                                transition={{ duration: 0.2, repeat: Infinity, repeatType: "mirror" }}
                            />

                            {/* Glitch Layers - Blue Channel */}
                            <motion.img
                                src={`${import.meta.env.BASE_URL}profile_person.png`}
                                alt="Glitch Blue"
                                className="absolute inset-0 w-full h-full object-cover opacity-0 mix-blend-screen filter hue-rotate-180 pointer-events-none"
                                variants={{
                                    hover: {
                                        opacity: [0, 0.8, 0],
                                        x: [3, -3, 1, 0, -2],
                                        y: [-2, 2, 0, -1, 1],
                                        scale: [1, 1.01, 1]
                                    }
                                }}
                                transition={{ duration: 0.2, repeat: Infinity, repeatType: "mirror", delay: 0.05 }}
                            />

                            {/* Main Image - Fixed Aspect Ratio and object-cover */}
                            <img
                                src={`${import.meta.env.BASE_URL}profile_person.png`}
                                alt="Personal Profile"
                                className="relative w-full h-full object-cover transition-transform duration-700 z-10"
                                onError={(e) => {
                                    // Fallback to Work Profile if Personal fails
                                    (e.target as HTMLImageElement).src = `${import.meta.env.BASE_URL}profile.jpg`;
                                }}
                            />

                            {/* Scanline Overlay */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-20 mix-blend-overlay"></div>

                            {/* Glossy Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none z-30"></div>
                        </motion.div>
                    </div>
                </div>

                <div className="space-y-24">
                    {/* Music Categories */}
                    {/* @ts-ignore */}
                    {resumeData.interests.music.categories.map((category: any, idx: number) => (
                        <div key={idx} className="relative mb-16 px-4 md:px-0">
                            <div className="flex items-center justify-between mb-8 relative">
                                <h3 className="text-3xl font-bold text-white border-l-8 border-primary pl-6 py-2 bg-gradient-to-r from-primary/10 to-transparent rounded-r-xl w-full max-w-2xl">
                                    {category.title}
                                </h3>

                                {/* Caricature Placement - Visible, Floating, Boardered, Behind Header */}
                                {category.title.toLowerCase().includes('guitar') && (
                                    <motion.img
                                        src={`${import.meta.env.BASE_URL}caricature_guitar.png`}
                                        alt="Guitarist"
                                        className="absolute right-0 -top-10 w-24 md:w-32 object-contain z-10 border-4 border-white rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.3)] bg-white/10 backdrop-blur-sm opacity-80"
                                        style={{ zIndex: 0 }} // Ensure behind header which should have z-10
                                        animate={{
                                            rotate: [0, 5, 0],
                                            y: [0, -10, 0]
                                        }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                        onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
                                    />
                                )}
                                {category.title.toLowerCase().includes('piano') && (
                                    <motion.img
                                        src={`${import.meta.env.BASE_URL}caricature_piano.png`}
                                        alt="Pianist"
                                        className="absolute right-0 -top-12 w-24 md:w-40 object-contain z-10 border-4 border-white rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.3)] bg-white/10 backdrop-blur-sm opacity-80"
                                        style={{ zIndex: 0 }}
                                        animate={{
                                            rotate: [0, -3, 0],
                                            y: [0, -12, 0]
                                        }}
                                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                        onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
                                    />
                                )}
                                {(category.title.toLowerCase().includes('singing') || category.title.toLowerCase().includes('vocal')) && (
                                    <motion.img
                                        src={`${import.meta.env.BASE_URL}caricature_singing.png`}
                                        alt="Singer"
                                        className="absolute right-0 -top-10 w-24 md:w-32 object-contain z-10 border-4 border-white rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.3)] bg-white/10 backdrop-blur-sm opacity-80"
                                        style={{ zIndex: 0 }}
                                        animate={{
                                            y: [0, -15, 0],
                                            rotate: [0, 2, 0]
                                        }}
                                        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                                        onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
                                    />
                                )}
                            </div>

                            {/* Changed to 3 columns for smaller thumbnails */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pr-0 lg:pr-48 relative z-20">
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
                                        <div className="p-4 bg-white/5 flex justify-between items-center whitespace-normal">
                                            <h4 className="font-bold text-text group-hover:text-primary transition-colors text-sm line-clamp-2">{playlist.title}</h4>
                                            <div className="p-2 bg-red-600 rounded-full scale-75 flex-shrink-0">
                                                <Youtube size={16} className="text-white" />
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
                            {[
                                { link: 'https://www.instagram.com/manu.singh_001/p/DT0RPOzknGX/', img: 'https://images.unsplash.com/photo-1607799275518-d58726b1e670?w=400&q=80', caption: 'Code Life' }, // Android/Code
                                { link: 'https://www.instagram.com/manu.singh_001/p/DTSDRz8kuYm/', img: 'https://images.unsplash.com/photo-1552422535-c45813c61732?w=400&q=80', caption: 'Music Vibes' }, // Piano/Music
                                { link: 'https://www.instagram.com/manu.singh_001/', img: 'https://images.unsplash.com/photo-1525609004556-c3f538e3bd33?w=400&q=80', caption: 'Travel' }, // Car/Travel
                                { link: 'https://www.instagram.com/manu.singh_001/', img: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&q=80', caption: 'Lifestyle' }  // Lifestyle
                            ].map((item, i) => (
                                <a
                                    key={i}
                                    href={item.link}
                                    target="_blank"
                                    className="aspect-square bg-white/5 rounded-xl overflow-hidden relative group"
                                >
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                        <div className="flex items-center gap-2 text-white font-bold">
                                            <Instagram size={24} />
                                            <span>Follow</span>
                                        </div>
                                    </div>
                                    <img
                                        src={item.img}
                                        alt={item.caption}
                                        className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500"
                                    />
                                </a>
                            ))}
                        </div>

                        <div className="flex justify-center mt-8">
                            <a
                                href="https://www.instagram.com/manu.singh_001/"
                                target="_blank"
                                className="px-8 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-full font-bold transition-all shadow-lg shadow-pink-600/20 flex items-center gap-2"
                            >
                                <Instagram size={20} /> Follow on Instagram
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default Socials;
