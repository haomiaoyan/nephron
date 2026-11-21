import RubberSegment from '../rb/RubberSegment';
import SquishSwitch from '../rb/SquishSwitch';
import GlassIcons from '../rb/GlassIcons';
import { useI18n } from '../i18n';
import { useTheme } from '../theme';
import './TopBar.css';

const REPO = 'https://github.com/haomiaoyan/nephron';

const SEG_COLORS = {
  dark: { track: '#15181c', thumb: '#f4f6f8', text: '#8b93a1', active: '#08090b' },
  light: { track: '#edeae5', thumb: '#111315', text: '#6b7280', active: '#fbfaf8' },
};

function GithubMark() {
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.4 7.4 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

export default function TopBar() {
  const { lang, setLang, t } = useI18n();
  const { theme, toggle } = useTheme();
  const c = SEG_COLORS[theme];

  return (
    <header className="topbar">
      <div className="topbar__brand">
        <span className="topbar__mark">{t('brand.mark')}</span>
        <span className="topbar__sub">{t('brand.sub')}</span>
      </div>

      <div className="topbar__actions">
        <RubberSegment
          className="topbar__seg"
          items={[
            { value: 'zh', label: '中文' },
            { value: 'en', label: 'EN' },
          ]}
          value={lang}
          onChange={(v) => setLang(v === 'en' ? 'en' : 'zh')}
          size="sm"
          radius={999}
          trackColor={c.track}
          thumbColor={c.thumb}
          textColor={c.text}
          activeTextColor={c.active}
        />

        <SquishSwitch
          checked={theme === 'dark'}
          onChange={toggle}
          width={42}
          height={24}
          trackColor={theme === 'dark' ? '#262b33' : '#e4e1db'}
          trackOnColor={theme === 'dark' ? '#262b33' : '#e4e1db'}
          thumbColor={theme === 'dark' ? '#f4f6f8' : '#111315'}
          thumbOnColor={theme === 'dark' ? '#f4f6f8' : '#111315'}
          ariaLabel={t(theme === 'dark' ? 'nav.theme.dark' : 'nav.theme.light')}
        />

        <GlassIcons
          className="topbar__gh"
          items={[
            {
              icon: <GithubMark />,
              label: 'GitHub',
              color: theme === 'dark' ? '#2b313a' : '#eae6e0',
              href: REPO,
              target: '_blank',
            },
          ]}
          size={34}
          columns={1}
          roundness={100}
          labels="none"
          iconColor={theme === 'dark' ? '#dce3ea' : '#1b1f26'}
          frost={0.4}
          plate="circle"
        />
      </div>
    </header>
  );
}
