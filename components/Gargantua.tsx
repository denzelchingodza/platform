"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Gargantua() {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ zIndex: 1, pointerEvents: "none" }}
    >
      <div
        className="relative flex items-center justify-center"
        style={{ pointerEvents: "all" }}
        onClick={() => router.push("/projects")}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          style={{
            width: "520px",
            height: "520px",
            borderRadius: "50%",
            background: hovered
              ? "radial-gradient(circle, transparent 36%, rgba(245,166,35,0.08) 44%, rgba(245,166,35,0.18) 50%, rgba(245,166,35,0.08) 56%, transparent 66%)"
              : "radial-gradient(circle, transparent 36%, rgba(245,166,35,0.04) 44%, rgba(245,166,35,0.1) 50%, rgba(245,166,35,0.04) 56%, transparent 66%)",
            boxShadow: hovered
              ? "0 0 140px 50px rgba(245,166,35,0.08)"
              : "0 0 100px 30px rgba(245,166,35,0.03)",
            transition: "all 0.6s ease",
          }}
        />
        <div
          className="absolute"
          style={{
            width: "520px",
            height: "520px",
            borderRadius: "50%",
            border: hovered
              ? "1px solid rgba(245,166,35,0.5)"
              : "1px solid rgba(245,166,35,0.12)",
            boxShadow: hovered
              ? "0 0 60px 10px rgba(245,166,35,0.15), inset 0 0 60px 10px rgba(245,166,35,0.08)"
              : "0 0 40px 4px rgba(245,166,35,0.04)",
            transition: "all 0.6s ease",
          }}
        />
        {hovered && (
          <p
            className="absolute text-amber-400 text-xs tracking-[0.5em]"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            ENTER
          </p>
        )}
      </div>
    </div>
  );
}