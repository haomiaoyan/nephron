import { useEffect, useState } from 'react';
import StarBorder from '../rb/StarBorder';
import { useTheme } from '../theme';
import { useI18n } from '../i18n';
import './BackToTop.css';

export default function BackToTop() {
  const [shown, setShown] = useState(false);
  const { theme } = useTheme();
  const { t } = useI18n();

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={`totop${shown ? ' is-shown' : ''}`}>
      <StarBorder
        as="button"
        type="button"
        className="totop__btn"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label={t('nav.top')}
        radius={999}
        thickness={1}
        backgroundColor={theme === 'dark' ? '#0e1013' : '#ffffff'}
        textColor={theme === 'dark' ? '#f4f6f8' : '#111315'}
        borderColor={theme === 'dark' ? 'rgba(244,246,248,0.28)' : 'rgba(17,19,21,0.24)'}
      >
        <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <path d="M12 19V5M6 11l6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </StarBorder>
    </div>
  );
}
