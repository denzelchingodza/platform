"use client";

import { useEffect, useRef } from "react";

interface Line {
  x: number;
  y: number;
  length: number;
  angle: number;
  opacity: number;
  speed: number;
  color: string;
  fadingIn: boolean;
  maxOpacity: number;
  width: number;
}

export default function DataLines() {
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

    const colors = [
      "245,166,35",
      "79,195,247",
      "255,255,255",
    ];

    function createLine(): Line {
      const angle = (Math.random() * 16 - 8) * (Math.PI / 180);
      return {
        x: Math.random() * canvas!.width,
        y: Math.random() * canvas!.height,
        length: Math.random() * 280 + 80,
        angle,
        opacity: 0,
        speed: Math.random() * 0.25 + 0.08,
        color: colors[Math.floor(Math.random() * colors.length)],
        fadingIn: true,
        maxOpacity: Math.random() * 0.08 + 0.02,
        width: Math.random() > 0.8 ? 1 : 0.5,
      };
    }

    const lines: Line[] = Array.from({ length: 18 }, createLine);

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      lines.forEach((line, i) => {
        if (line.fadingIn) {
          line.opacity += 0.004;
          if (line.opacity >= line.maxOpacity) line.fadingIn = false;
        } else {
          line.opacity -= 0.002;
          if (line.opacity <= 0) {
            lines[i] = createLine();
            return;
          }
        }

        line.x += Math.cos(line.angle) * line.speed;
        line.y += Math.sin(line.angle) * line.speed;

        if (
          line.x > canvas.width + 300 ||
          line.x < -300 ||
          line.y > canvas.height + 300 ||
          line.y < -300
        ) {
          lines[i] = createLine();
          return;
        }

        const endX = line.x + Math.cos(line.angle) * line.length;
        const endY = line.y + Math.sin(line.angle) * line.length;

        const gradient = ctx.createLinearGradient(line.x, line.y, endX, endY);
        gradient.addColorStop(0, `rgba(${line.color},0)`);
        gradient.addColorStop(0.2, `rgba(${line.color},${line.opacity})`);
        gradient.addColorStop(0.8, `rgba(${line.color},${line.opacity})`);
        gradient.addColorStop(1, `rgba(${line.color},0)`);

        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = line.width;
        ctx.stroke();
      });

      requestAnimationFrame(draw);
    }

    draw();
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}