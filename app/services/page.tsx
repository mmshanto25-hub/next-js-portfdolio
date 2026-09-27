import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";
import { GlassCard } from "@/components/ui/GlassCard";
import { services, workflowSteps } from "@/data/services";
import {
  Monitor,
  Layers,
  Globe2,
  Zap,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { Figma } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Services & Technical Solutions",
  description:
    "Comprehensive web development services by Meskatul Masabhi Shanto: Frontend Development, Full-Stack Applications, UI/UX Design, Website Development, and API Integration.",
};

const serviceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Monitor,
  Layers,
  Figma,
  Globe2,
  Zap,
};

export default function ServicesPage() {
  return (
    <div className="py-16 sm:py-24">
      <Container>
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 sm:mb-24">
          <span className="text-accent-blue font-mono text-xs sm:text-sm uppercase tracking-wider mb-3 inline-block">
            Offerings &amp; Systems
          </span>
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.1]">
            Comprehensive Web Development Services
          </h1>
          <p className="mt-5 text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
            High-standard engineering solutions combining frontend aesthetic precision, resilient backend logic, and user-centered design systems.
          </p>
        </div>

        {/* 5 Dedicated Large Service Sections */}
        <div className="space-y-16 sm:space-y-24 mb-24 sm:mb-32">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.iconName] || Monitor;

            return (
              <FadeIn key={service.id} direction="up" delay={0.1}>
                <section
                  id={service.slug}
                  className="p-8 sm:p-12 lg:p-14 rounded-3xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.14] transition-all relative overflow-hidden"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    {/* Header & Overview */}
                    <div className="lg:col-span-6 space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-accent-blue">
                          <Icon className="w-7 h-7" />
                        </div>
                        <div>
                          <span className="text-xs font-mono font-bold text-accent-cyan">
                            SERVICE // {service.number}
                          </span>
                          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
                            {service.title}
                          </h2>
                        </div>
                      </div>

                      <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
                        {service.longDescription}
                      </p>

                      {/* Deliverables */}
                      <div className="pt-2">
                        <h3 className="text-xs font-mono uppercase tracking-wider text-text-muted mb-3">
                          What is Delivered:
                        </h3>
                        <ul className="space-y-2.5">
                          {service.deliverables.map((item, dIdx) => (
                            <li
                              key={dIdx}
                              className="text-xs sm:text-sm text-slate-300 flex items-start gap-2.5"
                            >
                              <CheckCircle2 className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5" />
                              <span className="leading-snug">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech stack */}
                      <div className="pt-2">
                        <p className="text-xs font-mono text-text-muted mb-2">Technologies Used:</p>
                        <div className="flex flex-wrap gap-1.5">
                          {service.technologies.map((t) => (
                            <span
                              key={t}
                              className="px-2.5 py-1 text-xs font-mono rounded bg-white/5 border border-white/10 text-slate-200"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Architectural Pillars / Key Aspects */}
                    <div className="lg:col-span-6 space-y-4">
                      <h3 className="text-sm font-mono uppercase tracking-wider text-text-muted mb-4">
                        Technical Pillars &amp; Standards:
                      </h3>
                      {service.keyAspects.map((aspect, aIdx) => (
                        <div
                          key={aIdx}
                          className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] transition-colors"
                        >
                          <h4 className="text-base font-bold text-white font-display mb-1.5 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
                            <span>{aspect.title}</span>
                          </h4>
                          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                            {aspect.description}
                          </p>
                        </div>
                      ))}

                      <div className="pt-4">
                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-blue/15 hover:bg-accent-blue/25 border border-accent-blue/30 text-accent-cyan text-xs font-semibold transition-colors"
                        >
                          <span>Discuss {service.title}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </section>
              </FadeIn>
            );
          })}
        </div>

        {/* Workflow reminder */}
        <div className="mb-24 sm:mb-32">
          <SectionHeading
            badge="Process Alignment"
            badgeVariant="cyan"
            title="The Execution Process"
            subtitle="Predictable Delivery"
            description="Every service engagement follows our proven 4-stage pipeline."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((step) => (
              <div
                key={step.number}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]"
              >
                <span className="text-2xl font-display font-extrabold text-white/20 mb-2 block">
                  {step.number}
                </span>
                <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Discuss Your Project CTA */}
        <div className="rounded-3xl p-8 sm:p-14 bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/10 text-center max-w-3xl mx-auto shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
            Have a project requirement in mind?
          </h2>
          <p className="text-text-secondary text-sm sm:text-base max-w-lg mx-auto mb-8">
            Whether you need a modern Next.js frontend, an accessible Figma design system, or a complete full-stack web application, let&apos;s build it together.
          </p>
          <Link
            href="/contact"
            className="px-8 py-4 text-sm font-semibold text-white bg-accent-blue hover:bg-blue-600 rounded-xl transition-all shadow-lg shadow-blue-500/25 inline-flex items-center gap-2"
          >
            <span>Discuss Your Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </div>
  );
}
