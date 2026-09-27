import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { GlassCard } from "@/components/ui/GlassCard";
import { personalInfo } from "@/data/social";
import {
  GraduationCap,
  Code2,
  Layers,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Brain,
  Lightbulb,
  Search,
  Eye,
  FileCode2,
  Calendar,
  MapPin,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "Learn about Meskatul Masabhi Shanto — Computer Science & Engineering student at Gono Bishwabidyalay, Full-Stack Web Developer, and UI/UX Designer.",
};

const workingStyles = [
  {
    icon: Brain,
    title: "Problem Solver",
    description:
      "Tackles technical constraints by dissecting root causes. Leverages computer science algorithmic thinking to formulate scalable, clean architectures.",
    accent: "text-accent-blue",
    border: "hover:border-blue-500/40",
  },
  {
    icon: Lightbulb,
    title: "Continuous Learner",
    description:
      "Constantly testing emerging web patterns and tooling. Built 25+ frontend projects as deliberate practice to master modern React, Next.js, and TypeScript.",
    accent: "text-accent-cyan",
    border: "hover:border-cyan-500/40",
  },
  {
    icon: Eye,
    title: "Design Conscious",
    description:
      "Passionate about visual hierarchy, typography, and micro-interactions. Approaches code with an aesthetic standard that elevates user experience.",
    accent: "text-accent-purple",
    border: "hover:border-purple-500/40",
  },
  {
    icon: Search,
    title: "Detail Oriented",
    description:
      "Obsessive about pixel-perfect alignment, semantic accessibility, zero layout shifts, type safety, and Lighthouse Core Web Vitals.",
    accent: "text-emerald-400",
    border: "hover:border-emerald-500/40",
  },
];

const philosophyPrinciples = [
  {
    title: "Clean Code",
    description:
      "Code is read far more often than it is written. I prioritize modular component structures, strict TypeScript interfaces, and descriptive naming conventions to ensure lasting maintainability.",
  },
  {
    title: "Good UX",
    description:
      "A technical feature has no value if users struggle to navigate it. Intuitive user flows, clear visual cues, informative feedback states, and zero-friction navigation are mandatory.",
  },
  {
    title: "Simplicity",
    description:
      "Complexity is easy; simplicity requires discipline. Eliminating superfluous dependencies and over-engineered abstractions results in faster, more resilient web software.",
  },
  {
    title: "Performance",
    description:
      "Speed is an essential feature. I build with optimized asset pipelines, server-rendered components, efficient DOM mutations, and minimal bundle payloads to ensure instant interactions.",
  },
  {
    title: "Continuous Learning",
    description:
      "The web ecosystem evolves rapidly. Remaining humble, reading specifications, and testing ideas through tangible project implementations drives continuous growth.",
  },
];

export default function AboutPage() {
  return (
    <div className="py-16 sm:py-24">
      {/* 1. Page Header & Hero Introduction */}
      <Container>
        <div className="max-w-4xl mx-auto text-center mb-16 sm:mb-24">
          <FadeIn direction="up">
            <span className="text-accent-blue font-mono text-xs sm:text-sm uppercase tracking-wider mb-3 inline-block">
              Biography &amp; Background
            </span>
            <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.1]">
              Engineering digital products with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-accent-cyan to-accent-purple">
                precision &amp; purpose.
              </span>
            </h1>
            <p className="mt-6 text-base sm:text-xl text-text-secondary leading-relaxed">
              I am Meskatul Masabhi Shanto, a Full-Stack Web Developer and UI/UX Designer currently pursuing my Bachelor of Science in Computer Science &amp; Engineering.
            </p>
          </FadeIn>
        </div>

        {/* 2. Detailed Professional Introduction & Avatar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24 sm:mb-32">
          <div className="lg:col-span-5 flex justify-center">
            <FadeIn direction="right">
              <div className="relative w-72 sm:w-80 aspect-square rounded-3xl p-1 bg-gradient-to-tr from-accent-blue/30 via-accent-cyan/20 to-accent-purple/30">
                <div className="w-full h-full rounded-[22px] bg-[#0A0F1D] p-6 border border-white/10 flex items-center justify-center">
                  <Image
                    src="/images/shanto-avatar.svg"
                    alt={personalInfo.name}
                    width={320}
                    height={320}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-7 space-y-5 text-text-secondary text-base sm:text-lg leading-relaxed">
            <FadeIn direction="left">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight mb-4">
                Full-Stack Web Developer &bull; UI/UX Designer
              </h2>
              <p>
                My passion for digital creation began with a simple curiosity: how do complex distributed networks and algorithms translate into the elegant, fluid interfaces we interact with every day?
              </p>
              <p>
                Pursuing a degree in Computer Science &amp; Engineering at Gono Bishwabidyalay provided me with structural grounding in data structures, algorithms, operating systems, and database architecture. However, I quickly realized that theoretical knowledge shines brightest when applied to real-world software.
              </p>
              <p>
                To bridge theory and practice, I embarked on an intensive development cycle, engineering over 25+ frontend projects using React, Next.js, TypeScript, and modern CSS systems. Along the way, I expanded into backend development with Node.js and Express, crafting REST APIs and managing database layers with MongoDB and PostgreSQL.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* 3. My Story: Journey Through Key Domains */}
        <div className="mb-24 sm:mb-32">
          <SectionHeading
            badge="The Journey"
            badgeVariant="cyan"
            title="My Story"
            subtitle="Evolution of Craft"
            description="How academic computer science and practical web development converged into a cohesive full-stack practice."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Computer Science Foundations",
                desc: "Rigorous coursework at Gono Bishwabidyalay covering algorithms, computational complexity (Big-O), memory models, and object-oriented programming in C++ and Java.",
              },
              {
                title: "Web Development Awakening",
                desc: "Discovering the immediacy of web technologies. Learning semantic HTML5, CSS3 Grid/Flexbox layouts, and foundational DOM manipulation with vanilla JavaScript.",
              },
              {
                title: "Frontend Mastery (25+ Projects)",
                desc: "Progressing into modern React.js and Next.js App Router ecosystems. Engineering state management, typed component props with TypeScript, and utility-first styling with Tailwind CSS.",
              },
              {
                title: "UI/UX Design Integration",
                desc: "Recognizing that engineering without design creates friction. Exploring wireframing, component design systems, typography hierarchy, and interactive prototypes in Figma.",
              },
              {
                title: "Full-Stack & Backend Systems",
                desc: "Extending applications to the server. Architecting RESTful APIs with Node.js and Express, implementing JWT auth flows, and modeling data in MongoDB and relational SQL databases.",
              },
              {
                title: "Modern Technologies & Automation",
                desc: "Adopting modern developer tooling, Next.js Server Components, Git collaboration workflows, and Python scripting for workflow task automation.",
              },
            ].map((step, idx) => (
              <FadeIn key={idx} direction="up" delay={idx * 0.08}>
                <div className="h-full p-6 sm:p-7 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.16] hover:bg-white/[0.05] transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-accent-cyan mb-2 inline-block">
                      0{idx + 1}
                    </span>
                    <h3 className="text-lg font-bold text-white font-display mb-3">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* 4. What I Do */}
        <div className="mb-24 sm:mb-32">
          <SectionHeading
            badge="Core Disciplines"
            badgeVariant="blue"
            title="What I Do"
            subtitle="Expertise in Action"
            description="Bridging technical engineering with human-centered visual design."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <GlassCard padding="lg" variant="interactive">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-accent-blue/15 text-accent-blue">
                  <Code2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white font-display">
                  Frontend &amp; Full-Stack Engineering
                </h3>
              </div>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-6">
                I build robust web applications with Next.js, React, and TypeScript. From structuring reusable component libraries to implementing performant API integrations, I focus on delivering clean code that scales seamlessly under real-world usage.
              </p>
              <ul className="space-y-2.5">
                {[
                  "Server & Client Components architecture with Next.js App Router",
                  "Strict TypeScript typing preventing runtime errors and regressions",
                  "Responsive styling using Tailwind CSS across mobile to 4K viewports",
                  "RESTful backend services and databases (MongoDB, PostgreSQL, MySQL)",
                  "Performance optimization focusing on Core Web Vitals and accessibility",
                ].map((item, i) => (
                  <li key={i} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-accent-blue shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>

            <GlassCard padding="lg" variant="interactive">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-accent-purple/15 text-accent-purple">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white font-display">
                  UI/UX Design &amp; Digital Experience
                </h3>
              </div>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-6">
                Great interfaces feel effortless because every visual choice is intentional. I design clean, intuitive, and engaging user experiences in Figma, ensuring typography, spacing, and interaction states support user objectives.
              </p>
              <ul className="space-y-2.5">
                {[
                  "User journey wireframing and interactive prototyping in Figma",
                  "Cohesive design systems with tokens for spacing, typography, and color",
                  "Ergonomic navigation and clear information architecture",
                  "Smooth micro-interactions and animations that guide user attention",
                  "Accessible contrast ratios compliant with WCAG standards",
                ].map((item, i) => (
                  <li key={i} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-accent-purple shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </div>

        {/* 5. My Philosophy */}
        <div className="mb-24 sm:mb-32">
          <SectionHeading
            badge="Engineering Values"
            badgeVariant="purple"
            title="My Philosophy"
            subtitle="Guiding Standards"
            description="The core tenets that guide every line of code written and every interface designed."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {philosophyPrinciples.map((item, idx) => (
              <FadeIn key={idx} direction="up" delay={idx * 0.1}>
                <div className="h-full p-6 sm:p-7 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.16] transition-all flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white font-display mb-3">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* 6. Education Section */}
        <div className="mb-24 sm:mb-32">
          <SectionHeading
            badge="Academic Credentials"
            badgeVariant="green"
            title="Education"
            subtitle="University Foundation"
          />

          <div className="max-w-3xl mx-auto">
            <GlassCard padding="lg" variant="glow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                    <GraduationCap className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                      Bachelor of Science in Computer Science &amp; Engineering
                    </h3>
                    <p className="text-base text-accent-cyan font-medium">
                      Gono Bishwabidyalay
                    </p>
                  </div>
                </div>

                <div className="flex sm:flex-col items-start sm:items-end gap-2 text-xs font-mono text-text-muted">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white">
                    <Calendar className="w-3.5 h-3.5 text-accent-cyan" />
                    2022 – 2026
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <MapPin className="w-3 h-3" />
                    Dhaka, Bangladesh
                  </span>
                </div>
              </div>

              <div className="pt-6 space-y-4 text-xs sm:text-sm text-text-secondary leading-relaxed">
                <p>
                  Undergraduate program emphasizing computer science theory, systems architecture, and engineering practices.
                </p>
                <div>
                  <h4 className="font-semibold text-white mb-2">Core Areas of Study:</h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Data Structures & Algorithms",
                      "Object-Oriented Programming (C++, Java)",
                      "Database Management Systems (DBMS)",
                      "Operating Systems",
                      "Computer Networks",
                      "Software Engineering",
                      "System Analysis & Design",
                    ].map((course) => (
                      <span
                        key={course}
                        className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs font-mono"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* 7. Personal Working Style */}
        <div className="mb-24 sm:mb-32">
          <SectionHeading
            badge="Work Ethic"
            badgeVariant="cyan"
            title="Personal Working Style"
            subtitle="How I Operate"
            description="Habits and character attributes that ensure reliable execution on every project."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workingStyles.map((item, idx) => {
              const Icon = item.icon;
              return (
                <FadeIn key={idx} direction="up" delay={idx * 0.1}>
                  <div
                    className={`h-full p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] transition-all duration-300 ${item.border}`}
                  >
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white w-fit mb-4">
                      <Icon className={`w-5 h-5 ${item.accent}`} />
                    </div>
                    <h3 className="text-lg font-bold text-white font-display mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>

        {/* 8. About CTA */}
        <div className="rounded-3xl p-8 sm:p-12 bg-white/[0.02] border border-white/[0.08] text-center max-w-3xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4">
            Ready to explore my work?
          </h3>
          <p className="text-text-secondary text-sm sm:text-base max-w-md mx-auto mb-8">
            Check out the technologies I specialize in or view the detailed case studies for my key projects.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/skills"
              className="px-6 py-3 text-sm font-semibold text-white bg-accent-blue hover:bg-blue-600 rounded-xl transition-all shadow-lg shadow-blue-500/20 inline-flex items-center gap-2"
            >
              <span>Explore My Skills</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/projects"
              className="px-6 py-3 text-sm font-medium text-white bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all inline-flex items-center gap-2"
            >
              <span>View My Projects</span>
              <ArrowRight className="w-4 h-4 text-accent-cyan" />
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
