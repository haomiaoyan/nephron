import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

export const dict = {
  zh: {
    'brand.mark': 'NEPHRON',
    'brand.sub': '肾单位',
    'nav.lang': 'EN',
    'nav.top': '回到顶部',
    'nav.theme.dark': '切换到浅色',
    'nav.theme.light': '切换到深色',
    'nav.label': '章节导航',
    'nav.s1': '180 L',
    'nav.s2': '肾小球',
    'nav.s3': '近曲小管',
    'nav.s4': '髓袢',
    'nav.s5': '集合管',
    'nav.s6': '总账',
    'nav.s7': '尾声',

    'hero.eyebrow': '肾单位 · 一次过滤的全部过程',
    'hero.unit': 'L',
    'hero.lede': '每天，两个肾脏从血液里滤出 180 升液体。最后离开身体的，只有 1.5 升。',
    'hero.fact1.label': '每侧肾脏的肾单位',
    'hero.fact2.label': '静息时的心输出量占比',
    'hero.fact3.label': '被重新吸收回血液',
    'hero.scroll': '向下滚动',
    'hero.specimen': '肾皮质 · H&E 染色',
    'hero.photoAlt': '人肾皮质 H&E 染色显微照片，中央为一个肾小球，周围是密集的肾小管',
    'hero.idx1': '肾小球',
    'hero.idx2': '近曲小管',
    'hero.idx3': '髓袢',
    'hero.idx4': '集合管',

    's2.kicker': '01 · 肾小球',
    's2.title': '三道筛子',
    's2.lede':
      '血浆被压过三层膜。血细胞卡在第一层，白蛋白卡在第二层，水、钠和葡萄糖几乎不受阻碍地通过。',
    's2.l1name': '毛细血管内皮',
    's2.l1spec': '窗孔 70–100 nm',
    's2.l2name': '基膜',
    's2.l2spec': '厚 300–350 nm',
    's2.l3name': '足细胞裂孔膜',
    's2.l3spec': '裂隙 30–40 nm',
    's2.s1l': '每分钟滤过（mL）',
    's2.s2l': '滤过分数',
    's2.s3l': '每天全血浆被滤过的次数',
    's2.semChip': '扫描电镜 ×100,000',
    's2.semCaption': '肾小球毛细血管内皮上的窗孔。血浆从这里流过，血细胞被挡在外面。',

    's3.kicker': '02 · 近曲小管',
    's3.title': '三分之二',
    's3.lede':
      '这一段不做排出，只做捡回。钠被泵出细胞，水跟着钠走——65% 的滤液在这里回到血液，葡萄糖几乎全部被截下。',
    's3.lane1': '管周毛细血管',
    's3.lane2': '肾小管管腔',
    's3.s1l': '滤过的水和钠在此回收',
    's3.s2l': '每天回收的液体',
    's3.s3l': '刷状缘使顶膜面积增大',

    's4.kicker': '03 · 髓袢',
    's4.title': '逆流倍增',
    's4.lede':
      '下降支只出水、不出盐，里面的液体越走越浓；上升支只泵盐、不出水，越走越稀。两根管子反向并排，把髓质越压越咸。',
    's4.desc': '下降支',
    's4.descSpec': '只透水',
    's4.asc': '上升支',
    's4.ascSpec': '只泵盐',
    's4.cortex': '皮质',
    's4.medulla': '髓质',
    's4.s1l': '皮质到髓质尖端的浓度倍数',
    's4.s2l': '髓质最深处（mOsm/kg）',
    's4.s3l': '离开髓袢时（mOsm/kg）',

    's5.kicker': '04 · 集合管',
    's5.title': '留还是走',
    's5.lede':
      '前四段都是确定的。到了这里，同一根管子、同一根盐梯度，只因为 ADH 的高低，出去的尿可以是 18 升，也可以是半升。',
    's5.slider': 'ADH 水平',
    's5.low': '低',
    's5.high': '高',
    's5.hint': '拖动滑杆',
    's5.m1': '尿量（L/日）',
    's5.m2': '尿渗透压（mOsm/kg）',
    's5.m3': '回到血液的水（L/日）',

    's6.kicker': '05 · 总账',
    's6.title': '178.5 升没有离开',
    's6.lede':
      '把前面五屏倒过来算一遍：180 升被滤出，178.5 升在各段被收回，只有 1.5 升真的离开了身体。',
    's6.r1': '滤过（肾小球）',
    's6.r2': '离开近曲小管',
    's6.r3': '离开髓袢',
    's6.r4': '离开远曲小管',
    's6.r5': '终尿',
    's6.d1': '近曲小管回收',
    's6.d2': '髓袢回收',
    's6.d3': '远曲小管回收',
    's6.d4': '集合管回收',
    's6.s1l': '回收比例',
    's6.s2l': '最终排出',
    's6.s3l': '占滤过量的比例',
    's6.closing': '这道减法每分钟都在做。读到这里，它已经又做了几百次。',

    's7.kicker': '06 · 尾声',
    's7.title': '168 与 12',
    's7.lede':
      '这台回收机从不休息。它每天 24 小时、每周 168 小时，把 178.5 升水钠一升一升地捡回血液。当它停下，机器每周替你工作 12 小时。',
    's7.legend1': '肾脏 · 每周 168 小时',
    's7.legend2': '血液透析 · 每周 12 小时',
    's7.s1l': '肾脏工作（小时/周）',
    's7.s2l': '透析（3 次 × 4 小时）',
    's7.s3l': '相差倍数',
    's7.quote': '它不请假。||也从不提醒你，它在工作。',
    's7.srcLabel': '数据来源',
    's7.credit': '图像：Nephron、SecretDisc，CC BY-SA 3.0，via Wikimedia Commons',
    's7.bandAlt': '人肾组织切片全景，可看到皮质与髓质的交界',
    's7.bandCaption': '肾组织 · 皮质与髓质交界',
    's7.src':
      'Guyton & Hall《医学生理学》第 14 版（滤过、分段重吸收、逆流倍增、ADH）；KDOQI 血液透析指南（每周 3 次、每次 4 小时）。',
  },
  en: {
    'brand.mark': 'NEPHRON',
    'brand.sub': 'the filtering unit',
    'nav.lang': '中文',
    'nav.top': 'Back to top',
    'nav.theme.dark': 'Switch to light',
    'nav.theme.light': 'Switch to dark',
    'nav.label': 'Sections',
    'nav.s1': '180 L',
    'nav.s2': 'Glomerulus',
    'nav.s3': 'Proximal',
    'nav.s4': 'Loop',
    'nav.s5': 'Duct',
    'nav.s6': 'Ledger',
    'nav.s7': 'Epilogue',

    'hero.eyebrow': 'Nephron · the full path of one filtration',
    'hero.unit': 'L',
    'hero.lede':
      'Every day your two kidneys filter 180 litres of fluid out of the blood. Only 1.5 litres leave the body.',
    'hero.fact1.label': 'Nephrons per kidney',
    'hero.fact2.label': 'of resting cardiac output',
    'hero.fact3.label': 'Reabsorbed into the blood',
    'hero.scroll': 'Scroll',
    'hero.specimen': 'Renal cortex · H&E stain',
    'hero.photoAlt': 'Micrograph of human renal cortex stained with H&E: a glomerulus in the centre, surrounded by tubules',
    'hero.idx1': 'Glomerulus',
    'hero.idx2': 'Proximal tubule',
    'hero.idx3': 'Loop of Henle',
    'hero.idx4': 'Collecting duct',

    's2.kicker': '01 · Glomerulus',
    's2.title': 'Three sieves',
    's2.lede':
      'Plasma is forced through three layers. Blood cells stop at the first, albumin at the second, while water, sodium and glucose pass almost untouched.',
    's2.l1name': 'Fenestrated endothelium',
    's2.l1spec': 'pores 70–100 nm',
    's2.l2name': 'Basement membrane',
    's2.l2spec': '300–350 nm thick',
    's2.l3name': 'Slit diaphragm',
    's2.l3spec': 'gaps 30–40 nm',
    's2.s1l': 'Filtered per minute (mL)',
    's2.s2l': 'Filtration fraction',
    's2.s3l': 'Plasma volume filtered per day',
    's2.semChip': 'Scanning EM ×100,000',
    's2.semCaption': 'Fenestrae in the endothelium of a glomerular capillary. Plasma passes through; blood cells do not.',

    's3.kicker': '02 · Proximal tubule',
    's3.title': 'Two-thirds',
    's3.lede':
      'This segment does not excrete — it takes back. Sodium is pumped out of the cell, water follows it, and 65% of the filtrate returns to the blood. Almost all of the glucose is recovered here too.',
    's3.lane1': 'Peritubular capillary',
    's3.lane2': 'Tubule lumen',
    's3.s1l': 'of filtered water and sodium reclaimed',
    's3.s2l': 'Litres reclaimed per day',
    's3.s3l': 'Brush-border surface amplification',

    's4.kicker': '03 · Loop of Henle',
    's4.title': 'Countercurrent multiplier',
    's4.lede':
      'The descending limb lets water out but not salt, so its contents grow more concentrated. The ascending limb pumps salt out but keeps water in, so it grows dilute. Two tubes running opposite ways press the medulla saltier with every pass.',
    's4.desc': 'Descending',
    's4.descSpec': 'water only',
    's4.asc': 'Ascending',
    's4.ascSpec': 'salt only',
    's4.cortex': 'Cortex',
    's4.medulla': 'Medulla',
    's4.s1l': 'Cortex to papilla concentration ratio',
    's4.s2l': 'At the papilla (mOsm/kg)',
    's4.s3l': 'Leaving the loop (mOsm/kg)',

    's5.kicker': '04 · Collecting duct',
    's5.title': 'Stay, or go',
    's5.lede':
      'The first four segments are deterministic. Here, with the same tube and the same salt gradient, ADH alone decides whether you pass 18 litres or half a litre.',
    's5.slider': 'ADH level',
    's5.low': 'low',
    's5.high': 'high',
    's5.hint': 'drag the slider',
    's5.m1': 'Urine volume (L/day)',
    's5.m2': 'Urine osmolarity (mOsm/kg)',
    's5.m3': 'Water returned to blood (L/day)',

    's6.kicker': '05 · The ledger',
    's6.title': '178.5 litres stayed',
    's6.lede':
      'Run the first five screens backwards: 180 litres filtered in, 178.5 reclaimed along the way, and 1.5 litres that actually left the body.',
    's6.r1': 'Filtered (glomerulus)',
    's6.r2': 'Leaving the proximal tubule',
    's6.r3': 'Leaving the loop of Henle',
    's6.r4': 'Leaving the distal tubule',
    's6.r5': 'Final urine',
    's6.d1': 'Reclaimed in the proximal tubule',
    's6.d2': 'Reclaimed in the loop of Henle',
    's6.d3': 'Reclaimed in the distal tubule',
    's6.d4': 'Reclaimed in the collecting duct',
    's6.s1l': 'Reclaimed',
    's6.s2l': 'Excreted',
    's6.s3l': 'Share of the filtered volume',
    's6.closing': 'The subtraction happens every minute. By the time you reach this line, it has run a few hundred more times.',

    's7.kicker': '06 · Epilogue',
    's7.title': '168 and 12',
    's7.lede':
      'This machine never stops. Twenty-four hours a day, 168 hours a week, it takes back 178.5 litres of water and sodium one litre at a time. When it fails, another machine does 12 hours a week for you.',
    's7.legend1': 'Kidney · 168 hours a week',
    's7.legend2': 'Haemodialysis · 12 hours a week',
    's7.s1l': 'Kidney hours per week',
    's7.s2l': 'Dialysis (3 × 4 hours)',
    's7.s3l': 'Ratio',
    's7.quote': 'It never takes a day off.||It never tells you it is working.',
    's7.srcLabel': 'Sources',
    's7.credit': 'Images: Nephron, SecretDisc, CC BY-SA 3.0, via Wikimedia Commons',
    's7.bandAlt': 'Overview of human kidney tissue showing the cortex-medulla junction',
    's7.bandCaption': 'Kidney tissue · cortex and medulla',
    's7.src':
      'Guyton & Hall, Textbook of Medical Physiology, 14th ed. (filtration, segmental reabsorption, countercurrent multiplication, ADH); KDOQI haemodialysis guidelines (3 sessions × 4 hours).',
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
