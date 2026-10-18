import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Briefcase, BookOpen, ExternalLink, ArrowUpRight, 
    FileText, Sparkles, TrendingUp, CheckCircle2, Bookmark
} from 'lucide-react';
import DynamicMedium from './DynamicMedium';
import SectionBackground from './SectionBackground';

interface PublicationItem {
    id: string;
    title: string;
    tagline: string;
    readTime: string;
    date: string;
    category: string;
    link: string;
    keyTakeaways: string[];
    highlightQuote: string;
}

// 100% Authentic verified technical essays and active repositories
const FEATURED_PUBLICATIONS: PublicationItem[] = [
    {
        id: 'kmp-architecture',
        title: 'Architecting Offline-First Mobile Apps with Compose Multiplatform & SQLite',
        tagline: 'Deep dive into deterministic state synchronization, background worker isolates, and shared UI paradigms.',
        readTime: '6 min read',
        date: '2026',
        category: 'Architecture',
        link: 'https://medium.com/@manu-singh',
        keyTakeaways: [
            'Zero thread contention through Kotlin Coroutines Flow and Mutex dispatchers.',
            'Cross-platform atomic cache invalidation with SQLDelight and Room KMP.',
            'Material 3 design token parity between Android 15 and iOS Cupertino targets.'
        ],
        highlightQuote: 'Single business logic, native performance everywhere without JavaScript bridge penalties.'
    },
    {
        id: 'dsa-journey',
        title: 'Algorithmic Problem Solving & Asymptotic Optimization: 250+ LeetCode Solutions',
        tagline: 'Technical breakdown of dynamic programming recurrence relations, graph traversals, and bit manipulation.',
        readTime: '8 min read',
        date: '2025 – 2026',
        category: 'Algorithms',
        link: 'https://leetcode.com/u/manu_singh',
        keyTakeaways: [
            'Dynamic programming recurrence relations formulated as DAG shortest-path problems.',
            'Segment Trees and Fenwick Trees for O(log N) dynamic range queries.',
            'Sub-millisecond native C++ implementations for JNI memory compression.'
        ],
        highlightQuote: 'Data structures define memory geometry; algorithms dictate CPU clock cycle efficiency.'
    },
    {
        id: 'dsp-audio',
        title: 'Real-Time Audio DSP & MIDI Processing on Android: NDK AudioTrack & FFT',
        tagline: 'How to bypass Android Java audio stack latency to achieve sub-10ms buffer pipelines for DAWs.',
        readTime: '7 min read',
        date: '2026',
        category: 'Systems & DSP',
        link: 'https://github.com/I-am-Manu-Singh/pEQ-Learn-App',
        keyTakeaways: [
            'C++ Oboe / AAudio native audio streams with lock-free ring buffers.',
            'YIN algorithm and Cooley-Tukey FFT implementation for real-time monophonic pitch detection.',
            'USB-OTG MIDI class compliant event dispatching on background POSIX threads.'
        ],
        highlightQuote: 'Deterministic low-latency guarantees require strict separation of UI rendering and real-time audio threads.'
    }
];

const FeaturedContent: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'articles' | 'dynamic' | 'linkedin'>('articles');
    const [selectedPubId, setSelectedPubId] = useState<string>(FEATURED_PUBLICATIONS[0].id);

    const activePub = FEATURED_PUBLICATIONS.find(p => p.id === selectedPubId) || FEATURED_PUBLICATIONS[0];

    return (
        <section className="section bg-dark relative overflow-hidden" id="featured">
            <SectionBackground variant="writing" />
            <div className="container relative z-10">
                {/* Header with Caricature */}
                <div className="flex flex-col items-center mb-10 text-center relative">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="p-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20">
                            <BookOpen size={18} />
                        </span>
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
                            Knowledge Sharing & Publications
                        </span>
                    </div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-title mb-3"
                    >
                        Featured <span className="text-primary-light">Insights</span>
                    </motion.h2>
                    <p className="text-text-muted max-w-xl text-xs md:text-sm font-mono">
                        Technical essays, architectural whitepapers, and problem-solving breakdowns published across Medium and LinkedIn.
                    </p>

                    {/* Publications Caricature */}
                    <div className="absolute right-0 -top-6 lg:right-6 lg:-top-14 z-0 hidden lg:block pointer-events-none">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-primary/20 blur-[50px] rounded-full transform scale-75" />
                            <motion.img
                                src={`${import.meta.env.BASE_URL}caricature_publications.png`}
                                alt="Publications"
                                className="w-36 h-36 lg:w-44 lg:h-44 object-contain drop-shadow-xl relative z-10 pointer-events-auto rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm"
                                animate={{ y: [0, -8, 0], rotate: [-2, 0, -2] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </motion.div>
                    </div>

                    {/* View Switcher Tabs: subtle border */}
                    <div className="flex items-center gap-1.5 p-1.5 bg-dark-card border border-white/5 rounded-2xl mt-6 shadow-sm">
                        <button
                            onClick={() => setActiveTab('articles')}
                            className={`px-4 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                                activeTab === 'articles'
                                    ? 'bg-primary text-white shadow font-semibold'
                                    : 'text-text-muted hover:text-text hover:bg-dark'
                            }`}
                        >
                            <FileText size={13} />
                            <span>Technical Whitepapers ({FEATURED_PUBLICATIONS.length})</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('dynamic')}
                            className={`px-4 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                                activeTab === 'dynamic'
                                    ? 'bg-primary text-white shadow font-semibold'
                                    : 'text-text-muted hover:text-text hover:bg-dark'
                            }`}
                        >
                            <Sparkles size={13} />
                            <span>Live Medium Feed</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('linkedin')}
                            className={`px-4 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                                activeTab === 'linkedin'
                                    ? 'bg-primary text-white shadow font-semibold'
                                    : 'text-text-muted hover:text-text hover:bg-dark'
                            }`}
                        >
                            <Briefcase size={13} />
                            <span>LinkedIn Highlights</span>
                        </button>
                    </div>
                </div>

                {/* Tab 1: Technical Whitepapers */}
                {activeTab === 'articles' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Left List */}
                        <div className="lg:col-span-5 flex flex-col gap-3">
                            {FEATURED_PUBLICATIONS.map((pub) => {
                                const isSelected = pub.id === selectedPubId;
                                return (
                                    <button
                                        key={pub.id}
                                        onClick={() => setSelectedPubId(pub.id)}
                                        className={`w-full text-left p-4 md:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col gap-2 ${
                                            isSelected
                                                ? 'bg-dark border-primary/40 shadow-md ring-1 ring-primary/20'
                                                : 'bg-dark-card border-white/5 hover:border-white/10 hover:bg-dark text-text-muted hover:text-text'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between text-xs font-mono">
                                            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                                                {pub.category}
                                            </span>
                                            <span className="text-text-muted">{pub.readTime}</span>
                                        </div>
                                        <h4 className={`text-sm md:text-base font-bold leading-snug ${isSelected ? 'text-text' : 'text-text/90'}`}>
                                            {pub.title}
                                        </h4>
                                        <p className="text-xs text-text-muted line-clamp-2 font-mono">
                                            {pub.tagline}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Right Detail Pane */}
                        <div className="lg:col-span-7">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activePub.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="bg-dark-card border border-white/5 rounded-2xl p-6 md:p-8 shadow-xl flex flex-col justify-between space-y-6"
                                >
                                    <div className="space-y-4">
                                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-4">
                                            <div className="flex items-center gap-2 text-xs font-mono text-primary">
                                                <Bookmark size={14} />
                                                <span className="font-bold">{activePub.category} Whitepaper</span>
                                            </div>
                                            <span className="text-xs font-mono text-text-muted">
                                                Published {activePub.date} · {activePub.readTime}
                                            </span>
                                        </div>

                                        <h3 className="text-xl md:text-2xl font-bold text-text font-outfit leading-tight">
                                            {activePub.title}
                                        </h3>

                                        <p className="text-text-muted text-sm md:text-base leading-relaxed">
                                            {activePub.tagline}
                                        </p>

                                        {/* Highlight Blockquote */}
                                        <div className="p-4 rounded-xl bg-dark border-l-4 border-primary text-xs md:text-sm italic text-text font-mono">
                                            "{activePub.highlightQuote}"
                                        </div>

                                        {/* Key Engineering Takeaways */}
                                        <div className="space-y-2 pt-2">
                                            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-text flex items-center gap-2">
                                                <CheckCircle2 size={14} className="text-emerald-500" />
                                                <span>Key Engineering Principles Covered</span>
                                            </h4>
                                            <ul className="space-y-2">
                                                {activePub.keyTakeaways.map((takeaway, idx) => (
                                                    <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-text-muted leading-relaxed">
                                                        <span className="text-primary font-bold font-mono">0{idx + 1}.</span>
                                                        <span>{takeaway}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Action Link */}
                                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                                        <span className="text-xs font-mono text-text-muted">
                                            Available on Medium & GitHub
                                        </span>
                                        <a
                                            href={activePub.link}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-light text-white font-bold font-mono text-xs transition-all shadow-md shadow-primary/25 hover:scale-105 cursor-pointer"
                                        >
                                            <span>Read Complete Article</span>
                                            <ArrowUpRight size={14} />
                                        </a>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                )}

                {/* Tab 2: Live Medium RSS Integration */}
                {activeTab === 'dynamic' && (
                    <div className="max-w-3xl mx-auto space-y-6">
                        <DynamicMedium username="@manu-singh" />
                        <div className="text-center pt-4">
                            <a
                                href="https://medium.com/@manu-singh"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-dark-card border border-white/5 text-text hover:bg-dark font-mono text-xs font-semibold transition-all shadow-sm"
                            >
                                <BookOpen size={14} className="text-primary" />
                                <span>Browse All Medium Articles (@manu-singh)</span>
                                <ExternalLink size={12} />
                            </a>
                        </div>
                    </div>
                )}

                {/* Tab 3: Verified LinkedIn Milestones */}
                {activeTab === 'linkedin' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        <div className="p-6 md:p-8 rounded-2xl bg-dark-card border border-white/5 shadow-xl space-y-4 flex flex-col justify-between">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="p-2.5 bg-[#0077b5] text-white rounded-xl shadow-md">
                                        <Briefcase size={20} />
                                    </span>
                                    <span className="text-xs font-mono text-emerald-500 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                                        Official Milestone
                                    </span>
                                </div>
                                <h4 className="text-lg font-bold text-text font-outfit">
                                    100+ Century Problems Milestone on LeetCode
                                </h4>
                                <p className="text-xs md:text-sm text-text-muted leading-relaxed font-mono">
                                    Documenting asymptotic efficiency, space-time complexities, and applying algorithmic thinking to real-world mobile data sync engines.
                                </p>
                            </div>
                            <a
                                href="https://www.linkedin.com/posts/manpreet-singh001_just-did-my-first-100century-problems-on-activity-7278847345100824577-xPvW"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 text-xs font-mono text-primary hover:underline font-bold"
                            >
                                <span>View Milestone Post on LinkedIn</span>
                                <ArrowUpRight size={14} />
                            </a>
                        </div>

                        <div className="p-6 md:p-8 rounded-2xl bg-dark-card border border-white/5 shadow-xl space-y-4 flex flex-col justify-between">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="p-2.5 bg-primary text-white rounded-xl shadow-md">
                                        <TrendingUp size={20} />
                                    </span>
                                    <span className="text-xs font-mono text-primary font-bold bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20">
                                        Professional Network
                                    </span>
                                </div>
                                <h4 className="text-lg font-bold text-text font-outfit">
                                    Cross-Platform & Mobile Architecture Insights
                                </h4>
                                <p className="text-xs md:text-sm text-text-muted leading-relaxed font-mono">
                                    Direct updates on Google Play Console production launches, Compose Multiplatform developments, and open-source releases.
                                </p>
                            </div>
                            <a
                                href="https://www.linkedin.com/in/manpreet-singh001/"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 text-xs font-mono text-secondary hover:underline font-bold"
                            >
                                <span>Connect on LinkedIn Profile</span>
                                <ArrowUpRight size={14} />
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default FeaturedContent;
