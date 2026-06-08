"use client";

import { useState, useEffect } from "react";
import Cursor from "./Cursor";
import AudioPlayer from "./AudioPlayer";
import DataLines from "./DataLines";
import IntroScreen from "./IntroScreen";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    // If intro was already seen this session, skip straight to ready state
    if (sessionStorage.getItem("denzos-intro") === "seen") {
      setIntroComplete(true);
    }
  }, []);

  return (
    <>
      <IntroScreen onComplete={() => setIntroComplete(true)} />
      <Cursor />
      <AudioPlayer autoPlay={introComplete} />
      <DataLines />
      {children}
    </>
  );
}
