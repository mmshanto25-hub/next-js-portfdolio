"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, Mail, Heart, Sparkles } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/Icons";
import { Container } from "@/components/ui/Container";
import { personalInfo } from "@/data/social";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Skills", href: "/skills" },
  { name: "Projects", href: "/projects" },
  { name: "Experience", href: "/experience" },
  { name: "Services", href: "/services" },
  { name: "Resume", href: "/resume" },
  { name: "Contact", href: "/contact" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#030611] border-t border-white/[0.08] relative overflow-hidden pt-16 pb-12 mt-20">
      {/* Ambient footer glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-accent-blue/5 to-transparent pointer-events-none" />

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.06]">
          {/* Brand & Bio column */}
          <div className="md:col-span-5 flex flex-col items-start">
            <Link href="/" className="group mb-4">
              <span className="font-display font-black text-2xl tracking-tight text-white group-hover:text-accent-blue transition-colors">
                SHANTO<span className="text-accent-cyan">.</span>
              </span>
            </Link>
            
            <p className="text-sm font-medium text-white/90 mb-1">
              Full-Stack Web Developer &bull; UI/UX Designer
            </p>
            <p className="text-xs text-text-muted mb-6">
              B.Sc. in Computer Science &amp; Engineering &bull; Gono Bishwabidyalay
            </p>

            {/* Status indicator */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{personalInfo.status}</span>
            </div>
          </div>

          {/* Quick Navigation column */}
          <div className="md:col-span-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-text-muted mb-4 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-accent-blue" />
              <span>Navigation</span>
            </h3>
            <ul className="grid grid-cols-2 gap-2.5">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-text-secondary hover:text-white transition-colors duration-200 inline-block py-0.5"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials & Connect column */}
          <div className="md:col-span-3 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-text-muted mb-4">
                Connect
              </h3>
              <div className="flex items-center gap-3">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-text-secondary hover:text-white transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-text-secondary hover:text-white transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-text-secondary hover:text-white transition-colors"
                  aria-label="Send Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 text-xs font-mono text-text-muted hover:text-white transition-colors py-1.5 px-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/15"
              >
                <span>Back to top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <p>© 2026 Meskatul Masabhi Shanto. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Built with Next.js, TypeScript &amp; Tailwind CSS</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
