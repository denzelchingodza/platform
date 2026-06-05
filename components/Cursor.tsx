"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const reticleRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.cursor = "none";

    const move = (e: MouseEvent) => {
      if (reticleRef.current) {
        reticleRef.current.style.left = `${e.clientX}px`;
        reticleRef.current.style.top = `${e.clientY}px`;
      }
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <>
      <div
        ref={reticleRef}
        className="fixed pointer-events-none z-[9999]"
        style={{
          width: "32px",
          height: "32px",
          transform: "translate(-50%, -50%)",
          border: "1px solid rgba(245, 166, 35, 0.8)",
          borderRadius: "50%",
          boxShadow: "0 0 8px rgba(245, 166, 35, 0.4)",
        }}
      >
        <div style={{ position: "absolute", top: "50%", left: "-7px", width: "5px", height: "1px", background: "rgba(245,166,35,0.8)" }} />
        <div style={{ position: "absolute", top: "50%", right: "-7px", width: "5px", height: "1px", background: "rgba(245,166,35,0.8)" }} />
        <div style={{ position: "absolute", left: "50%", top: "-7px", height: "5px", width: "1px", background: "rgba(245,166,35,0.8)" }} />
        <div style={{ position: "absolute", left: "50%", bottom: "-7px", height: "5px", width: "1px", background: "rgba(245,166,35,0.8)" }} />
      </div>
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999]"
        style={{
          width: "4px",
          height: "4px",
          background: "rgba(245, 166, 35, 1)",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 6px rgba(245, 166, 35, 0.8)",
        }}
      />
    </>
  );
}