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
        "Android Dev": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
        "CMP": "https://github.com/JetBrains/compose-multiplatform/raw/master/artwork/compose-logo.png",
        "RN CLI & Expo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        "Firebase Auth": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
        "Firestore": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
        "Git": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
        "GitHub": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
        "Postman": "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg",
        "Figma": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
        "Redux Toolkit": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
        "Expo Router": "https://www.vectorlogo.zone/logos/expoio/expoio-icon.svg",
        "RN Firebase": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
        "ADB": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg"
    };

    // Return URL if found
    if (iconMap[skill]) return { type: 'img', src: iconMap[skill] };

    // Fuzzy match for specific common terms
    if (skill.includes("Firebase")) return { type: 'img', src: iconMap["Firebase Auth"] };
    if (skill.includes("Expo")) return { type: 'img', src: iconMap["Expo Router"] };
    if (skill.includes("React Native")) return { type: 'img', src: iconMap["React Native CLI & Expo"] };

    // Fallback Icon Mapping for abstract concepts
    const iconFallback: { [key: string]: any } = {
        "RoomKMP & SQLDelight": Database,
        "Retrofit & OkHttp": Globe,
        "Coroutines": Zap,
        "Flow": Layers,
        "Paging 3": Layers,
        "WorkManager": Box,
        "Hilt/Dagger": Box,
        "Koin": Box,
        "JNI": Terminal,
        "ML Kit": Cpu,
        "OkHttp": Globe,
        "Ktor": Globe,
        "Coil": Layout,
        "XML": Layout,
        "MVVM": Layers,
        "Clean Architecture": Layers,
        "Reanimated": Zap,
        "Gesture Handler": Smartphone,
        "AsyncStorage": Database,
        "Axios": Globe,
        "Gradle": Box,
        "Material Design 3": Layout,
        "iOS Dev": Smartphone,
        "macOS Apps": Layers,
        "Firebase Console": Database, // Mapped fallback
        "Compose Multiplatform": Layers,
        "KotlinX": Code
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
                    {[...resumeData.skills.languages, ...resumeData.skills.android, ...resumeData.skills.reactNative, ...resumeData.skills.tools].map((skill, index) => {
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
                                    <div className={`w-6 h-6 flex items-center justify-center ${skill.includes("GitHub") ? "bg-white rounded-full p-0.5" : ""}`}>
                                        <img
                                            src={iconData.src}
                                            alt={skill}
                                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-md"
                                            onError={(e) => {
                                                // If image fails, hide it and letting the text label remain (or could swap to icon)
                                                (e.target as HTMLImageElement).style.display = 'none';
                                                (e.target as HTMLImageElement).parentElement!.innerText = '🛠️'; // Fallback emoji
                                                (e.target as HTMLImageElement).parentElement!.classList.add('text-lg');
                                            }}
                                        />
                                    </div>
                                ) : (
                                    // @ts-ignore
                                    <iconData.Component size={20} className="text-primary-light group-hover:scale-110 transition-transform duration-300" />
                                )}
                                <span className="font-mono text-[9px] md:text-[10px] text-text-muted group-hover:text-white transition-colors text-center leading-tight line-clamp-2 max-w-full px-1 break-words">{skill}</span>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Skills;
