import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/space-grotesk';
import '@fontsource-variable/inter';
import '@fontsource-variable/jetbrains-mono';
import 'lenis/dist/lenis.css';
import './styles/tokens.css';
import './styles/base.css';
import App from './App';

console.log(
  '%cHi there. %cCurious how this was built? React, TypeScript, plain CSS and one hand-written canvas. Say hello: zayy.cloudd@gmail.com',
  'color:#9b7bff;font-weight:600;font-size:14px',
  'color:inherit',
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
