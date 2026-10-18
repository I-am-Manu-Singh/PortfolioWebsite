import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Youtube, Play, Pause, SkipBack, SkipForward, Code2, Layers } from 'lucide-react';
import SectionBackground from './SectionBackground';

const PLAYLIST_SERIES = [
    {
        id: "PL3gkgbVoJUE01-P8SzOZa8SXFgTdJsaRq",
        name: "LeetCode Solutions",
        description: "Algorithmic patterns, sliding windows, and daily DSA problem breakdowns",
        badge: "32 Videos",
        videos: [
            { id: "9T27h2oEjTE", title: "2115. Find All Possible Recipes from Given Supplies | Medium | w/ Sol" },
            { id: "4eRqkbic7NA", title: "2529. Maximum Count of Positive & Negative Integer | Easy | w/ Sol" },
            { id: "i8jtDb1GkPw", title: "1358. Number of Substrings Containing Three Characters | Medium | w/ Sol" },
            { id: "5B5imXPsnX4", title: "3306. Count of Substrings Containing Every Vowel | Medium | Solution" },
            { id: "VZn-tMG6kfU", title: "3208. Alternating Groups II | Sliding Window Approach | Medium" },
            { id: "D68iCQMge3Y", title: "2379. Minimum Recolors to Get K Consecutive Black Blocks | Easy" },
            { id: "0lLFf1wRIOM", title: "2523. Closest Prime Numbers in Range | Medium | Easy Solution" },
            { id: "oWmh0wEIi78", title: "2965. Find Missing and Repeated Values | Easy | Explanation w/ Solution" },
            { id: "JwP6M1ra1tY", title: "2579. Count Total Number of Colored Cells | Medium | Solution" },
            { id: "72eDjmTQDKc", title: "1780. Check if Number is a Sum of Powers of Three | Medium" },
            { id: "aPDlcGwtVM4", title: "2161. Partition Array According to Given Pivot | Medium | Solution" },
            { id: "OZrHbGfq1dE", title: "2570. Merge Two 2D Arrays by Summing Values | Easy | Explanation" },
            { id: "41fKG699yBU", title: "2460. Apply Operations to an Array | Easy | Solution" },
            { id: "gZqdgWZ_rbs", title: "1718. Construct the Lexicographically Largest Seq | Medium" },
            { id: "DQhennpNdis", title: "1079. Letter Tile Possibilities | Backtracking | Medium" },
            { id: "uwzTI49Nyj8", title: "2698. Find the Punishment Number of an Integer | Medium" },
            { id: "AOATnYOrwfI", title: "1352. Product of the Last K Numbers | Medium | Solution" },
            { id: "m9FOz5ruucU", title: "3066. Min Opt to Exceed Threshold Value II | Medium" },
            { id: "dAQkN6t3HiA", title: "2342. Max Sum With Equal Sum of Digits | Medium" },
            { id: "_x7VwNwR4go", title: "1910. Remove All Occurrences of a Substring | Medium" },
            { id: "QqJu1kP_MvM", title: "3152. Special Array II | Arrays | Medium" },
            { id: "2M3uE9yBFck", title: "2054. Two Best Non-Overlapping Events | Priority Queue | Medium" },
            { id: "xYCLT77-tGc", title: "1760. Minimum Limit of Balls in a Bag | Binary Search | Medium" },
            { id: "TOqeC7jw5lM", title: "2554. Max Number of Integers to Choose From Range I | Greedy" },
            { id: "KXDMQjwfI4M", title: "2337. Move Pieces to Obtain A String | 2 Pointer Traversal | Medium" },
            { id: "33YJE7pTrEE", title: "2825. Make String a Subseq Using Cyclic Increments | Medium" },
            { id: "h0rD4wV5fW8", title: "2109. Adding Spaces to a String | String | Efficient" },
            { id: "a0LlOYZxNPw", title: "1455. Check If a Word Occurs As Prefix in Word | Easy" },
            { id: "ZqTvLEp9Qz8", title: "1346. Check If N & its Double Exist | HashSet | Easy" },
            { id: "GPdji8mykfc", title: "83. Remove Duplicates from Sorted LL | Java | Easy" },
            { id: "Z2oDKQxHlG8", title: "9. Palindrome Number | Java | Easy & Beginner Level" },
            { id: "WyPQb5LrKKA", title: "1. Two Sum | Kotlin | Brute Force to Optimal Solution" }
        ]
    },
    {
        id: "PL3gkgbVoJUE1FkN8uHt-9SzyxJ4e29wi6",
        name: "App Dev Tutorials",
        description: "Full production architecture, UI design, state management, and code walkthroughs",
        badge: "Tutorials",
        videos: [
            { id: "_xLvPjLWqo0", title: "AnimeDekho | Seekho Project Submission (App Demo, Code & Architecture Walkthrough) | Jetpack Compose" }
        ]
    },
    {
        id: "PL3gkgbVoJUE0qls9KY6pf4xQ5RvgCw8QI",
        name: "App Projects Demos",
        description: "Live app demos, real-world hardware & multiplatform implementations",
        badge: "6 Projects",
        videos: [
            { id: "_xLvPjLWqo0", title: "AnimeDekho | Project Submission & Architecture Walkthrough | Jetpack Compose" },
            { id: "_np9EmGR-3w", title: "[Video 2] Habit/Task Tracker | Code Explanation & Architecture | Jetpack Compose" },
            { id: "3xV5ayFXEbk", title: "Comp Decomp FreeMemory Project | App Video Demo | Jetpack Compose | KMP | Kotlin" },
            { id: "0HtzRC8jP4A", title: "Suddah Utpadah Admin Demo | App Video Demo | Jetpack Compose | KMP" },
            { id: "VmJqrXV8uJQ", title: "Suddah Utpadah User Demo | App Video Demo | Jetpack Compose | KMP" },
            { id: "FGihSNGcbQ8", title: "[Video 1] Habit/Task Tracker | App UI + Firebase Realtime Backend | Jetpack Compose" }
        ]
    }
];

const TechTutorials: React.FC = () => {
    const [selectedSeriesId, setSelectedSeriesId] = useState<string>(PLAYLIST_SERIES[0].id);
    const activeSeries = PLAYLIST_SERIES.find(s => s.id === selectedSeriesId) || PLAYLIST_SERIES[0];

    const [selectedVideo, setSelectedVideo] = useState<{ id: string; title: string }>(activeSeries.videos[0]);
    const [isPlaying, setIsPlaying] = useState<boolean>(true);

    const handleSelectSeries = (s: typeof PLAYLIST_SERIES[0]) => {
        setSelectedSeriesId(s.id);
        setSelectedVideo(s.videos[0]);
        setIsPlaying(true);
    };

    const handleSelectVideo = (v: { id: string; title: string }) => {
        setSelectedVideo(v);
        setIsPlaying(true);
    };

    const videoIndex = activeSeries.videos.findIndex(v => v.id === selectedVideo.id);

    const handlePrev = () => {
        const nextIdx = (videoIndex - 1 + activeSeries.videos.length) % activeSeries.videos.length;
        setSelectedVideo(activeSeries.videos[nextIdx]);
        setIsPlaying(true);
    };

    const handleNext = () => {
        const nextIdx = (videoIndex + 1) % activeSeries.videos.length;
        setSelectedVideo(activeSeries.videos[nextIdx]);
        setIsPlaying(true);
    };

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
                                className="w-36 h-36 lg:w-44 lg:h-44 object-contain drop-shadow-xl relative z-10 pointer-events-auto rounded-3xl border border-dark bg-dark-card/50 backdrop-blur-sm"
                                animate={{ y: [0, -8, 0], rotate: [3, 0, 3] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </motion.div>
                    </div>
                </div>

                {/* Playlist Series Switcher Tabs */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                    {PLAYLIST_SERIES.map((series) => {
                        const isSelected = series.id === selectedSeriesId;
                        return (
                            <button
                                key={series.id}
                                onClick={() => handleSelectSeries(series)}
                                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
                                    isSelected
                                        ? "bg-primary text-white shadow-md shadow-primary/25 font-semibold"
                                        : "bg-dark-card border border-dark text-text-muted hover:text-text hover:bg-dark"
                                }`}
                            >
                                <Layers size={13} />
                                <span>{series.name}</span>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isSelected ? "bg-white/20 text-white" : "bg-dark text-text-muted"}`}>
                                    {series.badge}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Spotify-Style Media Player for Tech Tutorials */}
                <div className="w-full max-w-5xl mx-auto bg-dark-card rounded-2xl overflow-hidden shadow-2xl border border-dark font-sans">
                    <div className="flex flex-col md:flex-row h-[600px] md:h-[500px]">
                        {/* Sidebar / Video Track List */}
                        <div className="w-full md:w-1/2 p-5 overflow-y-auto custom-scrollbar bg-dark border-r border-dark flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-4 pb-3 border-b border-dark">
                                    <h3 className="text-sm font-mono font-bold text-text uppercase flex items-center gap-2">
                                        <Code2 className="text-red-500" size={18} />
                                        <span>Engineering Video Tracks</span>
                                    </h3>
                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-dark-card text-text-muted border border-dark">
                                        {activeSeries.videos.length} Videos
                                    </span>
                                </div>

                                <div className="space-y-1.5">
                                    {activeSeries.videos.map((video, idx) => {
                                        const isSelected = selectedVideo.id === video.id;
                                        return (
                                            <div
                                                key={video.id + idx}
                                                onClick={() => handleSelectVideo(video)}
                                                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all group ${
                                                    isSelected 
                                                        ? 'bg-dark-card border border-primary/40 shadow-md ring-1 ring-primary/20' 
                                                        : 'hover:bg-dark-card/60 border border-transparent'
                                                }`}
                                            >
                                                <div className="text-text-muted w-5 text-center text-xs font-mono group-hover:hidden shrink-0">
                                                    {isSelected && isPlaying ? (
                                                        <div className="flex items-end gap-[2px] h-3 justify-center">
                                                            <div className="w-[3px] bg-red-500 animate-[bounce_0.6s_infinite]" />
                                                            <div className="w-[3px] bg-red-500 animate-[bounce_0.8s_infinite]" />
                                                            <div className="w-[3px] bg-red-500 animate-[bounce_1s_infinite]" />
                                                        </div>
                                                    ) : (idx + 1)}
                                                </div>
                                                <div className="text-primary hidden group-hover:block w-5 shrink-0">
                                                    <Play size={14} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className={`text-xs md:text-sm font-medium truncate flex items-center gap-1.5 ${isSelected ? 'text-primary font-bold' : 'text-text'}`}>
                                                        <span className="truncate">{video.title}</span>
                                                    </div>
                                                    <div className="text-[11px] text-text-muted truncate font-mono mt-0.5">
                                                        {activeSeries.name} · Track {idx + 1}
                                                    </div>
                                                </div>
                                                <div className="text-[10px] font-mono px-2 py-0.5 rounded bg-dark-card text-text-muted border border-dark shrink-0">
                                                    Watch
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="p-3 rounded-xl bg-dark-card border border-dark mt-4 flex items-center justify-between text-xs font-mono text-text-muted">
                                <span>{activeSeries.name}</span>
                                <a
                                    href={`https://www.youtube.com/playlist?list=${activeSeries.id}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-red-500 hover:underline font-bold"
                                >
                                    Open Full Playlist →
                                </a>
                            </div>
                        </div>

                        {/* Main Player Area */}
                        <div className="w-full md:w-1/2 bg-dark-card p-6 flex flex-col justify-between relative">
                            {/* Video Embed */}
                            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg mb-4 bg-black z-10 border border-dark">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=${isPlaying ? 1 : 0}`}
                                    title={selectedVideo.title}
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
                                        {activeSeries.name}
                                    </span>
                                    <h2 className="text-base md:text-lg font-bold text-text truncate mt-1.5" title={selectedVideo.title}>
                                        {selectedVideo.title}
                                    </h2>
                                    <p className="text-xs text-text-muted font-mono">
                                        Track {videoIndex + 1} of {activeSeries.videos.length} · Manpreet Singh
                                    </p>
                                </div>

                                {/* Controls */}
                                <div className="flex flex-col gap-2">
                                    <div className="w-full bg-dark h-1.5 rounded-full overflow-hidden border border-dark">
                                        <div className="h-full bg-red-500 w-2/5 rounded-full" />
                                    </div>
                                    <div className="flex justify-between text-[11px] text-text-muted font-mono">
                                        <span>Video {videoIndex + 1}</span>
                                        <span>Streaming from YouTube</span>
                                    </div>

                                    <div className="flex items-center justify-center gap-6 mt-1">
                                        <SkipBack 
                                            className="text-text-muted hover:text-text cursor-pointer transition-colors" 
                                            size={22}
                                            onClick={handlePrev}
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
                                            onClick={handleNext}
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
