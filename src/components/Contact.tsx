
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Github, Linkedin, ExternalLink } from 'lucide-react';
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
                                    className="text-text-muted hover:text-white transition-colors p-2"
                                    whileHover={{ y: -3 }}
                                >
                                    {profile.network === 'GitHub' && <Github size={24} />}
                                    {profile.network === 'LinkedIn' && <Linkedin size={24} />}
                                    {profile.network === 'LeetCode' && <ExternalLink size={24} />}
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
