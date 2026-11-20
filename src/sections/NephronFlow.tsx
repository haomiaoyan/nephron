import { GLOMERULUS, NEPHRON_SEGMENTS, NEPHRON_VIEWBOX, TUFT_PATHS } from './nephron-path';
import { useI18n } from '../i18n';
import './NephronFlow.css';

type Label = {
  zh: string;
  en: string;
  x: number;
  y: number;
  anchor: 'start' | 'middle' | 'end';
  dot?: [number, number];
  leader?: [number, number, number, number];
};

const LABELS: Label[] = [
  {
    zh: '肾小球',
    en: 'Glomerulus',
    x: 94,
    y: 112,
    anchor: 'end',
    dot: [106, 110],
    leader: [100, 112, 104, 110],
  },
  {
    zh: '近曲小管',
    en: 'Proximal tubule',
    x: 146,
    y: 204,
    anchor: 'end',
    dot: [262, 194],
    leader: [152, 200, 258, 194],
  },
  {
    zh: '髓袢',
    en: 'Loop of Henle',
    x: 358,
    y: 686,
    anchor: 'middle',
    dot: [358, 640],
    leader: [358, 680, 358, 642],
  },
  {
    zh: '远曲小管',
    en: 'Distal tubule',
    x: 484,
    y: 172,
    anchor: 'middle',
    dot: [476, 252],
    leader: [484, 180, 478, 248],
  },
  {
    zh: '集合管',
    en: 'Collecting duct',
    x: 516,
    y: 774,
    anchor: 'end',
    dot: [535, 768],
    leader: [522, 772, 533, 769],
  },
];

export default function NephronFlow() {
  const { lang } = useI18n();

  return (
    <svg
      className="nephron"
      viewBox={NEPHRON_VIEWBOX}
      preserveAspectRatio="xMaxYMax meet"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle
        className="nephron__capsule"
        cx={GLOMERULUS.cx}
        cy={GLOMERULUS.cy}
        r={GLOMERULUS.r}
      />
      {TUFT_PATHS.map((d) => (
        <path key={d} className="nephron__tuft" d={d} />
      ))}

      {NEPHRON_SEGMENTS.map((s) => (
        <path
          key={s.d}
          className={`nephron__tube nephron__tube--${s.tone}`}
          d={s.d}
          strokeWidth={s.w}
          pathLength={1}
          style={{ animationDelay: `${s.delay}s` }}
        />
      ))}

      <g className="nephron__annot">
        {LABELS.map((l) => (
          <g key={l.en}>
            {l.leader && (
              <line
                className="nephron__leader"
                x1={l.leader[0]}
                y1={l.leader[1]}
                x2={l.leader[2]}
                y2={l.leader[3]}
              />
            )}
            {l.dot && <circle className="nephron__dot" cx={l.dot[0]} cy={l.dot[1]} r="2.8" />}
            <text className="nephron__label" x={l.x} y={l.y} textAnchor={l.anchor}>
              {lang === 'zh' ? l.zh : l.en}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}
