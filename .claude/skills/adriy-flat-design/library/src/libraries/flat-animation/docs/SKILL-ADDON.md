# Flat Animation — Skill Add-on

## Tujuan
Membuat ilustrasi dan elemen grafis 2D bergerak dengan jelas, ringan, ekspresif, dan konsisten.

## Komponen
- `FlatPop`: objek muncul dengan gerakan membesar yang tegas.
- `FlatSlide`: objek masuk dari salah satu arah.
- `FlatBounce`: gerakan pantulan untuk ikon atau karakter.
- `FlatFloat`: gerakan mengambang berulang.
- `FlatStagger`: menampilkan beberapa elemen secara berurutan.
- `FlatDrawOn`: membuka ilustrasi melalui mask arah.

## Prinsip gerakan
1. Gunakan gerakan sederhana dan mudah dibaca.
2. Utamakan timing yang tegas, easing yang halus, dan jarak gerak konsisten.
3. Gunakan pop dan bounce untuk elemen yang perlu menarik perhatian.
4. Gunakan float hanya untuk elemen dekoratif atau objek yang memang melayang.
5. Gunakan stagger untuk daftar, kartu, ikon, atau urutan informasi.
6. Hindari semua elemen bergerak bersamaan tanpa hierarki.
7. Pertahankan bentuk dan proporsi ilustrasi.

## Arah visual
- Bentuk sederhana, warna solid, siluet jelas.
- Hindari tekstur realistis, bayangan berat, dan efek 3D berlebihan.
- Gunakan sudut membulat atau tegas secara konsisten.
- Pastikan kontras objek dan latar cukup kuat.

## Catatan teknis
- Komponen menggunakan React dan Remotion.
- `FlatStagger` menerima array elemen React; setiap elemen akan dirender pada lapisan posisi penuh.
- `FlatDrawOn` memakai CSS clip-path.
- Sesuaikan jarak, durasi, dan skala dengan resolusi serta rasio komposisi.
