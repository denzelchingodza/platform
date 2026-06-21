"use client";

import { useState, useEffect, useRef } from "react";
import { projects, Project } from "@/lib/projects";

const TILT = 0.32; // flatter/more 3-D perspective tilt (cos ~71°)

const orbitConfig = [
  { rx: 210, period: 28000, startAngle: 0      },
  { rx: 295, period: 44000, startAngle: 2.094  },
  { rx: 375, period: 65000, startAngle: 4.189  },
  { rx: 450, period: 88000, startAngle: 1.047  },
];

const statusConfig = {
  live:          { label: "LIVE",        color: "#4ade80", glow: "0 0 18px 6px rgba(74,222,128,0.75)"  },
  "in-progress": { label: "IN PROGRESS", color: "#f5a623", glow: "0 0 18px 6px rgba(245,166,35,0.75)"  },
  "coming-soon": { label: "COMING SOON", color: "#6b7280", glow: "0 0 18px 6px rgba(107,114,128,0.4)"  },
};

function useViewportScale(containerRef: React.RefObject<HTMLDivElement | null>) {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      const s = Math.min(1, width / 960, height / 960);
      setScale(Math.max(0.35, s));
    };
    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [containerRef]);
  return scale;
}

export default function OrbitalSystem() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [angles, setAngles]     = useState(orbitConfig.map(o => o.startAngle));
  const lastTimeRef             = useRef<number | null>(null);
  const rafRef                  = useRef<number | null>(null);
  const containerRef            = useRef<HTMLDivElement>(null);
  const scale                   = useViewportScale(containerRef);

  useEffect(() => {
    const animate = (time: number) => {
      if (lastTimeRef.current === null) lastTimeRef.current = time;
      const dt = Math.min(time - lastTimeRef.current, 50); // cap to prevent jump on re-render
      lastTimeRef.current = time;
      setAngles(prev => prev.map((a, i) => a + (2 * Math.PI * dt) / orbitConfig[i].period));
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  const C = 480; // centre of the 960×960 canvas

  return (
    <div className="absolute inset-0 flex" style={{ zIndex: 2 }}>

      {/* ── LEFT PANEL — project details ─────────────────────── */}
      <div
        className="flex flex-col justify-center"
        style={{
          width:    "42%",
          padding:  "0 clamp(32px, 5vw, 72px)",
          flexShrink: 0,
        }}
      >
        {selected ? (
          <div
            key={selected.id}
            style={{ animation: "fadeUp 0.4s ease both" }}
          >
            {/* Status badge */}
            <div className="flex items-center gap-2 mb-5">
              <div style={{
                width: "7px", height: "7px", borderRadius: "50%",
                background: statusConfig[selected.status].color,
                boxShadow: statusConfig[selected.status].glow,
                animation: "pulse 2s ease infinite",
              }} />
              <span style={{
                fontFamily:    "var(--font-orbitron)",
                fontSize:      "9px",
                letterSpacing: "0.35em",
                color:         statusConfig[selected.status].color,
              }}>
                {statusConfig[selected.status].label}
              </span>
            </div>

            <h2 style={{
              fontFamily:    "var(--font-orbitron)",
              fontSize:      "clamp(20px, 2.4vw, 30px)",
              color:         "#fff",
              letterSpacing: "0.18em",
              fontWeight:    700,
              marginBottom:  "14px",
            }}>
              {selected.name.toUpperCase()}
            </h2>

            <div style={{
              width: "40px", height: "1px",
              background: "rgba(245,166,35,0.3)",
              marginBottom: "20px",
            }} />

            <p style={{
              fontFamily:  "var(--font-orbitron)",
              fontSize:    "11px",
              color:       "#64748b",
              lineHeight:  1.9,
              letterSpacing: "0.03em",
              marginBottom: "24px",
              maxWidth:    "400px",
            }}>
              {selected.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {selected.tech.map(t => (
                <span key={t} style={{
                  fontFamily:    "var(--font-orbitron)",
                  fontSize:      "8px",
                  letterSpacing: "0.2em",
                  color:         "#334155",
                  border:        "1px solid rgba(255,255,255,0.07)",
                  padding:       "4px 10px",
                }}>
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4">
              {selected.liveUrl ? (
                <a
                  href={selected.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily:    "var(--font-orbitron)",
                    fontSize:      "9px",
                    letterSpacing: "0.3em",
                    color:         "#f5a623",
                    border:        "1px solid rgba(245,166,35,0.3)",
                    padding:       "10px 20px",
                    textDecoration: "none",
                    transition:    "all 0.25s",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background     = "rgba(245,166,35,0.08)";
                    (e.currentTarget as HTMLElement).style.borderColor    = "rgba(245,166,35,0.6)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background     = "transparent";
                    (e.currentTarget as HTMLElement).style.borderColor    = "rgba(245,166,35,0.3)";
                  }}
                >
                  LIVE APP ↗
                </a>
              ) : (
                <span style={{
                  fontFamily:    "var(--font-orbitron)",
                  fontSize:      "9px",
                  letterSpacing: "0.3em",
                  color:         "#1e293b",
                }}>
                  IN DEVELOPMENT
                </span>
              )}
              <a
                href={selected.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily:    "var(--font-orbitron)",
                  fontSize:      "9px",
                  letterSpacing: "0.3em",
                  color:         "#475569",
                  border:        "1px solid rgba(255,255,255,0.07)",
                  padding:       "10px 20px",
                  textDecoration: "none",
                  transition:    "all 0.25s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color         = "#fff";
                  (e.currentTarget as HTMLElement).style.borderColor   = "rgba(255,255,255,0.2)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color         = "#475569";
                  (e.currentTarget as HTMLElement).style.borderColor   = "rgba(255,255,255,0.07)";
                }}
              >
                GITHUB ↗
              </a>
            </div>

            <button
              onClick={() => setSelected(null)}
              style={{
                fontFamily:    "var(--font-orbitron)",
                fontSize:      "8px",
                letterSpacing: "0.3em",
                color:         "#1e293b",
                background:    "none",
                border:        "none",
                cursor:        "none",
                marginTop:     "28px",
                transition:    "color 0.2s",
                padding:       0,
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#475569")}
              onMouseLeave={e => (e.currentTarget.style.color = "#1e293b")}
            >
              ← BACK TO OVERVIEW
            </button>
          </div>
        ) : (
          // Default hint when nothing is selected
          <div style={{ animation: "fadeIn 1s ease both" }}>
            <p style={{
              fontFamily:    "var(--font-orbitron)",
              fontSize:      "9px",
              color:         "#f5a623",
              letterSpacing: "0.5em",
              marginBottom:  "16px",
            }}>
              — ACTIVE MISSIONS
            </p>
            <h2 style={{
              fontFamily:    "var(--font-orbitron)",
              fontSize:      "clamp(28px,3.5vw,46px)",
              color:         "#fff",
              letterSpacing: "0.15em",
              fontWeight:    700,
              lineHeight:    1.2,
              marginBottom:  "20px",
            }}>
              {projects.filter(p => p.status === "live").length} SYSTEMS<br />
              <span style={{ color: "#4ade80" }}>ONLINE</span>
            </h2>
            <div style={{
              width: "40px", height: "1px",
              background: "rgba(245,166,35,0.25)",
              marginBottom: "20px",
            }} />
            <p style={{
              fontFamily:    "var(--font-orbitron)",
              fontSize:      "10px",
              color:         "#334155",
              letterSpacing: "0.1em",
              lineHeight:    1.8,
              maxWidth:      "300px",
            }}>
              Click any orbiting satellite to explore the project.
            </p>
          </div>
        )}
      </div>

      {/* ── RIGHT PANEL — orbital visualization ─────────────── */}
      <div
        ref={containerRef}
        style={{
          flex:     1,
          position: "relative",
          display:  "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "visible",
        }}
      >
        <div style={{
          position:        "relative",
          width:           "960px",
          height:          "960px",
          transform:       `scale(${scale})`,
          transformOrigin: "center center",
          flexShrink:      0,
        }}>

          {/* SVG — full-canvas, rings drawn at centre (C, C) */}
          <svg
            style={{
              position:      "absolute",
              left:          0,
              top:           0,
              pointerEvents: "none",
              zIndex:        2,
            }}
            width="960"
            height="960"
            viewBox="0 0 960 960"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Accretion disc — tight rings around core */}
            {[
              { rx: 145, opacity: 0.28, width: 3.0 },
              { rx: 128, opacity: 0.18, width: 1.8 },
              { rx: 115, opacity: 0.35, width: 4.0 },
              { rx: 105, opacity: 0.14, width: 1.2 },
            ].map((d, i) => (
              <ellipse
                key={`disc-${i}`}
                cx={C} cy={C}
                rx={d.rx}
                ry={d.rx * TILT}
                fill="none"
                stroke={`rgba(245,166,35,${d.opacity})`}
                strokeWidth={d.width}
              />
            ))}

            {/* Orbital paths */}
            {orbitConfig.map((orbit, i) => (
              <g key={i}>
                {/* Soft glow halo */}
                <ellipse
                  cx={C} cy={C}
                  rx={orbit.rx}
                  ry={orbit.rx * TILT}
                  fill="none"
                  stroke={`rgba(245,166,35,0.12)`}
                  strokeWidth={14}
                />
                {/* Sharp ring */}
                <ellipse
                  cx={C} cy={C}
                  rx={orbit.rx}
                  ry={orbit.rx * TILT}
                  fill="none"
                  stroke={`rgba(245,166,35,${0.65 - i * 0.08})`}
                  strokeWidth={1.6}
                />
              </g>
            ))}
          </svg>

          {/* Black hole core — z-index 10 */}
          <div style={{
            position:  "absolute",
            left:      `${C}px`,
            top:       `${C}px`,
            transform: "translate(-50%, -50%)",
            zIndex:    10,
            pointerEvents: "none",
          }}>
            {/* Outer ambient glow */}
            <div style={{
              position:     "absolute",
              width:        "280px",
              height:       "280px",
              left:         "110px",
              top:          "110px",
              transform:    "translate(-50%, -50%)",
              borderRadius: "50%",
              background:   "radial-gradient(circle, rgba(245,166,35,0.05) 0%, transparent 65%)",
            }} />
            {/* Core sphere */}
            <div
              className="rounded-full flex flex-col items-center justify-center gap-2"
              style={{
                width:      "220px",
                height:     "220px",
                background: "radial-gradient(circle, #020207 55%, #07070f 100%)",
                boxShadow:  "0 0 100px 50px #07070f, 0 0 40px 8px rgba(245,166,35,0.07)",
              }}
            >
              <p style={{ fontFamily: "var(--font-orbitron)", fontSize: "8px", color: "#374151", letterSpacing: "0.55em" }}>
                MISSION
              </p>
              <h1 style={{ fontFamily: "var(--font-orbitron)", fontSize: "26px", color: "#f5a623", letterSpacing: "0.2em", fontWeight: 700, textShadow: "0 0 30px rgba(245,166,35,0.5)" }}>
                DENZOS
              </h1>
              <p style={{ fontFamily: "var(--font-orbitron)", fontSize: "7px", color: "#374151", letterSpacing: "0.4em" }}>
                DENZ-001
              </p>
            </div>
          </div>

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
                  position:  "absolute",
                  left:      `${C + x}px`,
                  top:       `${C + y}px`,
                  transform: "translate(-50%, -50%)",
                  zIndex:    depth > 0 ? 15 : 5,
                }}
              >
                <div
                  onClick={() => setSelected(selected?.id === project.id ? null : project)}
                  className="group flex flex-col items-center gap-2"
                  style={{
                    cursor:     "none",
                    transform:  `scale(${0.82 + depth * 0.18})`,
                    transition: "transform 0.08s linear",
                  }}
                >
                  {/* Planet dot */}
                  <div className="relative flex items-center justify-center">
                    {/* Ping ring on hover */}
                    <div
                      className="absolute rounded-full opacity-0 group-hover:opacity-100"
                      style={{
                        width:     "50px",
                        height:    "50px",
                        border:    `1px solid ${status.color}88`,
                        animation: "ping 1.6s ease infinite",
                        transition: "opacity 0.3s",
                      }}
                    />
                    {/* Outer ring */}
                    <div
                      className="absolute rounded-full"
                      style={{
                        width:  "30px",
                        height: "30px",
                        border: `1px solid ${status.color}33`,
                      }}
                    />
                    {/* Planet core */}
                    <div
                      className="rounded-full group-hover:scale-150 transition-transform duration-300"
                      style={{
                        width:      "14px",
                        height:     "14px",
                        background: `radial-gradient(circle, ${status.color} 0%, ${status.color}80 100%)`,
                        boxShadow:  status.glow,
                      }}
                    />
                  </div>

                  {/* Label */}
                  <div
                    className="flex flex-col items-center gap-0.5 px-3 py-1.5 transition-opacity"
                    style={{
                      opacity:    selected?.id === project.id ? 1 : 0.75,
                      background: "rgba(4,4,12,0.92)",
                      border:     `1px solid ${status.color}22`,
                    }}
                  >
                    <span style={{
                      fontFamily:    "var(--font-orbitron)",
                      fontSize:      "9px",
                      letterSpacing: "0.15em",
                      color:         selected?.id === project.id ? "#f5a623" : status.color,
                      whiteSpace:    "nowrap",
                      fontWeight:    700,
                    }}>
                      {project.name.toUpperCase()}
                    </span>
                    <span style={{
                      fontFamily:    "var(--font-orbitron)",
                      fontSize:      "6px",
                      letterSpacing: "0.25em",
                      color:         status.color,
                      opacity:       0.8,
                    }}>
                      {status.label}
                    </span>
                  </div>
                </div>
              </div>
            ))}

        </div>
      </div>
    </div>
  );
}
