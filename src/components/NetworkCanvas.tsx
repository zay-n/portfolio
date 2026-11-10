import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../hooks/motion';

type Node = { x: number; y: number; z: number; label?: string };
type Pulse = { edge: number; t: number; speed: number };

const LABELS = ['DEVICE', 'LEDGER', 'IPFS', 'CLOUD', 'AUTH', 'API'];

/** Seeded PRNG so the network has the same shape on every visit. */
function mulberry(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildNetwork(count: number) {
  const rand = mulberry(7);
  const nodes: Node[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const ring = Math.sqrt(1 - y * y);
    const theta = golden * i;
    const r = 0.72 + rand() * 0.36;
    nodes.push({ x: Math.cos(theta) * ring * r, y: y * r, z: Math.sin(theta) * ring * r });
  }
  const step = Math.floor(count / LABELS.length);
  LABELS.forEach((label, i) => (nodes[Math.floor(step / 2) + i * step].label = label));

  // Link every node to its nearest neighbours.
  const seen = new Set<string>();
  const edges: [number, number][] = [];
  nodes.forEach((a, i) => {
    const nearest = nodes
      .map((b, j) => ({ j, d: (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2 }))
      .filter((n) => n.j !== i)
      .sort((p, q) => p.d - q.d)
      .slice(0, 3);
    for (const { j } of nearest) {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (!seen.has(key)) {
        seen.add(key);
        edges.push([i, j]);
      }
    }
  });
  return { nodes, edges, rand };
}

/**
 * The hero visual: a slowly rotating mesh of devices, ledgers and services with data
 * moving between them. Plain 2D canvas with manual projection — no WebGL dependency.
 */
export default function NetworkCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduced = prefersReducedMotion();
    const small = window.innerWidth < 760;
    const { nodes, edges, rand } = buildNetwork(small ? 46 : 84);
    const pulses: Pulse[] = Array.from({ length: small ? 8 : 16 }, () => ({
      edge: Math.floor(rand() * edges.length),
      t: rand(),
      speed: 0.25 + rand() * 0.45,
    }));
    const projected = nodes.map(() => ({ x: 0, y: 0, s: 0, depth: 0 }));

    let w = 0;
    let h = 0;
    let frame = 0;
    let running = false;
    let last = 0;
    let angle = 0.6;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!running) draw(0);
    };

    const draw = (dt: number) => {
      angle += dt * 0.07;
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;

      const wide = w >= 900;
      const cx = wide ? w * 0.74 : w * 0.5;
      const cy = wide ? h * 0.47 : h * 0.3;
      const radius = wide ? Math.min(w * 0.25, h * 0.42) : Math.min(w * 0.52, h * 0.32);
      const ry = angle + pointer.x * 0.5;
      const rx = -0.28 + pointer.y * 0.32;
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);

      nodes.forEach((n, i) => {
        const x1 = n.x * cosY - n.z * sinY;
        const z1 = n.x * sinY + n.z * cosY;
        const y1 = n.y * cosX - z1 * sinX;
        const z2 = n.y * sinX + z1 * cosX;
        const s = 2.6 / (2.6 + z2);
        const p = projected[i];
        p.x = cx + x1 * radius * s;
        p.y = cy + y1 * radius * s;
        p.s = s;
        p.depth = (1 - z2) / 2; // 0 = far, 1 = near
      });

      ctx.clearRect(0, 0, w, h);
      const fade = wide ? 1 : 0.55;

      ctx.lineWidth = 1;
      for (const [a, b] of edges) {
        const pa = projected[a];
        const pb = projected[b];
        const depth = (pa.depth + pb.depth) / 2;
        ctx.strokeStyle = `rgba(150, 128, 255, ${(0.05 + depth * 0.26) * fade})`;
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.stroke();
      }

      for (const pulse of pulses) {
        pulse.t += dt * pulse.speed;
        if (pulse.t > 1) {
          pulse.t = 0;
          pulse.edge = Math.floor(rand() * edges.length);
        }
        const [a, b] = edges[pulse.edge];
        const pa = projected[a];
        const pb = projected[b];
        const x = pa.x + (pb.x - pa.x) * pulse.t;
        const y = pa.y + (pb.y - pa.y) * pulse.t;
        const depth = pa.depth + (pb.depth - pa.depth) * pulse.t;
        const alpha = Math.sin(pulse.t * Math.PI) * (0.35 + depth * 0.65) * fade;
        ctx.fillStyle = `rgba(155, 123, 255, ${alpha * 0.22})`;
        ctx.beginPath();
        ctx.arc(x, y, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(214, 200, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.font = '500 10px "JetBrains Mono Variable", ui-monospace, monospace';
      nodes.forEach((n, i) => {
        const p = projected[i];
        const alpha = (0.18 + p.depth * 0.75) * fade;
        if (n.label) {
          const size = 5 * p.s;
          ctx.strokeStyle = `rgba(184, 162, 255, ${alpha})`;
          ctx.fillStyle = `rgba(10, 10, 13, ${alpha})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.rect(p.x - size, p.y - size, size * 2, size * 2);
          ctx.fill();
          ctx.stroke();
          if (wide) {
            ctx.fillStyle = `rgba(200, 196, 220, ${alpha * 0.8})`;
            ctx.fillText(n.label, p.x + size + 8, p.y + 3.5);
          }
        } else {
          ctx.fillStyle = `rgba(226, 222, 245, ${alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.5 * p.s, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    };

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      draw(dt);
      frame = requestAnimationFrame(tick);
    };
    const start = () => {
      if (running || reduced) return;
      running = true;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const onPointer = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    let onScreen = true;
    const onVisibility = () => (document.hidden || !onScreen ? stop() : start());
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      onVisibility();
    });

    resize();
    io.observe(canvas);
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointer, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    document.fonts?.ready.then(() => !running && draw(0));

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointer);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={ref} className="hero__canvas" aria-hidden="true" />;
}
