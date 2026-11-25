---
name: adriy-realistic-3d
description: "Membuat video Remotion bergaya ADRIY Realistic 3D: objek dan material 3D realistis (logam, kaca), teks 3D, kamera sinematik, studio lighting, kabut, partikel, dan efek lingkungan dengan React Three Fiber. Gunakan untuk visual produk, intro sinematik, atau adegan 3D realistis."
---

# ADRIY Realistic 3D

> Isi panduan di bawah diambil dari `library/docs/SKILL.md`.

# ADRIY Realistic 3D — Skill

Bangun visual 3D sinematik di Remotion dengan React Three Fiber. Gunakan enam modul yang sudah digabungkan di `src/modules`.

## Alur kerja
1. Pilih komposisi dan gaya visual.
2. Bentuk objek dengan modul `objects-materials`.
3. Tambahkan animasi dari modul `animation`.
4. Atur kamera dan cahaya dari `camera-lighting`.
5. Bangun latar serta atmosfer dari `environment-fx`.
6. Gunakan transisi dan tipografi bila dibutuhkan.
7. Periksa performa, konsistensi frame, material, bayangan, dan keterbacaan.

## Prinsip visual
- Utamakan satu subjek utama yang mudah dibaca.
- Material harus punya roughness/metalness yang sesuai.
- Gunakan pencahayaan key-fill-rim sebagai titik awal.
- Gerakan kamera harus punya tujuan, bukan bergerak tanpa alasan.
- Efek atmosfer memperkuat kedalaman dan skala.
- Hindari menumpuk partikel, glow, kabut, dan gerakan secara berlebihan.

## Batasan dan pemeriksaan
- Semua animasi harus deterministik berdasarkan frame Remotion.
- Jangan mengandalkan waktu sistem atau gerakan acak tanpa seed.
- Pastikan aset font dan tekstur tersedia secara lokal.
- Lakukan pemeriksaan TypeScript dan render uji sebelum produksi.

## Cara memakai pustaka ini
Kode sumber lengkap ada di folder `library/` di samping file ini (path relatif terhadap folder skill ini).
1. Baca `library/README.md`, lalu `INTEGRATION-MAP.md`, `QUALITY-CHECKLIST.md`, dan `docs/` bila ada untuk mengetahui komponen yang tersedia beserta props-nya.
2. Salin hanya komponen yang dibutuhkan dari `library/src` (atau `library/modules/*/src`) ke `src/` proyek Remotion yang sedang dikerjakan. Jangan mengimpor langsung dari folder `.claude/`.
3. Sesuaikan versi: proyek ini memakai Remotion 4.0.242, React 18.3.1, @remotion/three 4.0.242, @react-three/fiber 8.17.10, dan three 0.169.0. Periksa import di komponen yang disalin dan tambahkan dependensi yang kurang.
4. Showcase pustaka umumnya berukuran 1920×1080. Untuk video pendek 9:16, ubah ke 1080×1920 dan atur ulang tata letak, ukuran teks, serta posisi kamera.
5. Jalankan `npm run typecheck`, lalu render contoh singkat (misalnya `npx remotion still` atau render beberapa frame) untuk memeriksa hasil sebelum render penuh.
