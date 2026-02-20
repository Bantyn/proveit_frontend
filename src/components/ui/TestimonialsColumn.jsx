"use client";
import React from "react";
import { motion } from "framer-motion";

export const TestimonialsColumn = ({
  className,
  testimonials,
  duration = 10,
}) => {
  return (
    <div className={className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2)].map((_, index) => (
          <React.Fragment key={index}>
            {testimonials.map(({ text, image, name, role }, i) => (
              <div
                className="p-8 rounded-[2rem] border border-border/10 bg-surface shadow-lg hover:shadow-xl transition-shadow duration-300 w-full max-w-lg"
                key={i}
              >
                <div className="text-text-secondary leading-relaxed font-medium">
                  "{text}"
                </div>
                <div className="flex items-center gap-3 mt-6">
                  <img
                    width={40}
                    height={40}
                    src={image}
                    alt={name}
                    className="h-10 w-10 rounded-full border border-border/10 object-cover"
                  />
                  <div className="flex flex-col">
                    <div className="font-bold text-text-main text-sm tracking-tight leading-5">
                      {name}
                    </div>
                    <div className="text-xs text-text-secondary leading-5 tracking-tight">
                      {role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};
