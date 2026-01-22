
import React from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar } from 'lucide-react';
import { resumeData } from '../data/resume';

const Certifications: React.FC = () => {
    return (
        <section className="section bg-dark-card/30" id="certifications">
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-title"
                >
                    Licenses & <span className="text-primary-light">Certifications</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {resumeData.certifications.map((cert, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="glass-card p-6 border-l-4 border-l-secondary flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="text-xl font-bold text-white">{cert.name}</h3>
                                    <Award className="text-secondary shrink-0" size={24} />
                                </div>
                                <p className="text-text-muted mb-4 text-lg">{cert.issuer}</p>
                            </div>

                            <div className="mt-auto">
                                <div className="flex items-center gap-2 text-sm text-primary-light mb-3">
                                    <Calendar size={14} />
                                    <span>Issued {cert.date}</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {cert.skills.map((skill, i) => (
                                        <span key={i} className="text-xs py-1 px-2 rounded bg-white/5 text-text-muted border border-white/5">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certifications;
