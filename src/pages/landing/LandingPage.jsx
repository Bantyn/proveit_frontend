import React from "react";
import Hero from "./sections/Hero";
import Problem from "./sections/Problem";
import Solution from "./sections/Solution";
import ForCompanies from "./sections/ForCompanies";
import ForCandidates from "./sections/ForCandidates";
import RankingEngine from "./sections/RankingEngine";
import AISection from "./sections/AISection";
import Testimonials from "./sections/Testimonials";
import AnalyticsPreview from "./sections/AnalyticsPreview";
import Security from "./sections/Security";
import FinalCTA from "./sections/FinalCTA";

const LandingPage = () => {
  return (
    <>
      <div className="min-h-screen text-text-main font-sans selection:bg-primary/30">
        <div className="relative min-h-screen overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none
                      [background-image:linear-gradient(to_right,var(--color-border)_1px,transparent_1px),
                      linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)]
                      bg-[size:40px_40px]"
          />
          <div className="relative z-10">
            <main>
              <Hero />
              <Problem />
              <Solution />
              <ForCompanies />
              <ForCandidates />
              {/* <RankingEngine /> */}
              <AISection />
              <Testimonials />
              <AnalyticsPreview />
              <Security />
              <FinalCTA />
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
