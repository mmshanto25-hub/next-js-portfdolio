export interface Skill {
  name: string;
  category: "Frontend" | "Backend" | "Programming" | "Database" | "Tools" | "Design" | "Other";
  description: string;
  iconName: string;
  relatedTechnologies: string[];
  featured?: boolean;
}

export const skillCategories = [
  "All",
  "Frontend",
  "Backend",
  "Programming",
  "Database",
  "Tools",
  "Design",
  "Other",
] as const;

export type SkillCategory = (typeof skillCategories)[number];

export const skills: Skill[] = [
  // Frontend
  {
    name: "React.js",
    category: "Frontend",
    description: "Component-driven user interface library for building dynamic single-page and web applications.",
    iconName: "Atom",
    relatedTechnologies: ["Next.js", "JavaScript", "TypeScript", "Tailwind CSS"],
    featured: true,
  },
  {
    name: "Next.js",
    category: "Frontend",
    description: "React framework with App Router, server-side rendering, static site generation, and optimized routing.",
    iconName: "Globe",
    relatedTechnologies: ["React.js", "TypeScript", "Tailwind CSS", "Node.js"],
    featured: true,
  },
  {
    name: "TypeScript",
    category: "Frontend",
    description: "Strongly typed superset of JavaScript providing compile-time type safety and enhanced developer tooling.",
    iconName: "FileCode2",
    relatedTechnologies: ["JavaScript", "React.js", "Next.js", "Node.js"],
    featured: true,
  },
  {
    name: "JavaScript",
    category: "Frontend",
    description: "Core web programming language powering interactive browser experiences and asynchronous logic.",
    iconName: "Code2",
    relatedTechnologies: ["ES6+", "DOM", "TypeScript", "React.js"],
    featured: true,
  },
  {
    name: "ES6+",
    category: "Frontend",
    description: "Modern ECMAScript specifications including async/await, destructuring, arrow functions, and modules.",
    iconName: "Sparkles",
    relatedTechnologies: ["JavaScript", "TypeScript"],
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    description: "Utility-first CSS framework for rapidly crafting modern, custom, and responsive interface layouts.",
    iconName: "Palette",
    relatedTechnologies: ["CSS3", "HTML5", "Responsive Web Design"],
    featured: true,
  },
  {
    name: "HTML5",
    category: "Frontend",
    description: "Semantic markup standard structuring accessible, SEO-ready, and mobile-friendly web documents.",
    iconName: "FileText",
    relatedTechnologies: ["DOM", "CSS3", "Responsive Web Design"],
  },
  {
    name: "CSS3",
    category: "Frontend",
    description: "Modern cascading style sheets including Flexbox, CSS Grid, media queries, transitions, and custom properties.",
    iconName: "Layers",
    relatedTechnologies: ["HTML5", "Tailwind CSS", "Bootstrap"],
  },
  {
    name: "DOM",
    category: "Frontend",
    description: "Document Object Model manipulation, event bubbling, delegation, and browser API interaction.",
    iconName: "Network",
    relatedTechnologies: ["JavaScript", "HTML5"],
  },
  {
    name: "Bootstrap",
    category: "Frontend",
    description: "Responsive front-end framework for grid structures and rapid UI component prototyping.",
    iconName: "LayoutGrid",
    relatedTechnologies: ["CSS3", "HTML5"],
  },

  // Backend
  {
    name: "Node.js",
    category: "Backend",
    description: "V8-powered asynchronous runtime for executing scalable JavaScript on the server.",
    iconName: "Server",
    relatedTechnologies: ["Express.js", "REST API", "MongoDB", "PostgreSQL"],
    featured: true,
  },
  {
    name: "Express.js",
    category: "Backend",
    description: "Minimalist and flexible Node.js web application framework for building RESTful web services.",
    iconName: "Cpu",
    relatedTechnologies: ["Node.js", "REST API"],
    featured: true,
  },
  {
    name: "REST API",
    category: "Backend",
    description: "Architectural style for designing networked services with predictable CRUD endpoints and HTTP status codes.",
    iconName: "Share2",
    relatedTechnologies: ["Node.js", "Express.js", "API Integration"],
    featured: true,
  },

  // Database
  {
    name: "MongoDB",
    category: "Database",
    description: "Document-oriented NoSQL database for flexible data schemas and JSON-like document storage.",
    iconName: "Database",
    relatedTechnologies: ["Node.js", "Express.js"],
    featured: true,
  },
  {
    name: "PostgreSQL",
    category: "Database",
    description: "Advanced open-source relational database supporting robust SQL queries, indexing, and data integrity.",
    iconName: "HardDrive",
    relatedTechnologies: ["MySQL", "Node.js"],
    featured: true,
  },
  {
    name: "MySQL",
    category: "Database",
    description: "Widely used relational database management system for structured data modeling and querying.",
    iconName: "DatabaseZap",
    relatedTechnologies: ["PostgreSQL", "Backend"],
  },

  // Programming
  {
    name: "C",
    category: "Programming",
    description: "Foundational procedural systems programming language focusing on memory management and algorithms.",
    iconName: "Binary",
    relatedTechnologies: ["C++", "Computer Science"],
  },
  {
    name: "C++",
    category: "Programming",
    description: "Object-oriented programming language emphasizing high performance, data structures, and computational logic.",
    iconName: "Terminal",
    relatedTechnologies: ["C", "Object-Oriented Programming"],
    featured: true,
  },
  {
    name: "Python",
    category: "Programming",
    description: "High-level programming language utilized for scripting, automation, algorithms, and computational problem solving.",
    iconName: "FileCode",
    relatedTechnologies: ["Automation", "Backend"],
    featured: true,
  },
  {
    name: "Java",
    category: "Programming",
    description: "Class-based object-oriented language emphasizing robust typing, JVM architecture, and design patterns.",
    iconName: "Coffee",
    relatedTechnologies: ["Object-Oriented Programming", "Software Engineering"],
  },

  // Tools
  {
    name: "Git",
    category: "Tools",
    description: "Distributed version control system for tracking changes, branch workflows, and source integrity.",
    iconName: "GitBranch",
    relatedTechnologies: ["GitHub"],
    featured: true,
  },
  {
    name: "GitHub",
    category: "Tools",
    description: "Cloud-based collaboration platform for hosting repositories, code reviews, issues, and deployment integrations.",
    iconName: "GitPullRequest",
    relatedTechnologies: ["Git"],
    featured: true,
  },
  {
    name: "VS Code",
    category: "Tools",
    description: "Extensible code editor optimized for web development, debugging, and productivity tooling.",
    iconName: "Code",
    relatedTechnologies: ["TypeScript", "Git"],
  },

  // Design
  {
    name: "Figma",
    category: "Design",
    description: "Collaborative interface design tool for high-fidelity wireframing, interactive prototyping, and design systems.",
    iconName: "Figma",
    relatedTechnologies: ["UI/UX Design", "Responsive Web Design"],
    featured: true,
  },
  {
    name: "UI/UX Design",
    category: "Design",
    description: "User-centered design discipline focused on intuitive navigation, visual hierarchy, clarity, and ergonomics.",
    iconName: "Layout",
    relatedTechnologies: ["Figma", "Responsive Web Design"],
    featured: true,
  },
  {
    name: "Responsive Web Design",
    category: "Design",
    description: "Fluid grid methodologies and breakpoint strategies ensuring pixel-perfect display across all viewport sizes.",
    iconName: "Smartphone",
    relatedTechnologies: ["Tailwind CSS", "CSS3", "HTML5"],
    featured: true,
  },

  // Other
  {
    name: "API Integration",
    category: "Other",
    description: "Connecting frontend interfaces seamlessly with external APIs, handling payloads, errors, and loading states.",
    iconName: "Workflow",
    relatedTechnologies: ["REST API", "Next.js", "React.js"],
    featured: true,
  },
  {
    name: "Automation",
    category: "Other",
    description: "Scripting and workflow automation to eliminate repetitive digital tasks and improve development velocity.",
    iconName: "Zap",
    relatedTechnologies: ["Python", "JavaScript"],
  },
];

// Marquee list specified in prompt
export const marqueeTechnologies = [
  "Next.js",
  "React",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Express.js",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "Tailwind CSS",
  "Figma",
  "Git",
  "GitHub",
  "Python",
  "Java",
  "C",
  "C++",
];
