import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Search, Shield, Zap } from "lucide-react";
import HyperTextDecryption from "../../../components/ui/HyperTextDecryption";

const features = [
  { icon: Search, text: "AI-Powered Ranking" },
  { icon: Shield, text: "Plagiarism Detection" },
  { icon: CheckCircle, text: "Skill-Based Evaluation" },
  { icon: Zap, text: "70% Faster Hiring" },
];

const ForCompanies = () => {
  return (
    <section
      id="companies"
      className="min-h-[50vh] bg-transparent relative"
    >


      <div className="flex justify-center mb-30 px-4">
              <HyperTextDecryption
                text="Provit For Companies"
                highlightWords={["Companies"]}
                className="text-5xl md:text-6xl font-bold text-center"
              />
            </div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-text-main">
              Hire with <span className="text-gradient">Confidence.</span>
            </h2>
            <p className="text-text-secondary text-lg mb-8 leading-relaxed">
              Stop sifting through hundreds of irrelevant resumes. Our platform
              automatically ranks candidates based on their actual code, not
              their claims.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-text-secondary font-medium">
                    {feature.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 w-full"
          >
            <div className="relative rounded-[2rem] bg-background p-4 shadow-xl overflow-hidden glass-card transition-colors duration-300">
              {/* Mockup Header */}
              <div className="flex items-center gap-4 mb-6 border-b border-[var(--color-border)] pb-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[rgba(239,68,68,0.5)]" />
                  <div className="w-3 h-3 rounded-full bg-[rgba(234,179,8,0.5)]" />
                  <div className="w-3 h-3 rounded-full bg-[rgba(34,197,94,0.5)]" />
                </div>
                <div className="h-4 w-32 bg-muted rounded-full" />
              </div>

              {/* Mockup Content - Ranking List */}
              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between p-3 rounded-xl
          bg-background/60 border border-[var(--color-border)]
          transition-colors duration-300 dark:bg-white/20 bg-black/20"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary" />
                      <div className="space-y-1">
                        <div className="h-3 w-24 bg-muted rounded-full" />
                        <div className="h-2 w-16 bg-muted/60 rounded-full" />
                      </div>
                    </div>

                    <div className="text-right">
                      <div
                        className="
              px-2 py-1 rounded text-xs font-semibold
              bg-[rgba(34,197,94,0.15)]
              text-[rgb(34,197,94)]
            "
                      >
                        {98 - item * 2}%
                      </div>
                    </div>
                  </div>
                ))}

                {/* Placeholder Row */}
                <div
                  className="flex items-center justify-between p-3 rounded-xl
        bg-background/40 border border-[var(--color-border)] opacity-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted" />
                    <div className="space-y-1">
                      <div className="h-3 w-24 bg-muted rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Glow Effect */}
              <div
                className="absolute -top-20 -right-20 w-60 h-60
      bg-primary/20 rounded-full blur-[80px]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ForCompanies;
