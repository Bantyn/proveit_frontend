import { useRef } from "react";
import { clsx } from "clsx";
import "./index.css"

export default function GlassElement({
  children,
  as: Tag = "div",
  blur = "0.6rem",
  inset = "20px",
  className,
  shadowStrength="10px",
  bgColor="bg-white/2",
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
        "buttonCover", 
        "flex justify-center items-center tracking-tight  text-neutral-100 dark:text-neutral-900",
        className,
        bgColor
      )}
      style={{ "--glass-blur": `${blur}`, "--inset-strength": `${inset}`, "--shadow-strength": shadowStrength }}
      {...props}
    >
      {children}
    </Tag>
  );
}
