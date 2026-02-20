import React from "react";
import AuthSwitch from "./AuthSwitch";

/**
 * AuthDemo
 * Now serves as a full-page wrapper for the complex AuthSwitch component.
 */
export default function AuthDemo() {
  return (
    <div className="w-full min-h-screen bg-slate-100 flex items-center justify-center">
      <AuthSwitch />
    </div>
  );
}
