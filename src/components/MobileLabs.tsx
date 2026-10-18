import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Play, Rocket, Github, CheckCircle2, Sparkles,  
    Smartphone, ShieldCheck, Terminal, Cpu, Database, Radio, 
    Activity, Layers, ArrowUpRight
} from 'lucide-react';
import SectionBackground from './SectionBackground';

interface LabApp {
    id: string;
    name: string;
    tagline: string;
    description: string;
    architectureOverview: string;
    telemetry: {
        track: string;
        targetSdk: string;
        pipeline: string;
        offlineStorage: string;
        testingStatus: string;
    };
    tech: string[];
    logo: string;
    github: string;
    previewUrl?: string;
    gradient: string;
    status: string;
    statusColor: 'emerald' | 'amber' | 'blue';
    platform: string;
}

const LAB_APPS: LabApp[] = [
    {
        id: 'nitnem',
        name: 'Bani: Nitnem & Steek Companion',
        tagline: 'Production Track · 14-Day Closed Testing on Google Play Console',
        description: 'Sacred Gurbani reading & devotional learning companion engineered with Compose Multiplatform. Features authentic line-by-line Steek (meanings), first-letter phonetic search (Shabad Khoj), synchronized background audio recitation, customizable Gurmukhi typography, and offline habit tracking.',
        architectureOverview: 'Offline-first SQLite SQLiteDelight cache with GurbaniDB indexation, Media3 ExoPlayer foreground media service with lock-screen notification media session controls, and adaptive Material 3 UI.',
        telemetry: {
            track: 'Closed Testing (20 Testers)',
            targetSdk: 'Android 15 (API 35)',
            pipeline: 'CMP Shared UI (Android/iOS)',
            offlineStorage: 'SQLite + Room FTS',
            testingStatus: 'Active Verification'
        },
        tech: ['Compose Multiplatform', 'Offline SQLite', 'GurbaniDB', 'Media3 Audio', 'Habit Streaks', 'Material 3 Expressive'],
        logo: `${import.meta.env.BASE_URL}logos/nitnem.png`,
        github: 'https://github.com/I-am-Manu-Singh/NitnemGutkaSahib',
        gradient: 'from-amber-500/20 via-orange-500/20 to-yellow-500/20',
        status: 'Closed Testing (Google Play)',
        statusColor: 'amber',
        platform: 'Android & iOS (CMP)'
    },
    {
        id: 'peq-learn',
        name: 'pEQ-Learn: Interactive Music DAW & Ear Trainer',
        tagline: 'Professional Audio Architecture · MIDI & Score Lab',
        description: 'Advanced music theory workstation and micro-ear trainer supporting real-time polyphonic MIDI visualization, multi-octave virtual keyboards, Indian classical Radel tanpura/tabla drone synthesis, and parametric audio analysis.',
        architectureOverview: 'Real-time USB-OTG MIDI host input stream parsing, low-latency audio engine utilizing Android NDK AudioTrack with FFT spectrum analysis, and dynamic vector notation rendering.',
        telemetry: {
            track: 'Internal Production Release',
            targetSdk: 'Android 15 (API 35)',
            pipeline: 'CMP + Native C++ AudioTrack',
            offlineStorage: 'Local Score State Machine',
            testingStatus: 'Hardware Calibrated'
        },
        tech: ['Compose Multiplatform', 'MIDI SysEx DSP', 'NDK AudioTrack', 'FFT Analyzer', 'Vector Notation', 'Indian Raga Engine'],
        logo: `${import.meta.env.BASE_URL}profile.jpg`,
        github: 'https://github.com/I-am-Manu-Singh/pEQ-Learn-App',
        gradient: 'from-blue-500/20 via-cyan-500/20 to-indigo-500/20',
        status: 'Alpha Internal Release',
        statusColor: 'blue',
        platform: 'Android & Multiplatform'
    },
    {
        id: 'quicktone',
        name: 'QuickTone: Guitar Lab & MIDI Studio',
        tagline: 'High-Fidelity Tablature & Microtonal Synthesizer',
        description: 'Real-time guitar fretboard mapper, interactive tablature visualizer, and custom chord dictionary with integrated tuner DSP and MIDI sequencing for practicing instrumentalists.',
        architectureOverview: 'Real-time pitch detection via YIN/FFT algorithmic pipeline, gesture-driven Compose Canvas fretboard with microsecond touch dispatching, and chord voicing lookup trees.',
        telemetry: {
            track: 'Prototype Candidate',
            targetSdk: 'Android 14+ (API 34)',
            pipeline: 'Pure Jetpack Compose Canvas',
            offlineStorage: 'Binary Voicing Blobs',
            testingStatus: 'Benchmarked 60FPS'
        },
        tech: ['Jetpack Compose', 'Canvas Rendering', 'YIN Pitch DSP', 'MIDI Sequencer', 'Custom Audio Nodes'],
        logo: `${import.meta.env.BASE_URL}profile.jpg`,
        github: 'https://github.com/I-am-Manu-Singh/QuickToneGuitarLab',
        gradient: 'from-emerald-500/20 via-teal-500/20 to-green-500/20',
        status: 'Lab Candidate',
        statusColor: 'emerald',
        platform: 'Android Native'
    }
];

const MobileLabs: React.FC = () => {
    const bannerSrc = `${import.meta.env.BASE_URL}creativebliss_console_banner.png`;
    const [selectedAppId, setSelectedAppId] = useState<string>(LAB_APPS[0].id);

    const activeApp = LAB_APPS.find(a => a.id === selectedAppId) || LAB_APPS[0];

    return (
        <section className="section bg-surface-base relative overflow-hidden" id="mobile-labs">
            <SectionBackground variant="projects" />

            <div className="container relative z-10">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <span className="p-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20">
                                <Smartphone size={18} />
                            </span>
                            <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
                                Production Mobile Engineering
                            </span>
                        </div>
                        <h2 className="section-title text-left mb-2">
                            Mobile <span className="text-primary-light">Labs</span>
                        </h2>
                        <p className="text-text-muted font-mono text-xs md:text-sm tracking-wide">
                            Google Play Console production tracks, release verification pipelines, and hardware audio engineering.
                        </p>
                    </motion.div>

                    <motion.div
                        className="flex flex-wrap items-center gap-3"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-2 px-3.5 py-2 bg-surface-card border border-border-card rounded-2xl text-xs font-mono text-text shadow-sm">
                            <Rocket size={14} className="text-primary animate-bounce" />
                            <span>Creative Bliss Labs · Ecosystem</span>
                        </div>
                        <div className="flex items-center gap-2 px-3.5 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-xs font-mono text-emerald-600 dark:text-emerald-400">
                            <ShieldCheck size={14} />
                            <span>Play Console Compliant</span>
                        </div>
                    </motion.div>
                </div>

                {/* Google Play Console Ecosystem Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-8 group relative rounded-2xl overflow-hidden border border-border-card shadow-xl bg-surface-card"
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 pointer-events-none" />
                    <img
                        src={bannerSrc}
                        alt="Creative Bliss Labs - Google Play Console Banner"
                        className="w-full h-auto max-h-56 object-cover object-center group-hover:scale-[1.01] transition-transform duration-500"
                    />
                    <div className="absolute bottom-3 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 text-white text-xs font-mono">
                            <Sparkles size={14} className="text-primary-light" />
                            <span>Creative Bliss Labs · Active Production Roster</span>
                        </div>
                        <span className="text-xs font-mono text-white/90 bg-black/60 px-3 py-1 rounded-xl backdrop-blur-md border border-white/10 hidden sm:inline-block">
                            Ideas · Products · A Better Everyday
                        </span>
                    </div>
                </motion.div>

                {/* Interactive Project Switcher & Telemetry Cockpit */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Rail: App Selection Tabs */}
                    <div className="lg:col-span-4 flex flex-col gap-3">
                        <div className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted px-1">
                            Select Lab Candidate ({LAB_APPS.length})
                        </div>
                        {LAB_APPS.map((app) => {
                            const isSelected = app.id === selectedAppId;
                            return (
                                <button
                                    key={app.id}
                                    onClick={() => setSelectedAppId(app.id)}
                                    className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                                        isSelected
                                            ? 'bg-surface-elevated border-primary/50 shadow-md ring-1 ring-primary/30'
                                            : 'bg-surface-card border-border-card hover:bg-surface-elevated/60 text-text-muted hover:text-text'
                                    }`}
                                >
                                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-border-card bg-surface-base p-1 shrink-0 flex items-center justify-center shadow-inner">
                                        <img src={app.logo} alt={app.name} className="w-full h-full object-contain rounded-lg" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-1 mb-1">
                                            <h4 className={`text-sm font-bold truncate ${isSelected ? 'text-primary' : 'text-text'}`}>
                                                {app.name.split(':')[0]}
                                            </h4>
                                            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                                                app.statusColor === 'amber' ? 'bg-amber-500/15 text-amber-500 border border-amber-500/30' :
                                                app.statusColor === 'emerald' ? 'bg-emerald-500/15 text-emerald-500 border border-emerald-500/30' :
                                                'bg-blue-500/15 text-blue-500 border border-blue-500/30'
                                            }`}>
                                                {app.status.split(' ')[0]}
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-text-muted truncate font-mono">
                                            {app.platform}
                                        </p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Right Rail: High-Detail Architectural Blueprint */}
                    <div className="lg:col-span-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeApp.id}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.25 }}
                                className="bg-surface-card border border-border-card rounded-2xl p-6 md:p-8 shadow-xl flex flex-col justify-between space-y-6"
                            >
                                {/* Top Meta */}
                                <div>
                                    <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-xl bg-surface-base border border-border-card p-1 shadow-sm shrink-0">
                                                <img src={activeApp.logo} alt={activeApp.name} className="w-full h-full object-contain rounded-lg" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl md:text-2xl font-bold text-text font-outfit">
                                                    {activeApp.name}
                                                </h3>
                                                <p className="text-xs font-mono text-primary flex items-center gap-1.5 mt-0.5">
                                                    <CheckCircle2 size={13} />
                                                    <span>{activeApp.tagline}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-mono font-bold">
                                            <Activity size={13} className="animate-pulse" />
                                            <span>{activeApp.status}</span>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-text-muted text-sm md:text-base leading-relaxed mb-4">
                                        {activeApp.description}
                                    </p>

                                    {/* Architectural Core Callout */}
                                    <div className="p-4 rounded-xl bg-surface-base border border-border-card space-y-1.5 mb-6">
                                        <div className="flex items-center gap-2 text-xs font-mono font-bold text-text uppercase tracking-wide">
                                            <Layers size={14} className="text-primary" />
                                            <span>System & Hardware Architecture</span>
                                        </div>
                                        <p className="text-xs text-text-muted font-mono leading-relaxed">
                                            {activeApp.architectureOverview}
                                        </p>
                                    </div>

                                    {/* Engineering Telemetry Matrix */}
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                                        <div className="p-3 rounded-xl bg-surface-base border border-border-card">
                                            <div className="text-[10px] font-mono uppercase text-text-muted flex items-center gap-1">
                                                <Radio size={12} className="text-primary" /> Track
                                            </div>
                                            <div className="text-xs font-mono font-bold text-text mt-1 truncate">
                                                {activeApp.telemetry.track}
                                            </div>
                                        </div>
                                        <div className="p-3 rounded-xl bg-surface-base border border-border-card">
                                            <div className="text-[10px] font-mono uppercase text-text-muted flex items-center gap-1">
                                                <Smartphone size={12} className="text-secondary" /> Target SDK
                                            </div>
                                            <div className="text-xs font-mono font-bold text-text mt-1 truncate">
                                                {activeApp.telemetry.targetSdk}
                                            </div>
                                        </div>
                                        <div className="p-3 rounded-xl bg-surface-base border border-border-card">
                                            <div className="text-[10px] font-mono uppercase text-text-muted flex items-center gap-1">
                                                <Cpu size={12} className="text-emerald-500" /> Pipeline
                                            </div>
                                            <div className="text-xs font-mono font-bold text-text mt-1 truncate">
                                                {activeApp.telemetry.pipeline}
                                            </div>
                                        </div>
                                        <div className="p-3 rounded-xl bg-surface-base border border-border-card">
                                            <div className="text-[10px] font-mono uppercase text-text-muted flex items-center gap-1">
                                                <Database size={12} className="text-amber-500" /> Persistence
                                            </div>
                                            <div className="text-xs font-mono font-bold text-text mt-1 truncate">
                                                {activeApp.telemetry.offlineStorage}
                                            </div>
                                        </div>
                                        <div className="p-3 rounded-xl bg-surface-base border border-border-card col-span-2 sm:col-span-2">
                                            <div className="text-[10px] font-mono uppercase text-text-muted flex items-center gap-1">
                                                <Terminal size={12} className="text-sky-500" /> Compliance Status
                                            </div>
                                            <div className="text-xs font-mono font-bold text-text mt-1 truncate">
                                                {activeApp.telemetry.testingStatus}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tech Pills */}
                                    <div className="flex flex-wrap gap-1.5">
                                        {activeApp.tech.map(t => (
                                            <span 
                                                key={t} 
                                                className="text-[11px] px-3 py-1 rounded-lg bg-surface-elevated text-text font-mono border border-border-card"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Footer CTA Actions */}
                                <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-border-card">
                                    <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
                                        <Play size={14} className="text-primary" />
                                        <span>Target Platform: {activeApp.platform}</span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <a
                                            href={activeApp.github}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-light text-white font-bold font-mono text-xs transition-all shadow-md shadow-primary/25 hover:scale-105 cursor-pointer"
                                        >
                                            <Github size={15} />
                                            <span>Inspect Source Code</span>
                                            <ArrowUpRight size={13} />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MobileLabs;
