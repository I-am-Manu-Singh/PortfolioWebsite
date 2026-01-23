
import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resume';
import SectionBackground from './SectionBackground';


const getSkillIcon = (skill: string) => {
    const iconMap: { [key: string]: string } = {
        "Kotlin": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
        "Java": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
        "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        "XML": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xml/xml-original.svg", // Generic file icon or custom
        "HTML/CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        "SQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", // Using MySQL as generic SQL repr
        "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        "Go": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg",
        "C-Lang": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
        "Android Development": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
        "Jetpack Compose": "https://developer.android.com/static/images/jetpack/compose-icon.svg",
        "React Native": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        "Firebase": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
        "Git": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
        "GitHub": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
        "Docker": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
        "Kubernetes": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
        "AWS (Basic)": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
        "Jenkins": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
        "Android Studio": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg",
        "VS Code": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
        "Figma": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg"
    };

    const url = iconMap[skill] || iconMap[skill.split(' ')[0]]; // Try exact match or first word
    return url || '';
};



const Skills: React.FC = () => {
    // Flatten skills for a "cloud" view or keep categorized? Categorized is better for this resume.
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
                    {[...resumeData.skills.languages, ...resumeData.skills.android, ...resumeData.skills.reactNative, ...resumeData.skills.backendAndTools].map((skill, index) => (
                        <motion.div
                            key={index}
                            className="glass-card p-3 flex flex-col items-center justify-center gap-2 hover:bg-white/10 transition-all cursor-default group"
                            whileHover={{ y: -5 }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.02 }}
                        >
                            <img
                                src={getSkillIcon(skill)}
                                alt={skill}
                                className="w-8 h-8 group-hover:scale-110 transition-transform duration-300 drop-shadow-md"
                            />
                            <span className="font-mono text-xs text-text-muted group-hover:text-white transition-colors text-center">{skill}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
