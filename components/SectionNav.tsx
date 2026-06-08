"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero",    label: "HOME"     },
  { id: "about",   label: "ABOUT"    },
];

export default function SectionNav() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.5 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50 hidden md:flex"
    >
      {SECTIONS.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          className="group flex items-center gap-3 justify-end"
          style={{ cursor: "none" }}
          title={label}
        >
          {/* Label — appears on hover */}
          <span
            className="text-xs tracking-[0.3em] text-gray-600 group-hover:text-amber-400 transition-all duration-300 opacity-0 group-hover:opacity-100"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            {label}
          </span>
          {/* Dot */}
          <div
            className="rounded-full transition-all duration-300"
            style={{
              width: active === id ? "8px" : "4px",
              height: active === id ? "8px" : "4px",
              background: active === id ? "#f5a623" : "rgba(255,255,255,0.2)",
              boxShadow: active === id ? "0 0 8px rgba(245,166,35,0.6)" : "none",
            }}
          />
        </button>
      ))}
    </div>
  );
}
