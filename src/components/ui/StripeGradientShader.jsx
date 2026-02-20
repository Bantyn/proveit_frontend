import { GradFlow } from "gradflow";
import { cn } from "../../lib/utils";

export const StripeGradientShader = ({ className }) => {
  return (
    <div className={cn("absolute inset-0 w-full h-full -z-100", className)}>
      <GradFlow
        config={{
         color1: { r: 85, g: 128, b: 255 },  // pale lavender
color2: { r: 220, g: 210, b: 255 },  // soft violet
color3: { r: 200, g: 190, b: 255 },  // dusty purple

          speed: 0.9,
          scale: 1,
          type: "stripe",
          noise: 0.08,
        }}
      />
    </div>
  );
};
