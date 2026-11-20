import { GLOMERULUS, NEPHRON_SEGMENTS, NEPHRON_VIEWBOX, TUFT_PATHS } from './nephron-path';
import './NephronFlow.css';

export default function NephronFlow() {
  return (
    <svg
      className="nephron"
      viewBox={NEPHRON_VIEWBOX}
      preserveAspectRatio="xMaxYMax meet"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <g className="nephron__cortex">
        <line className="nephron__boundary" x1="104" y1="360" x2="566" y2="360" />
        <text className="nephron__zone" x="104" y="348">CORTEX</text>
        <text className="nephron__zone" x="104" y="382">MEDULLA</text>
      </g>

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
    </svg>
  );
}
