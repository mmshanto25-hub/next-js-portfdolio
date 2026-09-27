import fs from "fs/promises";
import path from "path";
import type { Project, ProjectCategory } from "@/data/projects";
import type { Skill, SkillCategory } from "@/data/skills";
import type { ExperienceItem, ExperiencePhilosophy } from "@/data/experience";
import type { ServiceItem, WorkflowStep } from "@/data/services";
import type { SocialLink } from "@/data/social";

export interface NavigationConfig {
  logoText: string;
  logoAccent: string;
  ctaButtonText: string;
  ctaButtonHref: string;
  navLinks: { name: string; href: string }[];
  footerRole: string;
  footerDegree: string;
  footerCopyright: string;
  footerTagline: string;
  footerShowAdminLink: boolean;
}

export interface ProfileData {
  name: string;
  preferredName: string;
  role: string;
  subtitle: string;
  status: string;
  email: string;
  github: string;
  linkedin: string;
  location: string;
  education: {
    degree: string;
    institution: string;
    period: string;
  };
  bioShort: string;
  bioLong: string;
  socialLinks: SocialLink[];
}

export interface SkillsData {
  marqueeTechnologies: string[];
  skills: Skill[];
}

export interface ExperienceData {
  experiences: ExperienceItem[];
  experiencePhilosophy: ExperiencePhilosophy;
}

export interface ServicesData {
  services: ServiceItem[];
  workflowSteps: WorkflowStep[];
}

export interface ProjectsData {
  projects: Project[];
}

const getFilePath = (fileName: string) => path.join(process.cwd(), "data", fileName);

async function readJsonFile<T>(fileName: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(getFilePath(fileName), "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    return fallback;
  }
}

async function writeJsonFile(fileName: string, data: unknown): Promise<void> {
  await fs.writeFile(getFilePath(fileName), JSON.stringify(data, null, 2), "utf-8");
}

export async function getNavigation(): Promise<NavigationConfig> {
  return readJsonFile<NavigationConfig>("navigation.json", {
    logoText: "SHANTO",
    logoAccent: ".",
    ctaButtonText: "Let's Talk",
    ctaButtonHref: "/contact",
    navLinks: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Skills", href: "/skills" },
      { name: "Projects", href: "/projects" },
      { name: "Experience", href: "/experience" },
      { name: "Services", href: "/services" },
      { name: "Resume", href: "/resume" },
      { name: "Contact", href: "/contact" },
    ],
    footerRole: "Full-Stack Web Developer • UI/UX Designer",
    footerDegree: "B.Sc. in Computer Science & Engineering • Gono Bishwabidyalay",
    footerCopyright: "© 2026 Meskatul Masabhi Shanto. All rights reserved.",
    footerTagline: "Built with Next.js, TypeScript & Tailwind CSS",
    footerShowAdminLink: true,
  });
}

export async function getProfile(): Promise<ProfileData> {
  return readJsonFile<ProfileData>("profile.json", {
    name: "Meskatul Masabhi Shanto",
    preferredName: "Shanto",
    role: "Full-Stack Web Developer • UI/UX Designer",
    subtitle: "Computer Science & Engineering Student",
    status: "AVAILABLE FOR OPPORTUNITIES",
    email: "meskatul.shanto@example.com",
    github: "https://github.com/shantodev",
    linkedin: "https://linkedin.com/in/shantodev",
    location: "Dhaka, Bangladesh",
    education: {
      degree: "Bachelor of Science in Computer Science & Engineering",
      institution: "Gono Bishwabidyalay",
      period: "2022 – 2026",
    },
    bioShort:
      "I'm Meskatul Masabhi Shanto, a Full-Stack Web Developer and UI/UX Designer focused on creating modern, scalable, responsive, and user-focused digital experiences.",
    bioLong:
      "Computer Science & Engineering student at Gono Bishwabidyalay (2022–2026) with a deep passion for building high-fidelity web experiences. Having built over 25+ frontend and web projects, I focus on bridging aesthetic interface design with resilient, clean engineering.",
    socialLinks: [
      {
        name: "GitHub",
        url: "https://github.com/shantodev",
        label: "Explore code repositories & open source",
        icon: "Github",
      },
      {
        name: "LinkedIn",
        url: "https://linkedin.com/in/shantodev",
        label: "Connect professionally on LinkedIn",
        icon: "Linkedin",
      },
      {
        name: "Email",
        url: "mailto:meskatul.shanto@example.com",
        label: "Send a direct message via email",
        icon: "Mail",
      },
    ],
  });
}

export async function getSkills(): Promise<SkillsData> {
  return readJsonFile<SkillsData>("skills.json", {
    marqueeTechnologies: [],
    skills: [],
  });
}

export async function getExperiences(): Promise<ExperienceData> {
  return readJsonFile<ExperienceData>("experience.json", {
    experiences: [],
    experiencePhilosophy: {
      title: "Experience Philosophy",
      subtitle: "",
      description: "",
      principles: [],
    },
  });
}

export async function getServices(): Promise<ServicesData> {
  return readJsonFile<ServicesData>("services.json", {
    services: [],
    workflowSteps: [],
  });
}

export async function getProjects(): Promise<Project[]> {
  const data = await readJsonFile<ProjectsData>("projects.json", { projects: [] });
  return data.projects || [];
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug);
}

// Writers
export async function saveNavigation(data: NavigationConfig): Promise<void> {
  await writeJsonFile("navigation.json", data);
}

export async function saveProfile(data: ProfileData): Promise<void> {
  await writeJsonFile("profile.json", data);
}

export async function saveSkills(data: SkillsData): Promise<void> {
  await writeJsonFile("skills.json", data);
}

export async function saveExperiences(data: ExperienceData): Promise<void> {
  await writeJsonFile("experience.json", data);
}

export async function saveServices(data: ServicesData): Promise<void> {
  await writeJsonFile("services.json", data);
}

export async function saveProjects(data: Project[]): Promise<void> {
  await writeJsonFile("projects.json", { projects: data });
}
