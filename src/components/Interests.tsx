import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Instagram, ArrowUpRight, Play, Layers, Compass } from "lucide-react";
import SectionBackground from "./SectionBackground";
import YouTubePlayer from "./YouTubePlayer";

interface VideoItem {
    id: string;
    title: string;
}

interface SubPlaylist {
    id: string;
    name: string;
    playlistId: string;
    badge: string;
    videos: VideoItem[];
}

interface Discipline {
    id: string;
    title: string;
    category: string;
    caricature: string;
    playlists: SubPlaylist[];
}

const MUSIC_DISCIPLINES: Discipline[] = [
  {
    "id": "piano",
    "title": "Piano Covers",
    "category": "Keys & Synthesizers",
    "caricature": "caricature_piano.png",
    "playlists": [
      {
        "id": "bollywood_piano",
        "name": "Bollywood Piano Covers",
        "playlistId": "PL3gkgbVoJUE3chqzwYgEoSq9NZUuLlMRK",
        "badge": "13 Tracks",
        "videos": [
          {
            "id": "GINmap5WSX0",
            "title": "Jaiye Sajana #cover #dhurandhar #satindersartaaj #piano #drums"
          },
          {
            "id": "C1v5mnz5IcQ",
            "title": "Jaiye Sajana - @Satinder-Sartaaj   | Piano🎹 & Drum 🥁 Cover & Tutorial | *USE EARPHONES*"
          },
          {
            "id": "F80cDOn5Vkk",
            "title": "77th Republic day of India | Maa Tujhe Salaam | Piano Tribute | Manpreet Singh #piano #cover #india"
          },
          {
            "id": "pU_M4Kqmosg",
            "title": "Saiyaara Title Song -  @faheemabdullahworld | Piano🎹 Cover & Tutorial | *USE EARPHONES*"
          },
          {
            "id": "4Pll2sPO1KM",
            "title": "Ijazat - @FalakShabir   | Piano🎹 Cover | *USE EARPHONES*"
          },
          {
            "id": "FvVxVr-krHk",
            "title": "Tujhpe Main Fida OST - @sarthaknakul@raghavchaitanya  | Piano🎹 Cover | *USE EARPHONES*"
          },
          {
            "id": "lc1rU5_e9vY",
            "title": "Shayad - Love Aaj Kal | Piano🎹 Cover | Live Performance | Manpreet Singh | *USE EARPHONES*| Virtuoso"
          },
          {
            "id": "XgUKBq2xCPQ",
            "title": "Khairiyat - Chhichhore | Piano🎹 Cover | Live Performance |Manpreet Singh |*USE EARPHONES*|Virtuoso"
          },
          {
            "id": "3S35JhdPsRo",
            "title": "Kesariya - Brahmāstra | Piano🎹 Cover | Live Performance | Manpreet Singh | *USE EARPHONES* |Virtuoso"
          },
          {
            "id": "ViuXJhpWcY4",
            "title": "Rasiya - Brahmāstra  | Piano🎹 Cover | Live Performance | Manpreet Singh | *USE EARPHONES* | Virtuoso"
          },
          {
            "id": "t5iLQUAzsZQ",
            "title": "Banjaara - Ek Villain | Piano Cover | Manpreet Singh | *USE EARPHONES* | Full version coming soon"
          },
          {
            "id": "s4h3_lYdf_A",
            "title": "Intezaar - Mithoon | Piano Cover | Manpreet Singh | *USE EARPHONES*"
          },
          {
            "id": "2F2sGjP5krg",
            "title": "Dil - Ek Villain Returns | Piano Cover | Manpreet Singh | *USE EARPHONES*"
          }
        ]
      },
      {
        "id": "hollywood_piano",
        "name": "Western Hollywood Piano",
        "playlistId": "PL3gkgbVoJUE0gLQLM8q4hJefXhrrrre9g",
        "badge": "1 Track",
        "videos": [
          {
            "id": "D_MAvFiCqvo",
            "title": "Dandelions  - Ruth B. | Piano🎹 Cover | Live Performance | Manpreet Singh | *USE EARPHONES*| Virtuoso"
          }
        ]
      }
    ]
  },
  {
    "id": "guitar",
    "title": "Guitar Sessions",
    "category": "Electric & Acoustic Guitars",
    "caricature": "caricature_guitar.png",
    "playlists": [
      {
        "id": "bollywood_electric_guitar",
        "name": "Bollywood Electric Guitar",
        "playlistId": "PL3gkgbVoJUE05gqKg2WhscZdE5DkrTL3-",
        "badge": "7 Tracks",
        "videos": [
          {
            "id": "dkYbZBV5rCc",
            "title": "Jo Bhi Main - ROCKSTAR | Raw Electric Guitar🎸Live performance Cover | Manpreet Singh"
          },
          {
            "id": "LSV8g0e2z4A",
            "title": "Nadaan Parinday - ROCKSTAR | Raw Electric Guitar🎸Live performance Cover | Manpreet Singh"
          },
          {
            "id": "L86uPkvN58w",
            "title": "Sadda Haq  - ROCKSTAR | Raw Electric Guitar🎸Live performance Cover | Manpreet Singh"
          },
          {
            "id": "MfGNR4O6tK4",
            "title": "Tum Ho - ROCKSTAR | Raw Electric Guitar🎸Live performance Cover | Manpreet Singh"
          },
          {
            "id": "yFh98lVnxrc",
            "title": "Saiyaara Title Song - Electric Guiitar Cover(Live By Manpreet Singh)"
          },
          {
            "id": "psJLx33GWQw",
            "title": "Saiyaara Title Track - Guitar Riff #2  #guitarcover #rockguitar"
          },
          {
            "id": "VxQ0ueBw1Q0",
            "title": "Saiyaara Title Track - Guitar Riff #1"
          }
        ]
      },
      {
        "id": "punjabi_vocal_guitar",
        "name": "Punjabi Vocal + Guitar",
        "playlistId": "PL3gkgbVoJUE1tDaChNK1LkhyHTwtOrP78",
        "badge": "3 Tracks",
        "videos": [
          {
            "id": "eqPrTaRVrzs",
            "title": "Ve Maahi - Arijit Singh | Raw Vocal Cover🎤| Live Performance | Kesari | Manpreet Singh"
          },
          {
            "id": "sJ_UFnwAqHk",
            "title": "Fakira - Gurnam Bhullar | Raw Vocal Cover🎤 | Live Performance | Manpreet Singh"
          },
          {
            "id": "k1WKqPMZEdo",
            "title": "Teri Mitti - B Praak | 76th Republic Day| A Tribute by Manpreet Singh to Army | Live Performance"
          }
        ]
      },
      {
        "id": "western_vocal_guitar",
        "name": "Western Vocal + Guitar",
        "playlistId": "PL3gkgbVoJUE1U3g7v8dQWJX_xfJOLY_sM",
        "badge": "1 Track",
        "videos": [
          {
            "id": "By9-QhCwZ5Y",
            "title": "Dandelions  - Ruth B. | Raw Guitar🎸+Vocal Cover🎤 | Live Performance | Manpreet Singh"
          }
        ]
      }
    ]
  },
  {
    "id": "vocals",
    "title": "Singing & Vocals",
    "category": "Classical, Sufi & Bollywood Vocals",
    "caricature": "caricature_singing.png",
    "playlists": [
      {
        "id": "classical_sufi_vocals",
        "name": "Classical & Sufi Vocals",
        "playlistId": "PL3gkgbVoJUE1EYUoXKCS7lx5-o3Go2rx9",
        "badge": "3 Tracks",
        "videos": [
          {
            "id": "0qyMJ5-BQ5Q",
            "title": "Hangama Hai Kyun Barpa - Ustaad Ghulam Ali Khan | Raw Vocal Cover🎤| Live Performance| Manpreet Singh"
          },
          {
            "id": "knL3EB_Pjhk",
            "title": "Afreen Afreen - Rahat Ali Khan |Full ver. w/ Sargam|Raw Vocal Cover🎤|Live Performance|Manpreet Singh"
          },
          {
            "id": "OzyWAppoFeo",
            "title": "Dhaage - @AbbyVOfficial  | Raw Vocal Cover🎤 | Live Performance | Manpreet Singh"
          }
        ]
      },
      {
        "id": "acoustic_bollywood_vocals",
        "name": "Acoustic Bollywood Vocals",
        "playlistId": "PL3gkgbVoJUE2UwiCtpeOksjqDXbdBgO_5",
        "badge": "5 Tracks",
        "videos": [
          {
            "id": "yyb4cqWDppQ",
            "title": "Satranga - Arijit Singh | Raw Guitar🎸+Vocal Cover🎤 | Live Performance | Manpreet Singh"
          },
          {
            "id": "tlQrLzIlR7c",
            "title": "Khairiyat - Arijit Singh | Raw Guitar🎸+Vocal Cover🎤 | Live Performance | Manpreet Singh"
          },
          {
            "id": "OMFNlI7TaW8",
            "title": "Jo Tum Mere Ho - Anuv Jain | Raw Guitar🎸+Vocal Cover🎤 | Live Performance | Manpreet Singh"
          },
          {
            "id": "KW520VQl3gU",
            "title": "Aankhon Se Batana - Dikshant | Raw Guitar🎸+Vocal Cover🎤 | Live Performance | Manpreet Singh"
          },
          {
            "id": "yzWL4hZOfTk",
            "title": "Phir Se Udd Chala - ROCKSTAR | Raw Vocal Cover🎤 | Live Performance | Manpreet Singh"
          }
        ]
      },
      {
        "id": "live_vocal_performances",
        "name": "Live Vocal Performances",
        "playlistId": "PL3gkgbVoJUE3zAKHCjq3traur22GZFJKo",
        "badge": "4 Tracks",
        "videos": [
          {
            "id": "R7KXuIV_St8",
            "title": "Abhi Mujh Mein Kahin - @sonunigam|@humraahmusicloversgroupkot6566|Live Performance |Manpreet Singh"
          },
          {
            "id": "Uc4qj_ik6zk",
            "title": "Paani Panja Dariyanwan Da - @Satinder-Sartaaj|@humraahmusicloversgroupkot6566|Live |Manpreet Singh"
          },
          {
            "id": "7W7GhDQPH_U",
            "title": "Jaa Kaga - @AbbyVOfficial@BennyDayalOfficial|@humraahmusicloversgroupkot6566|Live |Manpreet Singh"
          },
          {
            "id": "e9RL3K_X8Dc",
            "title": "Ratiya -@AbbyVOfficial|@humraahmusicloversgroupkot6566| Live Mic 🎤 Performance | Manpreet Singh"
          }
        ]
      },
      {
        "id": "devotional_vocals",
        "name": "Devotional Vocal Covers",
        "playlistId": "PL3gkgbVoJUE2vGVsyASrPnYvX4wEWgYYd",
        "badge": "1 Track",
        "videos": [
          {
            "id": "ueT5C5jVoMc",
            "title": "Layak - Vinay Katoch | Maha Shivratri | Shiv Bhakti Bhajan | Live Performance | Manpreet Singh"
          }
        ]
      }
    ]
  },
  {
    "id": "travel",
    "title": "Travel & Expeditions",
    "category": "High-Altitude Summits & Vlogs",
    "caricature": "caricature_professional.png",
    "playlists": [
      {
        "id": "travel_vlogs",
        "name": "Travel & Himalayan Treks",
        "playlistId": "PL3gkgbVoJUE0irlu98pMrLAsDnq3y2-fU",
        "badge": "4 Vlogs",
        "videos": [
          {
            "id": "8WjSBP6fpcY",
            "title": "Kuari Pass x Pangarchulla Peak Vlog | 2 Epic Summits in One Trek"
          },
          {
            "id": "t5oH1U7ogbc",
            "title": "Kauri Pass Summit View (12,516 ft)| 10 March 2026 #lordcurzon #trek #trekking #uttrakhand #himalayas"
          },
          {
            "id": "uiNrFOjWcqw",
            "title": "Mt. Pangarchulla Peak Summit View (15,069 ft) |12 March 2026 #trekking  #trek #uttrakhand #himalayas"
          },
          {
            "id": "7GRqJn8gek4",
            "title": "Mt. Pangarchulla Peak Summit View (15,069 ft) | 12 March 2026 | 📷 Credits - deepak_jedi"
          }
        ]
      }
    ]
  }
];

const Interests: React.FC = () => {
    const [selectedDisciplineId, setSelectedDisciplineId] = useState<string>("piano");
    const activeDiscipline = MUSIC_DISCIPLINES.find(d => d.id === selectedDisciplineId) || MUSIC_DISCIPLINES[0];

    const [selectedSubPlaylistId, setSelectedSubPlaylistId] = useState<string>(activeDiscipline.playlists[0].id);
    const activeSubPlaylist = activeDiscipline.playlists.find(p => p.id === selectedSubPlaylistId) || activeDiscipline.playlists[0];

    const [selectedVideo, setSelectedVideo] = useState<VideoItem>(activeSubPlaylist.videos[0]);

    const handleSelectDiscipline = (d: Discipline) => {
        setSelectedDisciplineId(d.id);
        const sub = d.playlists[0];
        setSelectedSubPlaylistId(sub.id);
        setSelectedVideo(sub.videos[0]);
    };

    const handleSelectSubPlaylist = (sub: SubPlaylist) => {
        setSelectedSubPlaylistId(sub.id);
        setSelectedVideo(sub.videos[0]);
    };

    const videoIndex = activeSubPlaylist.videos.findIndex(v => v.id === selectedVideo.id);

    const handlePrev = () => {
        const nextIdx = (videoIndex - 1 + activeSubPlaylist.videos.length) % activeSubPlaylist.videos.length;
        setSelectedVideo(activeSubPlaylist.videos[nextIdx]);
    };

    const handleNext = () => {
        const nextIdx = (videoIndex + 1) % activeSubPlaylist.videos.length;
        setSelectedVideo(activeSubPlaylist.videos[nextIdx]);
    };

    return (
        <section className="section bg-dark relative overflow-hidden pt-32 pb-24" id="interests">
            <div className="absolute inset-x-0 top-0 h-1/2 overflow-hidden pointer-events-none opacity-40">
                <SectionBackground variant="music" className="h-full" />
            </div>

            <div className="container relative z-10">
                {/* Header with Dynamic Caricatures */}
                <div className="flex flex-col items-center mb-10 text-center relative">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="p-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20">
                            <Music size={18} />
                        </span>
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
                            Creative Arts & Audio Pursuits
                        </span>
                    </div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-title mb-3"
                    >
                        Life <span className="text-primary-light">Beyond Code</span>
                    </motion.h2>
                    <p className="text-text-muted max-w-xl text-xs md:text-sm font-mono">
                        Music, acoustics, and vocal disciplines inspire how I design high-performance architectures, low-latency DSP systems, and intuitive user experiences.
                    </p>

                    {/* Dynamic Instrument Caricature */}
                    <div className="mt-4 lg:mt-0 lg:absolute lg:right-6 lg:-top-16 z-20 flex justify-center pointer-events-none">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeDiscipline.caricature}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="relative pointer-events-auto"
                            >
                                <div className="absolute inset-0 bg-primary/20 blur-[40px] rounded-full transform scale-75" />
                                <motion.img
                                    src={`${import.meta.env.BASE_URL}${activeDiscipline.caricature}`}
                                    alt={activeDiscipline.title}
                                    className="w-32 h-32 md:w-36 md:h-36 lg:w-44 lg:h-44 object-contain drop-shadow-xl relative z-10 rounded-3xl border border-dark bg-dark-card/60 backdrop-blur-sm cursor-grab active:cursor-grabbing hover:scale-105 transition-transform"
                                    animate={{ y: [0, -8, 0], rotate: [2, 0, 2] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Top Category Tabs (Piano Covers, Guitar Sessions, Singing & Vocals, Travel & Expeditions) */}
                <div className="flex flex-wrap items-center justify-center gap-2.5 mb-5">
                    {MUSIC_DISCIPLINES.map((disc) => {
                        const isSelected = disc.id === selectedDisciplineId;
                        return (
                            <button
                                key={disc.id}
                                onClick={() => handleSelectDiscipline(disc)}
                                className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer ${
                                    isSelected
                                        ? "bg-primary text-white shadow-md shadow-primary/30"
                                        : "bg-dark-card border border-dark text-text-muted hover:text-text hover:bg-dark"
                                }`}
                            >
                                {disc.id === "travel" ? <Compass size={14} /> : <Music size={14} />}
                                <span>{disc.title}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Sub-Playlist Series Switcher Tabs */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                    {activeDiscipline.playlists.map((sub) => {
                        const isSelected = sub.id === activeSubPlaylist.id;
                        return (
                            <button
                                key={sub.id}
                                onClick={() => handleSelectSubPlaylist(sub)}
                                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
                                    isSelected
                                        ? "bg-dark-card border border-primary/50 text-primary font-bold shadow-sm"
                                        : "bg-dark border border-dark text-text-muted hover:text-text hover:bg-dark-card"
                                }`}
                            >
                                <Layers size={12} />
                                <span>{sub.name}</span>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                                    isSelected ? "bg-primary/20 text-primary" : "bg-dark-card text-text-muted"
                                }`}>
                                    {sub.badge}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Media Player Card */}
                <div className="w-full max-w-5xl mx-auto bg-dark-card rounded-2xl overflow-hidden shadow-2xl border border-dark font-sans mb-12">
                    <div className="flex flex-col md:flex-row h-[620px] md:h-[520px]">
                        {/* Left Sidebar: Tracks in Current Playlist */}
                        <div className="w-full md:w-1/2 p-5 overflow-y-auto custom-scrollbar bg-dark border-r border-dark flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-4 pb-3 border-b border-dark">
                                    <h3 className="text-sm font-mono font-bold text-text uppercase flex items-center gap-2">
                                        <Music className="text-primary" size={16} />
                                        <span>{activeSubPlaylist.name}</span>
                                    </h3>
                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-dark-card text-text-muted border border-dark">
                                        {activeSubPlaylist.videos.length} Tracks
                                    </span>
                                </div>

                                <div className="space-y-1.5">
                                    {activeSubPlaylist.videos.map((video, idx) => {
                                        const isSelected = selectedVideo.id === video.id;
                                        return (
                                            <div
                                                key={video.id + idx}
                                                onClick={() => setSelectedVideo(video)}
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
                                                    <div className={`text-xs md:text-sm font-medium truncate flex items-center gap-1.5 ${
                                                        isSelected ? "text-primary font-bold" : "text-text"
                                                    }`}>
                                                        <span className="truncate">{video.title}</span>
                                                    </div>
                                                    <div className="text-[11px] text-text-muted truncate font-mono mt-0.5">
                                                        {activeDiscipline.category} · Track {idx + 1}
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
                                <span>{activeSubPlaylist.name}</span>
                                <a
                                    href={`https://www.youtube.com/playlist?list=${activeSubPlaylist.playlistId}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-primary hover:underline font-bold"
                                >
                                    Open Full Playlist →
                                </a>
                            </div>
                        </div>

                        {/* Right: Interactive Video Player with Seekbar */}
                        <div className="w-full md:w-1/2 bg-dark-card p-6 flex flex-col justify-between relative">
                            <YouTubePlayer
                                videoId={selectedVideo.id}
                                title={selectedVideo.title}
                                subtitle={`${activeSubPlaylist.name} · Track ${videoIndex + 1} of ${activeSubPlaylist.videos.length}`}
                                badge={activeDiscipline.title}
                                badgeColor="text-primary bg-primary/10 border-primary/25"
                                onPrev={handlePrev}
                                onNext={handleNext}
                                hasPrev={activeSubPlaylist.videos.length > 1}
                                hasNext={activeSubPlaylist.videos.length > 1}
                                currentIndex={videoIndex + 1}
                                totalCount={activeSubPlaylist.videos.length}
                            />
                        </div>
                    </div>
                </div>

                {/* Bottom Instagram Verified Connector */}
                <div className="p-6 md:p-8 rounded-2xl bg-dark-card border border-dark shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3.5 bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 rounded-2xl text-white shadow-md shrink-0">
                            <Instagram size={28} />
                        </div>
                        <div>
                            <h3 className="text-lg md:text-xl font-bold text-text">
                                Connect on Instagram
                            </h3>
                            <p className="text-xs text-text-muted font-mono mt-0.5">
                                Follow developer stories, live music rehearsals, and creative explorations.
                            </p>
                        </div>
                    </div>
                    <a
                        href="https://www.instagram.com/manu.singh_001/"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-mono text-xs font-semibold hover:opacity-90 transition-all hover:scale-105 shadow-md shadow-pink-500/20"
                    >
                        <Instagram size={15} />
                        <span>@manu.singh_001</span>
                        <ArrowUpRight size={13} />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Interests;
