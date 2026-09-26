import React from "react";
import { Hero } from "@/components/hero/Hero";
import { HomeIntroduction } from "@/components/sections/HomeIntroduction";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { SkillsPreviewSection } from "@/components/sections/SkillsPreviewSection";
import { ExperiencePreviewSection } from "@/components/sections/ExperiencePreviewSection";
import { ServicesPreviewSection } from "@/components/sections/ServicesPreviewSection";
import { WorkflowSection } from "@/components/sections/WorkflowSection";
import { AboutPreviewSection } from "@/components/sections/AboutPreviewSection";
import { ContactCtaSection } from "@/components/sections/ContactCtaSection";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Technology Marquee */}
      <TechMarquee />

      {/* 3. Introduction & Highlights */}
      <HomeIntroduction />

      {/* 4. Featured Projects with Alternating Layouts */}
      <FeaturedProjectsSection />

      {/* 5. Interactive Skills Preview */}
      <SkillsPreviewSection />

      {/* 6. Experience Preview */}
      <ExperiencePreviewSection />

      {/* 7. Services Preview */}
      <ServicesPreviewSection />

      {/* 8. 4-Stage Workflow */}
      <WorkflowSection />

      {/* 9. Editorial About Preview */}
      <AboutPreviewSection />

      {/* 10. Large Contact CTA */}
      <ContactCtaSection />
    </div>
  );
}
