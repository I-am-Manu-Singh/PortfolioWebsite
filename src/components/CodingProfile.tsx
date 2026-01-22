
import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resume';
import DynamicMedium from './DynamicMedium';
import DynamicYouTube from './DynamicYouTube';
import CaricatureTeacher from '../assets/caricature_teacher_v4.png';

const CodingProfile: React.FC = () => {
    return (
        <section className="section" id="coding-profile">
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-title"
                >
                    Coding <span className="text-primary-light">Profile</span>
                </motion.h2>

                <div className="flex justify-center mb-8">
                    <motion.img
                        src={CaricatureTeacher}
                        alt="Teaching DSA"
                        className="w-48 h-48 object-contain drop-shadow-lg"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    />
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
                                    src={`https://leetcode-stats-six.vercel.app/?username=${resumeData.basics.profiles[2].username}&theme=dark&font=Space%20Grotesk`}
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
                        title="Latest LeetCode Solution"
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

            </div>
        </section>
    );
};

export default CodingProfile;
