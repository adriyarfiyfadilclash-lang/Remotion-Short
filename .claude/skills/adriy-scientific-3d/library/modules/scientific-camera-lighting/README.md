# ADRIY Scientific 3D — Scientific Camera & Lighting

Modul ini menyediakan gerakan kamera sinematik dan preset pencahayaan untuk visualisasi ilmiah 3D.

## 7 komponen
1. `ScientificCameraRig3D` — perpindahan kamera dari posisi awal ke posisi akhir.
2. `ScientificOrbitCamera3D` — kamera mengorbit objek secara deterministik.
3. `ScientificDollyCamera3D` — gerakan mendekat atau menjauh.
4. `ScientificFocusTarget3D` — memindahkan titik perhatian kamera.
5. `ScientificKeyLight3D` — cahaya utama.
6. `ScientificRimLight3D` — cahaya pemisah dari belakang/samping.
7. `ScientificLabLighting3D` — preset pencahayaan laboratorium tiga titik.

## Ketergantungan
- `react`
- `remotion`
- `three`
- `@react-three/fiber`
- `@remotion/three`

Gunakan komponen di dalam `ThreeCanvas`.

## Contoh
```tsx
<ScientificCameraRig3D
  from={[0, 0, 8]}
  to={[0, 0, 5]}
  lookAt={[0, 0, 0]}
  duration={60}
/>
<ScientificLabLighting3D />
```

## Catatan teknis
- Komponen kamera mengubah kamera aktif dari dalam kanvas R3F. Gunakan satu pengendali kamera utama dalam satu waktu; beberapa pengendali yang aktif bersamaan dapat saling menimpa.
- Gerakan dihitung dari `useCurrentFrame`, sehingga deterministik untuk render Remotion.
- `ScientificDollyCamera3D` mengubah sumbu Z kamera; cocok untuk kamera yang orientasinya standar. Untuk jalur lebih kompleks gunakan `ScientificCameraRig3D`.
- Intensitas cahaya point/directional dapat terlihat berbeda bergantung pada material, skala scene, dan pengaturan renderer.
- Atur `shadows` pada `ThreeCanvas` dan objek bila bayangan diperlukan.

## Status
Kode sumber dan contoh telah disusun. Belum diuji melalui pemasangan dependensi, pemeriksaan TypeScript, Remotion Studio, atau render aktual.
