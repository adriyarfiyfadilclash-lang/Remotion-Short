# Skill Add-on — Scientific Effects

## Tujuan
Menambah lapisan visual yang membantu penonton memahami proses, medan, energi, dan perubahan pada objek ilmiah.

## Pemilihan komponen
- Atmosfer partikel: `ScientificParticleField3D`.
- Bidang pemindaian: `ScientificScanPlane3D`.
- Pulsa radial: `ScientificEnergyPulse3D`.
- Visualisasi gelombang: `ScientificWaveField3D`.
- Penekanan batas/volume: `ScientificGlowShell3D`.
- Percikan sesaat: `ScientificSparkBurst3D`.
- Berkas/transfer arah: `ScientificDataBeam3D`.

## Alur kerja
1. Tentukan informasi yang perlu diperjelas oleh efek.
2. Gunakan satu atau dua efek utama dalam satu adegan.
3. Atur waktu mulai dan durasi berdasarkan urutan penjelasan.
4. Gunakan warna yang konsisten dengan legenda visual.
5. Jaga kontras agar objek utama tetap menjadi fokus.
6. Uji kepadatan partikel dan transparansi pada resolusi keluaran.
7. Pastikan efek tidak menutupi label atau data penting.

## Prinsip ilmiah
- Beri penanda bahwa gelombang atau partikel merupakan ilustrasi jika bukan data nyata.
- Jangan menyebut bidang scan sebagai hasil CT/MRI atau pemindaian nyata.
- Jangan menyamakan efek glow dengan radiasi atau energi fisik tanpa dasar.
- Gunakan data terukur dan satuan yang benar jika menampilkan fenomena kuantitatif.
- Jaga render deterministik dengan seed dan nomor frame.
