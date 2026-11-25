---
name: adriy-paper-cutout
description: "Membuat video Remotion bergaya ADRIY Paper Cutout: potongan kertas berlapis, tekstur kertas, bayangan lembut, tipografi, infografis, dan transisi kertas. Gunakan untuk video edukasi atau cerita yang terasa hangat dan handmade."
---

# ADRIY Paper Cutout

> Isi panduan di bawah diambil dari `library/docs/SKILL.md`.

# ADRIY Paper Cutout — Integrated Skill

Saat membuat video dengan gaya Paper Cutout, gunakan enam kelompok pustaka yang tersedia di `src/paper`.

## Alur produksi
1. Rancang adegan dan urutan informasi.
2. Susun latar dan lapisan bentuk menggunakan `shapes-elements`.
3. Gerakkan objek menggunakan `animation`.
4. Hubungkan adegan menggunakan `transition`.
5. Tambahkan judul, label, dan keterangan menggunakan `typography`.
6. Sajikan data menggunakan `infographics` bila dibutuhkan.
7. Beri tekstur akhir menggunakan `texture-effects`.

## Identitas visual
- Nuansa kolase kertas, potongan manual, dan lapisan bertumpuk.
- Palet utama: krem, mustard, terracotta, hijau sage, biru kusam.
- Bayangan lembut dan rotasi kecil untuk memberi kedalaman.
- Jaga teks dan angka tetap terbaca.
- Hindari efek 3D realistis; pertahankan karakter ilustrasi 2D.

## Prinsip gerak
- Gerakan sederhana: pop, slide, float, flip, peel, fold.
- Gunakan easing lembut dan jeda antarelemen.
- Jangan membuat semua elemen bergerak bersamaan.
- Pastikan transisi mendukung alur cerita, bukan menjadi distraksi.

## Pemeriksaan sebelum render
- Cek durasi, fps, rasio, safe area, dan keterbacaan.
- Pastikan seluruh aset tersedia dan jalur impor benar.
- Jalankan typecheck, buka Remotion Studio, lalu render uji.

## Cara memakai pustaka ini
Kode sumber lengkap ada di folder `library/` di samping file ini (path relatif terhadap folder skill ini).
1. Baca `library/README.md`, lalu `INTEGRATION-MAP.md`, `QUALITY-CHECKLIST.md`, dan `docs/` bila ada untuk mengetahui komponen yang tersedia beserta props-nya.
2. Salin hanya komponen yang dibutuhkan dari `library/src` (atau `library/modules/*/src`) ke `src/` proyek Remotion yang sedang dikerjakan. Jangan mengimpor langsung dari folder `.claude/`.
3. Sesuaikan versi: proyek ini memakai Remotion 4.0.242, React 18.3.1, @remotion/three 4.0.242, @react-three/fiber 8.17.10, dan three 0.169.0. Periksa import di komponen yang disalin dan tambahkan dependensi yang kurang.
4. Showcase pustaka umumnya berukuran 1920×1080. Untuk video pendek 9:16, ubah ke 1080×1920 dan atur ulang tata letak, ukuran teks, serta posisi kamera.
5. Jalankan `npm run typecheck`, lalu render contoh singkat (misalnya `npx remotion still` atau render beberapa frame) untuk memeriksa hasil sebelum render penuh.
