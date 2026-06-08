"use client";

import { useEffect, useRef, useState } from "react";

export default function AudioPlayer({ autoPlay = false }: { autoPlay?: boolean }) {
  const audioRef  = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const startedRef = useRef(false);

  // Auto-play once intro completes
  useEffect(() => {
    if (!autoPlay || startedRef.current || !audioRef.current) return;
    startedRef.current = true;

    audioRef.current.volume = 0.3;
    audioRef.current.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false)); // browser may block; user can press play
  }, [autoPlay]);

  const fadeOut = () => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    const fade = setInterval(() => {
      if (audio.volume > 0.05) {
        audio.volume = Math.max(0, audio.volume - 0.03);
      } else {
        clearInterval(fade);
        audio.pause();
        audio.volume = 0.3;
      }
    }, 80);
  };

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      fadeOut();
      setPlaying(false);
    } else {
      audioRef.current.volume = 0.3;
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/ambient.mp3" loop />
      <button
        onClick={toggle}
        className="fixed bottom-6 right-6 z-50 text-xs tracking-[0.2em] transition-all duration-300"
        style={{
          fontFamily: "var(--font-orbitron)",
          cursor: "none",
          padding: "10px 18px",
          border: playing ? "1px solid rgba(245,166,35,0.4)" : "1px solid rgba(255,255,255,0.1)",
          background: playing ? "rgba(245,166,35,0.08)" : "rgba(7,7,15,0.8)",
          color: playing ? "#f5a623" : "#475569",
        }}
      >
        {playing ? "⏸ MUTE" : "▶ SOUND"}
      </button>
    </>
  );
}
