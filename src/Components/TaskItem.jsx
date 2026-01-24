// Components/TaskItem.jsx
// Bu bileşen, tek bir görevin görüntülenmesi ve yönetilmesi için kullanılır

import React from 'react' // React kütüphanesi

/**
 * TaskItem Component - Tek bir görev kartı
 * 
 * Bu bileşen, görev listesindeki her bir görevi temsil eder.
 * Her görev için düzenleme, silme ve tamamlama işlemlerini içerir.
 * 
 * Props (Parametreler):
 * @param {Object} task - Gösterilecek görev objesi
 * @param {Function} onEdit - Düzenle butonuna tıklandığında çalışacak fonksiyon
 * @param {Function} onDelete - Sil butonuna tıklandığında çalışacak fonksiyon
 * @param {Function} onToggleComplete - Tamamlandı checkbox'ına tıklandığında çalışacak fonksiyon
 */
function TaskItem({ task, onEdit, onDelete, onToggleComplete }) {
  /**
   * Tarih formatlama fonksiyonu
   * ISO formatındaki tarihi okunabilir formata çevirir
   * Örnek: "2024-01-15T10:30:00" -> "15 Ocak 2024, 10:30"
   */
  const formatDate = (dateString) => {
    if (!dateString) return 'Tarih yok'
    
    const date = new Date(dateString) // String'i Date objesine çevir
    return date.toLocaleString('tr-TR', {
      // toLocaleString: Tarihi yerel formata çevir
      // 'tr-TR': Türkçe format
      year: 'numeric', // Yıl: 2024
      month: 'long', // Ay: Ocak
      day: 'numeric', // Gün: 15
      hour: '2-digit', // Saat: 10
      minute: '2-digit', // Dakika: 30
    })
  }

  // JSX döndürüyoruz
  return (
    <div className={`card mb-3 task-item ${task.completed ? 'task-completed' : ''}`}>
      {/* card: Bootstrap kart bileşeni */}
      {/* mb-3: Alt boşluk */}
      {/* task-item: Özel görev kartı sınıfı */}
      {/* task-completed: Tamamlanmış görev için ek sınıf */}
      
      <div className="card-body p-4">
        {/* card-body: Kart içeriği */}
        {/* p-4: İç boşluk */}
        
        {/* Üst kısım: Başlık ve durum */}
        <div className="d-flex justify-content-between align-items-start mb-3">
          {/* d-flex: Flexbox düzeni */}
          {/* justify-content-between: Elemanları aralara yay */}
          {/* align-items-start: Üstten hizala */}
          
          <div className="flex-grow-1 me-3">
            {/* flex-grow-1: Kalan alanı kapla */}
            {/* me-3: Sağ boşluk */}
            <div className="d-flex align-items-center mb-2">
              {/* d-flex: Flexbox düzeni */}
              {/* align-items-center: Dikey ortalama */}
              {/* task.completed true ise onay ikonu göster - bi-check-circle-fill: Dolu onay ikonu, text-success: Yeşil renk, fs-5: Font boyutu */}
              {task.completed && (
                <i className="bi bi-check-circle-fill text-success me-2 fs-5"></i>
              )}
              <h5 className={`card-title mb-0 fw-bold ${task.completed ? 'text-decoration-line-through text-muted' : 'text-dark'}`}>
                {/* card-title: Kart başlığı */}
                {/* mb-0: Alt boşluk yok */}
                {/* fw-bold: Kalın yazı */}
                {/* task.completed true ise üstü çizili ve gri renk */}
                {task.title}
              </h5>
            </div>
            
            {/* Görev açıklaması */}
            {task.description && (
              // task.description varsa göster
              <p className={`card-text mb-0 ${task.completed ? 'text-muted' : 'text-secondary'}`}>
                {/* card-text: Kart metni */}
                {/* mb-0: Alt boşluk yok */}
                {task.description}
              </p>
            )}
          </div>

          {/* Tamamlandı checkbox'ı */}
          <div className="form-check form-switch">
            {/* form-check: Bootstrap checkbox stili */}
            {/* form-switch: Toggle switch stili */}
            <input
              className="form-check-input"
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleComplete(task.id)}
              id={`task-${task.id}`}
              role="switch"
              // form-check-input: Bootstrap checkbox stili
              // type="checkbox": Onay kutusu
              // checked: task.completed değerine göre işaretli/boş
              // onChange: Değiştiğinde onToggleComplete fonksiyonunu çağır
              // id: Benzersiz kimlik (label ile bağlantı için)
              // role="switch": Erişilebilirlik için
            />
            <label className="form-check-label" htmlFor={`task-${task.id}`}>
              {/* htmlFor: Hangi input'a ait olduğunu belirtir */}
              <small className="text-muted d-block">Tamamlandı</small>
              {/* d-block: Blok element */}
            </label>
          </div>
        </div>

        {/* Alt kısım: Tarih ve butonlar */}
        <div className="d-flex justify-content-between align-items-center pt-3 border-top">
          {/* d-flex: Flexbox düzeni */}
          {/* justify-content-between: Elemanları aralara yay */}
          {/* align-items-center: Dikey ortalama */}
          {/* pt-3: Üst boşluk */}
          {/* border-top: Üst kenarlık */}
          
          {/* Tarih bilgisi */}
          <small className="text-muted d-flex align-items-center">
            {/* text-muted: Gri renk */}
            {/* d-flex: Flexbox düzeni */}
            <i className="bi bi-calendar3 me-2"></i>
            {/* bi-calendar3: Takvim ikonu */}
            <span>Oluşturulma: {formatDate(task.createdAt)}</span>
          </small>

          {/* İşlem butonları */}
          <div className="btn-group" role="group">
            {/* btn-group: Butonları grupla */}
            {/* role="group": Erişilebilirlik için */}
            
            {/* Düzenle butonu */}
            <button
              type="button"
              className="btn btn-sm btn-outline-primary"
              onClick={() => onEdit(task)}
              // btn-sm: Küçük buton
              // btn-outline-primary: Mavi kenarlıklı buton
              // onClick: Tıklandığında onEdit fonksiyonunu task ile çağır
              title="Düzenle"
              // title: Fare üzerine gelince gösterilecek ipucu
            >
              <i className="bi bi-pencil"></i>
              {/* bi-pencil: Kalem ikonu */}
            </button>

            {/* Sil butonu */}
            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={() => {
                // Silme işlemi için onay iste
                if (window.confirm(`"${task.title}" görevini silmek istediğinize emin misiniz?`)) {
                  // window.confirm: Tarayıcı onay kutusu gösterir
                  // Kullanıcı "Tamam" derse onDelete çalışır
                  onDelete(task.id)
                }
              }}
              title="Sil"
            >
              <i className="bi bi-trash"></i>
              {/* bi-trash: Çöp kutusu ikonu */}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskItem // Bileşeni dışa aktar


