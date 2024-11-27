import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { App } from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster 
      position="top-right"
      toastOptions={{
        className: 'bg-mistGray border border-moonlitSilver/10 text-lunarWhite',
        duration: 4000,
        style: {
          background: 'rgba(44, 47, 51, 0.9)',
          color: '#F9FAFB',
          backdropFilter: 'blur(8px)',
        },
      }}
    />
  </StrictMode>
);