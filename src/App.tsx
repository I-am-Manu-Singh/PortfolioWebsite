import { useState } from 'react';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import CodingProfile from './components/CodingProfile';
import Certifications from './components/Certifications';
import TechTutorials from './components/TechTutorials';
import Testimonials from './components/Testimonials';
import FeaturedContent from './components/FeaturedContent';
import Socials from './components/Socials';
import Analytics from './components/Analytics';
import ChatBot from './components/ChatBot';
import FloatingParticles from './components/FloatingParticles';
import Navbar from './components/Navbar';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [activeTab, setActiveTab] = useState<'work' | 'personal'>('work');

  // Dynamic Background/Theme based on Active Tab
  const isPersonal = activeTab === 'personal';

  return (
    <div className={`App relative transition-colors duration-500 min-h-screen ${isPersonal ? 'theme-personal' : 'theme-work'}`}>
      <Navbar />
      <Analytics />
      <ChatBot />
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        {/* Layer 1: Particles */}
        <FloatingParticles />

        {/* Layer 2: Gradient Overlay (with transparency) */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 z-[-1] opacity-70 ${isPersonal
            ? 'bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-purple-500/30 via-transparent to-transparent'
            : 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent'
            }`}
        ></div>
      </div>

      <main className="pt-20"> {/* Padding for fixed navbar */}
        <AnimatePresence mode="wait">
          {activeTab === 'work' ? (
            <motion.div
              key="work"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Hero setActiveTab={setActiveTab} />
              <Skills />
              <Experience />
              <CodingProfile />
              <Projects />
              <Certifications />
              <FeaturedContent />
              <TechTutorials />
              <Testimonials />
            </motion.div>
          ) : (
            <motion.div
              key="personal"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Socials onBack={() => setActiveTab('work')} />
              {/* Future: Photo Gallery, Blog, etc. */}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
