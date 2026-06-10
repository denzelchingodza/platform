"use client";

import { useRef, useState } from "react";
import Cursor from "./Cursor";
import DataLines from "./DataLines";
import IntroScreen from "./IntroScreen";
import AudioPlayer from "./AudioPlayer";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  // Called directly inside IntroScreen's button onClick — within the gesture window
  const handleIntroComplete = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.3;
    audio.play().then(() => setPlaying(true)).catch(() => {});
  };

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      const fade = setInterval(() => {
        if (audio.volume > 0.05) {
          audio.volume = Math.max(0, audio.volume - 0.03);
        } else {
          clearInterval(fade);
          audio.pause();
          audio.volume = 0.3;
        }
      }, 80);
      setPlaying(false);
    } else {
      audio.volume = 0.3;
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/ambient.mp3" loop />
      <IntroScreen onComplete={handleIntroComplete} />
      <Cursor />
      <AudioPlayer playing={playing} onToggle={toggleAudio} />
      <DataLines />
      {children}
    </>
  );
}
