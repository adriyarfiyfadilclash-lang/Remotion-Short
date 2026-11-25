# Peta Integrasi

| Modul | Folder sumber | Isi utama |
|---|---|---|
| Scientific Animation | `modules/scientific-animation/src` | Gerak objek, orbit, gelombang, aliran partikel, getaran molekul, denyut sel, pertumbuhan |
| Scientific Transition | `modules/scientific-transition/src` | Dissolve, iris, wipe, morph visual, scan, radial reveal, data cut |
| Scientific Typography | `modules/scientific-typography/src` | Judul, label, rumus, readout, sumbu, leader line, scale bar |
| Molecules, Cells & Structures | `modules/molecules-cells-structures/src` | Atom, ikatan, molekul, membran, nukleus, organel, DNA |
| Scientific Camera & Lighting | `modules/scientific-camera-lighting/src` | Camera rig, orbit, dolly, focus target, key/rim light, preset lab |
| Scientific Effects | `modules/scientific-effects/src` | Partikel, scan plane, energy pulse, wave field, glow shell, spark burst, data beam |

## Penggunaan
- Showcase memakai `ScientificCameraRig3D` sebagai satu-satunya pengendali kamera.
- Showcase memakai `ScientificLabLighting3D` sebagai preset pencahayaan.
- Objek utama: molekul air konseptual, sel konseptual, dan heliks DNA ilustratif.
- Gerakan dibangun dari nomor frame Remotion agar dapat dirender secara deterministik.
- Seluruh komponen dari keenam modul tetap tersedia untuk penggunaan ulang walaupun tidak semua dipakai langsung dalam satu adegan.
