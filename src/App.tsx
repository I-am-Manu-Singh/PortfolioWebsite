import { useState } from 'react';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import CodingProfile from './components/CodingProfile';
import Certifications from './components/Certifications';
import TechTutorials from './components/TechTutorials';
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
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <Analytics />
      <ChatBot />
      <FloatingParticles />

      {/* Background - Changes based on mode */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-2] bg-dark transition-colors duration-500">
        <div
          className={`absolute top-0 left-0 w-full h-full opacity-80 transition-all duration-1000 ${isPersonal
            ? 'bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-purple-500/40 via-dark/50 to-dark'
            : 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/30 via-dark/50 to-dark'
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
              <Hero />
              <Skills />
              <Experience />
              <CodingProfile />
              <Projects />
              <Certifications />
              <TechTutorials />
            </motion.div>
          ) : (
            <motion.div
              key="personal"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Socials />
              {/* Future: Photo Gallery, Blog, etc. */}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
