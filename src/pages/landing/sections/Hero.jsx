import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Code } from "lucide-react";
import Button from "../../../components/ui/Button";
import { NeonOrbs } from "../../../components/ui/NeonOrbs";
import GlassActions from "../../../components/ui/glass-ui/GlassActions";
import GlassElement from "../../../components/ui/glass-ui/GlassElement";

const Hero = () => {
  const variants = {
    slideUp: {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 },
    },
  };

  const transitions = {
    default: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center  pt-70">
      {/* Neon Orbs Background */}
      <div className="absolute inset-0 z-0">
        <NeonOrbs />
      </div>

      <div className="container mx-auto px-4 z-10 relative text-center">
        {/* Badge - "System Status" vibe */}
        <motion.div
          variants={variants.slideUp}
          initial="hidden"
          animate="visible"
          className="hidden inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface/50 border border-white/10 backdrop-blur-sm mb-10"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-mono text-text-secondary tracking-widest uppercase">
            System Online v2.0
          </span>
        </motion.div>

        {/* Headline - "Big & Confident" */}
        <motion.h1
          variants={variants.slideUp}
          initial="hidden"
          animate="visible"
          transition={{ ...transitions.default, delay: 0.1 }}
          className="text-6xl md:text-8xl font-bold font-heading mb-8 tracking-tighter leading-[0.9] text-text-main"
        >
          Stop Hiring Resumes.
          <br />
          <span className="text-gradient-subtle">Start Hiring Skill.</span>
        </motion.h1>

        {/* Subheadline - "Engineered Tone" */}
        <motion.p
          variants={variants.slideUp}
          initial="hidden"
          animate="visible"
          transition={{ ...transitions.default, delay: 0.2 }}
          className="text-xl md:text-2xl text-text-secondary mb-12 max-w-2xl mx-auto font-light leading-relaxed"
        >
          The evaluation layer for modern engineering teams. Automated code
          analysis, bias-free ranking, and verified proof-of-work.
        </motion.p>

        {/* CTA Buttons - "Tactile" */}
        <motion.div
          variants={variants.slideUp}
          initial="hidden"
          animate="visible"
          transition={{ ...transitions.default, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-24"
        >
          <GlassActions
            text="Start Hiring"
            icon={<ArrowRight className="w-5 h-5 mt-2 ml-3" />}
            type="link"
            url="/hello"
            blur="0.2rem"
            inset="20px"
            className="w-70 h-20 text-2xl  font-bold rounded-[5rem] text-black dark:text-white bg-white/10"
            bounce
          />

          <Button variant="primary" size="lg" className=" hidden h-12 min-w-[160px]">
            Start Hiring <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>

        {/* Terminal/Code Snippet Visualization - "Tech First" */}
        <GlassElement as="span" blur="1rem" className="relative max-w-5xl mx-auto h-100 rounded-4xl bg-[#0F0F16] border border-white/10 shadow-2xl overflow-hidden ">
        <motion.div
          variants={variants.slideUp}
          initial="hidden"
          animate="visible"
          transition={{ ...transitions.default, delay: 0.4 }}
          className="relative w-full h-full rounded-4xl bg-white/1 border border-white/10 shadow-2xl overflow-hidden"
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5 rounded-4xl mt-2 mx-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
            </div>
            <div className="flex-1 text-center font-mono text-xs text-gray-500 opacity-50">
              candidate_ranking.py
            </div>
          </div>

          <div className="p-6 text-left font-mono text-sm overflow-x-auto">
            <div className="text-gray-500 mb-2">
              # Calculating comprehensive skill score...
            </div>
            <div className="flex gap-4">
              <div className="w-8 text-gray-700 select-none text-right">1</div>
              <div className="text-primary">
                item_score <span className="text-white">=</span>{" "}
                <span className="text-accent">calculate_complexity</span>
                (submission.code)
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 text-gray-700 select-none text-right">2</div>
              <div className="text-primary">
                perf_metric <span className="text-white">=</span>{" "}
                <span className="text-accent">benchmark_runtime</span>
                (submission.test_cases)
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 text-gray-700 select-none text-right">3</div>
              <div className="text-white">
                final_rank <span className="text-primary">=</span>{" "}
                <span className="text-accent">normalize_ranking</span>
                (item_score, perf_metric)
              </div>
            </div>
            <div className="flex gap-4 mt-2">
              <div className="w-8 text-gray-700 select-none text-right">4</div>
              <div className="text-green-400">
                print(
                <span className="text-yellow-300">
                  f"Candidate Rank: Top{" "}
                  <span className="text-white">{"{final_rank}"}</span>%"
                </span>
                )
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="flex gap-4 mt-4 text-green-400"
            >
              <div className="w-8 text-gray-700 select-none text-right">$</div>
              <div className="typing-cursor">Candidate Rank: Top 1%</div>
            </motion.div>
          </div>

          {/* Glossy Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
        </motion.div>
        </GlassElement>

        
      </div>
    </section>
  );
};

export default Hero;
