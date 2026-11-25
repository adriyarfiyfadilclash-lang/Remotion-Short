---
name: adriy-cosmic-motion
description: "Membuat video Remotion bergaya ADRIY Cosmic Motion: luar angkasa, tata surya, galaksi, fisika kosmik, HUD dokumenter sains, judul sinematik, dan kredit akhir. Gunakan untuk video astronomi atau sains antariksa."
---

# ADRIY Cosmic Motion

> Isi panduan di bawah diambil dari `library/README.md`.

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

## Cara memakai pustaka ini
Kode sumber lengkap ada di folder `library/` di samping file ini (path relatif terhadap folder skill ini).
1. Baca `library/README.md`, lalu `INTEGRATION-MAP.md`, `QUALITY-CHECKLIST.md`, dan `docs/` bila ada untuk mengetahui komponen yang tersedia beserta props-nya.
2. Salin hanya komponen yang dibutuhkan dari `library/src` (atau `library/modules/*/src`) ke `src/` proyek Remotion yang sedang dikerjakan. Jangan mengimpor langsung dari folder `.claude/`.
3. Sesuaikan versi: proyek ini memakai Remotion 4.0.242, React 18.3.1, @remotion/three 4.0.242, @react-three/fiber 8.17.10, dan three 0.169.0. Periksa import di komponen yang disalin dan tambahkan dependensi yang kurang.
4. Showcase pustaka umumnya berukuran 1920×1080. Untuk video pendek 9:16, ubah ke 1080×1920 dan atur ulang tata letak, ukuran teks, serta posisi kamera.
5. Jalankan `npm run typecheck`, lalu render contoh singkat (misalnya `npx remotion still` atau render beberapa frame) untuk memeriksa hasil sebelum render penuh.
