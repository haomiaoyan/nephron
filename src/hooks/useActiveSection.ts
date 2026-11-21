import { useEffect, useState } from 'react';

/**
 * 滚动时判断当前停在哪一屏。
 * 以视口 42% 高处作为锚点，取包含锚点的 section；都不包含时取最近的那个。
 * 只在结果变化时 setState，避免每帧重渲染。
 */
export function useActiveSection(ids: readonly string[]): string {
  const key = ids.join('|');
  const [active, setActive] = useState(() => ids[0] ?? '');

  useEffect(() => {
    const list = key.split('|').filter(Boolean);
    if (!list.length) return;

    let raf = 0;

    const measure = () => {
      raf = 0;
      const anchor = window.scrollY + window.innerHeight * 0.42;
      let best = list[0];
      let bestGap = Number.POSITIVE_INFINITY;

      for (const id of list) {
        const el = document.getElementById(id);
        if (!el) continue;
        const start = el.offsetTop;
        const end = start + el.offsetHeight;
        const gap = anchor < start ? start - anchor : anchor > end ? anchor - end : 0;
        if (gap < bestGap) {
          bestGap = gap;
          best = id;
        }
      }

      setActive((prev) => (prev === best ? prev : best));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [key]);

  return active;
}

/** 视口宽度阈值，用于在窄屏收起导航。 */
export function useMaxWidth(px: number): boolean {
  const [hit, setHit] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(`(max-width: ${px}px)`).matches,
  );

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${px}px)`);
    const sync = () => setHit(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, [px]);

  return hit;
}
