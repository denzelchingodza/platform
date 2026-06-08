"use client";

import { useState, useEffect, useRef } from "react";
import { projects, Project } from "@/lib/projects";

const TILT = 0.423; // cos(65°) — ellipse vertical compression

const orbitConfig = [
  { rx: 260, period: 28000, startAngle: 0 },
  { rx: 370, period: 44000, startAngle: 2.094 },
  { rx: 480, period: 65000, startAngle: 4.189 },
];

const statusConfig = {
  live:          { label: "LIVE",        color: "text-green-400", dot: "bg-green-400", glow: "0 0 16px 5px rgba(74,222,128,0.7)"  },
  "in-progress": { label: "IN PROGRESS", color: "text-amber-400", dot: "bg-amber-400", glow: "0 0 16px 5px rgba(245,166,35,0.7)"  },
  "coming-soon": { label: "COMING SOON", color: "text-gray-500",  dot: "bg-gray-500",  glow: "0 0 16px 5px rgba(107,114,128,0.4)" },
};

function useViewportScale() {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const update = () => {
      const s = Math.min(1, window.innerWidth / 1060, window.innerHeight / 900);
      setScale(Math.max(0.38, s));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return scale;
}

export default function OrbitalSystem() {
  const [selected, setSelected]   = useState<Project | null>(null);
  const [angles, setAngles]        = useState(orbitConfig.map((o) => o.startAngle));
  const lastTimeRef                = useRef<number | null>(null);
  const rafRef                     = useRef<number>();
  const scale                      = useViewportScale();

  useEffect(() => {
    const animate = (time: number) => {
      if (lastTimeRef.current === null) lastTimeRef.current = time;
      const dt = time - lastTimeRef.current;
      lastTimeRef.current = time;
      setAngles((prev) =>
        prev.map((a, i) => a + (2 * Math.PI * dt) / orbitConfig[i].period)
      );
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  return (
    <>
      {/* ── Modal ─────────────────────────────────────────────── */}
      {selected && (
        <div
          className="fixed inset-0 z-[200] flex items-end justify-center"
          onClick={() => setSelected(null)}
        >
          <div className="absolute inset-0" style={{ background: "rgba(7,7,15,0.75)" }} />
          <div
            className="relative w-full max-w-2xl mx-4 mb-0"
            style={{
              background: "rgba(7,7,15,0.98)",
              border: "1px solid rgba(245,166,35,0.2)",
              borderBottom: "none",
              animation: "slide-up 0.35s ease forwards",
              padding: "clamp(24px, 5vw, 40px)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-3 left-3 w-4 h-4" style={{ borderTop: "1px solid rgba(245,166,35,0.4)", borderLeft: "1px solid rgba(245,166,35,0.4)" }} />
            <div className="absolute top-3 right-3 w-4 h-4" style={{ borderTop: "1px solid rgba(245,166,35,0.4)", borderRight: "1px solid rgba(245,166,35,0.4)" }} />

            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-6 text-gray-700 hover:text-amber-400 transition-colors text-xs tracking-[0.3em]"
              style={{ fontFamily: "var(--font-orbitron)", cursor: "none" }}
            >
              CLOSE ✕
            </button>

            <div className="flex items-center gap-2 mb-4">
              <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${statusConfig[selected.status].dot}`} />
              <span className={`text-xs tracking-[0.3em] ${statusConfig[selected.status].color}`} style={{ fontFamily: "var(--font-orbitron)" }}>
                {statusConfig[selected.status].label}
              </span>
            </div>

            <h2 className="text-xl md:text-2xl text-white tracking-[0.2em] mb-3" style={{ fontFamily: "var(--font-orbitron)" }}>
              {selected.name}
            </h2>
            <div className="w-12 h-px bg-amber-400 opacity-20 mb-5" />
            <p className="text-gray-500 text-sm leading-relaxed mb-6">{selected.description}</p>

            <div className="flex flex-wrap gap-2 mb-8">
              {selected.tech.map((t) => (
                <span key={t} className="text-xs px-2 py-1 text-gray-600 tracking-wider"
                  style={{ border: "1px solid rgba(255,255,255,0.06)" }}>{t}</span>
              ))}
            </div>

            <div className="flex gap-6">
              {selected.liveUrl ? (
                <a href={selected.liveUrl} target="_blank" rel="noopener noreferrer"
                  className="text-xs tracking-[0.3em] text-amber-400 hover:text-white transition-colors px-4 py-2"
                  style={{ fontFamily: "var(--font-orbitron)", border: "1px solid rgba(245,166,35,0.3)", cursor: "none" }}>
                  LIVE APP ↗
                </a>
              ) : (
                <span className="text-xs tracking-[0.3em] text-gray-700" style={{ fontFamily: "var(--font-orbitron)" }}>
                  IN DEVELOPMENT
                </span>
              )}
              <a href={selected.githubUrl} target="_blank" rel="noopener noreferrer"
                className="text-xs tracking-[0.3em] text-gray-500 hover:text-white transition-colors px-4 py-2"
                style={{ fontFamily: "var(--font-orbitron)", border: "1px solid rgba(255,255,255,0.08)", cursor: "none" }}>
                GITHUB ↗
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ── Orbital system ────────────────────────────────────── */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 2 }}>

        {/* Scaled orbital wrapper */}
        <div style={{ transform: `scale(${scale})`, transformOrigin: "center center" }}>

          {/* SVG rings — visual only */}
          <svg
            style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", overflow: "visible", pointerEvents: "none" }}
            width="1" height="1"
          >
            {orbitConfig.map((orbit, i) => (
              <ellipse
                key={i}
                cx={0} cy={0}
                rx={orbit.rx}
                ry={orbit.rx * TILT}
                fill="none"
                stroke={`rgba(245,166,35,${0.18 - i * 0.04})`}
                strokeWidth={1}
                style={{ filter: `drop-shadow(0 0 6px rgba(245,166,35,${0.05 - i * 0.01}))` }}
              />
            ))}
          </svg>

          {/* Orbiting nodes */}
          {projects
            .map((project, i) => {
              const orbit  = orbitConfig[i];
              const x      = orbit.rx * Math.cos(angles[i]);
              const y      = orbit.rx * TILT * Math.sin(angles[i]);
              const depth  = Math.sin(angles[i]);
              const status = statusConfig[project.status];
              return { project, x, y, depth, status };
            })
            .sort((a, b) => a.depth - b.depth)
            .map(({ project, x, y, depth, status }) => (
              <div
                key={project.id}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  zIndex: depth > 0 ? 8 : 4,
                  transition: "transform 0.05s linear",
                }}
              >
                <div
                  onClick={() => setSelected(project)}
                  className="group flex flex-col items-center gap-2"
                  style={{
                    cursor: "none",
                    transform: "translate(-50%, -50%)",
                    scale: String(0.88 + depth * 0.12),
                  }}
                >
                  {/* Glow dot */}
                  <div className="relative flex items-center justify-center">
                    <div
                      className="absolute rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ width: "52px", height: "52px", border: `1px solid ${project.status === "live" ? "rgba(74,222,128,0.5)" : "rgba(245,166,35,0.5)"}`, animation: "ping 1.5s ease infinite" }}
                    />
                    <div
                      className="absolute rounded-full"
                      style={{ width: "34px", height: "34px", border: `1px solid ${project.status === "live" ? "rgba(74,222,128,0.2)" : "rgba(245,166,35,0.2)"}` }}
                    />
                    <div
                      className="rounded-full transition-all duration-300 group-hover:scale-150"
                      style={{
                        width: "18px", height: "18px",
                        background: project.status === "live"
                          ? "radial-gradient(circle, #4ade80 0%, rgba(74,222,128,0.5) 100%)"
                          : "radial-gradient(circle, #f5a623 0%, rgba(245,166,35,0.5) 100%)",
                        boxShadow: status.glow,
                      }}
                    />
                  </div>

                  {/* Label */}
                  <div
                    className="flex flex-col items-center gap-1 px-3 py-1.5 opacity-80 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: "rgba(4,4,12,0.95)",
                      border: `1px solid ${project.status === "live" ? "rgba(74,222,128,0.2)" : "rgba(245,166,35,0.15)"}`,
                    }}
                  >
                    <span
                      className={`whitespace-nowrap font-bold group-hover:text-amber-400 transition-colors ${project.status === "live" ? "text-green-400" : "text-white"}`}
                      style={{ fontFamily: "var(--font-orbitron)", fontSize: "10px", letterSpacing: "0.15em" }}
                    >
                      {project.name.toUpperCase()}
                    </span>
                    <span
                      className={status.color}
                      style={{ fontFamily: "var(--font-orbitron)", fontSize: "7px", letterSpacing: "0.2em" }}
                    >
                      {status.label}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Black hole — not scaled, always centered */}
        <div className="absolute flex items-center justify-center" style={{ zIndex: 10, pointerEvents: "none" }}>
          <div className="absolute rounded-full" style={{ width: "320px", height: "320px", border: "1px solid rgba(245,166,35,0.07)", boxShadow: "0 0 60px 20px rgba(245,166,35,0.03)" }} />
          <div className="absolute rounded-full" style={{ width: "290px", height: "290px", background: "radial-gradient(circle, rgba(245,166,35,0.05) 0%, transparent 70%)" }} />
          <div
            className="rounded-full flex flex-col items-center justify-center gap-2"
            style={{
              width: "clamp(180px, 22vw, 260px)",
              height: "clamp(180px, 22vw, 260px)",
              background: "radial-gradient(circle, #020207 55%, #07070f 100%)",
              boxShadow: "0 0 100px 50px #07070f",
            }}
          >
            <p className="text-gray-800 text-xs tracking-[0.5em]" style={{ fontFamily: "var(--font-orbitron)" }}>MISSION</p>
            <h1 className="font-bold tracking-widest text-amber-400 glow-amber" style={{ fontFamily: "var(--font-orbitron)", fontSize: "clamp(18px, 2.5vw, 32px)" }}>
              DENZOS
            </h1>
            <p className="text-gray-800 text-xs tracking-widest" style={{ fontFamily: "var(--font-orbitron)" }}>DENZ-001</p>
          </div>
        </div>

      </div>
    </>
  );
}
