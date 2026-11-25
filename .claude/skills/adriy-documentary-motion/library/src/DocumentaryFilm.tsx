import React from "react";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import {
  DocumentaryKenBurns, DocumentaryFilmFrame, DocumentaryPhotoReveal,
  DocumentaryFilmWipe, DocumentaryCrossfade, DocumentaryTitleReveal,
  DocumentaryDateStamp, DocumentaryLowerThird, DocumentaryQuoteCard,
  DocumentaryChapterHeading, DocumentarySubtitle, DocumentaryCameraPush,
  DocumentaryCameraPan, DocumentaryCameraDrift, DocumentaryGrain,
  DocumentaryVignette, DocumentaryDust, DocumentaryColorWash,
  DocumentaryLightLeak, DocumentaryAudioBed,
} from "./index";

const SceneImage: React.FC = () => (
  <AbsoluteFill>
    <img src={staticFile("documentary/documentary-scene.svg")}
      style={{ width: "100%", height: "100%", objectFit: "cover" }} />
  </AbsoluteFill>
);

const FilmLook: React.FC<{children: React.ReactNode}> = ({ children }) => (
  <DocumentaryFilmFrame bars={54} vignette={0.38} grainOpacity={0.035}>
    {children}
    <DocumentaryColorWash color="#1d2930" opacity={0.10} />
    <DocumentaryDust count={18} opacity={0.10} speed={0.18} />
    <DocumentaryVignette strength={0.22} softness={56} />
  </DocumentaryFilmFrame>
);

export const DocumentaryFilm: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#080b0e" }}>
    <DocumentaryAudioBed src={staticFile("audio/original-ambient-bed.wav")}
      volume={0.55} fadeIn={45} fadeOut={60} />

    {/* 00:00–00:08 — Opening */}
    <Sequence from={0} durationInFrames={240}>
      <FilmLook>
        <DocumentaryKenBurns src={staticFile("documentary/documentary-scene.svg")}
          direction="left" startScale={1.03} endScale={1.12} />
        <DocumentaryDateStamp date="CATATAN SEJARAH" location="SEBUAH KISAH DARI MASA LALU" />
        <DocumentaryTitleReveal kicker="ADRIY DOCUMENTARY" title="Jejak Waktu dan Ingatan"
          delay={18} duration={42} />
        <DocumentaryLightLeak start={95} duration={90} intensity={0.10} />
      </FilmLook>
    </Sequence>

    {/* 00:08–00:16 — Establishing shot and camera movement */}
    <Sequence from={240} durationInFrames={240}>
      <FilmLook>
        <DocumentaryCameraDrift x={2.2} y={-1.2} scaleFrom={1.04} scaleTo={1.13}>
          <SceneImage />
        </DocumentaryCameraDrift>
        <DocumentaryLowerThird name="ARSIP VISUAL" role="REKONSTRUKSI SUASANA • ILUSTRASI" />
        <DocumentarySubtitle text="Untuk memahami sebuah peristiwa, kita perlu melihat konteks di baliknya."
          delay={28} />
      </FilmLook>
    </Sequence>

    {/* 00:16–00:24 — Archive image reveal */}
    <Sequence from={480} durationInFrames={240}>
      <FilmLook>
        <DocumentaryPhotoReveal src={staticFile("documentary/documentary-scene.svg")}
          caption="ARSIP VISUAL • ILUSTRASI" delay={8} duration={32} />
        <DocumentaryDateStamp date="DOKUMEN 01" location="PENGANTAR KONTEKS" />
      </FilmLook>
    </Sequence>

    {/* 00:24–00:32 — Chapter and quote */}
    <Sequence from={720} durationInFrames={240}>
      <FilmLook>
        <DocumentaryChapterHeading number="01" title="Membaca Jejak"
          description="Setiap bukti, catatan, dan kesaksian membantu menyusun gambaran yang lebih utuh." />
        <DocumentaryCrossfade from={130}>
          <DocumentaryQuoteCard quote="Memahami masa lalu adalah langkah untuk membaca masa kini."
            attribution="NARASI DOKUMENTER" delay={142} />
        </DocumentaryCrossfade>
      </FilmLook>
    </Sequence>

    {/* 00:32–00:40 — Closing */}
    <Sequence from={960} durationInFrames={240}>
      <FilmLook>
        <DocumentaryCameraPush fromScale={1.02} toScale={1.10}>
          <SceneImage />
        </DocumentaryCameraPush>
        <DocumentaryTitleReveal kicker="ADRIY PROJECT" title="Cerita berlanjut..."
          align="center" delay={35} duration={40} />
      </FilmLook>
    </Sequence>
  </AbsoluteFill>
);
