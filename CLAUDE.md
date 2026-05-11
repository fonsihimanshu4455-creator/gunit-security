# G UNIT SECURITY — Official Website

Project context for Claude Code. Read this before making changes so tone, design, and content stay consistent across every page.

---

## Business Overview

- **Company**: G Unit Security
- **Type**: Premium security services company
- **Location**: Perth, Western Australia (WA, Australia)
- **Head Office**: PO BOX 254, Mirrabooka, WA 6941
- **Established**: 2022 (do NOT claim "15+ years" or "since 2010" — those were old website copy)
- **Origin Story**: Spun out of a truck & car rental business — that
  operational/logistics background carried into the security firm.
- **Old website being replaced**: gunitsecurity.com.au (outdated PHP site)

## Contact Information (keep consistent on every page)

- **Phone**: +61 426 842 606
- **Email**: info@gunitsecurity.com.au
- **Address**: PO BOX 254, Mirrabooka, WA 6941, Australia
- **Hours**: 24/7 Emergency Response | Office Mon–Fri 9AM–6PM

## Key Credentials (Trust Signals)

- **$20 Million** Public & Professional Indemnity Insurance
- Fully Licensed by Western Australia
- Strong ties with WA Police & Liquor Enforcement Unit
- **60+** licensed officers on roster
- **8,000+** service hours per month
- 24/7 response ready

## 8 Services Offered (core business)

1. **VIP Protection** — Elite close protection for high-profile individuals
2. **Crowd Control** — Events from 50 to 30,000 patrons
3. **CCTV Monitoring** — Installation + 24/7 monitoring + servicing
4. **Mobile Patrols** — Property protection, alarm response, lock-up checks
5. **Financial Escorts** — Currency and document transport
6. **Canine Security** — Trained dogs + handlers for large areas
7. **Concierge Services** — Residential / hotel / resort security
8. **Security Guards** — Distinctly uniformed, licensed personnel

## 4 Industries Served

1. **Local Government** — WA councils and municipal properties
2. **Events** — Venues and large gatherings
3. **Commercial Properties** — Office buildings, retail, warehouses
4. **Hotels** — Hospitality sector (100+ venues in Perth)

## 6 Core Competencies (Company Values)

- Customer-Centric
- Data-Centric
- Relationship-Centric
- Policy-Centric
- Employee-Centric
- Solution-Centric

## Notable Clients (for "Trusted By" section)

Ashtar, Luxus, Mazzucchellis, Motorplex, Savills, Carco, Brown Boys, Candy Station, Smoke Station

## Testimonial People (real names used)

- Mark Reynolds — Operations Manager
- Sarah Collins — Property Manager
- Emily Harper — Events & Hospitality Director
- Aman Singh — YS Production
- Daniel Thompson — Construction Project Lead

---

## Design System

### Theme / Vibe

- **Premium, luxury, VIP-grade feel** — NOT generic corporate
- Dark, cinematic, expensive-looking
- Inspired by high-end security brands
- Target audience: corporate, hospitality, government, VIP clients

### Color Palette (matches the official logo)

| Role | Value |
|---|---|
| Primary Red | `#c8102e` |
| Bright Red | `#e63946` |
| Deep Red | `#8b0000` |
| Primary Blue | `#1e3a8a` |
| Royal Blue | `#1d4ed8` |
| Light Blue | `#3b82f6` |
| Navy Deep (bg) | `#0a0e1a` |
| Navy Rich | `#0f1629` |
| Navy Mid | `#1a2342` |
| Navy Light | `#2a3558` |
| Off White | `#f8f9fc` |
| Gold Accent | `#d4af37` |

### Typography (Google Fonts)

- **Display Font**: Bebas Neue — headings, titles (bold, uppercase)
- **Serif Font**: Cormorant Garamond — italic subtitles, quotes
- **Body Font**: Inter — paragraphs, buttons, navigation

### Key Design Elements

- Glassmorphism navbar (blurred background, transparent)
- Subtle noise texture overlay on body
- Grid background pattern on hero sections
- Red-to-Blue gradient accents (brand colors)
- Scroll-reveal animations on sections
- Animated counter stats
- Hover lifts: `translateY(-5px to -8px)`
- Red glow shadows on primary CTAs

---

## Tech Stack

- Pure static HTML / CSS / JavaScript — no framework
- No build process
- Google Fonts loaded via CDN
- Inline SVG icons (no icon library)
- Mobile responsive — breakpoints at `1200px`, `1024px`, `768px`
- Deploys to Vercel (zero config via `vercel.json`)

## File Structure

```
/
├── index.html                (Home — hero, services, why-us, industries, testimonials, CTA)
├── css/
│   ├── style.css             (Global design system, navbar, footer, buttons)
│   ├── home.css              (Home page specific)
│   └── pages.css             (Inner pages)
├── js/
│   └── main.js               (Navbar scroll, mobile menu, animations, form handling)
├── pages/
│   ├── services.html         (Detailed 8 services with alternating layouts)
│   ├── about.html            (Company story + 6 core values)
│   ├── contact.html          (Contact form + map + info cards)
│   └── career.html           (Job application form + benefits)
├── images/
│   └── logo.png              (Official hexagonal shield with "G" keyhole, red+blue)
├── vercel.json               (Vercel config)
├── README.md
├── CLAUDE.md                 (this file)
└── .gitignore
```

### Logo Usage

- Navbar + footer on every page use `<img>` with class `logo-img`
- `index.html` → `images/logo.png`
- `pages/*.html` → `../images/logo.png`
- CSS sizes: 52px default, 60px in footer, 42px under 768px; hover scale 1.05

---

## Conventions

- Keep content consistent with the facts above — don't invent services, stats, or testimonials.
- Match the premium / dark / cinematic tone. Avoid generic stock copy.
- When adding new sections, reuse the existing color variables and fonts from `css/style.css`.
- Inline SVGs only — don't pull in icon libraries.
- Stay mobile-responsive at the three breakpoints.
