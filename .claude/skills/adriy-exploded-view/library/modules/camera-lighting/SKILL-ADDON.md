# Skill Add-on — Exploded View Camera & Lighting

## Tujuan
Membuat model terurai mudah dibaca dari sudut pandang yang tepat, dengan pencahayaan yang menonjolkan bentuk, material, dan jarak antarbagian.

## Urutan kerja
1. Tetapkan kamera utama dan titik fokus objek.
2. Mulai dengan tampilan tiga perempat agar kedalaman terlihat.
3. Gerakkan kamera perlahan mengitari objek saat bagian-bagian dipisahkan.
4. Gunakan cahaya utama untuk membentuk volume.
5. Tambahkan cahaya pengisi agar sisi gelap tetap terbaca.
6. Tambahkan cahaya belakang untuk memisahkan siluet dari latar.
7. Gunakan sorot bergerak hanya ketika menjelaskan bagian tertentu.
8. Pastikan seluruh komponen tetap berada di dalam bingkai.

## Panduan visual
- Hindari gerakan kamera terlalu cepat atau berputar tanpa tujuan.
- Gunakan sudut atas ringan untuk memperlihatkan susunan lapisan.
- Jaga pantulan material logam agar tidak terlalu terang.
- Gunakan lantai gelap atau netral sebagai pijakan visual.
- Jangan mengandalkan bayangan saja untuk menjelaskan posisi komponen; gunakan garis penghubung dari modul sebelumnya bila perlu.

## Catatan teknis
- Pilih satu kamera `makeDefault` untuk setiap adegan.
- Aktifkan dukungan bayangan pada pengaturan renderer bila diperlukan.
- Periksa intensitas cahaya pada hasil render akhir, bukan hanya pratinjau.
