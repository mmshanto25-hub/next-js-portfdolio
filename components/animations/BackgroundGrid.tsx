"use client";

import React from "react";

export function BackgroundGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none">
      {/* Base Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      {/* Top Primary Radial Glow */}
      <div
        className="absolute -top-[25%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[130px] opacity-25 animate-pulse-glow"
        style={{
          background: "radial-gradient(circle, #3B82F6 0%, #06B6D4 50%, transparent 70%)",
        }}
      />

      {/* Secondary Ambient Accent Glow - Left */}
      <div
        className="absolute top-[35%] -left-[15%] w-[600px] h-[600px] rounded-full blur-[140px] opacity-15"
        style={{
          background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)",
        }}
      />

      {/* Accent Glow - Right */}
      <div
        className="absolute top-[65%] -right-[15%] w-[600px] h-[600px] rounded-full blur-[140px] opacity-15"
        style={{
          background: "radial-gradient(circle, #06B6D4 0%, transparent 70%)",
        }}
      />

      {/* Bottom Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
    </div>
  );
}
