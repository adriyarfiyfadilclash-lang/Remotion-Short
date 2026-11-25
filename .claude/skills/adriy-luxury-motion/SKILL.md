---
name: adriy-luxury-motion
description: "Membuat motion graphic Remotion bergaya Luxury Motion: elegan, premium, minimalis, presisi, dengan gerakan halus, pencahayaan terarah, material berkelas, dan tipografi editorial. Gunakan saat pengguna meminta iklan produk premium, pembukaan elegan, atau visual mewah."
---

# ADRIY Luxury Motion

> Isi panduan di bawah diambil dari `library/docs/SKILL.md`.

# ADRIY Luxury Motion — Skill Remotion

## Tujuan
Menghasilkan animasi Remotion yang terasa premium dan terarah, bukan sekadar menambahkan warna emas atau efek glow. Prioritaskan komposisi, ritme, ruang kosong, material, pencahayaan, dan gerakan yang terkendali.

## Batas cakupan
Skill ini hanya mengatur **Luxury Motion**. Jangan otomatis mencampurnya dengan Documentary Motion, Flat Design, Paper Cutout, Realistic 3D, Exploded View, Scientific 3D, atau Mixed Media kecuali diminta secara eksplisit.

## Arah visual
- Komposisi minimalis dengan satu fokus utama.
- Ruang kosong yang cukup; hindari memenuhi layar.
- Palet dasar: hitam arang, putih gading, abu-abu hangat, champagne, atau emas lembut. Gunakan maksimal 2–3 warna utama.
- Material: metal satin, kaca, keramik, kulit, atau permukaan matte. Pilih sesuai produk.
- Cahaya: key light lembut, rim light terkontrol, bayangan halus, highlight tidak meledak.
- Tipografi: editorial, rapi, kontras ukuran yang jelas. Gunakan satu keluarga font utama dan maksimal satu font pendamping.
- Hindari: glow berlebihan, partikel acak, terlalu banyak garis emas, transisi berisik, gerakan memantul tanpa alasan, dan teks terlalu banyak.

## Tata bahasa gerak
1. **Reveal**: objek masuk perlahan dari gelap, blur, mask, atau perubahan cahaya.
2. **Settle**: objek berhenti dengan easing lembut; jangan berhenti mendadak.
3. **Hero movement**: gerakan kamera kecil (scale/translate/rotate) untuk memberi kesan kamera fisik.
4. **Detail moment**: beri jeda agar penonton sempat melihat material atau detail.
5. **Exit**: tutup dengan fade, perubahan fokus, atau gerakan keluar yang konsisten.

Gunakan `spring` hanya bila gerak memang membutuhkan elastisitas. Untuk kesan mewah, utamakan `interpolate` dengan easing `Easing.inOut(Easing.cubic)` atau kurva sejenis. Hindari overshoot besar.

## Aturan komposisi
- Satu pesan utama per adegan.
- Satu objek hero atau satu kelompok objek yang jelas.
- Jaga margin aman untuk teks.
- Pastikan hierarki: objek → judul → detail kecil.
- Jangan menaruh teks di atas area produk yang paling penting.

## Aturan teknis Remotion
- Semua animasi harus diturunkan dari `useCurrentFrame()` dan `useVideoConfig()`.
- Gunakan `interpolate()` dengan `extrapolateLeft: "clamp"` dan `extrapolateRight: "clamp"` bila sesuai.
- Jangan memakai CSS animation, `setTimeout`, `requestAnimationFrame`, atau nilai acak yang berubah setiap render.
- Gunakan komponen kecil yang dapat digunakan ulang.
- Pastikan komposisi bekerja pada rasio dan fps yang diberikan oleh Remotion.
- Jangan mengklaim objek 2D/CSS sebagai model 3D sungguhan. Untuk geometri 3D nyata, gunakan aset 3D/render eksternal atau alur Three.js yang memang disiapkan.

## Alur kerja saat membuat video
1. Tanyakan atau simpulkan produk/objek, pesan utama, durasi, rasio, dan aset yang tersedia. Jika informasi penting tidak ada, ajukan satu pertanyaan paling penting.
2. Buat storyboard singkat per adegan.
3. Tentukan palet, tipografi, material, dan arah cahaya.
4. Implementasikan reveal, gerak hero, detail moment, dan penutup.
5. Jalankan render/preview; periksa clipping, keterbacaan, timing, dan konsistensi.
6. Revisi berdasarkan hasil, bukan hanya asumsi.

## Standar mutu sebelum selesai
- Gerakan halus dan tidak tersendat.
- Fokus visual langsung terbaca.
- Tidak ada elemen dekoratif tanpa fungsi.
- Tipografi terbaca pada ukuran layar ponsel.
- Kontras cukup dan highlight terjaga.
- Awal, tengah, dan akhir memiliki ritme yang jelas.
- Tidak ada elemen keluar frame tanpa sengaja.
- Kode dapat dipakai ulang dan mudah disesuaikan.

## Komponen starter
Gunakan `src/LuxuryReveal.tsx` sebagai contoh pola reveal 2.5D berbasis CSS. Gunakan `src/luxuryTokens.ts` untuk token warna, durasi, dan easing. Ganti placeholder produk dengan foto/render produk yang sah dan berkualitas tinggi.

## Jangan lakukan
- Jangan mengubah setiap adegan menjadi hitam-emas.
- Jangan menambahkan flare, glow, debu, atau partikel hanya agar terlihat mahal.
- Jangan memakai gerakan lambat untuk semua elemen; variasikan timing dengan sengaja.
- Jangan meniru merek atau iklan tertentu secara persis.

## Cara memakai pustaka ini
Kode sumber lengkap ada di folder `library/` di samping file ini (path relatif terhadap folder skill ini).
1. Baca `library/README.md`, lalu `INTEGRATION-MAP.md`, `QUALITY-CHECKLIST.md`, dan `docs/` bila ada untuk mengetahui komponen yang tersedia beserta props-nya.
2. Salin hanya komponen yang dibutuhkan dari `library/src` (atau `library/modules/*/src`) ke `src/` proyek Remotion yang sedang dikerjakan. Jangan mengimpor langsung dari folder `.claude/`.
3. Sesuaikan versi: proyek ini memakai Remotion 4.0.242, React 18.3.1, @remotion/three 4.0.242, @react-three/fiber 8.17.10, dan three 0.169.0. Periksa import di komponen yang disalin dan tambahkan dependensi yang kurang.
4. Showcase pustaka umumnya berukuran 1920×1080. Untuk video pendek 9:16, ubah ke 1080×1920 dan atur ulang tata letak, ukuran teks, serta posisi kamera.
5. Jalankan `npm run typecheck`, lalu render contoh singkat (misalnya `npx remotion still` atau render beberapa frame) untuk memeriksa hasil sebelum render penuh.
