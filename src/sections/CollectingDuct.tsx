import { useState } from 'react';
import DuctFlow from './DuctFlow';
import Reveal from '../components/Reveal';
import { useI18n } from '../i18n';
import './CollectingDuct.css';

export default function CollectingDuct() {
  const { t } = useI18n();
  const [adh, setAdh] = useState(83);

  const f = adh / 100;
  const volume = 0.5 + 17.5 * Math.pow(1 - f, 1.6);
  const osm = Math.round(Math.max(50, 600 / volume));
  const back = 18 - volume;

  return (
    <section className="duct">
      <Reveal className="duct__head">
        <p className="duct__kicker">{t('s5.kicker')}</p>
        <h2 className="duct__title">{t('s5.title')}</h2>
        <p className="duct__lede">{t('s5.lede')}</p>
      </Reveal>

      <div className="duct__body">
        <Reveal className="duct__figure" delay={100}>
          <DuctFlow level={f} />
        </Reveal>

        <Reveal className="duct__panel" delay={180}>
        <div className="duct__control">
          <div className="duct__control-head">
            <span className="duct__control-name">{t('s5.slider')}</span>
            <span className="duct__control-value">{adh}</span>
          </div>

          <input
            className="duct__range"
            type="range"
            min={0}
            max={100}
            value={adh}
            onChange={(e) => setAdh(Number(e.target.value))}
            style={{
              background: `linear-gradient(to right, var(--cool) 0%, var(--cool) ${adh}%, var(--line-strong) ${adh}%, var(--line-strong) 100%)`,
            }}
            aria-label={t('s5.slider')}
          />

          <div className="duct__scale">
            <span>{t('s5.low')}</span>
            <span className="duct__hint">{t('s5.hint')}</span>
            <span>{t('s5.high')}</span>
          </div>
        </div>

        <ul className="duct__stats">
          <li className="duct__stat">
            <span className="duct__stat-value">{volume.toFixed(1)} L</span>
            <span className="duct__stat-label">{t('s5.m1')}</span>
          </li>
          <li className="duct__stat">
            <span className="duct__stat-value">{osm}</span>
            <span className="duct__stat-label">{t('s5.m2')}</span>
          </li>
          <li className="duct__stat">
            <span className="duct__stat-value">{back.toFixed(1)} L</span>
            <span className="duct__stat-label">{t('s5.m3')}</span>
          </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
