import StarField from "@/components/StarField";
import AudioPlayer from "@/components/AudioPlayer";
import Gargantua from "@/components/Gargantua";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <StarField />
      <Gargantua />
      <Navbar />
      <AudioPlayer />

      <div className="relative z-10 flex flex-col items-center text-center px-4">

        <div className="flex items-center gap-4 mb-10">
          <div className="w-10 h-px bg-amber-400 opacity-30" />
          <p
            className="text-xs tracking-[0.5em] text-gray-600"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            MISSION: DENZ-001
          </p>
          <div className="w-10 h-px bg-amber-400 opacity-30" />
        </div>

        <h1 className="text-8xl md:text-9xl font-bold tracking-[0.15em] text-amber-400 glow-amber">
          DENZOS
        </h1>

        <div
          className="w-64 h-px my-8 bg-amber-400 opacity-20"
          style={{ boxShadow: "0 0 12px rgba(245,166,35,0.5)" }}
        />

        <p
          className="text-white text-sm tracking-[0.4em] uppercase mb-2"
          style={{ fontFamily: "var(--font-orbitron)" }}
        >
          Denzel Chingodza
        </p>
        <p className="text-gray-600 text-xs tracking-[0.3em] uppercase">
          Software Engineer· South Africa
        </p>

        <p
          className="mt-20 text-gray-700 text-xs tracking-[0.35em] animate-pulse"
          style={{ fontFamily: "var(--font-orbitron)" }}
        >
          APPROACH GARGANTUA TO EXPLORE
        </p>

      </div>
    </main>
  );
}