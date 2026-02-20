import React from "react";
import { motion } from "framer-motion";
import { TestimonialsColumn } from "../../../components/ui/TestimonialsColumn";

const testimonials = [
  {
    text: "This platform revolutionized our hiring process. The code analysis is spot on and saves us countless hours.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Sarah Jenkins",
    role: "CTO, TechFlow",
  },
  {
    text: "Finally, a way to hire based on actual skills rather than just a resume. We found our lead dev here.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Michael Chen",
    role: "VP Engineering, Stack",
  },
  {
    text: "The candidate ranking system is incredibly accurate. It removed so much bias from our initial screening.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Emily Davis",
    role: "Head of People, Bloom",
  },
  {
    text: "I love the project-based assessments. They feel like real work, not abstract algorithm puzzles.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "David Wilson",
    role: "Senior React Dev",
  },
  {
    text: "ProveIt helped me showcase my abilities even without a CS degree. Landed my dream job in 2 weeks.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Lisa Park",
    role: "Frontend Engineer",
  },
  {
    text: "Simple, effective, and fair. This is exactly what the tech hiring industry needed.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "James Rodriguez",
    role: "Engineering Manager",
  },
  {
    text: "We've reduced our time-to-hire by 60% since switching to ProveIt. The ROI is undeniable.",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Anna Smith",
    role: "Director of Talent",
  },
  {
    text: "The automated feedback is great for candidates. Even if they don't get the job, they learn something.",
    image:
      "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Robert Taylor",
    role: "Lead Recruiter",
  },
  {
    text: "High quality candidates, zero fluff. ProveIt filters out the noise so we can focus on talent.",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Jessica Lee",
    role: "Founder, StartUp",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const Testimonials = () => {
  return (
    <section className="py-50 min-h-screen relative overflow-hidden">
      <div className="relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto text-center mb-16"
        >
          <span className="text-primary font-medium tracking-wider uppercase text-sm mb-4 block">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-text-main">
            What our users say
          </h2>
          <p className="text-lg text-text-secondary">
            See what our customers have to say about us.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
