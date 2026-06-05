"use client";

import { useEffect, useRef, useState } from "react";

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
    }
  }, []);

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
    } else {
      audioRef.current.volume = 0.3;
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/ambient.mp3" loop />
      <button
        onClick={toggle}
        className="fixed bottom-6 right-6 z-50 bg-amber-400 text-black px-4 py-2 rounded-full text-sm font-semibold tracking-wide hover:bg-amber-300 transition-all"
        style={{ fontFamily: "var(--font-orbitron)" }}
      >
        {playing ? "⏸ SOUND" : "▶ SOUND"}
      </button>
    </>
  );
}