# ADRIY Documentary Motion v1.0

Paket terpadu Documentary Motion untuk Remotion.

## Isi
- 6 perpustakaan komponen (Animation, Transition, Typography, Camera, Effects, Audio)
- 35 komponen reusable
- Proyek contoh `DocumentaryFilm`
- Aset ilustrasi SVG dan audio ambience orisinal sederhana untuk demo
- Dokumentasi `SKILL.md` dan checklist kualitas

## Spesifikasi demo
- Komposisi: `DocumentaryFilm`
- Resolusi: 1920 × 1080
- Frame rate: 30 fps
- Durasi: 40 detik

## Menjalankan
Pastikan Node.js dan npm tersedia, lalu dari folder proyek:

```bash
npm install
npm run start
```

Untuk render:

```bash
npm run render
```

Pemeriksaan tipe:

```bash
npm run typecheck
```

Hasil render disimpan di `out/documentary-film.mp4`.

## Catatan penting
- Paket ini sudah disusun sebagai proyek Remotion, tetapi belum dijalankan `npm install`, `typecheck`, Remotion Studio, atau render di lingkungan ini. Jalankan perintah di atas dan periksa hasilnya sebelum produksi.
- Aset visual demo adalah ilustrasi SVG orisinal, bukan foto dokumenter atau arsip sejarah.
- Audio demo adalah ambience sintetis orisinal sederhana, bukan musik berlisensi atau narasi.
- Ganti aset demo dengan foto/arsip, narasi, musik, dan efek suara yang relevan serta memiliki hak penggunaan.
- Komponen parallax/kamera/efek menggunakan teknik 2D/2.5D, bukan sistem 3D fisik.
