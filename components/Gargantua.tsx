"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface GargantuaProps {
  onWarpStart?: () => void;
  warping?: boolean;
}

export default function Gargantua({ onWarpStart, warping = false }: GargantuaProps) {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    if (warping) return;
    onWarpStart?.();
    setTimeout(() => router.push("/projects"), 1400);
  };

  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{ zIndex: 2 }}
    >
      {/* Warp flash */}
      {warping && (
        <div
          className="fixed inset-0 z-[100]"
          style={{
            background: "radial-gradient(circle, rgba(245,166,35,0.2) 0%, rgba(7,7,15,1) 70%)",
            animation: "warp-flash 1.4s ease-in forwards",
          }}
        />
      )}

      {/* Single clickable container — entire area is the target */}
      <div
        onClick={handleClick}
        onMouseEnter={() => !warping && setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex items-center justify-center"
        style={{ width: "520px", height: "520px", cursor: "none" }}
      >
        {/* Ambient outer glow */}
        <div
          className="absolute rounded-full"
          style={{
            width: "520px",
            height: "520px",
            background: hovered || warping
              ? "radial-gradient(circle, rgba(245,166,35,0.08) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(245,166,35,0.03) 0%, transparent 70%)",
            transition: "all 0.6s ease",
          }}
        />

        {/* 3D tilted accretion disc ring */}
        <div
          className="absolute"
          style={{
            width: "460px",
            height: "460px",
            perspective: "600px",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              border: warping
                ? "4px solid rgba(245,166,35,0.95)"
                : hovered
                ? "3px solid rgba(245,166,35,0.7)"
                : "2px solid rgba(245,166,35,0.35)",
              boxShadow: warping
                ? "0 0 60px 20px rgba(245,166,35,0.4), inset 0 0 40px rgba(245,166,35,0.2)"
                : hovered
                ? "0 0 40px 12px rgba(245,166,35,0.2), inset 0 0 20px rgba(245,166,35,0.08)"
                : "0 0 25px 6px rgba(245,166,35,0.1)",
              transform: "rotateX(72deg)",
              transition: "all 0.5s ease",
            }}
          />
        </div>

        {/* Second inner ring — different tilt for depth */}
        <div
          className="absolute"
          style={{
            width: "360px",
            height: "360px",
            perspective: "600px",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              border: "1px solid rgba(245,166,35,0.08)",
              transform: "rotateX(72deg)",
              transition: "all 0.5s ease",
            }}
          />
        </div>

        {/* Black hole center — sits on top visually */}
        <div
          className="absolute rounded-full"
          style={{
            width: "200px",
            height: "200px",
            background: "radial-gradient(circle, #030309 40%, #07070f 100%)",
            boxShadow: "0 0 40px 20px #07070f",
            zIndex: 3,
          }}
        />

        {/* Hover/warp label — sits above black hole */}
        <div
          className="absolute flex flex-col items-center gap-2"
          style={{ zIndex: 4 }}
        >
          {!warping && hovered && (
            <>
              <p
                className="text-amber-400 text-xs tracking-[0.5em]"
                style={{ fontFamily: "var(--font-orbitron)" }}
              >
                ENTER PROJECTS
              </p>
              <div
                className="w-8 h-px bg-amber-400"
                style={{ opacity: 0.5 }}
              />
            </>
          )}
          {warping && (
            <p
              className="text-amber-400 text-xs tracking-[0.5em] animate-pulse"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              INITIALIZING
            </p>
          )}
          {!warping && !hovered && (
            <p
              className="text-gray-800 text-xs tracking-[0.4em] animate-pulse"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              ▶
            </p>
          )}
        </div>
      </div>
    </div>
  );
}