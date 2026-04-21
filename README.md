# UNISHELF

PRD 1.0'a göre yapılandırılmış tam-yığın başlangıç iskeleti.

## Klasörler

- `backend`: FastAPI tabanlı API, domain servisleri, streak ve metadata pipeline.
- `app`: React + TypeScript istemci iskeleti, UI state machine ve 3D shelf katmanı.
- `infra`: İzleme, kalite kapıları ve release doğrulama kontrol listeleri.

## MVP Sınırı

MVP kapsamında:
- Barkod ile kitap ekleme, metadata birleştirme ve OCR fallback.
- Kütüphane yönetimi (`reading`, `finished`, `wishlist`).
- 3D raf görünümü ve status bazlı yerleşim.
- Streak motoru, grace period ve akıllı hatırlatma.
- Offline kayıt ve senkronizasyon sözleşmesi.

MVP dışında (V2 hazırlığı):
- Social feed ekranları.
- `following` veri modeli altyapısı (şimdiden backend tarafında hazır).
