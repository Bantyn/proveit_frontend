import { useRef } from "react";
import { clsx } from "clsx";
import { Link } from "react-router-dom";
import "./index.css";

export default function GlassActions({
  text,
  type, 
  url,
  icon = "",
  blur = "0.6rem",
  inset = "20px",
  className,
  shadowStrength="10px",
  bounce = false,
  onClick,
}) {
  const btnRef = useRef(null);

  const handleMouseEnter = () => {
    if (!btnRef.current) return;
    btnRef.current.style.transform = "scaleX(1.08) scaleY(0.98)";
  };

  const handleMouseLeave = () => {
    if (!btnRef.current) return;
    btnRef.current.style.transform = "scaleX(.9) scaleY(1.1)";
    setTimeout(() => {
      if (!btnRef.current) return;
      btnRef.current.style.transform = "scaleX(1) scaleY(1)";
    }, 120);
  };

  const handleMouseDown = () => {
    if (!btnRef.current) return;
    btnRef.current.style.transform = "scale(0.96) scaleX(1.08) scaleY(0.98)";
  };

  const handleMouseUp = () => {
    if (!btnRef.current) return;
    btnRef.current.style.transform = "scaleX(.8) scaleY(1.1)";
    setTimeout(() => {
      if (!btnRef.current) return;
      btnRef.current.style.transform = "scaleX(1) scaleY(1)";
    }, 150);
  };

  const motionProps = {
    ref: bounce ? btnRef : null,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
  };

  const glassStyle = { "--glass-blur": blur, "--inset-strength": inset, "--shadow-strength": shadowStrength };

  // ── Submit button ────────────────────────────────────────────────────────────
  if (type === "submit") {
    return (
      <button
        {...motionProps}
        type="submit"
        onClick={onClick}
        className={clsx(
          "buttonCover flex justify-center items-center tracking-tight bg-white/2 cursor-pointer",
          className,
        )}
        style={glassStyle}
      >
        {text}
        {icon}
      </button>
    );
  }

  // ── Regular button ───────────────────────────────────────────────────────────
  if (type === "button") {
    return (
      <button
        {...motionProps}
        type="button"
        onClick={onClick}
        className={clsx(
          "buttonCover flex justify-center items-center tracking-tight bg-white/2 cursor-grab active:cursor-grabbing",
          className,
        )}
        style={glassStyle}
      >
        {text}
        {icon}
      </button>
    );
  }

  // ── Link (default) ───────────────────────────────────────────────────────────
  return (
    <Link
      {...motionProps}
      to={url}
      className={clsx(
        "buttonCover flex justify-center items-center tracking-tight bg-white/2 cursor-pointer",
        className,
      )}
      style={glassStyle}
    >
      {text}
      {icon}
    </Link>
  );
}
