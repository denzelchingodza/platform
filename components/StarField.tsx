"use client";

import { useEffect, useRef } from "react";

export default function StarField({ warping = false }: { warping?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    // Two large ambient orbs that drift imperceptibly slowly
    const orbs = [
      {
        x: canvas.width * 0.15,
        y: canvas.height * 0.3,
        r: canvas.width * 0.45,
        color: [79, 120, 195],
        opacity: 0.045,
        vx: 0.018,
        vy: 0.012,
      },
      {
        x: canvas.width * 0.82,
        y: canvas.height * 0.7,
        r: canvas.width * 0.38,
        color: [245, 166, 35],
        opacity: 0.028,
        vx: -0.014,
        vy: -0.009,
      },
    ];

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

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

        // Gentle bounce within bounds
        if (orb.x < -orb.r * 0.5 || orb.x > canvas.width + orb.r * 0.5) orb.vx *= -1;
        if (orb.y < -orb.r * 0.5 || orb.y > canvas.height + orb.r * 0.5) orb.vy *= -1;
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
