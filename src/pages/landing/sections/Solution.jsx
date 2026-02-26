import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Code2, Trophy } from "lucide-react";
import DisplayCards from "@/components/ui/display-cards";

const steps = [
  {
    id: 1,
    title: "Company Posts a Real Challenge",
    description:
      "Instead of vague job descriptions, companies create real-world project challenges. They define required skills, difficulty level, deadlines, and evaluation criteria — ensuring complete clarity from the start.",
    icon: Briefcase,
  },
  {
    id: 2,
    title: "Candidates Prove Their Skills",
    description:
      "Candidates submit real solutions through code, projects, or practical tasks. No resumes. No buzzwords. Just demonstrated ability and problem-solving skills in action.",
    icon: Code2,
  },
  {
    id: 3,
    title: "AI Evaluates & Ranks Instantly",
    description:
      "Our AI analyzes quality, efficiency, correctness, and performance metrics to automatically rank candidates. Companies get an instant, data-driven shortlist of top performers.",
    icon: Trophy,
  },
];

const Solution = () => {
  return (
    <section id="how-it-works" className="relative min-h-[50vh] mb-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-black font-bold text-sm text-gradient-subtle"
          >
            The Solution
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-[10rem] font-bold font-heading mt-2 mb-4 text-text-main uppercase"
          >
            How <span className="text-text-main">ProveIt</span> Works
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center relative z-1000"
        >
          <DisplayCards
            cards={steps.map((step) => ({
              icon: <step.icon className="size-4 text-primary" />,
              title: step.title,
              description: step.description,
              stepNumber: step.id,
            }))}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Solution;
