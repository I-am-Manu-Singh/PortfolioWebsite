import React from 'react';
import { motion } from 'framer-motion';
import { Music, Cpu, Instagram, Globe, Folder, Users, MessageCircle, GitBranch } from 'lucide-react';


type BackgroundVariant = 'hero' | 'skills' | 'experience' | 'music' | 'instagram' | 'projects' | 'writing' | 'community' | 'certifications' | 'tutorials' | 'coding' | 'default';


interface SectionBackgroundProps {
    variant?: BackgroundVariant;
    className?: string;
}

const SectionBackground: React.FC<SectionBackgroundProps> = ({ variant = 'default', className = '' }) => {
    // Hero Click Ripple Logic
    const [clickPos, setClickPos] = React.useState<{ x: number, y: number } | null>(null);

    const handleHeroClick = (e: React.MouseEvent) => {
        setClickPos({ x: e.clientX, y: e.clientY });
        setTimeout(() => setClickPos(null), 1000); // Reset for repeated clicks
    };
    // Common float animation settings



    const renderVariant = () => {
        switch (variant) {
            case 'hero':
                return (
                    <div className="absolute inset-0 w-full h-full" onClick={handleHeroClick}>
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-dark to-dark" />

                        {/* Interactive Scattered Code Blocks - Real App Dev & Git Commands */}
                        {[
                            // Real Android/iOS/Git Snippets
                            { text: 'LazyColumn { items(data) { ... } }', x: '10%', y: '15%', rot: -5 },
                            { text: 'viewModelScope.launch { }', x: '70%', y: '10%', rot: 3 },
                            { text: 'pod install', x: '5%', y: '40%', rot: 8 },
                            { text: 'git commit -m "feat: init"', x: '80%', y: '25%', rot: -3 },
                            { text: 'struct HomeView: View', x: '15%', y: '70%', rot: 6 },
                            { text: 'Modifier.fillMaxSize()', x: '85%', y: '60%', rot: -4 },
                            { text: '@Composable', x: '40%', y: '10%', rot: 5 },
                            { text: 'suspend fun fetchData()', x: '50%', y: '85%', rot: -3 },
                            { text: 'val nav = rememberNavController()', x: '35%', y: '50%', rot: 2 },
                            { text: 'Retrofit.Builder().baseUrl()', x: '60%', y: '75%', rot: -6 },
                            { text: 'var body: some View { }', x: '25%', y: '90%', rot: 4 },
                            { text: 'git push origin main', x: '90%', y: '90%', rot: -8 },
                            { text: 'RecyclerView.Adapter', x: '5%', y: '5%', rot: 15 },
                            { text: 'ConstraintLayout', x: '45%', y: '30%', rot: 6 },
                            { text: 'Image(painter = ...)', x: '55%', y: '20%', rot: -4 },
                            { text: 'observer.observe(viewLifecycle) { }', x: '75%', y: '45%', rot: 3 },
                            // Errors (still subtle but present)
                            { text: 'NullPointerException', x: '20%', y: '20%', rot: -12, isError: true },
                            { text: 'Build Failed', x: '90%', y: '50%', rot: 5, isError: true },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className={`absolute cursor-pointer px-2 py-1 bg-white/0 rounded-md font-mono text-xs md:text-sm select-none z-0 pointer-events-auto transition-colors duration-300 ${item.isError ? 'text-red-500/30 opacity-10 hover:text-red-500 hover:opacity-100' : 'text-primary/30 opacity-10 hover:text-primary hover:opacity-100'}`}
                                style={{
                                    left: item.x,
                                    top: item.y,
                                }}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={clickPos ? {
                                    x: (Math.random() - 0.5) * 500, // Disperse
                                    y: (Math.random() - 0.5) * 500,
                                    opacity: 0,
                                    scale: 0.5
                                } : {
                                    opacity: 0.2, // increased base opacity but controlled via class
                                    scale: 1,
                                    rotate: item.rot,
                                    x: [0, (Math.random() - 0.5) * 50, 0],
                                    y: [0, (Math.random() - 0.5) * 50, 0]
                                }}
                                transition={clickPos ? {
                                    type: "spring",
                                    stiffness: 50,
                                    damping: 20
                                } : {
                                    duration: 15 + Math.random() * 10,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                {item.text}
                            </motion.div>
                        ))}
                    </div>
                );



            case 'certifications':
                return (
                    <>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,102,204,0.1),transparent_50%)]" />
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute border border-primary/20 w-32 h-40 rounded-lg bg-white/5 backdrop-blur-sm"
                                style={{
                                    left: `${Math.random() * 90}%`,
                                    top: `${Math.random() * 90}%`
                                }}
                                animate={{
                                    y: [0, -20, 0],
                                    rotate: [0, 5, 0],
                                    opacity: [0.1, 0.3, 0.1]
                                }}
                                transition={{ duration: 10 + Math.random() * 5, repeat: Infinity }}
                            >
                                <div className="h-2 w-16 bg-primary/30 m-4 rounded" />
                                <div className="h-2 w-20 bg-white/10 m-4 mt-2 rounded" />
                                <div className="absolute bottom-4 right-4 text-primary/30">
                                    <Globe size={24} />
                                </div>
                            </motion.div>
                        ))}
                    </>
                );

            case 'tutorials':
                return (
                    <>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,0,0,0.1),transparent_60%)]" />
                        {/* Play buttons floating - made more visible */}
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute text-red-500/30"
                                style={{
                                    left: `${Math.random() * 90}%`,
                                    top: `${Math.random() * 90}%`
                                }}
                                animate={{
                                    scale: [1, 1.3, 1],
                                    opacity: [0.3, 0.7, 0.3],
                                    y: [0, -20, 0]
                                }}
                                transition={{ duration: 4 + Math.random(), repeat: Infinity, delay: i * 0.5 }}
                            >
                                <div className="w-0 h-0 border-t-[15px] border-t-transparent border-l-[25px] border-l-current border-b-[15px] border-b-transparent ml-1 filter drop-shadow-lg" />
                            </motion.div>
                        ))}
                        {/* Floating Tech Icons / Placeholders */}
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={`icon-${i}`}
                                className="absolute text-white/10"
                                style={{
                                    left: `${Math.random() * 80 + 10}%`,
                                    top: '110%'
                                }}
                                animate={{
                                    top: '-10%',
                                    rotate: Math.random() * 360
                                }}
                                transition={{ duration: 20, repeat: Infinity, delay: i * 4, ease: "linear" }}
                            >
                                <Folder size={30} />
                            </motion.div>
                        ))}
                    </>
                );

            case 'coding':
                return (
                    <>
                        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_0%,rgba(0,255,0,0.05)_50%,rgba(0,0,0,0)_100%)] opacity-20" />

                        {/* DSA Visuals - Graphs, Trees, Arrays */}
                        {/* DSA Visuals - Graphs, Trees, Arrays & Complexities */}
                        {[
                            'O(n log n)', 'O(2^n)', 'O(1)', 'visited[i]', 'dp[i][j]',
                            'p_queue.pop()', 'root.left', '>> 1', 'arr.map()',
                            '&&', '||', '=>', '===', '!=', '0xFF',
                            'backtrack()', 'start..end', 'async await',
                            'memo = {}', '<T>'
                        ].map((text, i) => (
                            <motion.div
                                key={i}
                                className="absolute text-primary/20 font-mono font-bold select-none"
                                style={{
                                    left: `${Math.random() * 90}%`,
                                    top: `${Math.random() * 90}%`,
                                    fontSize: Math.random() > 0.7 ? '1.5rem' : '0.9rem'
                                }}
                                animate={{
                                    x: [0, (Math.random() - 0.5) * 100, 0],
                                    y: [0, (Math.random() - 0.5) * 100, 0],
                                    opacity: [0.1, 0.4, 0.1],
                                    scale: [1, 1.1, 1]
                                }}
                                transition={{
                                    duration: 10 + Math.random() * 10,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                    ease: "easeInOut"
                                }}
                            >
                                {text}
                            </motion.div>
                        ))}
                        {/* Decorative Graph Nodes */}
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={`node-${i}`}
                                className="absolute opacity-20 text-primary"
                                style={{
                                    left: `${Math.random() * 80 + 10}%`,
                                    top: `${Math.random() * 80 + 10}%`
                                }}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20 + Math.random() * 10, repeat: Infinity, ease: "linear" }}
                            >
                                <GitBranch size={30 + Math.random() * 20} />
                            </motion.div>
                        ))}
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
                        {/* Audio Waveform Visualization - Enhanced */}
                        <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-end h-full opacity-10 gap-2 md:gap-4 px-10 pointer-events-none">
                            {[...Array(20)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="w-8 md:w-16 bg-gradient-to-t from-pink-600 via-purple-600 to-transparent rounded-t-xl"
                                    animate={{
                                        height: ['10%', `${Math.random() * 80 + 20}%`, '10%']
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

                        {/* Floating Notes - More visible & covering entire height */}
                        {[...Array(15)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute text-pink-500/20"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: '110%'
                                }}
                                animate={{
                                    top: '-20%',
                                    x: Math.sin(i) * 50,
                                    opacity: [0, 0.6, 0],
                                    rotate: [0, 360]
                                }}
                                transition={{
                                    duration: 15 + Math.random() * 10,
                                    repeat: Infinity,
                                    delay: i * 1.5,
                                    ease: "linear"
                                }}
                            >
                                <Music size={40 + Math.random() * 60} />
                            </motion.div>
                        ))}
                    </>
                );

            case 'instagram':
                return (
                    <>
                        {/* Animated Mesh Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-black to-orange-900/20" />

                        {/* Interactive Floating Orbs */}
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute rounded-full blur-[80px]"
                                style={{
                                    width: Math.random() * 300 + 100,
                                    height: Math.random() * 300 + 100,
                                    background: i % 2 === 0 ? 'rgba(139, 92, 246, 0.1)' : 'rgba(236, 72, 153, 0.1)', // Purple/Pink
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`
                                }}
                                animate={{
                                    x: [0, 100, 0],
                                    y: [0, 100, 0],
                                    scale: [1, 1.2, 1]
                                }}
                                transition={{
                                    duration: 20 + Math.random() * 10,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                        ))}

                        {/* Floating Camera Icons */}
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                className={`absolute ${i % 2 === 0 ? 'text-white/5' : 'text-primary/10'}`}
                                style={{
                                    left: `${Math.random() * 90}%`,
                                    top: `${Math.random() * 90}%`
                                }}
                                animate={{
                                    y: [0, -40, 0],
                                    rotate: [0, 10, 0]
                                }}
                                transition={{
                                    duration: 10 + Math.random() * 5,
                                    repeat: Infinity,
                                    delay: i * 2
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
        <div className={`absolute inset-0 overflow-hidden z-0 ${variant === 'hero' ? 'pointer-events-auto' : 'pointer-events-none'} ${className}`}>
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
