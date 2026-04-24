# G Unit Security — Official Website

Perth's premier security services company website. Built with modern, responsive HTML, CSS, and JavaScript.

![Premium Security Website](https://img.shields.io/badge/Status-Production_Ready-c8102e?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-HTML_CSS_JS-1e3a8a?style=for-the-badge)
![Deploy](https://img.shields.io/badge/Deploy-Vercel_Ready-success?style=for-the-badge)

---

## 🏆 Features

- **Premium Luxury Design** — Red + Blue + White color palette matching the G Unit Security logo
- **Fully Responsive** — Perfect on mobile, tablet, desktop, and ultrawide displays
- **5 Complete Pages** — Home, Services (with 8 detailed service sections), About, Contact, Careers
- **Interactive Forms** — Contact form + Career application form with validation and success states
- **Smooth Animations** — Scroll-reveal, animated counters, parallax effects, glassmorphism
- **SEO Optimized** — Meta tags, Open Graph, semantic HTML
- **Zero Dependencies** — Pure HTML/CSS/JS, no frameworks required, fast loading
- **Accessible** — ARIA labels, keyboard navigation, semantic markup

---

## 📁 Project Structure

```
gunit-security/
├── index.html              # Home page
├── css/
│   ├── style.css           # Global design system
│   ├── home.css            # Home page specific styles
│   └── pages.css           # Inner pages styles
├── js/
│   └── main.js             # Navigation, animations, form handling
├── pages/
│   ├── services.html       # All 8 services detailed
│   ├── about.html          # Company story & values
│   ├── contact.html        # Contact form + map
│   └── career.html         # Careers + application form
├── images/                 # (Add your logo/photos here)
├── README.md               # This file
├── vercel.json             # Vercel config (optional)
└── .gitignore              # Git ignore rules
```

---

## 🚀 Deployment Guide

### Option 1: Deploy to Vercel (Recommended — 2 minutes)

#### Step 1: Push to GitHub

```bash
# Initialize Git
cd gunit-security
git init
git add .
git commit -m "Initial commit - G Unit Security website"

# Create a new repo on GitHub, then:
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/gunit-security.git
git push -u origin main
```

#### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New..."** → **"Project"**
3. Select your `gunit-security` repository
4. Click **"Deploy"** (no configuration needed — it's a static site)
5. Done! Your site is live at `your-project.vercel.app`

#### Step 3: Connect Custom Domain (gunitsecurity.com.au)

1. In Vercel Dashboard → Your Project → **Settings** → **Domains**
2. Add `gunitsecurity.com.au` and `www.gunitsecurity.com.au`
3. Update DNS records at your domain registrar:
   - **A Record**: `@` → `76.76.21.21`
   - **CNAME**: `www` → `cname.vercel-dns.com`
4. Wait 5-60 mins for DNS propagation. SSL auto-enabled by Vercel.

---

### Option 2: Deploy to Netlify

1. Drag and drop the `gunit-security` folder to [app.netlify.com/drop](https://app.netlify.com/drop)
2. That's literally it. Done.

---

### Option 3: Traditional Web Hosting

Upload all files to your web server via FTP/cPanel File Manager:
- Upload everything to `public_html/` or `www/` directory
- That's all. No build step, no server config needed.

---

## 🛠️ Local Development

### Option A: Just open in browser
Double-click `index.html` — works instantly.

### Option B: Use a local server (recommended for testing form behaviour)

```bash
# Using Python 3
python -m http.server 3000

# Using Node.js (install live-server globally)
npx live-server

# Using PHP
php -S localhost:3000
```

Then open `http://localhost:3000` in your browser.

---

## ✏️ Customization Guide

### Change Colors
Edit `css/style.css` — find `:root` section at the top:
```css
--red-primary: #c8102e;    /* Change main red */
--blue-primary: #1e3a8a;   /* Change main blue */
--navy-deep: #0a0e1a;      /* Change background */
```

### Update Contact Info
Find and replace in all `.html` files:
- Phone: `+61 426 842 606`
- Email: `info@gunitsecurity.com.au`
- Address: `PO BOX 254, Mirrabooka, WA 6941`

### Add Your Logo
Replace the SVG placeholder in `.logo-mark` with an actual logo:
```html
<!-- Replace this -->
<div class="logo-mark"><span>G</span></div>

<!-- With this -->
<img src="images/logo.png" alt="G Unit Security" class="logo-img">
```

### Add Real Photos
Drop photos into the `images/` folder and reference them:
```html
<img src="images/security-team.jpg" alt="Team">
```

### Connect Forms to Backend
The forms are currently simulated. To make them functional, update `js/main.js` — find the `handleFormSubmit` function and replace the `setTimeout` with a real fetch call:

```javascript
// Option 1: Formspree (easiest)
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  body: formData,
  headers: { 'Accept': 'application/json' }
});

// Option 2: Web3Forms (free alternative)
// Option 3: Your own backend API
```

---

## 📄 Pages Included

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Hero, services overview, testimonials, CTA |
| Services | `/pages/services.html` | Detailed breakdown of all 8 services |
| About | `/pages/about.html` | Company story, 6 core values, stats |
| Contact | `/pages/contact.html` | Contact form, info cards, map |
| Careers | `/pages/career.html` | Benefits, job application form |

---

## 🎨 Design System

- **Typography**: Bebas Neue (display), Cormorant Garamond (serif), Inter (body)
- **Colors**: Deep navy background with red/blue gradient accents
- **Spacing**: Generous whitespace for premium feel
- **Motion**: Subtle scroll reveals, smooth hover states, counter animations
- **Icons**: Inline SVG (no icon library dependencies)

---

## 📧 Support

Questions? Reach out to **info@gunitsecurity.com.au**

---

## 📜 License

© G Unit Security. All rights reserved. Proprietary website — not for redistribution.

---

**Built with 🔴🔵 premium design principles for Perth's most trusted security company.**
