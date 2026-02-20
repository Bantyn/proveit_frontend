import React from "react";
import AuthDemo from "@/components/ui/AuthDemo";

/**
 * AuthPage - Renders the custom Sliding Auth Component.
 * The previous gradient background is removed as the component handles its own layout/bg.
 */
export default function AuthPage() {
  return (
    <div className="min-h-screen w-full">
      <AuthDemo />
    </div>
  );
}
