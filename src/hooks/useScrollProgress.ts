import { useEffect, type RefObject } from 'react';
import { clamp, prefersReducedMotion } from './motion';

/**
 * Writes a 0–1 `--p` custom property on the element as it travels through the viewport.
 * `start`/`end` are viewport fractions: progress is 0 when the element's top is at `start`
 * and 1 when its bottom reaches `end`.
 */
export function useScrollProgress(ref: RefObject<HTMLElement | null>, start = 0.9, end = 0.45) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.style.setProperty('--p', '1');
      return;
    }
    let frame = 0;
    let visible = false;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh * (start - end);
      el.style.setProperty('--p', clamp((vh * start - rect.top) / total).toFixed(4));
    };
    const onScroll = () => {
      if (visible && !frame) frame = requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) update();
    });
    io.observe(el);
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ref, start, end]);
}
