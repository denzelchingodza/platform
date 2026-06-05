import StarField from "@/components/StarField";
import AudioPlayer from "@/components/AudioPlayer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative">
      <StarField />
      <AudioPlayer />
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-6xl text-amber-400 tracking-widest">DENZOS</h1>
        <p className="mt-4 text-gray-400 text-lg">
          A live software ecosystem built by Denzel Chingodza
        </p>
      </div>
    </main>
  );
}