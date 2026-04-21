# MVP Release Checklist

- [ ] API migration dosyaları temiz veritabanında başarılı uygulanıyor.
- [ ] Barkod akışı: geçerli ISBN, geçersiz ISBN, metadata yok -> OCR fallback senaryoları çalışıyor.
- [ ] Duplicate akışı kullanıcıya ikinci kopya/yeniden okuma seçeneği sunuyor.
- [ ] 3D raf yerleşimi status bazlı doğru hesaplanıyor.
- [ ] Streak hesaplama UTC + timezone geçişlerinde bozulmuyor.
- [ ] 21:00 akıllı reminder kuralı yalnızca gereken kullanıcıya tetikleniyor.
- [ ] Sync p95 gecikmesi 500ms altında.
- [ ] Kapak çıktıları 150KB altında ve WebP formatında.
- [ ] Unit + integration + e2e testleri CI üzerinde yeşil.
- [ ] Rollback planı doğrulandı (önceki stabil sürüme dönüş adımları test edildi).
