import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { luxuryEase, luxuryPalette, luxuryTiming } from "./luxuryTokens";

type LuxuryRevealProps = {
  productImage: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
};

export const LuxuryReveal: React.FC<LuxuryRevealProps> = ({
  productImage,
  eyebrow = "DESIGNED WITH INTENTION",
  title = "The art of simplicity.",
  subtitle = "A considered form. A lasting impression.",
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const productProgress = interpolate(
    frame,
    luxuryTiming.productIn,
    [0, 1],
    { easing: luxuryEase, extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const titleProgress = interpolate(
    frame,
    luxuryTiming.titleIn,
    [0, 1],
    { easing: luxuryEase, extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const detailProgress = interpolate(
    frame,
    luxuryTiming.detailIn,
    [0, 1],
    { easing: luxuryEase, extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const outro = interpolate(
    frame,
    [durationInFrames - 18, durationInFrames - 1],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const productScale = interpolate(productProgress, [0, 1], [1.08, 1]);
  const productY = interpolate(productProgress, [0, 1], [44, 0]);
  const titleY = interpolate(titleProgress, [0, 1], [22, 0]);
  const detailY = interpolate(detailProgress, [0, 1], [10, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: luxuryPalette.background,
        color: luxuryPalette.ivory,
        overflow: "hidden",
        fontFamily: "Arial, Helvetica, sans-serif",
        opacity: outro,
      }}
    >
      {/* Cahaya latar yang halus; bukan pengganti lighting 3D nyata. */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 66% 43%, rgba(200,181,138,0.13), transparent 38%), linear-gradient(115deg, #090A0C 0%, #111316 55%, #090A0C 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "9%",
          left: "7%",
          right: "7%",
          display: "flex",
          justifyContent: "space-between",
          color: luxuryPalette.muted,
          fontSize: 12,
          letterSpacing: 3,
        }}
      >
        <span>ADRIY / OBJECT STUDY</span>
        <span>01 — LUXURY SERIES</span>
      </div>

      {/* Garis tipis sebagai elemen editorial. */}
      <div
        style={{
          position: "absolute",
          left: "7%",
          right: "7%",
          top: "15%",
          height: 1,
          background: luxuryPalette.line,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: "8%",
          top: "27%",
          width: "39%",
          zIndex: 2,
          opacity: titleProgress,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div
          style={{
            color: luxuryPalette.champagne,
            fontSize: 12,
            letterSpacing: 4,
            marginBottom: 22,
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "clamp(42px, 6vw, 88px)",
            lineHeight: 0.98,
            letterSpacing: -2,
            maxWidth: 650,
          }}
        >
          {title}
        </div>
        <div
          style={{
            marginTop: 24,
            width: 54,
            height: 1,
            background: luxuryPalette.champagne,
          }}
        />
        <div
          style={{
            marginTop: 18,
            color: luxuryPalette.muted,
            fontSize: 15,
            letterSpacing: 0.5,
            lineHeight: 1.5,
            opacity: detailProgress,
            transform: `translateY(${detailY}px)`,
          }}
        >
          {subtitle}
        </div>
      </div>

      {/* Placeholder produk: gunakan foto/render dengan latar transparan bila ada. */}
      <div
        style={{
          position: "absolute",
          right: "7%",
          top: "17%",
          width: "48%",
          height: "70%",
          opacity: productProgress,
          transform: `translate3d(0, ${productY}px, 0) scale(${productScale})`,
          transformOrigin: "center center",
          filter: "drop-shadow(0 32px 48px rgba(0,0,0,0.55))",
        }}
      >
        <Img
          src={productImage}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          left: "7%",
          right: "7%",
          bottom: "9%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: luxuryPalette.muted,
          fontSize: 11,
          letterSpacing: 2,
          opacity: detailProgress,
        }}
      >
        <span>FORM / FUNCTION / FEELING</span>
        <span style={{ color: luxuryPalette.champagne }}>ADRIY.PROJECT</span>
      </div>
    </AbsoluteFill>
  );
};
