import { useState } from 'react';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import CodingProfile from './components/CodingProfile';
import Interests from './components/Interests';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import ChatBot from './components/ChatBot';
import FloatingParticles from './components/FloatingParticles';
import Navbar from './components/Navbar';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [activeTab, setActiveTab] = useState<'work' | 'personal'>('work');

  return (
    <div className="App relative transition-colors duration-300 min-h-screen">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <ChatBot />
      <FloatingParticles />

      {/* Background */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-2] bg-dark dark:bg-dark light:bg-gray-50 transition-colors duration-300">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-dark to-dark opacity-50"></div>
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
              <Projects />
              <CodingProfile />
              <Certifications />
              <Contact />
            </motion.div>
          ) : (
            <motion.div
              key="personal"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Interests />
              {/* Future: Photo Gallery, Blog, etc. */}
              <Contact />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
