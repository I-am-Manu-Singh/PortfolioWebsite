import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, MessageCircle } from 'lucide-react';

const NAMESPACE = 'portfolio-manu-singh-v1'; // Unique namespace
const API_URL = 'https://api.countapi.xyz';

// Export helper to log contact clicks from anywhere
export const logContactClick = async () => {
    try {
        await fetch(`${API_URL}/hit/${NAMESPACE}/contacts`);
    } catch (e) {
        console.error("Analytics Error (Contact)", e);
    }
};

const Analytics: React.FC = () => {
    const [views, setViews] = useState<number>(0);
    const [contacts, setContacts] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initStats = async () => {
            try {
                // 1. Hit 'views' endpoint to increment view count
                const viewRes = await fetch(`${API_URL}/hit/${NAMESPACE}/views`);
                const viewData = await viewRes.json();
                setViews(viewData.value || 0);

                // 2. Get 'contacts' count (without incrementing)
                const contactRes = await fetch(`${API_URL}/get/${NAMESPACE}/contacts`);
                const contactData = await contactRes.json();
                setContacts(contactData.value || 0);
            } catch (error) {
                console.warn("Analytics API failed:", error);
            } finally {
                setLoading(false);
            }
        };

        // Initialize counters if they don't exist (First time setup mostly, but good for robustness)
        // For simplicity, we assume they auto-create on 'hit'. 'get' might fail if not exists.
        // We'll just run initStats.
        initStats();
    }, []);

    if (loading) return null; // Or a subtle loading state

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="fixed bottom-4 left-4 z-40 hidden lg:flex flex-col gap-2"
        >
            <div className="glass-card px-3 py-1.5 flex items-center gap-2 text-xs text-text-muted hover:text-white transition-colors border-white/5">
                <Eye size={12} className="text-primary-light" />
                <span>{views.toLocaleString()} Portfolio Views</span>
            </div>
            <div className="glass-card px-3 py-1.5 flex items-center gap-2 text-xs text-text-muted hover:text-white transition-colors border-white/5">
                <MessageCircle size={12} className="text-secondary" />
                <span>{contacts.toLocaleString()} People Contacted</span>
            </div>
        </motion.div>
    );
};

export default Analytics;
