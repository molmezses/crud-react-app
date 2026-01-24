/**
 * Interfaces/TaskInterface.js
 * 
 * Bu dosya, uygulamamızda kullanacağımız veri yapılarını tanımlar.
 * 
 * NEDEN INTERFACES KLASÖRÜNE İHTİYACIMIZ VAR?
 * 
 * 1. Tip Güvenliği: Hangi verilerin hangi yapıda olması gerektiğini belirleriz
 * 2. Kod Okunabilirliği: Diğer geliştiriciler (ve gelecekteki siz) hangi veri yapısını
 *    kullandığımızı kolayca anlayabilir
 * 3. Hata Önleme: Yanlış veri yapısı kullanıldığında hata alırız, bu da bug'ları önler
 * 4. Dokümantasyon: Kodun kendisi dokümantasyon görevi görür
 * 5. Yeniden Kullanılabilirlik: Aynı veri yapısını farklı yerlerde kullanabiliriz
 */

/**
 * Task (Görev) veri yapısı
 * Her bir görev için gerekli bilgileri içerir
 */
export const TaskInterface = {
  // id: Her görevin benzersiz kimliği (numara)
  // Örnek: 1, 2, 3...
  id: null, // Number tipinde

  // title: Görevin başlığı
  // Örnek: "Alışveriş yap", "Proje tamamla"
  title: '', // String (metin) tipinde

  // description: Görevin detaylı açıklaması
  // Örnek: "Marketten süt, ekmek ve yumurta al"
  description: '', // String tipinde

  // completed: Görevin tamamlanıp tamamlanmadığını gösterir
  // true = tamamlandı, false = tamamlanmadı
  completed: false, // Boolean (true/false) tipinde

  // createdAt: Görevin oluşturulma tarihi
  // Örnek: "2024-01-15T10:30:00"
  createdAt: '', // String tipinde (tarih formatında)
}

/**
 * Yeni bir görev oluştururken kullanılacak varsayılan değerler
 * Bu fonksiyon, yeni görev eklerken boş bir görev objesi oluşturur
 */
export const createEmptyTask = () => {
  return {
    id: Date.now(), // Şu anki zamanı milisaniye cinsinden kullanarak benzersiz ID oluşturuyoruz
    title: '',
    description: '',
    completed: false,
    createdAt: new Date().toISOString(), // Şu anki tarih ve saati ISO formatında alıyoruz
  }
}

/**
 * Görev verilerini doğrulama fonksiyonu
 * Kullanıcıdan gelen verilerin doğru formatta olup olmadığını kontrol eder
 */
export const validateTask = (task) => {
  // Eğer task objesi yoksa veya title boşsa hata döndür
  if (!task || !task.title || task.title.trim() === '') {
    return { valid: false, error: 'Görev başlığı boş olamaz!' }
  }

  // Eğer title çok uzunsa hata döndür
  if (task.title.length > 100) {
    return { valid: false, error: 'Görev başlığı 100 karakterden uzun olamaz!' }
  }

  // Eğer description çok uzunsa hata döndür
  if (task.description && task.description.length > 500) {
    return { valid: false, error: 'Görev açıklaması 500 karakterden uzun olamaz!' }
  }

  // Her şey tamamsa geçerli döndür
  return { valid: true, error: null }
}




