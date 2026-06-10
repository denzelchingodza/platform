"use client";

import { useRef } from "react";
import Cursor from "./Cursor";
import AudioPlayer from "./AudioPlayer";
import DataLines from "./DataLines";
import IntroScreen from "./IntroScreen";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const playAudioRef = useRef<(() => void) | null>(null);

  const handleIntroComplete = () => {
    // Called directly inside the button click — within the user gesture window
    playAudioRef.current?.();
  };

  return (
    <>
      <IntroScreen onComplete={handleIntroComplete} />
      <Cursor />
      <AudioPlayer onRegisterPlay={(fn) => { playAudioRef.current = fn; }} />
      <DataLines />
      {children}
    </>
  );
}
