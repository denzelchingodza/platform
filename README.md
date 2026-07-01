# Denzel Chingodza — Portfolio

Personal portfolio built with plain HTML, CSS, and vanilla JavaScript. No frameworks, no build tools, no dependencies.

**Live:** [your-url-here]

---

## What it is

A single-page portfolio designed to show who I am and what I've built. It opens with a dark entry screen that starts ambient audio on click, then reveals a full portfolio with an animated starfield hero, a canvas-based orbital project system where each planet represents a project, an about section with my background and experience, a skills grid, and a contact form.

The orbital system is the main visual feature. Five projects orbit a central dot on an HTML canvas. Each planet is clickable and opens the project details in a side panel. Orbits are elliptical, planets are sorted by depth each frame for correct layering, and everything scales dynamically to the viewport.

---

## Projects

| # | Project | Stack | Status |
|---|---------|-------|--------|
| 01 | StackScope | Python, Flask, spaCy, scikit-learn, Docker | Live |
| 02 | DocuZen | FastAPI, Next.js, pgvector, PostgreSQL, OpenAI | Live |
| 03 | Sentinel | Next.js, AWS Lambda, DynamoDB, EventBridge, Terraform | Live |
| 04 | LinkUP | HTML, CSS, JavaScript, FastAPI, MongoDB | Live |
| 05 | AI Tutor | FastAPI, Python, PostgreSQL, React, OpenAI | In Progress |

---

## Tech

- HTML, CSS, vanilla JavaScript — no frameworks
- Canvas API for the orbital animation and starfield
- Google Fonts: Space Grotesk (UI), Orbitron (display), Inter (body)
- Formspree for the contact form
- Netlify or Vercel for deployment

---

## Running locally

Open `public/index.html` in a browser. For audio to work, use a local server instead of opening the file directly:

```bash
cd public
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

---

## Deployment

### Netlify

`netlify.toml` is already configured. Import the repo on Netlify and it deploys automatically — no build command, publishes from `public/`.

### Vercel

`vercel.json` is already configured. Import the repo on Vercel, leave all build settings as default, and it will serve `public/index.html` as a static site.

Push to `main` to trigger a redeploy on either platform.

---

## Adding a project

Open `public/index.html` and add an entry to the `PROJECTS` array and a matching entry to `ORBIT_BASE` in the JavaScript section.

---

## Author

**Denzel Chingodza** — BSc Software Engineering student, South Africa

- GitHub: [github.com/denzelchingodza](https://github.com/denzelchingodza)
- LinkedIn: [linkedin.com/in/denzel-chingodza-45b6ab3a0](https://www.linkedin.com/in/denzel-chingodza-45b6ab3a0/)
- Email: denzel.chingodza@icloud.com
