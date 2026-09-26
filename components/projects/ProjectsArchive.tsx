"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects, projectCategories, type ProjectCategory } from "@/data/projects";
import {
  Search,
  LayoutGrid,
  ListFilter,
  ArrowRight,
  ExternalLink,
  Sparkles,
  X,
  Layers,
} from "lucide-react";
import { Github } from "@/components/ui/Icons";
import { assetPath, cn } from "@/lib/utils";
import { FadeIn } from "@/components/animations/FadeIn";
import { Badge } from "@/components/ui/Badge";

export function ProjectsArchive() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("All");
  const [viewMode, setViewMode] = useState<"grid" | "detailed">("grid");

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === "All" || project.category === selectedCategory;

      const matchesSearch =
        searchQuery === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        );

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="w-full">
      {/* Control Bar */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl mb-12 shadow-2xl">
        <div className="flex flex-col md:flex-row gap-6 items-stretch md:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-text-muted absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects by name, keyword, or tech..."
              className="w-full pl-11 pr-10 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/30 text-white placeholder-text-muted text-sm outline-none transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-white p-1"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* View Mode Toggle & Total Count */}
          <div className="flex items-center gap-4 self-center">
            <span className="text-xs font-mono text-text-muted">
              Showing <strong className="text-white">{filteredProjects.length}</strong> of {projects.length}
            </span>

            <div className="flex items-center p-1 rounded-xl bg-white/5 border border-white/10">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-1.5 rounded-lg text-xs transition-colors",
                  viewMode === "grid"
                    ? "bg-accent-blue text-white"
                    : "text-text-muted hover:text-white"
                )}
                aria-label="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("detailed")}
                className={cn(
                  "p-1.5 rounded-lg text-xs transition-colors",
                  viewMode === "detailed"
                    ? "bg-accent-blue text-white"
                    : "text-text-muted hover:text-white"
                )}
                aria-label="Detailed List View"
              >
                <ListFilter className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-6 border-t border-white/[0.06]">
          {projectCategories.map((category) => {
            const isSelected = selectedCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 border",
                  isSelected
                    ? "bg-accent-blue text-white border-blue-400/40 shadow-lg shadow-blue-500/20"
                    : "bg-white/[0.02] text-text-secondary border-white/[0.06] hover:bg-white/[0.05] hover:text-white"
                )}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Display */}
      {filteredProjects.length === 0 ? (
        <div className="py-20 text-center rounded-3xl bg-white/[0.02] border border-white/[0.06]">
          <Layers className="w-10 h-10 text-text-muted mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white font-display">No projects found</h3>
          <p className="text-sm text-text-secondary mt-1">
            Try resetting your search query or choosing another category filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="mt-6 px-4 py-2 rounded-xl text-xs font-medium bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === "grid" ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <FadeIn key={project.slug} direction="up" delay={idx * 0.06}>
              <div className="h-full rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-accent-blue/40 hover:bg-white/[0.05] transition-all duration-300 flex flex-col justify-between overflow-hidden group">
                <div>
                  {/* Thumbnail */}
                  <Link
                    href={`/projects/${project.slug}`}
                    className="block relative w-full aspect-[16/10] overflow-hidden bg-slate-900 border-b border-white/[0.08]"
                  >
                    <Image
                      src={assetPath(project.image)}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-[#050816]/80 backdrop-blur-md border border-white/15 text-accent-cyan">
                        {project.number}
                      </span>
                    </div>
                  </Link>

                  {/* Body Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <Badge variant="blue" size="sm">
                        {project.category}
                      </Badge>
                      <span className="text-xs font-mono text-text-muted">
                        {project.year}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white font-display mt-2 group-hover:text-accent-blue transition-colors">
                      <Link href={`/projects/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h3>

                    <p className="mt-3 text-xs sm:text-sm text-text-secondary leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tech Pills */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/5 border border-white/5 text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Footer Actions */}
                <div className="px-6 pb-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-accent-cyan transition-colors"
                  >
                    <span>Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <div className="flex items-center gap-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-text-muted hover:text-white transition-colors"
                      aria-label="GitHub Repository"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-text-muted hover:text-white transition-colors"
                      aria-label="Live Demo Link"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      ) : (
        /* DETAILED LIST VIEW */
        <div className="space-y-6">
          {filteredProjects.map((project, idx) => (
            <FadeIn key={project.slug} direction="up" delay={idx * 0.05}>
              <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-accent-blue/30 hover:bg-white/[0.05] transition-all flex flex-col md:flex-row gap-6 lg:gap-8 items-start md:items-center justify-between group">
                <div className="flex items-start gap-4 flex-1">
                  <span className="text-xl sm:text-2xl font-display font-extrabold text-white/20 group-hover:text-accent-cyan transition-colors">
                    {project.number}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <Badge variant="blue" size="sm">
                        {project.category}
                      </Badge>
                      <span className="text-xs font-mono text-text-muted">
                        {project.year}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white font-display group-hover:text-accent-blue transition-colors">
                      <Link href={`/projects/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-text-secondary mt-1.5 max-w-2xl leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/5 border border-white/5 text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-accent-blue hover:bg-blue-600 transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-text-secondary hover:text-white transition-colors border border-white/10"
                    aria-label="GitHub Repository"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-text-secondary hover:text-white transition-colors border border-white/10"
                    aria-label="Live Demo Link"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  );
}
