export type Project = {
  id: string;
  name: string;
  description: string;
  tech: string[];
  status: "live" | "in-progress" | "coming-soon";
  liveUrl: string | null;
  githubUrl: string;
};

export const projects: Project[] = [
  {
    id: "doc-analyzer",
    name: "Doc Analyzer",
    description:
      "AI-powered document analysis for SA legal and finance firms. Upload contracts, ask natural language questions, get precise answers with page references.",
    tech: ["FastAPI", "Python", "Qdrant", "React", "PostgreSQL"],
    status: "in-progress",
    liveUrl: null,
    githubUrl: "https://github.com/denz-os/doc-analyzer",
  },
  {
    id: "ai-tutor",
    name: "AI Tutor",
    description:
      "Adaptive AI tutor using the Socratic method. Tracks what you know across sessions, revisits weak spots automatically, and adjusts difficulty over time.",
    tech: ["FastAPI", "Python", "PostgreSQL", "React", "OpenAI"],
    status: "in-progress",
    liveUrl: null,
    githubUrl: "https://github.com/denz-os/ai-tutor",
  },
  {
  id: "ecommerce",
  name: "LinkUP",
  description: "A peer-to-peer marketplace for South Africa. Buy, sell, and connect — with full user management, admin controls, product listings, cart, and messaging.",
  tech: ["HTML", "CSS", "JavaScript", "FastAPI", "MongoDB"],
  status: "live",
  liveUrl: null,
  githubUrl: "https://github.com/denz-os/ecommerce",
},
];