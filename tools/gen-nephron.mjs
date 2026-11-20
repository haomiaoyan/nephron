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
  [300, 122], [268, 150], [306, 172], [242, 196], [298, 220],
  [234, 244], [290, 268], [226, 292], [272, 316], [214, 336],
];

const DESCENDING = [
  [214, 336], [206, 430], [202, 540], [202, 650], [206, 720],
];

const LOOP_TURN = [
  [206, 720], [210, 752], [240, 764], [268, 752], [272, 720],
];

const ASCENDING = [
  [272, 720], [276, 650], [278, 540], [280, 430], [284, 340],
];

const DCT = [
  [284, 340], [320, 318], [292, 296], [352, 276],
  [318, 256], [376, 238], [344, 220], [404, 206],
];

const COLLECTING = [
  [404, 206], [440, 240], [452, 320], [456, 420], [460, 600], [464, 780], [468, 980],
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
  catmullRom([[330, 58], [316, 72], [342, 86], [318, 100], [340, 112]]),
  catmullRom([[312, 66], [328, 82], [310, 96], [330, 112], [318, 120]]),
  catmullRom([[348, 68], [332, 84], [350, 98], [332, 114]]),
];

const out = `// 由 tools/gen-nephron.mjs 生成，勿手改。坐标基于 viewBox 0 0 620 1000。
export type NephronSegment = {
  d: string;
  w: number;
  tone: 'cool' | 'accent';
  delay: number;
};

export const NEPHRON_VIEWBOX = '0 0 620 1000';
export const GLOMERULUS = { cx: 330, cy: 90, r: 44 };
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
