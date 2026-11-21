import cortexHx from '../assets/cortex-hx.webp';
import { useI18n } from '../i18n';
import './Hero.css';

const FACTS = [
  { value: '1,000,000', label: 'hero.fact1.label' },
  { value: '20–25%', label: 'hero.fact2.label' },
  { value: '99.2%', label: 'hero.fact3.label' },
] as const;

export default function Hero() {
  const { t } = useI18n();

  return (
    <section className="hero">
      <div className="hero__photo">
        <img src={cortexHx} alt={t('hero.photoAlt')} />
        <span className="hero__specimen">{t('hero.specimen')}</span>
      </div>

      <div className="hero__veil" aria-hidden="true" />

      <div className="hero__inner">
        <p className="hero__eyebrow">{t('hero.eyebrow')}</p>

        <h1 className="hero__figure">
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
    </section>
  );
}
