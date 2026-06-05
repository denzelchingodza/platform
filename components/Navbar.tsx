"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
      style={{ borderBottom: "1px solid rgba(245, 166, 35, 0.1)" }}
    >
      <Link
        href="/"
        className="text-amber-400 text-lg tracking-widest glow-amber"
        style={{ fontFamily: "var(--font-orbitron)" }}
      >
        DENZ<span className="text-white">OS</span>
      </Link>

      <div className="flex gap-10">
        {["PROJECTS", "ABOUT"].map((item) => (
          <Link
            key={item}
            href={`/${item.toLowerCase()}`}
            className="text-gray-500 hover:text-amber-400 transition-colors duration-300 text-xs tracking-[0.3em]"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            {item}
          </Link>
        ))}
      </div>
    </nav>
  );
}