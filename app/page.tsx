"use client";

import { useRef } from "react";
import StarField from "@/components/StarField";
import OrbitalSystem from "@/components/OrbitalSystem";
import Navbar from "@/components/Navbar";
import SectionNav from "@/components/SectionNav";

export default function Home() {
  const aboutRef = useRef<HTMLDivElement>(null);

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <StarField />
      <Navbar onAboutClick={scrollToAbout} />
      <SectionNav />

      {/* HERO */}
      <section id="hero" className="min-h-screen relative">
        <OrbitalSystem />
        <div
          className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-4 z-10"
          style={{ pointerEvents: "none" }}
        >
          <p className="text-gray-700 text-xs tracking-[0.3em]" style={{ fontFamily: "var(--font-orbitron)" }}>
            Denzel Chingodza · Software Engineer · South Africa
          </p>
          <button
            onClick={scrollToAbout}
            style={{ pointerEvents: "auto", cursor: "none" }}
            className="flex flex-col items-center gap-2 text-gray-700 hover:text-amber-400 transition-colors"
          >
            <div className="w-px h-6 bg-amber-400 opacity-15" />
            <span className="text-xs tracking-[0.4em]" style={{ fontFamily: "var(--font-orbitron)" }}>SCROLL</span>
          </button>
        </div>
      </section>

      {/* ABOUT */}
      <section
        ref={aboutRef}
        id="about"
        className="relative z-10 py-40"
        style={{ borderTop: "1px solid rgba(245,166,35,0.06)" }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(245,166,35,0.02) 0%, transparent 70%)",
        }} />

        <div className="max-w-4xl mx-auto px-8 relative">

          {/* Section label */}
          <div className="flex items-center gap-4 mb-24">
            <div className="w-8 h-px" style={{ background: "rgba(245,166,35,0.3)" }} />
            <p className="text-xs tracking-[0.5em] text-gray-700" style={{ fontFamily: "var(--font-orbitron)" }}>
              PROFILE · DENZ-001
            </p>
          </div>

          {/* ── Identity ── */}
          <div className="flex flex-col md:flex-row gap-16 mb-24 items-center">

            {/* Avatar */}
            <div className="flex flex-col items-center gap-6 shrink-0">
              <div className="relative flex items-center justify-center">
                <div className="absolute rounded-full" style={{ width: "150px", height: "150px", border: "1px solid rgba(245,166,35,0.07)", animation: "ring-rotate 22s linear infinite" }} />
                <div className="absolute rounded-full" style={{ width: "118px", height: "118px", border: "1px dashed rgba(245,166,35,0.04)", animation: "ring-rotate-reverse 35s linear infinite" }} />
                <div className="rounded-full flex items-center justify-center" style={{
                  width: "82px", height: "82px",
                  background: "radial-gradient(circle, rgba(245,166,35,0.15) 0%, rgba(7,7,15,1) 70%)",
                  border: "1px solid rgba(245,166,35,0.25)",
                  boxShadow: "0 0 40px rgba(245,166,35,0.1)",
                }}>
                  <span className="text-amber-400 font-bold text-2xl" style={{ fontFamily: "var(--font-orbitron)" }}>DC</span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 text-xs tracking-[0.3em]" style={{ fontFamily: "var(--font-orbitron)" }}>ONLINE</span>
                </div>
                <p className="text-gray-700 text-xs tracking-widest" style={{ fontFamily: "var(--font-orbitron)" }}>SOUTH AFRICA</p>
              </div>
            </div>

            {/* Bio */}
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-xs tracking-[0.4em] text-gray-700 mb-3" style={{ fontFamily: "var(--font-orbitron)" }}>ENGINEER · CLASS 2025</p>
                <h2 className="text-4xl text-white tracking-[0.15em] mb-2" style={{ fontFamily: "var(--font-orbitron)" }}>DENZEL CHINGODZA</h2>
                <p className="text-amber-400 text-xs tracking-[0.3em] opacity-50" style={{ fontFamily: "var(--font-orbitron)" }}>SOFTWARE ENGINEER · AI / ML SYSTEMS</p>
              </div>
              <div className="w-12 h-px bg-amber-400 opacity-20" />
              <p className="text-gray-500 text-sm leading-[2] max-w-xl">
                Final year software engineering student who learns by building.
                Nothing beats watching something you made actually work.
                Currently focused on AI systems — RAG pipelines, intelligent agents, and stateful applications.
                Built DenzOS as a live showcase of real engineering, themed after my favourite film, Interstellar.
                Also 6&apos;3&quot; — irrelevant, but noted.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <span className="text-gray-800 text-xs tracking-[0.3em]" style={{ fontFamily: "var(--font-orbitron)" }}>DIRECTIVE</span>
                <div className="w-16 h-px" style={{ background: "rgba(245,166,35,0.1)" }} />
                <span className="text-amber-400 text-xs tracking-[0.3em] opacity-40" style={{ fontFamily: "var(--font-orbitron)" }}>BUILD · LEARN · SHIP</span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px mb-24" style={{ background: "linear-gradient(to right, transparent, rgba(245,166,35,0.08), transparent)" }} />

          {/* ── Three panels ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            {/* Capabilities */}
            <div>
              <p className="text-xs tracking-[0.4em] text-gray-700 mb-8" style={{ fontFamily: "var(--font-orbitron)" }}>— CAPABILITIES</p>
              <div className="flex flex-wrap gap-3">
                {["Python", "JavaScript", "TypeScript", "React", "FastAPI", "PostgreSQL", "MongoDB", "Qdrant", "Docker", "Next.js"].map((skill) => (
                  <span
                    key={skill}
                    className="text-gray-600 hover:text-amber-400 hover:border-amber-400 transition-all duration-300 cursor-default px-3 py-1.5"
                    style={{ border: "1px solid rgba(255,255,255,0.07)", fontFamily: "var(--font-orbitron)", fontSize: "9px", letterSpacing: "0.12em" }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Missions */}
            <div>
              <p className="text-xs tracking-[0.4em] text-gray-700 mb-8" style={{ fontFamily: "var(--font-orbitron)" }}>— ACTIVE MISSIONS</p>
              <div className="flex flex-col gap-7">
                {[
                  { code: "01", label: "Completing Software Engineering degree" },
                  { code: "02", label: "Building DenzOS ecosystem" },
                  { code: "03", label: "Studying RAG pipelines & AI agents" },
                ].map((item) => (
                  <div key={item.code} className="flex gap-4 items-start">
                    <span className="text-amber-400 opacity-20 text-xs shrink-0 mt-0.5" style={{ fontFamily: "var(--font-orbitron)" }}>{item.code}</span>
                    <p className="text-gray-500 text-xs leading-relaxed">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <p className="text-xs tracking-[0.4em] text-gray-700 mb-8" style={{ fontFamily: "var(--font-orbitron)" }}>— SIGNAL FREQUENCY</p>
              <div className="flex flex-col gap-4">
                {[
                  { label: "GITHUB",   href: "https://github.com/denzelchingodza" },
                  { label: "LINKEDIN", href: "https://www.linkedin.com/in/denzel-chingodza-45b6ab3a0/" },
                  { label: "EMAIL",    href: "mailto:denzel.chingodza@icloud.com" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-600 hover:text-amber-400 transition-colors duration-300 group"
                    style={{ cursor: "none" }}
                  >
                    <div className="w-1 h-1 rounded-full bg-gray-700 group-hover:bg-amber-400 transition-colors shrink-0" />
                    <span className="text-xs tracking-[0.3em]" style={{ fontFamily: "var(--font-orbitron)" }}>{link.label}</span>
                    <span className="ml-auto text-xs opacity-0 group-hover:opacity-60 transition-opacity">↗</span>
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="flex items-center justify-center gap-4 mt-28">
            <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, rgba(245,166,35,0.07))" }} />
            <p className="text-gray-800 text-xs tracking-[0.4em]" style={{ fontFamily: "var(--font-orbitron)" }}>DENZOS · 2025</p>
            <div className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, rgba(245,166,35,0.07))" }} />
          </div>

        </div>
      </section>
    </>
  );
}