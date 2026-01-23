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
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]" />
                        {/* Git Graph Simulation */}
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={`git-${i}`}
                                className="absolute top-0 bottom-0 w-1 bg-white/5"
                                style={{ left: `${20 + i * 15}%` }}
                            >
                                {/* Commits nodes */}
                                <motion.div
                                    className="w-4 h-4 rounded-full bg-primary/40 absolute -left-1.5"
                                    animate={{ y: ['0%', '100%'], opacity: [0, 1, 0] }}
                                    transition={{ duration: 5 + i, repeat: Infinity, ease: "linear", delay: i }}
                                />
                            </motion.div>
                        ))}
                        {/* Floating Folders/Files */}
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute text-secondary/20"
                                style={{
                                    left: `${Math.random() * 90}%`,
                                    top: `${Math.random() * 90}%`
                                }}
                                animate={{
                                    y: [0, -60, 0],
                                    rotate: [0, 15, 0],
                                    opacity: [0.1, 0.4, 0.1]
                                }}
                                transition={{ duration: 12, repeat: Infinity, delay: i * 2 }}
                            >
                                <Folder size={40 + Math.random() * 40} />
                            </motion.div>
                        ))}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                            className="absolute top-[10%] right-[5%] opacity-10 text-white"
                        >
                            <GitBranch size={200} />
                        </motion.div>
                    </>
                );

            case 'skills':
                return (
                    <>
                        {/* Circuit Board Lines */}
                        <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
                            <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                                <path d="M10,10 L90,10 M10,10 L10,90 M50,50 L90,50" stroke="currentColor" strokeWidth="2" fill="none" />
                                <circle cx="10" cy="10" r="3" fill="currentColor" />
                                <circle cx="90" cy="50" r="3" fill="currentColor" />
                            </pattern>
                            <rect width="100%" height="100%" fill="url(#circuit)" />
                        </svg>

                        {/* Pulsing Server Racks */}
                        {[...Array(4)].map((_, i) => (
                            <motion.div
                                key={`server-${i}`}
                                className="absolute bottom-0 w-24 h-64 bg-white/5 rounded-t-lg border-x border-t border-white/10 backdrop-blur-sm"
                                style={{ left: `${15 + i * 20}%` }}
                                initial={{ y: 100 }}
                                whileInView={{ y: 0 }}
                                viewport={{ once: true }}
                            >
                                {/* Blinking Lights */}
                                {[...Array(5)].map((_, j) => (
                                    <motion.div
                                        key={j}
                                        className="w-1.5 h-1.5 rounded-full bg-green-500 mx-auto mt-4"
                                        animate={{ opacity: [0.2, 1, 0.2] }}
                                        transition={{ duration: 0.5, repeat: Infinity, delay: Math.random() }}
                                    />
                                ))}
                            </motion.div>
                        ))}

                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                            className="absolute top-[15%] left-[5%] opacity-20 text-blue-500"
                        >
                            <Cpu size={180} />
                        </motion.div>
                        <motion.div
                            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]"
                        />
                    </>
                );

            case 'experience':
                return (
                    <>
                        {/* Dynamic Timeline Path */}
                        <svg className="absolute inset-0 w-full h-full opacity-20">
                            <motion.path
                                d="M 100 0 Q 300 200 100 400 T 100 800"
                                fill="transparent"
                                stroke="url(#experience-gradient)"
                                strokeWidth="3"
                                strokeDasharray="10 10"
                                animate={{ strokeDashoffset: [0, -100] }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            />
                            <defs>
                                <linearGradient id="experience-gradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#fff" />
                                    <stop offset="100%" stopColor="#3b82f6" />
                                </linearGradient>
                            </defs>
                        </svg>

                        {/* Floating Globes/Cities */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                            className="absolute top-[20%] right-[10%] opacity-10 text-white"
                        >
                            <Globe size={300} strokeWidth={1} />
                        </motion.div>

                        {/* Briefcases floating up */}
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute text-primary-light/30"
                                style={{
                                    left: `${Math.random() * 80 + 10}%`,
                                    bottom: '-10%'
                                }}
                                animate={{
                                    y: -1000,
                                    opacity: [0, 0.5, 0],
                                    rotate: Math.random() * 30 - 15
                                }}
                                transition={{
                                    duration: 15 + Math.random() * 10,
                                    repeat: Infinity,
                                    delay: i * 3
                                }}
                            >
                                <BriefcaseIcon size={40 + Math.random() * 20} />
                            </motion.div>
                        ))}
                    </>
                );

            case 'community':
                return (
                    <>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0,rgba(0,0,0,0)_70%)]" />
                        {/* Connecting Nodes Network */}
                        {[...Array(15)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md"
                                style={{
                                    width: Math.random() * 40 + 30,
                                    height: Math.random() * 40 + 30,
                                    left: `${Math.random() * 90}%`,
                                    top: `${Math.random() * 90}%`
                                }}
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.3, 0.6, 0.3],
                                    x: [0, Math.random() * 30, 0],
                                    y: [0, Math.random() * 30, 0]
                                }}
                                transition={{ duration: 5 + Math.random() * 5, repeat: Infinity }}
                            >
                                {i % 3 === 0 ? <Users size={16} className="text-white/50" /> : <MessageCircle size={16} className="text-primary/50" />}
                            </motion.div>
                        ))}
                    </>
                );

            case 'music':
                return (
                    <>
                        {/* Audio Waveform Visualization */}
                        <div className="absolute bottom-0 left-0 right-0 flex justify-center items-end h-1/2 opacity-20 gap-1 md:gap-3 px-10">
                            {[...Array(20)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="w-4 md:w-8 bg-gradient-to-t from-pink-500 to-purple-500 rounded-t-lg"
                                    animate={{
                                        height: ['10%', `${Math.random() * 60 + 20}%`, '10%']
                                    }}
                                    transition={{
                                        duration: 0.8,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                        delay: i * 0.05,
                                        ease: "easeInOut"
                                    }}
                                />
                            ))}
                        </div>

                        {/* Floating Notes */}
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute text-pink-500/30"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    bottom: '0%'
                                }}
                                animate={{
                                    y: -800,
                                    x: Math.sin(i) * 100,
                                    opacity: [0, 0.8, 0],
                                    rotate: [0, 360]
                                }}
                                transition={{
                                    duration: 10 + Math.random() * 5,
                                    repeat: Infinity,
                                    delay: i * 2
                                }}
                            >
                                <Music size={40 + Math.random() * 30} />
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
