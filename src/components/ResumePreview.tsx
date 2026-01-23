
import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Mail, Phone, MapPin } from 'lucide-react';
import { resumeData } from '../data/resume';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ResumePreviewProps {
    isOpen: boolean;
    onClose: () => void;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ isOpen, onClose }) => {
    const resumeRef = useRef<HTMLDivElement>(null);

    const handleDownload = async () => {
        if (!resumeRef.current) return;

        try {
            const canvas = await html2canvas(resumeRef.current, { scale: 2 });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('Manpreet_Singh_Resume.pdf');
        } catch (err) {
            console.error("Failed to generate PDF", err);
        }
    };

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
                                <button
                                    onClick={handleDownload}
                                    className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-light text-white rounded-lg transition-colors text-sm font-medium"
                                >
                                    <Download size={16} />
                                    Download PDF
                                </button>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/10 rounded-lg text-text-muted hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Resume Content (Scrollable) */}
                        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-900/50">
                            <div
                                ref={resumeRef}
                                className="max-w-[210mm] mx-auto bg-white text-black p-[10mm] shadow-xl min-h-[297mm]"
                                style={{ fontFamily: 'Times New Roman, serif' }}
                            >
                                {/* Resume Header */}
                                <div className="text-center border-b-2 border-gray-800 pb-4 mb-4">
                                    <h1 className="text-3xl font-bold uppercase tracking-wide">{resumeData.basics.name}</h1>
                                    <p className="text-sm mt-1 text-gray-700">{resumeData.basics.label}</p>
                                    <div className="flex justify-center flex-wrap gap-4 mt-2 text-sm text-gray-600">
                                        <span className="flex items-center gap-1"><Mail size={12} /> {resumeData.basics.email}</span>
                                        <span className="flex items-center gap-1"><Phone size={12} /> {resumeData.basics.phone}</span>
                                        <span className="flex items-center gap-1"><MapPin size={12} /> India</span>
                                    </div>
                                    <div className="flex justify-center gap-4 mt-1 text-sm text-blue-700 font-semibold">
                                        {resumeData.basics.profiles.map((p, i) => (
                                            <a key={i} href={p.url} target="_blank" rel="noreferrer" className="hover:underline">
                                                {p.network}
                                            </a>
                                        ))}
                                    </div>
                                </div>

                                {/* Summary */}
                                <div className="mb-4">
                                    <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-2 text-gray-800">Professional Summary</h2>
                                    <p className="text-sm text-gray-700 leading-relaxed text-justify">
                                        {resumeData.basics.summary}
                                    </p>
                                </div>

                                {/* Skills */}
                                <div className="mb-4">
                                    <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-2 text-gray-800">Technical Skills</h2>
                                    <div className="text-sm text-gray-700 grid grid-cols-1 gap-1">
                                        <p><span className="font-bold">Languages:</span> {resumeData.skills.languages.join(", ")}</p>
                                        <p><span className="font-bold">Android:</span> {resumeData.skills.android.join(", ")}</p>
                                        <p><span className="font-bold">React Native:</span> {resumeData.skills.reactNative.join(", ")}</p>
                                        <p><span className="font-bold">Tools & Backend:</span> {resumeData.skills.backendAndTools.join(", ")}</p>
                                    </div>
                                </div>

                                {/* Experience */}
                                <div className="mb-4">
                                    <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-2 text-gray-800">Experience</h2>
                                    <div className="space-y-3">
                                        {resumeData.experience.map((job, i) => (
                                            <div key={i}>
                                                <div className="flex justify-between items-baseline">
                                                    <h3 className="font-bold text-base">{job.position}</h3>
                                                    <span className="text-sm font-semibold text-gray-600">{job.startDate} - {job.endDate}</span>
                                                </div>
                                                <p className="text-sm font-semibold text-gray-800 italic">{job.company}</p>
                                                <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5">
                                                    {job.highlights.map((h, hi) => (
                                                        <li key={hi} className="text-sm text-gray-700 leading-tight">{h}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Education */}
                                <div className="mb-4">
                                    <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-2 text-gray-800">Education</h2>
                                    <div className="space-y-2">
                                        {resumeData.education.map((edu, i) => (
                                            <div key={i} className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-bold text-sm">{edu.institution}</h3>
                                                    <p className="text-sm text-gray-700">{edu.degree}</p>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-sm font-semibold text-gray-600 block">{edu.years}</span>
                                                    <span className="text-xs text-gray-500">GPA: {edu.gpa}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Projects */}
                                <div>
                                    <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-2 text-gray-800">Key Projects</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                                        {resumeData.projects.slice(0, 6).map((proj, i) => (
                                            <div key={i}>
                                                <h3 className="font-bold text-sm">{proj.name}</h3>
                                                <p className="text-xs text-gray-700 leading-tight">{proj.description}</p>
                                                <p className="text-xs text-gray-500 mt-0.5 italic">{proj.tags.slice(0, 3).join(", ")}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ResumePreview;
