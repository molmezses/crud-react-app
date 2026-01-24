// Pages/HomePage.jsx
// Bu dosya, uygulamanın ana sayfasıdır ve tüm CRUD işlemlerini yönetir

import React, { useState, useEffect } from 'react' // React hooks'ları
import Sidebar from '../Components/Sidebar' // Sol menü bileşeni
import TaskForm from '../Components/TaskForm' // Görev formu bileşeni
import TaskList from '../Components/TaskList' // Görev listesi bileşeni
import { validateTask } from '../Interfaces/TaskInterface' // Interface fonksiyonları

/**
 * HomePage Component - Ana sayfa
 * 
 * NEDEN PAGES KLASÖRÜNE İHTİYACIMIZ VAR?
 * 
 * 1. Sayfa Organizasyonu: Her sayfa kendi dosyasında, daha düzenli yapı
 * 2. Routing Yönetimi: Hangi URL'de hangi sayfa gösterileceğini kolayca yönetiriz
 * 3. Büyük Uygulamalar: Uygulama büyüdükçe sayfaları ayrı tutmak önemli
 * 4. Kod Ayrımı: Sayfa mantığı ile bileşen mantığı ayrı kalır
 * 5. Performans: Sayfaları lazy load (geç yükleme) ile optimize edebiliriz
 * 
 * Bu sayfa şu işlemleri yapar:
 * - CREATE (Ekleme): Yeni görev ekler
 * - READ (Okuma): Görevleri listeler
 * - UPDATE (Güncelleme): Mevcut görevi düzenler
 * - DELETE (Silme): Görevi siler
 * 
 * Veriler LocalStorage'da saklanır (tarayıcı kapansa bile kalır)
 */
function HomePage() {
  // State (Durum) tanımlamaları
  // useState: Bileşen içinde değişken tutmak için React hook'u
  
  // tasks: Tüm görevlerin listesi
  const [tasks, setTasks] = useState([])
  // []: Başlangıç değeri boş dizi

  // isLoaded: LocalStorage'dan veriler yüklendi mi?
  const [isLoaded, setIsLoaded] = useState(false)
  // false: Başlangıçta veri yüklenmedi

  // editingTask: Şu anda düzenlenen görev (null ise yeni görev ekleniyor)
  const [editingTask, setEditingTask] = useState(null)
  // null: Başlangıçta düzenlenen görev yok

  // activeView: Şu anda aktif olan görünüm (tüm görevler, bekleyenler, tamamlananlar, istatistikler, yeni görev)
  const [activeView, setActiveView] = useState('all')
  // 'all': Başlangıçta tüm görevler görünümü aktif

  // lastListView: En son hangi liste görünümünde olduğumuzu tutar
  const [lastListView, setLastListView] = useState('all')
  // 'all': Başlangıçta tüm görevler görünümü

  // useEffect: Bileşen ilk yüklendiğinde çalışır
  // LocalStorage'dan kaydedilmiş görevleri yükler
  useEffect(() => {
    // LocalStorage: Tarayıcının yerel depolama alanı
    // Veriler tarayıcı kapansa bile kalır
    const savedTasks = localStorage.getItem('tasks')
    // localStorage.getItem: 'tasks' anahtarıyla kaydedilmiş veriyi alır
    
    if (savedTasks) {
      // Eğer kaydedilmiş görevler varsa
      try {
        // JSON.parse: String'i JavaScript objesine çevirir
        // LocalStorage sadece string saklar, bu yüzden JSON formatında saklıyoruz
        const parsedTasks = JSON.parse(savedTasks)
        setTasks(parsedTasks) // Görevleri state'e yükle
      } catch (error) {
        // Hata olursa (bozuk veri gibi) konsola yazdır
        console.error('Görevler yüklenirken hata oluştu:', error)
      }
    }
    // Veri yükleme tamamlandı
    setIsLoaded(true)
  }, []) // []: Sadece ilk yüklemede çalış (boş bağımlılık dizisi)

  // useEffect: tasks değiştiğinde LocalStorage'a kaydet
  useEffect(() => {
    // Eğer veri henüz yüklenmediyse kaydetme
    if (!isLoaded) return
    // JSON.stringify: JavaScript objesini string'e çevirir
    localStorage.setItem('tasks', JSON.stringify(tasks))
    // localStorage.setItem: 'tasks' anahtarıyla veriyi kaydeder
  }, [tasks, isLoaded]) // tasks değiştiğinde çalış

  // useEffect: activeView liste görünümündeyse lastListView'i güncelle
  useEffect(() => {
    const listViews = ['all', 'pending', 'completed']
    // Eğer aktif görünüm bir liste görünümüyse lastListView'i güncelle
    if (listViews.includes(activeView)) {
      setLastListView(activeView)
    }
  }, [activeView])

  /**
   * CREATE İŞLEMİ - Yeni görev ekleme
   * @param {Object} taskData - Eklenecek görev verisi
   */
  const handleAddTask = (taskData) => {
    // validateTask: Görev verilerinin doğru olup olmadığını kontrol eder
    const validation = validateTask(taskData)
    
    if (!validation.valid) {
      // Eğer veri geçersizse hata mesajı göster
      alert(validation.error)
      return
    }

    // Yeni görev objesi oluştur
    const newTask = {
      ...taskData, // Gelen verileri kopyala
      id: Date.now(), // Benzersiz ID oluştur (şu anki zamanı milisaniye cinsinden)
      completed: false, // Başlangıçta tamamlanmamış
      createdAt: new Date().toISOString(), // Oluşturulma tarihi
    }

    // setTasks: State'i güncelle
    // ...tasks: Mevcut görevleri kopyala
    // newTask: Yeni görevi ekle
    setTasks([...tasks, newTask])
    
    // Başarı mesajı
    alert('Görev başarıyla eklendi!')
  }

  /**
   * UPDATE İŞLEMİ - Mevcut görevi güncelleme
   * @param {Object} taskData - Güncellenecek görev verisi
   */
  const handleUpdateTask = (taskData) => {
    // validateTask: Görev verilerinin doğru olup olmadığını kontrol eder
    const validation = validateTask(taskData)
    
    if (!validation.valid) {
      alert(validation.error)
      return
    }

    // map: Dizideki her eleman için bir işlem yap
    // Eğer görevin ID'si güncellenecek ID ile eşleşiyorsa güncelle, değilse olduğu gibi bırak
    const updatedTasks = tasks.map((task) =>
      task.id === taskData.id
        ? { ...task, ...taskData } // Mevcut görevi yeni verilerle birleştir
        : task // Diğer görevleri olduğu gibi bırak
    )

    setTasks(updatedTasks) // Güncellenmiş listeyi state'e kaydet
    setEditingTask(null) // Düzenleme modunu kapat
    setActiveView(lastListView) // Kullanıcıyı son liste görünümüne döndür
    
    alert('Görev başarıyla güncellendi!')
  }

  /**
   * DELETE İŞLEMİ - Görevi silme
   * @param {Number} taskId - Silinecek görevin ID'si
   */
  const handleDeleteTask = (taskId) => {
    // filter: Diziden belirli koşullara uyan elemanları filtrele
    // task.id !== taskId: ID'si silinecek ID'ye eşit OLMAYAN görevleri al
    // Yani silinecek görevi hariç tut, diğerlerini al
    const filteredTasks = tasks.filter((task) => task.id !== taskId)
    
    setTasks(filteredTasks) // Filtrelenmiş listeyi state'e kaydet
    
    alert('Görev başarıyla silindi!')
  }

  /**
   * Toggle Complete - Görevin tamamlanma durumunu değiştirme
   * @param {Number} taskId - Durumu değiştirilecek görevin ID'si
   */
  const handleToggleComplete = (taskId) => {
    // map: Her görev için kontrol et
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? { ...task, completed: !task.completed } // Tamamlanma durumunu tersine çevir
        : task // Diğer görevleri olduğu gibi bırak
    )

    setTasks(updatedTasks) // Güncellenmiş listeyi kaydet
  }

  /**
   * Form gönderildiğinde çalışan fonksiyon
   * Düzenleme modunda mı yoksa yeni ekleme modunda mı olduğunu kontrol eder
   */
  const handleFormSubmit = (taskData) => {
    if (editingTask) {
      // Düzenleme modu
      handleUpdateTask(taskData)
    } else {
      // Yeni ekleme modu
      handleAddTask(taskData)
    }
  }

  /**
   * Düzenleme modunu başlat
   * @param {Object} task - Düzenlenecek görev
   */
  const handleEditTask = (task) => {
    setEditingTask(task) // Düzenlenecek görevi state'e kaydet
    // TaskForm bileşeni bu görevi alıp formu dolduracak
    setActiveView('add') // Düzenleme için form görünümüne geç
  }

  /**
   * Düzenleme modunu iptal et
   */
  const handleCancelEdit = () => {
    setEditingTask(null) // Düzenleme modunu kapat
    setActiveView(lastListView) // Kullanıcıyı son liste görünümüne döndür
  }

  /**
   * Aktif görünüme göre görevleri filtrele
   * @returns {Array} Filtrelenmiş görevler dizisi
   */
  const getFilteredTasks = () => {
    switch (activeView) {
      case 'pending':
        // Bekleyenler: Tamamlanmamış görevler
        return tasks.filter((task) => !task.completed)
      case 'completed':
        // Tamamlananlar: Tamamlanmış görevler
        return tasks.filter((task) => task.completed)
      case 'all':
      default:
        // Tüm görevler: Filtreleme yok
        return tasks
    }
  }

  // Liste görünümlerini belirle
  const listViews = ['all', 'pending', 'completed']
  // Eğer aktif görünüm bir liste görünümüyse filtrele
  const filteredTasks = listViews.includes(activeView) ? getFilteredTasks() : tasks

  // Form gösterilsin mi?
  const shouldShowForm = activeView === 'add' || editingTask

  // Liste gösterilsin mi?
  const shouldShowList = listViews.includes(activeView)

  // Başlık rozeti metni
  const headerBadgeText =
    activeView === 'add'
      ? editingTask
        ? 'Düzenleme'
        : 'Yeni Görev'
      : activeView === 'stats'
      ? 'Özet'
      : `${filteredTasks.length} Görev`

  // JSX: Görünümü oluştur
  return (
    <div className="app-layout">
      {/* app-layout: Ana layout container */}
      
      {/* Sol Sidebar Menü */}
      <Sidebar
        activeView={activeView}
        // activeView: Şu anda aktif görünüm
        onViewChange={setActiveView}
        // onViewChange: Görünüm değiştiğinde setActiveView çalışır
      />

      {/* Ana İçerik Alanı */}
      <main className="main-content">
        {/* main-content: Ana içerik container */}
        
        {/* Üst Başlık Bölümü */}
        <div className="content-header">
          {/* content-header: İçerik başlığı */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            {/* d-flex: Flexbox düzeni */}
            {/* justify-content-between: Elemanları aralara yay */}
            {/* align-items-center: Dikey ortalama */}
            <div>
              <h1 className="page-title mb-2">
                {/* page-title: Sayfa başlığı */}
                <i className="bi bi-check2-square me-2"></i>
                {/* bi-check2-square: İkon */}
                Görev Yönetim Sistemi
              </h1>
              <p className="page-subtitle text-muted mb-0">
                {/* page-subtitle: Alt başlık */}
                {/* text-muted: Gri renk */}
                {activeView === 'all' && 'Tüm görevlerinizi buradan yönetin'}
                {activeView === 'pending' && 'Tamamlanmayı bekleyen görevleriniz'}
                {activeView === 'completed' && 'Tamamladığınız görevler'}
                {activeView === 'stats' && 'Görev istatistikleri ve analizler'}
                {activeView === 'add' && 'Yeni görev ekleyin veya mevcut görevi düzenleyin'}
              </p>
            </div>
            <div className="header-badge">
              {/* header-badge: Başlık rozeti */}
              <span className="badge bg-primary rounded-pill px-3 py-2">
                {/* badge: Bootstrap rozet */}
                {/* bg-primary: Mavi arka plan */}
                {/* rounded-pill: Yuvarlatılmış köşeler */}
                {headerBadgeText}
                {/* headerBadgeText: Rozet metni */}
              </span>
            </div>
          </div>
        </div>

        {/* Görev Formu - Sadece form görünümünde veya düzenleme modunda göster */}
        {shouldShowForm && (
          <TaskForm
            task={editingTask}
            // task: Düzenleme modunda görev objesi, yoksa null
            onSubmit={handleFormSubmit}
            // onSubmit: Form gönderildiğinde çalışacak fonksiyon
            onCancel={editingTask ? handleCancelEdit : null}
            // onCancel: İptal butonu için fonksiyon (sadece düzenleme modunda)
          />
        )}

        {/* İstatistikler Görünümü */}
        {/* activeView 'stats' ise istatistikleri göster */}
        {activeView === 'stats' && (
          <div className="stats-container">
            {/* stats-container: İstatistikler container */}
            <div className="row g-4 mb-4">
              {/* row: Bootstrap satır */}
              {/* g-4: Elemanlar arası boşluk */}
              <div className="col-md-3">
                {/* col-md-3: Orta ekranlarda 3 birim genişlik */}
                <div className="stat-card stat-card-primary">
                  {/* stat-card: İstatistik kartı */}
                  <div className="stat-icon">
                    {/* stat-icon: İkon container */}
                    <i className="bi bi-list-task"></i>
                  </div>
                  <div className="stat-value">{tasks.length}</div>
                  {/* stat-value: İstatistik değeri */}
                  <div className="stat-label">Toplam Görev</div>
                  {/* stat-label: İstatistik etiketi */}
                </div>
              </div>
              <div className="col-md-3">
                <div className="stat-card stat-card-success">
                  <div className="stat-icon">
                    <i className="bi bi-check-circle"></i>
                  </div>
                  <div className="stat-value">
                    {tasks.filter((t) => t.completed).length}
                  </div>
                  <div className="stat-label">Tamamlanan</div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="stat-card stat-card-warning">
                  <div className="stat-icon">
                    <i className="bi bi-clock-history"></i>
                  </div>
                  <div className="stat-value">
                    {tasks.filter((t) => !t.completed).length}
                  </div>
                  <div className="stat-label">Bekleyen</div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="stat-card stat-card-info">
                  <div className="stat-icon">
                    <i className="bi bi-percent"></i>
                  </div>
                  <div className="stat-value">
                    {tasks.length > 0
                      ? Math.round(
                          (tasks.filter((t) => t.completed).length /
                            tasks.length) *
                            100
                        )
                      : 0}
                    %
                  </div>
                  <div className="stat-label">Tamamlanma Oranı</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Görev Listesi - Sadece liste görünümlerinde göster */}
        {shouldShowList && (
          <TaskList
            tasks={filteredTasks}
            // tasks: Filtrelenmiş görevler dizisi
            onEdit={handleEditTask}
            // onEdit: Düzenle butonuna tıklandığında çalışacak fonksiyon
            onDelete={handleDeleteTask}
            // onDelete: Sil butonuna tıklandığında çalışacak fonksiyon
            onToggleComplete={handleToggleComplete}
            // onToggleComplete: Tamamlandı checkbox'ına tıklandığında çalışacak fonksiyon
          />
        )}
      </main>
    </div>
  )
}

export default HomePage // Bileşeni dışa aktar


