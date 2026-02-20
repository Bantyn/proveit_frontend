import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const Card = ({ children, className }) => {
  return (
    <div
      className={twMerge(
        clsx(
          "rounded-[2rem] bg-surface shadow-lg transition-colors duration-200",
          className,
        ),
      )}
    >
      {children}
    </div>
  );
};

export default Card;
