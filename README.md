# Personal Portfolio

A personal portfolio site built from scratch without frameworks, bundlers, or dependencies. The goal was to make something that actually feels like me rather than a generic developer template.

**Live:** [denz-platform.vercel.app](https://denz-platform.vercel.app)

---

## What it is

A single-page portfolio with an animated orbital system at its centre. Each orbiting planet is a project. Clicking one opens the full project breakdown. The site uses a canvas-based star field for the hero section, a comet cursor, and scroll-driven animations for everything else.

The Interstellar theme is intentional. The entry overlay with the TARS quote and ambient audio sets the tone before anything else loads. Built for the love of coding.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS (custom properties, grid, animations) |
| Logic | Vanilla JavaScript, Canvas API |
| Fonts | Space Grotesk, Orbitron, Inter (Google Fonts) |
| Deployment | Vercel |

No frameworks. No build step. No dependencies. One file.

---

## Running locally

```bash
git clone https://github.com/denzelchingodza/platform.git
cd platform
open public/index.html
```

Or drag `public/index.html` into a browser. There is no build step.

---

## Structure

```
platform/
├── public/
│   └── index.html    ← The entire site: HTML, CSS, and JS in one file
├── vercel.json       ← Vercel routing config
└── README.md
```

---

Built by Denzel Chingodza
