// Components/TaskList.jsx
// Bu bileşen, tüm görevlerin listesini gösterir

import React from 'react' // React kütüphanesi
import TaskItem from './TaskItem' // TaskItem bileşenini import ediyoruz

/**
 * TaskList Component - Görev listesi
 * 
 * Bu bileşen, görevleri listeler ve her görev için TaskItem bileşenini kullanır.
 * Filtreleme ve sıralama özellikleri de içerir.
 * 
 * Props (Parametreler):
 * @param {Array} tasks - Gösterilecek görevler dizisi
 * @param {Function} onEdit - Düzenleme fonksiyonu
 * @param {Function} onDelete - Silme fonksiyonu
 * @param {Function} onToggleComplete - Tamamlama durumu değiştirme fonksiyonu
 */
function TaskList({ tasks, onEdit, onDelete, onToggleComplete }) {
  // Eğer görev yoksa boş durum mesajı göster
  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-center py-5">
        {/* text-center: Metni ortala */}
        {/* py-5: Üst-alt boşluk */}
        <div className="card border-0 shadow-sm bg-white">
          {/* card: Bootstrap kart */}
          {/* border-0: Kenarlık yok */}
          {/* shadow-sm: Küçük gölge */}
          {/* bg-white: Beyaz arka plan */}
          <div className="card-body py-5">
            {/* card-body: Kart içeriği */}
            {/* py-5: Üst-alt boşluk */}
            <div className="empty-state-icon mb-4">
              {/* empty-state-icon: Boş durum ikonu container */}
              <i className="bi bi-inbox display-1 text-muted"></i>
              {/* bi-inbox: Kutu ikonu */}
              {/* display-1: Çok büyük yazı */}
              {/* text-muted: Gri renk */}
            </div>
            <h4 className="text-dark mb-2 fw-bold">Henüz görev eklenmemiş</h4>
            {/* text-dark: Koyu renk */}
            {/* mb-2: Alt boşluk */}
            {/* fw-bold: Kalın yazı */}
            <p className="text-muted mb-0">Yukarıdaki formdan yeni görev ekleyebilirsiniz.</p>
            {/* text-muted: Gri renk */}
            {/* mb-0: Alt boşluk yok */}
          </div>
        </div>
      </div>
    )
  }

  // JSX döndürüyoruz
  return (
    <div>
      {/* Görev listesi başlığı */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        {/* d-flex: Flexbox düzeni */}
        {/* justify-content-between: Elemanları aralara yay */}
        {/* align-items-center: Dikey ortalama */}
        {/* mb-4: Alt boşluk */}
        <h5 className="mb-0 fw-bold text-dark">
          {/* mb-0: Alt boşluk yok */}
          {/* fw-bold: Kalın yazı */}
          {/* text-dark: Koyu renk */}
          <i className="bi bi-list-task me-2"></i>
          {/* bi-list-task: Liste ikonu */}
          Görevler
          <span className="badge bg-primary ms-2">{tasks.length}</span>
          {/* badge: Bootstrap rozet */}
          {/* bg-primary: Mavi arka plan */}
          {/* ms-2: Sol boşluk */}
        </h5>
      </div>

      {/* Görevler listesi */}
      <div>
        {/* map fonksiyonu: Dizideki her eleman için TaskItem bileşeni oluştur */}
        {tasks.map((task) => (
          // map: JavaScript dizisi fonksiyonu, her eleman için bir şey döndürür
          <TaskItem
            key={task.id}
            // key: React'in hangi elemanın hangisi olduğunu anlaması için gerekli
            // Her görev için benzersiz ID kullanıyoruz
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleComplete={onToggleComplete}
            // Props'ları TaskItem'a geçiriyoruz
          />
        ))}
      </div>
    </div>
  )
}

export default TaskList // Bileşeni dışa aktar


