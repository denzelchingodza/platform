"use client";

import { useState, useEffect, useRef } from "react";

// Pre-generated star positions (deterministic, looks random)
const STARS = Array.from({ length: 120 }, (_, i) => ({
  x: (i * 137.508) % 100,
  y: (i * 97.413) % 100,
  size: i % 5 === 0 ? 2 : 1,
  opacity: 0.15 + (i % 6) * 0.08,
  delay: (i % 30) * 0.1,
}));

const LINES = [
  { id: "tag",      delay: 0.8,  content: "tag" },
  { id: "name",     delay: 2.2,  content: "DENZEL CHINGODZA" },
  { id: "role",     delay: 3.6,  content: "SOFTWARE ENGINEER  ·  AI SYSTEMS  ·  SOUTH AFRICA" },
  { id: "divider",  delay: 5.1,  content: "divider" },
  { id: "title",    delay: 6.4,  content: "DENZOS" },
  { id: "sub",      delay: 8.0,  content: "A LIVE SOFTWARE ECOSYSTEM" },
];

export default function IntroScreen({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible]         = useState(true);
  const [starsIn, setStarsIn]         = useState(false);
  const [shown, setShown]             = useState<Set<string>>(new Set());
  const [showEnter, setShowEnter]     = useState(false);
  const [exiting, setExiting]         = useState(false);
  const doneRef                       = useRef(false);

  const complete = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setExiting(true);
    sessionStorage.setItem("denzos-intro", "seen");
    setTimeout(() => {
      setVisible(false);
      onComplete();
    }, 900);
  };

  useEffect(() => {
    if (sessionStorage.getItem("denzos-intro") === "seen") {
      setVisible(false);
      onComplete();
      return;
    }

    // Stars fade in
    setTimeout(() => setStarsIn(true), 200);

    // Lines appear
    LINES.forEach((line) => {
      setTimeout(() => {
        setShown((prev) => new Set(prev).add(line.id));
      }, line.delay * 1000);
    });

    // Enter button
    setTimeout(() => setShowEnter(true), 9600);

    // Auto-complete
    const auto = setTimeout(complete, 14000);
    return () => clearTimeout(auto);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  const lineStyle = (id: string): React.CSSProperties => ({
    opacity: shown.has(id) ? 1 : 0,
    transform: shown.has(id) ? "translateY(0)" : "translateY(10px)",
    transition: "opacity 1.4s ease, transform 1.4s ease",
  });

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{
        zIndex: 99999,
        background: "#000",
        opacity: exiting ? 0 : 1,
        transition: "opacity 0.9s ease",
      }}
    >
      {/* Stars */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: starsIn ? 1 : 0, transition: "opacity 2s ease" }}
      >
        {STARS.map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              opacity: s.opacity,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Subtle amber radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(245,166,35,0.04) 0%, transparent 70%)",
          opacity: shown.has("title") ? 1 : 0,
          transition: "opacity 2s ease",
        }}
      />

      {/* Content */}
      <div className="flex flex-col items-center gap-6 text-center px-8 relative z-10">

        {/* Tag */}
        <div style={lineStyle("tag")}>
          <p style={{ fontFamily: "var(--font-orbitron)", fontSize: "10px", color: "#f5a623", letterSpacing: "0.6em" }}>
            [ TRANSMISSION RECEIVED ]
          </p>
        </div>

        {/* Name */}
        <div style={lineStyle("name")}>
          <h2 style={{ fontFamily: "var(--font-orbitron)", fontSize: "clamp(24px, 4vw, 42px)", color: "#fff", letterSpacing: "0.25em", fontWeight: 700 }}>
            DENZEL CHINGODZA
          </h2>
        </div>

        {/* Role */}
        <div style={lineStyle("role")}>
          <p style={{ fontFamily: "var(--font-orbitron)", fontSize: "10px", color: "#475569", letterSpacing: "0.3em" }}>
            SOFTWARE ENGINEER &nbsp;·&nbsp; AI SYSTEMS &nbsp;·&nbsp; SOUTH AFRICA
          </p>
        </div>

        {/* Divider */}
        <div style={{ ...lineStyle("divider"), width: "100%", display: "flex", justifyContent: "center" }}>
          <div style={{ width: "180px", height: "1px", background: "linear-gradient(to right, transparent, rgba(245,166,35,0.3), transparent)" }} />
        </div>

        {/* DENZOS */}
        <div style={lineStyle("title")}>
          <h1
            style={{
              fontFamily: "var(--font-orbitron)",
              fontSize: "clamp(56px, 10vw, 96px)",
              color: "#f5a623",
              letterSpacing: "0.3em",
              fontWeight: 700,
              textShadow: "0 0 60px rgba(245,166,35,0.5), 0 0 120px rgba(245,166,35,0.2), 0 0 200px rgba(245,166,35,0.08)",
            }}
          >
            DENZOS
          </h1>
        </div>

        {/* Subtitle */}
        <div style={lineStyle("sub")}>
          <p style={{ fontFamily: "var(--font-orbitron)", fontSize: "10px", color: "#334155", letterSpacing: "0.5em" }}>
            A LIVE SOFTWARE ECOSYSTEM
          </p>
        </div>

        {/* Enter button */}
        <div style={{ opacity: showEnter ? 1 : 0, transition: "opacity 1.2s ease", marginTop: "40px" }}>
          <button
            onClick={complete}
            style={{
              fontFamily: "var(--font-orbitron)",
              fontSize: "10px",
              color: "#f5a623",
              letterSpacing: "0.4em",
              border: "1px solid rgba(245,166,35,0.3)",
              padding: "14px 36px",
              background: "transparent",
              cursor: "none",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(245,166,35,0.08)";
              e.currentTarget.style.borderColor = "rgba(245,166,35,0.6)";
              e.currentTarget.style.boxShadow = "0 0 30px rgba(245,166,35,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(245,166,35,0.3)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            ENTER MISSION CONTROL ▶
          </button>
        </div>
      </div>

      {/* Skip */}
      <button
        onClick={complete}
        className="absolute bottom-8 right-8"
        style={{
          fontFamily: "var(--font-orbitron)",
          fontSize: "9px",
          color: "#1e293b",
          letterSpacing: "0.3em",
          background: "none",
          border: "none",
          cursor: "none",
          transition: "color 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#475569")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#1e293b")}
      >
        SKIP ✕
      </button>

      {/* Bottom scan line */}
      <div
        className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(245,166,35,0.1), transparent)" }}
      />
    </div>
  );
}
