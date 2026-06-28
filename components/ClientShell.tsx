"use client";

import { useEffect, useRef, useState } from "react";
import Cursor from "./Cursor";
import DataLines from "./DataLines";
import IntroScreen from "./IntroScreen";
import AudioPlayer from "./AudioPlayer";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const audioRef    = useRef<HTMLAudioElement>(null);
  const wantsPlay   = useRef(true);
  const [playing, setPlaying]         = useState(true);
  const [introComplete, setIntroComplete] = useState(false);

  // Attempt autoplay on mount; fall back to first user gesture
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.3;

    audio.play()
      .then(() => setPlaying(true))
      .catch(() => {
        // Browser blocked autoplay — play on the first click/keypress
        const onGesture = () => {
          if (!wantsPlay.current) return;
          audio.play().then(() => setPlaying(true)).catch(() => {});
        };
        document.addEventListener("click",   onGesture, { once: true });
        document.addEventListener("keydown", onGesture, { once: true });
      });
  }, []);

  // Also called from IntroScreen's skip/complete (inside a user gesture — guaranteed to work)
  const handleIntroComplete = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.3;
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
    // Start fading in the main page at the same moment the intro fades out
    setIntroComplete(true);
  };

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      wantsPlay.current = false;
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
      wantsPlay.current = true;
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
      <div style={{
        opacity: introComplete ? 1 : 0,
        transition: "opacity 1.2s ease",
        willChange: "opacity",
      }}>
        {children}
      </div>
    </>
  );
}
