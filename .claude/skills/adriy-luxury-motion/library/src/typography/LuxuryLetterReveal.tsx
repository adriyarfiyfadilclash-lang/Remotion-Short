import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";

type Props = {
  text: string;
  startFrame?: number;
  framesPerCharacter?: number;
  characterDuration?: number;
  fontSize?: number | string;
  color?: string;
  fontFamily?: string;
  letterSpacing?: number | string;
  style?: React.CSSProperties;
};

export const LuxuryLetterReveal: React.FC<Props> = ({
  text,
  startFrame = 0,
  framesPerCharacter = 2,
  characterDuration = 14,
  fontSize = 64,
  color = "#F2EFE8",
  fontFamily = "Georgia, 'Times New Roman', serif",
  letterSpacing = "-0.025em",
  style,
}) => {
  const frame = useCurrentFrame();

  return (
    <div
      aria-label={text}
      style={{
        display: "flex",
        flexWrap: "wrap",
        color,
        fontFamily,
        fontSize,
        letterSpacing,
        lineHeight: 1.1,
        ...style,
      }}
    >
      {Array.from(text).map((character, index) => {
        const from = startFrame + index * framesPerCharacter;
        const progress = interpolate(frame, [from, from + Math.max(1, characterDuration)], [0, 1], {
          easing: Easing.bezier(0.22, 1, 0.36, 1),
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        return (
          <span
            key={`${index}-${character}`}
            style={{
              display: "inline-block",
              whiteSpace: character === " " ? "pre" : "normal",
              opacity: progress,
              transform: `translateY(${(1 - progress) * 12}px)`,
            }}
          >
            {character === " " ? "\u00A0" : character}
          </span>
        );
      })}
    </div>
  );
};
