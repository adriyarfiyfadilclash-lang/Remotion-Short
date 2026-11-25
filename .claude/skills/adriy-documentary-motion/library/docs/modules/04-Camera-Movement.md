# Documentary Camera Movement — Skill Add-on

## Tujuan
Membuat gambar terasa seperti direkam kamera dokumenter, dengan gerakan yang halus dan punya alasan naratif.

## Komponen
- `DocumentaryCameraPush`: kamera mendekat perlahan.
- `DocumentaryCameraPull`: kamera menjauh untuk membuka konteks.
- `DocumentaryCameraPan`: kamera bergerak horizontal atau vertikal.
- `DocumentaryCameraTilt`: gerakan vertikal untuk mengikuti subjek tinggi.
- `DocumentaryHandheld`: getaran kamera genggam yang sangat halus.
- `DocumentaryCameraDrift`: gabungan gerak diagonal dan zoom perlahan.

## Panduan pemilihan
1. Push-in: menekankan detail, emosi, atau objek penting.
2. Pull-back: mengungkap skala, lingkungan, atau konteks.
3. Pan: menyusuri lokasi, arsip, atau lanskap lebar.
4. Tilt: memperlihatkan bangunan, monumen, atau objek tinggi.
5. Handheld: memberi kesan observasional dan dekat dengan kejadian.
6. Drift: menjaga establishing shot tetap hidup tanpa gerakan mencolok.

## Aturan kualitas
- Gunakan gambar dengan ruang lebih di luar bingkai (overscan) untuk pan/tilt/zoom.
- Jangan gunakan handheld pada setiap adegan; simpan untuk momen yang tepat.
- Gerakan lambat lebih cocok untuk dokumenter yang reflektif.
- Hindari kombinasi transformasi yang terlalu kuat.
- Pastikan subjek utama tidak keluar dari frame.
- Periksa sisi gambar agar tidak muncul celah kosong.

## Catatan teknis
- Semua gerakan di paket ini adalah simulasi 2D menggunakan transform CSS pada komposisi Remotion.
- Bukan gerakan kamera 3D sungguhan.
- `DocumentaryCameraPan` dan `DocumentaryCameraTilt` membutuhkan gambar/scene yang cukup besar agar tepi tidak terlihat.
