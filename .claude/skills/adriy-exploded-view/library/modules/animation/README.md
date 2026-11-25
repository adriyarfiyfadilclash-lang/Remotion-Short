# ADRIY Exploded View — Animation

Pustaka animasi untuk memisahkan komponen benda secara terarah, menampilkan susunan bagian, lalu menyatukannya kembali dalam Remotion + React Three Fiber.

## 7 komponen
- `ExplodedAssembly` — pengendali progres animasi pemisahan.
- `ExplodedPart` — menggerakkan satu komponen dari posisi rakitan ke posisi terurai.
- `ExplodedAxisPart` — memisahkan komponen pada sumbu X, Y, atau Z.
- `ExplodedPartFloat` — gerakan melayang halus.
- `ExplodedPartReveal` — kemunculan komponen secara bertahap.
- `AssemblySequence` — pengendali progres untuk animasi perakitan kembali.
- `ExplodedPartOrbit` — gerakan orbit kecil pada komponen.

## Ketergantungan
- `react`
- `remotion`
- `three`
- `@react-three/fiber`
- `@remotion/three`

## Contoh dasar
```tsx
<ExplodedAssembly startFrame={10} duration={60}>
  <ExplodedPart assembledPosition={[0, 0, 0]} explodedOffset={[0, 1.5, 0]}>
    <mesh>
      <boxGeometry args={[1, 0.3, 1]} />
      <meshStandardMaterial color="#b8c8d8" metalness={0.7} roughness={0.25} />
    </mesh>
  </ExplodedPart>
</ExplodedAssembly>
```

`ExplodedAssembly` meneruskan nilai `progress` ke anak langsungnya. Gunakan `ExplodedPart` sebagai anak langsung agar posisi dan rotasi mengikuti progres pengendali.

## Catatan
- Semua gerakan memakai nomor bingkai Remotion agar deterministik.
- `ExplodedPart` menerima `progress` antara 0 (terakit) dan 1 (terurai).
- `AssemblySequence` dapat dipakai untuk mengarahkan progres kembali dari terurai ke terakit. Pastikan anak langsungnya menerima properti `progress`.
- Pustaka ini menyediakan gerak transformasi, bukan simulasi fisika.
- Untuk model benda yang akurat, siapkan geometri tiap komponen secara terpisah.

## Status
Kode sumber dan contoh sudah disusun. Belum diuji melalui pemasangan dependensi, pemeriksaan TypeScript, Remotion Studio, atau render aktual.
