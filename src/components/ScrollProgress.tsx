import { useEffect, useRef } from 'react';
import './ScrollProgress.css';

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let raf = 0;
    let max = 0;

    // scrollHeight 每帧读会强制 reflow，缓存起来，只在尺寸变化时重算
    const cache = () => {
      max = document.documentElement.scrollHeight - window.innerHeight;
    };

    const measure = () => {
      raf = 0;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      // 直写 style，不走 React state：这个值几乎每帧都在变，setState 会每帧重渲染整棵树
      bar.style.transform = `scaleX(${p})`;
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

    // 字体加载完、切到英文后文档高度会变，进度比例要跟着重算
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
  }, []);

  return (
    <div className="progress" aria-hidden="true">
      <div ref={barRef} className="progress__bar" />
    </div>
  );
}
