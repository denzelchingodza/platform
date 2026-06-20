"use client";

import { Project } from "@/lib/projects";

const statusConfig = {
  live:          { label: "LIVE",         color: "#4ade80", glow: "rgba(74,222,128,0.12)"  },
  "in-progress": { label: "IN PROGRESS",  color: "#f5a623", glow: "rgba(245,166,35,0.08)"  },
  "coming-soon": { label: "COMING SOON",  color: "#475569", glow: "rgba(107,114,128,0.04)" },
};

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const status = statusConfig[project.status];

  return (
    <div
      className="card-enter group relative flex flex-col transition-all duration-400"
      style={{
        animationDelay: `${index * 0.12}s`,
        border:     "1px solid rgba(245,166,35,0.1)",
        background: "rgba(7,7,15,0.8)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "rgba(245,166,35,0.28)";
        el.style.boxShadow   = `0 0 48px ${status.glow}`;
        el.style.transform   = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "rgba(245,166,35,0.1)";
        el.style.boxShadow   = "none";
        el.style.transform   = "translateY(0)";
      }}
    >
      {/* Corner accents */}
      <div className="absolute top-2 left-2 w-3 h-3 opacity-40 group-hover:opacity-80 transition-opacity duration-300" style={{ borderTop: "1px solid #f5a623", borderLeft: "1px solid #f5a623" }} />
      <div className="absolute top-2 right-2 w-3 h-3 opacity-40 group-hover:opacity-80 transition-opacity duration-300" style={{ borderTop: "1px solid #f5a623", borderRight: "1px solid #f5a623" }} />
      <div className="absolute bottom-2 left-2 w-3 h-3 opacity-40 group-hover:opacity-80 transition-opacity duration-300" style={{ borderBottom: "1px solid #f5a623", borderLeft: "1px solid #f5a623" }} />
      <div className="absolute bottom-2 right-2 w-3 h-3 opacity-40 group-hover:opacity-80 transition-opacity duration-300" style={{ borderBottom: "1px solid #f5a623", borderRight: "1px solid #f5a623" }} />

      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-4"
        style={{ borderBottom: "1px solid rgba(245,166,35,0.07)" }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: status.color }}
          />
          <span
            style={{
              fontFamily:    "var(--font-orbitron)",
              fontSize:      "9px",
              letterSpacing: "0.35em",
              color:         status.color,
            }}
          >
            {status.label}
          </span>
        </div>
        <span
          style={{
            fontFamily: "var(--font-orbitron)",
            fontSize:   "28px",
            fontWeight: 700,
            color:      "rgba(245,166,35,0.05)",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-5 p-6 flex-1">
        <h2
          style={{
            fontFamily:    "var(--font-orbitron)",
            fontSize:      "14px",
            color:         "#ffffff",
            letterSpacing: "0.18em",
            fontWeight:    700,
            lineHeight:    1.4,
          }}
        >
          {project.name.toUpperCase()}
        </h2>

        <div className="w-8 h-px" style={{ background: "rgba(245,166,35,0.2)" }} />

        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize:   "13px",
            color:      "rgba(255,255,255,0.4)",
            lineHeight: 1.85,
            flex:       1,
          }}
        >
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 pt-1">
          {project.tech.map((t) => (
            <span
              key={t}
              style={{
                fontFamily:    "var(--font-inter)",
                fontSize:      "11px",
                color:         "rgba(255,255,255,0.25)",
                border:        "1px solid rgba(255,255,255,0.07)",
                padding:       "3px 8px",
                letterSpacing: "0.03em",
                transition:    "all 0.2s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color       = "#f5a623";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(245,166,35,0.25)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color       = "rgba(255,255,255,0.25)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div
        className="flex gap-3 px-6 py-5"
        style={{ borderTop: "1px solid rgba(245,166,35,0.07)" }}
      >
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-xs tracking-[0.25em] transition-all duration-200"
            style={{
              fontFamily:  "var(--font-orbitron)",
              cursor:      "none",
              color:       "#f5a623",
              border:      "1px solid rgba(245,166,35,0.35)",
              background:  "rgba(245,166,35,0.06)",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background   = "rgba(245,166,35,0.12)";
              (e.currentTarget as HTMLElement).style.borderColor  = "rgba(245,166,35,0.6)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background   = "rgba(245,166,35,0.06)";
              (e.currentTarget as HTMLElement).style.borderColor  = "rgba(245,166,35,0.35)";
            }}
          >
            LIVE APP ↗
          </a>
        ) : (
          <span
            style={{
              fontFamily:    "var(--font-orbitron)",
              fontSize:      "9px",
              letterSpacing: "0.25em",
              padding:       "8px 14px",
              color:         "rgba(255,255,255,0.12)",
              border:        "1px solid rgba(255,255,255,0.05)",
            }}
          >
            IN DEVELOPMENT
          </span>
        )}

        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 text-xs tracking-[0.25em] transition-all duration-200"
          style={{
            fontFamily:  "var(--font-orbitron)",
            cursor:      "none",
            color:       "rgba(255,255,255,0.3)",
            border:      "1px solid rgba(255,255,255,0.08)",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.color       = "rgba(255,255,255,0.8)";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.color       = "rgba(255,255,255,0.3)";
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
          }}
        >
          GITHUB ↗
        </a>
      </div>
    </div>
  );
}
