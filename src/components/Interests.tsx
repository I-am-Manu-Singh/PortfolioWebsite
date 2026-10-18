import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Music, Instagram, Youtube, Headphones, 
    Piano, Disc, Radio, ArrowUpRight
} from 'lucide-react';
import SectionBackground from './SectionBackground';
import { resumeData } from '../data/resume';

interface AudioDiscipline {
    id: string;
    title: string;
    instrument: string;
    description: string;
    icon: any;
    playlistId: string;
    highlights: string[];
    caricature: string;
}

const DISCIPLINES: AudioDiscipline[] = [
    {
        id: 'piano',
        title: 'Piano & Orchestral Improvisation',
        instrument: 'Acoustic Grand & Virtual Keys',
        description: 'Arranging and performing Western cinematic scores, classical etudes, and emotive Bollywood piano melodies.',
        icon: Piano,
        playlistId: 'PL3gkgbVoJUE0gLQLM8q4hJefXhrrrre9g',
        highlights: ['Western Hollywood OSTs', 'Bollywood Ballads', 'Harmonic Counterpoint'],
        caricature: 'caricature_piano.png'
    },
    {
        id: 'guitar',
        title: 'Electric Guitar & Fingerstyle Sessions',
        instrument: 'Ibanez Electric & Acoustic 6-String',
        description: 'Exploring polyrhythms, Punjabi vocal accompaniment, rock solos, and DSP pedal tone architecture.',
        icon: Headphones,
        playlistId: 'PL3gkgbVoJUE05gqKg2WhscZdE5DkrTL3-',
        highlights: ['Bollywood Lead Soloing', 'Punjabi Acoustic Folk', 'DSP Microtonal Tuning'],
        caricature: 'caricature_guitar.png'
    },
    {
        id: 'vocals',
        title: 'Classical & Sufi Vocal Disciplines',
        instrument: 'Hindustani Classical & Sufi Vocals',
        description: 'Training in Indian classical raga scales, Sufi ghazals, and acoustic vocal arrangements.',
        icon: Radio,
        playlistId: 'PL3gkgbVoJUE1EYUoXKCS7lx5-o3Go2rx9',
        highlights: ['Classical Ragas', 'Sufi Poetry', 'Live Unplugged Sessions'],
        caricature: 'caricature_singing.png'
    }
];

const Interests: React.FC = () => {
    const [selectedDisciplineId, setSelectedDisciplineId] = useState<string>('piano');
    const activeDiscipline = DISCIPLINES.find(d => d.id === selectedDisciplineId) || DISCIPLINES[0];

    return (
        <section className="section bg-dark relative overflow-hidden pt-32 pb-24" id="interests">
            {/* Subtle background accents */}
            <div className="absolute inset-x-0 top-0 h-1/2 overflow-hidden pointer-events-none opacity-40">
                <SectionBackground variant="music" className="h-full" />
            </div>

            <div className="container relative z-10">
                {/* Header with Dynamic Caricature (Piano / Singing / Guitar) */}
                <div className="flex flex-col items-center mb-12 text-center relative">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="p-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20">
                            <Music size={18} />
                        </span>
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
                            Creative Arts & Audio Pursuits
                        </span>
                    </div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-title mb-3"
                    >
                        Life <span className="text-primary-light">Beyond Code</span>
                    </motion.h2>
                    <p className="text-text-muted max-w-xl text-xs md:text-sm font-mono">
                        Music, acoustics, and vocal disciplines inspire how I design high-performance architectures, low-latency DSP systems, and intuitive user experiences.
                    </p>

                    {/* Dynamic Instrument Caricature based on selected tab */}
                    <div className="mt-4 lg:mt-0 lg:absolute lg:right-6 lg:-top-16 z-20 flex justify-center pointer-events-none">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeDiscipline.caricature}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="relative pointer-events-auto"
                            >
                                <div className="absolute inset-0 bg-primary/20 blur-[40px] rounded-full transform scale-75" />
                                <motion.img
                                    src={`${import.meta.env.BASE_URL}${activeDiscipline.caricature}`}
                                    alt={activeDiscipline.title}
                                    className="w-32 h-32 md:w-36 md:h-36 lg:w-44 lg:h-44 object-contain drop-shadow-xl relative z-10 rounded-3xl border border-dark bg-dark-card/60 backdrop-blur-sm cursor-grab active:cursor-grabbing hover:scale-105 transition-transform"
                                    animate={{ y: [0, -8, 0], rotate: [2, 0, 2] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Main Interactive Studio Cockpit */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
                    {/* Left: Discipline Switcher */}
                    <div className="lg:col-span-5 flex flex-col gap-3">
                        <div className="text-xs font-mono font-bold uppercase tracking-wider text-text-muted px-1">
                            Acoustic & Performance Disciplines
                        </div>
                        {DISCIPLINES.map((d) => {
                            const isSelected = d.id === selectedDisciplineId;
                            const Icon = d.icon;
                            return (
                                <button
                                    key={d.id}
                                    onClick={() => setSelectedDisciplineId(d.id)}
                                    className={`w-full text-left p-5 rounded-2xl border transition-all cursor-pointer flex flex-col gap-2 relative overflow-hidden ${
                                        isSelected
                                            ? 'bg-dark-card border-primary/40 shadow-lg ring-1 ring-primary/25'
                                            : 'bg-dark-card/60 border-white/5 hover:border-white/10 hover:bg-dark-card text-text-muted hover:text-text'
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-primary text-white shadow-md' : 'bg-dark text-text-muted border border-white/5'}`}>
                                                <Icon size={18} />
                                            </div>
                                            <div>
                                                <h4 className={`text-sm md:text-base font-bold ${isSelected ? 'text-text' : 'text-text/90'}`}>
                                                    {d.title.split('&')[0]}
                                                </h4>
                                                <p className="text-[11px] text-text-muted font-mono">{d.instrument}</p>
                                            </div>
                                        </div>
                                        {isSelected && (
                                            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                                        )}
                                    </div>
                                    <p className="text-xs text-text-muted line-clamp-2 mt-1 leading-relaxed">
                                        {d.description}
                                    </p>
                                </button>
                            );
                        })}
                    </div>

                    {/* Right: Embedded Studio Session Viewer */}
                    <div className="lg:col-span-7">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeDiscipline.id}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -12 }}
                                transition={{ duration: 0.2 }}
                                className="bg-dark-card border border-white/5 rounded-2xl p-6 md:p-8 shadow-xl flex flex-col justify-between space-y-6"
                            >
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                                        <div className="flex items-center gap-2">
                                            <Disc size={18} className="text-primary animate-spin" style={{ animationDuration: '6s' }} />
                                            <span className="text-xs font-mono font-bold text-text uppercase">
                                                Studio Session: {activeDiscipline.title}
                                            </span>
                                        </div>
                                        <a
                                            href={`https://www.youtube.com/playlist?list=${activeDiscipline.playlistId}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-1.5 text-xs font-mono text-primary hover:underline"
                                        >
                                            <span>Full Playlist</span>
                                            <ArrowUpRight size={13} />
                                        </a>
                                    </div>

                                    {/* Embedded YouTube Player */}
                                    <div className="relative aspect-video rounded-xl overflow-hidden border border-white/5 bg-black shadow-inner">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={`https://www.youtube.com/embed/videoseries?list=${activeDiscipline.playlistId}`}
                                            title={activeDiscipline.title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="absolute inset-0"
                                        />
                                    </div>

                                    {/* Highlights Pills */}
                                    <div className="flex flex-wrap items-center gap-2 pt-2">
                                        <span className="text-xs font-mono text-text-muted">Specializations:</span>
                                        {activeDiscipline.highlights.map((h, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 rounded-lg bg-dark border border-white/5 text-text font-mono text-[11px]"
                                            >
                                                {h}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                                    <span className="text-xs font-mono text-text-muted">
                                        Recorded on Kawai, Ibanez & Logic Pro
                                    </span>
                                    <a
                                        href={resumeData.youtube.channel}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold transition-all shadow-md shadow-red-600/20"
                                    >
                                        <Youtube size={14} />
                                        <span>YouTube Channel</span>
                                    </a>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Bottom Instagram Verified Connector */}
                <div className="p-6 md:p-8 rounded-2xl bg-dark-card border border-white/5 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3.5 bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 rounded-2xl text-white shadow-md shrink-0">
                            <Instagram size={28} />
                        </div>
                        <div>
                            <h3 className="text-lg md:text-xl font-bold text-text">
                                Connect on Instagram
                            </h3>
                            <p className="text-xs text-text-muted font-mono mt-0.5">
                                Follow developer stories, live music rehearsals, and creative explorations.
                            </p>
                        </div>
                    </div>
                    <a
                        href="https://www.instagram.com/manu.singh_001/"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-mono text-xs font-semibold hover:opacity-90 transition-all hover:scale-105 shadow-md shadow-pink-500/20"
                    >
                        <Instagram size={15} />
                        <span>@manu.singh_001</span>
                        <ArrowUpRight size={13} />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Interests;
