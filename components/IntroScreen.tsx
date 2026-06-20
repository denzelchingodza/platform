"use client";

import { useEffect, useRef, useState } from "react";

export default function IntroScreen({ onComplete }: { onComplete: () => void }) {
  const canvasRef              = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible]  = useState(true);
  const [exiting, setExiting]  = useState(false);
  const [textIn, setTextIn]    = useState(false);
  const doneRef                = useRef(false);

  const complete = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    onComplete(); // must be in gesture window for audio autoplay
    setExiting(true);
    setTimeout(() => setVisible(false), 1100);
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

    // Dust particles — earthy, horizontal drift
    const DUST = Array.from({ length: 280 }, () => ({
      x:       Math.random() * 2000,
      y:       0.45 + Math.random() * 0.55,
      size:    Math.random() * 2.5 + 0.4,
      speed:   Math.random() * 1.8 + 0.4,
      vy:      -(Math.random() * 0.25 + 0.05),
      opacity: Math.random() * 0.55 + 0.1,
    }));

    // Stars — appear as camera rises to space
    const STARS = Array.from({ length: 200 }, (_, i) => ({
      x:       (i * 137.508) % 1,
      y:       Math.random() * 0.9,
      size:    Math.random() < 0.15 ? 2 : 1,
      opacity: Math.random() * 0.7 + 0.2,
    }));

    const startTime = performance.now();
    const DURATION  = 7000;
    let   raf: number;
    let   textShown = false;

    const draw = (now: number) => {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / DURATION, 1);
      const w        = W();
      const h        = H();

      ctx.clearRect(0, 0, w, h);

      // Sky gradient — bottom = dark earth, top → deep space
      const spaceT = Math.min(progress * 1.4, 1);
      const skyT   = Math.min(progress * 1.8, 1);
      const grad   = ctx.createLinearGradient(0, 0, 0, h);
      const topR   = Math.round(2  + (1 - spaceT) * 18);
      const topG   = Math.round(2  + (1 - spaceT) * 12);
      const topB   = Math.round(10 + (1 - spaceT) * 50);
      grad.addColorStop(0,    `rgb(${topR},${topG},${topB})`);
      grad.addColorStop(0.35, `rgba(4,8,24,1)`);
      const horizA = Math.max(0, 1 - skyT * 1.6);
      grad.addColorStop(0.6,  `rgba(20,14,4,${horizA})`);
      grad.addColorStop(0.75, `rgba(18,10,3,1)`);
      grad.addColorStop(1,    `rgba(10,6,2,1)`);
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

      // Trigger text once we're in space
      if (progress > 0.55 && !textShown) {
        textShown = true;
        setTextIn(true);
      }

      if (progress < 1) {
        raf = requestAnimationFrame(draw);
      } else {
        if (!textShown) { textShown = true; setTextIn(true); }
        setTimeout(complete, 3200);
      }
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
    <div
      style={{
        position:   "fixed",
        inset:      0,
        zIndex:     99999,
        opacity:    exiting ? 0 : 1,
        transition: "opacity 1.1s ease",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      />

      {/* DENZOS — fades in once stars appear */}
      <div
        style={{
          position:       "absolute",
          inset:          0,
          display:        "flex",
          flexDirection:  "column",
          alignItems:     "center",
          justifyContent: "center",
          pointerEvents:  "none",
          opacity:        textIn ? 1 : 0,
          transition:     "opacity 2s ease",
        }}
      >
        <p style={{
          fontFamily:    "var(--font-orbitron)",
          fontSize:      "10px",
          color:         "rgba(245,166,35,0.45)",
          letterSpacing: "0.7em",
          marginBottom:  "22px",
        }}>
          [ TRANSMISSION RECEIVED ]
        </p>
        <h1 style={{
          fontFamily:    "var(--font-orbitron)",
          fontSize:      "clamp(58px,10vw,108px)",
          color:         "#f5a623",
          letterSpacing: "0.3em",
          fontWeight:    700,
          textShadow:    "0 0 80px rgba(245,166,35,0.55), 0 0 160px rgba(245,166,35,0.18)",
          lineHeight:    1,
        }}>
          DENZOS
        </h1>
        <div style={{
          width:      "160px",
          height:     "1px",
          background: "linear-gradient(to right, transparent, rgba(245,166,35,0.3), transparent)",
          margin:     "22px 0",
        }} />
        <p style={{
          fontFamily:    "var(--font-orbitron)",
          fontSize:      "9px",
          color:         "rgba(255,255,255,0.18)",
          letterSpacing: "0.55em",
        }}>
          A LIVE SOFTWARE ECOSYSTEM
        </p>
      </div>

      {/* Skip — always visible */}
      <button
        onClick={complete}
        style={{
          position:      "absolute",
          bottom:        "32px",
          right:         "36px",
          fontFamily:    "var(--font-orbitron)",
          fontSize:      "9px",
          color:         "rgba(255,255,255,0.22)",
          letterSpacing: "0.35em",
          background:    "none",
          border:        "none",
          cursor:        "pointer",
          transition:    "color 0.3s",
          padding:       "8px 4px",
        }}
        onMouseEnter={e => (e.currentTarget.style.color = "rgba(245,166,35,0.7)")}
        onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.22)")}
      >
        SKIP  ✕
      </button>
    </div>
  );
}
