import { useEffect, useState } from 'react';
import cortexHx from '../assets/cortex-hx.webp';
import { useI18n } from '../i18n';
import './Hero.css';

const FACTS = [
  { value: '1,000,000', label: 'hero.fact1.label' },
  { value: '20–25%', label: 'hero.fact2.label' },
  { value: '99.2%', label: 'hero.fact3.label' },
] as const;

// 首屏右下角的章节预览：滚进正文后淡出，把版面让给主体
const INDEX = ['hero.idx1', 'hero.idx2', 'hero.idx3', 'hero.idx4'] as const;

export default function Hero() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      setScrolled(window.scrollY > 60);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <section id="s-hero" aria-labelledby="s-hero-title" className="hero">
      <div className="hero__photo">
        <img src={cortexHx} alt={t('hero.photoAlt')} />
        <span className="hero__specimen">{t('hero.specimen')}</span>
      </div>

      <div className="hero__veil" aria-hidden="true" />

      <div className="hero__inner">
        <p className="hero__eyebrow">{t('hero.eyebrow')}</p>

        <h1 id="s-hero-title" className="hero__figure">
          <span className="hero__num">180</span>
          <span className="hero__unit">{t('hero.unit')}</span>
        </h1>

        <p className="hero__lede">{t('hero.lede')}</p>

        <ul className="hero__facts">
          {FACTS.map((f) => (
            <li key={f.label} className="hero__fact">
              <span className="hero__fact-value">{f.value}</span>
              <span className="hero__fact-label">{t(f.label)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={`hero__index${scrolled ? ' is-hidden' : ''}`} aria-hidden="true">
        <span className="hero__scroll">
          {t('hero.scroll')}
          <svg
            viewBox="0 0 12 16"
            width="11"
            height="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            aria-hidden="true"
          >
            <path d="M6 1v13M1.5 9.5 6 14l4.5-4.5" />
          </svg>
        </span>
        <ol className="hero__index-list">
          {INDEX.map((k, i) => (
            <li key={k} className="hero__index-item">
              <span className="hero__index-num">{String(i + 1).padStart(2, '0')}</span>
              {t(k)}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
