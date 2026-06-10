"use client";

import { useRef, useState } from "react";
import StarField from "@/components/StarField";
import OrbitalSystem from "@/components/OrbitalSystem";
import Navbar from "@/components/Navbar";
import SectionNav from "@/components/SectionNav";

export default function Home() {
  const aboutRef   = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollToAbout   = () => aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  const scrollToContact = () => contactRef.current?.scrollIntoView({ behavior: "smooth" });

  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("https://formspree.io/f/xaqzozwr", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setFormState("sent");
        form.reset();
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  }

  return (
    <>
      <StarField />
      <Navbar onAboutClick={scrollToAbout} />
      <SectionNav />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section id="hero" className="min-h-screen relative">
        <OrbitalSystem />
        <div
          className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-4 z-10"
          style={{ pointerEvents: "none" }}
        >
          <p className="text-gray-400 text-xs tracking-[0.3em]" style={{ fontFamily: "var(--font-orbitron)" }}>
            Denzel Chingodza · Software Engineer · South Africa
          </p>
          <button
            onClick={scrollToAbout}
            style={{ pointerEvents: "auto", cursor: "none" }}
            className="flex flex-col items-center gap-2 text-gray-400 hover:text-amber-400 transition-colors"
          >
            <div className="w-px h-6 bg-amber-400 opacity-15" />
            <span className="text-xs tracking-[0.4em]" style={{ fontFamily: "var(--font-orbitron)" }}>SCROLL</span>
          </button>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────── */}
      <section
        ref={aboutRef}
        id="about"
        className="relative z-10 py-32 md:py-40"
        style={{ borderTop: "1px solid rgba(245,166,35,0.06)" }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(245,166,35,0.02) 0%, transparent 70%)",
        }} />

        <div className="max-w-4xl mx-auto px-6 md:px-8 relative">

          {/* Section label — centered */}
          <div className="flex items-center justify-center gap-4 mb-20">
            <div className="w-8 h-px" style={{ background: "rgba(245,166,35,0.3)" }} />
            <p className="text-xs tracking-[0.5em] text-gray-400" style={{ fontFamily: "var(--font-orbitron)" }}>
              PROFILE · DENZ-001
            </p>
            <div className="w-8 h-px" style={{ background: "rgba(245,166,35,0.3)" }} />
          </div>

          {/* ── Identity ── */}
          <div className="flex flex-col items-center gap-10 mb-20">

            {/* Avatar */}
            <div className="flex flex-col items-center gap-5">
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
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-xs tracking-[0.3em]" style={{ fontFamily: "var(--font-orbitron)" }}>ONLINE · SOUTH AFRICA</span>
              </div>
            </div>

            {/* Bio */}
            <div className="flex flex-col items-center gap-5 text-center max-w-2xl">
              <div>
                <p className="text-xs tracking-[0.4em] text-gray-400 mb-3" style={{ fontFamily: "var(--font-orbitron)" }}>
                  SOFTWARE ENGINEER · CLASS 2025
                </p>
                <h2 className="text-3xl md:text-4xl text-white tracking-[0.15em] mb-2" style={{ fontFamily: "var(--font-orbitron)" }}>
                  DENZEL CHINGODZA
                </h2>
                <p className="text-amber-400 text-xs tracking-[0.3em] opacity-50" style={{ fontFamily: "var(--font-orbitron)" }}>
                  AI / ML SYSTEMS
                </p>
              </div>

              <div className="w-12 h-px bg-amber-400 opacity-20" />

              <p className="text-gray-500 text-sm leading-[2]">
                Final year software engineering student who learns by building.
                Nothing beats watching something you made actually work.
                Currently focused on AI systems — RAG pipelines, intelligent agents, and stateful applications.
                Built DenzOS as a live showcase of real engineering, themed after my favourite film, Interstellar.
                Also 6&apos;3&quot; — irrelevant, but noted.
              </p>

              <div className="flex items-center gap-3">
                <span className="text-gray-400 text-xs tracking-[0.3em]" style={{ fontFamily: "var(--font-orbitron)" }}>DIRECTIVE</span>
                <div className="w-8 h-px" style={{ background: "rgba(245,166,35,0.1)" }} />
                <span className="text-amber-400 text-xs tracking-[0.3em] opacity-40" style={{ fontFamily: "var(--font-orbitron)" }}>
                  BUILD · LEARN · SHIP
                </span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px mb-20" style={{ background: "linear-gradient(to right, transparent, rgba(245,166,35,0.08), transparent)" }} />

          {/* ── Three panels ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            {/* Capabilities */}
            <div>
              <p className="text-xs tracking-[0.4em] text-gray-400 mb-8" style={{ fontFamily: "var(--font-orbitron)" }}>— CAPABILITIES</p>
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
              <p className="text-xs tracking-[0.4em] text-gray-400 mb-8" style={{ fontFamily: "var(--font-orbitron)" }}>— ACTIVE MISSIONS</p>
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

            {/* Signal Frequency — now prominent buttons */}
            <div>
              <p className="text-xs tracking-[0.4em] text-gray-400 mb-8" style={{ fontFamily: "var(--font-orbitron)" }}>— SIGNAL FREQUENCY</p>
              <div className="flex flex-col gap-3">
                {[
                  { label: "GITHUB",   href: "https://github.com/denzelchingodza",                        sub: "github.com/denzelchingodza" },
                  { label: "LINKEDIN", href: "https://www.linkedin.com/in/denzel-chingodza-45b6ab3a0/",   sub: "in/denzel-chingodza" },
                  { label: "EMAIL",    href: "mailto:denzel.chingodza@icloud.com",                         sub: "denzel.chingodza@icloud.com" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between px-4 py-3 transition-all duration-300"
                    style={{
                      border: "1px solid rgba(245,166,35,0.15)",
                      background: "rgba(245,166,35,0.02)",
                      cursor: "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(245,166,35,0.45)";
                      e.currentTarget.style.background = "rgba(245,166,35,0.06)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(245,166,35,0.15)";
                      e.currentTarget.style.background = "rgba(245,166,35,0.02)";
                    }}
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="text-amber-400 text-xs tracking-[0.3em]" style={{ fontFamily: "var(--font-orbitron)" }}>
                        {link.label}
                      </span>
                      <span className="text-gray-400 text-xs" style={{ fontFamily: "var(--font-inter)", fontSize: "10px" }}>
                        {link.sub}
                      </span>
                    </div>
                    <span className="text-amber-400 opacity-40 group-hover:opacity-100 transition-opacity">↗</span>
                  </a>
                ))}

                {/* Send transmission button */}
                <button
                  onClick={scrollToContact}
                  className="mt-2 flex items-center justify-center gap-2 px-4 py-3 text-xs tracking-[0.3em] transition-all duration-300"
                  style={{
                    fontFamily: "var(--font-orbitron)",
                    cursor: "none",
                    background: "rgba(245,166,35,0.08)",
                    border: "1px solid rgba(245,166,35,0.35)",
                    color: "#f5a623",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(245,166,35,0.15)";
                    e.currentTarget.style.borderColor = "rgba(245,166,35,0.6)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(245,166,35,0.08)";
                    e.currentTarget.style.borderColor = "rgba(245,166,35,0.35)";
                  }}
                >
                  <span>SEND TRANSMISSION</span>
                  <span className="opacity-60">↓</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────── */}
      <section
        ref={contactRef}
        id="contact"
        className="relative z-10 py-32 md:py-40"
        style={{ borderTop: "1px solid rgba(245,166,35,0.06)" }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 50% 40% at 50% 0%, rgba(245,166,35,0.025) 0%, transparent 70%)",
        }} />

        <div className="max-w-xl mx-auto px-6 md:px-8 relative">

          {/* Section label */}
          <div className="flex items-center justify-center gap-4 mb-16">
            <div className="w-8 h-px" style={{ background: "rgba(245,166,35,0.3)" }} />
            <p className="text-xs tracking-[0.5em] text-gray-400" style={{ fontFamily: "var(--font-orbitron)" }}>
              OPEN CHANNEL
            </p>
            <div className="w-8 h-px" style={{ background: "rgba(245,166,35,0.3)" }} />
          </div>

          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl text-white tracking-[0.15em] mb-4" style={{ fontFamily: "var(--font-orbitron)" }}>
              SEND A TRANSMISSION
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Got a project in mind, an opportunity, or just want to connect?<br />
              Drop a message — I read every one.
            </p>
          </div>

          {formState === "sent" ? (
            <div
              className="flex flex-col items-center gap-4 py-16"
              style={{ border: "1px solid rgba(74,222,128,0.2)", background: "rgba(74,222,128,0.03)" }}
            >
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <p className="text-green-400 text-sm tracking-[0.3em]" style={{ fontFamily: "var(--font-orbitron)" }}>
                TRANSMISSION RECEIVED
              </p>
              <p className="text-gray-600 text-xs">Message delivered. I&apos;ll get back to you soon.</p>
              <button
                onClick={() => setFormState("idle")}
                className="mt-2 text-xs tracking-[0.3em] text-gray-600 hover:text-amber-400 transition-colors"
                style={{ fontFamily: "var(--font-orbitron)", cursor: "none" }}
              >
                SEND ANOTHER ↺
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-[0.3em] text-gray-400" style={{ fontFamily: "var(--font-orbitron)" }}>
                    NAME
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your name"
                    className="px-4 py-3 text-sm text-white placeholder-gray-700 bg-transparent outline-none transition-all duration-300 focus:border-amber-400/40"
                    style={{
                      border: "1px solid rgba(255,255,255,0.07)",
                      background: "rgba(255,255,255,0.02)",
                      fontFamily: "var(--font-inter)",
                      cursor: "none",
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(245,166,35,0.3)"; }}
                    onBlur={(e)  => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-[0.3em] text-gray-400" style={{ fontFamily: "var(--font-orbitron)" }}>
                    EMAIL
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="your@email.com"
                    className="px-4 py-3 text-sm text-white placeholder-gray-700 bg-transparent outline-none transition-all duration-300"
                    style={{
                      border: "1px solid rgba(255,255,255,0.07)",
                      background: "rgba(255,255,255,0.02)",
                      fontFamily: "var(--font-inter)",
                      cursor: "none",
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(245,166,35,0.3)"; }}
                    onBlur={(e)  => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-[0.3em] text-gray-400" style={{ fontFamily: "var(--font-orbitron)" }}>
                  MESSAGE
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="What's on your mind..."
                  className="px-4 py-3 text-sm text-white placeholder-gray-700 bg-transparent outline-none resize-none transition-all duration-300"
                  style={{
                    border: "1px solid rgba(255,255,255,0.07)",
                    background: "rgba(255,255,255,0.02)",
                    fontFamily: "var(--font-inter)",
                    cursor: "none",
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(245,166,35,0.3)"; }}
                  onBlur={(e)  => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
                />
              </div>

              {formState === "error" && (
                <p className="text-red-500 text-xs tracking-widest" style={{ fontFamily: "var(--font-orbitron)" }}>
                  TRANSMISSION FAILED — please try again.
                </p>
              )}

              <button
                type="submit"
                disabled={formState === "sending"}
                className="flex items-center justify-center gap-3 py-4 text-xs tracking-[0.4em] transition-all duration-300 disabled:opacity-50"
                style={{
                  fontFamily: "var(--font-orbitron)",
                  cursor: "none",
                  background: formState === "sending" ? "rgba(245,166,35,0.05)" : "rgba(245,166,35,0.1)",
                  border: "1px solid rgba(245,166,35,0.4)",
                  color: "#f5a623",
                }}
                onMouseEnter={(e) => {
                  if (formState !== "sending") {
                    e.currentTarget.style.background = "rgba(245,166,35,0.18)";
                    e.currentTarget.style.borderColor = "rgba(245,166,35,0.7)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(245,166,35,0.1)";
                  e.currentTarget.style.borderColor = "rgba(245,166,35,0.4)";
                }}
              >
                {formState === "sending" ? (
                  <>
                    <span className="w-3 h-3 rounded-full border border-amber-400 border-t-transparent animate-spin" />
                    TRANSMITTING...
                  </>
                ) : (
                  <>SEND TRANSMISSION ↗</>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center gap-4 mt-24 px-8">
          <div className="h-px flex-1 max-w-xs" style={{ background: "linear-gradient(to right, transparent, rgba(245,166,35,0.07))" }} />
          <p className="text-gray-400 text-xs tracking-[0.4em]" style={{ fontFamily: "var(--font-orbitron)" }}>DENZOS · 2025</p>
          <div className="h-px flex-1 max-w-xs" style={{ background: "linear-gradient(to left, transparent, rgba(245,166,35,0.07))" }} />
        </div>
      </section>
    </>
  );
}
