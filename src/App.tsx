
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <div className="App relative">
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] bg-dark">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-dark to-dark opacity-50"></div>
      </div>

      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;
