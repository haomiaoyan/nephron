import TopBar from './components/TopBar';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import Hero from './sections/Hero';
import Filtration from './sections/Filtration';
import Proximal from './sections/Proximal';
import LoopOfHenle from './sections/LoopOfHenle';
import CollectingDuct from './sections/CollectingDuct';

export default function App() {
  return (
    <>
      <ScrollProgress />
      <TopBar />
      <main>
        <Hero />
        <Filtration />
        <Proximal />
        <LoopOfHenle />
        <CollectingDuct />
      </main>
      <BackToTop />
    </>
  );
}
