import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Maximize2, Minimize2, X } from 'lucide-react';

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
    const iframeIdRef = useRef<string>(`yt-player-${Math.random().toString(36).substring(2, 9)}`);
    const playerRef = useRef<any>(null);

    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [isFullscreenModal, setIsFullscreenModal] = useState<boolean>(false);

    // Dynamic crop: true while controls/overlays are visible, false once playback is underway
    const [isCropped, setIsCropped] = useState<boolean>(true);
    const cropTimeoutRef = useRef<any>(null);

    // Prevent background scrolling when theater modal is open
    useEffect(() => {
        if (isFullscreenModal) {
            const originalOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = originalOverflow;
            };
        }
    }, [isFullscreenModal]);

    // Handle auto-uncropping after YouTube controls overlay times out (~3 seconds into active playback)
    useEffect(() => {
        if (isPlaying) {
            // After 3.5s of playing, YouTube's native overlay elements automatically fade out.
            // We smoothly transition the video to 100% uncropped full view!
            cropTimeoutRef.current = setTimeout(() => {
                setIsCropped(false);
            }, 3200);
        } else {
            // When paused, stopped, or waiting, crop overlays so YouTube title/share never show
            if (cropTimeoutRef.current) clearTimeout(cropTimeoutRef.current);
            setIsCropped(true);
        }

        return () => {
            if (cropTimeoutRef.current) clearTimeout(cropTimeoutRef.current);
        };
    }, [isPlaying, videoId]);

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
                        if (typeof playerRef.current.cueVideoById === 'function') {
                            playerRef.current.cueVideoById(videoId);
                        } else {
                            playerRef.current.loadVideoById(videoId);
                        }
                        setIsPlaying(false);
                        setIsCropped(true);
                    } catch (e) {
                        console.error("YT load error:", e);
                    }
                } else {
                    playerRef.current = new window.YT.Player(iframeIdRef.current, {
                        videoId: videoId,
                        playerVars: {
                            autoplay: 0,
                            playsinline: 1,
                            rel: 0,
                            controls: 0,
                            disablekb: 1,
                            fs: 0,
                            iv_load_policy: 3,
                            modestbranding: 1,
                            origin: window.location.origin
                        },
                        events: {
                            onReady: (event: any) => {
                                setIsPlaying(false);
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

    // Track playback progress continuously
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
        }, 250);

        return () => clearInterval(timer);
    }, [isDragging, duration]);

    // Open theater mode WITHOUT recreating or restarting the video
    const openTheaterModal = () => {
        setIsFullscreenModal(true);
    };

    // Close theater mode without stopping or resetting the video
    const closeTheaterModal = () => {
        setIsFullscreenModal(false);
    };

    // Robust Toggle Play/Pause using direct player state check
    const togglePlay = () => {
        if (!playerRef.current) return;
        try {
            const state = typeof playerRef.current.getPlayerState === 'function' 
                ? playerRef.current.getPlayerState() 
                : (isPlaying ? 1 : 2);
            
            // 1: PLAYING, 3: BUFFERING
            if (state === 1 || state === 3) {
                playerRef.current.pauseVideo();
                setIsPlaying(false);
                setIsCropped(true);
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

    // Render Shared Video Screen:
    // When isCropped is true (paused or starting), iframe scales to 110% with a slight top offset to mask YouTube overlays.
    // When isCropped is false (controls have timed out during active play), smoothly returns to pure 100% full uncropped aspect!
    const renderVideoScreen = (isTheater: boolean) => (
        <div className={`relative w-full ${isTheater ? 'h-full' : 'aspect-video rounded-xl'} overflow-hidden bg-black ${!isTheater ? 'shadow-xl mb-4 border border-dark group select-none' : ''}`}>
            <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
                <div 
                    id={iframeIdRef.current} 
                    className={`transition-all duration-700 ease-out pointer-events-auto ${
                        isCropped 
                            ? 'w-[110%] h-[130%] -mt-[6%]' 
                            : 'w-full h-full -mt-0'
                    }`}
                />
            </div>

            {/* Click Mask in embedded mode to toggle play/pause */}
            {!isTheater && (
                <div 
                    onClick={togglePlay}
                    className="absolute inset-0 z-10 cursor-pointer flex items-center justify-center bg-black/10 hover:bg-black/25 transition-colors"
                    title={isPlaying ? "Click to Pause" : "Click to Play"}
                >
                    {!isPlaying && (
                        <div className="w-14 h-14 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-2xl backdrop-blur-md transform group-hover:scale-110 transition-transform">
                            <Play size={24} fill="white" className="ml-1" />
                        </div>
                    )}
                </div>
            )}

            {/* Expand button in embedded mode */}
            {!isTheater && (
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        openTheaterModal();
                    }}
                    className="absolute top-2.5 right-2.5 p-2 rounded-lg bg-dark/90 backdrop-blur-md text-text hover:text-white border border-dark hover:border-primary/50 shadow-xl opacity-0 group-hover:opacity-100 transition-all cursor-pointer z-20 flex items-center gap-1.5 text-xs font-mono"
                    title="Open Full In-Dialog Theater Mode"
                >
                    <Maximize2 size={13} />
                    <span>Theater</span>
                </button>
            )}
        </div>
    );

    // Reusable Player Controls: Seekbar, Play/Pause Toggle, Prev, Next, Mute, Fullscreen
    const renderControlTray = (isTheater: boolean) => (
        <div className={`space-y-2 ${isTheater ? 'p-4 bg-dark border-t border-dark shrink-0' : 'space-y-3'}`}>
            {/* Header Track Info */}
            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 truncate">
                    <span className={`text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full border ${badgeColor}`}>
                        {badge}
                    </span>
                    <h2 className="text-sm md:text-base font-bold text-text truncate" title={title}>
                        {title}
                    </h2>
                </div>
                <span className="text-[11px] font-mono text-text-muted shrink-0">
                    Track {currentIndex} of {totalCount}
                </span>
            </div>

            {subtitle && (
                <p className="text-xs text-text-muted font-mono truncate">
                    {subtitle}
                </p>
            )}

            {/* Interactive Seekbar with Color-filled Progress Track */}
            <div className="space-y-1 pt-1">
                <div className="relative w-full flex items-center group py-1">
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

            {/* Bottom Row Controls: Mute, Prev, Play/Pause Toggle, Next, Exit / Theater */}
            <div className="flex items-center justify-between pt-1">
                <button
                    onClick={toggleMute}
                    className="p-2 rounded-full text-text-muted hover:text-text hover:bg-dark-card transition-colors cursor-pointer"
                    title={isMuted ? "Unmute" : "Mute"}
                >
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>

                <div className="flex items-center gap-4 sm:gap-5">
                    <button
                        onClick={onPrev}
                        disabled={!hasPrev}
                        className="text-text-muted hover:text-text disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors p-1"
                        title="Previous Video"
                    >
                        <SkipBack size={20} />
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
                        <SkipForward size={20} />
                    </button>
                </div>

                {isTheater ? (
                    <button
                        type="button"
                        onClick={closeTheaterModal}
                        className="px-3.5 py-1.5 rounded-lg bg-primary hover:bg-primary-light text-white text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-md shadow-primary/20"
                        title="Exit Theater"
                    >
                        <Minimize2 size={14} />
                        <span>Exit</span>
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={openTheaterModal}
                        className="p-2 rounded-full text-text-muted hover:text-text hover:bg-dark-card transition-colors cursor-pointer"
                        title="Open Full In-Dialog Theater Mode"
                    >
                        <Maximize2 size={16} />
                    </button>
                )}
            </div>
        </div>
    );

    return (
        <>
            {/* Embedded Mode: visible when NOT in theater */}
            <div className={`flex flex-col h-full justify-between relative z-10 ${isFullscreenModal ? 'invisible pointer-events-none' : ''}`}>
                {renderVideoScreen(false)}
                {renderControlTray(false)}
            </div>

            {/* Portal-Mounted Fullscreen Theater Modal: Renders at document.body with z-[9999999] ABOVE ALL WEBSITE ELEMENTS */}
            {isFullscreenModal && typeof document !== 'undefined' && createPortal(
                <div 
                    className="fixed inset-0 z-[9999999] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fade-in overflow-hidden"
                    style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
                >
                    <div className="relative w-full max-w-6xl h-[92vh] max-h-[900px] flex flex-col rounded-2xl bg-dark-card border border-dark shadow-2xl overflow-hidden z-10">
                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-3 border-b border-dark bg-dark shrink-0">
                            <div className="flex items-center gap-3 truncate pr-4">
                                <span className={`text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full border ${badgeColor}`}>
                                    {badge}
                                </span>
                                <h3 className="text-sm md:text-base font-bold text-text truncate">
                                    {title}
                                </h3>
                            </div>
                            <button
                                type="button"
                                onClick={closeTheaterModal}
                                className="p-1.5 rounded-lg text-text-muted hover:text-text hover:bg-dark-card border border-transparent hover:border-dark transition-colors cursor-pointer shrink-0"
                                title="Close Theater"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Video Screen in Theater Container */}
                        <div className="relative flex-1 w-full bg-black overflow-hidden flex items-center justify-center">
                            {renderVideoScreen(true)}
                        </div>

                        {/* Complete Control Tray in Theater Modal with Seekbar & Play/Pause */}
                        {renderControlTray(true)}
                    </div>
                </div>,
                document.body
            )}
        </>
    );
};

export default YouTubePlayer;
