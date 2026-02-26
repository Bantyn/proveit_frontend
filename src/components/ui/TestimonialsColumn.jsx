"use client";
import React from "react";
import { motion } from "framer-motion";
import GlassElement from "./glass-ui/GlassElement";
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
        className="flex flex-col gap-10 pb-10"
      >
        {[...new Array(2)].map((_, index) => (
          <React.Fragment key={index}>
            {testimonials.map(({ text, image, name, role }, i) => (

              <GlassElement
                as="div"
                bounce
                className="p-8 rounded-[2rem] border border-slate-950/15 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full max-w-md flex flex-col justify-between items-start"
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
                    className="h-10 w-10 rounded-full border border-slate-950/15 object-cover"
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
              </GlassElement>

            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};
