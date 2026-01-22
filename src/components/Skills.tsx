
import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resume';
import { useInView } from 'react-intersection-observer';

const SkillCategory: React.FC<{ title: string; skills: string[]; delay: number }> = ({ title, skills, delay }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay }}
            className="glass-card p-6"
        >
            <h3 className="text-xl font-bold mb-6 text-primary-light border-b border-white/10 pb-2">{title}</h3>
            <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                    <motion.span
                        key={index}
                        className="px-4 py-2 bg-white/5 rounded-lg text-sm font-medium hover:bg-white/10 hover:text-secondary transition-colors cursor-default border border-white/5"
                        whileHover={{ scale: 1.05, y: -2 }}
                    >
                        {skill}
                    </motion.span>
                ))}
            </div>
        </motion.div>
    );
};

const Skills: React.FC = () => {
    // Flatten skills for a "cloud" view or keep categorized? Categorized is better for this resume.
    return (
        <section className="section bg-dark-card/50 relative" id="skills">
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-title"
                >
                    Tech <span className="text-primary-light">Stack</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <SkillCategory title="Languages" skills={resumeData.skills.languages} delay={0.1} />
                    <SkillCategory title="Android" skills={resumeData.skills.android} delay={0.2} />
                    <SkillCategory title="React Native" skills={resumeData.skills.reactNative} delay={0.3} />
                    <SkillCategory title="Backend & Tools" skills={resumeData.skills.backendAndTools} delay={0.4} />
                    <SkillCategory title="Computer Science" skills={resumeData.skills.computerScience} delay={0.5} />
                </div>
            </div>
        </section>
    );
};

export default Skills;
