"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";
import { projects } from "@/data/projects";
import { ArrowUpRight, ExternalLink, ArrowRight } from "lucide-react";
import { Github } from "@/components/ui/Icons";
import { Badge } from "@/components/ui/Badge";
import { assetPath } from "@/lib/utils";

export function FeaturedProjectsSection() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 4);

  return (
    <section id="featured-projects" className="py-24 sm:py-32 relative">
      <Container>
        <SectionHeading
          badge="Curated Engineering"
          badgeVariant="blue"
          title="Featured Projects"
          subtitle="Works & Case Studies"
          description="Selected web applications and design systems demonstrating full-stack engineering, accessible component design, and responsive craft."
        />

        <div className="space-y-20 sm:space-y-28 mt-12 sm:mt-16">
          {featuredProjects.map((project, index) => {
            const isEven = index % 2 === 1;

            return (
              <FadeIn key={project.slug} direction="up" duration={0.6}>
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center rounded-3xl p-6 sm:p-8 lg:p-10 bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/5`}
                >
                  {/* Image Column */}
                  <div
                    className={`lg:col-span-7 ${isEven ? "lg:order-2" : "lg:order-1"
                      }`}
                  >
                    <Link
                      href={`/projects/${project.slug}`}
                      className="group block relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-slate-900/60 border border-white/10"
                    >
                      <Image
                        src={assetPath(project.image)}
                        alt={project.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 55vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#050816]/80 backdrop-blur-md border border-white/15 text-accent-cyan">
                          {project.number}
                        </span>
                      </div>
                    </Link>
                  </div>

                  {/* Content Column */}
                  <div
                    className={`lg:col-span-5 flex flex-col justify-center ${isEven ? "lg:order-1" : "lg:order-2"
                      }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Badge variant="blue" size="sm">
                        {project.category}
                      </Badge>
                      <span className="text-xs font-mono text-text-muted">
                        {project.year}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight group-hover:text-accent-blue transition-colors">
                      <Link href={`/projects/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h3>

                    <p className="mt-4 text-text-secondary text-sm sm:text-base leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Pills */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.technologies.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs font-mono rounded-lg bg-white/[0.04] border border-white/[0.08] text-text-secondary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="mt-8 flex flex-wrap items-center gap-4 pt-6 border-t border-white/[0.08]">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-accent-cyan transition-colors"
                      >
                        <span>View Case Study</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>

                      <div className="flex items-center gap-3 ml-auto">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-text-secondary hover:text-white transition-colors border border-white/10"
                          aria-label={`View ${project.title} on GitHub`}
                        >
                          <Github className="w-4 h-4" />
                        </a>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-text-secondary hover:text-white transition-colors border border-white/10"
                          aria-label={`Visit live demo for ${project.title}`}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* View All Projects Button */}
        <div className="mt-16 text-center">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-medium text-sm transition-all duration-200 hover:scale-[1.02]"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4 text-accent-blue transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
