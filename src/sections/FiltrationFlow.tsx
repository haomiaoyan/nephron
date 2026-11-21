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
      /* 三道膜：双虚线，孔径逐级变小（16/9 → 9/9 → 4/10）。
         颜色用 --text-2 而不是 --text-3，透明度 0.9、线宽 1.5——
         原来 0.5 / 1.1px 在实际渲染下几乎看不见，而这三条线就是「筛子」本体。 */
      const dash = [[16, 9], [9, 9], [4, 10]];

      LAYER_X.forEach((fx, i) => {
        const x = width * fx;

        // 膜的极淡底带，让线不只是悬空的虚点
        ctx.fillStyle = muted;
        ctx.globalAlpha = 0.1;
        ctx.fillRect(x - 4, 0, 8, height);

        ctx.globalAlpha = 0.9;
        ctx.strokeStyle = cell;
        ctx.lineWidth = 1.5;
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

    let running = false;

    const frame = (t: number, once = false) => {
      if (!once && running) raf = requestAnimationFrame(frame);
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

    const start = () => {
      if (running) return;
      running = true;
      if (reduced) {
        // 降动效：只画一帧静态画面，不排后续帧
        frame(performance.now(), true);
        running = false;
        return;
      }
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();
    start();

    const onResize = () => {
      resize();
      // 降动效下 resize 会清空画布，必须补画一帧，否则转动窗口后整块变空白
      if (reduced) frame(performance.now(), true);
    };
    window.addEventListener('resize', onResize);

    // 滚出视口或切到别的标签页时停掉 rAF：三块 canvas 同时跑约 800 万像素/帧
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !document.hidden) start();
        else stop();
      },
      { rootMargin: '120px' },
    );
    io.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', onResize);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="filt__canvas" aria-hidden="true" />;
}
