import { useEffect, useRef, useState } from 'react';
import { navItems, profile, resumeHref } from '../data/profile';
import { setScrollLocked } from '../hooks/useSmoothScroll';
import { Download } from './Icons';
import '../styles/nav.css';

export default function Nav() {
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const bar = useRef<HTMLDivElement>(null);

  // Highlight the section currently crossing the middle of the viewport.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    const hero = document.getElementById('top');
    if (hero) io.observe(hero);
    for (const { id } of navItems) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, []);

  // Reading-progress line and solid background after the first scroll.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      bar.current?.style.setProperty('transform', `scaleX(${p.toFixed(4)})`);
      setScrolled(window.scrollY > 24);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    setScrollLocked(open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="nav__inner container">
        <a className="nav__brand" href="#top" aria-label={`${profile.name} — back to top`} onClick={() => setOpen(false)}>
          <span className="nav__mark" aria-hidden="true" />
          {profile.shortName}
        </a>

        <nav className="nav__links" aria-label="Primary">
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`} aria-current={active === item.id ? 'true' : undefined}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="nav__resume" href={resumeHref} download>
          Resume <Download width={14} height={14} />
        </a>

        <button
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>
      <div className="nav__progress" ref={bar} aria-hidden="true" />

      <div className="menu" id="mobile-menu" inert={!open}>
        <nav className="menu__links container" aria-label="Mobile">
          {navItems.map((item, i) => (
            <a key={item.id} href={`#${item.id}`} onClick={() => setOpen(false)} style={{ transitionDelay: `${60 + i * 45}ms` }}>
              <span>0{i + 1}</span>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="menu__foot container">
          <a href={resumeHref} download>
            Download resume
          </a>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </div>
      </div>
    </header>
  );
}
