import { useEffect, useRef } from 'react';
import { useTheme } from '../theme';

type P = {
  x: number;
  y: number;
  px: number;
  py: number;
  capY: number;
  r: number;
  vx: number;
  turnX: number;
  up: boolean;
  alpha: number;
};

const LUMEN = [0.7, 0.87];
const CAP = [0.13, 0.3];
const TRANSITION = 110;

const smooth = (t: number) => {
  const c = Math.min(1, Math.max(0, t));
  return c * c * (3 - 2 * c);
};

export default function ReabsorbFlow() {
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
    const backflow = styles.getPropertyValue('--text-2').trim() || '#98a0ac';

    let width = 0;
    let height = 0;
    let dpr = 1;
    let items: P[] = [];
    let raf = 0;
    let last = 0;

    const make = (x: number): P => {
      const up = Math.random() < 0.65;
      const from = LUMEN[0] + Math.random() * (LUMEN[1] - LUMEN[0]);
      const to = CAP[0] + Math.random() * (CAP[1] - CAP[0]);
      return {
        x,
        y: from * height,
        px: x,
        py: from * height,
        capY: to * height,
        r: 1.5 + Math.random() * 1.3,
        vx: 42 + Math.random() * 40,
        turnX: width * (0.42 + Math.random() * 0.54),
        up,
        alpha: 0,
      };
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      items = Array.from({ length: 132 }, () => {
        const p = make(Math.random() * width * 0.55);
        p.alpha = 1;
        return p;
      });
    };

    const drawLanes = () => {
      ctx.fillStyle = cool;
      ctx.globalAlpha = 0.035;
      ctx.fillRect(0, CAP[0] * height, width, (CAP[1] - CAP[0]) * height);
      ctx.fillRect(0, LUMEN[0] * height, width, (LUMEN[1] - LUMEN[0]) * height);
      ctx.globalAlpha = 1;

      ctx.strokeStyle = muted;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.55;
      ctx.setLineDash([2, 6]);
      [CAP[0], CAP[1], LUMEN[0], LUMEN[1]].forEach((fy) => {
        ctx.beginPath();
        ctx.moveTo(0, fy * height);
        ctx.lineTo(width, fy * height);
        ctx.stroke();
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
      drawLanes();

      for (const p of items) {
        p.x += p.vx * dt;
        p.alpha = Math.min(1, p.alpha + dt * 1.6);

        const progress = p.up ? smooth((p.x - p.turnX) / TRANSITION) : 0;
        const y = p.y + (p.capY - p.y) * progress;

        if (p.x - 20 > width) {
          Object.assign(p, make(-20));
        }

        const tint = progress > 0.5 ? backflow : cool;

        ctx.beginPath();
        ctx.globalAlpha = p.alpha * (theme === 'light' ? 0.42 : 0.3);
        ctx.strokeStyle = tint;
        ctx.lineWidth = p.r * 1.5;
        ctx.lineCap = 'round';
        ctx.moveTo(p.px, p.py);
        ctx.lineTo(p.x, y);
        ctx.stroke();

        ctx.beginPath();
        ctx.globalAlpha = Math.min(1, p.alpha * (theme === 'light' ? 1.15 : 0.95));
        ctx.fillStyle = tint;
        ctx.arc(p.x, y, p.r, 0, Math.PI * 2);
        ctx.fill();

        p.px = p.x;
        p.py = y;
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

  return <canvas ref={canvasRef} className="prox__canvas" aria-hidden="true" />;
}
