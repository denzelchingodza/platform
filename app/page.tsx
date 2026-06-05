"use client";

import { useRef } from "react";
import StarField from "@/components/StarField";
import OrbitalSystem from "@/components/OrbitalSystem";
import Navbar from "@/components/Navbar";

export default function Home() {
  const aboutRef = useRef<HTMLDivElement>(null);

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <StarField />
      <Navbar onAboutClick={scrollToAbout} />

      {/* HERO */}
      <section className="min-h-screen relative">
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
        className="min-h-screen relative z-10 flex items-center justify-center py-24"
        style={{ borderTop: "1px solid rgba(245,166,35,0.06)" }}
      >
        <div className="max-w-5xl mx-auto px-8 w-full">

          {/* Section tag */}
          <div className="flex items-center gap-4 mb-16">
            <div className="w-12 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(245,166,35,0.3))" }} />
            <p className="text-xs tracking-[0.5em] text-gray-600" style={{ fontFamily: "var(--font-orbitron)" }}>
              PROFILE: DENZ-001
            </p>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, rgba(245,166,35,0.1), transparent)" }} />
            <p className="text-xs tracking-[0.3em] text-amber-400 opacity-40 rotate-2" style={{ fontFamily: "var(--font-orbitron)" }}>
              ◈ CLASSIFIED
            </p>
          </div>

          {/* Main dossier card */}
          <div style={{ border: "1px solid rgba(245,166,35,0.1)", background: "rgba(7,7,15,0.8)" }}>

            {/* Top row — identity */}
            <div className="flex flex-col md:flex-row">

              {/* Left — avatar panel */}
              <div
                className="flex flex-col items-center justify-center gap-6 p-12"
                style={{
                  borderRight: "1px solid rgba(245,166,35,0.08)",
                  borderBottom: "1px solid rgba(245,166,35,0.08)",
                  minWidth: "260px",
                }}
              >
                {/* Orbital avatar */}
                <div className="relative flex items-center justify-center">
                  <div className="absolute rounded-full" style={{
                    width: "130px", height: "130px",
                    border: "1px solid rgba(245,166,35,0.08)",
                    animation: "ring-rotate 20s linear infinite",
                  }} />
                  <div className="absolute rounded-full" style={{
                    width: "110px", height: "110px",
                    border: "1px dashed rgba(245,166,35,0.05)",
                    animation: "ring-rotate-reverse 30s linear infinite",
                  }} />
                  <div
                    className="rounded-full flex items-center justify-center"
                    style={{
                      width: "80px", height: "80px",
                      background: "radial-gradient(circle, rgba(245,166,35,0.12) 0%, rgba(7,7,15,1) 70%)",
                      border: "1px solid rgba(245,166,35,0.2)",
                      boxShadow: "0 0 30px rgba(245,166,35,0.08)",
                    }}
                  >
                    <span className="text-amber-400 font-bold text-xl" style={{ fontFamily: "var(--font-orbitron)" }}>
                      DC
                    </span>
                  </div>
                </div>

                {/* Status indicator */}
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-green-400 text-xs tracking-[0.3em]" style={{ fontFamily: "var(--font-orbitron)" }}>
                      ACTIVE
                    </span>
                  </div>
                  <p className="text-gray-700 text-xs tracking-widest">SOUTH AFRICA</p>
                </div>
              </div>

              {/* Right — bio */}
              <div className="flex flex-col justify-center p-10 gap-6" style={{ borderBottom: "1px solid rgba(245,166,35,0.08)" }}>
                <div>
                  <h2 className="text-3xl text-white tracking-[0.2em] mb-1" style={{ fontFamily: "var(--font-orbitron)" }}>
                    DENZEL CHINGODZA
                  </h2>
                  <p className="text-amber-400 text-xs tracking-[0.4em] opacity-70" style={{ fontFamily: "var(--font-orbitron)" }}>
                    SOFTWARE ENGINEER · AI ENTHUSIAST
                  </p>
                </div>

                <div className="w-16 h-px bg-amber-400 opacity-15" />

                <p className="text-gray-500 text-sm leading-loose">
                  Final year software engineering student who learns from curiosity and loves building systems — there is nothing better than watching something you built actually work. Currently deep in AI systems development with a growing interest in intelligent, stateful applications. Built DenzOS as a live showcase of real engineering, themed after my favourite film, Interstellar. Irrelevent, but i am also 6 foot 3 inches. 
                </p>

                <div className="flex items-center gap-3">
                  <span className="text-gray-700 text-xs tracking-[0.3em]" style={{ fontFamily: "var(--font-orbitron)" }}>
                    MISSION
                  </span>
                  <div className="flex-1 h-px bg-amber-400 opacity-10" />
                  <span className="text-amber-400 text-xs tracking-[0.2em] opacity-60" style={{ fontFamily: "var(--font-orbitron)" }}>
                    BUILD · LEARN · SHIP
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom row — three columns */}
            <div className="grid grid-cols-1 md:grid-cols-3">

              {/* Capabilities */}
              <div className="p-8" style={{ borderRight: "1px solid rgba(245,166,35,0.08)" }}>
                <p className="text-xs tracking-[0.4em] text-gray-700 mb-6" style={{ fontFamily: "var(--font-orbitron)" }}>
                  — CAPABILITIES
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Python", "JavaScript", "React", "FastAPI", "PostgreSQL", "MongoDB", "Neo4j", "HTML", "CSS", "Docker"].map((skill) => (
                    <span
                      key={skill}
                      className="text-gray-500 hover:text-amber-400 transition-colors duration-300 text-xs px-2 py-1 tracking-wider"
                      style={{ border: "1px solid rgba(255,255,255,0.06)", fontFamily: "var(--font-orbitron)", fontSize: "9px" }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Current mission */}
              <div className="p-8" style={{ borderRight: "1px solid rgba(245,166,35,0.08)" }}>
                <p className="text-xs tracking-[0.4em] text-gray-700 mb-6" style={{ fontFamily: "var(--font-orbitron)" }}>
                  — CURRENT MISSION
                </p>
                <div className="flex flex-col gap-5">
                  {[
                    { code: "01", label: "Completing Software Engineering degree" },
                    { code: "02", label: "Building DenzOS ecosystem and other applications" },
                    { code: "03", label: "Studying RAG pipelines & AI systems" },
                  ].map((item) => (
                    <div key={item.code} className="flex gap-3">
                      <span className="text-amber-400 opacity-30 text-xs" style={{ fontFamily: "var(--font-orbitron)" }}>
                        {item.code}
                      </span>
                      <p className="text-gray-500 text-xs leading-relaxed">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="p-8">
                <p className="text-xs tracking-[0.4em] text-gray-700 mb-6" style={{ fontFamily: "var(--font-orbitron)" }}>
                  — SIGNAL FREQUENCY
                </p>
                <div className="flex flex-col gap-3">
                  {[
                    { label: "GITHUB", href: "https://github.com/denzelchingodza" },
                    { label: "LINKEDIN", href: "https://www.linkedin.com/in/denzel-chingodza-45b6ab3a0/" },
                    { label: "EMAIL", href: "mailto:denzel.chingodza@icloud.com" },
                  ].map((link) => (
                    
                      <a 
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 py-2 text-gray-600 hover:text-amber-400 transition-colors duration-300 group"
                    >
                      <div className="w-1 h-1 rounded-full bg-gray-700 group-hover:bg-amber-400 transition-colors" />
                      <span className="text-xs tracking-[0.3em]" style={{ fontFamily: "var(--font-orbitron)" }}>
                        {link.label} →
                      </span>
                    </a>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, rgba(245,166,35,0.08))" }} />
            <p className="text-gray-800 text-xs tracking-[0.4em]" style={{ fontFamily: "var(--font-orbitron)" }}>
              DENZOS · 2025
            </p>
            <div className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, rgba(245,166,35,0.08))" }} />
          </div>

        </div>
      </section>
    </>
  );
}