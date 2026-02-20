import React from "react";
import Navbar from "../../components/layout/Navbar";
import ThemeToggle from "../../components/shared/ThemeToggle";
import { motion } from "framer-motion";
import { variants } from "../../config/motion.config";

const Settings = () => {
  return (
    <div className="min-h-screen bg-background text-text-main font-sans">
      <Navbar />
      <main className="pt-32 container mx-auto px-4 max-w-2xl">
        <motion.div
          variants={variants.slideUp}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-3xl font-bold font-heading mb-8">Settings</h1>

          <section className="space-y-6">
            <div className="p-6 rounded-2xl bg-surface/50 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Appearance</h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Theme Preference</p>
                  <p className="text-sm text-text-secondary">
                    Switch between dark and light mode.
                  </p>
                </div>
                <ThemeToggle />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-surface/50 shadow-sm opacity-50 pointer-events-none">
              <h2 className="text-xl font-semibold mb-4">Account</h2>
              <p className="text-sm text-text-secondary">
                Account settings are not available in this demo.
              </p>
            </div>
          </section>
        </motion.div>
      </main>
    </div>
  );
};

export default Settings;
