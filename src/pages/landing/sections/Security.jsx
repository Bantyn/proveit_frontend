import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileCheck } from "lucide-react";
import { BentoGrid, BentoCard } from "../../../components/ui/BentoGrid";

const features = [
  {
    Icon: Shield,
    name: "Enterprise-Grade Security",
    description:
      "SOC2 Type II compliant infrastructure with end-to-end encryption for all candidate data.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 md:col-span-2",
    background: (
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-primary/5 to-transparent opacity-50" />
    ),
  },
  {
    Icon: Lock,
    name: "GDPR & CCPA Ready",
    description:
      "Built-in compliance tools to manage data retention and candidate privacy rights automatically.",
    href: "#",
    cta: "View compliance",
    className: "col-span-3 md:col-span-1",
    background: (
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-secondary/5 to-transparent opacity-50" />
    ),
  },
  {
    Icon: Eye,
    name: "Anti-Cheating System",
    description:
      "Advanced proctoring heuristics detect plagiarism and AI-generated code patterns in real-time.",
    href: "#",
    cta: "See how it works",
    className: "col-span-3 md:col-span-1",
    background: (
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tr from-accent/5 to-transparent opacity-50" />
    ),
  },
  {
    Icon: FileCheck,
    name: "Vendor Risk Management",
    description:
      "Comprehensive third-party risk assessment and automated security questionnaire handling.",
    href: "#",
    cta: "Download report",
    className: "col-span-3 md:col-span-2",
    background: (
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tl from-green-500/5 to-transparent opacity-50" />
    ),
  },
];

const Security = () => {
  return (
    <section className="py-24 bg-transparent  relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold font-heading mb-6 text-text-main"
          >
            Uncompromised <span className="text-text-secondary">Security.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-text-secondary max-w-2xl"
          >
            We take security seriously. ProveIt is built with enterprise
            standards to ensure your hiring data remains safe, private, and
            compliant.
          </motion.p>
        </div>

        <BentoGrid>
          {features.map((feature, idx) => (
            <BentoCard key={idx} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
};

export default Security;
