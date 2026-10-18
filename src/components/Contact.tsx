
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Github, Linkedin } from 'lucide-react';
import { resumeData } from '../data/resume';

const Contact: React.FC = () => {
    return (
        <section className="section" id="contact">
            <div className="container max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="glass-card p-10 md:p-16 text-center"
                >
                    <h2 className="section-title mb-8">Get In <span className="text-primary-light">Touch</span></h2>
                    <p className="text-xl text-text-muted mb-12 max-w-2xl mx-auto">
                        I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>

                    <div className="flex flex-col md:flex-row justify-center gap-8 mb-12">
                        <a href={`mailto:${resumeData.basics.email}`} className="flex items-center justify-center gap-3 text-lg hover:text-primary transition-colors">
                            <div className="p-3 bg-white/5 rounded-full text-primary">
                                <Mail size={24} />
                            </div>
                            {resumeData.basics.email}
                        </a>
                        <a href={`tel:${resumeData.basics.phone}`} className="flex items-center justify-center gap-3 text-lg hover:text-primary transition-colors">
                            <div className="p-3 bg-white/5 rounded-full text-secondary">
                                <Phone size={24} />
                            </div>
                            {resumeData.basics.phone}
                        </a>
                    </div>

                    <motion.a
                        href={`mailto:${resumeData.basics.email}`}
                        className="inline-block px-10 py-4 bg-primary text-white rounded-full font-bold text-lg shadow-lg shadow-primary/30 hover:bg-primary-light transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Say Hello
                    </motion.a>

                    <footer className="mt-16 pt-8 border-t border-white/5 flex flex-col items-center gap-6">
                        <div className="flex gap-6">
                            {resumeData.basics.profiles.map((profile, index) => (
                                <motion.a
                                    key={index}
                                    href={profile.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-text-muted hover:text-text transition-colors p-2"
                                    whileHover={{ y: -3 }}
                                >
                                    {profile.network === 'GitHub' && <Github size={24} />}
                                    {profile.network === 'LinkedIn' && <Linkedin size={24} />}
                                    {profile.network === 'LeetCode' && (
                                        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" className="text-current">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 4.818 3.821c.287.034.576.053.864.055.228 0 .456-.011.683-.033.432-.04.86-.132 1.272-.273a5.88 5.88 0 0 0 1.936-1.196l3.86-4.135 5.405-5.787a1.379 1.379 0 0 0-1.009-2.321 1.373 1.373 0 0 0-.962.438l-4.444 4.757a3.07 3.07 0 0 1-2.146.974 3.064 3.064 0 0 1-2.146-.974l-4.44-4.756a1.378 1.378 0 0 0-1.971 0 1.374 1.374 0 0 0 0 1.971l4.44 4.756a5.814 5.814 0 0 0 4.117 1.867 5.82 5.82 0 0 0 4.117-1.867l4.444-4.757A1.373 1.373 0 0 0 13.483 0zm-2.88 18.118a1.375 1.375 0 0 0-.962.438l-4.44 4.756a1.378 1.378 0 0 0 0 1.971 1.374 1.374 0 0 0 1.971 0l4.44-4.756a1.379 1.379 0 0 0-1.009-2.409z" />
</svg>
                                    )}
                                </motion.a>
                            ))}
                        </div>
                        <p className="text-text-muted text-sm">
                            Designed & Built by <span className="text-primary-light font-bold">{resumeData.basics.name}</span>
                        </p>
                    </footer>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
