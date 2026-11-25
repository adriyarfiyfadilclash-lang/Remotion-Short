# ADRIY Exploded View — Camera & Lighting

Modul untuk mengatur sudut pandang kamera, gerakan kamera sinematik, pencahayaan tiga titik, sorotan komponen, dan bidang dasar bayangan.

## 7 komponen
- `ExplodedCameraRig3D` — perpindahan kamera dari satu posisi ke posisi lain.
- `CameraOrbitMove3D` — kamera mengorbit objek.
- `ExplodedDolly3D` — kamera maju atau mundur.
- `ExplodedLightingRig3D` — pencahayaan tiga titik.
- `TechnicalSpotlight3D` — sorotan yang bergerak mengikuti waktu.
- `ShadowStage3D` — lantai matte untuk memberi pijakan visual.
- `CameraFocusTarget3D` — titik acuan fokus yang dapat ditampilkan saat penyusunan adegan.

## Ketergantungan
- `react`
- `remotion`
- `three`
- `@react-three/fiber`
- `@react-three/drei`
- `@remotion/three`

## Contoh
```tsx
<ExplodedLightingRig3D />
<CameraOrbitMove3D radius={7} height={2.5} duration={90}>
  <Model />
</CameraOrbitMove3D>
```

Gunakan semua komponen di dalam `ThreeCanvas`.

## Catatan teknis
- Komponen kamera memakai `useCurrentFrame`, sehingga gerakannya konsisten pada setiap render Remotion.
- Jangan menumpuk beberapa komponen kamera dengan `makeDefault` dalam satu adegan. Pilih satu pengendali kamera utama.
- `TechnicalSpotlight3D` membuat sorotan dari posisi sumber ke `target-position`; periksa arah sorot saat mengganti tata letak.
- Intensitas lampu titik dan sorot disetel cukup tinggi untuk adegan Three.js. Sesuaikan dengan konfigurasi renderer dan material.
- `ShadowStage3D` menyediakan bidang dasar; bayangan nyata memerlukan konfigurasi renderer dan lampu yang mendukung bayangan.
- Untuk komposisi teknis, sisakan ruang di sekitar komponen agar tidak terpotong saat kamera bergerak.

## Status
Kode sumber dan contoh telah disusun. Belum diuji melalui pemasangan dependensi, pemeriksaan TypeScript, Remotion Studio, atau render aktual.
