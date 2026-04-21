# NFR Targets

## Operasyonel Eşikler

- OCR confidence: `>= 0.85`
- Sync latency p95: `<= 500ms`
- Battery impact: `<= %2 / saat`
- Cover size: `<= 150KB` (WebP)

## Ölçüm Kaynakları

- `ocr_confidence` alanı metadata fallback çıktısında saklanır.
- Senkronizasyon metrikleri websocket olaylarında ölçülür.
- Mobil profillerde CPU/batarya takip edilir.
- Görsel pipeline çıktı boyutları CI aşamasında doğrulanır.
