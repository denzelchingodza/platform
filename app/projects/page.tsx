"use client";

import { useRouter } from "next/navigation";
import StarField from "@/components/StarField";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/projects";
import { usePageTransition } from "@/context/TransitionContext";

export default function ProjectsPage() {
  const router = useRouter();
  const { trigger } = usePageTransition();

  const goHome = () => trigger(() => router.push("/"));

  const live       = projects.filter((p) => p.status === "live").length;
  const inProgress = projects.filter((p) => p.status === "in-progress").length;

  return (
    <main className="min-h-screen relative page-enter">
      <StarField />
      <Navbar />

      <div className="relative z-10 max-w-6xl mx-auto" style={{ padding: "144px 32px 96px" }}>

        {/* Back button */}
        <button
          onClick={goHome}
          className="flex items-center gap-3 mb-16 text-gray-600 hover:text-amber-400 transition-colors duration-300 group"
          style={{ cursor: "none" }}
        >
          <div
            className="flex items-center justify-center transition-all duration-300 group-hover:border-amber-400"
            style={{
              width: "28px", height: "28px",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
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

          {/* Status counters */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-gray-600 tracking-[0.3em]" style={{ fontFamily: "var(--font-orbitron)" }}>
                {live} LIVE
              </span>
            </div>
            <div className="w-px h-4 bg-white opacity-10" />
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs text-gray-600 tracking-[0.3em]" style={{ fontFamily: "var(--font-orbitron)" }}>
                {inProgress} IN PROGRESS
              </span>
            </div>
            <div className="w-px h-4 bg-white opacity-10" />
            <span className="text-xs text-gray-700 tracking-[0.3em]" style={{ fontFamily: "var(--font-orbitron)" }}>
              {projects.length} TOTAL
            </span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-4 mt-24">
          <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, rgba(245,166,35,0.08))" }} />
          <button
            onClick={goHome}
            className="text-gray-800 hover:text-amber-400 transition-colors text-xs tracking-[0.4em]"
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
