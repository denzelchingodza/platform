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

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
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
      >
        {playing ? "⏸ SOUND" : "▶ SOUND"}
      </button>
    </>
  );
}