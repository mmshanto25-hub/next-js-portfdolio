"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { Code2, Layers, Palette, GraduationCap, ArrowRight } from "lucide-react";
import Link from "next/link";

const statsCards = [
  {
    icon: Code2,
    stat: "25+",
    title: "Frontend Projects",
    description: "Responsive, component-driven web applications built with modern React & Next.js.",
    accent: "text-accent-blue",
    border: "hover:border-blue-500/40",
  },
  {
    icon: Layers,
    stat: "Full-Stack",
    title: "Development",
    description: "End-to-end integration connecting robust Node.js / Express backends with MongoDB & SQL.",
    accent: "text-accent-cyan",
    border: "hover:border-cyan-500/40",
  },
  {
    icon: Palette,
    stat: "UI/UX",
    title: "Design",
    description: "Interface architecture in Figma translated 1:1 into accessible, fluid Tailwind layouts.",
    accent: "text-accent-purple",
    border: "hover:border-purple-500/40",
  },
  {
    icon: GraduationCap,
    stat: "CSE",
    title: "Background",
    description: "B.Sc. in Computer Science & Engineering (2022–2026) at Gono Bishwabidyalay.",
    accent: "text-emerald-400",
    border: "hover:border-emerald-500/40",
  },
];

export function HomeIntroduction() {
  return (
    <section className="py-24 sm:py-32 relative">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading and Story */}
          <div className="lg:col-span-6">
            <FadeIn direction="right">
              <span className="text-accent-blue font-mono text-xs sm:text-sm uppercase tracking-wider mb-3 inline-block">
                Introduction
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight leading-[1.15]">
                I build interfaces that connect{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-accent-cyan to-accent-purple">
                  design, technology
                </span>{" "}
                and people.
              </h2>

              <div className="mt-6 space-y-4 text-text-secondary text-base sm:text-lg leading-relaxed">
                <p>
                  I&apos;m Meskatul Masabhi Shanto, a passionate Full-Stack Web Developer and UI/UX Designer completing my Computer Science &amp; Engineering degree at Gono Bishwabidyalay.
                </p>
                <p>
                  My engineering journey thrives at the intersection of aesthetic precision and clean software architecture. Over the course of building more than 25+ frontend projects, I have cultivated a disciplined approach to creating fast, accessible, and intuitive digital interfaces with React, Next.js, and TypeScript.
                </p>
                <p>
                  Beyond interface engineering, I construct end-to-end full-stack systems using Node.js, Express, and structured databases like MongoDB and PostgreSQL. I also maintain keen interests in workflow automation, API integration, and user-centric ergonomics.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-4">
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-accent-blue transition-colors"
                >
                  <span>Learn more about my background</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Key Statistics & Specialization Cards */}
          <div className="lg:col-span-6">
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {statsCards.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <StaggerItem key={idx}>
                    <div
                      className={`p-6 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/[0.08] transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.06] ${card.border}`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white">
                          <Icon className="w-5 h-5 text-accent-blue" />
                        </div>
                        <span className={`text-2xl font-display font-extrabold tracking-tight ${card.accent}`}>
                          {card.stat}
                        </span>
                      </div>
                      <h3 className="text-base font-semibold text-white mb-2">
                        {card.title}
                      </h3>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </div>
      </Container>
    </section>
  );
}
