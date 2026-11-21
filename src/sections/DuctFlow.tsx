import { useEffect, useRef } from 'react';
import { useTheme } from '../theme';

type P = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  leak: boolean;
  leaking: boolean;
  leakY: number;
  side: number;
  alpha: number;
};

export default function DuctFlow({ level }: { level: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const levelRef = useRef(level);
  const { theme } = useTheme();

  useEffect(() => {
    levelRef.current = level;
  }, [level]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const styles = getComputedStyle(document.documentElement);
    const cool = styles.getPropertyValue('--cool').trim() || '#86bedf';
    const muted = styles.getPropertyValue('--text-3').trim() || '#5f6773';

    let W = 0;
    let H = 0;
    let dpr = 1;
    let items: P[] = [];
    let raf = 0;
    let last = 0;

    const ductW = () => Math.min(132, W * 0.34);
    const exitY = () => H * 0.74;

    const spawn = (): P => {
      const cx = W * 0.5;
      const half = ductW() * 0.5;
      return {
        x: cx + (Math.random() - 0.5) * half * 1.5,
        y: -12,
        vx: 0,
        vy: 46 + Math.random() * 54,
        r: 1.6 + Math.random() * 1.7,
        leak: Math.random() < levelRef.current * 0.94,
        leaking: false,
        leakY: H * (0.1 + Math.random() * 0.52),
        side: Math.random() < 0.5 ? -1 : 1,
        alpha: 0,
      };
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      items = Array.from({ length: 70 }, () => {
        const p = spawn();
        p.y = Math.random() * exitY();
        p.alpha = 1;
        return p;
      });
    };

    const drawDuct = () => {
      const cx = W * 0.5;
      const half = ductW() * 0.5;
      const bottom = exitY();

      ctx.fillStyle = cool;
      ctx.globalAlpha = 0.05;
      ctx.fillRect(cx - half, 0, half * 2, bottom);

      ctx.strokeStyle = muted;
      ctx.globalAlpha = 0.45;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(cx - half, 0);
      ctx.lineTo(cx - half, bottom - 26);
      ctx.quadraticCurveTo(cx - half, bottom, cx - half * 0.34, bottom);
      ctx.moveTo(cx + half, 0);
      ctx.lineTo(cx + half, bottom - 26);
      ctx.quadraticCurveTo(cx + half, bottom, cx + half * 0.34, bottom);
      ctx.stroke();

      const flow = 1 - levelRef.current * 0.82;
      ctx.globalAlpha = 0.5;
      ctx.strokeStyle = cool;
      ctx.lineWidth = 2 + flow * 7;
      ctx.beginPath();
      ctx.moveTo(cx, bottom + 2);
      ctx.lineTo(cx, H);
      ctx.stroke();
      ctx.globalAlpha = 1;
    };

    let running = false;

    const frame = (t: number, once = false) => {
      if (!once && running) raf = requestAnimationFrame(frame);
      const dt = Math.min((t - last) / 1000, 0.05);
      last = t;

      ctx.clearRect(0, 0, W, H);
      drawDuct();

      for (const p of items) {
        if (!p.leaking && p.leak && p.y > p.leakY) {
          p.leaking = true;
          p.vx = p.side * (44 + Math.random() * 62);
        }

        if (p.leaking) {
          p.vx *= 1.02;
          p.x += p.vx * dt;
          p.alpha -= dt * 0.5;
        } else {
          p.y += p.vy * dt;
          p.alpha = Math.min(1, p.alpha + dt * 1.8);
        }

        if (p.alpha <= 0 || p.y > exitY() + 6 || p.x < -40 || p.x > W + 40) {
          Object.assign(p, spawn());
        }

        const a = Math.max(0, Math.min(1, p.alpha));

        if (p.leaking) {
          ctx.beginPath();
          ctx.globalAlpha = a * 0.4;
          ctx.strokeStyle = cool;
          ctx.lineWidth = p.r * 1.6;
          ctx.lineCap = 'round';
          ctx.moveTo(p.x - p.vx * 0.05, p.y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.globalAlpha = a * 0.95;
        ctx.fillStyle = cool;
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

  return <canvas ref={canvasRef} className="duct__canvas" aria-hidden="true" />;
}
