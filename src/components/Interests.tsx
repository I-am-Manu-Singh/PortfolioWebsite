import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, ExternalLink } from 'lucide-react';
import SectionBackground from './SectionBackground';

const Interests: React.FC = () => {
    return (
        <section className="section relative overflow-hidden" id="interests">
            {/* Split backgrounds */}
            <div className="absolute inset-x-0 top-0 h-2/3 overflow-hidden">
                <SectionBackground variant="music" className="h-full" />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-2/3 overflow-hidden pointer-events-none">
                <SectionBackground variant="instagram" className="h-full" />
            </div>

            <div className="container relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-title text-center mb-16"
                >
                    Life <span className="text-primary-light">Beyond Code</span>
                </motion.h2>

                <div className="mb-12 text-center max-w-2xl mx-auto">
                    <p className="text-text-muted text-lg leading-relaxed">
                        Music and creative arts are my fuel. Whether it's improvising on the piano, fingerpicking on the guitar, or vocal sessions, creativity inspires better software engineering.
                    </p>
                </div>

                <div className="space-y-12">
                    {/* Instagram Official Profile Link */}
                    <div className="pt-12 border-t border-border-card relative">
                        <div className="max-w-xl mx-auto p-6 md:p-8 rounded-2xl bg-surface-card border border-border-card text-center space-y-4 shadow-xl">
                            <div className="inline-flex p-3 bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 rounded-2xl text-white shadow-lg">
                                <Instagram size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-text">
                                Connect on Instagram
                            </h3>
                            <p className="text-sm text-text-muted font-mono">
                                Follow my daily tech insights, music clips, and behind-the-scenes build updates on my official account.
                            </p>
                            <div className="pt-2">
                                <a
                                    href="https://www.instagram.com/manu.singh_001/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-mono text-xs font-semibold hover:opacity-90 shadow-md shadow-pink-500/25 transition-all hover:scale-105"
                                >
                                    <Instagram size={16} />
                                    <span>@manu.singh_001</span>
                                    <ExternalLink size={13} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Interests;
