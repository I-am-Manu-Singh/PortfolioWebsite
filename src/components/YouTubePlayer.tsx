import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Maximize2 } from 'lucide-react';

declare global {
    interface Window {
        YT: any;
        onYouTubeIframeAPIReady: () => void;
    }
}

interface YouTubePlayerProps {
    videoId: string;
    title: string;
    subtitle?: string;
    badge?: string;
    badgeColor?: string;
    onPrev?: () => void;
    onNext?: () => void;
    hasPrev?: boolean;
    hasNext?: boolean;
    currentIndex?: number;
    totalCount?: number;
}

export const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
    videoId,
    title,
    subtitle,
    badge = "Now Playing",
    badgeColor = "text-primary bg-primary/10 border-primary/20",
    onPrev,
    onNext,
    hasPrev = true,
    hasNext = true,
    currentIndex = 1,
    totalCount = 1
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const iframeIdRef = useRef<string>(`yt-player-${Math.random().toString(36).substring(2, 9)}`);
    const playerRef = useRef<any>(null);

    const [isPlaying, setIsPlaying] = useState<boolean>(true);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const [isDragging, setIsDragging] = useState<boolean>(false);

    // Load YouTube IFrame API if not present
    useEffect(() => {
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
        }
    }, []);

    // Initialize or load video
    useEffect(() => {
        let isCancelled = false;

        const initPlayer = () => {
            if (isCancelled) return;
            if (window.YT && window.YT.Player) {
                if (playerRef.current) {
                    try {
                        playerRef.current.loadVideoById(videoId);
                        setIsPlaying(true);
                    } catch (e) {
                        console.error("YT load error:", e);
                    }
                } else {
                    playerRef.current = new window.YT.Player(iframeIdRef.current, {
                        videoId: videoId,
                        playerVars: {
                            autoplay: 1,
                            playsinline: 1,
                            rel: 0,
                            controls: 0,
                            disablekb: 0,
                            fs: 1,
                            iv_load_policy: 3,
                            modestbranding: 1
                        },
                        events: {
                            onReady: (event: any) => {
                                event.target.playVideo();
                                setIsPlaying(true);
                                setDuration(event.target.getDuration() || 0);
                            },
                            onStateChange: (event: any) => {
                                // 1: PLAYING, 2: PAUSED, 0: ENDED
                                if (event.data === 1) {
                                    setIsPlaying(true);
                                } else if (event.data === 2) {
                                    setIsPlaying(false);
                                } else if (event.data === 0) {
                                    setIsPlaying(false);
                                    if (onNext) onNext();
                                }
                            }
                        }
                    });
                }
            } else {
                setTimeout(initPlayer, 200);
            }
        };

        initPlayer();

        return () => {
            isCancelled = true;
        };
    }, [videoId]);

    // Track playback progress
    useEffect(() => {
        const timer = setInterval(() => {
            if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function' && !isDragging) {
                try {
                    const cur = playerRef.current.getCurrentTime() || 0;
                    const dur = playerRef.current.getDuration() || 0;
                    setCurrentTime(cur);
                    if (dur > 0 && duration !== dur) setDuration(dur);
                } catch {
                    // Ignore transient iframe errors
                }
            }
        }, 300);

        return () => clearInterval(timer);
    }, [isDragging, duration]);

    const togglePlay = () => {
        if (!playerRef.current) return;
        try {
            if (isPlaying) {
                playerRef.current.pauseVideo();
                setIsPlaying(false);
            } else {
                playerRef.current.playVideo();
                setIsPlaying(true);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = parseFloat(e.target.value);
        setCurrentTime(newTime);
        if (playerRef.current && typeof playerRef.current.seekTo === 'function') {
            playerRef.current.seekTo(newTime, true);
        }
    };

    const toggleMute = () => {
        if (!playerRef.current) return;
        try {
            if (isMuted) {
                playerRef.current.unMute();
                setIsMuted(false);
            } else {
                playerRef.current.mute();
                setIsMuted(true);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const formatTime = (secs: number) => {
        if (isNaN(secs) || secs < 0) return "0:00";
        const m = Math.floor(secs / 60);
        const s = Math.floor(secs % 60);
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };


    const progressPercent = duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0;

    return (
        <div ref={containerRef} className="flex flex-col h-full justify-between relative z-10">
            {/* Embedded Responsive Player */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-xl mb-4 bg-black border border-dark">
                <div id={iframeIdRef.current} className="w-full h-full" />
            </div>

            {/* Now Playing Info */}
            <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                    <span className={`text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full border ${badgeColor}`}>
                        {badge}
                    </span>
                    <span className="text-[11px] font-mono text-text-muted">
                        Track {currentIndex} of {totalCount}
                    </span>
                </div>

                <div>
                    <h2 className="text-base md:text-lg font-bold text-text truncate" title={title}>
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="text-xs text-text-muted font-mono truncate mt-0.5">
                            {subtitle}
                        </p>
                    )}
                </div>

                {/* Interactive Seekbar */}
                <div className="space-y-1 pt-1">
                    <div className="relative w-full flex items-center group py-1">
                        {/* Background Track with Fill */}
                        <div className="absolute inset-x-0 h-1.5 group-hover:h-2 bg-dark-card rounded-lg border border-dark overflow-hidden pointer-events-none transition-all">
                            <div
                                className="h-full bg-gradient-to-r from-primary to-primary-light rounded-l-lg transition-all"
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>
                        <input
                            type="range"
                            min={0}
                            max={duration || 100}
                            step={0.1}
                            value={currentTime}
                            onChange={handleSeek}
                            onMouseDown={() => setIsDragging(true)}
                            onMouseUp={() => setIsDragging(false)}
                            onTouchStart={() => setIsDragging(true)}
                            onTouchEnd={() => setIsDragging(false)}
                            className="relative z-10 w-full h-1.5 appearance-none cursor-pointer bg-transparent accent-primary group-hover:h-2 transition-all focus:outline-none"
                            aria-label="Seek Video"
                        />
                    </div>
                    <div className="flex justify-between text-[11px] text-text-muted font-mono">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>

                {/* Player Controls Bar */}
                <div className="flex items-center justify-between pt-1">
                    <button
                        onClick={toggleMute}
                        className="p-2 rounded-full text-text-muted hover:text-text hover:bg-dark transition-colors cursor-pointer"
                        title={isMuted ? "Unmute" : "Mute"}
                    >
                        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>

                    <div className="flex items-center gap-5">
                        <button
                            onClick={onPrev}
                            disabled={!hasPrev}
                            className="text-text-muted hover:text-text disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors p-1"
                            title="Previous Video"
                        >
                            <SkipBack size={22} />
                        </button>

                        <button
                            onClick={togglePlay}
                            className="p-3 bg-primary hover:bg-primary-light text-white rounded-full transition-all hover:scale-105 shadow-md shadow-primary/25 cursor-pointer flex items-center justify-center"
                            title={isPlaying ? "Pause" : "Play"}
                        >
                            {isPlaying ? <Pause size={20} fill="white" /> : <Play size={20} fill="white" className="ml-0.5" />}
                        </button>

                        <button
                            onClick={onNext}
                            disabled={!hasNext}
                            className="text-text-muted hover:text-text disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors p-1"
                            title="Next Video"
                        >
                            <SkipForward size={22} />
                        </button>
                    </div>

                    <a
                        href={`https://www.youtube.com/watch?v=${videoId}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-full text-text-muted hover:text-text hover:bg-dark transition-colors cursor-pointer"
                        title="Watch Full on YouTube"
                    >
                        <Maximize2 size={16} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default YouTubePlayer;
