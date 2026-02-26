import { GradFlow } from "gradflow";
import { cn } from "../../lib/utils";
import React, { useMemo, memo } from "react";

export const StripeGradientShader = memo(({ className }) => {
  const config = useMemo(
    () => ({
      color1: { r: 85, g: 128, b: 255 }, // pale lavender
      color2: { r: 220, g: 210, b: 255 }, // soft violet
      color3: { r: 200, g: 190, b: 255 }, // dusty purple

      speed: 0.1, // Slightly reduced for better performance
      scale: 1,
      type: "stripe",
      noise: 0.01, // Slightly reduced noise for less calculation
    }),
    [],
  );

  return (
    <div
      className={cn(
        "absolute inset-0 w-full h-full -z-10 pointer-events-none",
        className,
      )}
    >
      <GradFlow config={config} />
    </div>
  );
});

StripeGradientShader.displayName = "StripeGradientShader";
