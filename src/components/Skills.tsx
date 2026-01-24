import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resume';
import SectionBackground from './SectionBackground';
import { Code, Smartphone, Cpu, Layers, Box, Terminal, Layout } from 'lucide-react';

const getSkillIcon = (skill: string) => {
    // Exact map for known logos (DevIcons + VectorLogos)
    const iconMap: { [key: string]: string } = {
        "Kotlin": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
        "Java": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
        "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        "Android Dev": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
        "Android Development": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
        "CMP": "https://github.com/JetBrains/compose-multiplatform/raw/master/artwork/compose-logo.png",
        "Compose Multiplatform": "https://github.com/JetBrains/compose-multiplatform/raw/master/artwork/compose-logo.png",
        "RN CLI & Expo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        "React Native CLI & Expo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        "Firebase Auth": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
        "Firestore": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
        "Git": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
        "GitHub": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
        "Postman": "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg",
        "Figma": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
        "Redux Toolkit": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
        "Expo Router": "https://www.vectorlogo.zone/logos/expoio/expoio-icon.svg",
        "RN Firebase": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
        "ADB": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
        "Gemini": "https://www.vectorlogo.zone/logos/google_gemini/google_gemini-icon.svg",
        "ChatGPT": "https://www.vectorlogo.zone/logos/openai/openai-icon.svg",
        "Gradle": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gradle/gradle-original.svg",
        "Retrofit": "https://www.vectorlogo.zone/logos/squareup_retrofit/squareup_retrofit-icon.svg",
        "Room": "https://www.vectorlogo.zone/logos/android/android-icon.svg",
        "RoomKMP & SQLDelight": "https://www.vectorlogo.zone/logos/android/android-icon.svg",
        "Dagger/Hilt": "https://www.vectorlogo.zone/logos/google_dagger/google_dagger-icon.svg",
        "Hilt/Dagger": "https://www.vectorlogo.zone/logos/google_dagger/google_dagger-icon.svg",
        "Koin": "https://insert-koin.io/img/koin_logo.png",
        "Coroutines": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
        "Flow": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
        "Ktor": "https://www.vectorlogo.zone/logos/kotlinlang/kotlinlang-icon.svg",
        "Reanimated": "https://raw.githubusercontent.com/software-mansion/react-native-reanimated/main/docs/static/img/logo.svg",
        "Gesture Handler": "https://raw.githubusercontent.com/software-mansion/react-native-gesture-handler/main/docs/static/img/logo.svg",
        "AsyncStorage": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        "Axios": "https://www.vectorlogo.zone/logos/axios/axios-icon.svg"
    };

    // Return URL if found
    if (iconMap[skill]) return { type: 'img', src: iconMap[skill] };

    // Fuzzy match
    const skillLower = skill.toLowerCase();
    if (skillLower.includes("firebase")) return { type: 'img', src: iconMap["Firebase Auth"] };
    if (skillLower.includes("expo")) return { type: 'img', src: iconMap["Expo Router"] };
    if (skillLower.includes("react native")) return { type: 'img', src: iconMap["RN CLI & Expo"] };
    if (skillLower.includes("android")) return { type: 'img', src: iconMap["Android Dev"] };
    if (skillLower.includes("kotlin")) return { type: 'img', src: iconMap["Kotlin"] };
    if (skillLower.includes("retrofit")) return { type: 'img', src: iconMap["Retrofit"] };
    if (skillLower.includes("gradle")) return { type: 'img', src: iconMap["Gradle"] };

    // Fallback Icon Mapping for abstract concepts
    const iconFallback: { [key: string]: any } = {
        "WorkManager": Box,
        "JNI": Terminal,
        "ML Kit": Cpu,
        "Coil": Layout,
        "XML": Layout,
        "MVVM": Layers,
        "Clean Architecture": Layers,
        "Material Design 3": Layout,
        "iOS Dev": Smartphone,
        "macOS Apps": Layers,
        "KotlinX": Code,
        "Antigravity": Box,
        "Prompt Engineering": Terminal,
        "Cursor": Code
    };

    const FallbackIcon = iconFallback[skill] || Code;
    return { type: 'icon', Component: FallbackIcon };
};

const Skills: React.FC = () => {
    // Deduplicate skills using Set
    const allSkills = Array.from(new Set([
        ...resumeData.skills.languages,
        ...resumeData.skills.android,
        ...resumeData.skills.reactNative,
        ...resumeData.skills.ai,
        ...resumeData.skills.tools
    ]));

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
                    {allSkills.map((skill, index) => {
                        const iconData = getSkillIcon(skill);

                        return (
                            <motion.div
                                key={skill}
                                className="glass-card p-1.5 flex flex-col items-center justify-center gap-1.5 hover:bg-white/10 transition-all cursor-default group bg-white/5"
                                whileHover={{ y: -3 }}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.01 }}
                            >
                                {iconData.type === 'img' ? (
                                    <div className={`w-8 h-8 flex items-center justify-center p-1 ${skill.includes("GitHub") ? "bg-white rounded-full p-0.5" : ""}`}>
                                        <img
                                            src={iconData.src}
                                            alt={skill}
                                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-md"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = 'none';
                                                (e.target as HTMLImageElement).parentElement!.innerText = '🛠️';
                                                (e.target as HTMLImageElement).parentElement!.classList.add('text-lg');
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <div className="w-8 h-8 flex items-center justify-center">
                                        {/* @ts-ignore */}
                                        <iconData.Component size={24} className="text-primary-light group-hover:scale-110 transition-transform duration-300" />
                                    </div>
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
