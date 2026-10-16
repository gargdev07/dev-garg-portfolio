# Dev Garg — Personal Portfolio

A lightweight, responsive portfolio for Dev Garg, a Data Science student at NMIMS Mukesh Patel School of Technology Management & Engineering, Mumbai. Its “Look closer” direction pairs a clear professional first impression with small details about how Dev thinks and what he enjoys beyond his studies. The hero headline is “There's usually more to figure out.”

## Contents

- `index.html` — semantic page structure and all portfolio content
- `styles.css` — responsive dark visual system and reduced-motion handling
- `script.js` — mobile navigation, active section states, and optional reveal effects
- `assets/` — original D monogram SVG favicon and social preview artwork; the monogram is also inline in the navigation and footer

The site uses HTML, CSS, and vanilla JavaScript. It has no build step, backend, database, paid service, or required API key. The design uses system fonts and needs no external assets or services to render.

## Sections

About (including personal interests), featured projects, research and recognition, skills and technical interests, certifications, contact, and footer. Projects cover PropAnalytics, AAPL analysis and forecasting, an IPL match simulator, and a blue-carbon registry research prototype. Details follow the supplied portfolio brief. The academic panel lists a GPA of 8.27 / 10.

## Small interactions

- “Look closer” reveals a short observation about following patterns. Its message expands in normal document flow.
- “Show observation path” reveals the relationship path in the decorative hero illustration. The graphic is illustrative, not live or historical data.
- The footer has an optional “One last signal” note.
- The five personal-interest cards cover basketball, desserts, music, research, and travel. The market research card links to the AAPL study.
- Contact includes a visible `mailto:` address and an optional copy button with success, fallback, and failure feedback.

The disclosures work without JavaScript. The connection control appears only when its JavaScript handler is available.

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
- **Social preview:** once the site has a public URL, add an absolute `og:image` URL for `assets/social-card.svg` in `index.html`; social platforms generally need an absolute image URL to fetch it reliably.

## Accessibility and responsive design

The page uses semantic landmarks, a skip link, visible keyboard focus, a labeled mobile menu with `aria-expanded`, keyboard-operable disclosures, responsive layouts, and `prefers-reduced-motion` support. Core content is present in the HTML and remains available without JavaScript; the copy button is progressively revealed only when its handler is available. Decorative visuals are labeled or hidden from assistive technology as appropriate. Check the site at 320, 375, 768, 1024, and 1440 px before submission.

## Credits and deployment status

The D monogram, favicon, social card, and data-inspired illustrations are original SVG/CSS artwork. No external images or borrowed code snippets are used. The public repository and GitHub Pages deployment are configured for this portfolio.
