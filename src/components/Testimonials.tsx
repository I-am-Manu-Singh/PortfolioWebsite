import React from 'react';
import { motion } from 'framer-motion';
import { Star, Users, CheckCircle, Award } from 'lucide-react';
import { resumeData } from '../data/resume';
import SectionBackground from './SectionBackground';

const StatCard: React.FC<{ label: string; value: string | number; icon: React.ReactNode; delay: number }> = ({ label, value, icon, delay }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        className="glass-card p-6 flex flex-col items-center justify-center text-center relative z-10"
    >
        <div className="p-3 bg-white/5 rounded-full mb-4 text-primary-light">
            {icon}
        </div>
        <h3 className="text-3xl font-bold text-white mb-1">{value}+</h3>
        <p className="text-text-muted text-sm uppercase tracking-wider">{label}</p>
    </motion.div>
);

const TestimonialCard: React.FC<{ testimonial: any; index: number }> = ({ testimonial, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="glass-card p-6 relative z-10"
    >
        <div className="absolute -top-4 left-6 p-2 bg-dark-card border border-white/10 rounded-full text-secondary">
            <Award size={24} />
        </div>
        <div className="flex gap-1 mb-4 mt-2">
            {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className={`${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-600'} fill-current`} />
            ))}
        </div>
        <p className="text-text-muted mb-6 italic">"{testimonial.feedback}"</p>
        <div>
            <h4 className="font-bold text-white text-lg">{testimonial.name}</h4>
            <p className="text-primary-light text-sm">{testimonial.role}</p>
        </div>
    </motion.div>
);

const Testimonials: React.FC = () => {
    // Fallback for null stats to prevent crash if data missing during hot-reload edits
    // @ts-ignore
    const stats = resumeData.serviceStats || { clients: 0, projects: 0, reviews: 0 };
    // @ts-ignore
    const reviews = resumeData.testimonials || [];

    return (
        <section className="section relative overflow-hidden" id="testimonials">
            <SectionBackground variant="community" />
            <div className="container relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-title text-center mb-16"
                >
                    Client <span className="text-primary-light">Feedback</span>
                </motion.h2>

                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
                    <StatCard
                        label="Happy Clients"
                        value={stats.clients}
                        icon={<Users size={24} />}
                        delay={0.1}
                    />
                    <StatCard
                        label="Projects Done"
                        value={stats.projects}
                        icon={<CheckCircle size={24} />}
                        delay={0.2}
                    />
                    <StatCard
                        label="5-Star Reviews"
                        value={stats.reviews}
                        icon={<Star size={24} />}
                        delay={0.3}
                    />
                    <StatCard
                        label="Years Exp"
                        value="3"
                        icon={<Award size={24} />}
                        delay={0.4}
                    />
                </div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reviews.map((t: any, index: number) => (
                        <TestimonialCard key={index} testimonial={t} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
