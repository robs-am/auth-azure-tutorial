import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './authConfig';

const msalInstance = new PublicClientApplication(msalConfig);



// Aguarde o handleRedirectPromise para redirecionamentos.
msalInstance.handleRedirectPromise().then((response) => {
  if (response) {
    console.log("Redirect Response:", response);
  }
}).catch((error) => {
  console.error("Redirect Error:", error);
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  </StrictMode>,
);
