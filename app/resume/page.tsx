import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PrintResumeButton } from "@/components/resume/PrintResumeButton";
import { personalInfo } from "@/data/social";
import { experiences } from "@/data/experience";
import { skills } from "@/data/skills";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import {
  Mail,
  MapPin,
  GraduationCap,
  Briefcase,
  Layers,
  Code2,
  Calendar,
  ExternalLink,
} from "lucide-react";
import { Github, Linkedin } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Professional Resume / Curriculum Vitae",
  description:
    "Official resume of Meskatul Masabhi Shanto — Full-Stack Web Developer, UI/UX Designer, and Computer Science & Engineering graduate/student at Gono Bishwabidyalay.",
};

export default function ResumePage() {
  const selectedProjects = projects.slice(0, 4);

  return (
    <div className="py-12 sm:py-20">
      <Container size="default">
        {/* Top Action Bar (hidden in print) */}
        <div className="no-print flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/[0.08]">
          <div>
            <span className="text-accent-blue font-mono text-xs uppercase tracking-wider block">
              Curriculum Vitae
            </span>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
              Meskatul Masabhi Shanto
            </h1>
          </div>
          <PrintResumeButton />
        </div>

        {/* Printable Resume Document Container */}
        <div className="rounded-3xl p-8 sm:p-14 bg-white/[0.02] border border-white/[0.08] shadow-2xl space-y-12">
          {/* 1. Header / Profile */}
          <div className="pb-8 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
                {personalInfo.name}
              </h1>
              <p className="text-base sm:text-lg text-accent-cyan font-medium mt-1">
                {personalInfo.role}
              </p>
              <p className="text-xs sm:text-sm text-text-muted mt-0.5">
                {personalInfo.subtitle} &bull; {personalInfo.education.institution}
              </p>
            </div>

            <div className="flex flex-col gap-1.5 text-xs font-mono text-text-secondary">
              <span className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-accent-blue" />
                <a href={`mailto:${personalInfo.email}`} className="hover:text-white transition-colors">
                  {personalInfo.email}
                </a>
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-accent-cyan" />
                <span>{personalInfo.location}</span>
              </span>
              <span className="flex items-center gap-2">
                <Github className="w-3.5 h-3.5 text-text-muted" />
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  github.com/shantodev
                </a>
              </span>
              <span className="flex items-center gap-2">
                <Linkedin className="w-3.5 h-3.5 text-accent-blue" />
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  linkedin.com/in/shantodev
                </a>
              </span>
            </div>
          </div>

          {/* Profile Bio */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-accent-blue mb-3">
              Professional Profile
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              {personalInfo.bioShort} Possessing strong foundational grounding from Computer Science &amp; Engineering coursework at Gono Bishwabidyalay coupled with practical mastery gained through building 25+ responsive frontend and full-stack projects using React, Next.js, TypeScript, and modern backend services.
            </p>
          </div>

          {/* 2. Education */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-accent-blue mb-4 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              <span>Education</span>
            </h2>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <h3 className="text-base font-bold text-white font-display">
                  {personalInfo.education.degree}
                </h3>
                <span className="text-xs font-mono text-accent-cyan flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {personalInfo.education.period}
                </span>
              </div>
              <p className="text-sm text-accent-blue font-medium mb-3">
                {personalInfo.education.institution} &bull; Dhaka, Bangladesh
              </p>
              <p className="text-xs text-text-secondary leading-relaxed">
                Core coursework: Data Structures, Algorithms, Object-Oriented Programming (C++/Java), Database Management Systems (DBMS), Operating Systems, Software Engineering, and Computer Networks.
              </p>
            </div>
          </div>

          {/* 3. Practical Experience */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-accent-blue mb-4 flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              <span>Experience &amp; Project Trajectory</span>
            </h2>

            <div className="space-y-6">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <div>
                      <h3 className="text-base font-bold text-white font-display">
                        {exp.role}
                      </h3>
                      <p className="text-xs text-accent-cyan font-medium">
                        {exp.organization} &bull; {exp.location}
                      </p>
                    </div>
                    <span className="text-xs font-mono text-text-muted flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mt-2 mb-3">
                    {exp.summary}
                  </p>

                  <ul className="space-y-1.5 mb-3">
                    {exp.highlights.slice(0, 3).map((hl, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-blue shrink-0 mt-1" />
                        <span className="leading-snug">{hl}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1 pt-2 border-t border-white/[0.04]">
                    {exp.technologies.slice(0, 6).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Skills Matrix */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-accent-blue mb-4 flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              <span>Technical Skills</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <h3 className="text-xs font-mono uppercase text-accent-cyan mb-2">Frontend</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  React.js, Next.js (App Router), TypeScript, JavaScript (ES6+), HTML5, CSS3, DOM Manipulation, Tailwind CSS, Bootstrap, Responsive Design
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <h3 className="text-xs font-mono uppercase text-accent-cyan mb-2">Backend &amp; Databases</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Node.js, Express.js, REST APIs, MongoDB, PostgreSQL, MySQL, API Integration
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <h3 className="text-xs font-mono uppercase text-accent-cyan mb-2">Programming &amp; Systems</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  C, C++, Python (automation &amp; scripting), Java (OOP paradigms), Algorithms &amp; Data Structures
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <h3 className="text-xs font-mono uppercase text-accent-cyan mb-2">Design &amp; Tooling</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Figma (Wireframing, Prototypes, Design Systems), UI/UX Design, Git, GitHub, VS Code
                </p>
              </div>
            </div>
          </div>

          {/* 5. Key Projects */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-accent-blue mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>Selected Key Projects</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedProjects.map((p) => (
                <div
                  key={p.slug}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-bold text-white font-display">
                      {p.title}
                    </h3>
                    <span className="text-[10px] font-mono text-text-muted">{p.year}</span>
                  </div>
                  <p className="text-xs text-accent-cyan font-mono mb-2">{p.subtitle}</p>
                  <p className="text-xs text-text-secondary leading-relaxed mb-3">
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {p.technologies.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Services Summary */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-accent-blue mb-4">
              Services Offered
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {services.map((s) => (
                <div key={s.id} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <h3 className="text-xs font-bold text-white font-display mb-1">{s.title}</h3>
                  <p className="text-[11px] text-text-secondary leading-snug">{s.shortDescription}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
