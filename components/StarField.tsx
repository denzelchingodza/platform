"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  speed: number;
  twinkleSpeed: number;
  twinkleDirection: number;
  vx: number;
  vy: number;
}

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

    const stars: Star[] = Array.from({ length: 300 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.8 + 0.2,
      opacity: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.15 + 0.02,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleDirection: Math.random() > 0.5 ? 1 : -1,
      vx: 0,
      vy: 0,
    }));

    let warpProgress = 0;

    function drawNebula() {
      if (!canvas || !ctx) return;
      const g = ctx.createRadialGradient(
        canvas.width * 0.5, canvas.height * 0.5, 0,
        canvas.width * 0.5, canvas.height * 0.5, canvas.width * 0.5
      );
      g.addColorStop(0, "rgba(79,195,247,0.03)");
      g.addColorStop(0.5, "rgba(245,166,35,0.015)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawNebula();

      const isWarping = warpingRef.current;
      if (isWarping) warpProgress = Math.min(warpProgress + 0.015, 1);
      else warpProgress = Math.max(warpProgress - 0.03, 0);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      stars.forEach((star) => {
        if (warpProgress > 0) {
          const dx = cx - star.x;
          const dy = cy - star.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const pull = warpProgress * 6;

          star.vx += (dx / dist) * pull * 0.08;
          star.vy += (dy / dist) * pull * 0.08;
          star.x += star.vx;
          star.y += star.vy;

          const speed = Math.sqrt(star.vx * star.vx + star.vy * star.vy);
          ctx.beginPath();
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(star.x - star.vx * speed * 0.4, star.y - star.vy * speed * 0.4);
          ctx.strokeStyle = `rgba(232,244,253,${Math.min(star.opacity * warpProgress * 1.5, 1)})`;
          ctx.lineWidth = star.radius * 0.6;
          ctx.stroke();

          if (dist < 8) {
            star.x = Math.random() * canvas.width;
            star.y = Math.random() * canvas.height;
            star.vx = 0;
            star.vy = 0;
          }
        } else {
          star.vx = 0;
          star.vy = 0;
          star.opacity += star.twinkleSpeed * star.twinkleDirection;
          if (star.opacity >= 1 || star.opacity <= 0.1) star.twinkleDirection *= -1;

          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(232,244,253,${star.opacity})`;
          ctx.fill();

          if (star.radius > 1.2) {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(232,244,253,${star.opacity * 0.08})`;
            ctx.fill();
          }

          star.y += star.speed;
          if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
          }
        }
      });

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