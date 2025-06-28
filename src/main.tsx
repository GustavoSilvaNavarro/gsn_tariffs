import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ClientApp } from './ClientApp';
import './index.css';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ClientApp />
  </StrictMode>,
);
