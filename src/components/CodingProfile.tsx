
import React from 'react';
import { motion } from 'framer-motion';
import { Youtube } from 'lucide-react';
import { resumeData } from '../data/resume';
import DynamicMedium from './DynamicMedium';
import DynamicYouTube from './DynamicYouTube';
import CaricatureTeacher from '../assets/caricature_teacher.png';

const CodingProfile: React.FC = () => {
    return (
        <section className="section" id="coding-profile">
            <div className="container">
                <div className="flex justify-center items-center mb-12 relative">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-title mb-0"
                    >
                        Coding <span className="text-primary-light">Profile</span>
                    </motion.h2>

                    <motion.div
                        className="absolute -right-4 -top-8 lg:right-40 lg:-top-10 z-10 hidden md:block"
                        initial={{ scale: 0, rotate: 20 }}
                        whileInView={{ scale: 1, rotate: 10 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    >
                        <img
                            src={CaricatureTeacher}
                            alt="Teaching DSA"
                            className="w-28 h-28 lg:w-36 lg:h-36 object-contain drop-shadow-2xl"
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
                            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
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

                {/* LeetCode Solutions & Teaching */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-8"
                >
                    <DynamicYouTube
                        playlistId="PL3gkgbVoJUE01-P8SzOZa8SXFgTdJsaRq"
                        title=""
                    />
                    <p className="text-text-muted mt-4 text-center text-sm">
                        Check out the full playlist for detailed explanations:
                        <a href={resumeData.youtube.leetcodePlaylist} target="_blank" rel="noreferrer" className="text-primary hover:underline ml-1">
                            Watch All
                        </a>
                    </p>
                </motion.div>

                {/* Medium Publications */}
                <DynamicMedium username="@manu-singh" />

                {/* Tech Tutorials & Solutions Section */}
                <div className="mt-20 pt-10 border-t border-white/10">
                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-2 text-white">
                        <span className="p-2 bg-red-600 rounded-md text-white"><Youtube size={20} /></span>
                        Tech Tutorials & Solutions
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* @ts-ignore */}
                        {resumeData.techPlaylists?.map((playlist: any, index: number) => (
                            <motion.div
                                key={index}
                                className="glass-card overflow-hidden group"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
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
                                <div className="p-4 bg-white/5">
                                    <h4 className="font-bold text-white group-hover:text-primary transition-colors">{playlist.title}</h4>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default CodingProfile;
