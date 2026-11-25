---
name: adriy-scientific-3d
description: "Membuat video Remotion bergaya ADRIY Scientific 3D: molekul, sel, struktur ilmiah, tipografi sains, kamera dan pencahayaan laboratorium, serta efek ilmiah dengan React Three Fiber. Gunakan untuk video sains, kimia, biologi sel, atau fisika."
---

# ADRIY Scientific 3D

> Isi panduan di bawah diambil dari `library/README.md`.

# ADRIY Scientific 3D — Final Project

Proyek akhir yang menggabungkan enam pustaka Scientific 3D menjadi satu komposisi Remotion.

## Komposisi utama
- **ID:** `Scientific3DFinalProject`
- **Resolusi:** 1920 × 1080
- **Kecepatan bingkai:** 30 fps
- **Durasi:** 450 frame / 15 detik
- **Komposisi:** `src/Scientific3DFinalShowcase.tsx`
- **Root Remotion:** `src/Root.tsx`

## Enam modul terintegrasi
| Modul | Komponen |
|---|---:|
| Scientific Animation | 7 |
| Scientific Transition | 7 |
| Scientific Typography | 7 |
| Molecules, Cells & Structures | 7 |
| Scientific Camera & Lighting | 7 |
| Scientific Effects | 7 |
| **Total** | **42** |

Seluruh source modul asli dipertahankan dalam folder `modules/`, masing-masing dengan `src/`, contoh, README, dan catatan modul.

## Struktur proyek
- `src/` — komposisi final, root Remotion, dan barrel export.
- `modules/` — enam pustaka yang digabungkan.
- `package.json` — daftar dependensi dan perintah dasar.
- `tsconfig.json` — konfigurasi TypeScript.
- `QUALITY-CHECKLIST.md` — daftar pemeriksaan sebelum produksi.
- `INTEGRATION-MAP.md` — peta integrasi modul.

## Menjalankan proyek
1. Sesuaikan versi `remotion`, `@remotion/cli`, `@remotion/three`, React, Three.js, Fiber, dan Drei di `package.json` agar cocok satu sama lain dengan proyek induk.
2. Pasang dependensi menggunakan pengelola paket pilihan.
3. Jalankan `npm run start` untuk membuka Remotion Studio.
4. Pilih komposisi `Scientific3DFinalProject`.
5. Render dengan `npm run render`.

Versi dependensi sengaja ditulis sebagai penanda penyesuaian, bukan angka versi yang diasumsikan cocok untuk semua proyek.

## Catatan akurasi
Model molekul, sel, DNA, gelombang, pemindaian, dan energi di showcase merupakan ilustrasi konseptual. Jangan menyajikannya sebagai simulasi fisika, data eksperimen, atau geometri biologi/kimia tervalidasi. Gunakan data struktur dan skala yang bersumber jika membutuhkan ketepatan ilmiah.

## Status validasi
ZIP dibuat dan struktur arsip diperiksa. Pemeriksaan relatif impor lokal dilakukan pada berkas TypeScript/TSX. Proyek belum dipasang dependensinya, belum menjalani `tsc`, belum dibuka di Remotion Studio, dan belum dirender.

## Panduan per modul
Baca addon modul yang relevan sebelum memakai modul tersebut:
- `library/modules/molecules-cells-structures/SKILL-ADDON.md`
- `library/modules/scientific-animation/SKILL-ADDON.md`
- `library/modules/scientific-camera-lighting/SKILL-ADDON.md`
- `library/modules/scientific-effects/SKILL-ADDON.md`
- `library/modules/scientific-transition/SKILL-ADDON.md`
- `library/modules/scientific-typography/SKILL-ADDON.md`

## Cara memakai pustaka ini
Kode sumber lengkap ada di folder `library/` di samping file ini (path relatif terhadap folder skill ini).
1. Baca `library/README.md`, lalu `INTEGRATION-MAP.md`, `QUALITY-CHECKLIST.md`, dan `docs/` bila ada untuk mengetahui komponen yang tersedia beserta props-nya.
2. Salin hanya komponen yang dibutuhkan dari `library/src` (atau `library/modules/*/src`) ke `src/` proyek Remotion yang sedang dikerjakan. Jangan mengimpor langsung dari folder `.claude/`.
3. Sesuaikan versi: proyek ini memakai Remotion 4.0.242, React 18.3.1, @remotion/three 4.0.242, @react-three/fiber 8.17.10, dan three 0.169.0. Periksa import di komponen yang disalin dan tambahkan dependensi yang kurang.
4. Showcase pustaka umumnya berukuran 1920×1080. Untuk video pendek 9:16, ubah ke 1080×1920 dan atur ulang tata letak, ukuran teks, serta posisi kamera.
5. Jalankan `npm run typecheck`, lalu render contoh singkat (misalnya `npx remotion still` atau render beberapa frame) untuk memeriksa hasil sebelum render penuh.
