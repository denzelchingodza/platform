"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import StarField from "@/components/StarField";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/projects";
import { usePageTransition } from "@/context/TransitionContext";

type Filter = "all" | "live" | "in-progress";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all",         label: "ALL"         },
  { key: "live",        label: "LIVE"        },
  { key: "in-progress", label: "IN PROGRESS" },
];

export default function ProjectsPage() {
  const router  = useRouter();
  const { trigger } = usePageTransition();
  const [filter, setFilter] = useState<Filter>("all");

  const goHome = () => trigger(() => router.push("/"));

  const filtered = filter === "all" ? projects : projects.filter((p) => p.status === filter);

  return (
    <main className="min-h-screen relative page-enter">
      <StarField />
      <Navbar />

      <div className="relative z-10 max-w-6xl mx-auto" style={{ padding: "160px 48px 120px" }}>

        {/* Back */}
        <button
          onClick={goHome}
          className="flex items-center gap-3 mb-16 text-gray-600 hover:text-amber-400 transition-colors duration-300 group"
          style={{ cursor: "none" }}
        >
          <div
            className="flex items-center justify-center transition-all duration-300 group-hover:border-amber-400"
            style={{ width: "28px", height: "28px", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <span className="text-xs">←</span>
          </div>
          <span className="text-xs tracking-[0.4em]" style={{ fontFamily: "var(--font-orbitron)" }}>
            MISSION CONTROL
          </span>
        </button>

        {/* Header */}
        <div className="mb-20">
          <p className="text-xs tracking-[0.5em] text-gray-600 mb-5" style={{ fontFamily: "var(--font-orbitron)" }}>
            — ACTIVE MISSIONS
          </p>
          <h1 className="text-5xl text-white tracking-[0.2em] mb-6" style={{ fontFamily: "var(--font-orbitron)" }}>
            PROJECTS
          </h1>
          <div className="w-16 h-px bg-amber-400 opacity-30 mb-8" />

          {/* Stats */}
          <div className="flex items-center gap-6 mb-10">
            {[
              { dot: "bg-green-400",  label: `${projects.filter(p => p.status === "live").length} LIVE` },
              { dot: "bg-amber-400",  label: `${projects.filter(p => p.status === "in-progress").length} IN PROGRESS` },
              { dot: "bg-gray-600",   label: `${projects.length} TOTAL` },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                {i > 0 && <div className="w-px h-4 bg-white opacity-10 mr-2" />}
                <div className={`w-1.5 h-1.5 rounded-full ${s.dot} ${i < 2 ? "animate-pulse" : ""}`} />
                <span className="text-xs text-gray-600 tracking-[0.3em]" style={{ fontFamily: "var(--font-orbitron)" }}>{s.label}</span>
              </div>
            ))}
          </div>

          {/* Filter tabs */}
          <div className="flex gap-3">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className="text-xs tracking-[0.3em] px-4 py-2 transition-all duration-300"
                style={{
                  fontFamily: "var(--font-orbitron)",
                  cursor: "none",
                  border: filter === f.key ? "1px solid rgba(245,166,35,0.5)" : "1px solid rgba(255,255,255,0.08)",
                  color: filter === f.key ? "#f5a623" : "#475569",
                  background: filter === f.key ? "rgba(245,166,35,0.06)" : "transparent",
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filtered.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <p className="text-gray-400 text-xs tracking-[0.4em]" style={{ fontFamily: "var(--font-orbitron)" }}>
              NO MISSIONS FOUND
            </p>
          </div>
        )}

        {/* Bottom nav */}
        <div className="flex items-center gap-4 mt-24">
          <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, rgba(245,166,35,0.08))" }} />
          <button
            onClick={goHome}
            className="text-gray-400 hover:text-amber-400 transition-colors text-xs tracking-[0.4em]"
            style={{ fontFamily: "var(--font-orbitron)", cursor: "none" }}
          >
            ← RETURN TO DENZOS
          </button>
          <div className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, rgba(245,166,35,0.08))" }} />
        </div>

      </div>
    </main>
  );
}
