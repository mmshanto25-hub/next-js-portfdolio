"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";
import { experiences } from "@/data/experience";
import { ArrowRight, Briefcase, Calendar, MapPin, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function ExperiencePreviewSection() {
  // Select work & independent project experiences
  const timelineItems = experiences.slice(0, 2);

  return (
    <section className="py-24 sm:py-32 relative">
      <Container>
        <SectionHeading
          badge="Career & Practice"
          badgeVariant="purple"
          title="Practical Experience"
          subtitle="Timeline"
          description="A track record of consistent hands-on building, practical marketing insight, and engineering discipline."
        />

        {/* Timeline wrapper */}
        <div className="max-w-4xl mx-auto relative mt-12 sm:mt-16">
          {/* Vertical line */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-px bg-white/10 -translate-x-1/2" />

          <div className="space-y-12">
            {timelineItems.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <FadeIn key={item.id} direction="up" duration={0.5}>
                  <div
                    className={`relative flex flex-col sm:flex-row items-start ${
                      isEven ? "sm:flex-row-reverse" : ""
                    } gap-6 sm:gap-12`}
                  >
                    {/* Center Node Indicator */}
                    <div className="absolute left-4 sm:left-1/2 top-6 -translate-x-1/2 w-8 h-8 rounded-full bg-[#050816] border-2 border-accent-blue flex items-center justify-center z-10 shadow-lg shadow-blue-500/20">
                      <div className="w-2.5 h-2.5 rounded-full bg-accent-cyan animate-pulse" />
                    </div>

                    {/* Content Card */}
                    <div
                      className={`ml-12 sm:ml-0 sm:w-1/2 ${
                        isEven ? "sm:pl-10" : "sm:pr-10 sm:text-right"
                      }`}
                    >
                      <div className="p-6 sm:p-7 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.16] hover:bg-white/[0.05] transition-all duration-300">
                        <div
                          className={`flex flex-wrap items-center gap-2 mb-2 ${
                            isEven ? "justify-start" : "sm:justify-end justify-start"
                          }`}
                        >
                          <Badge variant="blue" size="sm">
                            {item.type}
                          </Badge>
                          <span className="text-xs font-mono text-accent-cyan flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {item.period}
                          </span>
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold text-white font-display">
                          {item.role}
                        </h3>

                        <p className="text-xs sm:text-sm font-medium text-text-muted mt-0.5 mb-3 flex items-center gap-1.5 justify-start">
                          <Briefcase className="w-3.5 h-3.5 text-accent-purple" />
                          <span>{item.organization}</span>
                          <span>&bull;</span>
                          <span className="text-slate-400">{item.location}</span>
                        </p>

                        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed text-left">
                          {item.summary}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.06] justify-start">
                          {item.technologies.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>

        {/* View Full Experience CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/experience"
            className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-white text-sm font-medium transition-all"
          >
            <span>View Full Experience &amp; Philosophy</span>
            <ArrowRight className="w-4 h-4 text-accent-purple transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
