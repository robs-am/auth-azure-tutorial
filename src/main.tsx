import { StrictMode } from 'react';
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig";
import './index.css';

const msalInstance = new PublicClientApplication(msalConfig);

import { createRoot } from 'react-dom/client'
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  </StrictMode>
)
