import type { CSSProperties } from 'react';
import Reveal from '../components/Reveal';
import { useI18n } from '../i18n';
import './FinalLedger.css';

const ROWS = [
  { key: 's6.r1', value: 180, pct: 100, accent: false },
  { key: 's6.r2', value: 63, pct: 35, accent: false },
  { key: 's6.r3', value: 36, pct: 20, accent: false },
  { key: 's6.r4', value: 18, pct: 10, accent: false },
  { key: 's6.r5', value: 1.5, pct: 0.83, accent: true },
] as const;

const DROPS = [
  { key: 's6.d1', value: '−117' },
  { key: 's6.d2', value: '−27' },
  { key: 's6.d3', value: '−18' },
  { key: 's6.d4', value: '−16.5' },
] as const;

export default function FinalLedger() {
  const { t } = useI18n();

  return (
    <section className="ledger">
      <Reveal className="ledger__head">
        <p className="ledger__kicker">{t('s6.kicker')}</p>
        <h2 className="ledger__title">{t('s6.title')}</h2>
        <p className="ledger__lede">{t('s6.lede')}</p>
      </Reveal>

      <Reveal className="ledger__chart" delay={120}>
        {ROWS.map((row, i) => (
          <div key={row.key} className="ledger__group">
            <div className={`ledger__row${row.accent ? ' ledger__row--last' : ''}`}>
              <span className="ledger__label">{t(row.key)}</span>
              <span className="ledger__track">
                <span
                  className="ledger__bar"
                  style={{ '--w': `${row.pct}%` } as CSSProperties}
                />
                <span className="ledger__value">
                  {row.value} <em>L</em>
                </span>
              </span>
            </div>

            {i < DROPS.length && (
              <div className="ledger__drop">
                <span className="ledger__drop-line" />
                <span className="ledger__drop-text">
                  {t(DROPS[i].key)} <b>{DROPS[i].value}</b>
                </span>
              </div>
            )}
          </div>
        ))}
      </Reveal>

      <Reveal className="ledger__stats" delay={220}>
        <ul className="ledger__stats-list">
          <li className="ledger__stat">
            <span className="ledger__stat-value">99.2%</span>
            <span className="ledger__stat-label">{t('s6.s1l')}</span>
          </li>
          <li className="ledger__stat">
            <span className="ledger__stat-value">1.5 L</span>
            <span className="ledger__stat-label">{t('s6.s2l')}</span>
          </li>
          <li className="ledger__stat">
            <span className="ledger__stat-value">0.83%</span>
            <span className="ledger__stat-label">{t('s6.s3l')}</span>
          </li>
        </ul>
      </Reveal>

      <Reveal className="ledger__closing" delay={280}>
        <p className="ledger__closing-text">{t('s6.closing')}</p>
      </Reveal>
    </section>
  );
}
