import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Youtube, Play, Pause, SkipBack, SkipForward, Code2 } from 'lucide-react';
import { resumeData } from '../data/resume';
import SectionBackground from './SectionBackground';

const TechTutorials: React.FC = () => {
    const playlists = (resumeData.techPlaylists || []).map((pl: any, idx: number) => ({
        ...pl,
        artist: "Manpreet Singh",
        album: idx === 0 ? "Problem Solving & Algorithms" : "Production Android & Cross-Platform",
        trackNumber: idx + 1
    }));

    const [currentTrack, setCurrentTrack] = useState(playlists[0]);
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <section className="section bg-dark relative overflow-hidden" id="tech-tutorials">
            <SectionBackground variant="tutorials" />
            <div className="container relative z-10">
                {/* Header */}
                <div className="flex flex-col items-center mb-10 text-center relative">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-title mb-3 flex items-center justify-center gap-3"
                    >
                        <span className="p-2 bg-red-600 rounded-xl text-white shadow-lg shadow-red-600/25">
                            <Youtube size={26} />
                        </span>
                        Tech <span className="text-primary-light">Tutorials</span>
                    </motion.h2>
                    <p className="text-text-muted max-w-xl text-xs md:text-sm font-mono">
                        Video breakdowns of LeetCode algorithmic patterns and production-grade mobile architectures.
                    </p>

                    {/* Teacher Caricature */}
                    <div className="absolute right-0 -top-6 lg:right-6 lg:-top-12 z-0 hidden lg:block pointer-events-none">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-primary/20 blur-[50px] rounded-full transform scale-75" />
                            <motion.img
                                src={`${import.meta.env.BASE_URL}caricature_teacher.png`}
                                alt="Teaching Tech"
                                className="w-36 h-36 lg:w-44 lg:h-44 object-contain drop-shadow-xl relative z-10 pointer-events-auto rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm"
                                animate={{ y: [0, -8, 0], rotate: [3, 0, 3] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </motion.div>
                    </div>
                </div>

                {/* Spotify-Style Media Player for Tech Tutorials */}
                <div className="w-full max-w-5xl mx-auto bg-dark-card rounded-2xl overflow-hidden shadow-2xl border border-white/5 font-sans">
                    <div className="flex flex-col md:flex-row h-[600px] md:h-[500px]">
                        {/* Sidebar / Track List */}
                        <div className="w-full md:w-1/2 p-5 overflow-y-auto custom-scrollbar bg-dark border-r border-white/5 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
                                    <h3 className="text-sm font-mono font-bold text-text uppercase flex items-center gap-2">
                                        <Code2 className="text-red-500" size={18} />
                                        <span>Engineering Video Tracks</span>
                                    </h3>
                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-text-muted border border-white/5">
                                        {playlists.length} Series
                                    </span>
                                </div>

                                <div className="space-y-1.5">
                                    {playlists.map((track: any, idx: number) => {
                                        const isSelected = currentTrack?.id === track.id;
                                        return (
                                            <div
                                                key={track.id || idx}
                                                onClick={() => { setCurrentTrack(track); setIsPlaying(true); }}
                                                className={`flex items-center gap-3 p-3.5 rounded-xl cursor-pointer transition-all group ${
                                                    isSelected 
                                                        ? 'bg-dark-card border border-primary/30 shadow-md ring-1 ring-primary/20' 
                                                        : 'hover:bg-dark-card/60 border border-transparent'
                                                }`}
                                            >
                                                <div className="text-text-muted w-4 text-center text-xs font-mono group-hover:hidden">
                                                    {isSelected && isPlaying ? (
                                                        <div className="flex items-end gap-[2px] h-3 justify-center">
                                                            <div className="w-[3px] bg-red-500 animate-[bounce_0.6s_infinite]" />
                                                            <div className="w-[3px] bg-red-500 animate-[bounce_0.8s_infinite]" />
                                                            <div className="w-[3px] bg-red-500 animate-[bounce_1s_infinite]" />
                                                        </div>
                                                    ) : (idx + 1)}
                                                </div>
                                                <div className="text-primary hidden group-hover:block w-4">
                                                    <Play size={14} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className={`text-sm font-medium truncate flex items-center gap-1.5 ${isSelected ? 'text-primary font-bold' : 'text-text'}`}>
                                                        <span className="truncate">{track.title}</span>
                                                    </div>
                                                    <div className="text-xs text-text-muted truncate font-mono mt-0.5">
                                                        {track.album}
                                                    </div>
                                                </div>
                                                <div className="text-[10px] font-mono px-2 py-0.5 rounded bg-dark text-text-muted border border-white/5">
                                                    Full Series
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="p-3 rounded-xl bg-dark-card border border-white/5 mt-4 flex items-center justify-between text-xs font-mono text-text-muted">
                                <span>Official YouTube Playlists</span>
                                <a
                                    href={resumeData.youtube.channel}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-red-500 hover:underline font-bold"
                                >
                                    Visit Channel →
                                </a>
                            </div>
                        </div>

                        {/* Main Player Area */}
                        <div className="w-full md:w-1/2 bg-dark-card p-6 flex flex-col justify-between relative">
                            {/* Video Embed */}
                            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg mb-4 bg-black z-10 border border-white/5">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/videoseries?list=${currentTrack.id}&autoplay=${isPlaying ? 1 : 0}`}
                                    title={currentTrack.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="absolute inset-0"
                                />
                            </div>

                            {/* Now Playing Info */}
                            <div className="z-10">
                                <div className="mb-4">
                                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-red-600/15 text-red-500 border border-red-600/25">
                                        Engineering Breakdown
                                    </span>
                                    <h2 className="text-lg md:text-xl font-bold text-text truncate mt-1.5">{currentTrack.title}</h2>
                                    <p className="text-xs text-text-muted font-mono">{currentTrack.artist} • {currentTrack.album}</p>
                                </div>

                                {/* Controls */}
                                <div className="flex flex-col gap-2">
                                    <div className="w-full bg-dark h-1.5 rounded-full overflow-hidden border border-white/5">
                                        <div className="h-full bg-red-500 w-2/5 rounded-full" />
                                    </div>
                                    <div className="flex justify-between text-[11px] text-text-muted font-mono">
                                        <span>3:40</span>
                                        <span>Streaming from YouTube</span>
                                    </div>

                                    <div className="flex items-center justify-center gap-6 mt-1">
                                        <SkipBack 
                                            className="text-text-muted hover:text-text cursor-pointer transition-colors" 
                                            size={22}
                                            onClick={() => {
                                                const curIdx = playlists.findIndex(t => t.id === currentTrack.id);
                                                const prevTrack = playlists[(curIdx - 1 + playlists.length) % playlists.length];
                                                setCurrentTrack(prevTrack);
                                            }}
                                        />
                                        <div 
                                            onClick={() => setIsPlaying(!isPlaying)}
                                            className="p-3 bg-red-600 hover:bg-red-500 transition-all rounded-full hover:scale-105 cursor-pointer text-white shadow-lg shadow-red-600/30"
                                        >
                                            {isPlaying ? <Pause size={20} fill="white" /> : <Play size={20} fill="white" className="ml-0.5" />}
                                        </div>
                                        <SkipForward 
                                            className="text-text-muted hover:text-text cursor-pointer transition-colors" 
                                            size={22}
                                            onClick={() => {
                                                const curIdx = playlists.findIndex(t => t.id === currentTrack.id);
                                                const nextTrack = playlists[(curIdx + 1) % playlists.length];
                                                setCurrentTrack(nextTrack);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Subtle Background Accent */}
                            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-red-600/5 to-transparent pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TechTutorials;
