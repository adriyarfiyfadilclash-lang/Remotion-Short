---
name: adriy-flat-design
description: "Membuat video Remotion bergaya ADRIY Flat Design: bentuk sederhana, warna terarah, ikon datar, infografis, tipografi, dan transisi bersih. Gunakan untuk video penjelasan (explainer), data, tips, atau edukasi umum yang ringan."
---

# ADRIY Flat Design

> Isi panduan di bawah diambil dari `library/docs/SKILL.md`.

# ADRIY Flat Design — Panduan Utama

Gunakan Flat Design untuk menyampaikan informasi dengan bentuk sederhana, warna terarah, dan gerakan yang mudah diikuti.

## Alur produksi yang disarankan

1. Susun naskah dan pecah menjadi adegan.
2. Pilih animasi dasar untuk objek dan ilustrasi.
3. Gunakan transisi hanya saat perpindahan adegan memang diperlukan.
4. Terapkan tipografi dengan hierarki yang konsisten.
5. Tambahkan bentuk dan ikon untuk membantu pemahaman.
6. Ubah data menjadi infografik dengan skala dan label yang akurat.
7. Gunakan efek gerak sebagai penekanan, bukan hiasan berlebihan.
8. Pratinjau seluruh video, periksa keterbacaan, lalu render.

## Prinsip visual

- Palet warna terbatas dan konsisten.
- Maksimal dua keluarga huruf dalam satu video.
- Satu pesan utama per adegan.
- Sisakan ruang kosong.
- Gerakan mendukung narasi dan tidak mengganggu pembacaan.
- Angka, label, dan sumber data harus benar.

## Pemeriksaan sebelum render

- Pastikan setiap komposisi terdaftar di `src/Root.tsx`.
- Jalankan `npm install`.
- Jalankan `npm run typecheck`.
- Buka Remotion Studio dan periksa setiap komposisi.
- Render cuplikan pendek sebelum render penuh.

## Panduan per modul
Baca addon modul yang relevan sebelum memakai modul tersebut:
- `library/src/libraries/flat-animation/docs/SKILL-ADDON.md`
- `library/src/libraries/flat-effects-motion/docs/SKILL-ADDON.md`
- `library/src/libraries/flat-infographics/docs/SKILL-ADDON.md`
- `library/src/libraries/flat-shapes-icons/docs/SKILL-ADDON.md`
- `library/src/libraries/flat-transition/docs/SKILL-ADDON.md`
- `library/src/libraries/flat-typography/docs/SKILL-ADDON.md`

## Cara memakai pustaka ini
Kode sumber lengkap ada di folder `library/` di samping file ini (path relatif terhadap folder skill ini).
1. Baca `library/README.md`, lalu `INTEGRATION-MAP.md`, `QUALITY-CHECKLIST.md`, dan `docs/` bila ada untuk mengetahui komponen yang tersedia beserta props-nya.
2. Salin hanya komponen yang dibutuhkan dari `library/src` (atau `library/modules/*/src`) ke `src/` proyek Remotion yang sedang dikerjakan. Jangan mengimpor langsung dari folder `.claude/`.
3. Sesuaikan versi: proyek ini memakai Remotion 4.0.242, React 18.3.1, @remotion/three 4.0.242, @react-three/fiber 8.17.10, dan three 0.169.0. Periksa import di komponen yang disalin dan tambahkan dependensi yang kurang.
4. Showcase pustaka umumnya berukuran 1920×1080. Untuk video pendek 9:16, ubah ke 1080×1920 dan atur ulang tata letak, ukuran teks, serta posisi kamera.
5. Jalankan `npm run typecheck`, lalu render contoh singkat (misalnya `npx remotion still` atau render beberapa frame) untuk memeriksa hasil sebelum render penuh.
