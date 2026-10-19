import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Layers, Play, Code2, Youtube
} from 'lucide-react';
import SectionBackground from './SectionBackground';
import YouTubePlayer from './YouTubePlayer';
import type { VideoItem } from '../context/VideoTheaterContext';

interface Series {
    id: string;
    name: string;
    playlistId: string;
    badge: string;
    videos: Array<{
        title: string;
        id: string;
    }>;
}

const PLAYLIST_SERIES: Series[] = [
    {
        id: "leetcode",
        name: "LeetCode Solutions",
        playlistId: "PL3gkgbVoJUE01-P8SzOZa8SXFgTdJsaRq",
        badge: "DSA & Problem Solving",
        videos: [
            { title: "2115. Find All Possible Recipes from Given Supplies | Leetcode Daily | Medium", id: "9T27h2oEjTE" },
            { title: "2529. Maximum Count of Positive Integer & Negative Integer | Leetcode Daily | Easy", id: "4eRqkbic7NA" },
            { title: "1358. Number of Substrings Containing Three Characters | Leetcode Daily | Medium", id: "i8jtDb1GkPw" },
            { title: "3306. Count of Substrings Containing Every Vowel | Leetcode Daily | Medium", id: "5B5imXPsnX4" },
            { title: "3208. Alternating Groups II | Leetcode Daily | Sliding Window | Medium", id: "VZn-tMG6kfU" },
            { title: "2379. Minimum Recolors to Get K Consecutive Black Blocks | Leetcode Daily | Easy", id: "D68iCQMge3Y" },
            { title: "2523. Closest Prime Numbers in Range | Leetcode Daily | Medium", id: "0lLFf1wRIOM" },
            { title: "2965. Find Missing and Repeated Values | Leetcode Daily | Easy", id: "oWmh0wEIi78" },
            { title: "2579. Count Total Number of Colored Cells | Leetcode Daily | Medium", id: "JwP6M1ra1tY" },
            { title: "1780. Check if Number is a Sum of Powers of Three | Leetcode Daily | Medium", id: "72eDjmTQDKc" },
            { title: "2161. Partition Array According to Given Pivot | Leetcode Daily | Medium", id: "aPDlcGwtVM4" },
            { title: "2570. Merge Two 2D Arrays by Summing Values | Leetcode Daily | Easy", id: "OZrHbGfq1dE" },
            { title: "2460. Apply Operations to an Array | Leetcode Daily | Easy", id: "41fKG699yBU" },
            { title: "1718. Construct the Lexicographically Largest Sequence | Leetcode Daily | Medium", id: "gZqdgWZ_rbs" },
            { title: "1079. Letter Tile Possibilities | Leetcode Daily | Backtracking | Medium", id: "DQhennpNdis" },
            { title: "2698. Find the Punishment Number of an Integer | Leetcode Daily | Medium", id: "uwzTI49Nyj8" },
            { title: "1352. Product of the Last K Numbers | Leetcode Daily | Medium", id: "AOATnYOrwfI" },
            { title: "3066. Minimum Operations to Exceed Threshold Value II | Leetcode Daily | Medium", id: "m9FOz5ruucU" },
            { title: "2342. Max Sum With Equal Sum of Digits | Leetcode Daily | Medium", id: "dAQkN6t3HiA" },
            { title: "1910. Remove All Occurrences of a Substring | Leetcode Daily | Medium", id: "_x7VwNwR4go" },
            { title: "3152. Special Array II | Leetcode Daily | Arrays | Medium", id: "QqJu1kP_MvM" },
            { title: "2054. Two Best Non-Overlapping Events | Leetcode Daily | Priority Queue | Medium", id: "2M3uE9yBFck" },
            { title: "1760. Minimum Limit of Balls in a Bag | Leetcode Daily | Binary Search | Medium", id: "xYCLT77-tGc" },
            { title: "2554. Max Number of Integers to Choose From a Range I | Leetcode Daily | Greedy", id: "TOqeC7jw5lM" },
            { title: "2337. Move Pieces to Obtain A String | Leetcode Daily | 2 Pointers | Medium", id: "KXDMQjwfI4M" },
            { title: "2825. Make String a Subsequence Using Cyclic Increments | LeetCode Daily | Medium", id: "33YJE7pTrEE" },
            { title: "2109. Adding Spaces to a String | LeetCode Daily | String | Medium", id: "h0rD4wV5fW8" },
            { title: "1455. Check If a Word Occurs As Prefix in Word in a Sentence | LeetCode Daily", id: "a0LlOYZxNPw" },
            { title: "1346. Check If N and Its Double Exist | LeetCode Daily | HashSet", id: "ZqTvLEp9Qz8" },
            { title: "83. Remove Duplicates from Sorted List | LeetCode | Easy", id: "GPdji8mykfc" },
            { title: "9. Palindrome Number | LeetCode | Easy", id: "Z2oDKQxHlG8" },
            { title: "1. Two Sum | LeetCode | Kotlin & Java | Easy", id: "WyPQb5LrKKA" }
        ]
    },
    {
        id: "tutorials",
        name: "App Dev Tutorials",
        playlistId: "PL3gkgbVoJUE1FkN8uHt-9SzyxJ4e29wi6",
        badge: "Tutorials",
        videos: [
            { title: "AnimeDekho | Seekho-Project-Submission (App Demo, Code Explanation & Walkthrough) | Jetpack Compose", id: "_xLvPjLWqo0" }
        ]
    }
];

const TechTutorials: React.FC = () => {
    const [selectedSeriesId, setSelectedSeriesId] = useState<string>("leetcode");
    const [videoIndex, setVideoIndex] = useState<number>(0);

    const activeSeries = PLAYLIST_SERIES.find(s => s.id === selectedSeriesId) || PLAYLIST_SERIES[0];
    const selectedVideo = activeSeries.videos[videoIndex] || activeSeries.videos[0];

    const handleSelectSeries = (series: Series) => {
        setSelectedSeriesId(series.id);
        setVideoIndex(0);
    };

    const handleSelectVideo = (video: { title: string; id: string }) => {
        const idx = activeSeries.videos.findIndex(v => v.id === video.id);
        if (idx !== -1) setVideoIndex(idx);
    };

    const handleNext = () => {
        setVideoIndex((prev) => (prev + 1) % activeSeries.videos.length);
    };

    const handlePrev = () => {
        setVideoIndex((prev) => (prev - 1 + activeSeries.videos.length) % activeSeries.videos.length);
    };

    // Format playlist items for theater mode
    const playlistItems: VideoItem[] = activeSeries.videos.map((v, i) => ({
        id: v.id,
        title: v.title,
        subtitle: `${activeSeries.name} · Track ${i + 1} of ${activeSeries.videos.length}`,
        badge: activeSeries.name,
        badgeColor: activeSeries.id === 'leetcode' 
            ? "text-[#FFA116] bg-[#FFA116]/10 border-[#FFA116]/20" 
            : "text-primary bg-primary/10 border-primary/20"
    }));

    return (
        <section className="section bg-dark relative overflow-hidden" id="tech-tutorials">
            <SectionBackground variant="tutorials" />
            <div className="container relative z-10">
                {/* Header with Caricature */}
                <div className="flex flex-col items-center mb-10 text-center relative">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="p-1.5 rounded-lg bg-red-600/10 text-red-500 border border-red-600/20">
                            <Youtube size={18} />
                        </span>
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-500">
                            Hands-On Engineering
                        </span>
                    </div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-title mb-3"
                    >
                        Tech <span className="text-primary-light">Tutorials</span>
                    </motion.h2>
                    <p className="text-text-muted max-w-xl text-xs md:text-sm font-mono">
                        Real-world walkthroughs covering Data Structures & Algorithms, Kotlin Multiplatform, and production mobile architecture.
                    </p>

                    {/* Teacher Caricature */}
                    <div className="absolute right-0 -top-6 lg:right-6 lg:-top-14 z-0 hidden lg:block pointer-events-none">
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

                {/* Media Player Card */}
                <div className="w-full max-w-5xl mx-auto bg-dark-card rounded-2xl shadow-2xl border border-dark font-sans">
                    <div className="flex flex-col md:flex-row h-[620px] md:h-[520px]">
                        {/* Sidebar / Track List */}
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
                                                        ? "bg-dark-card border border-primary/40 shadow-md ring-1 ring-primary/20" 
                                                        : "hover:bg-dark-card/60 border border-transparent"
                                                }`}
                                            >
                                                <div className="text-text-muted w-5 text-center text-xs font-mono group-hover:hidden shrink-0">
                                                    {idx + 1}
                                                </div>
                                                <div className="text-primary hidden group-hover:block w-5 shrink-0">
                                                    <Play size={14} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className={`text-xs md:text-sm font-medium truncate flex items-center gap-1.5 ${isSelected ? "text-primary font-bold" : "text-text"}`}>
                                                        <span className="truncate">{video.title}</span>
                                                    </div>
                                                    <div className="text-[11px] text-text-muted truncate font-mono mt-0.5">
                                                        {activeSeries.name} · Video {idx + 1}
                                                    </div>
                                                </div>
                                                <div className="text-[10px] font-mono px-2 py-0.5 rounded bg-dark-card text-text-muted border border-dark shrink-0">
                                                    Play
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="p-3 rounded-xl bg-dark-card border border-dark mt-4 flex items-center justify-between text-xs font-mono text-text-muted">
                                <span>{activeSeries.name}</span>
                                <span className="text-primary font-bold">
                                    {activeSeries.videos.length} Episodes Available
                                </span>
                            </div>
                        </div>

                        {/* Player Container */}
                        <div className="w-full md:w-1/2 bg-dark-card p-6 flex flex-col justify-between relative">
                            <YouTubePlayer
                                videoId={selectedVideo.id}
                                title={selectedVideo.title}
                                subtitle={`${activeSeries.name} · Track ${videoIndex + 1} of ${activeSeries.videos.length}`}
                                badge={activeSeries.name}
                                badgeColor={activeSeries.id === 'leetcode' 
                                    ? "text-[#FFA116] bg-[#FFA116]/10 border-[#FFA116]/20" 
                                    : "text-red-500 bg-red-600/10 border-red-600/25"}
                                onPrev={handlePrev}
                                onNext={handleNext}
                                hasPrev={activeSeries.videos.length > 1}
                                hasNext={activeSeries.videos.length > 1}
                                currentIndex={videoIndex + 1}
                                totalCount={activeSeries.videos.length}
                                playlistItems={playlistItems}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TechTutorials;
