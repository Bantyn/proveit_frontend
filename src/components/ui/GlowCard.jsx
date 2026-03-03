import React, { useEffect, useRef } from "react";
import GlassElement from "../ui/glass-ui/GlassElement";
const glowColorMap = {
  blue: { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green: { base: 120, spread: 200 },
  red: { base: 0, spread: 200 },
  orange: { base: 30, spread: 200 },
};

const sizeMap = {
  sm: "w-48 h-64",
  md: "w-64 h-80",
  lg: "w-80 h-96",
};

const GlowCard = ({
  children,
  className = "",
  glowColor = "blue",
  size = "md",
  width,
  height,
  customSize = false,
  border = "var(--border-size) solid var(--backup-border)",
  noBorder = false,
}) => {
  const cardRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const syncPointer = (e) => {
      const { clientX: x, clientY: y } = e;

      if (cardRef.current) {
        cardRef.current.style.setProperty("--x", x.toFixed(2));
        cardRef.current.style.setProperty(
          "--xp",
          (x / window.innerWidth).toFixed(2),
        );
        cardRef.current.style.setProperty("--y", y.toFixed(2));
        cardRef.current.style.setProperty(
          "--yp",
          (y / window.innerHeight).toFixed(2),
        );
      }
    };

    document.addEventListener("pointermove", syncPointer);
    return () => document.removeEventListener("pointermove", syncPointer);
  }, []);

  // Safe access to glowColorMap
  const { base, spread } = glowColorMap[glowColor] || glowColorMap.blue;

  // Determine sizing
  const getSizeClasses = () => {
    if (customSize) {
      return ""; // Let className or inline styles handle sizing
    }
    return sizeMap[size] || sizeMap.md;
  };

  const getInlineStyles = () => {
    const baseStyles = {
      "--base": base,
      "--spread": spread,
      "--radius": "48",
      "--border": "1",
      "--backdrop": "var(--glass-bg)",
      "--backup-border": "var(--color-border)",
      "--size": "300",
      "--outer": "1",
      "--border-size": "1px",
      "--spotlight-size": "calc(var(--size, 250) * 1px)",
      backgroundColor: "var(--backdrop, transparent)",
      backgroundSize:
        "calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))",
      backgroundPosition: "50% 50%",
      backgroundAttachment: "fixed",
      border: noBorder ? "none" : (border || "var(--border-size) solid var(--backup-border)"),
      position: "relative",
      touchAction: "none",
    };

    // Add width and height if provided
    if (width !== undefined) {
      baseStyles.width = typeof width === "number" ? `${width}px` : width;
    }
    if (height !== undefined) {
      baseStyles.height = typeof height === "number" ? `${height}px` : height;
    }

    return baseStyles;
  };

  const beforeAfterStyles = ``;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: beforeAfterStyles }} />


      <div
        ref={cardRef}
        data-glow
        style={getInlineStyles()}
        className={`
          ${getSizeClasses()}
          ${!customSize ? "aspect-[3/4]" : ""}
          rounded-[3.5rem] 
          relative 
          grid 
          grid-rows-[1fr_auto] 
          shadow-[0_1rem_3rem_-1rem_rgba(0,0,0,0.1)] 
          [data-theme='dark']:shadow-[0_1rem_2rem_-1rem_black]/20 
          p-10 
          gap-4 
          ${!noBorder ? "border border-white/[0.03]" : ""}
          hover:backdrop-blur-[1px] transition-all duration-500
          backdrop-blur-[20px]
          ${className}
        `}
      >

        <div ref={innerRef} data-glow></div>
        {children}
      </div>
    </>
  );
};

export { GlowCard };
