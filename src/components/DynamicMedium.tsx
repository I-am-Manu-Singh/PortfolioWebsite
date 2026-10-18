import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader, Calendar, ArrowUpRight } from 'lucide-react';
import MediumIcon from './MediumIcon';

interface Article {
    title: string;
    link: string;
    thumbnail: string;
    pubDate: string;
    categories: string[];
    description: string;
}

const DynamicMedium: React.FC<{ username: string }> = ({ username }) => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch(
                    `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/${username}`
                );
                const data = await response.json();
                if (data.items && data.items.length > 0) {
                    const parsedArticles: Article[] = data.items.map((item: any) => {
                        let thumb = item.thumbnail;
                        if (!thumb) {
                            const imgMatch = item.content?.match(/<img[^>]+src="([^">]+)"/) || item.description?.match(/<img[^>]+src="([^">]+)"/);
                            if (imgMatch) thumb = imgMatch[1];
                        }

                        // Clean text preview
                        let cleanSnippet = (item.description || item.content || '')
                            .replace(/<[^>]*>/g, ' ')
                            .replace(/\s+/g, ' ')
                            .trim();
                        if (cleanSnippet.length > 130) {
                            cleanSnippet = cleanSnippet.slice(0, 130) + '...';
                        }

                        return {
                            title: item.title,
                            link: item.link,
                            thumbnail: thumb || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
                            pubDate: new Date(item.pubDate).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                            }),
                            categories: Array.isArray(item.categories) ? item.categories.slice(0, 3) : [],
                            description: cleanSnippet
                        };
                    });

                    setArticles(parsedArticles);
                }
            } catch (error) {
                console.error("Error fetching Medium articles:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, [username]);

    if (loading) {
        return (
            <div className="p-12 flex flex-col items-center justify-center gap-3">
                <Loader className="animate-spin text-primary" size={28} />
                <span className="text-xs font-mono text-text-muted">Fetching live articles from Medium...</span>
            </div>
        );
    }

    if (articles.length === 0) {
        return (
            <div className="p-8 text-center text-text-muted text-sm font-mono bg-dark-card rounded-2xl border border-dark">
                No articles found or feed currently unavailable.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-black text-white border border-white/10 flex items-center justify-center">
                        <MediumIcon size={18} />
                    </span>
                    <h3 className="text-base md:text-lg font-bold text-text font-outfit">
                        Published Articles ({articles.length})
                    </h3>
                </div>
                <span className="text-xs font-mono text-text-muted flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Live RSS
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {articles.map((article, index) => (
                    <motion.a
                        key={article.link || index}
                        href={article.link}
                        target="_blank"
                        rel="noreferrer"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group flex flex-col rounded-2xl bg-dark-card border border-dark hover:border-primary/40 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                    >
                        {/* Article Thumbnail */}
                        <div className="relative aspect-video w-full overflow-hidden bg-black/40">
                            <img
                                src={article.thumbnail}
                                alt={article.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent opacity-60" />
                            <div className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-black/70 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                <ArrowUpRight size={14} />
                            </div>
                        </div>

                        {/* Article Content */}
                        <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-[11px] font-mono text-text-muted">
                                    <Calendar size={12} />
                                    <span>{article.pubDate}</span>
                                </div>
                                <h4 className="text-sm font-bold text-text group-hover:text-primary transition-colors line-clamp-2 leading-snug font-outfit">
                                    {article.title}
                                </h4>
                                {article.description && (
                                    <p className="text-xs text-text-muted line-clamp-2 leading-relaxed">
                                        {article.description}
                                    </p>
                                )}
                            </div>

                            {/* Tags */}
                            {article.categories.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-dark/60">
                                    {article.categories.map((cat, idx) => (
                                        <span
                                            key={idx}
                                            className="px-2 py-0.5 rounded-md bg-white/5 border border-dark text-[10px] font-mono text-text-muted capitalize"
                                        >
                                            #{cat}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.a>
                ))}
            </div>
        </div>
    );
};

export default DynamicMedium;
