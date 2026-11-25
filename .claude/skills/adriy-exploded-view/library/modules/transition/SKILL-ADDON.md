# Skill Add-on — Exploded View Transition

Gunakan transisi ini untuk mengubah sudut pandang atau susunan komponen tanpa kehilangan konteks objek.

## Panduan pemilihan
- Memulai pembongkaran: `ExplodeOutTransition`.
- Menyatukan objek: `ExplodeInTransition`.
- Memperlihatkan susunan melingkar: `RadialExplodeTransition`.
- Membuka lapisan casing: `LayerPeelTransition`.
- Memperkenalkan objek dari satu arah: `AssemblyWipeTransition`.
- Menekankan bagian bergerak: `ComponentOrbitTransition`.
- Beralih dari satu objek ke objek lain: `ExplodedSceneSwap`.

## Aturan kualitas
1. Transisi harus memperjelas hubungan antarbagian.
2. Hindari perpindahan terlalu jauh hingga objek keluar dari bingkai.
3. Gunakan durasi cukup panjang untuk gerakan teknis yang perlu diamati.
4. Jaga kesinambungan arah gerak antartransisi.
5. Jangan menumpuk beberapa pengendali transformasi pada kelompok yang sama tanpa perencanaan.
6. Pastikan adegan keluar dan masuk terbaca dengan jelas.
7. Uji seluruh transisi pada resolusi akhir.
