import React from 'react';
import { motion } from 'framer-motion';
import { Apple, Play, Rocket, Video, Camera } from 'lucide-react';
import SectionBackground from './SectionBackground';

const apps = [
    {
        id: 'moonlight',
        name: 'MoonlightWebcam',
        description: 'Turn your mobile device into a professional-grade webcam. Ultra-low latency streaming with advanced focus and exposure controls. Perfect for streamers and professional meetings.',
        tech: ['Flutter', 'WebRTC', 'C++'],
        icon: <Camera className="text-blue-400" size={32} />,
        gradient: 'from-blue-500/20 to-purple-500/20'
    },
    {
        id: 'videoeditor',
        name: 'Premium Video Editor',
        description: 'A powerful yet lightweight video editing suite for mobile. Intuitive multi-track editing, real-time filters, and 4K export optimization for social media creators.',
        tech: ['React Native', 'FFmpeg', 'Native Modules'],
        icon: <Video className="text-pink-400" size={32} />,
        gradient: 'from-pink-500/20 to-orange-500/20'
    }
];

const MobileLabs: React.FC = () => {
    return (
        <section className="section bg-dark-card/20 relative overflow-hidden" id="mobile-labs">
            <SectionBackground variant="projects" />

            <div className="container relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="section-title text-left mb-2">
                            Mobile <span className="gradient-text-animated">Labs</span>
                        </h2>
                        <p className="text-text-muted font-mono text-sm tracking-widest">
                            // UPCOMING RELEASES
                        </p>
                    </motion.div>

                    <motion.div
                        className="flex gap-4"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-text-muted">
                            <Rocket size={14} className="animate-bounce" />
                            Launching Soon
                        </div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {apps.map((app, index) => (
                        <motion.div
                            key={app.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="group relative"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${app.gradient} blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-3xl`} />

                            <div className="glass-card p-8 relative flex flex-col md:flex-row gap-8 h-full border-white/5 hover:border-primary/30 transition-colors">
                                <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-primary/20 transition-all duration-500 group-hover:scale-110">
                                    {app.icon}
                                </div>

                                <div className="flex-grow flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-3 mb-3">
                                            <h3 className="text-2xl font-bold text-white font-outfit">{app.name}</h3>
                                            <div className="px-2 py-0.5 rounded bg-primary/20 text-primary-light text-[10px] font-bold uppercase tracking-wider">Beta</div>
                                        </div>

                                        <p className="text-text-muted text-sm leading-relaxed mb-6">
                                            {app.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {app.tech.map(t => (
                                                <span key={t} className="text-[10px] px-2 py-1 rounded bg-dark/50 text-white/40 font-mono border border-white/5">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mt-4 pt-6 border-t border-white/5">
                                        <div className="flex gap-4">
                                            <div className="flex items-center gap-2 text-white/50 group-hover:text-primary-light transition-colors">
                                                <Play size={18} />
                                                <span className="text-xs font-bold text-glow-hover">Play Store</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-white/50 group-hover:text-primary-light transition-colors">
                                                <Apple size={18} />
                                                <span className="text-xs font-bold text-glow-hover">App Store</span>
                                            </div>
                                        </div>

                                        <div className="text-[10px] font-mono text-primary font-bold animate-pulse">
                                            PUBLISHING...
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MobileLabs;
