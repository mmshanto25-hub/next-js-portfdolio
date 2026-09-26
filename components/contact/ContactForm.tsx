"use client";

import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import type { ContactRequestBody } from "@/app/api/contact/route";
import { personalInfo } from "@/data/social";

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<ContactRequestBody>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "opened">("idle");

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = "Please enter your name (min 2 characters).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      newErrors.subject = "Please enter a subject (min 3 characters).";
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = "Please write a message of at least 10 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const subject = encodeURIComponent(formData.subject.trim());
    const body = encodeURIComponent(
      `Name: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\n\n${formData.message.trim()}`
    );

    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
    setStatus("opened");
  };

  return (
    <div className="p-6 sm:p-10 rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl shadow-2xl">
      <h3 className="text-xl sm:text-2xl font-bold text-white font-display mb-2">
        Send a Direct Message
      </h3>
      <p className="text-xs sm:text-sm text-text-secondary mb-8">
        Fill out the form below and I will respond to your inquiry promptly.
      </p>

      {status === "opened" ? (
        <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="text-lg font-bold text-white font-display">Email Draft Ready</h4>
          <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto">
            Your email app should open with the message filled in. Send it there to complete your inquiry.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-4 px-5 py-2 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/15 transition-colors border border-white/10"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Name & Email Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-mono uppercase tracking-wider text-text-secondary mb-2"
              >
                Your Name <span className="text-accent-blue">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Jane Doe"
                className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border text-white text-sm outline-none transition-all placeholder-text-muted focus:ring-2 focus:ring-accent-blue/30 ${
                  errors.name
                    ? "border-rose-500/60 focus:border-rose-500"
                    : "border-white/[0.08] focus:border-accent-blue"
                }`}
              />
              {errors.name && (
                <p className="text-[11px] text-rose-400 mt-1.5">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-mono uppercase tracking-wider text-text-secondary mb-2"
              >
                Your Email <span className="text-accent-blue">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="jane@example.com"
                className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border text-white text-sm outline-none transition-all placeholder-text-muted focus:ring-2 focus:ring-accent-blue/30 ${
                  errors.email
                    ? "border-rose-500/60 focus:border-rose-500"
                    : "border-white/[0.08] focus:border-accent-blue"
                }`}
              />
              {errors.email && (
                <p className="text-[11px] text-rose-400 mt-1.5">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Subject Field */}
          <div>
            <label
              htmlFor="subject"
              className="block text-xs font-mono uppercase tracking-wider text-text-secondary mb-2"
            >
              Subject <span className="text-accent-blue">*</span>
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Project Inquiry / Frontend Development"
              className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border text-white text-sm outline-none transition-all placeholder-text-muted focus:ring-2 focus:ring-accent-blue/30 ${
                errors.subject
                  ? "border-rose-500/60 focus:border-rose-500"
                  : "border-white/[0.08] focus:border-accent-blue"
              }`}
            />
            {errors.subject && (
              <p className="text-[11px] text-rose-400 mt-1.5">{errors.subject}</p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="message"
              className="block text-xs font-mono uppercase tracking-wider text-text-secondary mb-2"
            >
              Message <span className="text-accent-blue">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your project, timeline, or opportunity..."
              className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border text-white text-sm outline-none transition-all placeholder-text-muted focus:ring-2 focus:ring-accent-blue/30 resize-none ${
                errors.message
                  ? "border-rose-500/60 focus:border-rose-500"
                  : "border-white/[0.08] focus:border-accent-blue"
              }`}
            />
            {errors.message && (
              <p className="text-[11px] text-rose-400 mt-1.5">{errors.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-xl bg-accent-blue hover:bg-blue-600 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 disabled:opacity-60 disabled:pointer-events-none hover:scale-[1.01] active:scale-[0.99]"
          >
            <span>Open Email App</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      )}
    </div>
  );
}
