import React from 'react';
import { motion } from 'framer-motion';
import { Music, Mic, Guitar, Instagram } from 'lucide-react';
import { resumeData } from '../data/resume';
import DynamicYouTube from './DynamicYouTube';
import CaricatureGuitar from '../assets/caricature_guitar.png';
import CaricaturePiano from '../assets/caricature_piano.png';

const Interests: React.FC = () => {
    return (
        <section className="section bg-dark-card/30 relative overflow-hidden" id="interests">
            {/* Floating Caricatures */}
            <motion.img
                src={CaricatureGuitar}
                alt="Guitarist"
                className="absolute -left-10 md:left-10 top-20 w-32 md:w-48 opacity-20 md:opacity-100 pointer-events-none z-0"
                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.img
                src={CaricaturePiano}
                alt="Pianist"
                className="absolute -right-10 md:right-10 bottom-20 w-32 md:w-48 opacity-20 md:opacity-100 pointer-events-none z-0"
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Music Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="glass-card p-8 border-l-4 border-l-secondary flex flex-col justify-between backdrop-blur-md bg-dark/60"
                    >
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-secondary/10 rounded-full text-secondary">
                                    <Music size={32} />
                                </div>
                                <h3 className="text-2xl font-bold">Music & Covers</h3>
                            </div>
                            <p className="text-text-muted text-lg mb-6 leading-relaxed">
                                When I'm not debugging code, I'm jamming on my guitar or piano.
                                Music is my creative escape—I play <strong>Acoustic & Electric Guitar</strong> and <strong>Piano</strong>,
                                often recording covers for my YouTube channel.
                            </p>
                        </div>

                        {/* Dynamic YouTube Feed for Music */}
                        <DynamicYouTube channelId="UCyC9lIwchCmfVTHbPsruOBA" title="My Latest Cover" />

                        <div className="flex gap-4 flex-wrap mt-6">
                            <a
                                href={resumeData.youtube.channel}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-colors text-white"
                            >
                                <Mic size={18} /> Music Channel
                            </a>
                            {/* Instagram Button */}
                            <a
                                href="https://www.instagram.com/manu.singh_001/"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 rounded-full transition-opacity text-white border border-white/10 shadow-lg"
                            >
                                <Instagram size={18} /> Instagram
                            </a>
                        </div>
                    </motion.div>

                    {/* Visual/Image Placeholder or Icons Grid */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col justify-center items-center gap-8 p-8"
                    >
                        <div className="flex gap-8 text-primary-light/40">
                            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}>
                                <Guitar size={80} strokeWidth={1} />
                            </motion.div>
                            <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }}>
                                <Music size={60} strokeWidth={1} />
                            </motion.div>
                        </div>
                        <p className="text-center text-text-muted italic max-w-sm">
                            "Music gives a soul to the universe, wings to the mind, flight to the imagination and life to everything."
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Interests;
