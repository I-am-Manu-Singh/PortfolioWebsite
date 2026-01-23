
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
                 {/* Personal Profile Header - Fun & Complex */}
                 <div className="flex flex-col items-center mb-16 relative">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl mb-6 z-10 bg-dark"
                    >
                        <img
                            src={`${import.meta.env.BASE_URL}profile_person.png`}
                            alt="Personal Profile"
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                        />
                         {/* Fun Overlay/Filter on hover */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay pointer-events-none"></div>
                    </motion.div>

                    {/* Fun Status Badge */}
                    <motion.div 
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 10 }}
                        className="absolute top-10 right-[calc(50%-140px)] bg-yellow-400 text-black font-bold px-3 py-1 rounded-full text-sm shadow-lg z-20 transform rotate-12"
                    >
                        Vibing 🎧
                    </motion.div>
                     <motion.div 
                        initial={{ scale: 0, rotate: 20 }}
                        animate={{ scale: 1, rotate: -10 }}
                        className="absolute bottom-20 left-[calc(50%-140px)] bg-green-500 text-white font-bold px-3 py-1 rounded-full text-sm shadow-lg z-20 transform -rotate-12"
                    >
                        Explorer 🌍
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

                <div className="space-y-16">
                    {/* Music Categories */}
                    {/* Music Categories */}
                    {/* @ts-ignore - interests structure changed */}
                    {resumeData.interests.music.categories.map((category: any, idx: number) => (
                        <div key={idx} className="relative mb-16">
                            <h3 className="text-2xl font-bold mb-6 text-white border-l-4 border-primary pl-4">{category.title}</h3>

                            {/* Caricature Placement Logic */}
                            {category.title.toLowerCase().includes('guitar') && (
                                <motion.div
                                    className="hidden lg:block absolute -right-4 top-0 z-0 cursor-pointer pointer-events-auto"
                                    animate={{ y: [0, -15, 0], rotate: [0, 3, 0] }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                    drag
                                    dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
                                >
                                    <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full transform scale-75" />
                                    <img
                                        src={`${import.meta.env.BASE_URL}caricature_guitar.png`}
                                        alt="Guitarist"
                                        className="w-56 opacity-90 hover:scale-110 transition-transform rounded-3xl border-2 border-white/10 bg-black/20"
                                    />
                                </motion.div>
                            )}

                            {category.title.toLowerCase().includes('piano') && (
                                <motion.div
                                    className="hidden lg:block absolute -right-4 top-0 z-0 cursor-pointer pointer-events-auto"
                                    animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }}
                                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                                    drag
                                    dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
                                >
                                    <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full transform scale-75" />
                                    <img
                                        src={`${import.meta.env.BASE_URL}caricature_piano.png`}
                                        alt="Pianist"
                                        className="w-56 opacity-90 hover:scale-110 transition-transform rounded-3xl border-2 border-white/10 bg-black/20"
                                    />
                                </motion.div>
                            )}

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
