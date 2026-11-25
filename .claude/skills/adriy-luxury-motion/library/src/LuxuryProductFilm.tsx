import React from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  Easing,
  useCurrentFrame,
} from "remotion";
import { LuxuryReveal, LuxuryFloat, LuxuryZoom } from "./animations";
import { LuxuryWipe, LuxuryBlurReveal, LuxuryDipToDark } from "./transitions";
import {
  LuxuryTextReveal,
  LuxurySubtitle,
  LuxuryLetterReveal,
} from "./typography";
import {
  LuxurySoftGlow,
  LuxuryLightRays,
  LuxuryMetallicSweep,
  LuxuryAmbientShadow,
  LuxuryLensFlare,
} from "./effects";

const C = {
  bg: "#090A0C",
  ivory: "#F2EFE8",
  muted: "#AAA49A",
  gold: "#C8B58A",
};

const SceneBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill
    style={{
      background:
        "radial-gradient(ellipse at 68% 43%, rgba(200,181,138,.11), transparent 36%), linear-gradient(115deg,#090a0c,#17191b 58%,#08090b)",
      color: C.ivory,
      overflow: "hidden",
      fontFamily: "Arial, Helvetica, sans-serif",
    }}
  >
    {children}
  </AbsoluteFill>
);

const ProductBottle: React.FC = () => {
  const frame = useCurrentFrame();
  const glint = interpolate(frame, [0, 150], [-8, 8], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ position: "relative", width: 330, height: 590 }}>
      {/* Stylized CSS product placeholder; replace with a real product render for production. */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 117,
          width: 96,
          height: 105,
          borderRadius: "13px 13px 5px 5px",
          background: "linear-gradient(90deg,#4b463c,#d7c69e 45%,#655b47)",
          boxShadow: "inset 8px 0 12px rgba(255,255,255,.18), inset -8px 0 12px rgba(0,0,0,.35)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 92,
          left: 45,
          width: 240,
          height: 440,
          borderRadius: "48px 48px 58px 58px",
          border: "2px solid rgba(230,215,180,.65)",
          background:
            "linear-gradient(90deg,rgba(40,36,29,.96),rgba(191,169,122,.72) 24%,rgba(245,232,199,.38) 48%,rgba(83,72,52,.86) 78%,rgba(25,24,22,.98))",
          boxShadow:
            "inset 14px 0 24px rgba(255,255,255,.12), inset -18px 0 28px rgba(0,0,0,.48), 0 35px 70px rgba(0,0,0,.55)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${40 + glint}%`,
            width: 34,
            background: "linear-gradient(90deg,transparent,rgba(255,255,255,.42),transparent)",
            filter: "blur(9px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 170,
            textAlign: "center",
            color: "#f3e7ca",
            fontFamily: "Georgia, serif",
            letterSpacing: 5,
            fontSize: 23,
          }}
        >
          A D R I Y
          <div style={{ marginTop: 12, fontFamily: "Arial", fontSize: 9, letterSpacing: 3 }}>
            PARFUM / NO. 01
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 20,
          width: 290,
          height: 24,
          borderRadius: "50%",
          background: "rgba(0,0,0,.58)",
          filter: "blur(16px)",
        }}
      />
    </div>
  );
};

const Header: React.FC<{ right: string }> = ({ right }) => (
  <>
    <div
      style={{
        position: "absolute",
        top: 70,
        left: 120,
        right: 120,
        display: "flex",
        justifyContent: "space-between",
        color: C.muted,
        fontSize: 13,
        letterSpacing: 4,
      }}
    >
      <span>ADRIY / OBJECT STUDY</span>
      <span>{right}</span>
    </div>
    <div
      style={{
        position: "absolute",
        top: 112,
        left: 120,
        right: 120,
        height: 1,
        background: "rgba(200,181,138,.3)",
      }}
    />
  </>
);

const Opening: React.FC = () => (
  <SceneBackground>
    <Header right="01 — THE REVEAL" />
    <LuxurySoftGlow color={C.gold} intensity={0.2} x="70%" y="48%" />
    <LuxuryLightRays startFrame={0} duration={130} opacity={0.055} count={3} />
    <div style={{ position: "absolute", left: 150, top: 340, width: 720 }}>
      <LuxuryReveal delay={8} duration={36}>
        <div style={{ color: C.gold, letterSpacing: 7, fontSize: 15, marginBottom: 28 }}>
          AN OBJECT, REFINED
        </div>
        <LuxuryTextReveal
          text="The art of"
          startFrame={18}
          duration={34}
          fontSize={104}
        />
        <LuxuryTextReveal
          text="quiet luxury."
          startFrame={34}
          duration={42}
          fontSize={104}
          style={{ fontStyle: "italic", marginTop: 4 }}
        />
        <LuxurySubtitle
          text="A considered form. A lasting impression."
          startFrame={70}
          duration={28}
          style={{ marginTop: 36 }}
        />
      </LuxuryReveal>
    </div>
    <div style={{ position: "absolute", right: 170, top: 240 }}>
      <LuxuryZoom from={0.94} to={1.02} startFrame={0} endFrame={150}>
        <LuxuryFloat amplitude={5} periodInFrames={120}>
          <LuxuryAmbientShadow blur={48} opacity={0.58} offsetY={34}>
            <ProductBottle />
          </LuxuryAmbientShadow>
        </LuxuryFloat>
      </LuxuryZoom>
      <LuxuryMetallicSweep startFrame={36} duration={75} opacity={0.16} />
      <LuxuryLensFlare startFrame={75} duration={42} x="74%" y="35%" intensity={0.1} />
    </div>
    <div style={{ position: "absolute", bottom: 72, left: 120, color: C.muted, letterSpacing: 3, fontSize: 12 }}>
      FORM / FUNCTION / FEELING
    </div>
  </SceneBackground>
);

const Detail: React.FC = () => (
  <SceneBackground>
    <Header right="02 — THE DETAIL" />
    <LuxurySoftGlow color="#BBA77E" intensity={0.15} x="50%" y="52%" />
    <div style={{ position: "absolute", left: 150, top: 340, width: 660 }}>
      <LuxuryTextReveal text="Every detail," startFrame={0} duration={30} fontSize={82} />
      <LuxuryTextReveal text="deliberate." startFrame={18} duration={34} fontSize={82} style={{ fontStyle: "italic" }} />
      <LuxurySubtitle text="A quiet balance of material, proportion and light." startFrame={58} duration={28} style={{ marginTop: 34 }} />
      <div style={{ marginTop: 70 }}>
        <LuxuryLetterReveal
          text="CRAFTED WITH INTENTION"
          startFrame={88}
          framesPerCharacter={2}
          characterDuration={10}
          fontSize={13}
          color={C.gold}
          fontFamily="Arial, sans-serif"
          letterSpacing="0.2em"
        />
      </div>
    </div>
    <div style={{ position: "absolute", right: 210, top: 250 }}>
      <LuxuryBlurReveal startFrame={8} duration={34} blurAmount={14}>
        <LuxuryFloat amplitude={4} periodInFrames={100}>
          <ProductBottle />
        </LuxuryFloat>
      </LuxuryBlurReveal>
      <LuxuryMetallicSweep startFrame={42} duration={60} opacity={0.13} />
    </div>
  </SceneBackground>
);

const Closing: React.FC = () => (
  <SceneBackground>
    <Header right="03 — THE SIGNATURE" />
    <LuxurySoftGlow color={C.gold} intensity={0.13} x="50%" y="50%" />
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <LuxuryTextReveal text="ADRIY" startFrame={0} duration={32} fontSize={24} color={C.gold} style={{ letterSpacing: "0.55em" }} />
      <LuxuryTextReveal text="Less, but unforgettable." startFrame={20} duration={42} fontSize={76} style={{ marginTop: 28 }} />
      <LuxurySubtitle text="ADRIY.PROJECT  /  OBJECT STUDY 01" startFrame={68} duration={26} style={{ marginTop: 30 }} />
    </div>
    <LuxuryDipToDark startFrame={112} duration={36}>
      <AbsoluteFill />
    </LuxuryDipToDark>
  </SceneBackground>
);

export const LuxuryProductFilm: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg }}>
    <Sequence from={0} durationInFrames={150}>
      <Opening />
    </Sequence>
    <Sequence from={150} durationInFrames={150}>
      <LuxuryWipe startFrame={0} duration={28} direction="left">
        <Detail />
      </LuxuryWipe>
    </Sequence>
    <Sequence from={300} durationInFrames={150}>
      <LuxuryBlurReveal startFrame={0} duration={32}>
        <Closing />
      </LuxuryBlurReveal>
    </Sequence>
  </AbsoluteFill>
);
