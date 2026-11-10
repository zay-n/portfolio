import { useEffect } from 'react';
import Lenis from 'lenis';
import { prefersReducedMotion } from './motion';

let lenis: Lenis | null = null;

/** Lock / unlock page scroll (used by the mobile menu). */
export function setScrollLocked(locked: boolean) {
  document.documentElement.classList.toggle('is-locked', locked);
  if (locked) lenis?.stop();
  else lenis?.start();
}

/** Smooth scrolling with anchor support. Falls back to native scrolling for reduced motion. */
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    lenis = new Lenis({ autoRaf: true, anchors: true, lerp: 0.11 });
    return () => {
      lenis?.destroy();
      lenis = null;
    };
  }, []);
}
