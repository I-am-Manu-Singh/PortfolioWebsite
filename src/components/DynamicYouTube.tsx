
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Youtube, ExternalLink, Loader } from 'lucide-react';

interface Video {
    title: string;
    link: string;
    thumbnail: string;
    pubDate: string;
}

const DynamicYouTube: React.FC<{ channelId: string; title: string }> = ({ channelId, title }) => {
    const [latestVideo, setLatestVideo] = useState<Video | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch(
                    `https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`
                );
                const data = await response.json();
                if (data.items && data.items.length > 0) {
                    const video = data.items[0];
                    setLatestVideo({
                        title: video.title,
                        link: video.link,
                        thumbnail: `https://i.ytimg.com/vi/${video.guid.split(':')[2]}/maxresdefault.jpg`,
                        pubDate: new Date(video.pubDate).toLocaleDateString()
                    });
                }
            } catch (error) {
                console.error("Error fetching YouTube videos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, [channelId]);

    if (loading) return <div className="p-4 flex justify-center"><Loader className="animate-spin text-primary" /></div>;
    if (!latestVideo) return null;

    return (
        <motion.div
            className="glass-card p-4 border border-red-500/20 bg-red-500/5 mt-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
        >
            <div className="flex items-center gap-2 mb-3 text-red-400">
                <Youtube size={20} />
                <h4 className="font-bold text-sm">{title}: Latest Upload</h4>
            </div>
            <a href={latestVideo.link} target="_blank" rel="noreferrer" className="group block">
                <div className="relative overflow-hidden rounded-lg mb-3 aspect-video">
                    <img src={latestVideo.thumbnail} alt={latestVideo.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink className="text-white" size={32} />
                    </div>
                </div>
                <h5 className="text-white font-medium line-clamp-2 text-sm group-hover:text-primary transition-colors">{latestVideo.title}</h5>
                <p className="text-xs text-text-muted mt-1">{latestVideo.pubDate}</p>
            </a>
        </motion.div>
    );
};

export default DynamicYouTube;
