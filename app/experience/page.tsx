import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { experiences, experiencePhilosophy } from "@/data/experience";
import {
  Calendar,
  MapPin,
  Briefcase,
  GraduationCap,
  Code2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  BookOpen,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Experience & Timeline",
  description:
    "Professional trajectory, hands-on independent project history (25+ frontend projects), digital marketing tenure at Tahmid IT Park, and Computer Science education at Gono Bishwabidyalay.",
};

const experienceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Independent Development": Code2,
  "Work Experience": Briefcase,
  Education: GraduationCap,
};

export default function ExperiencePage() {
  return (
    <div className="py-16 sm:py-24">
      <Container>
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 sm:mb-20">
          <span className="text-accent-purple font-mono text-xs sm:text-sm uppercase tracking-wider mb-3 inline-block">
            Career &amp; Practice
          </span>
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.1]">
            Experience &amp; Timeline
          </h1>
          <p className="mt-5 text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
            A comprehensive record of hands-on software development, professional digital marketing tenure, and academic computer science engineering.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="max-w-4xl mx-auto relative mb-24 sm:mb-32">
          {/* Continuous vertical line */}
          <div className="absolute left-4 sm:left-8 top-6 bottom-6 w-px bg-white/10" />

          <div className="space-y-12 sm:space-y-16">
            {experiences.map((item, idx) => {
              const Icon = experienceIcons[item.type] || Briefcase;

              return (
                <FadeIn key={item.id} direction="up" delay={idx * 0.1}>
                  <div className="relative pl-12 sm:pl-20">
                    {/* Timeline Node */}
                    <div className="absolute left-4 sm:left-8 top-1.5 -translate-x-1/2 w-8 h-8 rounded-full bg-[#050816] border-2 border-accent-blue flex items-center justify-center z-10 shadow-lg shadow-blue-500/20">
                      <div className="w-2.5 h-2.5 rounded-full bg-accent-cyan animate-pulse" />
                    </div>

                    {/* Card container */}
                    <GlassCard padding="lg" variant="interactive">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-white/[0.06]">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="blue" size="sm">
                              {item.type}
                            </Badge>
                          </div>
                          <h2 className="text-2xl font-bold text-white font-display">
                            {item.role}
                          </h2>
                          <div className="flex flex-wrap items-center gap-2 mt-1 text-sm font-medium text-accent-cyan">
                            <span>{item.organization}</span>
                            <span className="text-text-muted">&bull;</span>
                            <span className="text-text-muted flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" />
                              {item.location}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs font-mono text-text-muted px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit sm:self-start">
                          <Calendar className="w-3.5 h-3.5 text-accent-cyan" />
                          <span>{item.period}</span>
                        </div>
                      </div>

                      {/* Summary */}
                      <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-6">
                        {item.summary}
                      </p>

                      {/* Responsibilities / Highlights */}
                      <div className="mb-6">
                        <h3 className="text-xs font-mono uppercase tracking-wider text-text-muted mb-3">
                          Key Responsibilities &amp; Outcomes:
                        </h3>
                        <ul className="space-y-2.5">
                          {item.highlights.map((highlight, hIdx) => (
                            <li
                              key={hIdx}
                              className="text-xs sm:text-sm text-slate-300 flex items-start gap-2.5"
                            >
                              <CheckCircle2 className="w-4 h-4 text-accent-blue shrink-0 mt-0.5" />
                              <span className="leading-snug">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies used */}
                      <div className="pt-4 border-t border-white/[0.06]">
                        <p className="text-[11px] font-mono text-text-muted mb-2">
                          Domain &amp; Stack:
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {item.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 text-xs font-mono rounded-lg bg-white/5 border border-white/10 text-slate-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </GlassCard>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>

        {/* Experience Philosophy Section */}
        <div className="max-w-4xl mx-auto rounded-3xl p-8 sm:p-12 bg-white/[0.02] border border-white/[0.08]">
          <SectionHeading
            badge="Learning Model"
            badgeVariant="cyan"
            title={experiencePhilosophy.title}
            subtitle={experiencePhilosophy.subtitle}
            description={experiencePhilosophy.description}
            align="left"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-white/[0.08]">
            {experiencePhilosophy.principles.map((p, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <h3 className="text-base font-bold text-white font-display mb-2">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-white">Interested in working together?</h4>
              <p className="text-xs text-text-muted">Available for freelance, software development, and frontend roles.</p>
            </div>
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-xl bg-accent-blue hover:bg-blue-600 text-white text-xs font-semibold inline-flex items-center gap-2 transition-colors"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
