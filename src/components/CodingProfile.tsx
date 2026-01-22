
import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resume';

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
                    className="glass-card p-6 mt-8 flex flex-col md:flex-row items-center gap-6"
                >
                    <div className="flex-1">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-red-500">
                            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                            LeetCode Video Solutions
                        </h3>
                        <p className="text-text-muted mb-6">
                            I believe in giving back to the community by creating detailed video explanations for LeetCode problems.
                            Check out my playlist where I break down complex algorithms into simple, understandable concepts.
                        </p>
                        <a
                            href={resumeData.youtube.leetcodePlaylist}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center px-6 py-3 bg-red-600/20 text-red-500 border border-red-600/50 rounded-lg hover:bg-red-600/30 transition-colors font-medium"
                        >
                            Watch Playlist
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CodingProfile;
