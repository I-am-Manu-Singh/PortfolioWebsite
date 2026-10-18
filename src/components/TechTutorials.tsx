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
            { title: "2115. Find All Possible Recipes from Given Supplies | Medium | w/ Sol", id: "5a0J5U5s664" },
            { title: "1368. Minimum Cost to Make at Least One Valid Path in a Grid | Hard | w/ Sol", id: "fE7p3L40F5Y" },
            { title: "2683. Neighboring Bitwise XOR | Medium | w/ Sol", id: "vR1K1Z2c9Bw" },
            { title: "2429. Minimize XOR | Medium | w/ Sol", id: "kS6k0G7j6uY" },
            { title: "2425. Bitwise XOR of All Pairings | Medium | w/ Sol", id: "0YdG5y7f_2k" },
            { title: "2657. Find the Prefix Common Array of Two Arrays | Medium | w/ Sol", id: "V_9w7s3b5K0" },
            { title: "1400. Construct K Palindrome Strings | Medium | w/ Sol", id: "hT2P7j9Q9F4" },
            { title: "916. Word Subsets | Medium | w/ Sol", id: "e6Jk9w7q8xI" },
            { title: "2185. Counting Words With a Given Prefix | Easy | w/ Sol", id: "Y5g1g7e4e0Q" },
            { title: "3042. Count Prefix and Suffix Pairs I | Easy | w/ Sol", id: "A5F4w1v9l_M" },
            { title: "1408. String Matching in an Array | Easy | w/ Sol", id: "nB0Q2z5z_9Y" },
            { title: "1769. Minimum Number of Operations to Move All Balls to Each Box | Medium", id: "lR4V7k0m2lQ" },
            { title: "2381. Shifting Letters II | Medium | w/ Sol", id: "c7F1v5m4r9s" },
            { title: "1930. Unique Length-3 Palindromic Subsequences | Medium | w/ Sol", id: "d6P2z7k8b3E" },
            { title: "2270. Number of Ways to Split Array | Medium | w/ Sol", id: "J0X5y9v4w8A" },
            { title: "2559. Count Vowel Strings in Ranges | Medium | w/ Sol", id: "F8B3y5z6p1Q" },
            { title: "2466. Count Ways To Build Good Strings | Medium | w/ Sol", id: "N2H7v1s4d8E" },
            { title: "1014. Best Sightseeing Pair | Medium | w/ Sol", id: "Z6K4b9v2p5A" },
            { title: "494. Target Sum | Medium | w/ Sol", id: "p1Q7y4k9w0X" },
            { title: "2471. Minimum Number of Operations to Sort a Binary Tree by Level | Medium", id: "g3B8z2y5w1E" },
            { title: "769. Max Chunks To Make Sorted | Medium | w/ Sol", id: "q8K2x9v4p0A" },
            { title: "1475. Final Prices With a Special Discount in a Shop | Easy | w/ Sol", id: "t5P0y8w2k7E" },
            { title: "2182. Construct String With Repeat Limit | Medium | w/ Sol", id: "m4R9v2k7b5Q" },
            { title: "3264. Final Array State After K Multiplication Operations I | Easy", id: "s6Y1x8w3p9A" },
            { title: "2762. Continuous Subarrays | Medium | w/ Sol", id: "w9K4b2v8p3E" },
            { title: "2593. Find Score of an Array After Marking All Elements | Medium | w/ Sol", id: "v3P8z0y7w2Q" },
            { title: "2558. Take Gifts From the Richest Pile | Easy | w/ Sol", id: "b5R2v9k4p1A" },
            { title: "2779. Maximum Beauty of an Array After Applying Operation | Medium", id: "k7X3y8w1p6E" },
            { title: "2981. Find Longest Special Substring That Occurs Thrice I | Medium", id: "p9B4z2y6w0Q" },
            { title: "2054. Two Best Non-Overlapping Events | Medium | w/ Sol", id: "z2R7v8k3p5A" },
            { title: "1813. Sentence Similarity III | Medium | w/ Sol", id: "y4X9w2p7k1E" },
            { title: "1331. Rank Transform of an Array | Easy | w/ Sol", id: "q1B8z5y3w9Q" }
        ]
    },
    {
        id: "tutorials",
        name: "App Dev Tutorials",
        playlistId: "PL3gkgbVoJUE1FkN8uHt-9SzyxJ4e29wi6",
        badge: "Tutorials",
        videos: [
            { title: "Jetpack Compose: Modern Android UI Guide", id: "3fA4C3tE87U" },
            { title: "Kotlin Multiplatform (KMP) Architecture Explained", id: "L2k8vP9vW4s" },
            { title: "React Native Performance Optimization & TurboModules", id: "V6bY2q_m7Xk" },
            { title: "Full-Stack Mobile Architecture with Supabase & Node.js", id: "P4zW8t0y5R1" }
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
