# Denzel Chingodza — Portfolio

Personal portfolio and project showcase. Built with plain HTML, CSS, and vanilla JavaScript. No frameworks, no build step.

**Live:** [portfolio URL here]

---

## About

BSc Software Engineering student based in South Africa. I build software systems and I'm studying NLP and language models. Everything in this portfolio is something I built myself.

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

- HTML, CSS, vanilla JavaScript
- Canvas API for the orbital animation and starfield
- Google Fonts: Space Grotesk, Orbitron, Inter
- Formspree for the contact form
- Netlify for deployment

---

## Running locally

Just open `public/index.html` in a browser. No build step needed.

For audio to work, run a local server instead of opening the file directly:

```bash
cd public
python3 -m http.server 8000
```

Then open http://localhost:8000.

---

## Deployment

Hosted on Netlify. Deploys automatically on push to `main`. Config is in `netlify.toml`:

```toml
[build]
  publish = "public"
```

No build command. Netlify serves `public/index.html` as a static site.

---

## Adding a project

Open `public/index.html` and add an entry to the `PROJECTS` array in the JavaScript section. Then add a matching entry to `ORBIT_BASE` if you need a new orbit ring.

---

## Contact

- Email: denzel.chingodza@icloud.com
- GitHub: github.com/denzelchingodza
- LinkedIn: linkedin.com/in/denzel-chingodza-45b6ab3a0
