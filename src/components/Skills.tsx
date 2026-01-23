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
        "Swift": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
        "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        "SQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
        "Android Development": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
        "Jetpack Compose": "https://developer.android.com/static/images/jetpack/compose-icon.svg",
        "iOS Development": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg",
        "SwiftUI": "https://developer.apple.com/assets/elements/icons/swiftui/swiftui-96x96_2x.png",
        "Xcode": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xcode/xcode-original.svg",
        "Kotlin Multiplatform (KMP)": "https://upload.wikimedia.org/wikipedia/commons/7/74/Kotlin_Icon.png",
        "Compose Multiplatform": "https://github.com/JetBrains/compose-multiplatform/raw/master/artwork/compose-logo.png",
        "React Native": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        "Expo": "https://www.vectorlogo.zone/logos/expoio/expoio-icon.svg",
        "Firebase": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
        "Supabase": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
        "Git": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
        "GitHub": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
        "Docker": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
        "AWS (Basic)": "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
        "Postman": "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg",
        "Figma": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
        "Redux Toolkit": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg"
    };

    // Return URL if found
    if (iconMap[skill]) return { type: 'img', src: iconMap[skill] };

    // Fuzzy match for specific common terms
    if (skill.includes("Firebase")) return { type: 'img', src: iconMap["Firebase"] };
    if (skill.includes("AWS")) return { type: 'img', src: iconMap["AWS (Basic)"] };

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
        "Ktor": Globe,
        "JNI": Terminal,
        "ML Kit": Cpu,
        "Google Maps SDK": Globe,
        "XML Layouts": Layout,
        "MVVM": Layers,
        "Clean Architecture": Layers,
        "Reanimated": Zap,
        "Gesture Handler": Smartphone,
        "React Navigation": Globe,
        "Axios": Globe,
        "UIKit": Layout,
        "CocoaPods": Box
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

                <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                    {/* Flatten skills for compact view */}
                    {/* @ts-ignore */}
                    {[...resumeData.skills.languages, ...resumeData.skills.android, ...resumeData.skills.ios, ...resumeData.skills.multiplatform, ...resumeData.skills.reactNative, ...resumeData.skills.backendAndTools].map((skill, index) => {
                        const iconData = getSkillIcon(skill);

                        return (
                            <motion.div
                                key={index}
                                className="glass-card p-1.5 flex flex-col items-center justify-center gap-1.5 hover:bg-white/10 transition-all cursor-default group bg-white/5"
                                whileHover={{ y: -3 }}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.01 }}
                            >
                                {iconData.type === 'img' ? (
                                    <div className={`w-6 h-6 flex items-center justify-center ${skill.includes("AWS") || skill.includes("GitHub") ? "bg-white rounded-full p-0.5" : ""}`}>
                                        <img
                                            src={iconData.src}
                                            alt={skill}
                                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-md"
                                        />
                                    </div>
                                ) : (
                                    // @ts-ignore
                                    <iconData.Component size={20} className="text-primary-light group-hover:scale-110 transition-transform duration-300" />
                                )}
                                <span className="font-mono text-[9px] md:text-[10px] text-text-muted group-hover:text-white transition-colors text-center leading-tight line-clamp-2 max-w-full px-1">{skill}</span>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Skills;
