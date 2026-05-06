# **📑 UNISHELF: MVP Kapsam Dokümanı (Sürüm 1.0)**

**Ürün Vizyonu:** Fiziksel kütüphaneyi dijitalde yaşayan, görsel bir deneyime dönüştüren ve okuma alışkanlığını oyunlaştıran tek durak noktası.

---

## **1\. Stratejik Odak: Günlük Geri Dönüş (Retention)**

Kullanıcının her gün uygulamayı açması için MVP'de şu **"Kanca" (Hook)** mekanizması uygulanacaktır:

* **Mikro-İlerleme (Invested Effort):** Kullanıcı okuduğu 1 sayfa için bile giriş yapmalı.  
* **Görsel Tatmin (Variable Reward):** Sayfa sayısı arttıkça 3D raftaki kitabın "bitme oranı" görsel olarak değişmeli.  
* **Kayıp Korkusu (Loss Aversion):** Günlük okuma serisini (streak) bozma korkusu.

---

## **2\. MVP Özellik Seti (Must-Have 10\)**

| Kategori | Özellik | Tanım / Teknik Detay |
| :---- | :---- | :---- |
| **Giriş** | **Hızlı ISBN/Barkod Tarayıcı** | Düşük gecikme süreli (low latency) kamera entegrasyonu. Kitap bilgilerini anlık çeken API katmanı. |
| **Görsel** | **3D Kitaplık Görünümü (V1)** | Kitap sırtlarının (renk ve kalınlık olarak) 3D bir raf üzerinde render edilmesi. |
| **Takip** | **Okuma İlerlemesi (Daily Log)** | Sayfa numarası veya yüzde bazlı giriş. "Bugün ne okudun?" hızlı giriş ekranı. |
| **Oyunlaştırma** | **Günlük Okuma Serisi (Streak)** | Üst üste girilen günleri sayan ve ana ekranda parlayan bir sayaç. |
| **Yönetim** | **Dijital Ödünç Defteri** | Arkadaş listesi veya rehber entegrasyonu ile "Kitabım kimde?" kaydı. |
| **Emniyet** | **Manuel Ekleme & Düzenleme** | Barkodu olmayan kitaplar için temel metadata (başlık, yazar, kapak) girişi. |
| **Navigasyon** | **Akıllı Raf Filtreleme** | Kitapları türüne, okunma durumuna veya fiziksel raf numarasına göre anında süzme. |
| **Bağlantı** | **Kişisel Okuma İstatistikleri** | Haftalık/Aylık okuma trendlerini gösteren basit ama şık grafikler. |
| **Bellek** | **Alıntı ve Fotoğraf Notları** | OCR (Metin tanıma) kullanarak kitap sayfasından hızlıca alıntı oluşturma. |
| **Sistem** | **Bulut Senkronizasyonu** | Kullanıcı verilerinin her cihazda (ve çevrimdışı kullanım sonrası) tutarlı kalması. |

---

## **3\. Kullanıcı Akışı (The Daily Loop)**

1. **Bildirim (Sabah/Akşam):** "Kahven hazırsa, X kitabında 10 sayfa ilerlemeye ne dersin?" (Kişiselleştirilmiş hatırlatıcı).  
2. **Eylem:** Kullanıcı sayfayı girer.  
3. **Ödül:** 3D raftaki kitabın ilerleme barı dolar, "Streak" alevi parlar.  
4. **Yatırım:** Kullanıcı okurken beğendiği bir cümlenin fotoğrafını çekip alıntı olarak kaydeder.

---

## **4\. Teknik Başarı Kriterleri (KPIs)**

* **T0 (Uygulama Açılış Hızı):** \< 2 saniye (Kurumsal ebeveyn beklemeyi sevmez).  
* **Scan-to-Shelf Süresi:** Barkod okunduktan sonra kitabın rafa düşme süresi \< 3 saniye.  
* **Retention (D1):** Kullanıcıların %40'ının ertesi gün tekrar girmesi.

---

## **5\. Riskler ve Çözümler**

* **Risk:** ISBN veritabanının yetersiz kalması.  
* **Çözüm:** Çoklu API (Google Books \+ Open Library \+ Yerel DB) kullanımı ve başarısız taramada anında "Manuel Ekleme" formuna yönlendirme.  
* **Risk:** 3D render'ın düşük segment telefonlarda kasması.  
* **Çözüm:** Shader optimizasyonu ve düşük poli (low-poly) modellerle performans öncelikli tasarım.

---

**Profesyonel Tavsiyesi:** MVP'de sosyal akışı (feed) ve mesajlaşmayı tamamen kapsam dışı bıraktık. Çünkü ilk aşamada UNISHELF bir "sergileme ve disiplin" aracı olmalı. Kullanıcı kendi kütüphanesine aşık olmazsa, başkasınınkine bakmak için geri gelmez.

