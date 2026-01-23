
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download } from 'lucide-react';

interface ResumePreviewProps {
    isOpen: boolean;
    onClose: () => void;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ isOpen, onClose }) => {
    // Google Drive Preview Link
    const resumeUrl = "https://drive.google.com/file/d/1IlMIoxqCKINQq44ONK8rVXVBesvckNpM/preview";

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[80]"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed inset-4 md:inset-10 bg-dark-card border border-white/10 rounded-2xl shadow-2xl z-[90] flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-dark/50">
                            <h2 className="text-xl font-bold text-white">Resume Preview</h2>
                            <div className="flex gap-2">
                                <a
                                    href="https://drive.google.com/file/d/1IlMIoxqCKINQq44ONK8rVXVBesvckNpM/view?usp=sharing"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-light text-white rounded-lg transition-colors text-sm font-medium"
                                >
                                    <Download size={16} />
                                    Download PDF
                                </a>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/10 rounded-lg text-text-muted hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Iframe Content */}
                        <div className="flex-1 w-full h-full bg-gray-900">
                            <iframe
                                src={resumeUrl}
                                className="w-full h-full border-0"
                                title="Resume Preview"
                                allow="autoplay"
                            ></iframe>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ResumePreview;
