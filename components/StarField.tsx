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

    // Match intro screen: golden ratio x distribution, mostly size 1 some size 2
    const stars = Array.from({ length: 200 }, (_, i) => ({
      x: ((i * 137.508) % 1) * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() < 0.15 ? 1.6 : 0.9,
      opacity: Math.random() * 0.55 + 0.2,
      speed: Math.random() * 0.06 + 0.02,
      phase: Math.random() * Math.PI * 2,
      freq: 0.003 + Math.random() * 0.004,
    }));

    let frame = 0;
    let raf: number;

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      for (const s of stars) {
        const breathe = 1 + 0.07 * Math.sin(frame * s.freq + s.phase);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.opacity * breathe})`;
        ctx.fill();

        s.y += s.speed;
        if (s.y > canvas.height + 2) {
          s.y = -2;
          s.x = Math.random() * canvas.width;
        }
      }

      raf = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}
