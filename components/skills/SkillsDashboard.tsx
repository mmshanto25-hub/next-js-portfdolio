"use client";

import React, { useState, useMemo } from "react";
import { skills, skillCategories, type SkillCategory, type Skill } from "@/data/skills";
import {
  Search,
  Code2,
  Server,
  Terminal,
  Database,
  Wrench,
  Palette,
  Sparkles,
  Layers,
  Globe,
  Share2,
  HardDrive,
  Cpu,
  FileCode2,
  X,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/animations/FadeIn";

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  All: Sparkles,
  Frontend: Code2,
  Backend: Server,
  Programming: Terminal,
  Database: Database,
  Tools: Wrench,
  Design: Palette,
  Other: Layers,
};

export function SkillsDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>("All");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Filter skills based on search, category, and selected tag
  const filteredSkills = useMemo(() => {
    return skills.filter((skill) => {
      const matchesCategory =
        selectedCategory === "All" || skill.category === selectedCategory;

      const matchesSearch =
        searchQuery === "" ||
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.relatedTechnologies.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesTag =
        !activeTag || skill.relatedTechnologies.includes(activeTag) || skill.name === activeTag;

      return matchesCategory && matchesSearch && matchesTag;
    });
  }, [searchQuery, selectedCategory, activeTag]);

  // Count by category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: skills.length };
    skills.forEach((s) => {
      counts[s.category] = (counts[s.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="w-full">
      {/* Control Bar: Search Input & Category Filters */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl mb-12 shadow-2xl">
        <div className="flex flex-col md:flex-row gap-6 items-stretch md:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-text-muted absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search technologies, tools, libraries..."
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

          {/* Active Tag Filter Indicator */}
          {activeTag && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent-blue/15 border border-accent-blue/30 text-xs font-mono text-blue-300">
              <span>Filter: <strong>{activeTag}</strong></span>
              <button
                type="button"
                onClick={() => setActiveTag(null)}
                className="hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Total Matching indicator */}
          <div className="text-xs font-mono text-text-muted self-center">
            Showing <span className="text-white font-bold">{filteredSkills.length}</span> technologies
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-6 border-t border-white/[0.06]">
          {skillCategories.map((category) => {
            const Icon = categoryIcons[category] || Sparkles;
            const isSelected = selectedCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setSelectedCategory(category);
                  setActiveTag(null);
                }}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 border",
                  isSelected
                    ? "bg-accent-blue text-white border-blue-400/40 shadow-lg shadow-blue-500/20"
                    : "bg-white/[0.02] text-text-secondary border-white/[0.06] hover:bg-white/[0.05] hover:text-white"
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{category}</span>
                <span
                  className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded-full font-mono",
                    isSelected ? "bg-white/20 text-white" : "bg-white/5 text-text-muted"
                  )}
                >
                  {categoryCounts[category] || 0}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Skills Interactive Grid */}
      {filteredSkills.length === 0 ? (
        <div className="py-20 text-center rounded-3xl bg-white/[0.02] border border-white/[0.06]">
          <Filter className="w-10 h-10 text-text-muted mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white font-display">No technologies matched</h3>
          <p className="text-sm text-text-secondary mt-1 max-w-sm mx-auto">
            Try adjusting your search query or reset the category filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
              setActiveTag(null);
            }}
            className="mt-6 px-4 py-2 rounded-xl text-xs font-medium bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, idx) => (
            <FadeIn key={skill.name} direction="up" delay={idx * 0.03}>
              <div className="h-full p-6 sm:p-7 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-accent-blue/30 hover:bg-white/[0.06] transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white font-display group-hover:text-accent-blue transition-colors">
                      {skill.name}
                    </h3>
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-text-muted">
                      {skill.category}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6">
                    {skill.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06]">
                  <p className="text-[11px] font-mono text-text-muted mb-2">Connected Stack:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.relatedTechnologies.map((tech) => (
                      <button
                        key={tech}
                        type="button"
                        onClick={() => setActiveTag(tech)}
                        className={cn(
                          "text-[10px] font-mono px-2 py-0.5 rounded transition-colors",
                          activeTag === tech
                            ? "bg-accent-blue text-white"
                            : "bg-white/[0.04] text-slate-300 hover:bg-white/10 hover:text-white border border-white/[0.06]"
                        )}
                      >
                        {tech}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  );
}
