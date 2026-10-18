import React from 'react';
import { motion } from 'framer-motion';
import { Star, Users, CheckCircle, Award } from 'lucide-react';
import { resumeData } from '../data/resume';
import SectionBackground from './SectionBackground';

const StatCard: React.FC<{ label: string; value: string | number; icon: React.ReactNode; delay: number }> = ({ label, value, icon, delay }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay }}
        className="bg-dark-card border border-white/5 p-6 rounded-2xl flex flex-col items-center justify-center text-center relative z-10 shadow-lg"
    >
        <div className="p-3 bg-dark rounded-xl mb-3 text-primary border border-white/5">
            {icon}
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-text mb-1 font-outfit">{value}+</h3>
        <p className="text-text-muted text-xs uppercase tracking-wider font-mono">{label}</p>
    </motion.div>
);

const TestimonialCard: React.FC<{ testimonial: any; index: number }> = ({ testimonial, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="bg-dark-card border border-white/5 p-6 rounded-2xl relative z-10 shadow-lg flex flex-col justify-between group hover:border-primary/30 transition-all"
    >
        <div className="flex gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} className={`${i < testimonial.rating ? 'text-amber-400' : 'text-gray-600'} fill-current`} />
            ))}
        </div>
        <p className="text-text-muted mb-6 text-sm leading-relaxed italic">"{testimonial.feedback}"</p>
        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
            <div>
                <h4 className="font-bold text-text text-sm font-outfit">{testimonial.name}</h4>
                <p className="text-primary text-xs font-mono">{testimonial.role}</p>
            </div>
            <Award className="text-primary/40 group-hover:text-primary transition-colors" size={20} />
        </div>
    </motion.div>
);

const Testimonials: React.FC = () => {
    // @ts-ignore
    const stats = resumeData.serviceStats || { clients: 0, projects: 0, reviews: 0 };
    // @ts-ignore
    const reviews = resumeData.testimonials || [];

    return (
        <section className="section bg-dark relative overflow-hidden" id="testimonials">
            <SectionBackground variant="community" />
            <div className="container relative z-10">
                {/* Header with Caricature */}
                <div className="flex flex-col items-center mb-12 text-center relative">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-title mb-3"
                    >
                        Client <span className="text-primary-light">Feedback</span>
                    </motion.h2>
                    <p className="text-text-muted max-w-xl text-xs md:text-sm font-mono">
                        Testimonials from engineering leads, founders, and cross-functional teams.
                    </p>

                    {/* Feedback / Professional Caricature */}
                    <div className="absolute right-0 -top-6 lg:right-6 lg:-top-16 z-0 hidden lg:block pointer-events-none">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-primary/20 blur-[50px] rounded-full transform scale-75" />
                            <motion.img
                                src={`${import.meta.env.BASE_URL}caricature_professional.png`}
                                alt="Client Collaboration"
                                className="w-36 h-36 lg:w-44 lg:h-44 object-contain drop-shadow-xl relative z-10 pointer-events-auto rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm"
                                animate={{ y: [0, -8, 0], rotate: [2, 0, 2] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </motion.div>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                    <StatCard
                        label="Happy Clients"
                        value={stats.clients}
                        icon={<Users size={22} />}
                        delay={0.1}
                    />
                    <StatCard
                        label="Projects Done"
                        value={stats.projects}
                        icon={<CheckCircle size={22} />}
                        delay={0.2}
                    />
                    <StatCard
                        label="5-Star Reviews"
                        value={stats.reviews}
                        icon={<Star size={22} />}
                        delay={0.3}
                    />
                    <StatCard
                        label="Years Exp"
                        value="3"
                        icon={<Award size={22} />}
                        delay={0.4}
                    />
                </div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.map((t: any, index: number) => (
                        <TestimonialCard key={index} testimonial={t} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
