import React, { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Plus, Equal } from "lucide-react";

const AnimatedCounter = ({ value, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const totalFrames = Math.round(duration * 60);
      const counterIncrement = (end - start) / totalFrames;

      const timer = setInterval(() => {
        start += counterIncrement;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.round(start));
        }
      }, 1000 / 60);

      return () => clearInterval(timer);
    }
  }, [value, duration, isInView]);

  return <span ref={ref}>{count}</span>;
};

const RankingEngine = () => {
  return (
    <section className="py-24 bg-transparent relative ">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-text-secondary font-mono text-sm tracking-widest uppercase mb-4 block">
            The Algorithm
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-text-main">
            Engineered for <span className="text-text-main">Fairness.</span>
          </h2>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 max-w-4xl mx-auto">
          {/* Component 1: Code Quality */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full border-2 border-primary/30 flex items-center justify-center text-3xl font-bold text-primary mb-4 bg-primary/5 shadow-lg shadow-primary/20">
              <AnimatedCounter value={40} />%
            </div>
            <p className="text-text-secondary font-mono">Auto-Score</p>
          </div>

          <Plus className="hidden md:block w-8 h-8 text-text-secondary/50" />

          {/* Component 2: Manual Review */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full border-2 border-secondary/30 flex items-center justify-center text-3xl font-bold text-secondary mb-4 bg-secondary/5 shadow-lg shadow-secondary/20">
              <AnimatedCounter value={40} />%
            </div>
            <p className="text-text-secondary font-mono">Expert Review</p>
          </div>

          <Plus className="hidden md:block w-8 h-8 text-text-secondary/50" />

          {/* Component 3: Integrity */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full border-2 border-accent/30 flex items-center justify-center text-3xl font-bold text-accent mb-4 bg-accent/5 shadow-lg shadow-accent/20">
              <AnimatedCounter value={20} />%
            </div>
            <p className="text-text-secondary font-mono">Integrity Check</p>
          </div>

          <Equal className="hidden md:block w-8 h-8 text-text-main" />

          {/* Result: Final Score */}
          <div className="flex flex-col items-center scale-110">
            <div className="w-32 h-32 rounded-full border-4 border-green-500 flex items-center justify-center text-5xl font-bold text-text-main mb-4 bg-green-500/10 shadow-xl shadow-green-500/30 relative">
              <AnimatedCounter value={98} />
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                RANK #1
              </span>
            </div>
            <p className="text-green-500 font-mono font-bold tracking-wider">
              PROVEIT SCORE
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RankingEngine;
