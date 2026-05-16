import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import axios from 'axios';

// Ngrok'un ücretsiz sürüm uyarı sayfasını atlamak için gereken şifre (Header)
axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'true';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);