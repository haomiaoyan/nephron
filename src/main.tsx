import { createRoot } from 'react-dom/client';
import App from './App';
import { LanguageProvider } from './i18n';
import { ThemeProvider } from './theme';
import './styles/fonts.css';
import './styles/tokens.css';
import './styles/base.css';

const root = document.getElementById('root');
if (!root) throw new Error('#root not found');

createRoot(root).render(
  <ThemeProvider>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </ThemeProvider>,
);
