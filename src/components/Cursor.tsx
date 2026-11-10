import { useEffect, useRef } from 'react';
import { hasFinePointer, prefersReducedMotion } from '../hooks/motion';
import '../styles/cursor.css';

const INTERACTIVE = 'a, button, [role="button"], .flow__step';

/**
 * Custom cursor: a precise dot plus a ring that trails behind and opens up over
 * anything clickable. Mouse-only — touch devices keep their native behaviour.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasFinePointer() || !dot.current || !ring.current) return;
    const d = dot.current;
    const r = ring.current;
    const root = document.documentElement;
    const ease = prefersReducedMotion() ? 1 : 0.18;
    const pos = { x: 0, y: 0, rx: 0, ry: 0 };
    let frame = 0;
    let started = false;

    const render = () => {
      pos.rx += (pos.x - pos.rx) * ease;
      pos.ry += (pos.y - pos.ry) * ease;
      d.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      r.style.transform = `translate3d(${pos.rx.toFixed(2)}px, ${pos.ry.toFixed(2)}px, 0)`;
      // Stop the loop once the ring has caught up; it restarts on the next move.
      frame = Math.abs(pos.x - pos.rx) + Math.abs(pos.y - pos.ry) > 0.1 ? requestAnimationFrame(render) : 0;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (!started) {
        started = true;
        pos.rx = pos.x;
        pos.ry = pos.y;
        root.classList.add('has-cursor');
      }
      root.classList.remove('cursor-out');
      root.classList.toggle('cursor-hover', !!(e.target as Element | null)?.closest?.(INTERACTIVE));
      if (!frame) frame = requestAnimationFrame(render);
    };
    const onDown = () => root.classList.add('cursor-down');
    const onUp = () => root.classList.remove('cursor-down');
    const onLeave = () => root.classList.add('cursor-out');

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    root.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      root.removeEventListener('pointerleave', onLeave);
      root.classList.remove('has-cursor', 'cursor-hover', 'cursor-down', 'cursor-out');
    };
  }, []);

  return (
    <div className="cursor" aria-hidden="true">
      <div className="cursor__ring" ref={ring}>
        <span />
      </div>
      <div className="cursor__dot" ref={dot}>
        <span />
      </div>
    </div>
  );
}
