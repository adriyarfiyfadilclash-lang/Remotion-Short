---
name: adriy-exploded-view
description: "Membuat video Remotion bergaya ADRIY Exploded View: animasi 3D pembongkaran dan perakitan objek dengan label komponen, garis penunjuk, kamera orbit, dan efek pemindaian. Gunakan untuk menjelaskan cara kerja mesin, gadget, atau produk dari bagian-bagiannya."
---

# ADRIY Exploded View

> Isi panduan di bawah diambil dari `library/SKILL.md`.

# ADRIY Exploded View — Skill Utama

## Peran
Bangun animasi pembongkaran dan perakitan objek 3D yang informatif, sinematik, dan mudah dipahami untuk konten ADRIY.PROJECT.

## Alur produksi
1. Tentukan objek, bagian utama, dan urutan pembongkaran.
2. Siapkan geometri dan material komponen.
3. Atur posisi terpasang dan posisi terurai setiap bagian.
4. Tentukan urutan gerak menggunakan modul Animation.
5. Gunakan Transition saat berpindah dari tampilan utuh ke tampilan terurai atau antaradegan.
6. Tambahkan nomor, label, garis penunjuk, dan dimensi dengan Typography.
7. Atur sudut kamera, orbit, dolly, dan pencahayaan.
8. Tambahkan efek pendukung secukupnya.
9. Periksa seluruh bagian dari kamera akhir.
10. Jalankan pemeriksaan tipe dan render uji sebelum produksi.

## Prinsip visual
- Utamakan keterbacaan struktur dibanding efek dekoratif.
- Pisahkan komponen secara bertahap dan terarah.
- Pastikan setiap bagian memiliki posisi asal dan tujuan yang jelas.
- Gunakan label yang ringkas dan garis penunjuk yang tidak saling bertumpuk.
- Gerakan kamera harus membantu pemahaman bentuk.
- Jaga material, cahaya, dan kontras agar detail tetap terlihat.
- Jangan menyatakan model ilustratif sebagai rekonstruksi teknis presisi tanpa sumber/model CAD.

## Struktur modul
Lihat README di masing-masing folder `modules/` untuk daftar komponen, ketergantungan, contoh, batasan, dan daftar pemeriksaan.

## Panduan per modul
Baca addon modul yang relevan sebelum memakai modul tersebut:
- `library/modules/animation/SKILL-ADDON.md`
- `library/modules/camera-lighting/SKILL-ADDON.md`
- `library/modules/components-assembly/SKILL-ADDON.md`
- `library/modules/effects/SKILL-ADDON.md`
- `library/modules/transition/SKILL-ADDON.md`
- `library/modules/typography/SKILL-ADDON.md`

## Cara memakai pustaka ini
Kode sumber lengkap ada di folder `library/` di samping file ini (path relatif terhadap folder skill ini).
1. Baca `library/README.md`, lalu `INTEGRATION-MAP.md`, `QUALITY-CHECKLIST.md`, dan `docs/` bila ada untuk mengetahui komponen yang tersedia beserta props-nya.
2. Salin hanya komponen yang dibutuhkan dari `library/src` (atau `library/modules/*/src`) ke `src/` proyek Remotion yang sedang dikerjakan. Jangan mengimpor langsung dari folder `.claude/`.
3. Sesuaikan versi: proyek ini memakai Remotion 4.0.242, React 18.3.1, @remotion/three 4.0.242, @react-three/fiber 8.17.10, dan three 0.169.0. Periksa import di komponen yang disalin dan tambahkan dependensi yang kurang.
4. Showcase pustaka umumnya berukuran 1920×1080. Untuk video pendek 9:16, ubah ke 1080×1920 dan atur ulang tata letak, ukuran teks, serta posisi kamera.
5. Jalankan `npm run typecheck`, lalu render contoh singkat (misalnya `npx remotion still` atau render beberapa frame) untuk memeriksa hasil sebelum render penuh.
