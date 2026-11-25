import React from "react";
import { Composition } from "remotion";
import { LuxuryReveal } from "./LuxuryReveal";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="LuxuryReveal"
        component={LuxuryReveal}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          productImage: "https://example.com/product-cutout.png",
          eyebrow: "DESIGNED WITH INTENTION",
          title: "The art of simplicity.",
          subtitle: "A considered form. A lasting impression.",
        }}
      />
    </>
  );
};
