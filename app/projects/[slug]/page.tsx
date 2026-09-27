import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { projects, type Project } from "@/data/projects";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Calendar,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Trophy,
  Sparkles,
  Palette,
  Terminal,
  Cpu,
} from "lucide-react";
import { Github } from "@/components/ui/Icons";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";

import { getProjects, getProjectBySlug } from "@/lib/content";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} — Case Study`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Meskatul Masabhi Shanto`,
      description: project.description,
      images: [{ url: project.image }],
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const projects = await getProjects();
  const projectIndex = projects.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = projects[projectIndex];
  const prevProject =
    projectIndex > 0 ? projects[projectIndex - 1] : projects[projects.length - 1];
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : projects[0];

  return (
    <div className="py-16 sm:py-24">
      <Container>
        {/* Back navigation */}
        <div className="mb-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-text-muted hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects Archive</span>
          </Link>
        </div>

        {/* 1. Hero Section */}
        <div className="max-w-4xl mb-12 sm:mb-16">
          <FadeIn direction="up">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-accent-blue/15 text-accent-cyan border border-accent-blue/30">
                Project {project.number}
              </span>
              <Badge variant="blue" size="sm">
                {project.category}
              </Badge>
              <span className="text-xs font-mono text-text-muted flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {project.year}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.12]">
              {project.title}
            </h1>

            <p className="mt-4 text-lg sm:text-xl text-accent-cyan font-medium">
              {project.subtitle}
            </p>

            <p className="mt-6 text-base sm:text-lg text-text-secondary leading-relaxed">
              {project.description}
            </p>

            {/* Action buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 text-sm font-semibold text-white bg-accent-blue hover:bg-blue-600 rounded-xl transition-all shadow-lg shadow-blue-500/25 inline-flex items-center gap-2"
              >
                <span>Live Project View</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 text-sm font-medium text-white bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all inline-flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Source</span>
              </a>
            </div>
          </FadeIn>
        </div>

        {/* 2. Visual Container */}
        <div className="mb-20 rounded-3xl overflow-hidden bg-slate-900/60 border border-white/10 shadow-2xl relative aspect-[16/9] w-full">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* 3. Deep Case Study Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Main content body */}
          <div className="lg:col-span-8 space-y-16">
            {/* Overview */}
            <FadeIn direction="up">
              <section>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4 flex items-center gap-2.5">
                  <Sparkles className="w-6 h-6 text-accent-blue" />
                  <span>Project Overview</span>
                </h2>
                <p className="text-base text-text-secondary leading-relaxed">
                  {project.overview}
                </p>
              </section>
            </FadeIn>

            {/* Problem & Solution */}
            <FadeIn direction="up">
              <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
                  <div className="flex items-center gap-2 text-rose-400 font-display font-bold text-lg mb-3">
                    <AlertTriangle className="w-5 h-5" />
                    <span>The Problem</span>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {project.problem}
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white/[0.02] border border-accent-blue/30 bg-accent-blue/[0.02]">
                  <div className="flex items-center gap-2 text-accent-cyan font-display font-bold text-lg mb-3">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>The Solution</span>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </section>
            </FadeIn>

            {/* Key Features */}
            <FadeIn direction="up">
              <section>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-6 flex items-center gap-2.5">
                  <Layers className="w-6 h-6 text-accent-cyan" />
                  <span>Key Features &amp; Capabilities</span>
                </h2>
                <div className="space-y-3">
                  {project.features.map((feature, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-accent-cyan shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-slate-200 leading-snug">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </FadeIn>

            {/* Design & Development Process */}
            <FadeIn direction="up">
              <section className="space-y-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4 flex items-center gap-2.5">
                    <Palette className="w-6 h-6 text-accent-purple" />
                    <span>Design Process</span>
                  </h2>
                  <p className="text-base text-text-secondary leading-relaxed">
                    {project.designProcess}
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4 flex items-center gap-2.5">
                    <Terminal className="w-6 h-6 text-accent-blue" />
                    <span>Development &amp; Architecture</span>
                  </h2>
                  <p className="text-base text-text-secondary leading-relaxed">
                    {project.developmentProcess}
                  </p>
                  {project.architectureNotes && (
                    <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm font-mono text-slate-300">
                      <strong>Architecture Note:</strong> {project.architectureNotes}
                    </div>
                  )}
                </div>
              </section>
            </FadeIn>

            {/* Challenges & Solutions */}
            <FadeIn direction="up">
              <section>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-6 flex items-center gap-2.5">
                  <Cpu className="w-6 h-6 text-amber-400" />
                  <span>Technical Challenges Tackled</span>
                </h2>
                <div className="space-y-3">
                  {project.challenges.map((challenge, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3"
                    >
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0 mt-0.5">
                        0{i + 1}
                      </span>
                      <span className="text-sm text-text-secondary leading-relaxed">
                        {challenge}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </FadeIn>

            {/* Results & Takeaways */}
            <FadeIn direction="up">
              <section>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-6 flex items-center gap-2.5">
                  <Trophy className="w-6 h-6 text-emerald-400" />
                  <span>Results &amp; Real Outcomes</span>
                </h2>
                <div className="space-y-3">
                  {project.results.map((result, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-emerald-500/[0.03] border border-emerald-500/20 flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-slate-200 leading-snug">
                        {result}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </FadeIn>
          </div>

          {/* Sticky Sidebar: Stack Specs & Quick Info */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <GlassCard padding="md">
              <h3 className="text-base font-bold text-white font-display mb-4 pb-3 border-b border-white/10">
                Technology Breakdown
              </h3>
              <div className="space-y-6">
                {project.technologyStack.map((group, idx) => (
                  <div key={idx}>
                    <p className="text-xs font-mono uppercase tracking-wider text-accent-cyan mb-2">
                      {group.category}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="px-2.5 py-1 text-xs font-mono rounded bg-white/5 border border-white/10 text-slate-200"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-accent-blue hover:bg-blue-600 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Launch Live Project</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors border border-white/10"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Inspect Repository</span>
                </a>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* 4. Previous / Next Project Navigation */}
        <div className="mt-24 pt-12 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            href={`/projects/${prevProject.slug}`}
            className="p-6 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.08] hover:border-white/20 transition-all group flex flex-col justify-between"
          >
            <span className="text-xs font-mono text-text-muted flex items-center gap-1.5 mb-2">
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              <span>Previous Project</span>
            </span>
            <span className="text-base sm:text-lg font-bold text-white font-display group-hover:text-accent-blue transition-colors">
              {prevProject.title}
            </span>
          </Link>

          <Link
            href={`/projects/${nextProject.slug}`}
            className="p-6 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.08] hover:border-white/20 transition-all group flex flex-col justify-between text-left sm:text-right"
          >
            <span className="text-xs font-mono text-text-muted flex items-center justify-start sm:justify-end gap-1.5 mb-2">
              <span>Next Project</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="text-base sm:text-lg font-bold text-white font-display group-hover:text-accent-blue transition-colors">
              {nextProject.title}
            </span>
          </Link>
        </div>
      </Container>
    </div>
  );
}
