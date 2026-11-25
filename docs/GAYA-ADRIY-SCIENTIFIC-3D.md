# Gaya Video: ADRIY Scientific 3D

Gaya baku untuk video pendek bertopik sains mikro: molekul, kimia, DNA dan genetika, sel, dan biologi sel. Contoh acuannya ada di `contoh-gaya/scientific/`, terdiri dari 3 adegan: DNA, H₂O, dan sel hewan. Pemilik kanal sudah menyetujui bentuk dan detail di bawah, jadi **pertahankan persis**. Pakai ulang komponen di `contoh-gaya/scientific/pustaka.tsx`.

## 1. Format dan teknis
- Rasio 9:16, ukuran 1080×1920, 30 fps. Tiap adegan sekitar 110 frame, atau lebih panjang bila ada narasi.
- 3D memakai `ThreeCanvas` dengan `alpha: true`, supaya latar CSS laboratorium terlihat di belakang objek. Jangan pakai `@react-three/drei`. Garis dibuat dari tabung 3D (`Tabung`) atau silinder (`Batang`).
- Gerakan berasal dari `useCurrentFrame()` dengan nilai tetap, tanpa angka acak.
- Kamera diatur tiap frame lewat `AturKamera`. Label 2D diproyeksikan dari titik 3D dengan `keLayar`. Bila objek diputar atau dimiringkan, transformasi yang sama juga harus diterapkan sebelum proyeksi.
- Render gambar: `npx remotion still contoh-gaya/scientific/index.ts ContohScientific out/x.png --frame=N`

## 2. Palet
| Elemen | Warna |
|---|---|
| Latar | gradien `#061321` → `#0c2638` → `#102d43`, sorot radial biru di tengah, grid 60 px cyan sangat tipis |
| Aksen utama | cyan `#59d9ff` |
| Angka dan nilai | emas `#f0c879` |
| Membran sel | teal `#43c9b1` |
| Judul | `#f2fbff` |
| Subjudul | `#b8d6e6` |
| Basa DNA | A `#f2a65a`, T `#e86b79`, G `#8be08a`, C `#59c7ef` |
| Untai DNA | biru `#59c7ef` dan putih `#d7e7ef`, dengan bola fosfat |
| Atom | O `#e86b79`, H `#f3f7fb`, ikatan `#cfdbe4` |
| Organel | nukleus `#a78bfa`, nukleolus `#f4b6d2`, mitokondria `#f2a65a`, Golgi `#e8c66b`, RE `#64a8d8`, lisosom `#8be08a`, ribosom `#20384c` |

## 3. Objek 3D (detail yang disukai)
- **Bahan**: `meshPhysicalMaterial` mengilap (roughness 0,25–0,35, clearcoat 0,5–0,8), sehingga tampak seperti model plastik laboratorium yang bersih.
- **Pencahayaan laboratorium**: ambient 0,45 `#d8eaff`, key light putih dari kanan atas, fill `#8db9d8` dari kiri, dan rim light cyan dari belakang.
- **DNA**:
  - Heliks putar kanan dengan 10,5 pasang basa per putaran.
  - Kedua untai digeser 0,72π (bukan π), sehingga terbentuk alur besar dan alur kecil.
  - Tiap pasangan basa dibagi dua warna sesuai basanya, dan heliks dimiringkan sedikit (0,18 rad).
  - Ada cincin pemindai yang bergerak naik-turun dan cangkang cahaya samar.
- **Molekul**:
  - Model bola-batang dengan sudut dan proporsi yang benar (H₂O 104,5°). Sudut ditandai busur emas berisi kipas transparan.
  - Awan elektron berupa cangkang aditif samar, dan muatan parsial δ−/δ+ ditulis di dekat atomnya.
  - Molekul lain di latar dibuat redup (opasitas 0,35), dengan getaran kecil dan ayunan pelan.
- **Sel**:
  - Membran teal berlapis dua, dengan potongan (cutaway) sekitar 110° yang **selalu menghadap kamera**, sehingga isi sel terlihat.
  - Isinya:
    - Nukleus dengan nukleolus dan pori
    - RE berupa tabung bergelombang yang melingkari nukleus
    - Mitokondria berupa kapsul dengan cincin krista
    - Golgi berupa tumpukan busur
    - Lisosom dan ribosom yang tersebar
- **Gerak kamera**: dolly maju pelan (sekitar 1 unit per adegan), objek berputar perlahan. Tidak ada gerakan cepat.

## 4. Lapisan 2D
- **HUD** di kiri atas: lampu cyan berkedip, tulisan "SCIENTIFIC 3D" (ukuran 30, tebal, jarak huruf 5), dan "LAB 0X · BIDANG" dengan huruf monospace cyan. Di kanan atas ada "REC ● dd:ff" dan "MODE: ILUSTRASI" berhuruf monospace abu-biru.
- **Judul** rata kiri (top 230):
  - Label kecil berhuruf kapital dengan jarak huruf sangat lebar (ukuran 26, jarak 8)
  - Judul (ukuran 104, ExtraBold)
  - Garis gradien cyan yang memanjang dari kiri
  - Subjudul (ukuran 38)
- **Label**: titik dan cincin pada objek, garis putus-putus, lalu kartu gelap dengan strip warna di sisi kiri yang sama dengan warna objeknya. Kartu dihitung supaya selalu utuh di dalam layar.
- **Legenda** (bila perlu): bar warna kecil di kanan.
- **Kartu angka** di bawah (bottom 120): dua baris "nama | nilai". Nilainya berwarna emas, berhuruf monospace, dan disertai satuan.
- **Catatan kejujuran** paling bawah, berhuruf kecil kapital, misalnya "MODEL KONSEPTUAL · BUKAN SKALA SEBENARNYA".
- Font **Poppins** lokal, ditambah huruf monospace (`DejaVu Sans Mono`) untuk data.

## 5. Isi dan fakta
- Nada laboratorium edukatif: jelas, tepat, dan ringkas. Satu informasi utama per adegan.
- Jangan mengarang nilai, satuan, atau skala. Pakai angka dari sumber tepercaya, dan tulis "≈" atau "±" untuk nilai perkiraan.
- Bedakan ilustrasi konseptual dari data eksperimen, dengan selalu mencantumkan catatan kejujuran.
