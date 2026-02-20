import React from "react";
import { motion } from "framer-motion";
import {
  Code,
  Database,
  Globe,
  Layers,
  Layout,
  Server,
  Terminal,
  Cpu,
} from "lucide-react";
import GlassElement from "../../../components/ui/glass-ui/GlassElement";
import HyperTextDecryption from "../../../components/ui/HyperTextDecryption";

const skills = [
  { name: "React", icon: Code, color: "text-blue-400" },
  { name: "Node.js", icon: Server, color: "text-green-500" },
  { name: "Python", icon: Terminal, color: "text-yellow-400" },
  { name: "SQL", icon: Database, color: "text-purple-400" },
  { name: "DevOps", icon: Layers, color: "text-orange-400" },
  { name: "UI/UX", icon: Layout, color: "text-pink-400" },
  { name: "Go", icon: Globe, color: "text-cyan-400" },
  { name: "AI/ML", icon: Cpu, color: "text-red-400" },
];

const ForCandidates = () => {
  return (
    <section
      id="candidates"
      className="py-20 min-h-[50vh] bg-transparent relative "
    >
      <div className="flex justify-center mb-30 px-4">
        <HyperTextDecryption
          text="Provit For Candidates"
          highlightWords={["Candidates"]}
          className="text-5xl md:text-6xl font-bold text-center"
        />
      </div>
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px] [mask-image:radial-gradient(white,transparent_85%)] pointer-events-none" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
          {/* Floating Skills Animation */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 w-full grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {skills.map((skill, index) => (
              <motion.div
              key={index}
              animate={{
                y: [0, -10, 0],
              }}
              className="aspect-square rounded-[2rem] bg-white/15 shadow-md flex flex-col items-center justify-center "
              transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.2, // Stagger effect
                }}
              >
                <skill.icon className={`w-8 h-8 mb-3 ${skill.color}`} />
                <span className="text-text-secondary font-medium text-sm">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-text-main flex gap-5">
              Your Skills{" "}
              <span className="text-text-secondary text-5xl align-middle">  
                &gt;
              </span>{" "}
              <span className="text-text-main">Your Resume.</span>
            </h2>
            <p className="text-text-secondary text-lg mb-8 leading-relaxed">
              Don't let a PDF define your worth. Prove your expertise through
              real-world challenges and get hired for what you can actually
              build.
            </p>

            <ul className="space-y-4">
              {[
                "No degree required. Just code.",
                "Bias-free evaluation.",
                "Showcase your portfolio dynamically.",
              ].map((item, i) => (
                <span key={i} className="flex items-center gap-3 text-text-main">
                  <div className="w-10 h-10 rounded-full bg-red-300 flex items-center justify-center font-bold text-white">{i + 1}</div>
                  {item}
                </span>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ForCandidates;
