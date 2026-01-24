// Components/TaskForm.jsx
// Bu bileşen, yeni görev eklemek veya mevcut görevi düzenlemek için form içerir

import React, { useState, useEffect } from 'react' // React hooks'ları
// useState: Bileşen içinde değişken tutmak için
// useEffect: Bileşen yüklendiğinde veya değişkenler değiştiğinde çalışacak kodlar için

/**
 * TaskForm Component - Görev ekleme/düzenleme formu
 * 
 * NEDEN COMPONENTS KLASÖRÜNE İHTİYACIMIZ VAR?
 * 
 * 1. Yeniden Kullanılabilirlik: Aynı bileşeni farklı yerlerde kullanabiliriz
 * 2. Kod Organizasyonu: Her bileşen kendi dosyasında, daha düzenli kod
 * 3. Bakım Kolaylığı: Bir bileşende hata varsa sadece o dosyaya bakmamız yeterli
 * 4. Test Edilebilirlik: Her bileşeni ayrı ayrı test edebiliriz
 * 5. Ekip Çalışması: Farklı kişiler farklı bileşenler üzerinde çalışabilir
 * 
 * Props (Parametreler):
 * @param {Object} task - Düzenlenecek görev (varsa)
 * @param {Function} onSubmit - Form gönderildiğinde çalışacak fonksiyon
 * @param {Function} onCancel - İptal butonuna tıklandığında çalışacak fonksiyon
 */
function TaskForm({ task = null, onSubmit, onCancel }) {
  // Form verilerini tutmak için state (durum) tanımlıyoruz
  // useState hook'u ile bileşen içinde değişken tutabiliyoruz
  const [formData, setFormData] = useState({
    title: '', // Görev başlığı
    description: '', // Görev açıklaması
  })

  // useEffect: Bileşen yüklendiğinde veya 'task' değiştiğinde çalışır
  // Eğer task varsa (düzenleme modu), formu o görevin verileriyle doldurur
  useEffect(() => {
    if (task) {
      // Düzenleme modu: Mevcut görevin verilerini forma yükle
      setFormData({
        title: task.title || '',
        description: task.description || '',
      })
    } else {
      // Yeni görev modu: Formu temizle
      setFormData({
        title: '',
        description: '',
      })
    }
  }, [task]) // task değiştiğinde bu kod çalışır

  /**
   * Input değişikliklerini yakalayan fonksiyon
   * Kullanıcı form alanlarına yazdığında çalışır
   */
  const handleChange = (e) => {
    // e.target.name: Hangi input değişti (title veya description)
    // e.target.value: Yeni değer
    setFormData({
      ...formData, // Mevcut form verilerini koru
      [e.target.name]: e.target.value, // Sadece değişen alanı güncelle
    })
  }

  /**
   * Form gönderildiğinde çalışan fonksiyon
   * Eğer başlık boş değilse, onSubmit fonksiyonunu çağırır
   */
  const handleSubmit = (e) => {
    e.preventDefault() // Formun varsayılan davranışını (sayfa yenileme) engelle

    // Başlık boşsa işlem yapma
    if (!formData.title.trim()) {
      alert('Lütfen görev başlığı girin!')
      return
    }

    // onSubmit fonksiyonunu çağır (ana bileşenden gelen)
    // Eğer task varsa düzenleme, yoksa yeni ekleme yapılacak
    onSubmit({
      ...formData,
      id: task ? task.id : Date.now(), // Düzenleme modunda mevcut ID, yeni modda yeni ID
    })

    // Formu temizle
    setFormData({
      title: '',
      description: '',
    })
  }

  // JSX: JavaScript XML - HTML benzeri yapı, React'te görünüm oluşturmak için
  return (
    <div className="card shadow-sm border-0 mb-4">
      {/* card: Bootstrap kart bileşeni */}
      {/* shadow-sm: Küçük gölge efekti */}
      {/* border-0: Kenarlık yok */}
      {/* mb-4: Alt boşluk (margin-bottom) */}
      
      <div className="card-header bg-white border-bottom">
        {/* card-header: Kart başlığı */}
        {/* bg-white: Beyaz arka plan */}
        {/* border-bottom: Alt kenarlık */}
        <h5 className="mb-0 fw-bold text-dark">
          {/* mb-0: Alt boşluk yok */}
          {/* fw-bold: Kalın yazı */}
          {/* text-dark: Koyu renk */}
          <i className={`bi ${task ? 'bi-pencil-square' : 'bi-plus-circle'} me-2 text-primary`}></i>
          {/* task varsa kalem ikonu, yoksa artı ikonu */}
          {/* text-primary: Mavi renk */}
          {task ? 'Görevi Düzenle' : 'Yeni Görev Ekle'}
          {/* task varsa "Düzenle", yoksa "Yeni Ekle" yazısı göster */}
        </h5>
      </div>

      <div className="card-body">
        {/* card-body: Kart içeriği */}
        <form onSubmit={handleSubmit}>
          {/* onSubmit: Form gönderildiğinde handleSubmit çalışır */}
          
          {/* Görev Başlığı Input */}
          <div className="mb-3">
            {/* mb-3: Alt boşluk */}
            <label htmlFor="title" className="form-label fw-semibold text-dark">
              {/* htmlFor: Label'ın hangi input'a ait olduğunu belirtir */}
              {/* form-label: Bootstrap label stili */}
              {/* fw-semibold: Yarı kalın yazı */}
              {/* text-dark: Koyu renk */}
              <i className="bi bi-card-heading me-2 text-primary"></i>
              {/* bi-card-heading: Başlık ikonu */}
              {/* text-primary: Mavi renk */}
              Görev Başlığı <span className="text-danger">*</span>
              {/* text-danger: Kırmızı renk (zorunlu alan işareti) */}
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Örn: Alışveriş yap"
              required
              // type="text": Metin girişi
              // className: Bootstrap form kontrol stili + form-control-lg (büyük input)
              // id: Input'un benzersiz kimliği
              // name: Form gönderildiğinde hangi alan olduğunu belirtir
              // value: Input'un değeri (formData.title'dan gelir)
              // onChange: Değer değiştiğinde handleChange çalışır
              // placeholder: Boşken gösterilecek ipucu metni
              // required: Zorunlu alan
            />
          </div>

          {/* Görev Açıklaması Textarea */}
          <div className="mb-3">
            <label htmlFor="description" className="form-label fw-semibold text-dark">
              <i className="bi bi-card-text me-2 text-primary"></i>
              {/* bi-card-text: Metin ikonu */}
              Görev Açıklaması
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Örn: Marketten süt, ekmek ve yumurta al"
              rows="4"
              // textarea: Çok satırlı metin girişi
              // rows: Kaç satır yüksekliğinde olacağı
            />
          </div>

          {/* Butonlar */}
          <div className="d-flex gap-2 justify-content-end pt-2">
            {/* d-flex: Flexbox düzeni */}
            {/* gap-2: Butonlar arası boşluk */}
            {/* justify-content-end: Butonları sağa hizala */}
            {/* pt-2: Üst boşluk */}
            
            {onCancel && (
              // onCancel varsa İptal butonunu göster
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onCancel}
                // type="button": Form göndermesin, sadece onClick çalışsın
                // btn btn-outline-secondary: Gri kenarlıklı buton stili
                // onClick: Tıklandığında onCancel çalışır
              >
                <i className="bi bi-x-circle me-2"></i>
                {/* bi-x-circle: X ikonu */}
                İptal
              </button>
            )}

            <button type="submit" className="btn btn-primary px-4">
              {/* type="submit": Form gönder butonu */}
              {/* btn btn-primary: Mavi buton stili */}
              {/* px-4: Yatay boşluk */}
              <i className="bi bi-check-circle me-2"></i>
              {/* bi-check-circle: Onay ikonu */}
              {task ? 'Güncelle' : 'Ekle'}
              {/* task varsa "Güncelle", yoksa "Ekle" yazısı */}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskForm // Bileşeni dışa aktar (başka dosyalarda kullanmak için)


