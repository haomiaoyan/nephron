import { useEffect, useRef } from 'react';
import { useTheme } from '../theme';

type Particle = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  alpha: number;
  rejectedAt: number;
};

const LAYER_X = [0.34, 0.58, 0.8];
const GATE = [5, 2.5, 2];

function spawn(height: number): Particle {
  const roll = Math.random();
  const r = roll < 0.3 ? 7 : roll < 0.62 ? 3.4 : 1.6;
  return {
    x: -12,
    y: height * (0.12 + Math.random() * 0.76),
    r,
    vx: 26 + Math.random() * 34,
    vy: (Math.random() - 0.5) * 8,
    alpha: 0,
    rejectedAt: -1,
  };
}

export default function FiltrationFlow() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const styles = getComputedStyle(document.documentElement);
    const cool = styles.getPropertyValue('--cool').trim() || '#86bedf';
    const muted = styles.getPropertyValue('--text-3').trim() || '#5f6773';
    const cell = styles.getPropertyValue('--text-2').trim() || '#98a0ac';

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: Particle[] = [];
    let raf = 0;
    let last = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = Array.from({ length: 76 }, () => {
        const p = spawn(height);
        p.x = Math.random() * width * 0.26;
        p.alpha = 1;
        return p;
      });
    };

    const drawLayers = () => {
      const dash = [[16, 9], [9, 9], [4, 10]];
      LAYER_X.forEach((fx, i) => {
        const x = width * fx;
        ctx.fillStyle = muted;
        ctx.globalAlpha = 0.06;
        ctx.fillRect(x - 3, 0, 6, height);
        ctx.globalAlpha = 0.5;
        ctx.strokeStyle = muted;
        ctx.lineWidth = 1.1;
        ctx.setLineDash(dash[i]);
        [-2.5, 2.5].forEach((off) => {
          ctx.beginPath();
          ctx.moveTo(x + off, 0);
          ctx.lineTo(x + off, height);
          ctx.stroke();
        });
      });
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;
    };

    const frame = (t: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((t - last) / 1000, 0.05);
      last = t;
      ctx.clearRect(0, 0, width, height);
      drawLayers();

      for (const p of particles) {
        if (p.rejectedAt < 0) {
          p.vx += (46 - p.vx) * 0.4 * dt;
        }

        p.x += p.vx * dt;
        p.y += p.vy * dt;

        if (p.rejectedAt >= 0) {
          p.alpha -= dt * 1.1;
          p.vy += (height * 0.5 - p.y) * 0.4 * dt;
        } else {
          p.alpha = Math.min(1, p.alpha + dt * 2);
          for (let i = 0; i < LAYER_X.length; i++) {
            const gate = width * LAYER_X[i];
            if (p.x + p.r >= gate && p.x + p.r - p.vx * dt < gate && p.r > GATE[i]) {
              p.rejectedAt = i;
              p.x = gate - p.r - 0.5;
              p.vx = -Math.abs(p.vx) * 0.45 - 8;
              p.vy = (Math.random() - 0.5) * 26;
              break;
            }
          }
        }

        if (p.x - p.r > width + 20 || p.x + p.r < -60 || p.alpha <= 0) {
          Object.assign(p, spawn(height));
        }

        const blocked = p.rejectedAt >= 0;
        ctx.beginPath();
        ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha)) * (blocked ? 0.75 : 0.95);
        ctx.fillStyle = blocked ? muted : p.r > 5 ? cell : cool;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    };

    resize();
    if (reduced) {
      frame(performance.now());
      cancelAnimationFrame(raf);
    } else {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }

    const onResize = () => {
      resize();
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="filt__canvas" aria-hidden="true" />;
}
