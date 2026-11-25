# Gaya Video: ADRIY Indonesian Wayang

Gaya baku untuk video pendek bertema wayang, legenda, epos (Ramayana, Mahabharata, kakawin), sejarah kerajaan, dan budaya Nusantara. Isinya dikemas sebagai **pertunjukan wayang kulit sungguhan**: kelir, blencong, bayangan, batang pisang, dan **figur wayang asli dari foto berstatus domain publik**. Figur wayang tidak boleh digambar sendiri.

Contoh acuannya ada di `contoh-gaya/wayang/`. Isinya tiga episode dalam `Episode.tsx`: Punakawan, Gunungan, dan Arjunawijaya vs Dasamuka. Pemilik kanal sudah menyetujuinya, jadi **pertahankan persis**. Pakai ulang komponen di `contoh-gaya/wayang/pustaka.tsx`.

## 1. Format dan teknis
- Rasio 9:16, ukuran 1080×1920, 30 fps.
- Render gambar: `npx remotion still contoh-gaya/wayang/index.ts ContohWayang out/x.png --frame=N`
- Font lokal: Playfair Display (900 untuk judul dan nama, miring untuk subjudul dan isi), Anton (kepala dan label kapital), Poppins (sumber).

## 2. Figur wayang (WAJIB asli)
- **Sumber:** foto wayang dari Wikimedia Commons yang berstatus domain publik atau CC0. Yang sudah tersedia adalah *Album Wayang Kulit Banjar* (Badan Pengembangan Kebudayaan dan Pariwisata RI, 2002), di `public/arsip/wayang/*.png` (latar sudah transparan): Semar, Gareng, Petruk, Bagong, gunungan, Dasamuka, dan Arjunawijaya. Halaman lain di album yang sama juga bisa diunduh, misalnya Togog, Bilung, Anoman, Sugriwa, Subali, Rahwana, Batara Narada, Batara Kala, dan Maesasura.
- **Mengunduh:** pakai API Commons dengan User-Agent deskriptif dan jeda antar-permintaan, karena Commons sering membalas 429. Catat setiap berkas di `public/arsip/SUMBER.md`.
- **Menghapus latar:**
  1. Potong pinggir putih halaman.
  2. Deteksi latar kuning dengan HSV (hue 35–80, saturasi 0,08–0,55, terang di atas 0,62).
  3. Buang area latar yang menyentuh tepi gambar, ditambah kantong latar yang lebih besar dari 0,15% luas gambar (memakai `scipy.ndimage.label`).
  4. Lebarkan area yang dibuang 1 piksel, lalu blur alfa sebesar 1. Gapit bambu dibiarkan tetap ada.
- **Catatan budaya:** album Banjar bergaya Kalimantan Selatan. Untuk topik wayang Jawa (Solo atau Yogya), carilah arsip wayang Jawa yang sesuai. Nama tokoh dan ceritanya harus sesuai pakem.

## 3. Panggung (komponen `Panggung`)
- **Malam:** latar radial `#2A1810` → `#140C08`.
- **Kelir:** kain krem `#EFE3C8` dengan tekstur serat, plisir marun `#7A1F1A` di atas dan bawah, serta cahaya hangat blencong dari atas yang meredup ke arah tepi.
- **Gawangan:** balok kayu berukir dengan garis dan lengkung emas di atas kelir.
- **Batang pisang:** silinder hijau bergaris serat di bawah kelir, tempat gapit wayang ditancapkan.
- **Blencong:** lampu minyak kuningan berbentuk burung dengan api yang berkedip (`useNyala`) dan pendar cahaya. Posisinya tepat di atas kelir, dan tidak boleh menutupi judul.

## 4. Wayang di panggung (komponen `Wayang`)
- Ujung gapit masuk ke batang pisang. Atur tinggi figur supaya kelir terisi tanpa menutup judul.
- Setiap wayang menjatuhkan **bayangan buram di kelir**, yang bergeser menjauhi blencong.
- `cermin` untuk membalik arah hadap saat dua tokoh berhadapan.
- Gerak: wayang naik saat ditancapkan (`usePop`) lalu berayun pelan di gapitnya. Untuk adegan tarung, cukup posisi berhadapan, tanpa efek garis sabetan.

## 5. Lapisan informasi
- **Kepala:** "PANGGUNG WAYANG · EP NN" huruf Anton emas berjarak lebar, di tengah atas.
- **Judul:** subjudul miring krem, lalu judul serif 900 bergradasi emas (`#F3D08A` → `#D9A441` → `#8C5E1F`) dengan bayangan.
- **Plakat:** kotak gelap berbingkai emas ganda, berisi nama tokoh (serif emas) dan ciri singkat (miring krem). Untuk banyak tokoh, susun berderet di bawah panggung.
- **Penanda bagian** (untuk benda seperti gunungan): titik dan garis emas yang tergambar ke plakat di kiri dan kanan.
- **Ornamen:** garis emas dengan wajik di tengah sebagai pemisah.
- **Kartu fakta:** label kapital emas dan satu kalimat miring krem.
- **Sumber** kecil di bagian paling bawah.

## 6. Isi
- Satu tema per episode: tokoh, simbol, atau lakon.
- Fakta budaya dan sejarah dari sumber tepercaya (UNESCO, kakawin, kajian pewayangan). Bedakan antara pakem, versi daerah, dan tafsiran.
