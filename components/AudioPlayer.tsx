"use client";

interface AudioPlayerProps {
  playing: boolean;
  onToggle: () => void;
}

export default function AudioPlayer({ playing, onToggle }: AudioPlayerProps) {
  return (
    <button
      onClick={onToggle}
      className="fixed bottom-6 right-6 z-50 text-xs tracking-[0.2em] transition-all duration-300"
      style={{
        fontFamily: "var(--font-orbitron)",
        padding: "10px 18px",
        border: playing ? "1px solid rgba(245,166,35,0.4)" : "1px solid rgba(255,255,255,0.1)",
        background: playing ? "rgba(245,166,35,0.08)" : "rgba(7,7,15,0.8)",
        color: playing ? "#f5a623" : "#475569",
      }}
    >
      {playing ? "⏸ MUTE" : "▶ SOUND"}
    </button>
  );
}
