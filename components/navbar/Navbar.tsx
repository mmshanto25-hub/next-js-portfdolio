"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavigationConfig } from "@/lib/content";

const defaultNavConfig: NavigationConfig = {
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
};

export function Navbar() {
  const pathname = usePathname();
  const [navConfig, setNavConfig] = useState<NavigationConfig>(defaultNavConfig);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // If on admin route, do NOT render public navbar!
  const isAdminRoute = pathname?.startsWith("/admin");

  // Load dynamic nav settings
  useEffect(() => {
    async function loadNav() {
      try {
        const res = await fetch("/api/admin/content?section=navigation");
        const json = await res.json();
        if (json.success && json.data) {
          setNavConfig(json.data);
        }
      } catch (e) {
        // Fall back to defaultNavConfig
      }
    }
    loadNav();
  }, [pathname]);

  // Monitor scroll for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle ESC key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  if (isAdminRoute) {
    return null;
  }

  const { logoText, logoAccent, ctaButtonText, ctaButtonHref, navLinks } = navConfig;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "py-3 bg-[#050816]/80 backdrop-blur-xl border-b border-white/[0.08] shadow-lg shadow-black/20"
            : "py-5 bg-transparent border-b border-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between" aria-label="Main Navigation">
            {/* Logo */}
            <Link
              href="/"
              className="group flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-accent-blue/50 rounded-lg p-1"
            >
              <span className="font-display font-black text-xl tracking-tight text-white group-hover:text-accent-blue transition-colors">
                {logoText}
                <span className="text-accent-cyan">{logoAccent}</span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] backdrop-blur-md px-3 py-1.5 rounded-full shadow-inner shadow-white/5">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-3.5 py-1.5 text-xs font-medium tracking-wide transition-colors rounded-full focus:outline-none focus:ring-2 focus:ring-accent-blue/50",
                      isActive
                        ? "text-white"
                        : "text-text-secondary hover:text-white"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 bg-white/10 rounded-full border border-white/15"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Right Action: Dynamic CTA & Mobile Trigger */}
            <div className="flex items-center gap-3">
              <Link
                href={ctaButtonHref || "/contact"}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-accent-blue hover:bg-blue-600 rounded-full border border-blue-400/30 shadow-md shadow-blue-500/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-accent-blue/50"
              >
                <span>{ctaButtonText}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>

              {/* Mobile Menu Hamburger */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-text-secondary hover:text-white bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-accent-blue"
                aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Full-Screen Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-[#050816]/95 backdrop-blur-2xl flex flex-col justify-between pt-24 pb-8 px-6 lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            {/* Nav list */}
            <div className="flex flex-col gap-2 max-w-sm mx-auto w-full">
              <div className="flex items-center gap-2 mb-4 text-xs font-mono text-accent-blue tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Navigation</span>
              </div>
              {navLinks.map((link, idx) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center justify-between py-3 px-4 rounded-xl text-lg font-medium transition-colors border",
                        isActive
                          ? "bg-white/10 text-white border-white/20 font-semibold"
                          : "text-text-secondary hover:text-white hover:bg-white/5 border-transparent"
                      )}
                    >
                      <span>{link.name}</span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-accent-blue animate-pulse" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Mobile Actions */}
            <div className="max-w-sm mx-auto w-full pt-6 border-t border-white/10 flex flex-col gap-3">
              <Link
                href={ctaButtonHref || "/contact"}
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-white bg-accent-blue rounded-xl shadow-lg shadow-blue-500/25"
              >
                <span>{ctaButtonText}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <p className="text-center text-xs text-text-muted">
                Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white text-[10px]">Esc</kbd> to close
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
