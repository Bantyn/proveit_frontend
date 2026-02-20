import { useRef } from "react";
import { clsx } from "clsx";
import "./index.css"

export default function GlassElement({
  children,
  as: Tag = "div",
  blur = "0.6rem",
  inset = "20px",
  className,
  bounce = false,
  ...props
}) {
  const ref = useRef(null);

  const handleMouseEnter = () => {
    if (!bounce || !ref.current) return;
    ref.current.style.transform = "scaleX(1.08) scaleY(0.98)";
  };

  const handleMouseLeave = () => {
    if (!bounce || !ref.current) return;
    ref.current.style.transform = "scaleX(.9) scaleY(1.1)";
    setTimeout(() => {
      if (!ref.current) return;
      ref.current.style.transform = "scaleX(1) scaleY(1)";
    }, 120);
  };

  const handleMouseDown = () => {
    if (!bounce || !ref.current) return;
    ref.current.style.transform = "scale(0.96) scaleX(1.08) scaleY(0.98)";
  };

  const handleMouseUp = () => {
    if (!bounce || !ref.current) return;
    ref.current.style.transform = "scaleX(.8) scaleY(1.1)";
    setTimeout(() => {
      if (!ref.current) return;
      ref.current.style.transform = "scaleX(1) scaleY(1)";
    }, 150);
  };

  return (
    <Tag
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className={clsx(
        "buttonCover", // keeping the same class as requested to reuse CSS
        // Removing the fixed w-60 h-20 because generic elements shouldn't be fixed size unless specified in className
        // But GlassActions had specific classes: "flex justify-center items-center tracking-tight w-60 h-20 bg-white/2 text-neutral-100 dark:text-neutral-900 cursor-grab active:cursor-grabbing"
        // I should probably include the base glass styles but maybe let sizing be flexible?
        // User said "create same". GlassActions has hardcoded dimensions.
        // I will include the layout/color classes but maybe make width/height overridable or default to auto if not provided?
        // Actually, if I want it to be "same", I should probably include the colors and flex centering.
        "flex justify-center items-center tracking-tight bg-white/2 text-neutral-100 dark:text-neutral-900",
        // I'll omit w-60 h-20 to make it usable as a wrapper, unless user wants exact same dimensions?
        // "create same for div,span" usually implies the *effect*.
        // I'll add the cursor styles only if bounce is true? No, GlassActions has them always on 'button'.
        // Since generic divs might not be interactive, I'll default cursor to default unless className overrides.
        // But GlassActions has `cursor-grab`.
        // I'll stick to the core visual classes from GlassActions:
        className,
      )}
      style={{ "--glass-blur": `${blur}`, "--inset-strength": `${inset}` }}
      {...props}
    >
      {children}
    </Tag>
  );
}
