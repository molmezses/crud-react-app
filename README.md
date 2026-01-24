# CRUD Uygulaması - React & Bootstrap

Modern web teknolojileri kullanılarak geliştirilmiş bir görev yönetim uygulaması.

## 🚀 Özellikler

- ✅ **CREATE (Ekleme)**: Yeni görev ekleme
- 📋 **READ (Okuma)**: Görevleri listeleme
- ✏️ **UPDATE (Güncelleme)**: Mevcut görevleri düzenleme
- 🗑️ **DELETE (Silme)**: Görevleri silme
- 💾 **LocalStorage**: Veriler tarayıcıda saklanır
- 🎨 **Modern Tasarım**: Bootstrap 5 ile responsive tasarım
- 📊 **İstatistikler**: Toplam, tamamlanan ve bekleyen görev sayıları

## 📁 Proje Yapısı

```
Crud/
├── src/
│   ├── Components/          # Yeniden kullanılabilir bileşenler
│   │   ├── TaskForm.jsx     # Görev ekleme/düzenleme formu
│   │   ├── TaskItem.jsx     # Tek bir görev kartı
│   │   └── TaskList.jsx     # Görev listesi
│   ├── Pages/               # Sayfa bileşenleri
│   │   └── HomePage.jsx     # Ana sayfa (CRUD işlemleri)
│   ├── Interfaces/          # Veri yapıları ve tip tanımlamaları
│   │   └── TaskInterface.js # Görev veri yapısı
│   ├── App.jsx              # Ana uygulama bileşeni
│   ├── App.css              # App stilleri
│   ├── main.jsx             # React giriş noktası
│   └── index.css            # Global stiller
├── index.html               # HTML şablonu
├── package.json             # Proje bağımlılıkları
├── vite.config.js           # Vite yapılandırması
└── README.md               # Bu dosya
```

## 🏗️ Klasör Yapısı Açıklaması

### Components Klasörü
**Neden var?**
- Yeniden kullanılabilir kod parçaları
- Her bileşen kendi sorumluluğuna sahip
- Kod organizasyonu ve bakım kolaylığı
- Test edilebilirlik

**İçindekiler:**
- `TaskForm.jsx`: Görev ekleme ve düzenleme formu
- `TaskItem.jsx`: Tek bir görevin gösterimi
- `TaskList.jsx`: Tüm görevlerin listesi

### Pages Klasörü
**Neden var?**
- Sayfa bazlı organizasyon
- Routing yönetimi
- Büyük uygulamalarda yapısal düzen
- Sayfa mantığı ile bileşen mantığının ayrılması

**İçindekiler:**
- `HomePage.jsx`: Ana sayfa, tüm CRUD işlemlerini yönetir

### Interfaces Klasörü
**Neden var?**
- Veri yapılarının tanımlanması
- Tip güvenliği
- Kod dokümantasyonu
- Hata önleme

**İçindekiler:**
- `TaskInterface.js`: Görev veri yapısı ve validasyon fonksiyonları

## 🛠️ Kurulum

1. **Bağımlılıkları yükleyin:**
```bash
npm install
```

2. **Geliştirme sunucusunu başlatın:**
```bash
npm run dev
```

3. **Tarayıcıda açın:**
```
http://localhost:5173
```

## 📦 Kullanılan Teknolojiler

- **React 18**: Modern UI kütüphanesi
- **Vite**: Hızlı build tool
- **Bootstrap 5**: CSS framework
- **React Router**: Sayfa yönlendirme
- **LocalStorage**: Veri saklama

## 🎯 CRUD İşlemleri

### CREATE (Ekleme)
- Form ile yeni görev ekleme
- Başlık ve açıklama alanları
- Validasyon kontrolü

### READ (Okuma)
- Tüm görevleri listeleme
- İstatistikler (toplam, tamamlanan, bekleyen)
- Tarih bilgileri

### UPDATE (Güncelleme)
- Mevcut görevi düzenleme
- Form otomatik doldurma
- Güncelleme onayı

### DELETE (Silme)
- Görev silme
- Silme onayı
- Anında güncelleme

## 💡 Kod Açıklamaları

Tüm kod dosyaları detaylı Türkçe açıklamalarla yazılmıştır. Her fonksiyon, değişken ve bileşen için açıklayıcı yorumlar eklenmiştir.

## 📝 Lisans

Bu proje eğitim amaçlı geliştirilmiştir.




