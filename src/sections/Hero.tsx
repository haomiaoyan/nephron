import Particles from '../rb/Particles';
import Threads from '../rb/Threads';
import NephronFlow from './NephronFlow';
import { useI18n } from '../i18n';
import { useTheme } from '../theme';
import './Hero.css';

const FACTS = [
  { value: '1,000,000', label: 'hero.fact1.label' },
  { value: '20–25%', label: 'hero.fact2.label' },
  { value: '99.2%', label: 'hero.fact3.label' },
] as const;

const variant = new URLSearchParams(window.location.search).get('bg') === 'particles'
  ? 'particles'
  : 'threads';

export default function Hero() {
  const { t } = useI18n();
  const { theme } = useTheme();
  const light = theme === 'light';

  return (
    <section className="hero">
      <div className="hero__bg" aria-hidden="true">
        {variant === 'threads' ? (
          <Threads
            lineCount={90}
            thickness={0.7}
            softness={1.4}
            amplitude={2.4}
            distance={0.5}
            waves={1.2}
            speed={0.28}
            fray={0.7}
            split={0.05}
            angle={18}
            color={light ? [0.13, 0.19, 0.24] : [0.86, 0.91, 0.96]}
            accentColor={light ? [0.7, 0.52, 0.34] : [0.5, 0.45, 0.38]}
            opacity={light ? 0.16 : 0.2}
          />
        ) : (
          <Particles
            particleCount={light ? 700 : 1400}
            particleSpread={22}
            speed={0.08}
            particleColors={
              light ? ['#22303d', '#2f6fa8', '#b0631a'] : ['#dcecf7', '#86bedf', '#f2a44e']
            }
            alphaParticles
            particleBaseSize={46}
            sizeRandomness={1.6}
            cameraDistance={28}
            glow={light ? 0.3 : 1.2}
            twinkle={0.4}
            connections
            connectionDistance={110}
            moveParticlesOnHover
            particleHoverFactor={0.55}
            depthOfField={0.5}
            lightMode={light}
            opacity={light ? 0.6 : 0.95}
          />
        )}
      </div>

      <div className="hero__veil" aria-hidden="true" />

      <NephronFlow />

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
