"use client";

import React from "react";
import { marqueeTechnologies } from "@/data/skills";
import { Sparkles } from "lucide-react";

export function TechMarquee() {
  // Double list to create seamless loop
  const displayItems = [...marqueeTechnologies, ...marqueeTechnologies];

  return (
    <section className="py-12 border-y border-white/[0.06] bg-[#050816]/60 backdrop-blur-md relative overflow-hidden">
      {/* Subtle edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-r from-[#050816] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-l from-[#050816] to-transparent z-10 pointer-events-none" />

      {/* Marquee Wrapper with group for hover pause */}
      <div className="flex w-max items-center animate-marquee hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] select-none">
        {displayItems.map((tech, index) => (
          <div
            key={`${tech}-${index}`}
            className="flex items-center gap-3 px-6 py-2 mx-2 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-accent-blue/40 hover:bg-white/[0.06] transition-all cursor-default"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
            <span className="text-sm sm:text-base font-medium text-text-secondary hover:text-white whitespace-nowrap tracking-wide">
              {tech}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
