# nephron

一个关于肾单位的滚动叙事网站。每天有 180 升液体被滤出，178.5 升被收回，1.5 升离开身体。

**线上**：https://haomiaoyan.github.io/nephron/

## 技术栈

- React 18 + TypeScript + Vite 6，无 UI 框架，样式为手写 CSS 变量
- 交互组件来自 [React Bits](https://www.reactbits.dev/)：`PillNav`（章节导航）、`RubberSegment`（语言切换）、`SquishSwitch`（明暗开关）、`GlassIcons`（GitHub 入口）、`StarBorder`（回到顶部），其余自写
- 粒子与流体示意图用 canvas 逐帧绘制，没有引入图形库
- 唯一运行时依赖：`motion`（React Bits 的两个控件需要它，约 60 kB gzip）
- 部署：GitHub Actions 构建后发布到 GitHub Pages

## 本地运行

```bash
npm ci
npm run dev      # http://localhost:5175/nephron/
npm run build    # 类型检查 + 构建到 dist/
npm run preview  # 预览生产构建
```

注意：Vite 在这台机器上只绑 `::1`，访问必须用 `localhost`，用 `127.0.0.1` 会连接被拒。

## 七屏结构

| # | 标题 | 讲什么 | 视觉 |
|---|---|---|---|
| 1 | 180 L | 每天滤过量与最终排出量 | 真实肾皮质切片（H&E）+ 巨字 |
| 2 | 三道筛子 | 内皮窗孔、基膜、裂孔膜，按粒径分流 | 粒子流 + 十万倍扫描电镜 |
| 3 | 三分之二 | 近曲小管回收 65% 的水钠 | 粒子从管腔向上拐入毛细血管 |
| 4 | 逆流倍增 | 髓袢如何在髓质筑起 300→1200 的盐梯度 | U 形管 + 浓度标尺 |
| 5 | 留还是走 | ADH 决定最后 18 升的去留（可拖动） | 竖直导管 + 滑杆 |
| 6 | 178.5 升没有离开 | 把前五屏倒过来对一次账 | 逐级递减的横条 |
| 7 | 168 与 12 | 肾脏每周 168 小时，透析每周 12 小时 | 24×7 点阵 |

## 数据来源

生理数值取自 *Guyton & Hall, Textbook of Medical Physiology*（第 14 版）：滤过率 125 mL/min、
分段重吸收比例（近曲 65% / 髓袢 15% / 远曲 10% / 集合管可变）、逆流倍增、ADH 对集合管水通透性的调节。
透析方案取自 KDOQI 指南（每周 3 次、每次 4 小时）。

第五屏的尿量与渗透压不是插值，按溶质守恒计算：每天排出约 600 mOsm，尿渗透压 = 600 ÷ 尿量。

## 图像授权

三张组织学图片均来自 Wikimedia Commons，采用 **CC BY-SA 3.0**：

| 文件 | 内容 | 作者 | 来源 |
|---|---|---|---|
| `src/assets/cortex-hx.webp` | 人肾皮质 H&E，中央为肾小球 | Nephron | [File:Benign kidney -- intermed mag.jpg](https://commons.wikimedia.org/wiki/File:Benign_kidney_--_intermed_mag.jpg) |
| `src/assets/fenestrae-sem.webp` | 肾小球毛细血管窗孔，扫描电镜 ×100,000 | SecretDisc | [File:Inner view of fenestrae…](https://commons.wikimedia.org/wiki/File:Inner_view_of_fenestrae_in_capillary_of_glomerulus_in_Scanning_Electron_Microscope,_magnification_100,000x.GIF) |
| `src/assets/kidney-band.webp` | 肾组织全景，皮质与髓质交界 | Nephron | [File:Benign kidney -- very low mag.jpg](https://commons.wikimedia.org/wiki/File:Benign_kidney_--_very_low_mag.jpg) |

署名同时出现在页面页脚。使用这些图片的衍生版本需遵守同样的 CC BY-SA 3.0 条款；
这不影响本项目其余代码。

## 目录

```
src/
├─ sections/        七个屏，一个屏一个文件；NephronFlow 是首屏曾用过的解剖线稿（现未启用）
├─ rb/              React Bits 组件源码（拷贝入仓，非 npm 依赖）
├─ components/      TopBar、Reveal（滚动揭示）、ScrollProgress、BackToTop
├─ i18n/            中英文案字典与 Context
├─ styles/          tokens.css（双主题变量）、base.css
└─ assets/          三张压缩后的 WebP
```

## 已知取舍

- 中英文案写在同一个字典里，切换不重载页面；首屏排版按较长的英文定尺寸，中文因此更透气
- 深色为默认主题，浅色是"阅读模式"，两者观感差异较大（浅色更接近图谱扉页）
- 手机端首屏把切片放在上方 38%，文字完全落在深底上；桌面端是左右分屏
- 首屏切片的极慢推近（42 秒）在 `prefers-reduced-motion` 下自动关闭
- 页面用了较多等宽字体与细分隔线，这是"仪器面板"的有意选择，不是遗漏

## 部署

推送到 `main` 即触发 `.github/workflows/deploy.yml`，构建后发布到 Pages。
首次启用需在仓库 Settings → Pages 将 Source 设为 **GitHub Actions**。

`vite.config.ts` 里的 `base: '/nephron/'` 与仓库名绑定，改仓库名必须同步修改。
