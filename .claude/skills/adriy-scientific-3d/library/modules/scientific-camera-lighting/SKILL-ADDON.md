# Skill Add-on — Scientific Camera & Lighting

## Tujuan
Mengarahkan perhatian penonton dan membuat bentuk ilmiah terbaca melalui kamera serta pencahayaan yang terkontrol.

## Pemilihan komponen
- Perpindahan kamera antarposisi: `ScientificCameraRig3D`.
- Mengelilingi objek: `ScientificOrbitCamera3D`.
- Mendekat/menjauh pada sumbu Z: `ScientificDollyCamera3D`.
- Menggeser titik fokus: `ScientificFocusTarget3D`.
- Cahaya utama: `ScientificKeyLight3D`.
- Garis cahaya tepi: `ScientificRimLight3D`.
- Setup cepat laboratorium: `ScientificLabLighting3D`.

## Alur kerja
1. Tentukan objek utama dan titik yang harus dilihat penonton.
2. Pilih satu pengendali kamera untuk satu adegan.
3. Gunakan gerakan lambat dan terukur agar struktur mudah dipahami.
4. Tempatkan key light untuk membentuk volume.
5. Tambahkan fill light seperlunya agar detail bayangan tetap terbaca.
6. Gunakan rim light untuk memisahkan objek dari latar.
7. Periksa highlight pada permukaan transparan dan reflektif.
8. Uji kamera pada frame awal, tengah, dan akhir.

## Prinsip visual
- Hindari gerakan kamera cepat yang mengganggu pemahaman struktur.
- Jangan memakai banyak sumber cahaya berintensitas tinggi tanpa tujuan.
- Pertahankan detail objek yang menjadi fokus.
- Gunakan pencahayaan untuk memperjelas bentuk, bukan mengubah warna ilmiah secara menyesatkan.
- Untuk render berulang, pastikan posisi kamera diturunkan dari nomor frame, bukan waktu nyata.
