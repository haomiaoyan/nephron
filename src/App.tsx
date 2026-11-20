import TopBar from './components/TopBar';
import Hero from './sections/Hero';
import Filtration from './sections/Filtration';

export default function App() {
  return (
    <>
      <TopBar />
      <main>
        <Hero />
        <Filtration />
      </main>
    </>
  );
}
