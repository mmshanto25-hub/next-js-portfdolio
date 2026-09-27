"use client";

import React from "react";
import { Printer, Download } from "lucide-react";

export function PrintResumeButton() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={handlePrint}
        className="px-5 py-2.5 rounded-xl bg-accent-blue hover:bg-blue-600 text-white text-xs sm:text-sm font-semibold inline-flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
      >
        <Download className="w-4 h-4" />
        <span>Download CV</span>
      </button>

      <button
        type="button"
        onClick={handlePrint}
        className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs sm:text-sm font-medium border border-white/10 inline-flex items-center gap-2 transition-colors"
      >
        <Printer className="w-4 h-4 text-accent-cyan" />
        <span className="hidden sm:inline">Print Version</span>
      </button>
    </div>
  );
}
