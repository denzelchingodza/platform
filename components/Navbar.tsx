"use client";

import { useRouter } from "next/navigation";
import { usePageTransition } from "@/context/TransitionContext";

interface NavbarProps {
  onAboutClick?: () => void;
}

export default function Navbar({ onAboutClick }: NavbarProps) {
  const router = useRouter();
  const { trigger } = usePageTransition();

  const navigate = (path: string) => {
    trigger(() => router.push(path));
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
      style={{ borderBottom: "1px solid rgba(245,166,35,0.07)" }}
    >
      <button
        onClick={() => navigate("/")}
        className="text-amber-400 text-lg tracking-widest glow-amber"
        style={{ fontFamily: "var(--font-orbitron)", cursor: "none" }}
      >
        DENZ<span className="text-white">OS</span>
      </button>

      <div className="flex gap-10">
        <button
          onClick={() => navigate("/projects")}
          className="text-gray-500 hover:text-amber-400 transition-colors duration-300 text-xs tracking-[0.3em]"
          style={{ fontFamily: "var(--font-orbitron)", cursor: "none" }}
        >
          PROJECTS
        </button>

        {onAboutClick ? (
          <button
            onClick={onAboutClick}
            className="text-gray-500 hover:text-amber-400 transition-colors duration-300 text-xs tracking-[0.3em]"
            style={{ fontFamily: "var(--font-orbitron)", cursor: "none" }}
          >
            ABOUT
          </button>
        ) : (
          <button
            onClick={() => navigate("/#about")}
            className="text-gray-500 hover:text-amber-400 transition-colors duration-300 text-xs tracking-[0.3em]"
            style={{ fontFamily: "var(--font-orbitron)", cursor: "none" }}
          >
            ABOUT
          </button>
        )}
      </div>
    </nav>
  );
}