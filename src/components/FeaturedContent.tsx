import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Briefcase, Linkedin, BookOpen, ExternalLink, ArrowUpRight, 
    Sparkles
} from 'lucide-react';
import DynamicMedium from './DynamicMedium';
import SectionBackground from './SectionBackground';

const FeaturedContent: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'articles' | 'dynamic' | 'linkedin'>('articles');


    return (
        <section className="section bg-dark relative overflow-hidden" id="featured">
            <SectionBackground variant="writing" />
            <div className="container relative z-10">
                {/* Header with Caricature */}
                <div className="flex flex-col items-center mb-10 text-center relative">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="p-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20">
                            <BookOpen size={18} />
                        </span>
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
                            Knowledge Sharing & Publications
                        </span>
                    </div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-title mb-3"
                    >
                        Featured <span className="text-primary-light">Insights</span>
                    </motion.h2>
                    <p className="text-text-muted max-w-xl text-xs md:text-sm font-mono">
                        Technical essays, architectural whitepapers, and problem-solving breakdowns published across Medium and LinkedIn.
                    </p>

                    {/* Publications Caricature */}
                    <div className="absolute right-0 -top-6 lg:right-6 lg:-top-14 z-0 hidden lg:block pointer-events-none">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-primary/20 blur-[50px] rounded-full transform scale-75" />
                            <motion.img
                                src={`${import.meta.env.BASE_URL}caricature_publications.png`}
                                alt="Publications"
                                className="w-36 h-36 lg:w-44 lg:h-44 object-contain drop-shadow-xl relative z-10 pointer-events-auto rounded-3xl border border-dark bg-white/5 backdrop-blur-sm"
                                animate={{ y: [0, -8, 0], rotate: [-2, 0, -2] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </motion.div>
                    </div>

                    {/* View Switcher Tabs: subtle border */}
                    <div className="flex items-center gap-1.5 p-1.5 bg-dark-card border border-dark rounded-2xl mt-6 shadow-sm">
                        <button
                            onClick={() => setActiveTab('dynamic')}
                            className={`px-4 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                                activeTab === 'dynamic'
                                    ? 'bg-primary text-white shadow font-semibold'
                                    : 'text-text-muted hover:text-text hover:bg-dark'
                            }`}
                        >
                            <Sparkles size={13} />
                            <span>Live Medium Feed</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('linkedin')}
                            className={`px-4 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                                activeTab === 'linkedin'
                                    ? 'bg-primary text-white shadow font-semibold'
                                    : 'text-text-muted hover:text-text hover:bg-dark'
                            }`}
                        >
                            <Briefcase size={13} />
                            <span>LinkedIn Connect</span>
                        </button>
                    </div>
                </div>

               

                {/* Tab 1: Live Medium RSS Integration */}
                {activeTab === 'dynamic' && (
                    <div className="max-w-3xl mx-auto space-y-6">
                        <DynamicMedium username="@manu-singh" />
                        <div className="text-center pt-4">
                            <a
                                href="https://medium.com/@manu-singh"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-dark-card border border-dark text-text hover:bg-dark font-mono text-xs font-semibold transition-all shadow-sm"
                            >
                                <BookOpen size={14} className="text-primary" />
                                <span>Browse All Medium Articles (@manu-singh)</span>
                                <ExternalLink size={12} />
                            </a>
                        </div>
                    </div>
                )}
{/* Tab 2: Verified LinkedIn Milestones */}
{activeTab === 'linkedin' && (
  <div className="max-w-md mx-auto">
    <div className="p-6 rounded-2xl bg-dark-card border border-dark shadow-xl space-y-6 flex flex-col justify-between">
      
      {/* Icon and Header */}
      <div className="flex items-center gap-4">
        <span className="p-3 bg-[#0077b5] text-white rounded-xl shadow-md">
          <Linkedin size={24} />
        </span>
        <div>
          <h4 className="text-lg font-bold text-text font-outfit">
            Connect on LinkedIn
          </h4>
          <p className="text-xs font-mono text-text-muted">
            @manpreet-singh001
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <a 
          href="https://www.linkedin.com/in/manpreet-singh001/recent-activity/all/" 
          target="_blank" 
          rel="noreferrer" 
          className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-mono font-bold text-text-muted bg-white/5 border border-dark rounded-xl hover:bg-white/10 transition-colors"
        >
          <span>See Post</span>
          <ArrowUpRight size={14} />
        </a>
        
        <a 
          href="https://www.linkedin.com/in/manpreet-singh001/" 
          target="_blank" 
          rel="noreferrer" 
          className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-mono font-bold text-white bg-[#0077b5] border border-[#0077b5]/20 rounded-xl hover:bg-[#006297] transition-colors shadow-md shadow-[#0077b5]/10"
        >
          <span>Connect</span>
          <ArrowUpRight size={14} />
        </a>
      </div>

    </div>
  </div>
)}
            </div>
        </section>
    );
};

export default FeaturedContent;
