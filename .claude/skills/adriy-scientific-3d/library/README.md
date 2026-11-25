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
