# DENZOS: Live Software Ecosystem

> A centralized developer platform that acts as both a professional portfolio and a live software ecosystem. Built by Denzel Chingodza.

**Live:** [platform-nine-ochre.vercel.app](https://platform-nine-ochre.vercel.app)

---

## What is DenzOS?

DenzOS is not a portfolio with screenshots. It is a live, interactive ecosystem where every project is a fully deployed, functional application. Themed after Interstellar, the platform visualizes projects as satellites orbiting a black hole — each one clickable, each one real.

Built to demonstrate engineering capability through shipped software, not static presentations.

---

## Platform Features

- Interactive orbital system — projects orbit as live satellites
- Interstellar visual theme — animated starfield, data lines, custom cursor, ambient audio
- Smooth page transitions with fade-to-black navigation
- Project detail modals with live status, tech stack, and links
- About section with full developer profile
- Auto-deploys to Vercel on every push to `main`

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Fonts:** Orbitron, Inter (Google Fonts)
- **Animation:** CSS keyframes, Canvas API
- **Deployment:** Vercel

---

## Projects in the Ecosystem

| Project | Status | Stack |
|---|---|---|
| DocuZen | Live | FastAPI, Next.js, pgvector, PostgreSQL, OpenAI |
| Sentinel | Live | Next.js, AWS Lambda, DynamoDB, EventBridge, Terraform |
| AI Tutor | In Progress | FastAPI, Python, PostgreSQL, React, OpenAI |
| LinkUP | Live | HTML, CSS, JavaScript, FastAPI, MongoDB |

---

## Running Locally

```bash
git clone https://github.com/denz-os/platform.git
cd platform
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Adding a New Project

Open `lib/projects.ts` and add an entry to the array:

```ts
{
  id: "project-id",
  name: "Project Name",
  description: "What it does and who it's for.",
  tech: ["FastAPI", "React", "PostgreSQL"],
  status: "in-progress",
  liveUrl: null,
  githubUrl: "https://github.com/denz-os/project-name",
}
```

The project automatically appears as an orbiting node on the home page and as a card on the projects page.

---

## Deployment

Connected to Vercel via GitHub. Every push to `main` triggers an automatic redeploy.

```bash
git add .
git commit -m "your message"
git push origin main
```

---

## Author

**Denzel Chingodza**, Software Engineer, South Africa

- GitHub: [github.com/denzelchingodza](https://github.com/denzelchingodza)
- LinkedIn: [linkedin.com/in/denzel-chingodza-45b6ab3a0](https://www.linkedin.com/in/denzel-chingodza-45b6ab3a0/)
- Email: denzel.chingodza@icloud.com
