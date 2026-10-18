import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resume';
import SectionBackground from './SectionBackground';

const CodingProfile: React.FC = () => {
    return (
        <section className="section bg-dark relative overflow-hidden" id="coding-profile">
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
                        className="absolute right-0 top-0 lg:-right-10 lg:-top-10 z-0 hidden lg:block pointer-events-none"
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full transform scale-75" />
                        <motion.img
                            src={`${import.meta.env.BASE_URL}caricature_coding_profile.png`}
                            alt="Coding"
                            className="w-40 md:w-56 object-contain drop-shadow-xl relative z-0 pointer-events-auto cursor-grab active:cursor-grabbing hover:scale-110 transition-transform rounded-3xl border border-dark bg-white/5 backdrop-blur-sm"
                            animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
                            drag
                            dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg';
                                (e.target as HTMLImageElement).classList.add('p-8', 'bg-white/10');
                            }}
                        />
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* GitHub Stats - Transparent Container */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="p-6 md:p-8 rounded-2xl border border-dark bg-transparent flex flex-col items-center relative z-10"
                    >
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-text font-outfit">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" className="w-6 h-6 bg-white rounded-full p-0.5" alt="GitHub" />
                            GitHub Contributions
                        </h3>
                        <div className="w-full overflow-x-auto flex justify-center py-2">
                            <a href={resumeData.basics.profiles[1].url} target="_blank" rel="noreferrer">
                                <img
                                    src={`https://ghchart.rshah.org/4dabf5/${resumeData.basics.profiles[1].username}`}
                                    alt="GitHub Contributions"
                                    className="w-full min-w-[300px]"
                                />
                            </a>
                        </div>
                        <a 
                            href={resumeData.basics.profiles[1].url} 
                            target="_blank" 
                            rel="noreferrer"
                            className="mt-6 px-6 py-2.5 bg-dark-card hover:bg-dark border border-dark text-text rounded-full text-xs font-mono font-bold transition-all flex items-center gap-2 shadow-sm"
                        >
                            View GitHub Profile
                        </a>
                    </motion.div>

                    {/* LeetCode Stats - Transparent Container */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="p-6 md:p-8 rounded-2xl border border-dark bg-transparent flex flex-col items-center relative z-10"
                    >
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-[#FFA116] font-outfit">
                            <span className="p-1.5 rounded-lg bg-[#FFA116]/15 text-[#FFA116] border border-[#FFA116]/30 flex items-center justify-center"><svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" className="text-current">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 4.818 3.821c.287.034.576.053.864.055.228 0 .456-.011.683-.033.432-.04.86-.132 1.272-.273a5.88 5.88 0 0 0 1.936-1.196l3.86-4.135 5.405-5.787a1.379 1.379 0 0 0-1.009-2.321 1.373 1.373 0 0 0-.962.438l-4.444 4.757a3.07 3.07 0 0 1-2.146.974 3.064 3.064 0 0 1-2.146-.974l-4.44-4.756a1.378 1.378 0 0 0-1.971 0 1.374 1.374 0 0 0 0 1.971l4.44 4.756a5.814 5.814 0 0 0 4.117 1.867 5.82 5.82 0 0 0 4.117-1.867l4.444-4.757A1.373 1.373 0 0 0 13.483 0zm-2.88 18.118a1.375 1.375 0 0 0-.962.438l-4.44 4.756a1.378 1.378 0 0 0 0 1.971 1.374 1.374 0 0 0 1.971 0l4.44-4.756a1.379 1.379 0 0 0-1.009-2.409z" />
</svg></span>
                            LeetCode Stats
                        </h3>
                        <div className="w-full flex justify-center py-2">
                            <a href={resumeData.basics.profiles[2].url} target="_blank" rel="noreferrer" className="w-full max-w-[420px]">
                                <img
                                    src={`https://leetcard.jacoblin.cool/${resumeData.basics.profiles[2].username}?theme=dark&font=Space%20Grotesk&ext=heatmap`}
                                    alt="LeetCode Stats"
                                    className="w-full"
                                />
                            </a>
                        </div>
                        <a 
                            href={resumeData.basics.profiles[2].url} 
                            target="_blank" 
                            rel="noreferrer"
                            className="mt-6 px-6 py-2.5 bg-[#FFA116]/10 hover:bg-[#FFA116]/20 text-[#FFA116] rounded-full text-xs font-mono font-bold transition-all flex items-center gap-2 border border-[#FFA116]/30 shadow-sm"
                        >
                            View LeetCode Profile
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CodingProfile;
