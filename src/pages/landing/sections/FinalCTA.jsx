import React from "react";
import { motion } from "framer-motion";
import Button from "../../../components/ui/Button";
import { ArrowRight } from "lucide-react";
import { StripeGradientShader } from "../../../components/ui/StripeGradientShader";
import GlassActions from "../../../components/ui/glass-ui/GlassActions";

const FinalCTA = () => {
  return (<>
      <div className="absolute inset-0">
        <StripeGradientShader />
      </div>
    <section className="py-50 min-h-screen bg-transparent relative overflow-hidden">

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-9xl font-bold font-heading mb-20 tracking-tight text-text-main"
        >
          Stop Hiring Resumes.
          <br />
          <span className="text-text-main">Start Hiring Skills.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <GlassActions
            bounce
            text="Get Started Now"
            icon={<ArrowRight className="ml-2 w-5 h-5" />}
            variant="primary"
            size="lg"
            type="link"
            url="/"
            className="text-lg mb-10 px-8 py-4 w-70 h-20 transition-shadow duration-500 rounded-full mx-auto font-semibold"
          ></GlassActions>
          <p className="mt-6 text-text-secondary text-sm">
            No credit card required for candidates. Free trial for companies.
          </p>
        </motion.div>
      </div>
    </section>
  </>

  );
};

export default FinalCTA;
