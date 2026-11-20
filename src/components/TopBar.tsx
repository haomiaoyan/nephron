import { useI18n } from '../i18n';
import { useTheme } from '../theme';
import './TopBar.css';

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4L17 7M7 17l-1.6 1.6" strokeLinecap="round" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.4 8.4 0 1 0 10.2 10.2Z" strokeLinejoin="round" />
    </svg>
  );
}

export default function TopBar() {
  const { lang, setLang, t } = useI18n();
  const { theme, toggle } = useTheme();

  return (
    <header className="topbar">
      <div className="topbar__brand">
        <span className="topbar__mark">{t('brand.mark')}</span>
        <span className="topbar__sub">{t('brand.sub')}</span>
      </div>

      <div className="topbar__actions">
        <button
          type="button"
          className="topbar__btn topbar__btn--lang"
          onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
          aria-label={lang === 'zh' ? 'Switch to English' : '切换到中文'}
        >
          {t('nav.lang')}
        </button>
        <button
          type="button"
          className="topbar__btn topbar__btn--icon"
          onClick={toggle}
          aria-label={t(theme === 'dark' ? 'nav.theme.dark' : 'nav.theme.light')}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </header>
  );
}
