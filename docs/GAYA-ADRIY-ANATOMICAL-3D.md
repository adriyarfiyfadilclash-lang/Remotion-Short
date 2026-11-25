# Gaya Video: ADRIY Anatomical 3D

Gaya baku untuk video pendek edukasi tubuh manusia di repo ini. Contoh acuannya adalah video "Cara Kerja Jantung" (`src/`). Video baru harus meniru resep di bawah, kecuali pemilik kanal meminta perubahan.

## 1. Format
- Rasio 9:16, ukuran 1080×1920, 30 fps.
- Semua teks, urutan adegan, mode 3D, overlay, maskot, dan efek suara diatur di `src/data.json`. Ubah konten di sana, jangan langsung di komponen.
- Durasi tiap adegan sekitar 6–11 detik. Video dibagi ke beberapa "Bagian", dengan bilah progres dan tulisan "Bagian X dari N · Nama" di kiri atas.

## 2. Objek 3D (React Three Fiber lewat `@remotion/three`)
- Organ dibuat **prosedural**, tanpa file model dari luar: beberapa bentuk dasar (elipsoid dan kerucut membulat) digabung halus menjadi satu permukaan, lalu dipotong per bagian (lihat `src/lib/bentuk.ts`).
- Anatomi harus benar dari tampak depan: posisi ruang, letak pembuluh, dan arah apeks.
- Tampilan organ:
  - Otot berwarna merah tua dengan gradasi gelap-terang dan tekstur serat halus (bump map dari kanvas).
  - Lapisan basah mengilap (`meshPhysicalMaterial` dengan clearcoat sekitar 0,55).
  - Lemak kekuningan hanya di lekuk-lekuk.
  - Pembuluh koroner menempel di permukaan.
- Warna pembuluh mengikuti konvensi edukasi: **merah = kaya oksigen**, **biru = miskin oksigen**.
- Pencahayaan studio medis: hemisphere light, key light hangat dari kanan atas, fill kebiruan dari kiri, dan dua rim light (merah muda dan biru) dari belakang.
- Kamera tetap: FOV 32 dan z = 10. Gerakan berasal dari organ yang berayun pelan, bergeser antar-mode, dan berdetak.
- Mode adegan (di `src/lib/model.ts`), ditransisikan halus selama 24 frame:
  - `hero`, `putar`: organ utuh tampil di tengah
  - `kecil`, `dada`: organ diperkecil atau diletakkan di dalam torso
  - `bongkar`: organ terurai per bagian, lengkap dengan label
  - `atrium`, `ventrikel`: bagian tertentu disorot kuning berdenyut
  - `alir-biru`, `alir-merah`: organ tembus pandang dengan partikel darah mengalir
  - `katup`, `listrik`: memperlihatkan katup, atau gelombang listrik dengan garis EKG
- Semua gerak dihitung dari `useCurrentFrame()`, tanpa angka acak, supaya render selalu konsisten.

## 3. Latar (`src/components/Latar.tsx`)
Latar terdiri dari 3 lapisan parallax: gradien, pola di tengah, dan butir di depan. Suasana dipilih per adegan:

| Suasana | Warna | Pola |
|---|---|---|
| `studio-navy` | biru tua | heksagon |
| `studio-teal` | toska | grid |
| `klinik-terang` | putih kebiruan | sel |
| `paru-biru` | biru | gelembung |
| `tubuh-merah` | merah marun | sel |
| `listrik` | ungu gelap | kilat |
| `bumi` | luar angkasa | bintang |

## 4. Tipografi dan teks (`src/components/Teks.tsx`)
- Font **Poppins** (berat 500, 700, 800). File-nya disimpan lokal di `public/font`, jadi render tidak butuh internet.
- Judul: ukuran 74, ExtraBold, di dalam kartu kaca gelap (radius 34). Kata kunci ditandai `*seperti ini*` di `data.json` dan tampil kuning `#ffd166` dengan garis bawah. Pada latar terang, warnanya merah `#d62839`.
- Subjudul: ukuran 42, satu sampai dua baris, ringkas.
- Label anatomi berupa kartu kecil berbingkai kuning, dengan garis penunjuk dan titik ke organ 3D.
- Teks masuk dengan animasi spring, lalu memudar di akhir adegan.

## 5. Overlay dan karakter
- Maskot **"Si Merah"**: sel darah merah buatan sendiri (SVG) di kiri bawah, dengan ekspresi `senang`, `bingung`, atau `kaget`.
- Overlay info per adegan, misalnya penghitung angka, siluet kepalan, torso, label 4 ruang, paru-paru, garis EKG, kartu mitos/fakta, liter darah, bumi, ringkasan 3 poin, dan CTA.

## 6. Audio
- Musik latar dan efek suara dibuat sendiri, jadi bebas hak cipta (`scripts/buat-sfx.py`). Efek yang tersedia: hit, tick, whoosh, pop, ding, riser, zap, gelembung, dan detak.
- Suara detak jantung disinkronkan dengan animasi detak (`detakFrame`, 25 frame atau sekitar 72 kali per menit).

## 7. Struktur cerita
1. Hook dengan angka mengejutkan
2. Pertanyaan pancingan
3. Kenalan: ukuran dan letak organ
4. Isi bagian dalam organ
5. Cara kerja dan aliran
6. Mekanisme khusus
7. Mitos atau fakta
8. Angka-angka menakjubkan
9. Ringkasan 3 hal
10. CTA: ajak penonton berkomentar dan mengikuti untuk seri berikutnya

Fakta wajib diambil dari sumber tepercaya, lalu dicantumkan di `data.json` (`sumber`), disertai catatan "ilustrasi edukasi, bukan saran medis".

## 8. Render
- Gambar contoh: `npx remotion still Video1 out/contoh/x.png --frame=N`
- Video penuh: `npm run render`, atau lewat GitHub Actions (**Render Video**)
- Renderer WebGL perangkat lunak (`swangle`) sudah diatur di `remotion.config.ts`.
