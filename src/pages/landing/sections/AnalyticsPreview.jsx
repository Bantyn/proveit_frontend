import React, { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Clock, Users, Activity } from "lucide-react";

const AnimatedValue = ({ value, suffix = "", duration = 2 }) => {
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

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

const AnalyticsPreview = () => {
  const stats = [
    { icon: Clock, value: 70, suffix: "%", label: "Faster Hiring Time" },
    { icon: Users, value: 3, suffix: "x", label: "Better Retention" },
    { icon: TrendingUp, value: 45, suffix: "%", label: "Cost Reduction" },
    { icon: Activity, value: 92, suffix: "%", label: "Candidate Success" },
  ];

  return (
    <section className="py-50 min-h-screen bg-transparent relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-text-main">
            Data that <span className="text-gradient">Proves It.</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Our skill-based approach doesn't just feel better—it performs
            better.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-10 rounded-[2.5rem] bg-surface text-center hover:bg-surface/80 transition-colors shadow-lg"
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-4xl font-bold text-text-main mb-2 font-heading">
                <AnimatedValue value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-text-secondary text-sm font-medium uppercase tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnalyticsPreview;
