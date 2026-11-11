import { useState } from 'react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import CommandPalette from './components/CommandPalette';
import Cursor from './components/Cursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Facts from './components/Facts';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Recognition from './components/Recognition';
import Beyond from './components/Beyond';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  useSmoothScroll();
  const [paletteOpen, setPaletteOpen] = useState(false);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Cursor />
      <Nav onOpenPalette={() => setPaletteOpen(true)} />
      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} />
      <main id="main">
        <Hero />
        <Facts />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Recognition />
        <Beyond />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
