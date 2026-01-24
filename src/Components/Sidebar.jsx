// Components/Sidebar.jsx
// Bu bileşen, sol tarafta yer alan navigasyon menüsünü içerir

import React, { useState } from 'react' // React hooks'ları

/**
 * Sidebar Component - Sol menü çubuğu
 * 
 * Bu bileşen, uygulamanın sol tarafında yer alan navigasyon menüsünü gösterir.
 * Mobil cihazlarda açılıp kapanabilir (responsive tasarım).
 * 
 * Props (Parametreler):
 * @param {String} activeView - Şu anda aktif olan görünüm
 * @param {Function} onViewChange - Görünüm değiştiğinde çalışacak fonksiyon
 */
function Sidebar({ activeView, onViewChange }) {
  // sidebarOpen: Mobil cihazlarda menünün açık/kapalı durumunu tutar
  const [sidebarOpen, setSidebarOpen] = useState(false)

  /**
   * Menü öğeleri - Sidebar'da gösterilecek menü seçenekleri
   * Her öğe bir ikon, başlık ve görünüm adı içerir
   */
  const menuItems = [
    {
      id: 'add',
      icon: 'bi-plus-circle',
      title: 'Yeni Görev',
      description: 'Yeni görev ekle',
    },
    {
      id: 'all',
      icon: 'bi-list-ul',
      title: 'Tüm Görevler',
      description: 'Tüm görevleri görüntüle',
    },
    {
      id: 'pending',
      icon: 'bi-clock-history',
      title: 'Bekleyenler',
      description: 'Tamamlanmamış görevler',
    },
    {
      id: 'completed',
      icon: 'bi-check-circle',
      title: 'Tamamlananlar',
      description: 'Tamamlanmış görevler',
    },
    {
      id: 'stats',
      icon: 'bi-bar-chart',
      title: 'İstatistikler',
      description: 'Detaylı analizler',
    },
  ]

  /**
   * Menü öğesine tıklandığında çalışan fonksiyon
   * @param {String} viewId - Seçilen görünümün ID'si
   */
  const handleMenuClick = (viewId) => {
    onViewChange(viewId) // Görünümü değiştir
    setSidebarOpen(false) // Mobil cihazlarda menüyü kapat
  }

  return (
    <>
      {/* Mobil cihazlar için menü açma butonu */}
      <button
        className="btn btn-primary d-md-none position-fixed top-0 start-0 m-3 z-3"
        // d-md-none: Orta ekran ve üzerinde gizle (sadece mobilde görünür)
        // position-fixed: Sabit konum
        // top-0 start-0: Sol üst köşe
        // m-3: Margin (boşluk)
        // z-3: Z-index (diğer elementlerin üstünde)
        onClick={() => setSidebarOpen(!sidebarOpen)}
        // onClick: Tıklandığında menüyü aç/kapa
        style={{ zIndex: 1050 }}
        // style: Inline stil (z-index için)
      >
        <i className="bi bi-list"></i>
        {/* bi-list: Menü ikonu */}
      </button>

      {/* Mobil cihazlarda menü arka planı (overlay) */}
      {sidebarOpen && (
        // sidebarOpen true ise göster
        <div
          className="d-md-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
          // d-md-none: Sadece mobilde görünür
          // position-fixed: Sabit konum
          // w-100 h-100: Tam genişlik ve yükseklik
          // bg-dark bg-opacity-50: Koyu yarı saydam arka plan
          style={{ zIndex: 1040 }}
          onClick={() => setSidebarOpen(false)}
          // Tıklandığında menüyü kapat
        />
      )}

      {/* Sidebar menü */}
      <aside
        className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}
        // sidebar: Ana sınıf
        // sidebar-open: Açık durumda eklenen sınıf
      >
        {/* Sidebar başlığı */}
        <div className="sidebar-header">
          <div className="d-flex align-items-center mb-3">
            {/* d-flex: Flexbox düzeni */}
            {/* align-items-center: Dikey ortalama */}
            <div className="sidebar-logo">
              {/* sidebar-logo: Logo container */}
              <i className="bi bi-check2-square"></i>
              {/* bi-check2-square: Uygulama ikonu */}
            </div>
            <div className="ms-3">
              {/* ms-3: Sol boşluk */}
              <h4 className="mb-0 fw-bold text-white">Görev Yönetimi</h4>
              {/* mb-0: Alt boşluk yok */}
              {/* fw-bold: Kalın yazı */}
              <small className="text-white-50">Task Manager</small>
              {/* text-white-50: Yarı saydam beyaz */}
            </div>
          </div>
        </div>

        {/* Menü öğeleri listesi */}
        <nav className="sidebar-nav">
          {/* nav: Navigasyon elementi */}
          <ul className="list-unstyled mb-0">
            {/* list-unstyled: Liste stillerini kaldır */}
            {/* mb-0: Alt boşluk yok */}
            {menuItems.map((item) => (
              // map: Her menü öğesi için bir liste elemanı oluştur
              <li key={item.id}>
                {/* key: React'in hangi elemanın hangisi olduğunu anlaması için */}
                <button
                  className={`sidebar-item ${activeView === item.id ? 'active' : ''}`}
                  // sidebar-item: Menü öğesi stili
                  // active: Seçili öğe için eklenen sınıf
                  onClick={() => handleMenuClick(item.id)}
                  // onClick: Tıklandığında handleMenuClick çalışır
                >
                  <div className="sidebar-item-icon">
                    {/* sidebar-item-icon: İkon container */}
                    <i className={item.icon}></i>
                    {/* item.icon: Menü öğesinin ikonu */}
                  </div>
                  <div className="sidebar-item-content">
                    {/* sidebar-item-content: İçerik container */}
                    <div className="sidebar-item-title">{item.title}</div>
                    {/* sidebar-item-title: Başlık */}
                    <small className="sidebar-item-desc">{item.description}</small>
                    {/* sidebar-item-desc: Açıklama */}
                  </div>
                  {/* Eğer bu öğe aktifse ok ikonu göster - bi-chevron-right: Sağ ok ikonu */}
                  {activeView === item.id && (
                    <i className="bi bi-chevron-right sidebar-item-arrow"></i>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar footer */}
        <div className="sidebar-footer">
          {/* sidebar-footer: Alt kısım */}
          <div className="text-center text-white-50">
            {/* text-center: Metni ortala */}
            <small>
              <i className="bi bi-lightning-charge me-1"></i>
              {/* bi-lightning-charge: Şimşek ikonu */}
              React & Bootstrap
            </small>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar // Bileşeni dışa aktar

