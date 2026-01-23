
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, X, Send, Phone, User, MessageSquare } from 'lucide-react';
import { logContactClick } from './Analytics';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Construct mailto link
        const subject = `Portfolio Contact from ${formData.name}`;
        const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
        window.location.href = `mailto:manpreetsinghkainth25@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        onClose();
    };

    // Helper wrapper for contact click
    const handleContactClick = () => {
        logContactClick();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="w-full max-w-md bg-dark-card border border-white/10 p-8 rounded-2xl shadow-2xl pointer-events-auto max-h-[90vh] overflow-y-auto relative">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 hover:bg-white/5 rounded-full text-text-muted hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <h2 className="text-2xl font-bold text-white mb-2">Get in Touch</h2>
                            <p className="text-text-muted mb-4 text-sm">Have a question or want to work together?</p>

                            {/* Direct Contact Info */}
                            <div className="flex flex-col gap-2 mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
                                <div className="flex items-center gap-3 text-sm text-text-muted">
                                    <Mail size={16} className="text-primary" />
                                    <a href="mailto:manpreetsinghkainth25@gmail.com" onClick={handleContactClick} className="hover:text-white transition-colors">manpreetsinghkainth25@gmail.com</a>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-text-muted">
                                    <Phone size={16} className="text-secondary" />
                                    <a href="tel:+917340007125" onClick={handleContactClick} className="hover:text-white transition-colors">+91 7340007125</a>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-mono text-primary-light ml-1">Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                            placeholder="Your Name"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-mono text-primary-light ml-1">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-mono text-primary-light ml-1">Message</label>
                                    <div className="relative">
                                        <MessageSquare className="absolute left-3 top-3 text-text-muted" size={16} />
                                        <textarea
                                            required
                                            rows={4}
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                                            placeholder="How can I help you?"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-3 bg-primary hover:bg-primary-light text-white font-bold rounded-lg shadow-lg shadow-primary/25 flex items-center justify-center gap-2 transition-all active:scale-95"
                                >
                                    <Send size={18} />
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ContactModal;
