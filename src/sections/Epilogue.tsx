import Reveal from '../components/Reveal';
import kidneyBand from '../assets/kidney-band.webp';
import { useI18n } from '../i18n';
import './Epilogue.css';

const COLS = 24;
const ROWS = 7;
const SESSIONS = [0, 2, 4];
const HOURS = [8, 9, 10, 11];

const isDialysis = (r: number, c: number) => SESSIONS.includes(r) && HOURS.includes(c);

export default function Epilogue() {
  const { t } = useI18n();

  return (
    <section id="s-epilogue" aria-labelledby="s-epilogue-title" className="epi">
      <Reveal className="epi__top">
        <p className="epi__kicker">{t('s7.kicker')}</p>
        <h2 id="s-epilogue-title" className="epi__title">{t('s7.title')}</h2>
        <p className="epi__lede">{t('s7.lede')}</p>
      </Reveal>

      <div className="epi__body">
        <Reveal className="epi__grid" delay={100}>
          {Array.from({ length: ROWS * COLS }, (_, i) => {
            const r = Math.floor(i / COLS);
            const c = i % COLS;
            return (
              <span
                key={i}
                className={`epi__cell${isDialysis(r, c) ? ' epi__cell--dialysis' : ''}`}
              />
            );
          })}
        </Reveal>

        <Reveal className="epi__notes" delay={180}>
          <ul className="epi__legend">
            <li className="epi__legend-item">
              <span className="epi__swatch epi__swatch--organ" />
              <span className="epi__legend-name">{t('s7.legend1')}</span>
            </li>
            <li className="epi__legend-item">
              <span className="epi__swatch epi__swatch--machine" />
              <span className="epi__legend-name">{t('s7.legend2')}</span>
            </li>
          </ul>

          <ul className="epi__stats">
            <li className="epi__stat">
              <span className="epi__stat-value">168</span>
              <span className="epi__stat-label">{t('s7.s1l')}</span>
            </li>
            <li className="epi__stat">
              <span className="epi__stat-value">12</span>
              <span className="epi__stat-label">{t('s7.s2l')}</span>
            </li>
            <li className="epi__stat">
              <span className="epi__stat-value">14×</span>
              <span className="epi__stat-label">{t('s7.s3l')}</span>
            </li>
          </ul>
        </Reveal>
      </div>

      <Reveal className="epi__quote-wrap" delay={240}>
        <blockquote className="epi__quote">
          {t('s7.quote').split('||').map((line) => (
            <span key={line} className="epi__quote-line">
              {line}
            </span>
          ))}
        </blockquote>
      </Reveal>

      <Reveal className="epi__band" delay={200}>
        <span className="epi__band-caption">{t('s7.bandCaption')}</span>
        <img src={kidneyBand} alt={t('s7.bandAlt')} loading="lazy" />
      </Reveal>

      <footer className="epi__footer">
        <div className="epi__source">
          <span className="epi__source-label">{t('s7.srcLabel')}</span>
          <span className="epi__source-text">{t('s7.src')}</span>
          <span className="epi__source-credit">{t('s7.credit')}</span>
        </div>
        <a
          className="epi__repo"
          href="https://github.com/haomiaoyan/nephron"
          target="_blank"
          rel="noreferrer"
        >
          github.com/haomiaoyan/nephron
        </a>
      </footer>
    </section>
  );
}
