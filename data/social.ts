export interface SocialLink {
  name: string;
  url: string;
  label: string;
  icon: string;
}

export const personalInfo = {
  name: "Meskatul Masabhi Shanto",
  preferredName: "Shanto",
  role: "Full-Stack Web Developer • UI/UX Designer",
  subtitle: "Computer Science & Engineering Student",
  status: "AVAILABLE FOR OPPORTUNITIES",
  email: "mmshanto25@gmail.com",
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
};

export const socialLinks: SocialLink[] = [
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
    url: "mailto:mmshanto25@gmail.com",
    label: "Send a direct message via email",
    icon: "Mail",
  },
];
