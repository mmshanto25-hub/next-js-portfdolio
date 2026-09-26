"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { ArrowRight, CheckCircle2, Sparkles, GraduationCap } from "lucide-react";
import { personalInfo } from "@/data/social";
import { assetPath } from "@/lib/utils";

export function AboutPreviewSection() {
  return (
    <section className="py-24 sm:py-32 relative bg-[#040714] border-t border-white/[0.06]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Editorial Photo / Graphic Column */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <FadeIn direction="right">
              <div className="relative mx-auto max-w-md aspect-square rounded-3xl overflow-hidden p-1 bg-gradient-to-br from-accent-blue/30 via-accent-cyan/20 to-accent-purple/30">
                <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-[#0A0F1D] flex items-center justify-center p-6 border border-white/10">
                  <Image
                    src={assetPath("/images/shanto-avatar.svg")}
                    alt={personalInfo.name}
                    width={400}
                    height={400}
                    className="w-full h-auto object-contain transition-transform duration-500 hover:scale-105"
                  />
                  
                  {/* Floating education pill */}
                  <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-[#050816]/90 backdrop-blur-md border border-white/10 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-accent-blue/20 text-accent-cyan">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <p className="text-[11px] font-mono text-text-muted">B.Sc. in CSE (2022–2026)</p>
                      <p className="text-xs font-semibold text-white">Gono Bishwabidyalay</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Typography & Editorial Story Column */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <FadeIn direction="left">
              <span className="text-accent-cyan font-mono text-xs sm:text-sm uppercase tracking-wider mb-4 inline-block">
                Philosophy &amp; Background
              </span>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-[1.12]">
                A developer who cares about{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-accent-cyan to-accent-purple">
                  both code and design.
                </span>
              </h2>

              <p className="mt-6 text-base sm:text-lg text-text-secondary leading-relaxed">
                I believe modern software shouldn&apos;t force users to compromise between functional speed and aesthetic elegance. Great digital products exist where solid computer science logic meets thoughtful visual hierarchy.
              </p>

              <p className="mt-4 text-sm sm:text-base text-text-muted leading-relaxed">
                As a Computer Science &amp; Engineering student at Gono Bishwabidyalay, I bring academic grounding in algorithms and database systems, paired with the practical agility of having coded 25+ frontend web applications.
              </p>

              {/* Working Values */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  "Clean, modular, and maintainable code",
                  "Accessible and responsive by default",
                  "Performance-focused Core Web Vitals",
                  "Continuous learning and project-driven growth",
                ].map((point, index) => (
                  <div key={index} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-accent-cyan shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="mt-10 pt-6 border-t border-white/[0.08]">
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-accent-blue transition-colors"
                >
                  <span>Read My Story</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-accent-blue" />
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  );
}
