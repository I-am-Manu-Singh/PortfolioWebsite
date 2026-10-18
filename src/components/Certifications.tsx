import React from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar, ExternalLink } from 'lucide-react';
import { resumeData } from '../data/resume';
import SectionBackground from './SectionBackground';

const Certifications: React.FC = () => {
    return (
        <section className="section bg-dark relative overflow-hidden" id="certifications">
            <SectionBackground variant="certifications" />
            <div className="container relative z-10">
                <div className="flex flex-col items-center mb-12 text-center relative">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-title mb-3"
                    >
                        Licenses & <span className="text-primary-light">Certifications</span>
                    </motion.h2>
                    <p className="text-text-muted max-w-xl text-xs md:text-sm font-mono">
                        Accreditations and industrial certifications in algorithmic systems, Android KMP, and software engineering.
                    </p>

                    {/* Licenses Caricature */}
                    <div className="absolute right-0 -top-8 lg:right-6 lg:-top-16 z-0 hidden lg:block pointer-events-none">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-primary/20 blur-[50px] rounded-full transform scale-75" />
                            <motion.img
                                src={`${import.meta.env.BASE_URL}caricature_licenses.png`}
                                alt="Licenses & Certifications"
                                className="w-36 h-36 lg:w-44 lg:h-44 object-contain drop-shadow-xl relative z-10 pointer-events-auto rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm"
                                animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </motion.div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resumeData.certifications.map((cert: any, index: number) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.08 }}
                            className="bg-dark-card p-6 rounded-2xl border border-white/5 hover:border-primary/40 transition-all flex flex-col justify-between shadow-lg group"
                        >
                            <div>
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="text-lg font-bold text-text group-hover:text-primary transition-colors font-outfit leading-snug">
                                        {cert.name}
                                    </h3>
                                    <Award className="text-primary shrink-0 ml-2" size={22} />
                                </div>
                                <p className="text-text-muted mb-4 text-xs font-mono font-medium">{cert.issuer}</p>
                            </div>

                            <div className="mt-auto pt-4 border-t border-white/5 space-y-3">
                                <div className="flex items-center justify-between text-xs font-mono">
                                    <span className="flex items-center gap-1.5 text-text-muted">
                                        <Calendar size={13} className="text-primary" />
                                        <span>Issued {cert.date}</span>
                                    </span>
                                    {cert.certificateUrl && (
                                        <a
                                            href={cert.certificateUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-primary/10 hover:bg-primary text-primary hover:text-white border border-primary/20 hover:border-transparent text-xs font-mono font-semibold transition-all shadow-sm"
                                        >
                                            <span>Preview Certificate</span>
                                            <ExternalLink size={11} />
                                        </a>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-1.5 pt-1">
                                    {cert.skills.map((skill: string, i: number) => (
                                        <span key={i} className="text-[10px] py-0.5 px-2 rounded-md bg-dark text-text-muted border border-white/5 font-mono">
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
