"use client";

import { useEffect, useRef } from "react";

export default function StarField({ warping = false }: { warping?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const warpingRef = useRef(warping);

  useEffect(() => {
    warpingRef.current = warping;
  }, [warping]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Sparse, distant stars — few, tiny, slow
    const stars = Array.from({ length: 90 }, () => {
      const depth = Math.random(); // 0 = very far, 1 = slightly closer
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: depth < 0.6 ? 0.35 : depth < 0.85 ? 0.55 : 0.75,
        opacity: 0.08 + depth * 0.22,
        speed: 0.018 + depth * 0.032,
        phase: Math.random() * Math.PI * 2,
        freq: 0.002 + Math.random() * 0.003,
      };
    });

    // Two very faint ambient glows in the background
    const orbs = [
      { x: canvas.width * 0.15, y: canvas.height * 0.25, r: canvas.width * 0.42, color: [79, 120, 200], opacity: 0.032, vx: 0.012, vy: 0.008 },
      { x: canvas.width * 0.8,  y: canvas.height * 0.72, r: canvas.width * 0.35, color: [245, 166, 35],  opacity: 0.018, vx: -0.01,  vy: -0.007 },
    ];

    let frame = 0;

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      // Ambient glows first
      for (const orb of orbs) {
        const g = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        g.addColorStop(0, `rgba(${orb.color[0]},${orb.color[1]},${orb.color[2]},${orb.opacity})`);
        g.addColorStop(1, `rgba(${orb.color[0]},${orb.color[1]},${orb.color[2]},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fill();
        orb.x += orb.vx;
        orb.y += orb.vy;
        if (orb.x < -orb.r * 0.4 || orb.x > canvas.width  + orb.r * 0.4) orb.vx *= -1;
        if (orb.y < -orb.r * 0.4 || orb.y > canvas.height + orb.r * 0.4) orb.vy *= -1;
      }

      // Stars on top
      for (const s of stars) {
        const breathe = 1 + 0.06 * Math.sin(frame * s.freq + s.phase);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 232, 255, ${s.opacity * breathe})`;
        ctx.fill();

        s.y += s.speed;
        if (s.y > canvas.height + 1) {
          s.y = -1;
          s.x = Math.random() * canvas.width;
        }
      }

      requestAnimationFrame(draw);
    }

    draw();
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}
