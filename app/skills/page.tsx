import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillsDashboard } from "@/components/skills/SkillsDashboard";

export const metadata: Metadata = {
  title: "Skills & Technology Matrix",
  description:
    "Interactive technology dashboard for Meskatul Masabhi Shanto covering Frontend (React, Next.js, TypeScript), Backend (Node.js, Express), Databases, and Tools.",
};

export default function SkillsPage() {
  return (
    <div className="py-16 sm:py-24">
      <Container>
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="text-accent-cyan font-mono text-xs sm:text-sm uppercase tracking-wider mb-3 inline-block">
            Competencies &amp; Stack
          </span>
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.1]">
            Skills &amp; Technology Matrix
          </h1>
          <p className="mt-5 text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
            An interactive directory of tools, frameworks, and programming paradigms mastered through academic computer science and building over 25+ frontend projects.
          </p>
        </div>

        {/* Interactive Skills Dashboard */}
        <SkillsDashboard />
      </Container>
    </div>
  );
}
