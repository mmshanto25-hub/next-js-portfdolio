"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";
import { workflowSteps } from "@/data/services";
import { Search, Layout, Code2, Rocket, ArrowRight } from "lucide-react";

const stepIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Search,
  Layout,
  Code2,
  Rocket,
};

export function WorkflowSection() {
  return (
    <section className="py-24 sm:py-32 relative">
      <Container>
        <SectionHeading
          badge="Structured Methodology"
          badgeVariant="cyan"
          title="How I Work"
          subtitle="4-Stage Workflow"
          description="A clear, iterative process transforming initial concepts into robust, production-ready digital products."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 sm:mt-16">
          {workflowSteps.map((step, idx) => {
            const Icon = stepIcons[step.iconName] || Code2;

            return (
              <FadeIn key={step.number} direction="up" delay={idx * 0.12}>
                <div className="h-full p-6 sm:p-7 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-accent-cyan/40 hover:bg-white/[0.06] transition-all duration-300 relative group flex flex-col justify-between">
                  <div>
                    {/* Top Stage Indicator */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-3xl font-display font-extrabold text-white/20 group-hover:text-accent-cyan transition-colors">
                        {step.number}
                      </span>
                      <div className="p-3 rounded-xl bg-accent-cyan/10 text-accent-cyan group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white font-display mb-3">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6">
                      {step.description}
                    </p>
                  </div>

                  {/* Bullet points */}
                  <div className="pt-4 border-t border-white/[0.06]">
                    <ul className="space-y-2">
                      {step.details.map((detail, dIdx) => (
                        <li key={dIdx} className="text-xs text-slate-300 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan shrink-0 mt-1" />
                          <span className="leading-snug">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
