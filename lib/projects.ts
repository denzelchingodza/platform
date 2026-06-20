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
    name: "DocuZen",
    description:
      "AI-powered document intelligence. Upload any PDF or Word doc, ask natural language questions, get precise answers with page-level citations — powered by RAG. Password: docuzen2026",
    tech: ["FastAPI", "Next.js", "pgvector", "PostgreSQL", "OpenAI"],
    status: "live",
    liveUrl: "https://docuzen.netlify.app",
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
    liveUrl: "https://boisterous-biscotti-ebb824.netlify.app",
    githubUrl: "https://github.com/denz-os/ecommerce",
  },
  {
    id: "sentinel",
    name: "Sentinel",
    description: "Uptime monitoring system. Add a URL, it checks every 60 seconds, emails you when something goes down and again when it recovers. Real-time dashboard with response times, uptime percentage, and incident history.",
    tech: ["Next.js", "AWS Lambda", "DynamoDB", "EventBridge", "SES", "Terraform"],
    status: "live",
    liveUrl: "https://sentinel-kappa-wine.vercel.app",
    githubUrl: "https://github.com/denzelchingodza/sentinel",
  },
];