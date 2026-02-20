import React from "react";
import { motion } from "framer-motion";
import { Bot, Sparkles, Send, Code } from "lucide-react";
import Button from "../../../components/ui/Button";
import GlassActions from "../../../components/ui/glass-ui/GlassActions";
import HyperTextDecryption from "../../../components/ui/HyperTextDecryption";

const AISection = () => {
  return (
    <section className="py-25 min-h-screen bg-transparent overflow-hidden">
      <div className="flex justify-center mb-30 px-4">
        <HyperTextDecryption
          text="Try our new feature"
          highlightWords={["feature"]}
          className="text-5xl md:text-6xl font-bold text-center text-text-main"
        />
      </div>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Chat UI Mockup */}
          <div className="flex-1 w-full max-w-lg mx-auto">
            <div className="bg-surface rounded-[2.5rem] overflow-hidden shadow-2xl">
              {/* Chat Header */}
              <div className="bg-surface/50 p-4 flex items-center gap-3 backdrop-blur-sm">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-text-main text-sm">
                    ProveIt AI Coach
                  </h4>
                  <p className="text-xs text-green-500 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />{" "}
                    Online
                  </p>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="p-6 space-y-4 h-80 overflow-y-auto bg-muted/30">
                {/* Message 1 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center mt-1">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-surface p-3 rounded-2xl rounded-tl-none text-sm text-text-secondary shadow-sm max-w-[85%]">
                    Your React solution is solid, but you could optimize the
                    rendering performance by using useMemo on the expensive
                    calculation.
                  </div>
                </motion.div>

                {/* Message 2 */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="flex gap-3 flex-row-reverse"
                >
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex-shrink-0 flex items-center justify-center mt-1">
                    <span className="text-xs font-bold text-purple-500">
                      ME
                    </span>
                  </div>
                  <div className="bg-primary text-white p-3 rounded-2xl rounded-tr-none text-sm max-w-[85%] shadow-lg shadow-primary/20">
                    Good catch! I'll refactor that. How does the accessibility
                    score look?
                  </div>
                </motion.div>

                {/* Message 3 (Typing) */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.5 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center mt-1">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-surface p-4 rounded-2xl rounded-tl-none flex gap-1 items-center shadow-sm">
                    <span className="w-1.5 h-1.5 bg-text-secondary rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-text-secondary rounded-full animate-bounce delay-100" />
                    <span className="w-1.5 h-1.5 bg-text-secondary rounded-full animate-bounce delay-200" />
                  </div>
                </motion.div>
              </div>

              {/* Chat Input */}
              <div className="p-4 bg-surface/50 backdrop-blur-md">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 bg-muted/50 rounded-xl px-4 py-2 text-sm text-text-main placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    disabled
                  />
                  <button className="p-2 rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-text-main">
              Your Personal <br />
              <span className="text-gradient-subtle">Career AI.</span>
            </h2>
            <p className="text-text-secondary text-lg mb-8 leading-relaxed">
              Get instant feedback on your code, practice interview questions,
              and optimize your profile. It's like having a senior engineer
              mentor 24/7.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                "Real-time code improvements",
                "Mock technical interviews",
                "Resume parsing & enhancement",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-text-main">
                  <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
                    {i + 1}
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <GlassActions
              bounce
              text="Try AI Assistant"
              icon={<Code className="ml-2 w-5 h-5" />}
              variant="primary"
              size="lg"
              type="link"
              url="/ai-assistant"
              className="text-lg mb-10 px-8 py-2 w-70 h-20 transition-shadow duration-500 rounded-full mx-auto font-semibold relative z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AISection;
