import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, BookOpen } from 'lucide-react';
import DynamicMedium from './DynamicMedium';
import SectionBackground from './SectionBackground';

const FeaturedContent: React.FC = () => {
    return (
        <section className="section relative overflow-hidden" id="featured">
            <SectionBackground variant="writing" />
            <div className="container relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-title text-center mb-16"
                >
                    Featured <span className="text-primary-light">Insights</span>
                </motion.h2>

                {/* Floating Caricature - Publications */}
                <div className="hidden lg:block absolute right-4 top-20 z-0 opacity-90 pointer-events-none">
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full transform scale-75" />
                        <motion.img
                            src={`${import.meta.env.BASE_URL}caricature_publications.png`}
                            alt="Publications"
                            className="w-48 object-contain drop-shadow-2xl pointer-events-auto cursor-grab active:cursor-grabbing hover:scale-110 transition-transform rounded-3xl border-4 border-white shadow-[0_0_20px_rgba(255,255,255,0.3)] bg-white/10 backdrop-blur-sm opacity-80"
                            animate={{ y: [0, -15, 0], rotate: [0, -5, 0] }}
                            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                            drag
                            dragConstraints={{ left: -30, right: 30, top: -30, bottom: 30 }}
                        />
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* LinkedIn Featured */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-bold flex items-center gap-2 text-white">
                                <span className="p-2 bg-[#0077b5] rounded-md text-white"><Briefcase size={20} /></span>
                                LinkedIn Featured
                            </h3>
                            <a href="https://www.linkedin.com/posts/manpreet-singh001_just-did-my-first-100century-problems-on-activity-7278847345100824577-xPvW?utm_source=share&utm_medium=member_desktop&rcm=ACoAAC_re9gBMwDNcnOojDO0oOyr4644o4RHMRo" target="_blank" className="text-sm text-primary hover:underline">View Profile</a>
                        </div>

                        <div className="flex flex-col gap-6">
                            <motion.a
                                href="https://www.linkedin.com/in/manpreet-singh001/"
                                target="_blank"
                                className="glass-card p-6 hover:bg-white/5 transition-all group"
                                whileHover={{ y: -5 }}
                            >
                                <div className="flex items-start gap-4">
                                    <img
                                        src="https://media.licdn.com/dms/image/v2/D5603AQGjCltwOpw8Tw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1718261309867?e=1743033600&v=beta&t=M_eKaaDJKXGvP3BNyC0tbwbNYjWUAoN8DdXyD7TBw_o"
                                        alt="Profile"
                                        className="w-12 h-12 rounded-full border-2 border-primary"
                                    />
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <h4 className="font-bold text-white group-hover:text-primary transition-colors">Manpreet Singh</h4>
                                            <div className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">Follow</div>
                                        </div>

                                        <p className="text-xs text-text-muted mb-2">Android Developer | KMP | React Native</p>
                                        <p className="text-sm text-gray-300 line-clamp-3">
                                            Check out my latest updates, project showcases, and technical articles on LinkedIn. I regularly share insights about Android Development, Jetpack Compose, and Kotlin Multiplatform.
                                        </p>
                                    </div>
                                </div>
                            </motion.a>

                            <motion.div
                                className="glass-card p-6 flex flex-col justify-center items-center text-center hover:bg-white/5 transition-all cursor-pointer"
                                whileHover={{ scale: 1.02 }}
                                onClick={() => window.open("https://www.linkedin.com/in/manpreet-singh001//", "_blank")}
                            >
                                <div className="mb-3 p-3 bg-white/5 rounded-full">
                                    <Briefcase size={24} className="text-primary-light" />
                                </div>
                                <h4 className="font-bold text-white mb-1">Open for Opportunities</h4>
                                <p className="text-sm text-text-muted">
                                    Connect with me to discuss potential collaborations or job roles.
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Medium Publications */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="text-2xl font-bold flex items-center gap-2 text-white mb-8">
                            <span className="p-2 bg-black rounded-md text-white border border-white/20"><BookOpen size={20} /></span>
                            Latest Publications
                        </h3>
                        <DynamicMedium username="@manu-singh" />
                        <div className="flex justify-center mt-8">
                            <a
                                href="https://medium.com/@manu-singh"
                                target="_blank"
                                className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-bold transition-all flex items-center gap-2"
                            >
                                View Medium Profile
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedContent;
