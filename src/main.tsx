import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { WalletProvider } from './components/WalletProvider';
import { TokenProvider } from './context/TokenContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <WalletProvider>
        <TokenProvider>
          <App />
        </TokenProvider>
      </WalletProvider>
    </BrowserRouter>
  </React.StrictMode>
);
