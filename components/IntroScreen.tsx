"use client";

import { useEffect, useRef, useState } from "react";

export default function IntroScreen({ onComplete }: { onComplete: () => void }) {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible]   = useState(true);
  const [exiting, setExiting]   = useState(false);
  const [phase1In, setPhase1In] = useState(false);
  const [phase3In, setPhase3In] = useState(false);
  const doneRef = useRef(false);
  const p1Ref   = useRef(false);
  const p3Ref   = useRef(false);

  const complete = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    onComplete();
    setExiting(true);
    setTimeout(() => setVisible(false), 500);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const W = () => canvas.width;
    const H = () => canvas.height;

    const DUST = Array.from({ length: 280 }, () => ({
      x:       Math.random() * 2000,
      y:       0.45 + Math.random() * 0.55,
      size:    Math.random() * 2.5 + 0.4,
      speed:   Math.random() * 1.8 + 0.4,
      vy:      -(Math.random() * 0.25 + 0.05),
      opacity: Math.random() * 0.55 + 0.1,
    }));

    const STARS = Array.from({ length: 200 }, (_, i) => ({
      x:       (i * 137.508) % 1,
      y:       Math.random() * 0.9,
      size:    Math.random() < 0.15 ? 2 : 1,
      opacity: Math.random() * 0.7 + 0.2,
    }));

    const startTime = performance.now();
    const DURATION  = 7000;
    let   raf: number;
    let   completionScheduled = false;

    const draw = (now: number) => {
      // Stop the loop once complete() has been called
      if (doneRef.current) return;

      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / DURATION, 1);
      const w        = W();
      const h        = H();

      ctx.clearRect(0, 0, w, h);

      // Sky gradient
      const spaceT = Math.min(progress * 1.4, 1);
      const skyT   = Math.min(progress * 1.8, 1);
      const grad   = ctx.createLinearGradient(0, 0, 0, h);
      const topR   = Math.round(2  + (1 - spaceT) * 18);
      const topG   = Math.round(2  + (1 - spaceT) * 12);
      const topB   = Math.round(10 + (1 - spaceT) * 50);
      grad.addColorStop(0,    `rgb(${topR},${topG},${topB})`);
      grad.addColorStop(0.35, `rgb(4,8,24)`);
      const horizBlend = Math.min(skyT * 1.6, 1);
      const hR = Math.round(20 * (1 - horizBlend) + 4  * horizBlend);
      const hG = Math.round(14 * (1 - horizBlend) + 8  * horizBlend);
      const hB = Math.round(4  * (1 - horizBlend) + 24 * horizBlend);
      grad.addColorStop(0.6,  `rgb(${hR},${hG},${hB})`);
      grad.addColorStop(0.75, `rgb(18,10,3)`);
      grad.addColorStop(1,    `rgb(10,6,2)`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Stars
      const starOpacity = Math.max(0, (progress - 0.25) * 2.2);
      if (starOpacity > 0) {
        STARS.forEach(s => {
          const sy = s.y * h - progress * h * 0.18;
          if (sy < 0 || sy > h * 0.85) return;
          ctx.beginPath();
          ctx.arc(s.x * w, sy, s.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${s.opacity * starOpacity})`;
          ctx.fill();
        });
      }

      // Horizon glow line
      const horizLineA = Math.max(0, 1 - progress * 2.5);
      if (horizLineA > 0) {
        const lineY = h * (0.62 - progress * 0.15);
        const hg    = ctx.createLinearGradient(0, 0, w, 0);
        hg.addColorStop(0,   "transparent");
        hg.addColorStop(0.3, `rgba(245,166,35,${horizLineA * 0.35})`);
        hg.addColorStop(0.7, `rgba(245,166,35,${horizLineA * 0.35})`);
        hg.addColorStop(1,   "transparent");
        ctx.strokeStyle = hg;
        ctx.lineWidth   = 1;
        ctx.beginPath();
        ctx.moveTo(0, lineY);
        ctx.lineTo(w, lineY);
        ctx.stroke();
      }

      // Dust
      const dustFade = Math.max(0, 1 - progress * 2.2);
      if (dustFade > 0) {
        DUST.forEach(p => {
          p.x += p.speed;
          p.y += p.vy / h;
          if (p.x > w + 10) p.x = -10;
          const py = p.y * h;
          if (py < h * 0.35 || py > h) return;
          ctx.beginPath();
          ctx.arc(p.x, py, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(185,145,75,${p.opacity * dustFade})`;
          ctx.fill();
        });
      }

      if (progress > 0.28 && !p1Ref.current) { p1Ref.current = true; setPhase1In(true); }
      if (progress > 0.62 && !p3Ref.current) { p3Ref.current = true; setPhase3In(true); }

      // Schedule completion once animation finishes — keep RAF alive so canvas never freezes
      if (progress >= 1 && !completionScheduled) {
        completionScheduled = true;
        setTimeout(complete, 1200);
      }

      // Always keep drawing until complete() sets doneRef
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 99999, opacity: exiting ? 0 : 1, transition: "opacity 0.45s ease" }}>
      {/* Keyframes for TARS animations */}
      <style>{`
        @keyframes tars-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-7px); }
        }
        @keyframes tars-panel-a {
          0%, 100% { transform: translateX(0px); }
          40%       { transform: translateX(2px); }
          75%       { transform: translateX(-1px); }
        }
        @keyframes tars-panel-b {
          0%, 100% { transform: translateX(0px); }
          35%       { transform: translateX(-2px); }
          70%       { transform: translateX(1px); }
        }
        @keyframes tars-eye {
          0%, 100% { opacity: 0.55; }
          50%       { opacity: 1; }
        }
      `}</style>

      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />

      {/* Text overlay */}
      <div style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", pointerEvents: "none",
      }}>
        {/* Phase 1 — identity */}
        <div style={{
          opacity: phase1In ? 1 : 0, transition: "opacity 2.8s ease",
          display: "flex", flexDirection: "column", alignItems: "center",
          gap: "10px", marginBottom: "clamp(24px, 3.5vh, 38px)",
        }}>
          <p style={{ fontFamily: "var(--font-orbitron)", fontSize: "clamp(9px, 1.2vw, 12px)", color: "rgba(255,255,255,0.5)", letterSpacing: "0.65em", fontWeight: 400 }}>
            DENZEL CHINGODZA
          </p>
          <p style={{ fontFamily: "var(--font-orbitron)", fontSize: "clamp(7px, 0.9vw, 9px)", color: "rgba(255,255,255,0.18)", letterSpacing: "0.5em" }}>
            ENGINEER · SOUTH AFRICA · 2025
          </p>
        </div>

        {/* Phase 3 — DENZOS title */}
        <div style={{
          opacity: phase3In ? 1 : 0, transition: "opacity 2s ease",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "16px",
        }}>
          <h1 style={{
            fontFamily: "var(--font-orbitron)", fontSize: "clamp(36px, 5vw, 62px)",
            color: "#f5a623", letterSpacing: "0.28em", fontWeight: 700,
            textShadow: "0 0 50px rgba(245,166,35,0.4), 0 0 100px rgba(245,166,35,0.12)", lineHeight: 1,
          }}>
            DENZOS
          </h1>
          <p style={{ fontFamily: "var(--font-orbitron)", fontSize: "clamp(7px, 0.9vw, 9px)", color: "rgba(255,255,255,0.12)", letterSpacing: "0.6em" }}>
            A LIVE SOFTWARE ECOSYSTEM
          </p>
        </div>
      </div>

      {/* ── TARS ── */}
      <div
        style={{
          position: "absolute",
          bottom: "clamp(70px, 10vh, 130px)",
          left: "clamp(48px, 6vw, 120px)",
          opacity: phase3In ? 1 : 0,
          transition: "opacity 2.5s ease 0.6s",
          animation: phase3In ? "tars-float 4.5s ease-in-out infinite" : "none",
          pointerEvents: "none",
        }}
      >
        <svg width="48" height="166" viewBox="0 0 48 166" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* 5 body panels */}
          {[0, 1, 2, 3, 4].map((i) => {
            const y       = i * 31;
            const isEye   = i === 2;
            const anim    = i % 2 === 0 ? "tars-panel-a" : "tars-panel-b";
            const dur     = (3.8 + i * 0.6).toFixed(1);
            const delay   = (i * 0.25).toFixed(2);
            return (
              <g key={i} style={{ animation: `${anim} ${dur}s ${delay}s ease-in-out infinite` }}>
                {/* Main panel rect */}
                <rect
                  x="1" y={y + 1} width="46" height="28"
                  stroke={isEye ? "rgba(245,166,35,0.65)" : "rgba(245,166,35,0.22)"}
                  strokeWidth={isEye ? "1.2" : "0.7"}
                  fill={isEye ? "rgba(245,166,35,0.04)" : "rgba(7,7,15,0.7)"}
                />
                {/* Horizontal seam lines inside each panel */}
                <line x1="1" y1={y + 10} x2="47" y2={y + 10} stroke="rgba(245,166,35,0.06)" strokeWidth="0.5" />
                <line x1="1" y1={y + 20} x2="47" y2={y + 20} stroke="rgba(245,166,35,0.06)" strokeWidth="0.5" />
                {/* Eye slit on middle panel */}
                {isEye && (
                  <>
                    {/* Glow halo */}
                    <line x1="7" y1={y + 15} x2="41" y2={y + 15}
                      stroke="rgba(245,166,35,0.18)" strokeWidth="7" strokeLinecap="round"
                      style={{ animation: "tars-eye 2.2s ease-in-out infinite" }}
                    />
                    {/* Core eye line */}
                    <line x1="7" y1={y + 15} x2="41" y2={y + 15}
                      stroke="rgba(245,166,35,0.95)" strokeWidth="1.4" strokeLinecap="round"
                      style={{ animation: "tars-eye 2.2s ease-in-out infinite" }}
                    />
                  </>
                )}
                {/* Corner screws */}
                <circle cx="4"  cy={y + 4}  r="0.8" fill="rgba(245,166,35,0.15)" />
                <circle cx="44" cy={y + 4}  r="0.8" fill="rgba(245,166,35,0.15)" />
                <circle cx="4"  cy={y + 25} r="0.8" fill="rgba(245,166,35,0.15)" />
                <circle cx="44" cy={y + 25} r="0.8" fill="rgba(245,166,35,0.15)" />
              </g>
            );
          })}
          {/* Leg */}
          <rect x="19" y="156" width="10" height="9" rx="1"
            fill="rgba(245,166,35,0.1)" stroke="rgba(245,166,35,0.25)" strokeWidth="0.7" />
          {/* Ground shadow */}
          <ellipse cx="24" cy="167" rx="15" ry="2.5" fill="rgba(245,166,35,0.05)" />
        </svg>
        <p style={{
          fontFamily: "var(--font-orbitron)", fontSize: "7px",
          color: "rgba(245,166,35,0.25)", letterSpacing: "0.35em",
          marginTop: "6px", textAlign: "center",
        }}>
          TARS
        </p>
      </div>

      {/* Skip */}
      <button
        onClick={complete}
        style={{
          position: "absolute", bottom: "28px", right: "36px",
          fontFamily: "var(--font-orbitron)", fontSize: "9px",
          color: "rgba(255,255,255,0.2)", letterSpacing: "0.35em",
          background: "none", border: "none", cursor: "pointer",
          transition: "color 0.3s", padding: "8px 4px",
        }}
        onMouseEnter={e => (e.currentTarget.style.color = "rgba(245,166,35,0.6)")}
        onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.2)")}
      >
        SKIP  ✕
      </button>
    </div>
  );
}
