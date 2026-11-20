import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

export const dict = {
  zh: {
    'brand.mark': 'NEPHRON',
    'brand.sub': '肾单位',
    'nav.lang': 'EN',
    'nav.theme.dark': '切换到浅色',
    'nav.theme.light': '切换到深色',

    'hero.eyebrow': '肾单位 · 一次过滤的全部过程',
    'hero.unit': 'L',
    'hero.lede': '每天，两个肾脏从血液里滤出 180 升液体。最后离开身体的，只有 1.5 升。',
    'hero.fact1.label': '每侧肾脏的肾单位',
    'hero.fact2.label': '静息时的心输出量占比',
    'hero.fact3.label': '被重新吸收回血液',
    'hero.scroll': '向下滚动',
    'hero.idx1': '肾小球',
    'hero.idx2': '近曲小管',
    'hero.idx3': '髓袢',
    'hero.idx4': '集合管',
  },
  en: {
    'brand.mark': 'NEPHRON',
    'brand.sub': 'the filtering unit',
    'nav.lang': '中文',
    'nav.theme.dark': 'Switch to light',
    'nav.theme.light': 'Switch to dark',

    'hero.eyebrow': 'Nephron · the full path of one filtration',
    'hero.unit': 'L',
    'hero.lede':
      'Every day your two kidneys filter 180 litres of fluid out of the blood. Only 1.5 litres leave the body.',
    'hero.fact1.label': 'Nephrons per kidney',
    'hero.fact2.label': 'of resting cardiac output',
    'hero.fact3.label': 'Reabsorbed into the blood',
    'hero.scroll': 'Scroll',
    'hero.idx1': 'Glomerulus',
    'hero.idx2': 'Proximal tubule',
    'hero.idx3': 'Loop of Henle',
    'hero.idx4': 'Collecting duct',
  },
} as const;

export type Lang = keyof typeof dict;
export type DictKey = keyof (typeof dict)['zh'];

const STORAGE_KEY = 'nephron:lang';

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: DictKey) => string;
};

const LanguageContext = createContext<Ctx | null>(null);

function read(): Lang {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === 'zh' || v === 'en') return v;
  } catch {
    /* ignore */
  }
  return 'zh';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(read);

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      t: (k) => dict[lang][k],
    }),
    [lang, setLang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n(): Ctx {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useI18n must be used inside LanguageProvider');
  return ctx;
}
