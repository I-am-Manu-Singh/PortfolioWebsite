import { RESUME_DRIVE_URL } from '../config/links';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    X, Download, ExternalLink, Briefcase, Code2, FolderGit2, 
    GraduationCap, Globe2, FileText, CheckCircle2, ChevronDown, 
    Printer, FileSpreadsheet, FileCode
} from 'lucide-react';
import { resumesList, type ResumeData } from '../data/resumesData';

interface ResumePreviewProps {
    isOpen: boolean;
    onClose: () => void;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ isOpen, onClose }) => {
    const [selectedResumeId, setSelectedResumeId] = useState<string>('sde');
    const [viewMode, setViewMode] = useState<'interactive' | 'pdf'>('interactive');
    const [isExportMenuOpen, setIsExportMenuOpen] = useState<boolean>(false);

    // Find the currently selected resume dynamically
    const activeResume: ResumeData = resumesList.find(r => r.id === selectedResumeId) || resumesList[0];
    const drivePdfUrl = RESUME_DRIVE_URL;

    // Helper to format text with **bold** into safe JSX
    const renderFormattedText = (text: string) => {
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return (
                    <strong key={index} className="font-bold text-text">
                        {part.slice(2, -2)}
                    </strong>
                );
            }
            return <span key={index}>{part}</span>;
        });
    };

    // 1. Export as PDF (Native window print with print styles)
    const exportAsPDF = () => {
        window.print();
    };

    // 2. Export as Word (.doc) for the CURRENTLY SELECTED RESUME
    const exportAsWord = () => {
        const current = activeResume;
        const headerHtml = `
            <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
            <head><meta charset='utf-8'><title>${current.title} - Manpreet Singh Resume</title>
            <style>
                body { font-family: 'Calibri', 'Arial', sans-serif; line-height: 1.4; color: #111; }
                h1 { font-size: 20pt; text-align: center; color: #0056b3; margin-bottom: 2pt; }
                .subtitle { text-align: center; font-size: 10pt; color: #555; margin-bottom: 15pt; }
                h2 { font-size: 13pt; border-bottom: 1.5pt solid #0056b3; color: #0056b3; margin-top: 14pt; margin-bottom: 6pt; }
                h3 { font-size: 11pt; margin-bottom: 2pt; color: #111; }
                p, li { font-size: 10pt; }
                ul { margin-top: 4pt; margin-bottom: 8pt; padding-left: 20pt; }
                .company { color: #555; font-style: italic; }
                .period { float: right; font-weight: bold; }
                .clear { clear: both; }
            </style>
            </head><body>
            <h1>MANPREET SINGH</h1>
            <div class='subtitle'>
                manpreetsinghkainth25@gmail.com | +91 7340007125 | linkedin.com/in/manpreet-singh001 | github.com/I-am-Manu-Singh | leetcode.com/u/manu_singh
            </div>
            <h2>SUMMARY</h2>
            <p>${current.summary.replace(/\*\*/g, '')}</p>
            <h2>TECHNICAL SKILLS</h2>
            <ul>
                ${current.skills.map(s => `<li><b>${s.category}:</b> ${s.items.replace(/\*\*/g, '')}</li>`).join('')}
            </ul>
            <h2>PROFESSIONAL EXPERIENCE</h2>
            ${current.experiences.map(e => `
                <div>
                    <span class='period'>${e.period}</span>
                    <h3>${e.role} — <span class='company'>${e.company}</span></h3>
                    <div class='clear'></div>
                    <ul>
                        ${e.highlights.map(h => `<li>${h.replace(/\*\*/g, '')}</li>`).join('')}
                    </ul>
                </div>
            `).join('')}
            <h2>KEY TECHNICAL PROJECTS</h2>
            ${current.projects.map(p => `
                <div>
                    <h3>${p.name}</h3>
                    <ul>
                        ${p.highlights.map(h => `<li>${h.replace(/\*\*/g, '')}</li>`).join('')}
                    </ul>
                </div>
            `).join('')}
            <h2>EDUCATION</h2>
            <p><b>MCA</b> — Shri Khushal Das University (CGPA: 8.1)</p>
            <p><b>BCA</b> — Kalinga University (CGPA: 7.5)</p>
            <h2>LANGUAGES</h2>
            <p>English (Fluent), Hindi (Native), Punjabi (Native)</p>
            </body></html>
        `;

        const blob = new Blob(['\ufeff', headerHtml], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Manpreet_Singh_${current.id.toUpperCase()}_Resume.doc`;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
    };

    // 3. Export as CSV for the CURRENTLY SELECTED RESUME
    const exportAsCSV = () => {
        const current = activeResume;
        const rows: string[][] = [
            ['Section', 'Category / Role', 'Detail / Highlights'],
            ['Basics', 'Name', 'Manpreet Singh'],
            ['Basics', 'Email', 'manpreetsinghkainth25@gmail.com'],
            ['Basics', 'Phone', '+91 7340007125'],
            ['Basics', 'Profile Track', current.title],
            ['Summary', 'Overview', `"${current.summary.replace(/"/g, '""').replace(/\*\*/g, '')}"`],
        ];

        current.skills.forEach(s => {
            rows.push(['Skills', s.category, `"${s.items.replace(/"/g, '""').replace(/\*\*/g, '')}"`]);
        });

        current.experiences.forEach(e => {
            rows.push(['Experience', `${e.role} at ${e.company} (${e.period})`, `"${e.highlights.join(' | ').replace(/"/g, '""').replace(/\*\*/g, '')}"`]);
        });

        current.projects.forEach(p => {
            rows.push(['Project', p.name, `"${p.highlights.join(' | ').replace(/"/g, '""').replace(/\*\*/g, '')}"`]);
        });

        rows.push(['Education', 'MCA', 'Shri Khushal Das University (CGPA: 8.1)']);
        rows.push(['Education', 'BCA', 'Kalinga University (CGPA: 7.5)']);

        const csvContent = rows.map(r => r.join(',')).join('\r\n');
        const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Manpreet_Singh_${current.id}_Resume.csv`;
        document.body.appendChild(link);
        link.click();
        setTimeout(() => {
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }, 100);
    };

    // 4. Export as JSON for the CURRENTLY SELECTED RESUME
    const exportAsJSON = () => {
        const current = activeResume;
        const blob = new Blob([JSON.stringify(current, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Manpreet_Singh_${current.id}_Resume.json`;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
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
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[99990] print:hidden"
                    />

                    {/* Modal Dialog with z-[99999] so it floats above top navbar */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98, y: 15 }}
                        className="fixed inset-2 md:inset-6 lg:inset-8 bg-dark-card border border-white/15 rounded-2xl shadow-2xl z-[99999] flex flex-col overflow-hidden text-text print:static print:inset-0 print:border-0 print:bg-white print:text-black"
                    >
                        {/* Header Bar */}
                        <div className="flex flex-wrap items-center justify-between p-4 md:px-6 border-b border-dark bg-dark-card gap-3 print:hidden">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-xl bg-primary/15 text-primary border border-primary/25">
                                    <FileText size={20} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h2 className="text-lg md:text-xl font-bold text-text font-outfit">
                                            Interactive ATS Resumes
                                        </h2>
                                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-semibold">
                                            7 Domain Profiles
                                        </span>
                                    </div>
                                    <p className="text-xs text-text-muted font-mono hidden sm:block">
                                        Tailored specifically for SDE, Mobile, Full-Stack, Backend, & AI/ML
                                    </p>
                                </div>
                            </div>

                            {/* View Switcher & Export Menu */}
                            <div className="flex items-center gap-2">
                                <div className="flex rounded-lg bg-dark border border-dark p-0.5 text-xs font-mono">
                                    <button
                                        onClick={() => setViewMode('interactive')}
                                        className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                                            viewMode === 'interactive' 
                                                ? 'bg-primary text-white shadow font-semibold' 
                                                : 'text-text-muted hover:text-text'
                                        }`}
                                    >
                                        Live Interactive
                                    </button>
                                    <button
                                        onClick={() => setViewMode('pdf')}
                                        className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                                            viewMode === 'pdf' 
                                                ? 'bg-primary text-white shadow font-semibold' 
                                                : 'text-text-muted hover:text-text'
                                        }`}
                                    >
                                        PDF View
                                    </button>
                                </div>

                                {/* Save / Export Dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
                                        className="flex items-center gap-1.5 px-3.5 py-1.5 bg-primary hover:bg-primary-light text-white rounded-lg transition-colors text-xs font-mono font-medium shadow-md shadow-primary/20 cursor-pointer"
                                    >
                                        <Download size={14} />
                                        <span>Save / Export</span>
                                        <ChevronDown size={14} className={`transition-transform ${isExportMenuOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {isExportMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-56 bg-dark-card border border-white/20 rounded-xl shadow-2xl py-2 z-[100000] ring-1 ring-black/10">
                                            <div className="px-3.5 py-1 text-[10px] font-mono uppercase text-text-muted border-b border-dark mb-1">
                                                Export: {activeResume.title}
                                            </div>
                                            <button
                                                onClick={() => { exportAsPDF(); setIsExportMenuOpen(false); }}
                                                className="w-full px-3.5 py-2 text-left text-xs font-mono text-text hover:bg-dark flex items-center gap-2.5 transition-colors cursor-pointer"
                                            >
                                                <Printer size={14} className="text-primary" />
                                                <span>Print / Save as PDF</span>
                                            </button>
                                            <button
                                                onClick={() => { exportAsWord(); setIsExportMenuOpen(false); }}
                                                className="w-full px-3.5 py-2 text-left text-xs font-mono text-text hover:bg-dark flex items-center gap-2.5 transition-colors cursor-pointer"
                                            >
                                                <FileText size={14} className="text-blue-500" />
                                                <span>Save as Word (.doc)</span>
                                            </button>
                                            <button
                                                onClick={() => { exportAsCSV(); setIsExportMenuOpen(false); }}
                                                className="w-full px-3.5 py-2 text-left text-xs font-mono text-text hover:bg-dark flex items-center gap-2.5 transition-colors cursor-pointer"
                                            >
                                                <FileSpreadsheet size={14} className="text-emerald-500" />
                                                <span>Export as CSV</span>
                                            </button>
                                            <button
                                                onClick={() => { exportAsJSON(); setIsExportMenuOpen(false); }}
                                                className="w-full px-3.5 py-2 text-left text-xs font-mono text-text hover:bg-dark flex items-center gap-2.5 transition-colors cursor-pointer"
                                            >
                                                <FileCode size={14} className="text-amber-500" />
                                                <span>Export as JSON</span>
                                            </button>
                                            <div className="my-1 border-t border-dark" />
                                            <a
                                                href={drivePdfUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                onClick={() => setIsExportMenuOpen(false)}
                                                className="w-full px-3.5 py-2 text-left text-xs font-mono text-text hover:bg-dark flex items-center gap-2.5 transition-colors"
                                            >
                                                <ExternalLink size={14} className="text-secondary" />
                                                <span>Open Google Drive PDF</span>
                                            </a>
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={onClose}
                                    className="p-1.5 rounded-lg text-text-muted hover:text-text hover:bg-dark transition-colors cursor-pointer"
                                    aria-label="Close Preview"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Domain Tracks Tab Bar */}
                        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-dark border-b border-dark overflow-x-auto no-scrollbar print:hidden">
                            {resumesList.map((res) => {
                                const isSelected = res.id === selectedResumeId;
                                return (
                                    <button
                                        key={res.id}
                                        onClick={() => setSelectedResumeId(res.id)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                                            isSelected
                                                ? 'bg-primary text-white shadow-md shadow-primary/25 font-semibold'
                                                : 'text-text-muted hover:text-text hover:bg-dark-card'
                                        }`}
                                    >
                                        {isSelected && <CheckCircle2 size={12} />}
                                        <span>{res.title}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Modal Body / Viewer */}
                        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-dark custom-scrollbar print:p-0 print:overflow-visible">
                            {viewMode === 'pdf' ? (
                                <div className="w-full h-full min-h-[600px] rounded-2xl overflow-hidden border border-white/10 bg-dark-card flex flex-col">
                                    <div className="p-3 bg-dark border-b border-dark flex items-center justify-between text-xs font-mono text-text-muted">
                                        <span>Google Drive PDF Viewer: {activeResume.title}</span>
                                        <a
                                            href={drivePdfUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-primary hover:underline flex items-center gap-1"
                                        >
                                            <span>Open in New Tab</span>
                                            <ExternalLink size={12} />
                                        </a>
                                    </div>
                                    <iframe
                                        src={drivePdfUrl.replace('/view?usp=sharing', '/preview').replace('/view?usp=drive_link', '/preview')}
                                        title={`${activeResume.title} PDF`}
                                        className="w-full flex-1 border-0"
                                        allow="autoplay"
                                    />
                                </div>
                            ) : (
                                <div className="max-w-4xl mx-auto bg-dark-card border border-white/10 rounded-2xl p-6 md:p-10 shadow-xl space-y-8 print:border-0 print:shadow-none print:p-0 print:text-black print:bg-white">
                                    {/* Resume Header */}
                                    <div className="text-center pb-6 border-b border-dark space-y-2 print:border-black">
                                        <h1 className="text-3xl md:text-4xl font-extrabold text-text font-outfit tracking-wide print:text-black">
                                            MANPREET SINGH
                                        </h1>
                                        <p className="text-primary font-mono text-xs md:text-sm font-semibold tracking-wider uppercase">
                                            {activeResume.title.toUpperCase()}
                                        </p>
                                        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1.5 text-xs font-mono text-text-muted pt-1 print:text-black">
                                            <a href="mailto:manpreetsinghkainth25@gmail.com" className="hover:text-primary transition-colors">
                                                manpreetsinghkainth25@gmail.com
                                            </a>
                                            <span>•</span>
                                            <span>+91 7340007125</span>
                                            <span>•</span>
                                            <a href="https://www.linkedin.com/in/manpreet-singh001" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                                                LinkedIn
                                            </a>
                                            <span>•</span>
                                            <a href="https://github.com/I-am-Manu-Singh" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                                                GitHub
                                            </a>
                                            <span>•</span>
                                            <a href="https://leetcode.com/u/manu_singh" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                                                LeetCode (250+)
                                            </a>
                                        </div>
                                    </div>

                                    {/* Summary */}
                                    <div className="space-y-2.5">
                                        <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-primary flex items-center gap-2">
                                            <Code2 size={16} /> Professional Summary
                                        </h3>
                                        <p className="text-xs md:text-sm text-text-muted leading-relaxed print:text-black">
                                            {renderFormattedText(activeResume.summary)}
                                        </p>
                                    </div>

                                    {/* Skills Matrix */}
                                    <div className="space-y-3">
                                        <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-primary flex items-center gap-2">
                                            <Code2 size={16} /> Technical Skills Matrix
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {activeResume.skills.map((s, idx) => (
                                                <div key={idx} className="p-3.5 rounded-xl bg-dark border border-dark space-y-1 print:border-0 print:p-0">
                                                    <div className="text-xs font-mono font-bold text-text">
                                                        {s.category}
                                                    </div>
                                                    <div className="text-xs text-text-muted leading-relaxed font-mono">
                                                        {renderFormattedText(s.items)}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Experience */}
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-primary flex items-center gap-2">
                                            <Briefcase size={16} /> Professional Experience
                                        </h3>
                                        <div className="space-y-5">
                                            {activeResume.experiences.map((exp, idx) => (
                                                <div key={idx} className="p-5 rounded-2xl bg-dark border border-dark hover:border-primary/40 transition-colors space-y-3 print:border-0 print:p-0">
                                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                                        <div>
                                                            <h4 className="text-base font-bold text-text font-outfit print:text-black">
                                                                {exp.role}
                                                            </h4>
                                                            <div className="text-xs font-mono text-secondary font-medium">
                                                                {exp.company}
                                                            </div>
                                                        </div>
                                                        <span className="text-xs font-mono text-text-muted bg-dark-card px-2.5 py-1 rounded-md self-start sm:self-auto border border-dark print:bg-transparent print:p-0">
                                                            {exp.period}
                                                        </span>
                                                    </div>

                                                    {/* App Store Links */}
                                                    {(exp.playStore || exp.appStore) && (
                                                        <div className="flex flex-wrap items-center gap-2 pt-1 print:hidden">
                                                            {exp.playStore && (
                                                                <a
                                                                    href={exp.playStore}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-300 text-xs font-mono hover:bg-emerald-500/25 transition-colors"
                                                                >
                                                                    <ExternalLink size={12} /> Play Store App
                                                                </a>
                                                            )}
                                                            {exp.appStore && (
                                                                <a
                                                                    href={exp.appStore}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-500/15 border border-blue-500/30 text-blue-600 dark:text-blue-300 text-xs font-mono hover:bg-blue-500/25 transition-colors"
                                                                >
                                                                    <ExternalLink size={12} /> iOS App Store
                                                                </a>
                                                            )}
                                                        </div>
                                                    )}

                                                    <ul className="space-y-1.5 text-xs md:text-sm text-text-muted list-disc list-inside print:text-black">
                                                        {exp.highlights.map((hl, hIdx) => (
                                                            <li key={hIdx} className="leading-relaxed">
                                                                {renderFormattedText(hl)}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Domain Projects */}
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-primary flex items-center gap-2">
                                            <FolderGit2 size={16} /> Key Technical Projects
                                        </h3>
                                        <div className="space-y-4">
                                            {activeResume.projects.map((proj, idx) => (
                                                <div key={idx} className="p-5 rounded-2xl bg-dark border border-dark hover:border-primary/40 transition-colors space-y-2.5 print:border-0 print:p-0">
                                                    <div className="flex items-center justify-between gap-3">
                                                        <h4 className="text-base font-bold text-text font-outfit print:text-black">
                                                            {proj.name}
                                                        </h4>
                                                        {proj.repo && (
                                                            <a
                                                                href={proj.repo}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-dark-card border border-dark text-primary hover:text-white hover:bg-primary text-xs font-mono transition-colors print:hidden"
                                                            >
                                                                <span>Repository</span>
                                                                <ExternalLink size={12} />
                                                            </a>
                                                        )}
                                                    </div>
                                                    <ul className="space-y-1 text-xs md:text-sm text-text-muted list-disc list-inside print:text-black">
                                                        {proj.highlights.map((ph, pIdx) => (
                                                            <li key={pIdx} className="leading-relaxed">
                                                                {renderFormattedText(ph)}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Education & Languages */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-dark print:border-black">
                                        <div className="p-4 rounded-xl bg-dark border border-dark space-y-2 print:border-0 print:p-0">
                                            <h4 className="text-xs font-mono font-bold text-primary uppercase tracking-wider flex items-center gap-2">
                                                <GraduationCap size={15} /> Education
                                            </h4>
                                            <div className="text-xs space-y-1 text-text-muted print:text-black">
                                                <p className="font-semibold text-text print:text-black">MCA — Shri Khushal Das University (CGPA: 8.1)</p>
                                                <p className="font-semibold text-text print:text-black">BCA — Kalinga University (CGPA: 7.5)</p>
                                            </div>
                                        </div>

                                        <div className="p-4 rounded-xl bg-dark border border-dark space-y-2 print:border-0 print:p-0">
                                            <h4 className="text-xs font-mono font-bold text-primary uppercase tracking-wider flex items-center gap-2">
                                                <Globe2 size={15} /> Languages
                                            </h4>
                                            <p className="text-xs text-text-muted print:text-black">
                                                <strong className="text-text print:text-black">English</strong> (Fluent), <strong className="text-text print:text-black">Hindi</strong> (Native), <strong className="text-text print:text-black">Punjabi</strong> (Native)
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ResumePreview;
