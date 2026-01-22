
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ExternalLink, Loader } from 'lucide-react';

interface Article {
    title: string;
    link: string;
    thumbnail: string;
    pubDate: string;
}

const DynamicMedium: React.FC<{ username: string }> = ({ username }) => {
    const [latestArticle, setLatestArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch(
                    `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/${username}`
                );
                const data = await response.json();
                if (data.items && data.items.length > 0) {
                    const article = data.items[0];
                    // Extract first image from content if thumbnail is empty (common in Medium RSS)
                    let thumb = article.thumbnail;
                    if (!thumb) {
                        const imgMatch = article.content.match(/<img[^>]+src="([^">]+)"/);
                        if (imgMatch) thumb = imgMatch[1];
                    }

                    setLatestArticle({
                        title: article.title,
                        link: article.link,
                        thumbnail: thumb || 'https://cdn-images-1.medium.com/max/1200/1*jfdwtvU6V6g99q3G7gq7dQ.png', // Fallback Medium logo
                        pubDate: new Date(article.pubDate).toLocaleDateString()
                    });
                }
            } catch (error) {
                console.error("Error fetching Medium articles:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, [username]);

    if (loading) return <div className="p-4 flex justify-center"><Loader className="animate-spin text-white/50" /></div>;
    if (!latestArticle) return null;

    return (
        <motion.div
            className="glass-card p-6 border border-white/10 bg-white/5 mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <div className="flex items-center gap-2 mb-4 text-white">
                <BookOpen size={24} />
                <h3 className="font-bold text-xl">Latest Publication</h3>
            </div>
            <a href={latestArticle.link} target="_blank" rel="noreferrer" className="group block flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3 relative overflow-hidden rounded-lg aspect-video md:aspect-auto">
                    <img src={latestArticle.thumbnail} alt={latestArticle.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink className="text-white" size={32} />
                    </div>
                </div>
                <div className="md:w-2/3 flex flex-col justify-center">
                    <h4 className="text-xl font-bold text-white group-hover:text-primary transition-colors mb-2">{latestArticle.title}</h4>
                    <p className="text-text-muted text-sm mb-4">Read my latest thoughts and technical breakdowns on Medium.</p>
                    <div className="text-xs text-text-muted/60 font-mono flex items-center gap-2">
                        <span>{latestArticle.pubDate}</span>
                        <span>•</span>
                        <span>Medium</span>
                    </div>
                </div>
            </a>
        </motion.div>
    );
};

export default DynamicMedium;
