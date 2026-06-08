"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePageTransition } from "@/context/TransitionContext";

interface NavbarProps {
  onAboutClick?: () => void;
}

export default function Navbar({ onAboutClick }: NavbarProps) {
  const router        = useRouter();
  const { trigger }   = usePageTransition();
  const [open, setOpen] = useState(false);

  const navigate = (path: string) => {
    setOpen(false);
    trigger(() => router.push(path));
  };

  const handleAbout = () => {
    setOpen(false);
    if (onAboutClick) {
      onAboutClick();
    } else {
      trigger(() => router.push("/#about"));
    }
  };

  const handleContact = () => {
    setOpen(false);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8 py-5"
        style={{ borderBottom: "1px solid rgba(245,166,35,0.07)", background: "rgba(7,7,15,0.6)", backdropFilter: "blur(12px)" }}
      >
        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          className="text-amber-400 text-base md:text-lg tracking-widest glow-amber"
          style={{ fontFamily: "var(--font-orbitron)", cursor: "none" }}
        >
          DENZ<span className="text-white">OS</span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex gap-10">
          <button
            onClick={() => navigate("/projects")}
            className="text-gray-500 hover:text-amber-400 transition-colors duration-300 text-xs tracking-[0.3em]"
            style={{ fontFamily: "var(--font-orbitron)", cursor: "none" }}
          >
            PROJECTS
          </button>
          <button
            onClick={handleAbout}
            className="text-gray-500 hover:text-amber-400 transition-colors duration-300 text-xs tracking-[0.3em]"
            style={{ fontFamily: "var(--font-orbitron)", cursor: "none" }}
          >
            ABOUT
          </button>
          <button
            onClick={handleContact}
            className="text-gray-500 hover:text-amber-400 transition-colors duration-300 text-xs tracking-[0.3em]"
            style={{ fontFamily: "var(--font-orbitron)", cursor: "none" }}
          >
            CONTACT
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          style={{ cursor: "none" }}
        >
          <div className="w-5 h-px transition-all duration-300" style={{ background: open ? "#f5a623" : "rgba(255,255,255,0.4)", transform: open ? "rotate(45deg) translate(2px, 2px)" : "none" }} />
          <div className="w-5 h-px transition-all duration-300" style={{ background: open ? "transparent" : "rgba(255,255,255,0.4)", opacity: open ? 0 : 1 }} />
          <div className="w-5 h-px transition-all duration-300" style={{ background: open ? "#f5a623" : "rgba(255,255,255,0.4)", transform: open ? "rotate(-45deg) translate(2px, -2px)" : "none" }} />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 md:hidden"
          style={{ background: "rgba(7,7,15,0.97)", backdropFilter: "blur(20px)" }}
        >
          {[
            { label: "HOME",     action: () => navigate("/")          },
            { label: "PROJECTS", action: () => navigate("/projects")  },
            { label: "ABOUT",    action: handleAbout    },
            { label: "CONTACT",  action: handleContact },
          ].map(({ label, action }) => (
            <button
              key={label}
              onClick={action}
              className="text-gray-500 hover:text-amber-400 transition-colors duration-300 text-2xl tracking-[0.4em]"
              style={{ fontFamily: "var(--font-orbitron)", cursor: "none" }}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
