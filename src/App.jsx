// App.jsx - Ana uygulama bileşeni
// Bu bileşen, tüm uygulamanın ana container'ıdır

import React from 'react' // React kütüphanesini import ediyoruz
import { BrowserRouter, Routes, Route } from 'react-router-dom' // Routing için
import HomePage from './Pages/HomePage' // Ana sayfa bileşeni
import './App.css' // App bileşeni için özel stiller

/**
 * App Component - Ana uygulama bileşeni
 * BrowserRouter: React Router'ın temel bileşeni, URL yönetimi için
 * Routes: Farklı URL'ler için route tanımlamaları
 * Route: Her bir sayfa için route tanımı
 */
function App() {
  return (
    <BrowserRouter>
      {/* BrowserRouter - Tarayıcı geçmişini yönetir, URL değişikliklerini dinler */}
      <div className="App">
        <Routes>
          {/* Routes - Tüm route tanımlamalarını içerir */}
          <Route path="/" element={<HomePage />} />
          {/* Route - "/" URL'si için HomePage bileşenini gösterir */}
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App // App bileşenini dışa aktarıyoruz (başka dosyalarda kullanmak için)




