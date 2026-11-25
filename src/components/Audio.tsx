// Musik latar + SFX tepat waktu + bunyi detak yang sinkron dengan animasi jantung.
import React from "react";
import { Audio, Sequence, interpolate, staticFile } from "remotion";
import data from "../data.json";
import { ADEGAN, AWAL, FPS, PANJANG, TOTAL } from "../lib/waktu";

const VOLUME: Record<string, number> = {
  hit: 0.55, whoosh: 0.35, pop: 0.4, ding: 0.4, tick: 0.3, riser: 0.35, zap: 0.4, gelembung: 0.35,
};

export const SuaraVideo: React.FC = () => {
  const D = data.detakFrame;
  return (
    <>
      {/* Musik latar lembut, berulang, memudar di awal dan akhir */}
      <Audio
        src={staticFile("musik/latar.wav")}
        loop
        volume={(f) =>
          0.14 * interpolate(f, [0, 30, TOTAL - 60, TOTAL], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
        }
      />

      {ADEGAN.map((a, i) => (
        <React.Fragment key={a.id}>
          {a.sfx.map((s, j) => (
            <Sequence key={j} from={AWAL[i] + Math.round(s.detik * FPS)} durationInFrames={Math.round(2.5 * FPS)} layout="none">
              <Audio src={staticFile(`sfx/${s.jenis}.wav`)} volume={VOLUME[s.jenis] ?? 0.4} />
            </Sequence>
          ))}
          {a.detak &&
            // Bunyi "dug-dag" pada detak yang sesuai fase animasi (tiap 2 detak agar tidak berlebihan)
            Array.from({ length: Math.ceil(PANJANG[i] / D) + 1 }).map((_, n) => {
              const awalDetak = Math.ceil(AWAL[i] / D) * D + n * D * 2 + Math.round(0.16 * D);
              if (awalDetak >= AWAL[i] + PANJANG[i] - 10 || awalDetak < AWAL[i]) return null;
              return (
                <Sequence key={`d${n}`} from={awalDetak} durationInFrames={D} layout="none">
                  <Audio src={staticFile("sfx/detak.wav")} volume={0.6} />
                </Sequence>
              );
            })}
        </React.Fragment>
      ))}
    </>
  );
};
