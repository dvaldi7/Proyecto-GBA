# AGENTS.md - Gracie Barra Alicante Landing Page

## Project Overview

Static HTML/CSS/JS landing page for a Brazilian Jiu-Jitsu academy in Alicante, Spain. No build tools, no dependencies - pure vanilla frontend.

**Key files:**
- `index.html` - Main entry point (new 2025 structure)
- `styles.css` - Complete design system with responsive (all-in-one)
- `main.js` - Interactive components (menu, scroll effects, animations)

**Preview:**
- VS Code: Open with Live Server or open `index.html` in browser
- No build step required

## Architecture (New 2025 Design)

```
index.html structure:
├── Header (fixed, transparent → dark on scroll)
├── Hero (video BG + overlay + CTA)
├── Programas (2x2 grid cards)
├── Equipo (2 horizontal cards)
├── Horarios (HTML table)
├── Contacto (3-column grid + map)
└── Footer
```

**Sections:** `#hero`, `#programas`, `#equipo`, `#horarios`, `#contacto`

**Assets:**
- Images: `/images/`
- Video: `/video/GBVideo.mp4`
- Icons: SVG inline (no external dependencies)

## Design System

**Colors:**
- `--gb-black: #0a0a0a` (primary background)
- `--gb-red: #EE0C0C` (brand accent)
- `--gb-white: #ffffff` (text)

**Typography:**
- Display: Oswald (titles, navigation)
- Body: Open Sans (paragraphs)

**Spacing:**
- Section padding: 112px (desktop), 64px (mobile)
- Container max-width: 1200px

## Features

- Header: scroll effect (transparent → dark blur)
- Mobile menu: full-screen overlay with staggered animation
- Scroll reveal: staggered fade-in on cards
- Back to top: appears after 400px scroll
- Smooth scroll: anchor links with header offset

## Accessibility

- Skip link for keyboard users
- ARIA labels on navigation and interactive elements
- Focus visible states
- Reduced motion media query support
- Semantic HTML (section, article, nav, header, footer)

## Known Issues

1. **No form**: Contact is by phone/WhatsApp only
2. **Video fallback**: Poster image shown if video fails
3. **Horarios table**: Could be improved with better mobile layout

## Notes

- All responsive CSS is in `styles.css` (no separate responsive.css)
- Animations are subtle and purposeful
- Legacy `responsive.css` file can be deleted (unused)