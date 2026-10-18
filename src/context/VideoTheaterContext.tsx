import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

declare global {
    interface Window {
        onYouTubeIframeAPIReady: () => void;
        YT: any;
    }
}

export interface VideoItem {
    id: string;
    title: string;
    subtitle?: string;
    badge?: string;
    badgeColor?: string;
}

interface VideoTheaterContextType {
    isOpen: boolean;
    currentVideo: VideoItem | null;
    playlist: VideoItem[];
    currentIndex: number;
    openTheater: (video: VideoItem, playlist: VideoItem[]) => void;
    closeTheater: () => void;
    nextVideo: () => void;
    prevVideo: () => void;
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    isMuted: boolean;
    togglePlay: () => void;
    toggleMute: () => void;
    seekTo: (time: number) => void;
    setDragging: (dragging: boolean) => void;
    containerRef: (node: HTMLDivElement | null) => void;
}

const VideoTheaterContext = createContext<VideoTheaterContextType | undefined>(undefined);

export const VideoTheaterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentVideo, setCurrentVideo] = useState<VideoItem | null>(null);
    const [playlist, setPlaylist] = useState<VideoItem[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const playerRef = useRef<any>(null);
    const containerNodeRef = useRef<HTMLDivElement | null>(null);

    // Load YouTube API once globally
    useEffect(() => {
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
        }
    }, []);

    // Create or update player whenever container or video changes
    const initOrLoadPlayer = (videoId: string) => {
        if (!containerNodeRef.current) return;

        if (window.YT && window.YT.Player) {
            if (playerRef.current) {
                try {
                    playerRef.current.loadVideoById(videoId);
                    setIsPlaying(true);
                } catch (e) {
                    console.error("YT load error:", e);
                }
            } else {
                // Ensure unique mount target
                let mountDiv = containerNodeRef.current.querySelector('#yt-theater-iframe');
                if (!mountDiv) {
                    mountDiv = document.createElement('div');
                    mountDiv.id = 'yt-theater-iframe';
                    mountDiv.className = 'w-full h-full object-cover';
                    containerNodeRef.current.appendChild(mountDiv);
                }

                playerRef.current = new window.YT.Player('yt-theater-iframe', {
                    videoId: videoId,
                    playerVars: {
                        autoplay: 1,
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
                            event.target.playVideo();
                            setIsPlaying(true);
                            setDuration(event.target.getDuration() || 0);
                        },
                        onStateChange: (event: any) => {
                            if (event.data === 1) {
                                setIsPlaying(true);
                            } else if (event.data === 2) {
                                setIsPlaying(false);
                            } else if (event.data === 0) {
                                setIsPlaying(false);
                                nextVideo();
                            }
                        }
                    }
                });
            }
        } else {
            setTimeout(() => initOrLoadPlayer(videoId), 200);
        }
    };

    // Track playback progress
    useEffect(() => {
        const interval = setInterval(() => {
            if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function' && !isDragging) {
                try {
                    const cur = playerRef.current.getCurrentTime() || 0;
                    const dur = playerRef.current.getDuration() || 0;
                    setCurrentTime(cur);
                    if (dur > 0 && duration !== dur) setDuration(dur);
                } catch {
                    // Ignore
                }
            }
        }, 250);

        return () => clearInterval(interval);
    }, [isDragging, duration]);

    const openTheater = (video: VideoItem, list: VideoItem[]) => {
        setCurrentVideo(video);
        setPlaylist(list);
        const idx = list.findIndex(v => v.id === video.id);
        setCurrentIndex(idx >= 0 ? idx : 0);
        setIsOpen(true);
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            initOrLoadPlayer(video.id);
        }, 100);
    };

    const closeTheater = () => {
        if (playerRef.current && typeof playerRef.current.pauseVideo === 'function') {
            try {
                playerRef.current.pauseVideo();
            } catch (e) {
                console.error(e);
            }
        }
        setIsPlaying(false);
        setIsOpen(false);
        document.body.style.overflow = '';
    };

    const nextVideo = () => {
        if (playlist.length === 0) return;
        const nextIdx = (currentIndex + 1) % playlist.length;
        setCurrentIndex(nextIdx);
        const next = playlist[nextIdx];
        setCurrentVideo(next);
        initOrLoadPlayer(next.id);
    };

    const prevVideo = () => {
        if (playlist.length === 0) return;
        const prevIdx = (currentIndex - 1 + playlist.length) % playlist.length;
        setCurrentIndex(prevIdx);
        const prev = playlist[prevIdx];
        setCurrentVideo(prev);
        initOrLoadPlayer(prev.id);
    };

    const togglePlay = () => {
        if (!playerRef.current) return;
        try {
            const state = playerRef.current.getPlayerState ? playerRef.current.getPlayerState() : (isPlaying ? 1 : 2);
            if (state === 1 || state === 3) {
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

    const seekTo = (time: number) => {
        setCurrentTime(time);
        if (playerRef.current && typeof playerRef.current.seekTo === 'function') {
            playerRef.current.seekTo(time, true);
        }
    };

    const containerRef = (node: HTMLDivElement | null) => {
        containerNodeRef.current = node;
    };

    return (
        <VideoTheaterContext.Provider
            value={{
                isOpen,
                currentVideo,
                playlist,
                currentIndex,
                openTheater,
                closeTheater,
                nextVideo,
                prevVideo,
                isPlaying,
                currentTime,
                duration,
                isMuted,
                togglePlay,
                toggleMute,
                seekTo,
                setDragging: setIsDragging,
                containerRef
            }}
        >
            {children}
        </VideoTheaterContext.Provider>
    );
};

export const useVideoTheater = () => {
    const context = useContext(VideoTheaterContext);
    if (!context) {
        throw new Error('useVideoTheater must be used within a VideoTheaterProvider');
    }
    return context;
};
