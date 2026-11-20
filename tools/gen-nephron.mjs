import fs from 'node:fs';

const r1 = (n) => Math.round(n * 10) / 10;

function catmullRom(points) {
  const p = points;
  let d = `M ${r1(p[0][0])} ${r1(p[0][1])}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] || p[i];
    const p1 = p[i];
    const p2 = p[i + 1];
    const p3 = p[i + 2] || p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${r1(c1x)} ${r1(c1y)} ${r1(c2x)} ${r1(c2y)} ${r1(p2[0])} ${r1(p2[1])}`;
  }
  return d;
}

const PCT = [
  [188, 136], [238, 116], [288, 148], [238, 180], [298, 204],
  [242, 236], [302, 262], [246, 294], [300, 320],
];

const DESCENDING = [
  [300, 320], [300, 420], [302, 510], [306, 582],
];

const LOOP_TURN = [
  [306, 582], [314, 622], [360, 636], [404, 622], [410, 582],
];

const ASCENDING = [
  [410, 582], [414, 500], [416, 420], [418, 330],
];

const DCT = [
  [418, 330], [452, 306], [418, 278], [474, 254], [432, 230], [494, 212],
];

const COLLECTING = [
  [494, 212], [518, 252], [524, 330], [528, 450], [532, 650], [536, 850], [540, 980],
];

const segments = [
  { d: catmullRom(PCT), w: 4.2, tone: 'cool', delay: 0 },
  { d: catmullRom(DESCENDING), w: 2.4, tone: 'cool', delay: 0.3 },
  { d: catmullRom(LOOP_TURN), w: 2.6, tone: 'cool', delay: 0.48 },
  { d: catmullRom(ASCENDING), w: 6.6, tone: 'cool', delay: 0.58 },
  { d: catmullRom(DCT), w: 4.2, tone: 'cool', delay: 0.92 },
  { d: catmullRom(COLLECTING), w: 5.6, tone: 'accent', delay: 1.18 },
];

const tufts = [
  catmullRom([[150, 76], [136, 90], [162, 104], [138, 118], [160, 130]]),
  catmullRom([[132, 84], [148, 100], [130, 114], [150, 130], [138, 138]]),
  catmullRom([[168, 86], [152, 102], [170, 116], [150, 132]]),
];

const out = `// 由 tools/gen-nephron.mjs 生成，勿手改。坐标基于 viewBox 0 0 620 1000。
export type NephronSegment = {
  d: string;
  w: number;
  tone: 'cool' | 'accent';
  delay: number;
};

export const NEPHRON_VIEWBOX = '0 0 620 1000';
export const GLOMERULUS = { cx: 150, cy: 108, r: 44 };
export const TUFT_PATHS = [
${tufts.map((t) => `  '${t}',`).join('\n')}
];

export const NEPHRON_SEGMENTS: NephronSegment[] = [
${segments
  .map((s) => `  { d: '${s.d}', w: ${s.w}, tone: '${s.tone}', delay: ${s.delay} },`)
  .join('\n')}
];
`;

const target = 'D:/ai项目（自用）/nephron/src/sections/nephron-path.ts';
fs.writeFileSync(target, out, 'utf8');
console.log('wrote', target, out.length, 'chars', segments.length, 'segments');
