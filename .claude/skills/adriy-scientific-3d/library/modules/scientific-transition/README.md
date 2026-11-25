# ADRIY Scientific 3D — Scientific Transition

Pustaka transisi untuk perpindahan adegan visualisasi sains dengan gaya teknis dan bersih.

## 7 komponen
- `ScientificDissolveTransition` — kemunculan lembut dengan perubahan skala.
- `ScientificIrisTransition` — bukaan atau penutupan melingkar.
- `ScientificWipeTransition` — panel yang menyapu layar.
- `ScientificMorphTransition` — pergantian dua elemen adegan dengan perubahan skala.
- `ScientificScanTransition` — garis pemindai melintasi adegan.
- `ScientificRadialReveal` — kemunculan dari titik pusat.
- `ScientificDataCutTransition` — garis pemisah vertikal bergaya teknis.

## Ketergantungan
- `react`
- `remotion`
- `three`
- `@react-three/fiber`
- `@remotion/three`

Gunakan komponen 3D di dalam `ThreeCanvas`.

## Catatan teknis
- Komponen transisi ini adalah alat visual tingkat adegan. Untuk pergantian dua komposisi Remotion penuh, gunakan `TransitionSeries` atau susunan `Sequence` pada lapisan komposisi.
- `ScientificIrisTransition`, `ScientificWipeTransition`, `ScientificScanTransition`, dan `ScientificDataCutTransition` memakai bidang 3D di depan kamera. Sesuaikan posisi Z, ukuran, dan arah kamera.
- `ScientificMorphTransition` menampilkan/menyembunyikan grup berdasarkan progres, tetapi tidak menginterpolasi geometri internal. Untuk morf geometri sesungguhnya, siapkan geometri sumber dan tujuan serta interpolasi vertex secara terpisah.
- Komponen ini belum menyediakan masking tekstur atau pengolahan pascaproses.

## Status
Kode sumber dan contoh telah disusun. Belum diuji melalui pemasangan dependensi, pemeriksaan TypeScript, Remotion Studio, atau render aktual.
