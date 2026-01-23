
import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resume';

import SectionBackground from './SectionBackground';
// import CaricatureCoding from '../assets/caricature_coding_profile.png';

const CodingProfile: React.FC = () => {
    return (
        <section className="section relative overflow-hidden" id="coding-profile">
            <SectionBackground variant="coding" />
            <div className="container relative z-10">
                <div className="flex justify-center items-center mb-12 relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-title mb-0"
                    >
                        Coding <span className="text-primary-light">Profile</span>
                    </motion.h2>

                    {/* Floating Coding Caricature */}
                    <motion.div
                        className="absolute right-0 top-0 lg:right-10 lg:-top-10 z-0 hidden lg:block opacity-30 pointer-events-none"
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full transform scale-75" />
                        <motion.img
                            src={`${import.meta.env.BASE_URL}caricature_coding_profile.png`}
                            alt="Coding"
                            className="w-40 md:w-56 object-contain drop-shadow-2xl relative z-10 pointer-events-auto cursor-grab active:cursor-grabbing hover:scale-110 transition-transform rounded-3xl border-2 border-white/10 bg-black/20"
                            animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
                            drag
                            dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg'; // Fallback to GitHub icon
                                (e.target as HTMLImageElement).classList.add('p-8', 'bg-white/10');
                            }}
                        />
                    </motion.div>


                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* GitHub Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="glass-card p-6 flex flex-col items-center"
                    >
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" className="w-6 h-6 bg-white rounded-full" alt="GitHub" />
                            GitHub Contributions
                        </h3>
                        <div className="w-full overflow-x-auto flex justify-center">
                            <a href={resumeData.basics.profiles[1].url} target="_blank" rel="noreferrer">
                                <img
                                    src={`https://ghchart.rshah.org/4dabf5/${resumeData.basics.profiles[1].username}`}
                                    alt="GitHub Contributions"
                                    className="w-full min-w-[300px]"
                                />
                            </a>
                        </div>
                    </motion.div>

                    {/* LeetCode Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="glass-card p-6 flex flex-col items-center"
                    >
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-[#FFA116]">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/8/8e/LeetCode_Logo_1.png" alt="LeetCode" className="w-6 h-6 object-contain" />
                            LeetCode Stats
                        </h3>
                        <div className="w-full flex justify-center">
                            <a href={resumeData.basics.profiles[2].url} target="_blank" rel="noreferrer" className="w-full max-w-[400px]">
                                <img
                                    src={`https://leetcard.jacoblin.cool/${resumeData.basics.profiles[2].username}?theme=dark&font=Space%20Grotesk&ext=heatmap`}
                                    alt="LeetCode Stats"
                                    className="w-full"
                                />
                            </a>
                        </div>
                    </motion.div>
                </div>


            </div>
        </section >
    );
};

export default CodingProfile;
