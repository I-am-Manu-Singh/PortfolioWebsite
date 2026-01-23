
import React from 'react';
import { motion } from 'framer-motion';
import { Music, Instagram, ArrowLeft } from 'lucide-react';
import { resumeData } from '../data/resume';


import SectionBackground from './SectionBackground';

interface SocialsProps {
    onBack?: () => void;
}

const Socials: React.FC<SocialsProps> = ({ onBack }) => {
    return (
        <section className="section bg-dark-card/30 relative overflow-hidden flex flex-col" id="socials">
            {/* Back Button */}
            <div className="absolute top-20 left-4 z-50 lg:left-8">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-white/70 hover:text-white transition-all bg-black/20 hover:bg-primary/20 px-4 py-2 rounded-full backdrop-blur-md border border-white/10"
                >
                    <ArrowLeft size={18} />
                    <span className="font-medium">Back to Work</span>
                </button>
            </div>

            <SectionBackground variant="music" />
            {/* Floating Caricatures - Adjusted to not dangle over content */}
            {/* Floating Caricatures - More visible and interactive */}
            {/* Floating Caricatures - More visible and interactive */}
            {/* Caricatures moved inside sections for better placement */}

            {/* Background decoration */}
            <div className="absolute -right-20 top-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>

            <div className="container relative z-20 pt-24">
                {/* Personal Profile Header - Full Body & Visualizer */}
                <div className="flex flex-col items-center mb-16 relative">
                    {/* Music Visualizer Effect */}
                    <div className="flex items-end gap-1 mb-4 h-12">
                        {[...Array(12)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-2 bg-primary rounded-t-full"
                                animate={{ height: [10, 30 + Math.random() * 20, 10] }}
                                transition={{ duration: 0.5 + Math.random() * 0.5, repeat: Infinity, ease: "easeInOut" }}
                            />
                        ))}
                    </div>

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="relative w-64 md:w-72 rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl mb-8 z-10 bg-dark/50 backdrop-blur-sm group cursor-pointer"
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

                        {/* Main Image */}
                        <img
                            src={`${import.meta.env.BASE_URL}profile_person.png`}
                            alt="Personal Profile"
                            className="relative w-full h-auto object-cover transition-transform duration-700 z-10"
                        />

                        {/* Scanline Overlay */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-20 mix-blend-overlay"></div>

                        {/* Glossy Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none z-30"></div>
                    </motion.div>

                    {/* Fun Status Badge */}
                    <motion.div
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 10 }}
                        className="absolute top-20 right-10 md:right-[calc(50%-180px)] bg-yellow-400 text-black font-bold px-4 py-2 rounded-full text-sm shadow-lg z-20 transform rotate-12"
                    >
                        Vibing 🎧
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-title text-center"
                    >
                        Socials <span className="text-primary-light">& Interests</span>
                    </motion.h2>
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

                                {/* Caricature Placement - Near Title */}
                                {category.title.toLowerCase().includes('guitar') && (
                                    <motion.img
                                        src={`${import.meta.env.BASE_URL}caricature_guitar.png`}
                                        alt="Guitarist"
                                        className="absolute right-0 -top-10 w-32 md:w-48 object-contain drop-shadow-xl z-20 opacity-90 hidden sm:block"
                                        animate={{ rotate: [0, 5, 0] }}
                                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                )}
                                {category.title.toLowerCase().includes('piano') && (
                                    <motion.img
                                        src={`${import.meta.env.BASE_URL}caricature_piano.png`}
                                        alt="Pianist"
                                        className="absolute right-0 -top-12 w-32 md:w-56 object-contain drop-shadow-xl z-20 opacity-90 hidden sm:block"
                                        animate={{ rotate: [0, -3, 0] }}
                                        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                )}
                                {(category.title.toLowerCase().includes('singing') || category.title.toLowerCase().includes('vocal')) && (
                                    <motion.img
                                        src={`${import.meta.env.BASE_URL}caricature_singing.png`}
                                        alt="Singer"
                                        className="absolute right-0 -top-10 w-32 md:w-48 object-contain drop-shadow-xl z-20 opacity-90 hidden sm:block"
                                        animate={{ y: [0, -5, 0] }}
                                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                )}
                            </div>

                            {/* Changed to 3 columns for smaller thumbnails */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pr-0 lg:pr-48">
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
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Socials;
