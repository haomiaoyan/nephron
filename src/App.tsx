import TopBar from './components/TopBar';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import { useI18n } from './i18n';
import Hero from './sections/Hero';
import Filtration from './sections/Filtration';
import Proximal from './sections/Proximal';
import LoopOfHenle from './sections/LoopOfHenle';
import CollectingDuct from './sections/CollectingDuct';
import FinalLedger from './sections/FinalLedger';
import Epilogue from './sections/Epilogue';

export default function App() {
  const { t } = useI18n();

  return (
    <>
      {/* 键盘用户进正文前要先跳过 10 个顶栏目标 */}
      <a className="skip-link" href="#s-hero">
        {t('a11y.skip')}
      </a>
      <ScrollProgress />
      <TopBar />
      <main>
        <Hero />
        <Filtration />
        <Proximal />
        <LoopOfHenle />
        <CollectingDuct />
        <FinalLedger />
        <Epilogue />
      </main>
      <BackToTop />
    </>
  );
}
