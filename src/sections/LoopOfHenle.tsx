import Reveal from '../components/Reveal';
import { useI18n } from '../i18n';
import './LoopOfHenle.css';

const TUBE = 'M150 40 L150 470 C150 528 250 528 250 470 L250 40';

const WATER = [96, 168, 240, 312, 384];
const SALT = [110, 182, 254, 326, 398];

const TICKS = [
  { y: 40, value: '300' },
  { y: 200, value: '600' },
  { y: 360, value: '900' },
  { y: 520, value: '1200' },
];

export default function LoopOfHenle() {
  const { t } = useI18n();

  return (
    <section className="loop">
      <Reveal className="loop__copy">
        <p className="loop__kicker">{t('s4.kicker')}</p>
        <h2 className="loop__title">{t('s4.title')}</h2>
        <p className="loop__lede">{t('s4.lede')}</p>

        <ul className="loop__stats">
          <li className="loop__stat">
            <span className="loop__stat-value">4×</span>
            <span className="loop__stat-label">{t('s4.s1l')}</span>
          </li>
          <li className="loop__stat">
            <span className="loop__stat-value">1200</span>
            <span className="loop__stat-label">{t('s4.s2l')}</span>
          </li>
          <li className="loop__stat">
            <span className="loop__stat-value">100</span>
            <span className="loop__stat-label">{t('s4.s3l')}</span>
          </li>
        </ul>
      </Reveal>

      <Reveal className="loop__figure" delay={140}>
        <svg viewBox="0 0 480 620" className="loop__svg" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="osm" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--text-3)" stopOpacity="0" />
              <stop offset="1" stopColor="var(--text-3)" stopOpacity="0.18" />
            </linearGradient>
            <linearGradient id="edgeFade" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#fff" stopOpacity="0" />
              <stop offset="0.28" stopColor="#fff" stopOpacity="1" />
              <stop offset="0.82" stopColor="#fff" stopOpacity="1" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <mask id="osmMask">
              <rect x="0" y="0" width="430" height="620" fill="url(#edgeFade)" />
            </mask>
          </defs>

          <rect x="0" y="0" width="430" height="620" fill="url(#osm)" mask="url(#osmMask)" />

          {TICKS.map((tk) => (
            <g key={tk.value}>
              <line className="loop__tick" x1="430" y1={tk.y} x2="442" y2={tk.y} />
              <text className="loop__tick-text" x="458" y={tk.y + 4}>
                {tk.value}
              </text>
            </g>
          ))}

          <line className="loop__tick" x1="430" y1="40" x2="430" y2="620" />

          <path className="loop__tube loop__tube--thin" d="M150 40 L150 470" />
          <path className="loop__tube loop__tube--thick" d="M250 470 L250 40" />
          <path className="loop__curve" d="M150 470 C150 528 250 528 250 470" />

          <path className="loop__current" d={TUBE} />

          {WATER.map((y, i) => (
            <g key={`w${y}`} transform={`translate(150 ${y})`}>
              <circle className="loop__drip loop__drip--water" r="2.8" style={{ animationDelay: `${i * 0.55}s` }} />
            </g>
          ))}

          {SALT.map((y, i) => (
            <g key={`s${y}`} transform={`translate(250 ${y})`}>
              <circle className="loop__drip loop__drip--salt" r="2.4" style={{ animationDelay: `${i * 0.55 + 0.28}s` }} />
            </g>
          ))}

          <text className="loop__label" x="126" y="226" textAnchor="end">
            {t('s4.desc')}
          </text>
          <text className="loop__label-spec" x="126" y="248" textAnchor="end">
            {t('s4.descSpec')}
          </text>
          <text className="loop__label" x="274" y="226">
            {t('s4.asc')}
          </text>
          <text className="loop__label-spec" x="274" y="248">
            {t('s4.ascSpec')}
          </text>

          <text className="loop__zone" x="12" y="34">{t('s4.cortex')}</text>
          <text className="loop__zone" x="12" y="612">{t('s4.medulla')}</text>
        </svg>
      </Reveal>
    </section>
  );
}
