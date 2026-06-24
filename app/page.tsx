"use client";

import { useRef, useState, useEffect } from "react";
import StarField from "@/components/StarField";
import OrbitalSystem from "@/components/OrbitalSystem";
import Navbar from "@/components/Navbar";
import SectionNav from "@/components/SectionNav";

// ── Scroll-reveal wrapper ───────────────────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  from = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  from?: "up" | "left" | "right" | "fade";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const initial =
    from === "up"    ? "translateY(52px)" :
    from === "left"  ? "translateX(-44px)" :
    from === "right" ? "translateX(44px)" : "none";

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : initial,
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ── TARS SVG ────────────────────────────────────────────────────────────────
function Tars({ size = 72 }: { size?: number }) {
  const h = Math.round(size * 3.5);
  const rowH = Math.floor((h - 14) / 5);
  return (
    <div style={{ animation: "tars-float 4.5s ease-in-out infinite", pointerEvents: "none" }}>
      <svg width={size} height={h} viewBox={`0 0 ${size} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        {[0,1,2,3,4].map(i => {
          const y = i * rowH; const isEye = i === 2;
          return (
            <g key={i} style={{ animation: `${i%2===0?"tars-panel-a":"tars-panel-b"} ${(3.8+i*0.6).toFixed(1)}s ${(i*0.25).toFixed(2)}s ease-in-out infinite` }}>
              <rect x="1" y={y+1} width={size-2} height={rowH-3}
                stroke={isEye ? "rgba(245,166,35,0.7)" : "rgba(245,166,35,0.22)"}
                strokeWidth={isEye ? "1.3" : "0.8"}
                fill={isEye ? "rgba(245,166,35,0.05)" : "rgba(7,7,15,0.75)"} />
              <line x1="1" y1={y+Math.floor(rowH*0.38)} x2={size-1} y2={y+Math.floor(rowH*0.38)} stroke="rgba(245,166,35,0.07)" strokeWidth="0.5" />
              <line x1="1" y1={y+Math.floor(rowH*0.72)} x2={size-1} y2={y+Math.floor(rowH*0.72)} stroke="rgba(245,166,35,0.07)" strokeWidth="0.5" />
              {isEye && (<>
                <line x1={Math.round(size*0.14)} y1={y+Math.floor(rowH*0.52)} x2={Math.round(size*0.86)} y2={y+Math.floor(rowH*0.52)}
                  stroke="rgba(245,166,35,0.22)" strokeWidth="10" strokeLinecap="round"
                  style={{ animation: "tars-eye 2.2s ease-in-out infinite" }} />
                <line x1={Math.round(size*0.14)} y1={y+Math.floor(rowH*0.52)} x2={Math.round(size*0.86)} y2={y+Math.floor(rowH*0.52)}
                  stroke="rgba(245,166,35,0.96)" strokeWidth="2" strokeLinecap="round"
                  style={{ animation: "tars-eye 2.2s ease-in-out infinite" }} />
              </>)}
              <circle cx="5"       cy={y+5}       r="1.2" fill="rgba(245,166,35,0.2)" />
              <circle cx={size-5}  cy={y+5}       r="1.2" fill="rgba(245,166,35,0.2)" />
              <circle cx="5"       cy={y+rowH-6}  r="1.2" fill="rgba(245,166,35,0.2)" />
              <circle cx={size-5}  cy={y+rowH-6}  r="1.2" fill="rgba(245,166,35,0.2)" />
            </g>
          );
        })}
        <rect x={Math.round(size*0.33)} y={h-14} width={Math.round(size*0.34)} height={12} rx="1.5"
          fill="rgba(245,166,35,0.1)" stroke="rgba(245,166,35,0.3)" strokeWidth="0.8" />
        <ellipse cx={size/2} cy={h} rx={size*0.3} ry="3" fill="rgba(245,166,35,0.06)" />
      </svg>
      <p style={{ fontFamily: "var(--font-orbitron)", fontSize: "9px", color: "rgba(245,166,35,0.3)", letterSpacing: "0.45em", marginTop: "8px", textAlign: "center" }}>TARS</p>
    </div>
  );
}

// ── Section label ────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: string }) {
  return (
    <Reveal from="left">
      <div className="flex items-center gap-5 mb-16">
        <div className="w-14 h-px" style={{ background: "rgba(245,166,35,0.45)" }} />
        <p style={{ fontFamily: "var(--font-orbitron)", fontSize: "11px", letterSpacing: "0.6em", color: "rgba(245,166,35,0.65)" }}>{children}</p>
      </div>
    </Reveal>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
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
    try {
      const res = await fetch("https://formspree.io/f/xaqzozwr", {
        method: "POST", body: new FormData(form), headers: { Accept: "application/json" },
      });
      if (res.ok) { setFormState("sent"); form.reset(); } else setFormState("error");
    } catch { setFormState("error"); }
  }

  const skills = [
    "Python", "TypeScript", "React", "Next.js", "FastAPI", "PostgreSQL",
    "MongoDB", "Qdrant", "Docker", "AWS", "LangChain", "RAG Pipelines",
  ];

  const missions: { code: string; label: string; href?: string }[] = [
    { code: "01", label: "Completing Software Engineering degree" },
    { code: "02", label: "Building the DenzOS ecosystem" },
    { code: "03", label: "Studying RAG pipelines & AI agents" },
    { code: "04", label: "DocuZen — live AI document chat", href: "https://doc-analyzer-as5k.vercel.app/app" },
  ];

  const links = [
    { label: "GITHUB",   sub: "github.com/denzelchingodza",       href: "https://github.com/denzelchingodza" },
    { label: "LINKEDIN", sub: "in/denzel-chingodza",              href: "https://www.linkedin.com/in/denzel-chingodza-45b6ab3a0/" },
    { label: "EMAIL",    sub: "denzel.chingodza@icloud.com",       href: "mailto:denzel.chingodza@icloud.com" },
  ];

  const bio = [
    "Final year Software Engineering student, Python developer, and someone who takes both software engineering and mathematics seriously — not as separate interests, but as two sides of the same coin.",
    "My foundation is in software engineering. I build systems: APIs, databases, pipelines, cloud infrastructure. But my background in pure mathematics has given me a different kind of intuition — one that goes beyond frameworks and syntax into the reasoning and structure underneath. That's what drew me into AI and machine learning, as a natural and exciting extension of the engineering work I already do.",
    "I'm driven by the desire to build things that actually work and to deeply understand why they work. That combination of engineering discipline and mathematical curiosity is what defines how I approach every project I take on.",
  ];

  const W = "980px";
  const PX = "px-6 md:px-16";
  const LEFT_PAD = "clamp(32px, 7vw, 100px)";

  return (
    <>
      <StarField />
      <Navbar onAboutClick={scrollToAbout} />
      <SectionNav />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section id="hero" className="min-h-screen relative">
        <OrbitalSystem />
        <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-4 z-10" style={{ pointerEvents: "none" }}>
          <p style={{ fontFamily: "var(--font-orbitron)", fontSize: "13px", color: "rgba(255,255,255,0.38)", letterSpacing: "0.32em" }}>
            Denzel Chingodza · Software Engineer · South Africa
          </p>
          <button onClick={scrollToAbout} style={{ pointerEvents: "auto", cursor: "none" }} className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-px h-10" style={{ background: "linear-gradient(to bottom, transparent, rgba(245,166,35,0.4))" }} />
            <span style={{ fontFamily: "var(--font-orbitron)", fontSize: "11px", letterSpacing: "0.55em", color: "rgba(255,255,255,0.25)" }}>SCROLL</span>
          </button>
        </div>
      </section>

      {/* Fade separator */}
      <div className="relative z-10 h-32 pointer-events-none" style={{
        background: "linear-gradient(to bottom, transparent, rgba(7,7,15,0.95) 60%, #07070f)",
        marginTop: "-128px",
      }} />

      {/* ── QUOTE ─────────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center py-28 px-8">
        <Reveal from="fade">
          <div className="w-20 h-px mb-16 mx-auto" style={{ background: "rgba(245,166,35,0.25)" }} />
          <blockquote style={{ textAlign: "center", maxWidth: "720px" }}>
            <p style={{
              fontFamily: "var(--font-orbitron)",
              fontSize: "clamp(12px, 1.3vw, 15px)",
              color: "rgba(255,255,255,0.55)",
              letterSpacing: "0.1em",
              lineHeight: 3,
            }}>
              &ldquo;Do not go gentle into that good night.<br />
              Old age should burn and rave at close of day.<br />
              Rage, rage against the dying of the light.&rdquo;
            </p>
            <p style={{ fontFamily: "var(--font-orbitron)", fontSize: "12px", color: "rgba(245,166,35,0.55)", letterSpacing: "0.4em", marginTop: "28px" }}>
              — DYLAN THOMAS &nbsp;·&nbsp; PROF. BRAND &nbsp;·&nbsp; INTERSTELLAR
            </p>
          </blockquote>
          <div className="w-20 h-px mt-16 mx-auto" style={{ background: "rgba(245,166,35,0.25)" }} />
        </Reveal>
      </div>

      {/* ── ABOUT ─────────────────────────────────────────────────────────── */}
      <section ref={aboutRef} id="about" className="relative z-10 py-28" style={{ borderTop: "1px solid rgba(245,166,35,0.07)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 20%, rgba(245,166,35,0.022) 0%, transparent 70%)",
        }} />
        <div className={`relative mx-auto ${PX}`} style={{ maxWidth: W }}>

          <SectionLabel>ABOUT</SectionLabel>

          {/* Identity */}
          <Reveal from="up" delay={80}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-10 mb-20">
              {/* Avatar */}
              <div className="relative flex items-center justify-center shrink-0">
                <div className="absolute rounded-full" style={{ width: "150px", height: "150px", border: "1px solid rgba(245,166,35,0.1)", animation: "ring-rotate 22s linear infinite" }} />
                <div className="absolute rounded-full" style={{ width: "120px", height: "120px", border: "1px dashed rgba(245,166,35,0.05)", animation: "ring-rotate-reverse 35s linear infinite" }} />
                <div className="rounded-full flex items-center justify-center" style={{ width: "90px", height: "90px", background: "radial-gradient(circle, rgba(245,166,35,0.15) 0%, rgba(7,7,15,1) 70%)", border: "1px solid rgba(245,166,35,0.28)", boxShadow: "0 0 50px rgba(245,166,35,0.1)" }}>
                  <span style={{ fontFamily: "var(--font-orbitron)", color: "#f5a623", fontWeight: 700, fontSize: "24px" }}>DC</span>
                </div>
              </div>
              {/* Name */}
              <div className="flex flex-col gap-4">
                <p style={{ fontFamily: "var(--font-orbitron)", fontSize: "11px", letterSpacing: "0.45em", color: "rgba(255,255,255,0.28)" }}>
                  SOFTWARE ENGINEER · CLASS OF 2025
                </p>
                <h2 style={{ fontFamily: "var(--font-orbitron)", fontSize: "clamp(28px, 4vw, 50px)", color: "#fff", letterSpacing: "0.08em", fontWeight: 700, lineHeight: 1.05 }}>
                  DENZEL<br />CHINGODZA
                </h2>
                <p style={{ fontFamily: "var(--font-orbitron)", fontSize: "12px", letterSpacing: "0.4em", color: "rgba(245,166,35,0.55)" }}>
                  AI / ML SYSTEMS
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span style={{ fontFamily: "var(--font-orbitron)", fontSize: "10px", letterSpacing: "0.3em", color: "#4ade80" }}>
                    AVAILABLE · SOUTH AFRICA
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="w-full h-px mb-20" style={{ background: "linear-gradient(to right, rgba(245,166,35,0.25), transparent)" }} />

          {/* Bio */}
          <div className="flex flex-col gap-10 mb-28">
            {bio.map((para, i) => (
              <Reveal key={i} from="up" delay={i * 130}>
                <p style={{
                  fontFamily: "var(--font-orbitron)",
                  fontSize: "clamp(12px, 1.2vw, 14px)",
                  color: "rgba(255,255,255,0.62)",
                  lineHeight: 2.2,
                  letterSpacing: "0.03em",
                }}>
                  {para}
                </p>
              </Reveal>
            ))}
          </div>

          {/* TARS + Directive */}
          <Reveal from="up" delay={100}>
            <div className="flex items-center gap-12 pb-4">
              <Tars size={68} />
              <div className="flex flex-col gap-4">
                <p style={{ fontFamily: "var(--font-orbitron)", fontSize: "12px", letterSpacing: "0.4em", color: "rgba(255,255,255,0.2)" }}>
                  DIRECTIVE
                </p>
                <p style={{ fontFamily: "var(--font-orbitron)", fontSize: "clamp(16px, 2.2vw, 24px)", letterSpacing: "0.22em", color: "rgba(245,166,35,0.65)", fontWeight: 700 }}>
                  BUILD · LEARN · SHIP
                </p>
                <p style={{ fontFamily: "var(--font-orbitron)", fontSize: "12px", color: "rgba(255,255,255,0.35)", lineHeight: 2, letterSpacing: "0.04em", maxWidth: "440px" }}>
                  Every project is a chance to go deeper. Systems that work, code that lasts, ideas worth building.
                </p>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ── CAPABILITIES ──────────────────────────────────────────────────── */}
      <section className="relative z-10 py-28" style={{ borderTop: "1px solid rgba(245,166,35,0.07)" }}>
        <div style={{ paddingLeft: LEFT_PAD, paddingRight: "clamp(32px, 5vw, 80px)" }}>
          <SectionLabel>CAPABILITIES</SectionLabel>
          <div className="flex flex-wrap gap-3">
            {skills.map((s, i) => (
              <Reveal key={s} from="up" delay={i * 55}>
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-orbitron)",
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.55)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    padding: "9px 18px",
                    letterSpacing: "0.14em",
                    transition: "all 0.3s ease",
                    cursor: "default",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = "#f5a623";
                    el.style.borderColor = "rgba(245,166,35,0.55)";
                    el.style.background = "rgba(245,166,35,0.07)";
                    el.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = "rgba(255,255,255,0.55)";
                    el.style.borderColor = "rgba(255,255,255,0.1)";
                    el.style.background = "transparent";
                    el.style.transform = "none";
                  }}
                >
                  {s}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACTIVE MISSIONS ───────────────────────────────────────────────── */}
      <section className="relative z-10 py-28" style={{ borderTop: "1px solid rgba(245,166,35,0.07)" }}>
        <div style={{ paddingLeft: LEFT_PAD, paddingRight: "clamp(32px, 5vw, 80px)" }}>
          <SectionLabel>ACTIVE MISSIONS</SectionLabel>
          <div className="flex flex-col gap-4">
            {missions.map((item, i) => (
              <Reveal key={item.code} from="left" delay={i * 110}>
                <div
                  className="flex items-center gap-7 px-7 py-6 transition-all duration-350"
                  style={{ border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.01)", cursor: item.href ? "pointer" : "default", maxWidth: "680px" }}
                  onClick={() => item.href && window.open(item.href, "_blank")}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "rgba(245,166,35,0.35)";
                    e.currentTarget.style.background = "rgba(245,166,35,0.04)";
                    e.currentTarget.style.transform = "translateX(8px)";
                    e.currentTarget.style.transition = "all 0.35s ease";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.01)";
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  <span style={{ fontFamily: "var(--font-orbitron)", fontSize: "12px", letterSpacing: "0.3em", color: "rgba(245,166,35,0.35)", flexShrink: 0, minWidth: "30px" }}>
                    {item.code}
                  </span>
                  <p style={{ fontFamily: "var(--font-orbitron)", fontSize: "clamp(13px, 1.4vw, 16px)", color: "rgba(255,255,255,0.75)", letterSpacing: "0.06em" }}>
                    {item.label}
                    {item.href && <span style={{ marginLeft: "10px", fontSize: "10px", color: "rgba(245,166,35,0.5)", letterSpacing: "0.2em" }}>↗</span>}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SIGNAL FREQUENCY ──────────────────────────────────────────────── */}
      <section className="relative z-10 py-28" style={{ borderTop: "1px solid rgba(245,166,35,0.07)" }}>
        <div style={{ paddingLeft: LEFT_PAD, paddingRight: "clamp(32px, 5vw, 80px)" }}>
          <SectionLabel>SIGNAL FREQUENCY</SectionLabel>
          <div className="flex flex-col gap-3" style={{ maxWidth: "620px" }}>
            {links.map((link, i) => (
              <Reveal key={link.label} from="left" delay={i * 110}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between px-7 py-6 transition-all duration-300"
                  style={{
                    border: "1px solid rgba(245,166,35,0.3)",
                    background: "rgba(245,166,35,0.05)",
                    cursor: "none",
                    borderLeft: "3px solid rgba(245,166,35,0.7)",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "rgba(245,166,35,0.6)";
                    e.currentTarget.style.borderLeftColor = "rgba(245,166,35,1)";
                    e.currentTarget.style.background = "rgba(245,166,35,0.1)";
                    e.currentTarget.style.transform = "translateX(6px)";
                    e.currentTarget.style.transition = "all 0.3s ease";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "rgba(245,166,35,0.3)";
                    e.currentTarget.style.borderLeftColor = "rgba(245,166,35,0.7)";
                    e.currentTarget.style.background = "rgba(245,166,35,0.05)";
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  <div className="flex flex-col gap-1.5">
                    <span style={{ fontFamily: "var(--font-orbitron)", fontSize: "13px", letterSpacing: "0.4em", color: "#f5a623" }}>
                      {link.label}
                    </span>
                    <span style={{ fontFamily: "var(--font-orbitron)", fontSize: "12px", color: "rgba(255,255,255,0.55)", letterSpacing: "0.06em" }}>
                      {link.sub}
                    </span>
                  </div>
                  <span style={{ fontSize: "18px", color: "rgba(245,166,35,0.6)", transition: "all 0.3s" }}>↗</span>
                </a>
              </Reveal>
            ))}

            <Reveal from="up" delay={360}>
              <button
                onClick={scrollToContact}
                className="flex items-center justify-center gap-3 py-5 mt-5 w-full transition-all duration-300"
                style={{ fontFamily: "var(--font-orbitron)", fontSize: "12px", letterSpacing: "0.4em", cursor: "none", background: "rgba(245,166,35,0.08)", border: "1px solid rgba(245,166,35,0.38)", color: "#f5a623" }}
                onMouseEnter={e => { e.currentTarget.style.background="rgba(245,166,35,0.16)"; e.currentTarget.style.borderColor="rgba(245,166,35,0.65)"; }}
                onMouseLeave={e => { e.currentTarget.style.background="rgba(245,166,35,0.08)"; e.currentTarget.style.borderColor="rgba(245,166,35,0.38)"; }}
              >
                SEND TRANSMISSION <span className="opacity-55">↓</span>
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CONTACT ───────────────────────────────────────────────────────── */}
      <section ref={contactRef} id="contact" className="relative z-10 py-28 md:py-40" style={{ borderTop: "1px solid rgba(245,166,35,0.07)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(245,166,35,0.025) 0%, transparent 70%)",
        }} />

        <div className={`relative mx-auto ${PX}`} style={{ maxWidth: W }}>

          <SectionLabel>OPEN CHANNEL</SectionLabel>

          <Reveal from="up" delay={80}>
            <div className="mb-16">
              <h2 style={{ fontFamily: "var(--font-orbitron)", fontSize: "clamp(24px, 3.5vw, 42px)", color: "#fff", letterSpacing: "0.1em", fontWeight: 700, marginBottom: "20px" }}>
                SEND A TRANSMISSION
              </h2>
              <p style={{ fontFamily: "var(--font-orbitron)", fontSize: "13px", color: "rgba(255,255,255,0.4)", lineHeight: 2.1, letterSpacing: "0.05em" }}>
                Got a project in mind, an opportunity, or just want to connect?<br />
                Drop a message — I read every one.
              </p>
            </div>
          </Reveal>

          {formState === "sent" ? (
            <Reveal from="up">
              <div className="flex flex-col items-center gap-6 py-24" style={{ border: "1px solid rgba(74,222,128,0.2)", background: "rgba(74,222,128,0.03)" }}>
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                <p style={{ fontFamily: "var(--font-orbitron)", fontSize: "18px", letterSpacing: "0.3em", color: "#4ade80" }}>TRANSMISSION RECEIVED</p>
                <p style={{ fontFamily: "var(--font-orbitron)", fontSize: "13px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em" }}>Message delivered. I&apos;ll get back to you soon.</p>
                <button onClick={() => setFormState("idle")}
                  style={{ fontFamily: "var(--font-orbitron)", fontSize: "13px", letterSpacing: "0.3em", cursor: "none", marginTop: "8px", color: "rgba(255,255,255,0.3)", background: "none", border: "none" }}
                  onMouseEnter={e => (e.currentTarget.style.color="#f5a623")}
                  onMouseLeave={e => (e.currentTarget.style.color="rgba(255,255,255,0.3)")}
                >
                  SEND ANOTHER ↺
                </button>
              </div>
            </Reveal>
          ) : (
            <Reveal from="up" delay={160}>
              <form onSubmit={handleSubmit} className="flex flex-col gap-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                  {[
                    { label: "NAME",  name: "name",  type: "text",  placeholder: "Your name" },
                    { label: "EMAIL", name: "email", type: "email", placeholder: "your@email.com" },
                  ].map(f => (
                    <div key={f.name} className="flex flex-col gap-3">
                      <label style={{ fontFamily: "var(--font-orbitron)", fontSize: "12px", letterSpacing: "0.45em", color: "rgba(255,255,255,0.38)" }}>{f.label}</label>
                      <input type={f.type} name={f.name} required placeholder={f.placeholder}
                        className="outline-none"
                        style={{ fontFamily: "var(--font-orbitron)", fontSize: "13px", padding: "15px 18px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.09)", color: "#fff", cursor: "none", transition: "border-color 0.3s" }}
                        onFocus={e => e.currentTarget.style.borderColor="rgba(245,166,35,0.45)"}
                        onBlur={e  => e.currentTarget.style.borderColor="rgba(255,255,255,0.09)"} />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-3">
                  <label style={{ fontFamily: "var(--font-orbitron)", fontSize: "12px", letterSpacing: "0.45em", color: "rgba(255,255,255,0.38)" }}>MESSAGE</label>
                  <textarea name="message" required rows={7} placeholder="What's on your mind..."
                    className="outline-none resize-none"
                    style={{ fontFamily: "var(--font-orbitron)", fontSize: "13px", padding: "15px 18px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.09)", color: "#fff", cursor: "none", transition: "border-color 0.3s", lineHeight: 1.9 }}
                    onFocus={e => e.currentTarget.style.borderColor="rgba(245,166,35,0.45)"}
                    onBlur={e  => e.currentTarget.style.borderColor="rgba(255,255,255,0.09)"} />
                </div>
                {formState === "error" && (
                  <p style={{ fontFamily: "var(--font-orbitron)", fontSize: "13px", color: "#ef4444", letterSpacing: "0.2em" }}>TRANSMISSION FAILED — please try again.</p>
                )}
                <button type="submit" disabled={formState === "sending"}
                  className="flex items-center justify-center gap-3 py-6 transition-all duration-300 disabled:opacity-50"
                  style={{ fontFamily: "var(--font-orbitron)", fontSize: "13px", letterSpacing: "0.4em", cursor: "none", background: formState === "sending" ? "rgba(245,166,35,0.05)" : "rgba(245,166,35,0.1)", border: "1px solid rgba(245,166,35,0.45)", color: "#f5a623" }}
                  onMouseEnter={e => { if (formState !== "sending") { e.currentTarget.style.background="rgba(245,166,35,0.18)"; e.currentTarget.style.borderColor="rgba(245,166,35,0.75)"; }}}
                  onMouseLeave={e => { e.currentTarget.style.background = formState === "sending" ? "rgba(245,166,35,0.05)" : "rgba(245,166,35,0.1)"; e.currentTarget.style.borderColor = "rgba(245,166,35,0.45)"; }}
                >
                  {formState === "sending"
                    ? <><span className="w-4 h-4 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />TRANSMITTING...</>
                    : <>SEND TRANSMISSION ↗</>}
                </button>
              </form>
            </Reveal>
          )}
        </div>

        {/* Footer */}
        <Reveal from="fade" delay={200}>
          <div className="flex items-center justify-center gap-6 mt-36 px-8">
            <div className="h-px flex-1 max-w-sm" style={{ background: "linear-gradient(to right, transparent, rgba(245,166,35,0.1))" }} />
            <p style={{ fontFamily: "var(--font-orbitron)", fontSize: "12px", letterSpacing: "0.55em", color: "rgba(255,255,255,0.18)" }}>DENZOS · 2025</p>
            <div className="h-px flex-1 max-w-sm" style={{ background: "linear-gradient(to left, transparent, rgba(245,166,35,0.1))" }} />
          </div>
        </Reveal>
      </section>
    </>
  );
}
