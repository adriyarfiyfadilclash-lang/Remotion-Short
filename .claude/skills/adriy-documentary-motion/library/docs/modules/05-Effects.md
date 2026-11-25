# Documentary Effects — Skill Add-on

## Tujuan
Membangun suasana dokumenter melalui tekstur, cahaya, partikel, dan penyatuan warna tanpa mengganggu informasi utama.

## Komponen
- `DocumentaryGrain`: tekstur butiran film.
- `DocumentaryVignette`: penggelapan lembut di tepi gambar.
- `DocumentaryLightLeak`: kebocoran cahaya sebagai aksen.
- `DocumentaryDust`: partikel debu yang bergerak.
- `DocumentaryAtmosphere`: kabut/haze lembut.
- `DocumentaryGateWeave`: tekstur halus di tepi frame.
- `DocumentaryColorWash`: lapisan warna untuk menyatukan tone.

## Aturan visual
1. Efek harus mendukung suasana dan cerita.
2. Grain, vignette, dan wash harus cukup halus agar detail tetap terlihat.
3. Gunakan light leak hanya pada momen tertentu, bukan sepanjang video.
4. Partikel debu cocok untuk arsip, ruangan, atau cahaya yang relevan.
5. Atmosfer jangan menutupi wajah, teks, atau detail bukti.
6. Hindari goresan film berlebihan yang membuat gambar tampak rusak.

## Catatan teknis
- Semua efek adalah lapisan 2D berbasis React/CSS, bukan simulasi optik atau partikel fisik.
- Grain memakai SVG turbulence sebagai tekstur.
- Untuk proyek berat, batasi jumlah partikel dan lapisan efek.
- Periksa hasil render karena efek campuran warna dapat terlihat berbeda di tiap aset.
