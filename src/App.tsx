
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import CodingProfile from './components/CodingProfile';
import Interests from './components/Interests';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import ThemeToggle from './components/ThemeToggle';
import ChatBot from './components/ChatBot';
import FloatingParticles from './components/FloatingParticles';

function App() {
  return (
    <div className="App relative transition-colors duration-300">
      <ThemeToggle />
      <ChatBot />
      <FloatingParticles />
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] bg-dark dark:bg-dark light:bg-gray-50 transition-colors duration-300">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-dark to-dark opacity-50 dark:opacity-50 light:opacity-20"></div>
      </div>

      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <CodingProfile />
      <Interests />
      <Certifications />
      <Contact />
    </div>
  );
}

export default App;
