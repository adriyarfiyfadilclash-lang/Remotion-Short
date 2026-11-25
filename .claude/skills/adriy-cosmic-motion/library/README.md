# ADRIY Cosmic Motion — Tahap 8: Cosmic Final Project

Tahap final yang menyatukan seluruh pustaka Tahap 1–7 dan menambahkan tujuh komponen untuk mengatur adegan, urutan, transisi, judul, HUD, dan kredit akhir.

## 7 komponen baru
1. `CosmicSceneDirector` — mengatur durasi adegan dan pudar masuk/keluar.
2. `CosmicTimelineMarker` — penanda babak pada bingkai tertentu.
3. `CosmicTransitionWipe` — lapisan transisi sapuan.
4. `CosmicTitleSequence` — judul sinematik dan subjudul.
5. `CosmicHUDOverlay` — tampilan informasi bergaya dokumenter sains.
6. `CosmicShotSwitcher` — menyusun beberapa pengambilan gambar pada garis waktu.
7. `CosmicEndCredits` — tampilan kredit penutup.

## Showcase final
- Komposisi: `CosmicFinalProjectShowcase`
- Resolusi: 1920 × 1080
- FPS: 30
- Durasi: 240 bingkai (8 detik)

Paket mencakup seluruh sumber Tahap 1–8. Efek visual dari tahap sebelumnya tetap dapat digunakan. Gunakan satu kamera aktif `makeDefault` dalam satu adegan. Periksa urutan `Sequence` dan waktu transisi sebelum render akhir.
