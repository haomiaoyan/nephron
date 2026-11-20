import TopBar from './components/TopBar';
import Hero from './sections/Hero';
import Filtration from './sections/Filtration';
import Proximal from './sections/Proximal';

export default function App() {
  return (
    <>
      <TopBar />
      <main>
        <Hero />
        <Filtration />
        <Proximal />
      </main>
    </>
  );
}
