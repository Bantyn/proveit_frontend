import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className,
  icon: Icon,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";

  const variants = {
    // Primary: Tactile, soft shadow, no border
    primary:
      "bg-text-main text-background hover:bg-text-main/90 shadow-lg hover:shadow-xl",

    // Secondary: Surface based
    secondary: "bg-surface text-text-main hover:bg-surface/80 shadow-md",

    // Outline: Transparent
    outline:
      "bg-transparent text-text-secondary hover:text-text-main hover:bg-text-main/5",

    // Ghost: Pure text
    ghost: "text-text-secondary hover:text-text-main hover:bg-text-main/5",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs tracking-wide",
    md: "px-4 py-2 text-sm tracking-wide",
    lg: "px-6 py-3 text-base tracking-normal",
  };

  const Comp = props.href ? motion.a : motion.button;

  return (
    <Comp
      className={twMerge(
        clsx(baseStyles, variants[variant], sizes[size], className),
      )}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
      {Icon && <Icon className="w-4 h-4 ml-2 opacity-70" />}
    </Comp>
  );
};

export default Button;
