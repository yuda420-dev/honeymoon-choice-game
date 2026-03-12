# Honeymoon Choice Game — Interactive Destination Quiz

## Project Scope
Interactive web quiz that recommends luxury honeymoon destinations ($28K-$52K budget range). Users answer 55 "this or that" questions across 10 preference dimensions, scored against 11 handpicked destinations. Includes partner mode for couples comparison.

## Tech Stack
- React 18.2 / Vite 5.0
- Tailwind CSS 3.3 + PostCSS
- Lucide React (icons)
- Google Fonts (Cormorant Garamond)
- Vercel deployment

## Key Files
```
src/
├── App.jsx    ← Complete game logic + UI (~422 lines)
├── main.jsx   ← Entry point
└── index.css  ← Tailwind imports
```

## Quick Start
```bash
npm install
npm run dev      # Vite dev server
npm run build    # Production build
```

## Scoring System
- 10 dimensions: wildlife, romance, adventure, exclusivity, diving, travelEase, culture, luxury, uniqueness, relaxation
- 55 "this or that" questions with weighted contributions
- Partner mode: tracks alignment vs. divergent preferences

## Design
- Dark theme (slate-950 bg), amber/rose accents
- Glassmorphism, animated transitions, progress bar
- Undo functionality, modal info panel
- Responsive (mobile/tablet/desktop)

## Cross-Project Reference
- Shared patterns: ~/orginize/knowledge/patterns.md
- Master registry: ~/orginize/CLAUDE.md

## GitHub
- Repo: yuda420-dev/honeymoon-choice-game
- Push requires: `gh auth switch --user yuda420-dev`
