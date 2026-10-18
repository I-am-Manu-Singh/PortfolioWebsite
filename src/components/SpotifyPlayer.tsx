import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Music, Code2 } from 'lucide-react';
import { resumeData } from '../data/resume';

const SpotifyPlayer: React.FC = () => {
    // Music tracks from resumeData
    // @ts-ignore
    const musicTracks = (resumeData.interests.music.categories || []).flatMap((cat: any) =>
        cat.playlists.map((pl: any) => ({ ...pl, artist: "Manpreet Singh", album: cat.title, type: 'music' }))
    );

    // Tech playlists: LeetCode Solutions and App Dev Tutorials
    const techTracks = (resumeData.techPlaylists || []).map((pl: any) => ({
        ...pl,
        artist: "Manpreet Singh",
        album: "Technical & Problem Solving",
        type: 'tech'
    }));

    // Combined tracks list
    const allTracks = [...techTracks, ...musicTracks];

    const [currentTrack, setCurrentTrack] = useState(allTracks[0] || techTracks[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeFilter, setActiveFilter] = useState<'all' | 'tech' | 'music'>('all');

    const filteredTracks = allTracks.filter(t => activeFilter === 'all' || t.type === activeFilter);

    return (
        <div className="w-full max-w-5xl mx-auto bg-surface-card rounded-2xl overflow-hidden shadow-2xl border border-border-card font-sans">
            <div className="flex flex-col md:flex-row h-[620px] md:h-[520px]">
                {/* Sidebar / Track List */}
                <div className="w-full md:w-1/2 p-5 overflow-y-auto custom-scrollbar bg-surface-base border-r border-border-card flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-text flex items-center gap-2">
                            <Music className="text-[#1DB954]" size={20} /> My Media Library
                        </h3>
                        <div className="flex gap-1 bg-surface-elevated p-1 rounded-lg border border-border-card text-[11px] font-mono">
                            <button
                                onClick={() => setActiveFilter('all')}
                                className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${activeFilter === 'all' ? 'bg-primary text-white' : 'text-text-muted hover:text-text'}`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setActiveFilter('tech')}
                                className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${activeFilter === 'tech' ? 'bg-primary text-white' : 'text-text-muted hover:text-text'}`}
                            >
                                Tech
                            </button>
                            <button
                                onClick={() => setActiveFilter('music')}
                                className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${activeFilter === 'music' ? 'bg-primary text-white' : 'text-text-muted hover:text-text'}`}
                            >
                                Music
                            </button>
                        </div>
                    </div>

                    <div className="space-y-1 flex-1 overflow-y-auto pr-1">
                        {filteredTracks.map((track: any, idx: number) => {
                            const isSelected = currentTrack?.id === track.id;
                            return (
                                <div
                                    key={track.id || idx}
                                    onClick={() => { setCurrentTrack(track); setIsPlaying(true); }}
                                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors group ${
                                        isSelected 
                                            ? 'bg-surface-elevated border border-primary/30' 
                                            : 'hover:bg-surface-elevated/60 border border-transparent'
                                    }`}
                                >
                                    <div className="text-text-muted w-4 text-center text-xs font-mono group-hover:hidden">
                                        {isSelected && isPlaying ? (
                                            <div className="flex items-end gap-[2px] h-3 justify-center">
                                                <div className="w-[3px] bg-[#1DB954] animate-[bounce_0.6s_infinite]" />
                                                <div className="w-[3px] bg-[#1DB954] animate-[bounce_0.8s_infinite]" />
                                                <div className="w-[3px] bg-[#1DB954] animate-[bounce_1s_infinite]" />
                                            </div>
                                        ) : (idx + 1)}
                                    </div>
                                    <div className="text-primary hidden group-hover:block w-4">
                                        <Play size={14} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className={`text-xs md:text-sm font-medium truncate flex items-center gap-1.5 ${isSelected ? 'text-primary font-semibold' : 'text-text'}`}>
                                            {track.type === 'tech' && <Code2 size={13} className="text-primary shrink-0" />}
                                            <span className="truncate">{track.title}</span>
                                        </div>
                                        <div className="text-[11px] text-text-muted truncate font-mono">
                                            {track.album}
                                        </div>
                                    </div>
                                    <div className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-card text-text-muted border border-border-card">
                                        {track.type === 'tech' ? 'Tutorial' : 'Cover'}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Main Player Area */}
                <div className="w-full md:w-1/2 bg-surface-card p-6 flex flex-col justify-between relative">
                    {/* Album Art / Video Embed */}
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg mb-4 bg-black z-10 border border-border-card">
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
                            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/25">
                                {currentTrack.type === 'tech' ? 'Technical Playlist' : 'Music Sessions'}
                            </span>
                            <h2 className="text-lg md:text-xl font-bold text-text truncate mt-1.5">{currentTrack.title}</h2>
                            <p className="text-xs text-text-muted font-mono">{currentTrack.artist} • {currentTrack.album}</p>
                        </div>

                        {/* Controls */}
                        <div className="flex flex-col gap-2">
                            <div className="w-full bg-surface-elevated h-1.5 rounded-full overflow-hidden border border-border-card">
                                <div className="h-full bg-[#1DB954] w-2/5 rounded-full" />
                            </div>
                            <div className="flex justify-between text-[11px] text-text-muted font-mono">
                                <span>2:14</span>
                                <span>Playing on YouTube</span>
                            </div>

                            <div className="flex items-center justify-center gap-6 mt-1">
                                <SkipBack 
                                    className="text-text-muted hover:text-text cursor-pointer transition-colors" 
                                    size={22}
                                    onClick={() => {
                                        const curIdx = filteredTracks.findIndex(t => t.id === currentTrack.id);
                                        const prevTrack = filteredTracks[(curIdx - 1 + filteredTracks.length) % filteredTracks.length];
                                        setCurrentTrack(prevTrack);
                                    }}
                                />
                                <div 
                                    onClick={() => setIsPlaying(!isPlaying)}
                                    className="p-3 bg-primary hover:bg-primary-light transition-all rounded-full hover:scale-105 cursor-pointer text-white shadow-lg shadow-primary/30"
                                >
                                    {isPlaying ? <Pause size={20} fill="white" /> : <Play size={20} fill="white" className="ml-0.5" />}
                                </div>
                                <SkipForward 
                                    className="text-text-muted hover:text-text cursor-pointer transition-colors" 
                                    size={22}
                                    onClick={() => {
                                        const curIdx = filteredTracks.findIndex(t => t.id === currentTrack.id);
                                        const nextTrack = filteredTracks[(curIdx + 1) % filteredTracks.length];
                                        setCurrentTrack(nextTrack);
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Subtle Background Accent */}
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
                </div>
            </div>
        </div>
    );
};

export default SpotifyPlayer;
