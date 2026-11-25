# Gaya Video: ADRIY Cosmic Motion

Gaya baku untuk video pendek bertopik luar angkasa: astronomi, planet, bintang, dan galaksi. Contoh acuannya ada di `contoh-gaya/cosmic/`, terdiri dari 3 adegan: Saturnus, Tata Surya, dan Bima Sakti. Pemilik kanal sudah menyetujui bentuk dan detail di bawah, jadi **pertahankan persis**. Pakai ulang komponen di `contoh-gaya/cosmic/pustaka.tsx`, jangan dibuat ulang dari nol.

## 1. Format dan teknis
- Rasio 9:16, ukuran 1080×1920, 30 fps. Tiap adegan sekitar 110 frame (3,7 detik), atau lebih panjang bila ada narasi.
- 3D memakai `ThreeCanvas` dari `@remotion/three`, **bukan** `<Canvas>`, supaya gerakan terkunci ke nomor frame. Jangan pakai `@react-three/drei`.
- Semua sebaran bintang, nebula, dan asteroid memakai seed tetap, tanpa `Math.random()`.
- Kamera diatur tiap frame lewat `AturKamera`. Label 2D ditempatkan dengan memproyeksikan titik 3D ke layar (`keLayar`).
- Render gambar: `npx remotion still contoh-gaya/cosmic/index.ts ContohCosmic out/x.png --frame=N`

## 2. Palet
| Elemen | Warna |
|---|---|
| Latar angkasa | `#020713` |
| Aksen HUD, label, garis | `#79d9ff` (biru muda) |
| Judul | `#f4f9ff` dengan glow biru `rgba(75,170,255,.55)` |
| Subjudul | `#b9cce0` |
| Nebula ungu | `#6c4db5` → `#e477a8` |
| Nebula biru | `#1f5fb5` → `#46d3e6` |
| Matahari | inti `#ffb44d`, cahaya `#ffb347` dan `#ff7b2e` |
| Inti galaksi | `#ffe2ad`, lengan `#9fbaff` dengan sedikit bintang merah muda `#ff8fb3` |

## 3. Objek 3D (detail yang disukai)
- **Medan bintang**: sekitar 3000 titik dengan 4 warna (putih kebiruan, krem, biru, jingga muda), kecerahan bervariasi, radius 60–90.
- **Nebula**: awan partikel bertekstur titik lembut, campuran warna aditif, letaknya jauh di belakang (z sekitar −40). Opasitasnya **rendah (0,12–0,16)** supaya tidak menutupi judul.
- **Planet**:
  - Tekstur prosedural dari kanvas. Raksasa gas memakai pita halus dengan opasitas 0,3 dan sedikit bercak, sedangkan planet batuan memakai bercak.
  - Bahan `meshStandardMaterial` dengan roughness 0,85.
  - Diterangi satu cahaya utama dari samping, sehingga separuh planet gelap (terminator tegas).
- **Cincin**: `ringGeometry` dengan UV radial, tekstur pita krem-cokelat transparan, dan celah Cassini tipis. Pada adegan pembuka, cincin dan planet dimiringkan (sekitar 0,42 dan −0,28 rad).
- **Matahari**: bola `meshBasicMaterial` oranye keemasan, dua sprite cahaya aditif (ukuran 5 dan 10), dan point light kuat di pusat.
- **Tata surya**:
  - Dilihat miring dari atas, sehingga orbit tampak sebagai elips memenuhi lebar layar.
  - Orbit berupa cincin tipis `#5c839b` dengan opasitas 0,35, dan sabuk asteroid dibuat dari batu dodecahedron.
  - Ukuran dan jarak planet tidak sesuai skala, jadi wajib diberi keterangan.
- **Galaksi spiral**:
  - 4 lengan spiral logaritmik (`2.6·log(1+r)`), dengan sebaran bintang sempit dan sekitar 18% bintang tersebar lebar.
  - Ukuran titik 0,1 dan opasitas 0,55 dengan pencampuran aditif, supaya tidak silau.
  - Inti bercahaya krem, dan galaksi berputar pelan.
- **Pencahayaan**: ambient sangat redup (0,06–0,12), key light hangat `#fff2dc`, serta fill atau rim kebiruan dan keunguan.
- **Gerak kamera**: dolly maju pelan, atau orbit kecil (sekitar 0,35 rad per adegan). Tidak ada gerakan cepat.

## 4. Lapisan 2D
- **HUD** di kiri atas: garis vertikal aksen, nama bab "COSMIC MOTION" (ukuran 30, tebal, jarak huruf 6), dan detail "BAGIAN 0X · NAMA" (ukuran 22, opasitas 0,7). Di kanan atas ada penghitung "FRAME 0000".
- **Bingkai sudut**: 4 siku biru muda transparan di tiap pojok layar.
- **Judul** di tengah atas (top sekitar 260–300):
  - Label kecil berhuruf kapital dengan jarak huruf sangat lebar (ukuran 28, jarak 10)
  - Judul utama kapital (ukuran 96, ExtraBold, glow)
  - Subjudul (ukuran 40)
  - Muncul dengan naik dan memudar masuk (ease-out cubic), lalu memudar keluar.
- **Penanda**: lingkaran berdenyut dengan titik di objek, garis siku ke kartu info (latar gelap transparan, bingkai aksen, radius 10, teks tidak terlipat). Kartu ditempatkan di sisi yang muat di layar.
- **Keterangan bawah**: kartu gelap di bawah layar (bottom 150) untuk catatan seperti "tidak sesuai skala".
- Font **Poppins** lokal (lewat `FONT` dari `src/components/Teks.tsx`).

## 5. Isi dan fakta
- Nada dokumenter sains: serius, kagum, dan ringkas.
- Angka diambil dari sumber tepercaya (NASA dan sejenisnya) dan ditulis dengan "±" atau "sekitar" bila berupa perkiraan.
