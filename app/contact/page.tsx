import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";
import { GlassCard } from "@/components/ui/GlassCard";
import { personalInfo } from "@/data/social";
import {
  Mail,
  MapPin,
  HelpCircle,
  Clock,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { Github, Linkedin } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Contact & Collaboration",
  description:
    "Get in touch with Meskatul Masabhi Shanto for web development projects, full-stack applications, UI/UX design consulting, and technical opportunities.",
};

const faqs = [
  {
    q: "What type of websites do you build?",
    a: "I build responsive business websites, modern web applications, high-performance portfolio sites, and landing pages. Every project is engineered for speed, mobile responsiveness, and clean typography.",
  },
  {
    q: "Do you work with Next.js?",
    a: "Yes. Next.js is my core framework for modern web development. I utilize the Next.js App Router, Server Components, dynamic routing, and built-in image optimization for production speed.",
  },
  {
    q: "Can you build full-stack applications?",
    a: "Yes. I construct full-stack web applications connecting React/Next.js frontends to Node.js and Express.js backends, with database integration across MongoDB, PostgreSQL, and MySQL.",
  },
  {
    q: "Do you provide UI/UX design?",
    a: "Yes. I create wireframes, interactive user flows, design systems, and visual prototypes in Figma, ensuring a cohesive design-to-code workflow that aligns visual polish with accessibility.",
  },
];

export default function ContactPage() {
  return (
    <div className="py-16 sm:py-24">
      <Container>
        {/* Page Hero */}
        <div className="max-w-4xl mx-auto text-center mb-16 sm:mb-20">
          <span className="text-accent-blue font-mono text-xs sm:text-sm uppercase tracking-wider mb-3 inline-block">
            Inquiries &amp; Opportunities
          </span>
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.1]">
            Let&apos;s Start a Conversation.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl mx-auto">
            Have a project, freelance inquiry, or technical opportunity? I am available to collaborate and build high-quality digital solutions.
          </p>
        </div>

        {/* Main Grid: Form & Contact Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-start mb-24 sm:mb-32">
          {/* Left Column: Interactive Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Right Column: Direct Info & Availability Card */}
          <div className="lg:col-span-5 space-y-6">
            {/* Status & Availability */}
            <GlassCard padding="md">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  Available for Opportunities
                </span>
              </div>
              <h3 className="text-lg font-bold text-white font-display mb-2">
                Fast Turnaround &amp; Response
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                I typically respond within 24 hours. Feel free to reach out via the form, email directly, or connect through LinkedIn.
              </p>
            </GlassCard>

            {/* Direct Channels */}
            <div className="space-y-3">
              <a
                href={`mailto:${personalInfo.email}`}
                className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-accent-blue/40 hover:bg-white/[0.06] transition-all flex items-center gap-4 group"
              >
                <div className="p-3 rounded-xl bg-accent-blue/10 text-accent-blue group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-mono text-text-muted">Direct Email</p>
                  <p className="text-sm font-semibold text-white group-hover:text-accent-blue transition-colors">
                    {personalInfo.email}
                  </p>
                </div>
              </a>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.06] transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-white/5 text-text-secondary group-hover:text-white transition-colors">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-text-muted">GitHub Repositories</p>
                    <p className="text-sm font-semibold text-white">github.com/shantodev</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-text-muted group-hover:text-white transition-colors" />
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-accent-blue/40 hover:bg-white/[0.06] transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-accent-blue/10 text-accent-blue group-hover:scale-110 transition-transform">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-text-muted">LinkedIn Profile</p>
                    <p className="text-sm font-semibold text-white">linkedin.com/in/shantodev</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-text-muted group-hover:text-white transition-colors" />
              </a>

              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-4">
                <div className="p-3 rounded-xl bg-accent-cyan/10 text-accent-cyan">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-mono text-text-muted">Location</p>
                  <p className="text-sm font-semibold text-white">{personalInfo.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto pt-16 border-t border-white/[0.08]">
          <SectionHeading
            badge="Frequently Asked"
            badgeVariant="cyan"
            title="Common Questions"
            subtitle="FAQ"
            description="Clear answers regarding project engagements, development stack, and design capabilities."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-colors"
              >
                <div className="flex items-start gap-3 mb-2.5">
                  <HelpCircle className="w-5 h-5 text-accent-blue shrink-0 mt-0.5" />
                  <h3 className="text-base font-bold text-white font-display">
                    {faq.q}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed pl-8">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
