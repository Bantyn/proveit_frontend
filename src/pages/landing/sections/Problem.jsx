import React from "react";
import { motion } from "framer-motion";
import { FileX, UserX, Target } from "lucide-react";
import { variants } from "../../../config/motion.config";
import { GlowCard } from "../../../components/ui/GlowCard";

const problems = [
  {
    icon: FileX,
    title: "Resumes Lie",
    description:
      "Nearly 40% of resumes contain exaggerated or misleading information. Bullet points highlight achievements, but rarely demonstrate real execution, problem-solving depth, or hands-on capability. Hiring decisions are often made on polished wording instead of proven skill.",
    color: "red",
  },
  {
    icon: UserX,
    title: "Bias is Real",
    description:
      "Hiring decisions are frequently influenced by factors like college reputation, previous company brand, communication style, or even unconscious personal bias. Technical capability and real problem-solving ability often become secondary to perception and presentation.",
    color: "purple",
  },
  {
    icon: Target,
    title: "Skills Ignored",
    description:
      "Talented developers and builders are overlooked because they lack prestigious company names or elite institutions on their resume. Real-world capability is often hidden behind filters that prioritize pedigree over performance and measurable output.",
    color: "blue",
  },
];

const Problem = () => {
  return (
    <section className=" mt-50 relative bg-transparent min-h-screen">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            variants={variants.slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 tracking-tight text-text-main">
              Hiring is <span className="text-red-500">Broken.</span>
            </h2>
            <p className="text-xl text-text-secondary leading-relaxed max-w-lg">
              Traditional hiring methods prioritize credentials over capability.
              It’s time to stop filtering by keywords and start filtering by
              code.
            </p>
          </motion.div>

          {/* Minimal engineered graphic or empty space for asymmetrical breathing room */}
          <div className="hidden md:block h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <motion.div
          variants={variants.container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {problems.map((problem, index) => (
            <motion.div key={index} variants={variants.slideUp}>
              <GlowCard
                glowColor={problem.color}
                className="w-full h-full text-left"
                customSize={true}
              >
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-12 h-12 rounded-xl bg-surface/50 border border-border/10 flex items-center justify-center mb-6 text-text-secondary group-hover:text-primary transition-colors">
                    <problem.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 font-heading text-text-main">
                    {problem.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed text-lg flex-grow">
                    {problem.description}
                  </p>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Problem;
