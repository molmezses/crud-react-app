// main.jsx - React uygulamasının giriş noktası
// Bu dosya, React uygulamasını HTML sayfasına bağlar

import React from 'react' // React kütüphanesini import ediyoruz
import ReactDOM from 'react-dom/client' // ReactDOM - React'i DOM'a render etmek için
import App from './App.jsx' // Ana uygulama bileşenimiz
import './index.css' // Global CSS stilleri

// React 18'de yeni yöntem: createRoot kullanarak root oluşturuyoruz
// getElementById('root') - index.html'deki root div'ini buluyoruz
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* StrictMode - Geliştirme sırasında hataları bulmaya yardımcı olur */}
    <App />
  </React.StrictMode>,
)




