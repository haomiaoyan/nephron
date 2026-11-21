import { useEffect, useState } from 'react';
import PillNav from '../rb/PillNav';
import RubberSegment from '../rb/RubberSegment';
import SquishSwitch from '../rb/SquishSwitch';
import { useI18n } from '../i18n';
import { useTheme } from '../theme';
import { useActiveSection, useMaxWidth } from '../hooks/useActiveSection';
import './TopBar.css';

const SECTIONS = [
  { id: 's-hero', key: 'nav.s1' },
  { id: 's-filtration', key: 'nav.s2' },
  { id: 's-proximal', key: 'nav.s3' },
  { id: 's-loop', key: 'nav.s4' },
  { id: 's-duct', key: 'nav.s5' },
  { id: 's-ledger', key: 'nav.s6' },
  { id: 's-epilogue', key: 'nav.s7' },
] as const;

const SECTION_IDS = SECTIONS.map((s) => s.id);

const SEG_COLORS = {
  dark: { track: '#15181c', thumb: '#f4f6f8', text: '#8b93a1', active: '#08090b' },
  light: { track: '#edeae5', thumb: '#111315', text: '#6b7280', active: '#fbfaf8' },
};

const NAV_COLORS = {
  dark: { text: '#9aa3af', pill: '#2f3741', ink: '#f7f9fb' },
  light: { text: '#5b6472', pill: '#d6d0c4', ink: '#0f1114' },
};

/** 只在跨过阈值时更新，避免每帧 setState。 */
function useScrolled(threshold = 12) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      setScrolled(window.scrollY > threshold);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, [threshold]);

  return scrolled;
}

export default function TopBar() {
  const { lang, setLang, t } = useI18n();
  const { theme, toggle } = useTheme();
  const c = SEG_COLORS[theme];
  const nav = NAV_COLORS[theme];

  const active = useActiveSection(SECTION_IDS);
  // 窄于 1080px 时不放章节导航：中文导航约 440px、右侧控件约 250px，
  // 再窄就会和控件撞上；折叠成汉堡后面板只有按钮那么宽，反而不可用。
  const hideNav = useMaxWidth(1080);
  const scrolled = useScrolled();

  return (
    <header className="topbar" data-scrolled={scrolled ? '' : undefined}>
      <div className="topbar__brand">
        <span className="topbar__mark">{t('brand.mark')}</span>
        <span className="topbar__sub">{t('brand.sub')}</span>
      </div>

      {!hideNav && (
        <PillNav
          className="topbar__nav"
          items={SECTIONS.map((s) => ({ label: t(s.key), href: `#${s.id}` }))}
          activeHref={`#${active}`}
          theme={theme}
          size="sm"
          layout="joined"
          surface="none"
          itemStyle="plain"
          hoverEffect="glide"
          indicator="pill"
          textColor={nav.text}
          highlightColor={nav.pill}
          highlightTextColor={nav.ink}
          collapse="never"
          intro={false}
          ariaLabel={t('nav.label')}
        />
      )}

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
      </div>
    </header>
  );
}
