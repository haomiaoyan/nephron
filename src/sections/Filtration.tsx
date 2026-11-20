import FiltrationFlow from './FiltrationFlow';
import Reveal from '../components/Reveal';
import { useI18n } from '../i18n';
import './Filtration.css';

const LAYERS = [
  { at: 34, name: 's2.l1name', spec: 's2.l1spec' },
  { at: 58, name: 's2.l2name', spec: 's2.l2spec' },
  { at: 80, name: 's2.l3name', spec: 's2.l3spec' },
] as const;

const STATS = [
  { value: '125', label: 's2.s1l' },
  { value: '20%', label: 's2.s2l' },
  { value: '60×', label: 's2.s3l' },
] as const;

export default function Filtration() {
  const { t } = useI18n();

  return (
    <section className="filt">
      <Reveal className="filt__head">
        <div>
          <p className="filt__kicker">{t('s2.kicker')}</p>
          <h2 className="filt__title">{t('s2.title')}</h2>
        </div>
        <p className="filt__lede">{t('s2.lede')}</p>
      </Reveal>

      <Reveal className="filt__stage" delay={120}>
        <FiltrationFlow />
        <div className="filt__legend">
          {LAYERS.map((l) => (
            <div key={l.name} className="filt__label" style={{ left: `${l.at}%` }}>
              <span className="filt__label-name">{t(l.name)}</span>
              <span className="filt__label-spec">{t(l.spec)}</span>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={200}>
        <ul className="filt__stats">
          {STATS.map((s) => (
            <li key={s.label} className="filt__stat">
              <span className="filt__stat-value">{s.value}</span>
              <span className="filt__stat-label">{t(s.label)}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
