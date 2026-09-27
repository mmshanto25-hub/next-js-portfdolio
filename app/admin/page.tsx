"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Lock,
  Unlock,
  Shield,
  Layers,
  Code2,
  Briefcase,
  Wrench,
  Compass,
  User,
  Mail,
  Plus,
  Trash2,
  Edit3,
  Save,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  LogOut,
  RefreshCw,
  Search,
  Sparkles,
  ArrowRight,
  Send,
  Copy,
  Clock,
  Layout,
  Sliders,
  Check,
  X,
} from "lucide-react";
import type {
  NavigationConfig,
  ProfileData,
  SkillsData,
  ExperienceData,
  ServicesData,
} from "@/lib/content";
import type { Project } from "@/data/projects";
import type { ContactMessage } from "@/app/api/messages/route";

const DEFAULT_PASSCODE = "shanto2026";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState<
    | "overview"
    | "navigation"
    | "profile"
    | "projects"
    | "skills"
    | "experience"
    | "services"
    | "inbox"
  >("overview");

  // Loaded data state
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ message: string; type: "success" | "error" } | null>(
    null
  );

  // Content states
  const [navigation, setNavigation] = useState<NavigationConfig | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [skillsData, setSkillsData] = useState<SkillsData | null>(null);
  const [experienceData, setExperienceData] = useState<ExperienceData | null>(null);
  const [servicesData, setServicesData] = useState<ServicesData | null>(null);
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  // Project editing state
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  // Skill editing state
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillCategory, setNewSkillCategory] = useState<
    "Frontend" | "Backend" | "Programming" | "Database" | "Tools" | "Design" | "Other"
  >("Frontend");
  const [newSkillDesc, setNewSkillDesc] = useState("");
  const [newSkillRelated, setNewSkillRelated] = useState("");

  // Inbox search & filter
  const [inboxSearch, setInboxSearch] = useState("");
  const [inboxFilter, setInboxFilter] = useState<"all" | "unread" | "read">("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const savedAuth = localStorage.getItem("shanto_admin_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
      fetchAllContent();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === DEFAULT_PASSCODE) {
      setIsAuthenticated(true);
      localStorage.setItem("shanto_admin_auth", "true");
      setAuthError("");
      fetchAllContent();
    } else {
      setAuthError("Incorrect passcode. Default is: shanto2026");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("shanto_admin_auth");
    setPasscode("");
  };

  const fetchAllContent = async () => {
    setIsLoading(true);
    try {
      const [contentRes, messagesRes] = await Promise.all([
        fetch("/api/admin/content"),
        fetch("/api/messages"),
      ]);
      const [contentJson, messagesJson] = await Promise.all([
        contentRes.json(),
        messagesRes.json(),
      ]);

      if (contentJson.success && contentJson.data) {
        setNavigation(contentJson.data.navigation);
        setProfile(contentJson.data.profile);
        setSkillsData(contentJson.data.skills);
        setExperienceData(contentJson.data.experience);
        setServicesData(contentJson.data.services);
        setProjectsList(contentJson.data.projects);
      }

      if (messagesJson.success && messagesJson.messages) {
        setMessages(messagesJson.messages);
      }
    } catch (err) {
      console.error("Failed to load admin content:", err);
      showNotification("Failed to load content from server", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = (message: string, type: "success" | "error" = "success") => {
    setSaveStatus({ message, type });
    setTimeout(() => setSaveStatus(null), 4000);
  };

  const saveSectionData = async (section: string, data: unknown) => {
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, data }),
      });
      const json = await res.json();
      if (json.success) {
        showNotification(`${section.toUpperCase()} updated successfully! Public UI is live.`);
      } else {
        showNotification(json.error || "Save failed", "error");
      }
    } catch (err) {
      showNotification("Error saving data to server", "error");
    }
  };

  // Handlers for Messages
  const handleToggleRead = async (id: string, currentRead: boolean) => {
    try {
      const res = await fetch("/api/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, read: !currentRead }),
      });
      const json = await res.json();
      if (json.success) setMessages(json.messages);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    try {
      const res = await fetch(`/api/messages?id=${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) setMessages(json.messages);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCopyEmail = (email: string, id: string) => {
    navigator.clipboard.writeText(email);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Handlers for Projects
  const handleSaveProjectForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    let updatedList: Project[];
    if (isCreatingProject) {
      updatedList = [editingProject, ...projectsList];
    } else {
      updatedList = projectsList.map((p) =>
        p.slug === editingProject.slug ? editingProject : p
      );
    }

    setProjectsList(updatedList);
    await saveSectionData("projects", updatedList);
    setEditingProject(null);
    setIsCreatingProject(false);
  };

  const handleDeleteProject = async (slug: string) => {
    if (!confirm(`Delete project "${slug}"?`)) return;
    const updated = projectsList.filter((p) => p.slug !== slug);
    setProjectsList(updated);
    await saveSectionData("projects", updated);
  };

  // Handlers for Skills
  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillsData || !newSkillName.trim()) return;

    const newSkill = {
      name: newSkillName.trim(),
      category: newSkillCategory,
      description: newSkillDesc.trim() || `${newSkillName} development and integration.`,
      iconName: "Code2",
      relatedTechnologies: newSkillRelated
        ? newSkillRelated.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
      featured: true,
    };

    const updatedSkills = {
      ...skillsData,
      skills: [newSkill, ...skillsData.skills],
    };

    setSkillsData(updatedSkills);
    await saveSectionData("skills", updatedSkills);
    setNewSkillName("");
    setNewSkillDesc("");
    setNewSkillRelated("");
  };

  const handleDeleteSkill = async (name: string) => {
    if (!skillsData || !confirm(`Delete skill "${name}"?`)) return;
    const updated = {
      ...skillsData,
      skills: skillsData.skills.filter((s) => s.name !== name),
    };
    setSkillsData(updated);
    await saveSectionData("skills", updated);
  };

  // 1. Login View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070B14] flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 sm:p-10 rounded-2xl bg-[#0E1526] border border-slate-800 shadow-2xl text-center">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 mx-auto flex items-center justify-center mb-6">
            <Shield className="w-7 h-7" />
          </div>

          <h1 className="text-2xl font-bold text-white font-display">SHANTO. Admin Console</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 mb-8">
            Manage your public portfolio, update navbar &amp; footer, edit projects, and review inquiries.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode (default: shanto2026)"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 text-white text-sm text-center outline-none transition-all placeholder-slate-500"
                autoFocus
              />
              {authError && <p className="text-xs text-rose-400 mt-2 font-mono">{authError}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Admin Console</span>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800 text-xs text-slate-500 flex items-center justify-center gap-2">
            <span>Default passcode:</span>
            <code className="px-2 py-0.5 rounded bg-slate-800 text-cyan-400 font-mono">
              shanto2026
            </code>
          </div>
        </div>
      </div>
    );
  }

  const unreadMessagesCount = messages.filter((m) => !m.read).length;

  // 2. Full Admin Dashboard
  return (
    <div className="min-h-screen bg-[#080D1A] text-slate-200 flex flex-col font-sans">
      {/* Top Admin Bar */}
      <header className="h-16 bg-[#0B1224] border-b border-slate-800/80 px-4 sm:px-8 flex items-center justify-between shrink-0 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black font-display text-sm">
            S
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
              <span>SHANTO CONTROL CENTER</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                LIVE SYNC
              </span>
            </h1>
          </div>
        </div>

        {/* Global Save Alert Banner */}
        {saveStatus && (
          <div
            className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium animate-fadeIn ${
              saveStatus.type === "success"
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                : "bg-rose-500/10 text-rose-400 border border-rose-500/30"
            }`}
          >
            {saveStatus.type === "success" ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            <span>{saveStatus.message}</span>
          </div>
        )}

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors border border-slate-700"
          >
            <span>Open Public Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            type="button"
            onClick={fetchAllContent}
            disabled={isLoading}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            title="Reload content"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold border border-rose-500/20 flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock</span>
          </button>
        </div>
      </header>

      {/* Main Layout Body */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-[#0B1224] border-r border-slate-800/80 p-4 shrink-0 flex md:flex-col gap-1 overflow-x-auto md:overflow-x-visible">
          {[
            { id: "overview", label: "Dashboard Overview", icon: Layout },
            {
              id: "navigation",
              label: "Navbar & Footer CMS",
              icon: Compass,
              badge: "Public UI",
            },
            { id: "profile", label: "Profile & Identity", icon: User },
            {
              id: "projects",
              label: `Projects Manager (${projectsList.length})`,
              icon: Layers,
            },
            {
              id: "skills",
              label: `Skills Matrix (${skillsData?.skills.length || 0})`,
              icon: Code2,
            },
            { id: "experience", label: "Experience & Education", icon: Briefcase },
            { id: "services", label: "Services & Workflow", icon: Wrench },
            {
              id: "inbox",
              label: "Messages Inbox",
              icon: Mail,
              badge: unreadMessagesCount > 0 ? `${unreadMessagesCount} new` : undefined,
              badgeColor: "bg-cyan-500 text-slate-950",
            },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id as typeof activeTab);
                  setEditingProject(null);
                }}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </div>
                {tab.badge && (
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                      tab.badgeColor || "bg-slate-800 text-slate-300"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Content Workspace Area */}
        <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-8 max-w-5xl">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                  System Overview
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Manage all public website content, navbar, footer, projects, and contact responses dynamically.
                </p>
              </div>

              {/* Stat Counters */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-[#0E1526] border border-slate-800">
                  <p className="text-xs font-mono text-slate-400">Total Inquiries</p>
                  <p className="text-3xl font-bold font-display text-white mt-1">
                    {messages.length}
                  </p>
                  <p className="text-[11px] text-cyan-400 mt-1">
                    {unreadMessagesCount} unread messages
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#0E1526] border border-slate-800">
                  <p className="text-xs font-mono text-slate-400">Live Projects</p>
                  <p className="text-3xl font-bold font-display text-white mt-1">
                    {projectsList.length}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {projectsList.filter((p) => p.featured).length} featured on homepage
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#0E1526] border border-slate-800">
                  <p className="text-xs font-mono text-slate-400">Cataloged Skills</p>
                  <p className="text-3xl font-bold font-display text-white mt-1">
                    {skillsData?.skills.length || 0}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">Across 7 categories</p>
                </div>

                <div className="p-5 rounded-2xl bg-[#0E1526] border border-slate-800">
                  <p className="text-xs font-mono text-slate-400">Services Offered</p>
                  <p className="text-3xl font-bold font-display text-white mt-1">
                    {servicesData?.services.length || 0}
                  </p>
                  <p className="text-[11px] text-emerald-400 mt-1">5 core disciplines</p>
                </div>
              </div>

              {/* Quick Actions Card */}
              <div className="p-6 rounded-2xl bg-[#0E1526] border border-slate-800 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-blue-400" />
                  <span>Quick Content Actions</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab("navigation")}
                    className="p-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left transition-colors group"
                  >
                    <Compass className="w-5 h-5 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
                    <h4 className="text-sm font-semibold text-white">Customize Navbar &amp; Footer</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Edit logo, public links, and footer text</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("projects");
                      setIsCreatingProject(true);
                      setEditingProject({
                        slug: `new-project-${Date.now()}`,
                        number: `0${projectsList.length + 1}`,
                        title: "New Web Application",
                        subtitle: "Modern Web Solution",
                        description: "Detailed description of this newly built application.",
                        category: "Full-Stack",
                        year: "2026",
                        image: "/projects/devpulse.svg",
                        technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
                        featured: true,
                        liveUrl: "https://shanto.dev",
                        githubUrl: "https://github.com/shantodev",
                        overview: "Project overview details.",
                        problem: "Problem statement addressed.",
                        solution: "Engineered solution details.",
                        features: ["Interactive user interface", "Server-side API routes"],
                        technologyStack: [
                          { category: "Frontend", items: ["Next.js", "TypeScript"] },
                        ],
                        designProcess: "Design process notes in Figma.",
                        developmentProcess: "Development process notes.",
                        challenges: ["State management across components"],
                        results: ["Sub-second page load times achieved"],
                      });
                    }}
                    className="p-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left transition-colors group"
                  >
                    <Plus className="w-5 h-5 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                    <h4 className="text-sm font-semibold text-white">Add New Project</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Publish a new case study to your portfolio</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("inbox")}
                    className="p-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left transition-colors group"
                  >
                    <Mail className="w-5 h-5 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
                    <h4 className="text-sm font-semibold text-white">Review Messages ({messages.length})</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Read inquiries and send email replies</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: NAVBAR & FOOTER CMS */}
          {activeTab === "navigation" && navigation && (
            <div className="space-y-8 max-w-4xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                    Public Navbar &amp; Footer CMS
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Change brand logos, public navigation menu items, CTA button, and footer credentials dynamically.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => saveSectionData("navigation", navigation)}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Navbar &amp; Footer</span>
                </button>
              </div>

              {/* Navbar Settings Card */}
              <div className="p-6 rounded-2xl bg-[#0E1526] border border-slate-800 space-y-6">
                <h3 className="text-base font-bold text-white pb-3 border-b border-slate-800 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-cyan-400" />
                  <span>Navbar Brand &amp; Call To Action</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Logo Brand Text
                    </label>
                    <input
                      type="text"
                      value={navigation.logoText}
                      onChange={(e) =>
                        setNavigation({ ...navigation, logoText: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Logo Accent Dot / Character
                    </label>
                    <input
                      type="text"
                      value={navigation.logoAccent}
                      onChange={(e) =>
                        setNavigation({ ...navigation, logoAccent: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Navbar Button Text
                    </label>
                    <input
                      type="text"
                      value={navigation.ctaButtonText}
                      onChange={(e) =>
                        setNavigation({ ...navigation, ctaButtonText: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Navbar Button Link (Destination)
                    </label>
                    <input
                      type="text"
                      value={navigation.ctaButtonHref}
                      onChange={(e) =>
                        setNavigation({ ...navigation, ctaButtonHref: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Nav Links Editor */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-xs font-mono text-slate-400">
                      Public Menu Links
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setNavigation({
                          ...navigation,
                          navLinks: [
                            ...navigation.navLinks,
                            { name: "New Link", href: "/#new" },
                          ],
                        })
                      }
                      className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Menu Item</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {navigation.navLinks.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800"
                      >
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => {
                            const updated = [...navigation.navLinks];
                            updated[idx].name = e.target.value;
                            setNavigation({ ...navigation, navLinks: updated });
                          }}
                          placeholder="Label (e.g. Projects)"
                          className="flex-1 px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-white outline-none border border-slate-700"
                        />
                        <input
                          type="text"
                          value={item.href}
                          onChange={(e) => {
                            const updated = [...navigation.navLinks];
                            updated[idx].href = e.target.value;
                            setNavigation({ ...navigation, navLinks: updated });
                          }}
                          placeholder="URL (e.g. /projects)"
                          className="flex-1 px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-mono text-cyan-300 outline-none border border-slate-700"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = navigation.navLinks.filter((_, i) => i !== idx);
                            setNavigation({ ...navigation, navLinks: updated });
                          }}
                          className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                          title="Remove menu link"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Settings Card */}
              <div className="p-6 rounded-2xl bg-[#0E1526] border border-slate-800 space-y-4">
                <h3 className="text-base font-bold text-white pb-3 border-b border-slate-800 flex items-center gap-2">
                  <Layout className="w-4 h-4 text-purple-400" />
                  <span>Footer Credentials &amp; Copyright</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Footer Role / Title
                    </label>
                    <input
                      type="text"
                      value={navigation.footerRole}
                      onChange={(e) =>
                        setNavigation({ ...navigation, footerRole: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Footer Academic Line
                    </label>
                    <input
                      type="text"
                      value={navigation.footerDegree}
                      onChange={(e) =>
                        setNavigation({ ...navigation, footerDegree: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Copyright Notice
                    </label>
                    <input
                      type="text"
                      value={navigation.footerCopyright}
                      onChange={(e) =>
                        setNavigation({ ...navigation, footerCopyright: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Tech Tagline
                    </label>
                    <input
                      type="text"
                      value={navigation.footerTagline}
                      onChange={(e) =>
                        setNavigation({ ...navigation, footerTagline: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PROFILE & IDENTITY CMS */}
          {activeTab === "profile" && profile && (
            <div className="space-y-8 max-w-4xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                    Profile &amp; Personal Identity
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Updates your name, bio, education, and social links everywhere on the portfolio.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => saveSectionData("profile", profile)}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Profile</span>
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-[#0E1526] border border-slate-800 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Preferred / Nick Name
                    </label>
                    <input
                      type="text"
                      value={profile.preferredName}
                      onChange={(e) =>
                        setProfile({ ...profile, preferredName: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Primary Professional Role
                    </label>
                    <input
                      type="text"
                      value={profile.role}
                      onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Availability Status Badge
                    </label>
                    <input
                      type="text"
                      value={profile.status}
                      onChange={(e) => setProfile({ ...profile, status: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm outline-none focus:border-blue-500 font-mono text-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Primary Contact Email
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm outline-none focus:border-blue-500 font-mono text-cyan-300"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Location
                    </label>
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      GitHub URL
                    </label>
                    <input
                      type="text"
                      value={profile.github}
                      onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm outline-none focus:border-blue-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      LinkedIn URL
                    </label>
                    <input
                      type="text"
                      value={profile.linkedin}
                      onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm outline-none focus:border-blue-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    Hero Short Bio
                  </label>
                  <textarea
                    rows={2}
                    value={profile.bioShort}
                    onChange={(e) => setProfile({ ...profile, bioShort: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    About Page Extended Bio
                  </label>
                  <textarea
                    rows={4}
                    value={profile.bioLong}
                    onChange={(e) => setProfile({ ...profile, bioLong: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm outline-none focus:border-blue-500 resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PROJECTS MANAGER */}
          {activeTab === "projects" && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                    Projects &amp; Case Studies Manager
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Add new projects, update existing case study architecture, problem, solution, and live links.
                  </p>
                </div>

                {!editingProject && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreatingProject(true);
                      setEditingProject({
                        slug: `project-${Date.now()}`,
                        number: `0${projectsList.length + 1}`,
                        title: "New Featured Project",
                        subtitle: "Application Architecture",
                        description: "Short summary of project features and implementation.",
                        category: "Full-Stack",
                        year: "2026",
                        image: "/projects/devpulse.svg",
                        technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
                        featured: true,
                        liveUrl: "https://shanto.dev",
                        githubUrl: "https://github.com/shantodev",
                        overview: "Detailed project overview.",
                        problem: "Core technical challenges.",
                        solution: "Implemented architectural solutions.",
                        features: ["Modular React component architecture"],
                        technologyStack: [{ category: "Frontend", items: ["Next.js"] }],
                        designProcess: "Wireframed and designed in Figma.",
                        developmentProcess: "Coded in Next.js 15 App Router.",
                        challenges: ["Optimizing render performance"],
                        results: ["Sub-second initial paint"],
                      });
                    }}
                    className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-lg shadow-blue-600/30"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Project</span>
                  </button>
                )}
              </div>

              {/* Editing Project Modal / Form */}
              {editingProject ? (
                <form
                  onSubmit={handleSaveProjectForm}
                  className="p-6 rounded-2xl bg-[#0E1526] border border-blue-500/40 space-y-5"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <h3 className="text-base font-bold text-white">
                      {isCreatingProject ? "Create New Project" : `Edit Project: ${editingProject.title}`}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setEditingProject(null)}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">
                        URL Slug (Unique)
                      </label>
                      <input
                        type="text"
                        value={editingProject.slug}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, slug: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white outline-none focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">
                        Project Number (e.g. 01)
                      </label>
                      <input
                        type="text"
                        value={editingProject.number}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, number: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">
                        Category
                      </label>
                      <select
                        value={editingProject.category}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            category: e.target.value as Project["category"],
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white outline-none focus:border-blue-500"
                      >
                        <option value="Frontend">Frontend</option>
                        <option value="Full-Stack">Full-Stack</option>
                        <option value="UI/UX">UI/UX</option>
                        <option value="Web Apps">Web Apps</option>
                        <option value="Experiments">Experiments</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-mono text-slate-400 mb-1">
                        Project Title
                      </label>
                      <input
                        type="text"
                        value={editingProject.title}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, title: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white outline-none focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">
                        Featured on Homepage?
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          setEditingProject({
                            ...editingProject,
                            featured: !editingProject.featured,
                          })
                        }
                        className={`w-full py-2 rounded-lg text-xs font-semibold border transition-colors ${
                          editingProject.featured
                            ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                            : "bg-slate-900 text-slate-400 border-slate-700"
                        }`}
                      >
                        {editingProject.featured ? "✓ Featured on Home" : "Standard Archive"}
                      </button>
                    </div>

                    <div className="sm:col-span-3">
                      <label className="block text-xs font-mono text-slate-400 mb-1">
                        Subtitle
                      </label>
                      <input
                        type="text"
                        value={editingProject.subtitle}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, subtitle: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label className="block text-xs font-mono text-slate-400 mb-1">
                        Description
                      </label>
                      <textarea
                        rows={2}
                        value={editingProject.description}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            description: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label className="block text-xs font-mono text-slate-400 mb-1">
                        Technologies (Comma-separated)
                      </label>
                      <input
                        type="text"
                        value={editingProject.technologies.join(", ")}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            technologies: e.target.value
                              .split(",")
                              .map((t) => t.trim())
                              .filter(Boolean),
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-cyan-300 font-mono outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">
                        Live Demo URL
                      </label>
                      <input
                        type="text"
                        value={editingProject.liveUrl}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, liveUrl: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">
                        GitHub Repository URL
                      </label>
                      <input
                        type="text"
                        value={editingProject.githubUrl}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, githubUrl: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">
                        Image / Asset Path
                      </label>
                      <input
                        type="text"
                        value={editingProject.image}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, image: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setEditingProject(null)}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-medium text-slate-300 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1.5"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Project</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* Projects List */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projectsList.map((proj) => (
                    <div
                      key={proj.slug}
                      className="p-5 rounded-2xl bg-[#0E1526] border border-slate-800 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-mono font-bold text-cyan-400">
                            {proj.number}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                            {proj.category}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-white font-display">
                          {proj.title}
                        </h4>
                        <p className="text-xs text-slate-400 line-clamp-2 mt-1 mb-3">
                          {proj.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                        <Link
                          href={`/projects/${proj.slug}`}
                          target="_blank"
                          className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium"
                        >
                          <span>Preview Case Study</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setIsCreatingProject(false);
                              setEditingProject(proj);
                            }}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                            title="Edit project"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteProject(proj.slug)}
                            className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                            title="Delete project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: SKILLS MATRIX CMS */}
          {activeTab === "skills" && skillsData && (
            <div className="space-y-6 max-w-4xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                    Skills &amp; Technology Matrix CMS
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Add new technical skills or update existing technologies displayed on your skills dashboard.
                  </p>
                </div>
              </div>

              {/* Add New Skill Form */}
              <form
                onSubmit={handleAddSkill}
                className="p-5 rounded-2xl bg-[#0E1526] border border-slate-800 space-y-3"
              >
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-cyan-400" />
                  <span>Add New Skill to Matrix</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Skill Name (e.g. Next.js)"
                      value={newSkillName}
                      onChange={(e) => setNewSkillName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white outline-none focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <select
                      value={newSkillCategory}
                      onChange={(e) =>
                        setNewSkillCategory(
                          e.target.value as typeof newSkillCategory
                        )
                      }
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white outline-none focus:border-blue-500"
                    >
                      <option value="Frontend">Frontend</option>
                      <option value="Backend">Backend</option>
                      <option value="Programming">Programming</option>
                      <option value="Database">Database</option>
                      <option value="Tools">Tools</option>
                      <option value="Design">Design</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Connected Techs (comma-separated)"
                      value={newSkillRelated}
                      onChange={(e) => setNewSkillRelated(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-cyan-300 font-mono outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Short description of technical usage..."
                    value={newSkillDesc}
                    onChange={(e) => setNewSkillDesc(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white outline-none focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1 shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Skill</span>
                  </button>
                </div>
              </form>

              {/* Skills List Table */}
              <div className="p-5 rounded-2xl bg-[#0E1526] border border-slate-800">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs font-mono text-slate-400">
                  <span>NAME &amp; CATEGORY</span>
                  <span>ACTIONS</span>
                </div>

                <div className="divide-y divide-slate-800/60 max-h-96 overflow-y-auto">
                  {skillsData.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="py-2.5 flex items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-white">{skill.name}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300">
                            {skill.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-1">{skill.description}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteSkill(skill.name)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                        title="Delete skill"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: EXPERIENCE & EDUCATION CMS */}
          {activeTab === "experience" && experienceData && (
            <div className="space-y-6 max-w-4xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                    Experience &amp; Education Timeline
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Manage job roles, university credentials, and learning philosophy.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => saveSectionData("experience", experienceData)}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Experience</span>
                </button>
              </div>

              <div className="space-y-4">
                {experienceData.experiences.map((exp, idx) => (
                  <div
                    key={exp.id}
                    className="p-5 rounded-2xl bg-[#0E1526] border border-slate-800 space-y-3"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-mono text-slate-400 mb-1">
                          Role Title
                        </label>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => {
                            const updated = [...experienceData.experiences];
                            updated[idx].role = e.target.value;
                            setExperienceData({ ...experienceData, experiences: updated });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-slate-400 mb-1">
                          Organization / Company
                        </label>
                        <input
                          type="text"
                          value={exp.organization}
                          onChange={(e) => {
                            const updated = [...experienceData.experiences];
                            updated[idx].organization = e.target.value;
                            setExperienceData({ ...experienceData, experiences: updated });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-slate-400 mb-1">
                          Duration Period
                        </label>
                        <input
                          type="text"
                          value={exp.period}
                          onChange={(e) => {
                            const updated = [...experienceData.experiences];
                            updated[idx].period = e.target.value;
                            setExperienceData({ ...experienceData, experiences: updated });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">
                        Summary
                      </label>
                      <textarea
                        rows={2}
                        value={exp.summary}
                        onChange={(e) => {
                          const updated = [...experienceData.experiences];
                          updated[idx].summary = e.target.value;
                          setExperienceData({ ...experienceData, experiences: updated });
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white outline-none focus:border-blue-500 resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: SERVICES CMS */}
          {activeTab === "services" && servicesData && (
            <div className="space-y-6 max-w-4xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                    Services &amp; Workflow CMS
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Update descriptions and deliverables for the 5 service systems.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => saveSectionData("services", servicesData)}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Services</span>
                </button>
              </div>

              <div className="space-y-4">
                {servicesData.services.map((srv, idx) => (
                  <div
                    key={srv.id}
                    className="p-5 rounded-2xl bg-[#0E1526] border border-slate-800 space-y-3"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-mono text-slate-400 mb-1">
                          Service Title
                        </label>
                        <input
                          type="text"
                          value={srv.title}
                          onChange={(e) => {
                            const updated = [...servicesData.services];
                            updated[idx].title = e.target.value;
                            setServicesData({ ...servicesData, services: updated });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-slate-400 mb-1">
                          Short Tagline
                        </label>
                        <input
                          type="text"
                          value={srv.shortDescription}
                          onChange={(e) => {
                            const updated = [...servicesData.services];
                            updated[idx].shortDescription = e.target.value;
                            setServicesData({ ...servicesData, services: updated });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">
                        Detailed Description
                      </label>
                      <textarea
                        rows={2}
                        value={srv.longDescription}
                        onChange={(e) => {
                          const updated = [...servicesData.services];
                          updated[idx].longDescription = e.target.value;
                          setServicesData({ ...servicesData, services: updated });
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white outline-none focus:border-blue-500 resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: MESSAGES INBOX */}
          {activeTab === "inbox" && (
            <div className="space-y-6 max-w-4xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                    Contact Form Messages
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Live client inquiries received through your portfolio contact form.
                  </p>
                </div>
              </div>

              {/* Filter and Search */}
              <div className="p-4 rounded-2xl bg-[#0E1526] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:max-w-xs">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={inboxSearch}
                    onChange={(e) => setInboxSearch(e.target.value)}
                    placeholder="Search sender, subject..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white outline-none"
                  />
                </div>

                <div className="flex items-center gap-1.5 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setInboxFilter("all")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                      inboxFilter === "all" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    All ({messages.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setInboxFilter("unread")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                      inboxFilter === "unread"
                        ? "bg-cyan-500 text-slate-950 font-bold"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Unread ({unreadMessagesCount})
                  </button>
                  <button
                    type="button"
                    onClick={() => setInboxFilter("read")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                      inboxFilter === "read" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Read
                  </button>
                </div>
              </div>

              {/* Message Cards */}
              <div className="space-y-3">
                {messages
                  .filter((m) => {
                    const matchesFilter =
                      inboxFilter === "all" ? true : inboxFilter === "unread" ? !m.read : m.read;
                    const matchesSearch =
                      inboxSearch === "" ||
                      m.name.toLowerCase().includes(inboxSearch.toLowerCase()) ||
                      m.email.toLowerCase().includes(inboxSearch.toLowerCase()) ||
                      m.subject.toLowerCase().includes(inboxSearch.toLowerCase()) ||
                      m.message.toLowerCase().includes(inboxSearch.toLowerCase());
                    return matchesFilter && matchesSearch;
                  })
                  .map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-5 rounded-2xl border transition-all ${
                        !msg.read
                          ? "bg-blue-950/20 border-blue-500/40"
                          : "bg-[#0E1526] border-slate-800"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              !msg.read ? "bg-cyan-400 animate-pulse" : "bg-slate-600"
                            }`}
                          />
                          <h4 className="text-sm font-bold text-white">{msg.name}</h4>
                          <span className="text-xs font-mono text-cyan-400">{msg.email}</span>
                        </div>
                        <span className="text-[11px] font-mono text-slate-500">
                          {new Date(msg.createdAt).toLocaleString()}
                        </span>
                      </div>

                      <h5 className="text-xs font-semibold text-slate-200 mb-1">{msg.subject}</h5>
                      <p className="text-xs text-slate-400 leading-relaxed bg-black/30 p-3 rounded-xl border border-slate-800/80 mb-3 whitespace-pre-wrap">
                        {msg.message}
                      </p>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2">
                          <a
                            href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Reply via Email</span>
                          </a>

                          <button
                            type="button"
                            onClick={() => handleCopyEmail(msg.email, msg.id)}
                            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1"
                          >
                            <Copy className="w-3 h-3" />
                            <span>{copiedId === msg.id ? "Copied!" : "Copy Email"}</span>
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleToggleRead(msg.id, msg.read)}
                            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-400 hover:text-white"
                          >
                            {msg.read ? "Mark Unread" : "Mark Read"}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteMessage(msg.id)}
                            className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
