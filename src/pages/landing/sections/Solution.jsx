import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Code2, Trophy } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Company Posts Project",
    description:
      "Define the challenge. Set the skills. No vague job descriptions.",
    icon: Briefcase,
  },
  {
    id: 2,
    title: "Candidates Submit Solution",
    description:
      "Real code. Real scenarios. Candidates prove they can do the job.",
    icon: Code2,
  },
  {
    id: 3,
    title: "Ranked Automatically",
    description:
      "AI analyzes code quality, efficiency, and correctness. Instant shortlist.",
    icon: Trophy,
  },
];

const Solution = () => {
  return (
    <section
      id="how-it-works"
      className="relative min-h-[50vh] mb-50"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-primary font-medium tracking-wider uppercase text-sm"
          >
            The Solution
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-heading mt-2 mb-4 text-text-main"
          >
            How <span className="text-text-main">ProveIt</span> Works
          </motion.h2>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-border/10 -translate-y-1/2 z-0">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-primary via-secondary to-accent opacity-50"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.3 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 rounded-[2rem] bg-surface border border-border/10 flex items-center justify-center mb-8 relative shadow-xl z-10">
                  <div className="absolute inset-0 bg-gradient-to-br from-surface/50 to-transparent rounded-[2rem]" />
                  <step.icon className="w-8 h-8 text-primary" />
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-surface border border-border/10 flex items-center justify-center text-sm font-bold text-text-secondary shadow-sm">
                    {step.id}
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-3 font-heading text-text-main">
                  {step.title}
                </h3>
                <p className="text-text-secondary max-w-xs">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;
