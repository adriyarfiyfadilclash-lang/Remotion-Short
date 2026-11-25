# Gaya Video: ADRIY Mixed Media Documentary

Gaya baku untuk video pendek bertema sejarah, penemuan, fakta unik, makanan, perbandingan, dan sains yang dikemas secara dokumenter. Bentuknya kolase editorial dan scrapbook. **Pusat setiap adegan adalah arsip asli yang berstatus domain publik**, bukan ilustrasi kartun.

Contoh acuannya ada di `contoh-gaya/mixed/`:
- `Ep1Cetak.tsx`: Sejarah
- `Ep2Lampu.tsx`: Penemuan
- `Ep3Telur.tsx`: Sains

Pemilik kanal sudah menyetujuinya, jadi **pertahankan persis**. Pakai ulang komponen di `contoh-gaya/mixed/pustaka.tsx`.

**Dilarang:**
- Ilustrasi bergaris luar tebal dengan warna rata ala kartun (pemilik sudah menolaknya).
- Adegan penuh tempelan. Beri ruang kosong, dan pakai elemen kolase untuk **menjelaskan**, bukan sekadar hiasan.

## 1. Format dan teknis
- Rasio 9:16, ukuran 1080×1920, 30 fps.
- Font lokal di `public/font`:
  - **Playfair Display** (900, dan 700 miring): judul serif klasik dan teks koran
  - **Anton**: label tebal ala poster
  - **Caveat**: tulisan tangan
  - **Poppins**: sumber dan kredit
- Tekstur dibuat dengan filter SVG di `FilterKolase`: `seratKertas`, `sobek` dan `sobekHalus` (tepi sobek), `capKasar`, `grain`, serta pola arsiran dan bintik.
- Render gambar: `npx remotion still contoh-gaya/mixed/index.ts ContohMixed out/x.png --frame=N`

## 2. Palet (pilih 3–4 warna dominan per episode)
| Warna | Kode | Peran |
|---|---|---|
| Krem | `#D5C1A1` | latar utama |
| Cokelat | `#38271F` | kesan vintage |
| Kertas | `#E9E0D0` | kertas dan karton |
| Merah | `#D92743` | penekanan informasi, garis anotasi, cap |
| Kuning | `#F2C94C` | penanda penting, catatan tempel |
| Toska | `#65BFB2` | variasi visual |
| Hitam | `#252525` | tipografi dan kontras |

Contoh kombinasi:
- Sejarah: krem, cokelat, merah, hitam
- Penemuan: kertas, hitam, kuning, toska
- Sains: krem, kuning, toska, hitam

## 3. Arsip asli (WAJIB sebagai pusat visual)
- Cari di **Wikimedia Commons** lewat API, dengan User-Agent deskriptif. Contoh yang cocok:
  - Gravir dan cukilan kayu lama
  - Gambar paten AS (domain publik)
  - Poster atau lukisan pelajaran sekolah abad ke-19
  - Foto lama dari arsip pemerintah (NARA, Library of Congress)
- **Utamakan "Public domain"** atau CC0. CC BY boleh, asalkan nama pembuat dan lisensinya dicantumkan di layar. **Hindari CC BY-SA** dan semua yang tidak jelas lisensinya.
- Simpan berkas di `public/arsip/`, lalu catat judul asli, pembuat, tahun, dan lisensinya di `public/arsip/SUMBER.md`.
- Tampilkan dengan komponen `Arsip`:
  - Ditempel di karton krem dengan selotip, dan masuk dengan Photo Drop.
  - Filter cetak: sepia tipis, kontras sedikit naik, serat kertas, dan vignette dalam.
  - Keterangan di bawahnya: judul miring dengan serif, lalu kredit dan lisensi.
- Bila arsip tidak ada, baru boleh ilustrasi semi-realistis bergaya gravir atau cetak (arsiran halus, tanpa garis luar tebal), dan beri catatan "ilustrasi".

## 4. Delapan elemen dasar
| Elemen | Penerapan |
|---|---|
| Kertas sobek (`Sobekan`) | pembatas informasi, label kepala, kartu perbandingan |
| Selotip (`Selotip`) | menempelkan arsip dan catatan, muncul **setelah** benda yang ditempelnya mendarat |
| Foto atau arsip (`Arsip`, `Polaroid`) | menampilkan objek dan sejarah |
| Garis coretan (`GarisGambar`) | menghubungkan informasi, melingkari detail penting |
| Stempel (`Cap`) | identitas dokumenter: tahun, "dipatenkan", "fakta sains" |
| Potongan koran | ringkasan cerita: kicker kapital, judul serif, garis, isi |
| Pin museum (`PinMuseum`) | penanda bernomor di atas arsip, ditambah legenda |
| Tekstur cetak | serat kertas, grain, dan halftone |

## 5. Lima gerakan (WAJIB untuk video)
1. **Paper Reveal** (`usePaperReveal`, sudah terpasang di `Sobekan`): kertas masuk dari kiri, kanan, atau bawah sambil bergoyang tidak beraturan, lalu diam.
2. **Photo Drop** (`usePhotoDrop`, sudah terpasang di `Arsip` dan `Polaroid`): jatuh dari atas, berputar, memantul, lalu berhenti, dengan bayangan menguat saat mendarat.
3. **Draw Animation** (`GarisGambar`, `Tulisan` dengan `tunda`): garis, panah, dan lingkaran tergambar bertahap, dan tulisan tangan tergores dari kiri ke kanan.
4. **Typography Pop** (`HurufPop`): huruf muncul satu per satu dengan sedikit pergeseran posisi.
5. **Stamp Impact** (`useStampImpact`, sudah terpasang di `Cap` dan `PinMuseum`): menghantam dari ukuran besar, memantul pelan, dan layar bergetar sekejap.

**Urutan yang benar:** label kepala, judul, arsip, selotip, kartu atau koran, garis anotasi, label, lalu cap. Lembar storyboard contohnya ada di `out/mixed/storyboard-gerak.jpg`.

## 6. Komposisi
- Kepala berupa sobekan kertas "DOKUMENTER · TOPIK #NN", judul campuran serif atau poster dengan baris tulisan tangan berwarna merah.
- Satu arsip utama yang besar, ditambah paling banyak 1 foto pendukung.
- Anotasi ke arsip berupa titik, garis tergambar, dan label serif, dengan keterangan tulisan tangan di bawahnya. Untuk penanda yang banyak, pakai pin museum dan legenda.
- Bagian bawah berisi satu kartu fakta (koran, strip warna, atau dua kertas perbandingan "VS") dan satu cap.
- Sumber dan kredit arsip di bagian paling bawah.

## 7. Penerapan per topik
| Topik | Konsep visual |
|---|---|
| Sejarah | arsip, gravir atau foto lama, guntingan koran |
| Penemuan | gambar paten, kertas grafik, catatan tempel |
| Fakta unik | kolase arsip dan angka besar |
| Sains | poster pelajaran lama, potongan objek, pin museum |
| Makanan | label, kemasan lama, iklan kuno |
| Psikologi | catatan, simbol, coretan |
| Perbandingan | dua kertas berbeda dengan tanda "VS" |

## 8. Isi dan fakta
- Nada informatif, kreatif, sedikit vintage, tetapi tetap modern.
- Fakta dicek ke sumber primer bila ada, misalnya isi dokumen paten. Contohnya: lampu Edison 1880 memakai filamen **karbon**, bukan tungsten.
