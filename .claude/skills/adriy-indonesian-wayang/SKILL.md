---
name: adriy-indonesian-wayang
description: "Membuat video Remotion bergaya ADRIY Indonesian Wayang: estetika wayang kulit (siluet, kelir, lampu minyak, gunungan, bayangan, ornamen tradisional) untuk sejarah, legenda, dan budaya Nusantara."
---

# ADRIY Indonesian Wayang

> Isi panduan di bawah diambil dari `library/README.md`.

# ADRIY Indonesian Wayang — Final Project

Proyek Remotion terintegrasi untuk membuat video sejarah Nusantara dengan estetika pertunjukan wayang kulit: siluet hitam, detail ukiran, kelir, cahaya lampu minyak, bayangan, gunungan, dan ornamen bernuansa tradisional.

## Komposisi utama
- `WayangFinalShowcase` — video utama 1920×1080, 30 fps, 930 frame (31 detik).
- Enam komposisi pustaka untuk melihat animasi, transisi, tipografi, aset, kamera/pencahayaan, dan efek secara terpisah.

## Menjalankan
1. Ekstrak ZIP.
2. Jalankan `npm install`.
3. Jalankan `npm run start`.
4. Pilih `WayangFinalShowcase` di Remotion Studio.
5. Untuk merender: `npm run build`.

## Struktur
- `src/Animation` — rig, boneka, gerak, gestur, dan pose wayang.
- `src/Transition` — transisi gunungan, kelir, bayangan, lampu minyak, dan babak.
- `src/Typography` — judul, aksara dekoratif, nama kerajaan, prasasti, dan segel tanggal.
- `src/Assets` — gunungan, keraton, candi, kapal, senjata, panji, dan kampung.
- `src/CameraLighting` — cahaya lampu minyak, bayangan, sorot, fokus, dan kamera.
- `src/Effects` — asap, debu, api, partikel, kabut, dan tekstur.
- `showcases` — contoh mandiri dari enam pustaka.

## Catatan akurasi budaya
Aset merupakan ilustrasi generik bernuansa wayang dan sejarah Nusantara, bukan rekonstruksi arkeologis atau pakem tokoh/daerah tertentu. Tipografi menggunakan bentuk dekoratif umum, bukan reproduksi aksara historis tertentu. Untuk produksi sejarah faktual, sesuaikan kostum, senjata, arsitektur, aksara, dan kronologi dengan sumber sejarah yang tepercaya.

## Status pemeriksaan
Struktur dan berkas sumber disatukan dari enam pustaka. Instalasi dependensi, pemeriksaan TypeScript, pembukaan Remotion Studio, dan render video belum dijalankan di lingkungan ini.

## Cara memakai pustaka ini
Kode sumber lengkap ada di folder `library/` di samping file ini (path relatif terhadap folder skill ini).
1. Baca `library/README.md`, lalu `INTEGRATION-MAP.md`, `QUALITY-CHECKLIST.md`, dan `docs/` bila ada untuk mengetahui komponen yang tersedia beserta props-nya.
2. Salin hanya komponen yang dibutuhkan dari `library/src` (atau `library/modules/*/src`) ke `src/` proyek Remotion yang sedang dikerjakan. Jangan mengimpor langsung dari folder `.claude/`.
3. Sesuaikan versi: proyek ini memakai Remotion 4.0.242, React 18.3.1, @remotion/three 4.0.242, @react-three/fiber 8.17.10, dan three 0.169.0. Periksa import di komponen yang disalin dan tambahkan dependensi yang kurang.
4. Showcase pustaka umumnya berukuran 1920×1080. Untuk video pendek 9:16, ubah ke 1080×1920 dan atur ulang tata letak, ukuran teks, serta posisi kamera.
5. Jalankan `npm run typecheck`, lalu render contoh singkat (misalnya `npx remotion still` atau render beberapa frame) untuk memeriksa hasil sebelum render penuh.
