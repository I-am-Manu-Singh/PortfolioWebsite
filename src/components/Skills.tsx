import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Code, Terminal, Cpu, Layout, Layers, Smartphone, Box, 
    Sparkles, Wrench, Globe, Server
} from 'lucide-react';
import { resumeData } from '../data/resume';
import { resumesList } from '../data/resumesData';
import SectionBackground from './SectionBackground';

// High-fidelity icon map
const getSkillIcon = (skill: string) => {
    const iconMap: { [key: string]: string } = {
        "Kotlin": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
        "Java": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
        "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        "JavaScript (ES6+)": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        "Dart": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
        "C++": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
        "C/C++": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
        "SQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
        "HTML5": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        "CSS3": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
        "Android Dev": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
        "Jetpack Compose": "https://developer.android.com/static/images/jetpack/compose-logo.svg",
        "CMP": "https://github.com/JetBrains/compose-multiplatform/raw/master/artwork/compose-logo.png",
        "Compose Multiplatform": "https://github.com/JetBrains/compose-multiplatform/raw/master/artwork/compose-logo.png",
        "Compose Multiplatform (CMP)": "https://github.com/JetBrains/compose-multiplatform/raw/master/artwork/compose-logo.png",
        "Kotlin Multiplatform (KMP)": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
        "React Native": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        "React Native CLI": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        "RN CLI & Expo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        "React.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        "Next.js (App Router)": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        "Flutter": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
        "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        "Express": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
        "Electron": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/electron/electron-original.svg",
        "Firebase": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
        "Firebase Auth": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
        "Firestore": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
        "Cloud Firestore": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
        "Firebase Crashlytics": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
        "Firebase ML": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
        "Supabase": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
        "PostgreSQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
        "MySQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
        "Redis": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
        "SQLite": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
        "Docker": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
        "Git": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
        "GitHub": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
        "Postman": "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg",
        "Figma": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
        "Redux Toolkit": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
        "Redux Toolkit (RTK Query)": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
        "Expo": "https://www.vectorlogo.zone/logos/expoio/expoio-icon.svg",
        "Expo Router v3": "https://www.vectorlogo.zone/logos/expoio/expoio-icon.svg",
        "ADB": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
        "Gemini": "https://www.vectorlogo.zone/logos/google_gemini/google_gemini-icon.svg",
        "ChatGPT": "https://www.vectorlogo.zone/logos/openai/openai-icon.svg",
        "Gradle": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gradle/gradle-original.svg",
        "Gradle Kotlin DSL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gradle/gradle-original.svg",
        "Retrofit": "https://www.vectorlogo.zone/logos/squareup_retrofit/squareup_retrofit-icon.svg",
        "Room Database": "https://www.vectorlogo.zone/logos/android/android-icon.svg",
        "RoomKMP & SQLDelight": "https://www.vectorlogo.zone/logos/android/android-icon.svg",
        "Hilt/Dagger": "https://www.vectorlogo.zone/logos/google_dagger/google_dagger-icon.svg",
        "Dagger/Hilt": "https://www.vectorlogo.zone/logos/google_dagger/google_dagger-icon.svg",
        "Koin": "https://insert-koin.io/img/koin_logo.png",
        "Coroutines": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
        "Flow": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
        "Ktor": "https://www.vectorlogo.zone/logos/kotlinlang/kotlinlang-icon.svg",
        "Ktor Client": "https://www.vectorlogo.zone/logos/kotlinlang/kotlinlang-icon.svg",
        "TailwindCSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
        "Vite": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg",
        "Webpack": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg",
        "Linux/Unix": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
        "Android Studio": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg",
        "VS Code": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
        "Xcode": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xcode/xcode-original.svg",
        "WebSockets": "https://www.vectorlogo.zone/logos/websocket/websocket-icon.svg",
        "Socket.io": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg",
        "WebRTC": "https://www.vectorlogo.zone/logos/webrtc/webrtc-icon.svg",
        "GraphQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
        "OpenCV": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg",
        "TensorFlow Lite": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg"
    };

    if (iconMap[skill]) return { type: 'img', src: iconMap[skill] };

    const sLower = skill.toLowerCase();
    if (sLower.includes("firebase")) return { type: 'img', src: iconMap["Firebase"] };
    if (sLower.includes("expo")) return { type: 'img', src: iconMap["Expo"] };
    if (sLower.includes("react native")) return { type: 'img', src: iconMap["React Native"] };
    if (sLower.includes("android")) return { type: 'img', src: iconMap["Android Dev"] };
    if (sLower.includes("kotlin")) return { type: 'img', src: iconMap["Kotlin"] };
    if (sLower.includes("flutter")) return { type: 'img', src: iconMap["Flutter"] };
    if (sLower.includes("next")) return { type: 'img', src: iconMap["Next.js"] };
    if (sLower.includes("aws")) return { type: 'img', src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" };
    if (sLower.includes("postgres")) return { type: 'img', src: iconMap["PostgreSQL"] };

    // Abstract Fallback Icons
    const iconFallback: { [key: string]: any } = {
        "WorkManager": Box,
        "JNI": Terminal,
        "JNI/NDK": Terminal,
        "ML Kit": Cpu,
        "Coil": Layout,
        "XML": Layout,
        "MVVM": Layers,
        "MVI": Layers,
        "Clean Architecture": Layers,
        "Material Design 3": Layout,
        "iOS Dev": Smartphone,
        "macOS Apps": Layers,
        "KotlinX": Code,
        "Antigravity": Box,
        "Prompt Engineering": Terminal,
        "Cursor": Code,
        "Bloc/Cubit": Layers,
        "Provider": Layers,
        "Riverpod": Layers,
        "FlashList": Layout,
        "Zustand": Layers,
        "MediaPipe LLM Inference API": Cpu,
        "ONNX Runtime": Cpu,
        "Stockfish NNUE": Cpu,
        "FFT Spectrum Analysis": Sparkles,
        "AES-256-GCM Encryption": Terminal,
        "JWT Authentication": Terminal
    };

    const FallbackIcon = iconFallback[skill] || Code;
    return { type: 'icon', Component: FallbackIcon };
};

// Skill Categories for filtering
type SkillCategory = 'all' | 'languages' | 'mobile' | 'web' | 'backend' | 'ai' | 'tools';

const Skills: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<SkillCategory>('all');

    // Aggregate all unique skills from base resumeData AND all 7 domain resumes
    const allSkills = useMemo(() => {
        const set = new Set<string>();

        // 1. Base resume
        resumeData.skills.languages.forEach(s => set.add(s.trim()));
        resumeData.skills.android.forEach(s => set.add(s.trim()));
        resumeData.skills.reactNative.forEach(s => set.add(s.trim()));
        resumeData.skills.ai.forEach(s => set.add(s.trim()));
        resumeData.skills.tools.forEach(s => set.add(s.trim()));

        // 2. All 7 Resume tracks
        resumesList.forEach(r => {
            r.skills.forEach(cat => {
                const cleaned = cat.items
                    .replace(/\*\*/g, '')
                    .replace(/\\&/g, '&');

                // Split on commas not inside parentheses
                const tokens = cleaned.split(/,(?![^(]*\))/).map(t => t.trim());
                tokens.forEach(t => {
                    // Clean trailing/leading parens artifacts like "AWS (S3" or "EC2)"
                    const normalized = t.replace(/^\(+/, '').replace(/\)+$/, '').trim();
                    if (normalized && normalized.length > 1) {
                        set.add(normalized);
                    }
                });
            });
        });

        // Deduplicate common variants
        const list = Array.from(set);
        const deduplicated = list.filter(item => {
            if (item === 'Compose Multiplatform' && list.includes('CMP')) return false;
            if (item === 'Compose Multiplatform (CMP)' && list.includes('CMP')) return false;
            if (item === 'RN CLI & Expo' && list.includes('React Native CLI')) return false;
            return true;
        });

        return deduplicated.sort((a, b) => a.localeCompare(b));
    }, []);

    // Filter categories
    const categorizeSkill = (skill: string): SkillCategory => {
        const s = skill.toLowerCase();
        if (['kotlin', 'java', 'typescript', 'javascript', 'python', 'dart', 'c++', 'c/c++', 'sql', 'html5', 'css3', 'xml'].some(lang => s === lang || s.startsWith(lang))) {
            return 'languages';
        }
        if (['android', 'compose', 'cmp', 'kmp', 'flutter', 'react native', 'bloc', 'provider', 'riverpod', 'camerax', 'jni', 'workmanager', 'coil', 'hilt', 'koin', 'room', 'sqldelight', 'flashlist', 'reanimated'].some(k => s.includes(k))) {
            return 'mobile';
        }
        if (['react', 'next', 'vite', 'tailwind', 'framer', 'canvas', 'css', 'html', 'webpack', 'electron'].some(k => s.includes(k))) {
            return 'web';
        }
        if (['node', 'express', 'ktor', 'nestjs', 'fastapi', 'postgres', 'mysql', 'sqlite', 'redis', 'supabase', 'firebase', 'aws', 'docker', 'graphql', 'socket', 'webrtc', 'rest'].some(k => s.includes(k))) {
            return 'backend';
        }
        if (['gemini', 'chatgpt', 'mediapipe', 'onnx', 'tensorflow', 'stockfish', 'ml kit', 'fft', 'rag', 'vision', 'opencv', 'ai', 'cursor', 'antigravity'].some(k => s.includes(k))) {
            return 'ai';
        }
        return 'tools';
    };

    const filteredSkills = useMemo(() => {
        if (selectedCategory === 'all') return allSkills;
        return allSkills.filter(s => categorizeSkill(s) === selectedCategory);
    }, [allSkills, selectedCategory]);

    const categories: { id: SkillCategory; label: string; icon: any }[] = [
        { id: 'all', label: `All Skills (${allSkills.length})`, icon: Sparkles },
        { id: 'mobile', label: 'Mobile & Multiplatform', icon: Smartphone },
        { id: 'languages', label: 'Languages', icon: Code },
        { id: 'web', label: 'Web & Frontend', icon: Globe },
        { id: 'backend', label: 'Backend & Cloud', icon: Server },
        { id: 'ai', label: 'AI/ML & DSP', icon: Cpu },
        { id: 'tools', label: 'DevOps & Tools', icon: Wrench },
    ];

    return (
        <section className="section bg-dark-card/50 relative overflow-hidden" id="skills">
            <SectionBackground variant="skills" />
            <div className="container relative z-10">
                <div className="flex flex-col items-center mb-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-title mb-3"
                    >
                        Tech <span className="text-primary-light">Stack</span>
                    </motion.h2>
                    <p className="text-text-muted text-center max-w-xl text-sm mb-6 font-mono">
                        Comprehensive toolkit synthesized from SDE, Android, Flutter, React Native, AI/ML, Backend & Web tracks.
                    </p>

                    {/* Category Filter Pills */}
                    <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white/5 border border-white/10 rounded-2xl max-w-4xl">
                        {categories.map(cat => {
                            const Icon = cat.icon;
                            const isActive = selectedCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                                        isActive
                                            ? 'bg-primary text-white shadow-md shadow-primary/30 font-semibold'
                                            : 'text-text-muted hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    <Icon size={13} />
                                    <span>{cat.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Skills Grid */}
                <motion.div 
                    layout
                    className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5"
                >
                    <AnimatePresence>
                        {filteredSkills.map((skill) => {
                            const iconData = getSkillIcon(skill);

                            return (
                                <motion.div
                                    layout
                                    key={skill}
                                    className="glass-card p-2 flex flex-col items-center justify-center gap-1.5 hover:bg-white/10 transition-all cursor-default group bg-white/5 border border-white/5 hover:border-primary/40 rounded-xl"
                                    whileHover={{ y: -3, scale: 1.02 }}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.15 }}
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
                                            <iconData.Component size={22} className="text-primary-light group-hover:scale-110 transition-transform duration-300" />
                                        </div>
                                    )}
                                    <span className="font-mono text-[9px] md:text-[10px] text-text-muted group-hover:text-white transition-colors text-center leading-tight line-clamp-2 max-w-full px-0.5 break-words">
                                        {skill}
                                    </span>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
