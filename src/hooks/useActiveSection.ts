import { useEffect, useState } from 'react';

type Span = { id: string; start: number; end: number };

/**
 * 滚动时判断当前停在哪一屏。
 * 以视口 42% 高处作为锚点，取包含锚点的 section；都不包含时取最近的那个。
 *
 * 性能：section 的 offsetTop/offsetHeight 只在缓存时读一次（初始 + resize +
 * 文档高度变化），滚动过程中只做数值比较，不再每帧触发 7 次 reflow。
 */
export function useActiveSection(ids: readonly string[]): string {
  const key = ids.join('|');
  const [active, setActive] = useState(() => ids[0] ?? '');

  useEffect(() => {
    const list = key.split('|').filter(Boolean);
    if (!list.length) return;

    let raf = 0;
    let spans: Span[] = [];

    const cache = () => {
      spans = [];
      for (const id of list) {
        const el = document.getElementById(id);
        if (!el) continue;
        const start = el.offsetTop;
        spans.push({ id, start, end: start + el.offsetHeight });
      }
    };

    const measure = () => {
      raf = 0;
      if (!spans.length) cache();

      // 按「与视口重叠的高度」取最大，而不是「视口某个锚点落在谁身上」——
      // 集合管那屏只有 704px，比视口还矮，锚点法会让高亮提前跳到下一屏。
      const viewTop = window.scrollY;
      const viewBottom = viewTop + window.innerHeight;
      let best = list[0];
      let bestOverlap = -1;

      for (const s of spans) {
        const overlap = Math.min(viewBottom, s.end) - Math.max(viewTop, s.start);
        if (overlap > bestOverlap) {
          bestOverlap = overlap;
          best = s.id;
        }
      }

      setActive((prev) => (prev === best ? prev : best));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };

    const onResize = () => {
      cache();
      onScroll();
    };

    cache();
    measure();

    // 字体加载 / 切换语言会让屏高变化，缓存要跟着失效
    const ro = new ResizeObserver(() => {
      cache();
      onScroll();
    });
    ro.observe(document.body);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
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
