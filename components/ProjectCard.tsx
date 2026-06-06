"use client";

import { Project } from "@/lib/projects";

const statusConfig = {
  live:          { label: "LIVE",         color: "text-green-400",  dot: "bg-green-400",  glow: "rgba(74,222,128,0.15)"  },
  "in-progress": { label: "IN PROGRESS",  color: "text-amber-400",  dot: "bg-amber-400",  glow: "rgba(245,166,35,0.10)"  },
  "coming-soon": { label: "COMING SOON",  color: "text-gray-500",   dot: "bg-gray-500",   glow: "rgba(107,114,128,0.06)" },
};

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const status = statusConfig[project.status];

  return (
    <div
      className="card-enter group relative flex flex-col transition-all duration-500"
      style={{
        animationDelay: `${index * 0.15}s`,
        border: "1px solid rgba(245,166,35,0.12)",
        background: "linear-gradient(145deg, rgba(12,12,22,0.98) 0%, rgba(7,7,15,1) 100%)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "rgba(245,166,35,0.3)";
        el.style.boxShadow = `0 0 60px ${status.glow}, 0 0 0 1px rgba(245,166,35,0.05) inset`;
        el.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "rgba(245,166,35,0.12)";
        el.style.boxShadow = "none";
        el.style.transform = "translateY(0)";
      }}
    >
      {/* Corner brackets */}
      <div className="absolute top-2 left-2 w-3 h-3 transition-all duration-300 group-hover:w-4 group-hover:h-4" style={{ borderTop: "1px solid rgba(245,166,35,0.5)", borderLeft: "1px solid rgba(245,166,35,0.5)" }} />
      <div className="absolute top-2 right-2 w-3 h-3 transition-all duration-300 group-hover:w-4 group-hover:h-4" style={{ borderTop: "1px solid rgba(245,166,35,0.5)", borderRight: "1px solid rgba(245,166,35,0.5)" }} />
      <div className="absolute bottom-2 left-2 w-3 h-3 transition-all duration-300 group-hover:w-4 group-hover:h-4" style={{ borderBottom: "1px solid rgba(245,166,35,0.5)", borderLeft: "1px solid rgba(245,166,35,0.5)" }} />
      <div className="absolute bottom-2 right-2 w-3 h-3 transition-all duration-300 group-hover:w-4 group-hover:h-4" style={{ borderBottom: "1px solid rgba(245,166,35,0.5)", borderRight: "1px solid rgba(245,166,35,0.5)" }} />

      {/* Scan line on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
        style={{
          background: "linear-gradient(180deg, transparent 0%, rgba(245,166,35,0.02) 50%, transparent 100%)",
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid rgba(245,166,35,0.08)" }}>
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${status.dot} animate-pulse`} />
          <span className={`text-xs tracking-[0.3em] ${status.color}`} style={{ fontFamily: "var(--font-orbitron)" }}>
            {status.label}
          </span>
        </div>
        <span className="text-3xl font-bold" style={{ color: "rgba(245,166,35,0.06)", fontFamily: "var(--font-orbitron)" }}>
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-4 p-6 flex-1">
        <h2 className="text-lg text-white tracking-widest leading-snug" style={{ fontFamily: "var(--font-orbitron)" }}>
          {project.name}
        </h2>

        <div className="w-8 h-px bg-amber-400 opacity-20" />

        <p className="text-gray-500 text-sm leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-1 text-gray-600 tracking-wider hover:text-gray-400 transition-colors duration-200"
              style={{ border: "1px solid rgba(255,255,255,0.06)", fontFamily: "var(--font-orbitron)", fontSize: "9px" }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 px-6 py-5" style={{ borderTop: "1px solid rgba(245,166,35,0.08)" }}>
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-xs tracking-[0.2em] text-black font-bold transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #f5a623, #f0c040)",
              fontFamily: "var(--font-orbitron)",
              cursor: "none",
            }}
          >
            LIVE APP
            <span className="text-xs">↗</span>
          </a>
        ) : (
          <span
            className="flex items-center gap-2 px-4 py-2 text-xs tracking-[0.2em] text-gray-700"
            style={{
              border: "1px solid rgba(255,255,255,0.05)",
              fontFamily: "var(--font-orbitron)",
            }}
          >
            IN DEVELOPMENT
          </span>
        )}

        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 text-xs tracking-[0.2em] text-gray-400 hover:text-white hover:border-gray-500 transition-all duration-200 active:scale-95"
          style={{
            border: "1px solid rgba(255,255,255,0.1)",
            fontFamily: "var(--font-orbitron)",
            cursor: "none",
          }}
        >
          GITHUB
          <span className="text-xs">↗</span>
        </a>
      </div>
    </div>
  );
}
