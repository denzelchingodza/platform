import StarField from "@/components/StarField";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/projects";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen relative page-enter">
      <StarField />
      <Navbar />

      <div className="relative z-10 max-w-6xl mx-auto" style={{ padding: "144px 32px 96px" }}>

        {/* Header */}
        <div className="mb-20">
          <p
            className="text-xs tracking-[0.5em] text-gray-600 mb-4"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            — ACTIVE MISSIONS
          </p>
          <h1
            className="text-5xl text-white tracking-[0.2em] mb-4"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            PROJECTS
          </h1>
          <div className="w-16 h-px bg-amber-400 opacity-30 mb-4" />
          <p className="text-gray-600 text-sm tracking-wider">
            {projects.length} systems in the DenzOS ecosystem
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

      </div>
    </main>
  );
}