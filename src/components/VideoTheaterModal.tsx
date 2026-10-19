import React, { useState, useEffect, useRef } from 'react';
import { useVideoTheater } from '../context/VideoTheaterContext';
import { Play, Pause, SkipForward, SkipBack, Minimize2, Volume2, VolumeX, X } from 'lucide-react';

const VideoTheaterModal: React.FC = () => {
    const {
        isOpen,
        currentVideo,
        playlist,
        currentIndex,
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
        setDragging,
        containerRef
    } = useVideoTheater();

    if (!isOpen || !currentVideo) return null;

    const formatTime = (secs: number) => {
        if (isNaN(secs) || secs < 0) return "0:00";
        const m = Math.floor(secs / 60);
        const s = Math.floor(secs % 60);
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const progressPercent = duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0;

    return (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-6 md:p-10">
            {/* Backdrop */}
            <div
                onClick={closeTheater}
                className="fixed inset-0 bg-black/85 backdrop-blur-2xl transition-opacity cursor-pointer z-0"
            />

            {/* Modal Box */}
            <div className="relative z-10 w-full max-w-6xl max-h-[92vh] h-full flex flex-col rounded-2xl bg-dark-card border border-dark shadow-2xl overflow-hidden animate-scale-up">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-3.5 bg-dark border-b border-dark shrink-0">
                    <div className="flex items-center gap-3 truncate pr-4">
                        <span className={`text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full border ${currentVideo.badgeColor || 'text-red-500 bg-red-600/10 border-red-600/25'}`}>
                            {currentVideo.badge || 'Tutorial'}
                        </span>
                        <h3 className="text-sm md:text-base font-bold text-text truncate font-outfit" title={currentVideo.title}>
                            {currentVideo.title}
                        </h3>
                    </div>
                    <button
                        type="button"
                        onClick={closeTheater}
                        className="p-2 rounded-xl text-text-muted hover:text-white hover:bg-dark-card transition-colors cursor-pointer shrink-0"
                        title="Close Fullscreen Theater"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Video Container Area */}
                <div className="relative flex-1 min-h-[320px] bg-black flex items-center justify-center overflow-hidden">
                    <div
                        ref={containerRef}
                        className="w-full h-full flex items-center justify-center [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0 pointer-events-none"
                    />

                    {/* Click Interceptor to Toggle Play/Pause */}
                    <div
                        onClick={togglePlay}
                        className="absolute inset-0 z-10 cursor-pointer flex items-center justify-center bg-black/0 hover:bg-black/10 transition-colors"
                        title={isPlaying ? "Click to Pause" : "Click to Play"}
                    >
                        {!isPlaying && (
                            <div className="w-16 h-16 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110 pointer-events-none">
                                <Play size={24} fill="white" className="ml-1" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom Control Bar */}
                <div className="p-4 bg-dark border-t border-dark shrink-0 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 truncate">
                            <span className={`text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full border ${currentVideo.badgeColor || 'text-red-500 bg-red-600/10 border-red-600/25'}`}>
                                {currentVideo.badge || 'Tutorial'}
                            </span>
                            <h2 className="text-sm md:text-base font-bold text-text truncate font-outfit" title={currentVideo.title}>
                                {currentVideo.title}
                            </h2>
                        </div>
                        <span className="text-[11px] font-mono text-text-muted shrink-0">
                            Track {currentIndex + 1} of {playlist.length}
                        </span>
                    </div>

                    {currentVideo.subtitle && (
                        <p className="text-xs text-text-muted font-mono truncate">
                            {currentVideo.subtitle}
                        </p>
                    )}

                    {/* Seekbar */}
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
                                onChange={(e) => seekTo(parseFloat(e.target.value))}
                                onMouseDown={() => setDragging(true)}
                                onMouseUp={() => setDragging(false)}
                                onTouchStart={() => setDragging(true)}
                                onTouchEnd={() => setDragging(false)}
                                className="relative z-10 w-full h-1.5 appearance-none cursor-pointer bg-transparent accent-primary group-hover:h-2 transition-all focus:outline-none"
                                aria-label="Seek Video"
                            />
                        </div>
                        <div className="flex justify-between text-[11px] text-text-muted font-mono">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>
                    </div>

                    {/* Controls Row */}
                    <div className="flex items-center justify-between pt-1">
                        <button
                            type="button"
                            onClick={toggleMute}
                            className="p-2 rounded-full text-text-muted hover:text-text hover:bg-dark-card transition-colors cursor-pointer"
                            title={isMuted ? "Unmute" : "Mute"}
                        >
                            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                        </button>

                        <div className="flex items-center gap-4 sm:gap-5">
                            <button
                                type="button"
                                onClick={prevVideo}
                                className="text-text-muted hover:text-text cursor-pointer transition-colors p-1"
                                title="Previous Video"
                            >
                                <SkipBack size={20} />
                            </button>

                            <button
                                type="button"
                                onClick={togglePlay}
                                className="p-3 bg-primary hover:bg-primary-light text-white rounded-full transition-all hover:scale-105 shadow-md shadow-primary/25 cursor-pointer flex items-center justify-center"
                                title={isPlaying ? "Pause" : "Play"}
                            >
                                {isPlaying ? <Pause size={20} fill="white" /> : <Play size={20} fill="white" className="ml-0.5" />}
                            </button>

                            <button
                                type="button"
                                onClick={nextVideo}
                                className="text-text-muted hover:text-text cursor-pointer transition-colors p-1"
                                title="Next Video"
                            >
                                <SkipForward size={20} />
                            </button>
                        </div>

                        <button
                            type="button"
                            onClick={closeTheater}
                            className="px-3.5 py-1.5 rounded-lg bg-primary hover:bg-primary-light text-white text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-md shadow-primary/20"
                            title="Exit Theater"
                        >
                            <Minimize2 size={14} />
                            <span>Exit</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoTheaterModal;
