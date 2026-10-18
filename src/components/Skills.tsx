import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Code, Terminal, Cpu, Layout, Layers, Smartphone, Box, 
    Sparkles, Wrench, Globe, Server
} from 'lucide-react';
import SectionBackground from './SectionBackground';

// Verified, high-fidelity skill icon mappings
const getSkillIcon = (skill: string) => {
    const iconMap: { [key: string]: string } = {
        "Kotlin": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
        "Java": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
        "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        "Dart": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
        "C++": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
        "SQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
        "HTML5": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        "CSS3": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
        "Android Native": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
        "Jetpack Compose": "https://developer.android.com/static/images/jetpack/compose-logo.svg",
        "Compose Multiplatform (CMP)": "https://github.com/JetBrains/compose-multiplatform/raw/master/artwork/compose-logo.png",
        "Kotlin Multiplatform (KMP)": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
        "React Native": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        "Expo": "https://www.vectorlogo.zone/logos/expoio/expoio-icon.svg",
        "Flutter": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
        "React.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        "TailwindCSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
        "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        "Express": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
        "Electron": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/electron/electron-original.svg",
        "Firebase": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
        "Cloud Firestore": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
        "Supabase": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
        "PostgreSQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
        "MySQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
        "Redis": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
        "SQLite": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
        "Room Database": "https://www.vectorlogo.zone/logos/android/android-icon.svg",
        "Docker": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
        "AWS (S3 & EC2)": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
        "Git": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
        "GitHub": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
        "Postman": "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg",
        "Android Studio": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg",
        "VS Code": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
        "Xcode": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xcode/xcode-original.svg",
        "Redux Toolkit": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
        "Vite": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg",
        "Linux/Unix": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
        "Gradle": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gradle/gradle-original.svg",
        "Retrofit": "https://www.vectorlogo.zone/logos/squareup_retrofit/squareup_retrofit-icon.svg",
        "Dagger/Hilt": "https://www.vectorlogo.zone/logos/google_dagger/google_dagger-icon.svg",
        "Koin": "https://insert-koin.io/img/koin_logo.png",
        "WebSockets": "https://www.vectorlogo.zone/logos/websocket/websocket-icon.svg",
        "Socket.io": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg",
        "WebRTC": "https://www.vectorlogo.zone/logos/webrtc/webrtc-icon.svg",
        "GraphQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
        "OpenCV": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg",
        "TensorFlow Lite": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg"
    };

    if (iconMap[skill]) return { type: 'img', src: iconMap[skill] };

    // Abstract Fallback Icons
    const iconFallback: { [key: string]: any } = {
        "WorkManager": Box,
        "JNI/NDK": Terminal,
        "ML Kit": Cpu,
        "Clean Architecture": Layers,
        "MVVM & MVI": Layers,
        "Material Design 3": Layout,
        "Coroutines & Flow": Code,
        "Bloc / Cubit": Layers,
        "Riverpod": Layers,
        "Reanimated 3": Layout,
        "MediaPipe LLM API": Cpu,
        "ONNX Runtime": Cpu,
        "Stockfish NNUE": Cpu,
        "FFT Spectrum DSP": Sparkles,
        "On-Device RAG": Cpu,
        "AES-256-GCM Encryption": Terminal,
        "JWT & OAuth 2.0": Terminal,
        "CameraX": Smartphone,
        "CI/CD GitHub Actions": Wrench,
        "Framer Motion": Layout,
        "Data Structures & Algorithms": Code
    };

    const FallbackIcon = iconFallback[skill] || Code;
    return { type: 'icon', Component: FallbackIcon };
};

// Clean, deduplicated, verified tech stack directly from the 7 resumes
interface TechItem {
    name: string;
    category: 'mobile' | 'languages' | 'web' | 'backend' | 'ai' | 'tools';
}

const VERIFIED_TECH_STACK: TechItem[] = [
    // Mobile & Cross-Platform
    { name: "Android Native", category: "mobile" },
    { name: "Jetpack Compose", category: "mobile" },
    { name: "Compose Multiplatform (CMP)", category: "mobile" },
    { name: "Kotlin Multiplatform (KMP)", category: "mobile" },
    { name: "React Native", category: "mobile" },
    { name: "Expo", category: "mobile" },
    { name: "Flutter", category: "mobile" },
    { name: "Coroutines & Flow", category: "mobile" },
    { name: "MVVM & MVI", category: "mobile" },
    { name: "Dagger/Hilt", category: "mobile" },
    { name: "Koin", category: "mobile" },
    { name: "Room Database", category: "mobile" },
    { name: "Retrofit", category: "mobile" },
    { name: "Bloc / Cubit", category: "mobile" },
    { name: "Riverpod", category: "mobile" },
    { name: "Reanimated 3", category: "mobile" },
    { name: "CameraX", category: "mobile" },
    { name: "WorkManager", category: "mobile" },

    // Languages
    { name: "Kotlin", category: "languages" },
    { name: "Java", category: "languages" },
    { name: "TypeScript", category: "languages" },
    { name: "JavaScript", category: "languages" },
    { name: "Python", category: "languages" },
    { name: "Dart", category: "languages" },
    { name: "C++", category: "languages" },
    { name: "SQL", category: "languages" },
    { name: "HTML5", category: "languages" },
    { name: "CSS3", category: "languages" },

    // Web & Frontend
    { name: "React.js", category: "web" },
    { name: "Next.js", category: "web" },
    { name: "TailwindCSS", category: "web" },
    { name: "Redux Toolkit", category: "web" },
    { name: "Framer Motion", category: "web" },
    { name: "Vite", category: "web" },
    { name: "Electron", category: "web" },
    { name: "Material Design 3", category: "web" },

    // Backend & Cloud
    { name: "Node.js", category: "backend" },
    { name: "Express", category: "backend" },
    { name: "PostgreSQL", category: "backend" },
    { name: "Supabase", category: "backend" },
    { name: "Firebase", category: "backend" },
    { name: "Cloud Firestore", category: "backend" },
    { name: "MySQL", category: "backend" },
    { name: "Redis", category: "backend" },
    { name: "SQLite", category: "backend" },
    { name: "WebSockets", category: "backend" },
    { name: "Socket.io", category: "backend" },
    { name: "WebRTC", category: "backend" },
    { name: "GraphQL", category: "backend" },
    { name: "AWS (S3 & EC2)", category: "backend" },
    { name: "AES-256-GCM Encryption", category: "backend" },
    { name: "JWT & OAuth 2.0", category: "backend" },

    // AI/ML & DSP
    { name: "MediaPipe LLM API", category: "ai" },
    { name: "ONNX Runtime", category: "ai" },
    { name: "TensorFlow Lite", category: "ai" },
    { name: "ML Kit", category: "ai" },
    { name: "OpenCV", category: "ai" },
    { name: "Stockfish NNUE", category: "ai" },
    { name: "FFT Spectrum DSP", category: "ai" },
    { name: "On-Device RAG", category: "ai" },

    // Core Architecture & DevOps Tools
    { name: "Data Structures & Algorithms", category: "tools" },
    { name: "Clean Architecture", category: "tools" },
    { name: "JNI/NDK", category: "tools" },
    { name: "Git", category: "tools" },
    { name: "GitHub", category: "tools" },
    { name: "Docker", category: "tools" },
    { name: "Postman", category: "tools" },
    { name: "Android Studio", category: "tools" },
    { name: "Xcode", category: "tools" },
    { name: "VS Code", category: "tools" },
    { name: "Gradle", category: "tools" },
    { name: "Linux/Unix", category: "tools" },
    { name: "CI/CD GitHub Actions", category: "tools" }
];

type SkillCategory = 'mobile' | 'languages' | 'web' | 'backend' | 'ai' | 'tools';

const Skills: React.FC = () => {
    // Default to 'mobile' (removed 'all verified' tab as requested)
    const [selectedCategory, setSelectedCategory] = useState<SkillCategory>('mobile');

    const filteredSkills = useMemo(() => {
        return VERIFIED_TECH_STACK.filter(s => s.category === selectedCategory);
    }, [selectedCategory]);

    const categories: { id: SkillCategory; label: string; icon: any }[] = [
        { id: 'mobile', label: 'Mobile & Multiplatform', icon: Smartphone },
        { id: 'languages', label: 'Languages', icon: Code },
        { id: 'web', label: 'Web & Frontend', icon: Globe },
        { id: 'backend', label: 'Backend & Cloud', icon: Server },
        { id: 'ai', label: 'AI/ML & DSP', icon: Cpu },
        { id: 'tools', label: 'Architecture & DevOps', icon: Wrench },
    ];

    return (
        <section className="section bg-dark relative overflow-hidden" id="skills">
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
                    <p className="text-text-muted text-center max-w-xl text-xs md:text-sm mb-6 font-mono">
                        Curated technologies actively featured in my production resumes, systems, and mobile architectures.
                    </p>

                    {/* Category Filter Pills: Subtle, subtle border stroke */}
                    <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-dark-card/90 border border-white/5 rounded-2xl max-w-4xl shadow-sm">
                        {categories.map(cat => {
                            const Icon = cat.icon;
                            const isActive = selectedCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                                        isActive
                                            ? 'bg-primary text-white shadow-md shadow-primary/25 font-semibold'
                                            : 'text-text-muted hover:text-text hover:bg-dark'
                                    }`}
                                >
                                    <Icon size={13} />
                                    <span>{cat.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Skills Grid: Subtle borders, no harsh white stroke in dark mode */}
                <motion.div 
                    layout
                    className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5"
                >
                    <AnimatePresence>
                        {filteredSkills.map((item) => {
                            const iconData = getSkillIcon(item.name);

                            return (
                                <motion.div
                                    layout
                                    key={item.name}
                                    className="p-2.5 flex flex-col items-center justify-center gap-1.5 transition-all cursor-default group bg-dark-card border border-white/5 hover:border-primary/40 hover:bg-dark rounded-xl shadow-sm"
                                    whileHover={{ y: -3, scale: 1.02 }}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    {iconData.type === 'img' ? (
                                        <div className={`w-8 h-8 flex items-center justify-center p-1 ${item.name.includes("GitHub") ? "bg-white rounded-full p-0.5" : ""}`}>
                                            <img
                                                src={iconData.src}
                                                alt={item.name}
                                                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-sm"
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
                                            <iconData.Component size={22} className="text-primary group-hover:scale-110 transition-transform duration-300" />
                                        </div>
                                    )}
                                    <span className="font-mono text-[9px] md:text-[10px] text-text-muted group-hover:text-text transition-colors text-center leading-tight line-clamp-2 max-w-full px-0.5 break-words font-medium">
                                        {item.name}
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
