import ReabsorbFlow from './ReabsorbFlow';
import Reveal from '../components/Reveal';
import { useI18n } from '../i18n';
import './Proximal.css';

const STATS = [
  { value: '65%', label: 's3.s1l' },
  { value: '117 L', label: 's3.s2l' },
  { value: '20×', label: 's3.s3l' },
] as const;

export default function Proximal() {
  const { t } = useI18n();

  return (
    <section id="s-proximal" aria-labelledby="s-proximal-title" className="prox">
      <div className="prox__stage">
        <ReabsorbFlow />
      </div>
      <div className="prox__veil" aria-hidden="true" />

      <div className="prox__inner">
        <Reveal className="prox__copy">
          <p className="prox__kicker">{t('s3.kicker')}</p>
          <h2 id="s-proximal-title" className="prox__title">{t('s3.title')}</h2>
          <p className="prox__lede">{t('s3.lede')}</p>

          <ul className="prox__stats">
            {STATS.map((s) => (
              <li key={s.label} className="prox__stat">
                <span className="prox__stat-value">{s.value}</span>
                <span className="prox__stat-label">{t(s.label)}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <div className="prox__lanes" aria-hidden="true">
        <span className="prox__lane" style={{ top: '13%' }}>{t('s3.lane1')}</span>
        <span className="prox__lane" style={{ top: '87%' }}>{t('s3.lane2')}</span>
      </div>
    </section>
  );
}
