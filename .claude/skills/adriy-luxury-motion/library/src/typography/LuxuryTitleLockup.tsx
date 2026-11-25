import React from "react";
import { AbsoluteFill } from "remotion";
import { LuxuryTextReveal } from "./LuxuryTextReveal";
import { LuxurySubtitle } from "./LuxurySubtitle";

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  startFrame?: number;
  align?: "left" | "center";
};

export const LuxuryTitleLockup: React.FC<Props> = ({
  eyebrow,
  title,
  description,
  startFrame = 0,
  align = "left",
}) => {
  const textAlign = align;
  const centered = align === "center";

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: centered ? "center" : "flex-start",
        padding: "8%",
        textAlign,
      }}
    >
      <div style={{ maxWidth: 1000 }}>
        <LuxuryTextReveal
          text={eyebrow.toUpperCase()}
          startFrame={startFrame}
          duration={22}
          distance={8}
          fontSize={13}
          color="#C8B58A"
          fontFamily="Arial, Helvetica, sans-serif"
          style={{ letterSpacing: "0.28em", marginBottom: 24 }}
        />
        <LuxuryTextReveal
          text={title}
          startFrame={startFrame + 10}
          duration={34}
          distance={20}
          fontSize="clamp(48px, 7vw, 104px)"
        />
        {description ? (
          <LuxurySubtitle
            text={description}
            startFrame={startFrame + 34}
            duration={24}
            style={{ marginTop: 28, justifyContent: centered ? "center" : "flex-start" }}
          />
        ) : null}
      </div>
    </AbsoluteFill>
  );
};
