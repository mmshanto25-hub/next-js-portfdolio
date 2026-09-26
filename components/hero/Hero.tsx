"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, FileDown, Sparkles, Code2, Layers, Cpu } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { personalInfo } from "@/data/social";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    setMousePosition({
      x: (clientX - centerX) / 45,
      y: (clientY - centerY) / 45,
    });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-[92vh] flex flex-col justify-center items-center pt-28 pb-16 overflow-hidden"
    >
      <Container className="relative z-10 flex flex-col items-center text-center">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs sm:text-sm font-mono tracking-wider backdrop-blur-md shadow-lg shadow-blue-500/10">
            <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
            <span>{personalInfo.status}</span>
          </div>
        </motion.div>

        {/* Main Display Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black tracking-tight text-white leading-[1.08]">
            Building Digital Experiences{" "}
            <span className="bg-gradient-to-r from-accent-blue via-accent-cyan to-accent-purple bg-clip-text text-transparent inline-block">
              That Feel Future-Ready.
            </span>
          </h1>
        </motion.div>

        {/* Supporting Bio Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-text-secondary leading-relaxed font-normal"
        >
          {personalInfo.bioShort}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-5"
        >
          <Link
            href="/projects"
            className="group px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-accent-blue hover:bg-blue-600 rounded-xl border border-blue-400/30 shadow-lg shadow-blue-500/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] inline-flex items-center gap-2"
          >
            <span>View My Work</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          <Link
            href="/contact"
            className="group px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 hover:border-white/25 backdrop-blur-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] inline-flex items-center gap-2"
          >
            <span>Let&apos;s Connect</span>
            <Sparkles className="w-4 h-4 text-accent-cyan transition-transform group-hover:rotate-12" />
          </Link>

          <Link
            href="/resume"
            className="group px-6 py-3.5 text-sm sm:text-base font-medium text-text-secondary hover:text-white bg-transparent hover:bg-white/5 rounded-xl border border-border hover:border-white/20 transition-all duration-200 inline-flex items-center gap-2"
          >
            <FileDown className="w-4 h-4 text-accent-purple" />
            <span>Download CV</span>
          </Link>
        </motion.div>

        {/* Floating UI Badges with Subtle Mouse Interaction */}
        <div className="hidden lg:block">
          {/* Badge 1: Frontend Projects */}
          <motion.div
            animate={{
              x: mousePosition.x * -1.2,
              y: mousePosition.y * -1.2,
            }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="absolute left-6 top-1/3 -translate-y-1/2 p-3.5 rounded-2xl bg-secondary/80 backdrop-blur-xl border border-white/10 shadow-xl flex items-center gap-3 select-none pointer-events-none"
          >
            <div className="p-2 rounded-xl bg-accent-blue/15 text-accent-blue">
              <Code2 className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="text-xs font-mono text-text-muted">Built Projects</p>
              <p className="text-sm font-bold text-white">25+ Frontend</p>
            </div>
          </motion.div>

          {/* Badge 2: UI/UX & Next.js */}
          <motion.div
            animate={{
              x: mousePosition.x * 1.4,
              y: mousePosition.y * 1.4,
            }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-3.5 rounded-2xl bg-secondary/80 backdrop-blur-xl border border-white/10 shadow-xl flex items-center gap-3 select-none pointer-events-none"
          >
            <div className="p-2 rounded-xl bg-accent-cyan/15 text-accent-cyan">
              <Layers className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="text-xs font-mono text-text-muted">Specialization</p>
              <p className="text-sm font-bold text-white">Full-Stack &amp; UI/UX</p>
            </div>
          </motion.div>
        </div>

        {/* Subtle Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-16 sm:mt-20 flex flex-col items-center gap-2 text-text-muted text-xs font-mono uppercase tracking-widest"
        >
          <span>Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4 text-accent-blue" />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
