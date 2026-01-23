import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resume';
import SectionBackground from './SectionBackground';
import { Code, Database, Globe, Smartphone, Cpu, Layers, Box, Terminal, Zap, Layout } from 'lucide-react';

const getSkillIcon = (skill: string) => {
    // Exact map for known logos
    const iconMap: { [key: string]: string } = {
        "Kotlin": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
        "Java": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
        "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        "XML": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xml/xml-original.svg",
        "SQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
        "Android Development": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
        "Jetpack Compose": "https://developer.android.com/static/images/jetpack/compose-icon.svg",
        "React Native": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        "Expo": "https://www.vectorlogo.zone/logos/expoio/expoio-icon.svg",
        "Firebase": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
        "Git": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
        "GitHub": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
        "Docker": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
        "Kubernetes": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
        "AWS (Basic)": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
        "Postman": "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg",
        "Figma": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
        "Redux Toolkit": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg"
    };

    // Return URL if found
    if (iconMap[skill]) return { type: 'img', src: iconMap[skill] };

    // Fuzzy match for specific common terms
    if (skill.includes("Firebase")) return { type: 'img', src: iconMap["Firebase"] };

    // Fallback Icon Mapping for abstract concepts
    const iconFallback: { [key: string]: any } = {
        "Room DB": Database,
        "Retrofit": Globe,
        "Coroutines": Zap,
        "Flow": Layers,
        "WorkManager": Box,
        "Hilt": Box,
        "Dagger": Box,
        "Koin": Box,
        "JNI": Terminal,
        "ML Kit": Cpu,
        "Google Maps SDK": Globe,
        "XML Layouts": Layout,
        "MVVM": Layers,
        "Clean Architecture": Layers,
        "Reanimated": Zap,
        "Gesture Handler": Smartphone,
        "React Navigation": Globe,
        "Axios": Globe
    };

    const FallbackIcon = iconFallback[skill] || Code; // Default to Code icon
    return { type: 'icon', Component: FallbackIcon };
};

const Skills: React.FC = () => {
    return (
        <section className="section bg-dark-card/50 relative overflow-hidden" id="skills">
            <SectionBackground variant="skills" />
            <div className="container relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-title mb-8"
                >
                    Tech <span className="text-primary-light">Stack</span>
                </motion.h2>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {/* Flatten skills for compact view */}
                    {[...resumeData.skills.languages, ...resumeData.skills.android, ...resumeData.skills.reactNative, ...resumeData.skills.backendAndTools].map((skill, index) => {
                        const iconData = getSkillIcon(skill);

                        return (
                            <motion.div
                                key={index}
                                className="glass-card p-3 flex flex-col items-center justify-center gap-2 hover:bg-white/10 transition-all cursor-default group"
                                whileHover={{ y: -5 }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.02 }}
                            >
                                {iconData.type === 'img' ? (
                                    <img
                                        src={iconData.src}
                                        alt={skill}
                                        className="w-8 h-8 group-hover:scale-110 transition-transform duration-300 drop-shadow-md"
                                    />
                                ) : (
                                    // @ts-ignore
                                    <iconData.Component size={32} className="text-primary-light group-hover:scale-110 transition-transform duration-300" />
                                )}
                                <span className="font-mono text-xs text-text-muted group-hover:text-white transition-colors text-center">{skill}</span>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Skills;
