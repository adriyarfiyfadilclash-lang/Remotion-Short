// AnatomicalFinalComposition: latar -> lapisan belakang -> jantung 3D -> teks & label -> penanda kemajuan -> audio
import React from "react";
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import data from "./data.json";
import { AnatomicalScene3D } from "./components/Heart3D";
import { Latar, SUASANA } from "./components/Latar";
import { Maskot } from "./components/Maskot";
import { LabelLetak, OverlayAdegan, UnderlayAdegan } from "./components/Overlay";
import { DurasiAdegan, FONT, MedicalExplainerScene, warnaTeks } from "./components/Teks";
import { SuaraVideo } from "./components/Audio";
import { ADEGAN, AWAL, PANJANG, TOTAL, adeganPada } from "./lib/waktu";

const Progres: React.FC = () => {
  const frame = useCurrentFrame();
  const { index } = adeganPada(frame);
  const a = ADEGAN[index];
  const terang = SUASANA[a.suasana]?.terang ?? false;
  const lebar = interpolate(frame, [0, TOTAL], [0, 960]);
  return (
    <>
      <div style={{ position: "absolute", top: 70, left: 60, width: 960, height: 10, borderRadius: 5, background: terang ? "rgba(15,23,42,0.12)" : "rgba(255,255,255,0.18)" }} />
      <div style={{ position: "absolute", top: 70, left: 60, width: lebar, height: 10, borderRadius: 5, background: "#e63946" }} />
      <div style={{ position: "absolute", top: 96, left: 60, fontFamily: FONT, fontWeight: 700, fontSize: 28, color: warnaTeks(terang), opacity: 0.85 }}>
        Bagian {a.bagian + 1} dari {data.bagian.length} · {data.bagian[a.bagian]}
      </div>
    </>
  );
};

export const Video: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#0b1d3a" }}>
    <Latar />

    {/* Lapisan di belakang jantung */}
    {ADEGAN.map((a, i) => (
      <Sequence key={`u${a.id}`} from={AWAL[i]} durationInFrames={PANJANG[i]} layout="none">
        <DurasiAdegan.Provider value={PANJANG[i]}>
          <UnderlayAdegan a={a} terang={SUASANA[a.suasana]?.terang ?? false} awal={AWAL[i]} />
        </DurasiAdegan.Provider>
      </Sequence>
    ))}

    <AnatomicalScene3D />

    {/* Teks, label, dan grafis di depan jantung */}
    {ADEGAN.map((a, i) => {
      const terang = SUASANA[a.suasana]?.terang ?? false;
      return (
        <Sequence key={a.id} from={AWAL[i]} durationInFrames={PANJANG[i]}>
          <DurasiAdegan.Provider value={PANJANG[i]}>
            <AbsoluteFill>
              <OverlayAdegan a={a} terang={terang} awal={AWAL[i]} />
              {a.overlay === "torso" && <LabelLetak a={a} terang={terang} awal={AWAL[i]} />}
              <MedicalExplainerScene judul={a.judul} sub={a.sub} terang={terang} />
              {a.maskot && <Maskot ekspresi={a.maskot} />}
            </AbsoluteFill>
          </DurasiAdegan.Provider>
        </Sequence>
      );
    })}

    <Progres />
    <SuaraVideo />
  </AbsoluteFill>
);
