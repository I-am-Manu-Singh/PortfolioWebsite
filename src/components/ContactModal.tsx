import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, Send, User, MessageSquare, CheckCircle2 } from 'lucide-react';
const logContactClick = () => {};

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        
        try {
            // Web3Forms endpoint: 100% free, sends real instant email notifications to user's personal inbox
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    access_key: 'bdf7c5ae-5f56-42d4-9d57-3aa5a1762e8a', // Verified public key
                    from_name: `${formData.name} (Portfolio Inquiry)`,
                    subject: `New Portfolio Message from ${formData.name}`,
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    to_email: 'manpreetsinghkainth25@gmail.com'
                })
            });

            const result = await response.json();
            if (result.success) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => {
                    setStatus('idle');
                    onClose();
                }, 2500);
                return;
            } else {
                throw new Error(result.message || 'Submission failed');
            }
        } catch (err: any) {
            console.error('Contact form submission error:', err);
            // Fallback: trigger user mailto client directly so lead is never lost
            const subject = `Portfolio Inquiry from ${formData.name}`;
            const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
            window.location.href = `mailto:manpreetsinghkainth25@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            setStatus('success');
            setTimeout(() => {
                setStatus('idle');
                onClose();
            }, 2000);
        }
    };

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
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[99990]"
                    />

                    {/* Modal: Full theme awareness, soft subtle borders */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 15 }}
                        className="fixed inset-0 z-[99995] flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="w-full max-w-md bg-dark-card border border-dark rounded-2xl p-6 md:p-8 shadow-2xl pointer-events-auto max-h-[90vh] overflow-y-auto relative text-text">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 hover:bg-dark rounded-full text-text-muted hover:text-text transition-colors cursor-pointer"
                                aria-label="Close Modal"
                            >
                                <X size={20} />
                            </button>

                            <h2 className="text-2xl font-bold text-text mb-1 font-outfit">Get in Touch</h2>
                            <p className="text-text-muted mb-5 text-xs font-mono">
                                Send a direct inquiry to my personal inbox.
                            </p>

                            {/* Direct Contact Info Card */}
                            <div className="flex flex-col gap-2.5 mb-6 p-4 bg-dark rounded-xl border border-dark">
                                <div className="flex items-center gap-3 text-xs md:text-sm text-text-muted">
                                    <Mail size={16} className="text-primary shrink-0" />
                                    <a 
                                        href="mailto:manpreetsinghkainth25@gmail.com" 
                                        onClick={handleContactClick} 
                                        className="hover:text-primary transition-colors font-mono truncate"
                                    >
                                        manpreetsinghkainth25@gmail.com
                                    </a>
                                </div>
                                <div className="flex items-center gap-3 text-xs md:text-sm text-text-muted">
                                    <Phone size={16} className="text-secondary shrink-0" />
                                    <a 
                                        href="tel:+917340007125" 
                                        onClick={handleContactClick} 
                                        className="hover:text-secondary transition-colors font-mono"
                                    >
                                        +91 7340007125
                                    </a>
                                </div>
                            </div>

                            {status === 'success' ? (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9 }} 
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2"
                                >
                                    <CheckCircle2 size={36} className="text-emerald-500 mx-auto" />
                                    <h3 className="text-base font-bold text-text">Message Delivered!</h3>
                                    <p className="text-xs text-text-muted font-mono">
                                        Thank you for reaching out. I will get back to you shortly.
                                    </p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-mono text-primary font-medium ml-1">Your Name</label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full bg-dark border border-dark rounded-xl py-2.5 pl-10 pr-4 text-xs md:text-sm text-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-mono text-primary font-medium ml-1">Your Email</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                                            <input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full bg-dark border border-dark rounded-xl py-2.5 pl-10 pr-4 text-xs md:text-sm text-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans"
                                                placeholder="you@company.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-mono text-primary font-medium ml-1">Message</label>
                                        <div className="relative">
                                            <MessageSquare className="absolute left-3 top-3 text-text-muted" size={16} />
                                            <textarea
                                                required
                                                rows={4}
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                className="w-full bg-dark border border-dark rounded-xl py-2.5 pl-10 pr-4 text-xs md:text-sm text-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none font-sans"
                                                placeholder="Describe your project, role, or inquiry..."
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={status === 'submitting'}
                                        className="w-full py-3 bg-primary hover:bg-primary-light text-white font-bold rounded-xl shadow-lg shadow-primary/25 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer text-xs md:text-sm font-mono"
                                    >
                                        {status === 'submitting' ? (
                                            <span>Sending Message...</span>
                                        ) : (
                                            <>
                                                <Send size={16} />
                                                <span>Send Message</span>
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ContactModal;
