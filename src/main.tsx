import { createRoot } from 'react-dom/client';
import App from './App';
import { LanguageProvider } from './i18n';
import { ThemeProvider } from './theme';
import './styles/tokens.css';
import './styles/base.css';
import './rb/Particles.css';

const root = document.getElementById('root');
if (!root) throw new Error('#root not found');

createRoot(root).render(
  <ThemeProvider>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </ThemeProvider>,
);
