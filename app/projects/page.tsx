import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ProjectsArchive } from "@/components/projects/ProjectsArchive";

export const metadata: Metadata = {
  title: "Projects & Engineering Works",
  description:
    "Explore the complete project archive of Meskatul Masabhi Shanto featuring full-stack applications, UI/UX design systems, developer utilities, and web experiments.",
};

export default function ProjectsPage() {
  return (
    <div className="py-16 sm:py-24">
      <Container>
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="text-accent-blue font-mono text-xs sm:text-sm uppercase tracking-wider mb-3 inline-block">
            Engineering Archive
          </span>
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.1]">
            Featured Projects &amp; Case Studies
          </h1>
          <p className="mt-5 text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
            A comprehensive catalog of software applications, design systems, and web tools built with Next.js, React, Node.js, and TypeScript.
          </p>
        </div>

        {/* Projects Archive Interactive Component */}
        <ProjectsArchive />
      </Container>
    </div>
  );
}
