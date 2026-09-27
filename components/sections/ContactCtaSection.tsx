"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { ArrowUpRight, FileText, Sparkles, Mail } from "lucide-react";
import { personalInfo } from "@/data/social";

export function ContactCtaSection() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      <Container>
        <FadeIn direction="up">
          <div className="relative rounded-3xl p-8 sm:p-14 lg:p-16 bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/10 text-center overflow-hidden shadow-2xl">
            {/* Ambient Background Glow */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[100px] opacity-20 pointer-events-none"
              style={{
                background: "radial-gradient(circle, #3B82F6 0%, #06B6D4 50%, #8B5CF6 100%)",
              }}
            />

            <div className="relative z-10 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-blue/10 border border-accent-blue/30 text-accent-blue text-xs font-mono uppercase tracking-wider mb-6">
                <Sparkles className="w-3.5 h-3.5 text-accent-cyan" />
                <span>Let&apos;s Collaborate</span>
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.12]">
                Have an idea?{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-accent-cyan to-accent-purple">
                  Let&apos;s build it.
                </span>
              </h2>

              <p className="mt-6 text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl mx-auto">
                Have a project, opportunity, or idea in mind? Let&apos;s create something meaningful together.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-5">
                <Link
                  href="/contact"
                  className="px-7 py-4 text-sm sm:text-base font-semibold text-white bg-accent-blue hover:bg-blue-600 rounded-xl border border-blue-400/30 shadow-lg shadow-blue-500/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] inline-flex items-center gap-2 group"
                >
                  <span>Start a Conversation</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>

                <Link
                  href="/resume"
                  className="px-7 py-4 text-sm sm:text-base font-medium text-white bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 hover:border-white/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] inline-flex items-center gap-2"
                >
                  <FileText className="w-4 h-4 text-accent-cyan" />
                  <span>View My Resume</span>
                </Link>
              </div>

              {/* Direct email display */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-text-muted hover:text-accent-cyan transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{personalInfo.email}</span>
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
