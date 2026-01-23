import React from 'react';
import { motion } from 'framer-motion';
import { Music, Cpu, Instagram, Database, Globe, Folder, FileText, Users, Star, MessageCircle, Hash, Layout, GitBranch, Zap, Smartphone } from 'lucide-react';

type BackgroundVariant = 'hero' | 'skills' | 'experience' | 'music' | 'instagram' | 'projects' | 'writing' | 'community' | 'default';

interface SectionBackgroundProps {
    variant?: BackgroundVariant;
    className?: string;
}

const SectionBackground: React.FC<SectionBackgroundProps> = ({ variant = 'default', className = '' }) => {
    // Common float animation settings


    const renderVariant = () => {
        switch (variant) {
            case 'hero':
                return (
                    <>
                        {/* 1. Scrolling Code Streams (Left & Right) */}
                        <div className="absolute inset-0 overflow-hidden opacity-20">
                            {[...Array(6)].map((_, i) => (
                                <motion.div
                                    key={`code-col-${i}`}
                                    className="absolute top-0 text-xs md:text-sm font-mono text-primary-light/60 whitespace-nowrap"
                                    style={{
                                        left: `${10 + i * 15}%`,
                                        opacity: 0.3
                                    }}
                                    animate={{
                                        y: ['-100%', '100%'],
                                        opacity: [0, 1, 0]
                                    }}
                                    transition={{
                                        duration: 8 + Math.random() * 5,
                                        repeat: Infinity,
                                        ease: "linear",
                                        delay: i * 1.5
                                    }}
                                >
                                    {['fun onCreate() {', '@Composable', 'Modifier.fillMaxSize()', 'val viewModel: MainViewModel', 'checkState(true)', 'gradlew build', 'installDebug'][i % 7]}
                                    <br /><br />
                                    {['setContent {', 'Surface(color = Bg)', 'NavHost(navController)', 'hiltViewModel()', 'rememberCoroutineScope()', 'LaunchedEffect(Unit)', 'Log.d("TAG", "Boot")'][i % 7]}
                                    <br /><br />
                                    {['return UIState', 'lazyColumn {', 'items(items) {', 'Card(elevation = 4.dp)', 'Text(text = "Hello")', 'Image(painter = paint)', 'Button(onClick = {})'][i % 7]}
                                </motion.div>
                            ))}
                        </div>

                        {/* 2. "App Creation" Wireframes (Center/Right) */}
                        {/* Abstract Phone Frames assembling */}
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={`phone-${i}`}
                                className="absolute border-2 border-secondary/30 rounded-3xl bg-dark-card/10 backdrop-blur-sm"
                                style={{
                                    width: '180px',
                                    height: '320px',
                                    right: `${10 + i * 5}%`,
                                    top: `${20 + i * 10}%`,
                                    zIndex: 0
                                }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{
                                    opacity: [0, 0.6, 0],
                                    scale: [0.8, 1, 0.9],
                                    y: [20, 0, -20]
                                }}
                                transition={{
                                    duration: 10,
                                    repeat: Infinity,
                                    delay: i * 3,
                                    ease: "easeInOut"
                                }}
                            >
                                {/* UI Elements inside the "Phone" */}
                                <motion.div
                                    className="h-4 w-3/4 bg-primary/20 m-4 rounded"
                                    animate={{ width: ["0%", "75%"] }}
                                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 8, delay: i * 3 + 1 }}
                                />
                                <div className="grid grid-cols-2 gap-2 p-4 pt-0">
                                    {[...Array(4)].map((_, j) => (
                                        <motion.div
                                            key={j}
                                            className="h-16 bg-secondary/10 rounded-lg"
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: i * 3 + 2 + (j * 0.2), duration: 0.5, repeat: Infinity, repeatDelay: 9.5 }}
                                        />
                                    ))}
                                </div>
                                {/* Floating "Success" Badge */}
                                <motion.div
                                    className="absolute bottom-4 right-4 text-green-400"
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 1] }}
                                    transition={{ delay: i * 3 + 4, duration: 2, repeat: Infinity, repeatDelay: 8 }}
                                >
                                    <Zap size={24} fill="currentColor" />
                                </motion.div>
                            </motion.div>
                        ))}

                        {/* 3. Floating Android/Tech Icons connected by lines */}
                        <motion.div
                            animate={{ rotate: 360, y: [0, -30, 0] }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            className="absolute top-[15%] right-[25%] opacity-30 text-green-500"
                        >
                            <Smartphone size={100} />
                        </motion.div>

                        {/* Connecting Lines (Simulating Logic) */}
                        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
                            <motion.path
                                d="M 200 100 Q 400 300 600 200 T 1000 400"
                                fill="transparent"
                                stroke="url(#gradient-line)"
                                strokeWidth="2"
                                animate={{ pathLength: [0, 1, 0], opacity: [0, 0.5, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                            />
                            <defs>
                                <linearGradient id="gradient-line" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="#3b82f6" />
                                    <stop offset="100%" stopColor="#10b981" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </>
                );

            case 'projects':
                return (
                    <>
                        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:60px_60px]" />
                        <motion.div
                            animate={{ rotate: 180 }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                            className="absolute top-[15%] left-[10%] opacity-20 text-white"
                        >
                            <Folder size={100} />
                        </motion.div>
                        <motion.div
                            animate={{ rotate: -180 }}
                            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                            className="absolute bottom-[20%] right-[10%] opacity-20 text-primary"
                        >
                            <Layout size={120} />
                        </motion.div>
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute text-secondary/20"
                                style={{
                                    left: `${Math.random() * 90}%`,
                                    top: `${Math.random() * 90}%`
                                }}
                                animate={{
                                    y: [0, -40, 0],
                                    rotate: [0, 20, 0]
                                }}
                                transition={{ duration: 15, repeat: Infinity, delay: i * 2 }}
                            >
                                <GitBranch size={40 + Math.random() * 30} />
                            </motion.div>
                        ))}
                    </>
                );

            case 'skills':
                return (
                    <>
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                            className="absolute top-[5%] right-[-5%] opacity-25 text-secondary"
                        >
                            <Cpu size={250} />
                        </motion.div>
                        <motion.div
                            animate={{ rotate: -180 }}
                            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                            className="absolute bottom-[10%] left-[-5%] opacity-20 text-primary"
                        >
                            <Database size={200} />
                        </motion.div>
                        {/* More Tech Symbols */}
                        {[...Array(10)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute text-white/10"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`
                                }}
                                animate={{ opacity: [0.1, 0.4, 0.1] }}
                                transition={{ duration: 4, repeat: Infinity, delay: i }}
                            >
                                <Hash size={24} />
                            </motion.div>
                        ))}
                    </>
                );
            case 'experience':
                return (
                    <>
                        {/* Full height timeline-like visuals */}
                        <div className="absolute left-[10%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                        <div className="absolute right-[10%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />

                        <motion.div
                            animate={{ y: [0, -50, 0] }}
                            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-[20%] right-[15%] opacity-20 text-white"
                        >
                            <Globe size={180} />
                        </motion.div>
                        <motion.div
                            animate={{ y: [0, 50, 0] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-[20%] left-[15%] opacity-20 text-primary-light"
                        >
                            <BriefcaseIcon size={140} />
                        </motion.div>
                    </>
                );

            case 'writing':
                return (
                    <>
                        <motion.div
                            animate={{ rotate: [0, 10, 0], y: [0, -20, 0] }}
                            transition={{ duration: 8, repeat: Infinity }}
                            className="absolute top-[10%] left-[5%] opacity-20 text-white"
                        >
                            <FileText size={120} />
                        </motion.div>
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute text-primary/20"
                                style={{
                                    right: `${Math.random() * 40}%`,
                                    top: `${Math.random() * 90}%`
                                }}
                                animate={{ x: [0, -30, 0], opacity: [0.1, 0.4, 0.1] }}
                                transition={{ duration: 10 + i, repeat: Infinity }}
                            >
                                <div className="w-32 h-2 bg-white/20 rounded-full mb-2" />
                                <div className="w-24 h-2 bg-white/10 rounded-full" />
                            </motion.div>
                        ))}
                    </>
                );

            case 'community':
                return (
                    <>
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 5, repeat: Infinity }}
                            className="absolute top-[15%] right-[20%] opacity-20 text-yellow-400"
                        >
                            <Star size={100} />
                        </motion.div>
                        {[...Array(12)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute text-white/10"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`
                                }}
                                animate={{ y: -50, opacity: [0, 1, 0] }}
                                transition={{ duration: 8 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 5 }}
                            >
                                {i % 2 === 0 ? <Users size={30} /> : <MessageCircle size={24} />}
                            </motion.div>
                        ))}
                    </>
                );

            case 'music':
                return (
                    <>
                        <motion.div
                            animate={{ rotate: [0, 10, 0], y: [0, -20, 0] }}
                            transition={{ duration: 5, repeat: Infinity }}
                            className="absolute top-[10%] left-[10%] opacity-30 text-pink-500"
                        >
                            <Music size={120} />
                        </motion.div>
                        <motion.div
                            animate={{ rotate: [0, -10, 0], y: [0, 20, 0] }}
                            transition={{ duration: 7, repeat: Infinity }}
                            className="absolute bottom-[20%] right-[10%] opacity-20 text-purple-500"
                        >
                            <Music size={150} />
                        </motion.div>
                        {/* Distributed Notes */}
                        {[...Array(15)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute text-pink-500/30"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`
                                }}
                                animate={{
                                    y: -150,
                                    opacity: [0, 0.8, 0],
                                    x: Math.sin(i) * 30
                                }}
                                transition={{
                                    duration: 5 + Math.random() * 5,
                                    repeat: Infinity,
                                    delay: Math.random() * 5
                                }}
                            >
                                <Music size={20 + Math.random() * 20} />
                            </motion.div>
                        ))}
                    </>
                );

            case 'instagram':
                return (
                    <>
                        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/10 via-pink-500/10 to-purple-500/10 mix-blend-screen" />
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute text-white/10"
                                style={{
                                    left: `${Math.random() * 90}%`,
                                    top: `${Math.random() * 80}%`
                                }}
                                animate={{
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 360, 0],
                                    opacity: [0.1, 0.3, 0.1]
                                }}
                                transition={{
                                    duration: 15 + Math.random() * 10,
                                    repeat: Infinity,
                                    delay: Math.random() * 5
                                }}
                            >
                                <Instagram size={40 + Math.random() * 40} />
                            </motion.div>
                        ))}
                    </>
                )

            default:
                return (
                    <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:40px_40px]" />
                );
        }
    };

    return (
        <div className={`absolute inset-0 pointer-events-none overflow-hidden z-0 ${className}`}>
            {renderVariant()}
        </div>
    );
};

// Helper for Briefcase icon
const BriefcaseIcon = ({ size }: { size: number }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
);

export default SectionBackground;
