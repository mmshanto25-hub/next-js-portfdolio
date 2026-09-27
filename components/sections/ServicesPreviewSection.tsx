"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";
import { services } from "@/data/services";
import { ArrowRight, Monitor, Layers, Globe2, Zap } from "lucide-react";
import { Figma } from "@/components/ui/Icons";

const serviceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Monitor,
  Layers,
  Figma,
  Globe2,
  Zap,
};

export function ServicesPreviewSection() {
  return (
    <section className="py-24 sm:py-32 relative bg-[#040714]">
      <Container>
        <SectionHeading
          badge="Specialized Capabilities"
          badgeVariant="blue"
          title="Services & Solutions"
          subtitle="What I Deliver"
          description="High-standard development and interface design services for modern web products, business platforms, and technical applications."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 sm:mt-16">
          {services.map((service, idx) => {
            const IconComponent = serviceIcons[service.iconName] || Monitor;

            return (
              <FadeIn key={service.id} direction="up" delay={idx * 0.1}>
                <div className="h-full p-7 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-accent-blue/40 hover:bg-white/[0.06] transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-accent-blue group-hover:scale-110 transition-transform">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-mono font-bold text-accent-cyan">
                        {service.number}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white font-display mb-3 group-hover:text-accent-blue transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-sm text-text-secondary leading-relaxed mb-6">
                      {service.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/[0.06]">
                    <ul className="space-y-1.5 mb-6">
                      {service.deliverables.slice(0, 3).map((item, i) => (
                        <li key={i} className="text-xs text-slate-300 flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-accent-cyan" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/services"
                      className="inline-flex items-center gap-2 text-xs font-semibold text-accent-blue hover:text-white transition-colors"
                    >
                      <span>Explore service details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Explore Services CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-white text-sm font-medium transition-all"
          >
            <span>Explore All 5 Service Systems</span>
            <ArrowRight className="w-4 h-4 text-accent-blue transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
