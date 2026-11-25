# Gaya Video: ADRIY Paper Cutout

Gaya baku untuk video pendek bertema alam, geografi, ekosistem, siklus hidup, dan proses bumi, dikemas sebagai **diorama kertas berlapis yang tampak seperti difoto** (seni kirigami), bukan kartun.

Contoh acuannya ada di `contoh-gaya/paper/`:
- `Ep1Laut.tsx`: lapisan kedalaman laut
- `Ep2Gunung.tsx`: potongan gunung api
- `Ep3Kupu.tsx`: siklus metamorfosis

Pemilik kanal sudah menyetujuinya, jadi **pertahankan persis**. Pakai ulang komponen di `contoh-gaya/paper/pustaka.tsx`.

## 1. Format dan teknis
- Rasio 9:16, ukuran 1080×1920, 30 fps.
- Ilustrasi dibuat dengan SVG prosedural. Setiap potongan kertas memakai `Lapis` dengan filter `lapis1`–`lapis4` dari `FilterKertas`. Filter itu menambahkan:
  - tepi potongan sedikit bergerigi (displacement),
  - serat kertas (turbulence),
  - dua lapis bayangan: bayangan kontak yang tajam dan bayangan lembut.
- **Angka kedalaman** menentukan besar bayangan: 1 = lapisan terdepan, 4 = lapisan paling belakang (bayangan terbesar).
- Pakai `sorot` (garis terang di tepi atas) pada potongan yang besar, supaya tepinya terlihat kena cahaya.
- Font lokal: Anton (judul), Playfair Display (miring untuk subjudul, serif untuk label), Caveat (keterangan tangan), dan Poppins (sumber).
- Render gambar: `npx remotion still contoh-gaya/paper/index.ts ContohPaper out/x.png --frame=N`

## 2. Palet
Palet dasar dari pustaka Paper Cutout: krem `#F8F1DF`, krem tua `#E8DCC3`, cokelat `#40382F`, mustard `#E8B85B`, terakota `#D77F69`, sage `#73978B`, dan biru kusam `#5E7FA3`. Warna tema boleh ditambahkan, asalkan **kusam dan tidak terlalu jenuh**.

Contoh warna tema:
- Laut: `#7FB7C9` → `#14273A`
- Gunung api: cokelat batuan, dan gradien magma `#FFD36E` → `#B83A22`
- Hijau daun: `#9DBB86`, `#8AAE73`

## 3. Prinsip diorama
- **Banyak lapisan**, misalnya langit, latar jauh, latar tengah, objek utama, lalu detail depan. Setiap lapisan dimundurkan dengan bayangan yang makin dalam.
- **Latar karton**: warna polos, sinar lembut dari kiri atas, dan sudut yang lebih gelap (vignette), ditambah butiran (`Grain`).
- **Cahaya dan pendar** memakai gradien radial lembut (`url(#pendar)`, `url(#pendarToska)`), tidak boleh piringan rata.
- **Potongan objek** untuk menunjukkan bagian dalam: satu sisi utuh, sisi lain dipotong (`clipPath`), dan garis potongan diberi garis krem tipis.
- **Bentuk** sederhana tapi berdetail: tulang daun, sisik dan perut ikan, kerut kepompong, lapisan batuan, partikel salju laut, atau abu.
- **Ruang kosong** tetap ada, dan teks tidak boleh tertutup objek.

## 4. Lapisan informasi
- **Kepala**: blok cokelat "DIORAMA KERTAS · TOPIK" dengan huruf Anton krem.
- **Judul**: subjudul miring Playfair, lalu judul besar `JudulKertas` (huruf terangkat berbayang, muncul satu per satu).
- **Label**: `Tag`, yaitu kertas krem dengan pin warna, nomor bulat, judul serif, dan keterangan tangan. Dihubungkan ke objek dengan `Benang` (garis tipis yang tergambar).
- **Skala atau penggaris**: pita kertas dengan garis ukur. Bila tidak sesuai skala, wajib diberi catatan.
- **Kartu fakta**: kertas mustard berisi angka besar (Anton) dan keterangan tangan.
- **Sumber** kecil di bagian paling bawah.

## 5. Gerak (untuk video)
- `usePaperPop`: potongan kertas naik dari bawah dan memantul pelan. Lapisan belakang muncul lebih dulu, lalu lapisan depan.
- Judul tersusun huruf demi huruf, dan label muncul berurutan sesudah objeknya.
- Gerak halus yang terus berlangsung: gelombang laut bergeser, ubur-ubur dan ulat bergoyang, sayap kupu-kupu mengepak, abu naik, magma berdenyut.
- Hindari semua elemen bergerak bersamaan. Beri jeda 2–6 frame antar-elemen.

## 6. Isi
- Satu topik per adegan, dengan 4–5 bagian berlabel bernomor.
- Fakta dari sumber tepercaya (NOAA, USGS, PVMBG, Smithsonian, dan sejenisnya). Tulis "±" untuk nilai perkiraan, dan beri catatan bila waktu atau ukuran berbeda menurut spesies atau lokasi.
