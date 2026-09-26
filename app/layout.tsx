import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { BackgroundGrid } from "@/components/animations/BackgroundGrid";
import { personalInfo } from "@/data/social";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050816",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://shanto.dev"),
  title: {
    default: "Meskatul Masabhi Shanto | Full-Stack Web Developer & UI/UX Designer",
    template: "%s | Meskatul Masabhi Shanto",
  },
  description:
    "Portfolio of Meskatul Masabhi Shanto — Full-Stack Web Developer and UI/UX Designer specializing in modern, responsive and user-focused digital experiences. Built 25+ frontend projects with React, Next.js, and TypeScript.",
  keywords: [
    "Meskatul Masabhi Shanto",
    "Shanto",
    "Full-Stack Web Developer",
    "UI/UX Designer",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "Tailwind CSS",
    "Computer Science and Engineering",
    "Gono Bishwabidyalay",
    "Frontend Developer",
  ],
  authors: [{ name: "Meskatul Masabhi Shanto", url: "https://shanto.dev" }],
  creator: "Meskatul Masabhi Shanto",
  publisher: "Meskatul Masabhi Shanto",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shanto.dev",
    title: "Meskatul Masabhi Shanto | Full-Stack Web Developer & UI/UX Designer",
    description:
      "Full-Stack Web Developer & UI/UX Designer focused on creating modern, scalable, responsive, and user-focused digital experiences.",
    siteName: "Meskatul Masabhi Shanto Portfolio",
    images: [
      {
        url: "/images/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Meskatul Masabhi Shanto - Full-Stack Web Developer & UI/UX Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Meskatul Masabhi Shanto | Full-Stack Web Developer & UI/UX Designer",
    description:
      "Full-Stack Web Developer & UI/UX Designer specializing in modern, responsive, and user-focused digital experiences.",
    images: ["/images/og-image.svg"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  alternates: {
    canonical: "https://shanto.dev",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Structured JSON-LD Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personalInfo.name,
    alternateName: personalInfo.preferredName,
    jobTitle: "Full-Stack Web Developer & UI/UX Designer",
    url: "https://shanto.dev",
    sameAs: [personalInfo.github, personalInfo.linkedin],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Gono Bishwabidyalay",
    },
    knowsAbout: [
      "Web Development",
      "Frontend Engineering",
      "Full-Stack Development",
      "UI/UX Design",
      "React.js",
      "Next.js",
      "TypeScript",
      "Node.js",
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background text-text-primary antialiased selection:bg-accent-blue/30 selection:text-white">
        <BackgroundGrid />
        <Navbar />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
