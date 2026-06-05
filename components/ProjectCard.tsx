"use client";

import { Project } from "@/lib/projects";

const statusConfig = {
  live: { label: "LIVE", color: "text-green-400", dot: "bg-green-400" },
  "in-progress": { label: "IN PROGRESS", color: "text-amber-400", dot: "bg-amber-400" },
  "coming-soon": { label: "COMING SOON", color: "text-gray-500", dot: "bg-gray-500" },
};

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const status = statusConfig[project.status];

  return (
    <div
      className="card-enter relative flex flex-col"
      style={{
        animationDelay: `${index * 0.15}s`,
        border: "1px solid rgba(245,166,35,0.12)",
        background: "linear-gradient(135deg, rgba(10,10,20,0.95) 0%, rgba(7,7,15,0.98) 100%)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(245,166,35,0.35)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 40px rgba(245,166,35,0.06)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(245,166,35,0.12)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
    >
      {/* Corner brackets */}
      <div className="absolute top-2 left-2 w-3 h-3" style={{ borderTop: "1px solid rgba(245,166,35,0.4)", borderLeft: "1px solid rgba(245,166,35,0.4)" }} />
      <div className="absolute top-2 right-2 w-3 h-3" style={{ borderTop: "1px solid rgba(245,166,35,0.4)", borderRight: "1px solid rgba(245,166,35,0.4)" }} />
      <div className="absolute bottom-2 left-2 w-3 h-3" style={{ borderBottom: "1px solid rgba(245,166,35,0.4)", borderLeft: "1px solid rgba(245,166,35,0.4)" }} />
      <div className="absolute bottom-2 right-2 w-3 h-3" style={{ borderBottom: "1px solid rgba(245,166,35,0.4)", borderRight: "1px solid rgba(245,166,35,0.4)" }} />

      {/* Header bar */}
      <div
        className="flex items-center justify-between px-6 py-3"
        style={{ borderBottom: "1px solid rgba(245,166,35,0.08)" }}
      >
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${status.dot} animate-pulse`} />
          <span
            className={`text-xs tracking-[0.3em] ${status.color}`}
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            {status.label}
          </span>
        </div>
        <span
          className="text-2xl font-bold"
          style={{ color: "rgba(245,166,35,0.08)", fontFamily: "var(--font-orbitron)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-4 p-6 flex-1">
        <h2
          className="text-lg text-white tracking-widest"
          style={{ fontFamily: "var(--font-orbitron)" }}
        >
          {project.name}
        </h2>

        <p className="text-gray-500 text-sm leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-1 text-gray-600 tracking-wider"
              style={{ border: "1px solid rgba(255,255,255,0.06)" }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        className="flex gap-6 px-6 py-4"
        style={{ borderTop: "1px solid rgba(245,166,35,0.08)" }}
      >
        {project.liveUrl ? (
          
            <a 
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.3em] text-amber-400 hover:text-white transition-colors"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            LIVE APP →
          </a>
        ) : (
          <span
            className="text-xs tracking-[0.3em] text-gray-700"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            DEPLOYING...
          </span>
        )}
        
          <a 
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs tracking-[0.3em] text-gray-500 hover:text-white transition-colors"
          style={{ fontFamily: "var(--font-orbitron)" }}
        >
          GITHUB →
        </a>
      </div>
    </div>
  );
}