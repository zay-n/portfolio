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

/** Scroll to a section by id. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  // Lenis already honours the page's scroll-padding-top, so no manual nav offset is needed.
  if (lenis) lenis.scrollTo(el);
  else el.scrollIntoView();
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
