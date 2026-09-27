"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";
import { skills } from "@/data/skills";
import { ArrowRight, Code2, Server, Terminal, Wrench, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const previewCategories = [
  { id: "Frontend", label: "Frontend", icon: Code2 },
  { id: "Backend", label: "Backend & Data", icon: Server },
  { id: "Programming", label: "Programming", icon: Terminal },
  { id: "Tools", label: "Tools & Other", icon: Wrench },
] as const;

export function SkillsPreviewSection() {
  const [activeCategory, setActiveCategory] = useState<string>("Frontend");

  const filteredSkills = skills.filter((s) => {
    if (activeCategory === "Frontend") return s.category === "Frontend";
    if (activeCategory === "Backend & Data")
      return s.category === "Backend" || s.category === "Database";
    if (activeCategory === "Programming") return s.category === "Programming";
    return s.category === "Tools" || s.category === "Design" || s.category === "Other";
  });

  return (
    <section className="py-24 sm:py-32 relative bg-[#040714]">
      <Container>
        <SectionHeading
          badge="Technical Core"
          badgeVariant="cyan"
          title="Skills & Technologies"
          subtitle="Engineering Foundation"
          description="A comprehensive toolkit built through hands-on development across 25+ frontend projects and Computer Science & Engineering coursework."
        />

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {previewCategories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 border",
                  isActive
                    ? "bg-accent-blue/15 text-white border-accent-blue/40 shadow-lg shadow-blue-500/10"
                    : "bg-white/[0.02] text-text-secondary border-white/[0.06] hover:bg-white/[0.05] hover:text-white"
                )}
              >
                <Icon className={cn("w-4 h-4", isActive ? "text-accent-cyan" : "text-text-muted")} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSkills.map((skill) => (
            <FadeIn key={skill.name} direction="up" duration={0.4}>
              <div className="h-full p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.18] hover:bg-white/[0.05] transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-base font-bold text-white font-display group-hover:text-accent-blue transition-colors">
                      {skill.name}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-text-muted">
                      {skill.category}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed mb-4">
                    {skill.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.06]">
                  <p className="text-[11px] font-mono text-text-muted mb-1.5">Related Stack:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.relatedTechnologies.map((rel) => (
                      <span
                        key={rel}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.05] text-slate-300"
                      >
                        {rel}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Explore All Skills CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/skills"
            className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-white text-sm font-medium transition-all"
          >
            <span>Explore All Skills &amp; Technology Matrix</span>
            <ArrowRight className="w-4 h-4 text-accent-cyan transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
