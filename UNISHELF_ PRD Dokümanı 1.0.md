# **📑 UNISHELF: Teknik Ürün Spesifikasyonu (Full-Stack Blueprint)**

## **1\. Mimari ve Veri Modeli (The Spine)**

Ürünün ölçeklenebilirliği için veritabanı şeması "Relational" (İlişkisel) yapıda kurgulanmalıdır.

### **1.1. Veri Tabanı Şeması (Core Entities)**

* **User Table:** id, email, streak\_count, last\_login, xp\_total, level\_id.  
* **Book Table:** id, isbn\_13, title, author\_id, genre, page\_count, spine\_color\_hex, average\_rating, cover\_url\_high\_res.  
* **User\_Library Table:** user\_id, book\_id, status (reading, finished, wishlist), current\_page, shelf\_position\_index, physical\_shelf\_no, date\_added.  
* **Daily\_Logs Table:** id, user\_id, book\_id, pages\_read, timestamp, session\_duration\_seconds.  
* **Lending\_Log Table:** id, book\_owner\_id, borrower\_name, contact\_info, lend\_date, expected\_return\_date, return\_status.

---

## **2\. Derinlemesine Özellik Analizi (The Deep Dive)**

### **2.1. Tarayıcı Motoru & Metadata Pipeline (F01)**

Sadece bir API çağrısı yetmez. "Data Enrichment" (Veri Zenginleştirme) süreci işletilmelidir:

1. **Scanner Capture:** Kamera 1080p modunda açılır, barkodu yakalar.  
2. **Validator:** Barkodun checksum kontrolü yapılır.  
3. **Parallel Fetch:** Google Books API, Open Library ve Yerel DB (Türkiye'deki yayıncılar için) eş zamanlı tetiklenir.  
4. **Data Merger:** En yüksek çözünürlüklü kapak ve en detaylı metadata (sayfa sayısı, kategori) seçilir.  
5. **Fallback:** Eğer veri yoksa, kullanıcıya "Kapak Fotoğrafı Çek" uyarısı gider ve arka planda **OCR** ile kitap ismi-yazar tespiti yapılır.

### **2.2. 3D Render Motoru Spesifikasyonları (F02)**

Burada "Visual Fidelity" (Görsel Sadakat) her şeydir.

* **Procedural Generation:** Kitaplar önceden hazırlanmış statik modeller değil, page\_count değişkenine göre width değeri değişen dinamik objelerdir.  
  * *Formül:* $Width \= (PageCount \\times 0.05mm) \+ CoverThickness$  
* **Physics & Interaction:** Kullanıcı rafa dokunduğunda kitaplar 5 derecelik bir açıyla öne doğru "titremeli" (Haptic feedback ile birlikte).  
* **Texture Mapping:** Kitap sırtı rengi, kapak resminin baskın renginden (dominant color extraction) otomatik olarak seçilmelidir.

### **2.3. Streak Engine ve Push Stratejisi (F04)**

Kullanıcıyı darlamadan motive etmeliyiz.

* **Grace Period:** Kullanıcı gece 02:00'de kitap okuduysa, o günün serisi bozulmamalıdır. Gün döngüsü kullanıcı tanımlı (Default: 04:00 AM) olmalıdır.  
* **Smart Reminders:** Eğer saat 21:00 olduysa ve o gün giriş yapılmadıysa: *"Kitabın tozlanıyor... Sadece 2 sayfa okuyup serini korumaya ne dersin?"* bildirimi gönderilir.

---

## **3\. UI/UX Durum Yönetimi (State Machine)**

Her ekranın en az 4 durumu (state) olmalıdır:

1. **Empty State:** Raf boşken "İlk kitabını tara" illüstrasyonu.  
2. **Loading State:** Kitap verisi çekilirken "parlayan" (shimmer effect) 3D raf silüeti.  
3. **Success State:** Kitap başarıyla eklendiğinde patlayan konfetiler (Micro-interactions).  
4. **Error State:** Bağlantı yoksa "Offline Kaydedildi" rozeti.

---

## **4\. Teknik Başarı Kriterleri (Non-Functional Requirements)**

| Metrik | Teknik Eşik (Threshold) | Ölçüm Yöntemi |
| :---- | :---- | :---- |
| **OCR Confidence** | \> %85 Başarı | Tesseract/ML Kit Confidence Score |
| **Sync Latency** | \< 500ms | WebSocket / Firebase Realtime DB |
| **Battery Impact** | \< %2 saatlik kullanım | Profiler Logs |
| **Image Compression** | Max 150KB per cover | WebP format dönüşümü |

---

## **5\. Riskler ve Edge Case'ler (Senior Vision)**

* **Sonsuz Raf Sorunu:** Kullanıcının 2000 kitabı varsa 3D render cihazı ısıtır.  
  * *Çözüm:* **Frustum Culling** (Sadece ekranda görünenleri render et) ve **LOD (Level of Detail)** kullanımı (Uzaktaki kitaplar düşük çözünürlüklü).  
* **Duplication:** Kullanıcı aynı kitabı iki kez tararsa: "Zaten kütüphanende, tekrar mı okuyorsun yoksa ikinci kopyan mı?" sorusu sorulmalıdır.  
* **Zaman Dilimi Kayması:** Yurt dışına çıkan kullanıcının streak'inin bozulmaması için UTC\_timestamp kullanılmalıdır.

---

## **6\. Geliştiriciye Devir Notu (The Handover)**

**Developer Arkadaşım,**

Bu projenin kalbi 3D\_Shelf\_Manager sınıfıdır. Veritabanından gelen listeyi bir "Carousel" mantığında değil, bir "World Space" içinde koordinatlandırarak yerleştirmeni bekliyoruz. Kitapları status \== 'finished' olanları en üst rafa, status \== 'reading' olanları göz hizasındaki rafa dizecek bir algoritma kurgulamalısın.

---

### **🚀 CPO'nun Final Dokunuşu:**

MVP aşamasında **"Social Feed"** koymuyoruz dedik ama teknik altyapıyı kurarken following\_id tablosunu hazır tutalım. Çünkü 2\. versiyonda "Arkadaşının rafında ne var?" özelliği geldiğinde tüm veritabanını migrate etmekle vakit kaybetmek istemem.

