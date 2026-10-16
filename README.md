# Dev Garg — Personal Portfolio

A lightweight, responsive portfolio for Dev Garg, a Data Science student at NMIMS Mukesh Patel School of Technology Management & Engineering, Mumbai. Its “Curious Mind” direction follows observations into systems, patterns, probability, and verification, then opens an optional warm-toned side quest about life beyond study. The hero headline is “There's usually more to figure out.”

## Contents

- `index.html` — semantic page structure and all portfolio content
- `styles.css` — responsive editorial visual system, side-quest color transition, and reduced-motion handling
- `script.js` — project-linked observation map, “Look closer” disclosure, side-quest state, mobile navigation, active section states, and optional reveal effects
- `assets/` — original D monogram SVG favicon and social preview artwork; the monogram is also inline in the navigation and footer

The site uses HTML, CSS, and vanilla JavaScript. It has no build step, backend, database, paid service, or required API key. The design uses system fonts and needs no external assets or services to render.

## Sections

About, four editorial case studies, an optional side quest with five personal interests, research and recognition, skills and technical interests, learning and certifications, contact, and footer. Projects cover PropAnalytics, AAPL analysis and forecasting, an IPL match simulator, and a blue-carbon registry research prototype. The academic panel lists a GPA of 8.27 / 10. Learning includes AWS Cloud Technical Essentials from Coursera, issued September 2026, alongside the Google Data Analytics and Anthropic AI Fluency credentials.

## Small interactions

- “Look closer” reveals a short observation about following patterns. Its message expands in normal document flow.
- The four observation points in the hero map link directly to their matching project investigations, show a relevant annotation on hover or keyboard focus, and have a visible text-link alternative on mobile. The diagrams are illustrative, not live or historical data.
- “Take the detour” loosens the hero geometry, shifts the site's palette from blue to warm colors, and reveals the personal-interest collage. The transition is short, works with reduced motion, and can be reversed with “Back to the investigations.” The section remains available through normal scrolling when JavaScript is disabled.
- The footer has an optional “One last signal” note.
- The asymmetric personal-interest collage covers basketball, desserts, music, research, and travel. The market research element links to the AAPL study.
- Contact includes a visible `mailto:` address and an optional copy button with success, fallback, and failure feedback.

The interest section and its internal links work without JavaScript. JavaScript adds the palette transition and disclosure behavior; the “Look closer” control appears only when its handler is available.

## Preview locally

Open `index.html` directly in a browser, or serve this folder with any static file server. For example, from this directory:

```sh
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## GitHub repository and hosting

The portfolio source is published in the public [`gargdev07/dev-garg-portfolio`](https://github.com/gargdev07/dev-garg-portfolio) repository. GitHub Pages serves the site at [gargdev07.github.io/dev-garg-portfolio](https://gargdev07.github.io/dev-garg-portfolio).

All local assets use relative paths, so they work on the GitHub Pages project site under `/dev-garg-portfolio/`.

## Updating content

- **Projects:** edit the four project articles in `index.html`. Link a repository or live demo only after verifying its real public URL. The current site deliberately does not include project buttons because no project URLs were supplied.
- **Resume:** place the genuine PDF in `assets/documents/` and add a visible link in the hero or contact area. No resume file was present when this site was prepared.
- **Contact:** update the GitHub, LinkedIn, and email anchors in `index.html`; keep the copy-button address in sync in `script.js`.
- **Certifications:** add credential links only when a verified public URL is available.
- **Social preview:** Open Graph and Twitter metadata reference the absolute `assets/social-card.svg` URL for the published site.

## Accessibility and responsive design

The page uses semantic landmarks, a skip link, visible keyboard focus, a labeled mobile menu with `aria-expanded`, keyboard-operable controls, responsive layouts, and `prefers-reduced-motion` support. Core content is present in the HTML and remains available without JavaScript; the copy button is progressively revealed only when its handler is available. Decorative visuals are labeled or hidden from assistive technology as appropriate.

## Credits and deployment status

The D monogram, favicon, social card, and data-inspired illustrations are original SVG/CSS artwork. No external images or borrowed code snippets are used. The public repository and GitHub Pages deployment are configured for this portfolio.
