import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Music } from 'lucide-react';
import { resumeData } from '../data/resume';
const SpotifyPlayer: React.FC = () => {
    // Flatten playlists from resumeData
    // @ts-ignore
    const allTracks = resumeData.interests.music.categories.flatMap((cat: any) =>
        cat.playlists.map((pl: any) => ({ ...pl, artist: "Manpreet Singh", album: cat.title }))
    );

    const [currentTrack, setCurrentTrack] = useState(allTracks[0]);
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="w-full max-w-5xl mx-auto bg-[#121212] rounded-xl overflow-hidden shadow-2xl border border-[#282828] font-sans">
            <div className="flex flex-col md:flex-row h-[600px] md:h-[500px]">
                {/* Sidebar / Track List */}
                <div className="w-full md:w-1/2 p-6 overflow-y-auto custom-scrollbar bg-[#121212]">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Music className="text-[#1DB954]" /> My Library
                    </h3>
                    <div className="space-y-1">
                        {allTracks.map((track: any, idx: number) => (
                            <div
                                key={idx}
                                onClick={() => { setCurrentTrack(track); setIsPlaying(true); }}
                                className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition-colors group ${currentTrack.id === track.id ? 'bg-[#282828]' : 'hover:bg-[#282828]'}`}
                            >
                                <div className="text-[#b3b3b3] w-4 text-center text-sm font-mono group-hover:hidden">
                                    {currentTrack.id === track.id && isPlaying ? (
                                        <div className="flex items-end gap-[2px] h-3">
                                            <div className="w-[3px] bg-[#1DB954] animate-[bounce_0.6s_infinite]" />
                                            <div className="w-[3px] bg-[#1DB954] animate-[bounce_0.8s_infinite]" />
                                            <div className="w-[3px] bg-[#1DB954] animate-[bounce_1s_infinite]" />
                                        </div>
                                    ) : (idx + 1)}
                                </div>
                                <div className="text-white hidden group-hover:block w-4">
                                    <Play size={14} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className={`font-medium truncate ${currentTrack.id === track.id ? 'text-[#1DB954]' : 'text-white'}`}>
                                        {track.title}
                                    </div>
                                    <div className="text-xs text-[#b3b3b3] truncate">{track.artist} • {track.album}</div>
                                </div>
                                <div className="text-[#b3b3b3] text-xs">
                                    --:--
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Player Area */}
                <div className="w-full md:w-1/2 bg-gradient-to-b from-[#202020] to-[#121212] p-6 flex flex-col justify-between relative">
                    {/* Album Art / Video Embed */}
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg mb-6 bg-black z-10">
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
                            <h2 className="text-2xl font-bold text-white truncate">{currentTrack.title}</h2>
                            <p className="text-[#b3b3b3]">{currentTrack.artist}</p>
                        </div>

                        {/* Controls - Visual Only since iframe handles Playback */}
                        <div className="flex flex-col gap-2">
                            <div className="w-full bg-[#404040] h-1 rounded-full overflow-hidden">
                                <div className="h-full bg-[#1DB954] w-1/3 rounded-full" />
                            </div>
                            <div className="flex justify-between text-xs text-[#b3b3b3] font-mono">
                                <span>1:25</span>
                                <span>4:00</span>
                            </div>

                            <div className="flex items-center justify-center gap-6 mt-2">
                                <SkipBack className="text-[#b3b3b3] hover:text-white cursor-pointer" size={24} />
                                <div className="p-3 bg-white rounded-full hover:scale-105 transition-transform cursor-pointer text-black">
                                    {isPlaying ? <Pause size={24} fill="black" /> : <Play size={24} fill="black" className="ml-1" />}
                                </div>
                                <SkipForward className="text-[#b3b3b3] hover:text-white cursor-pointer" size={24} />
                            </div>
                        </div>
                    </div>

                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-[#1DB954]/10 to-transparent pointer-events-none" />
                </div>
            </div>
        </div>
    );
};

export default SpotifyPlayer;
