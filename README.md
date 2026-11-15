# cine.arc — Video Production Portfolio & Studio Admin Panel

> Developed by **GRAPHNDO — Design & Creative Studio**  
> Client: **cine.arc PRODUCTIONS**  
> Creative Philosophy: **Organic Cinematic Minimalism**

---

## 1. Brand Identity & Design System

cine.arc is a premium video production and visual storytelling studio specializing in cinematography, commercial films, brand narratives, and artistic visual media.

### Color System Foundation
- **Soft White (`#E8E9DF`)**: Main website background, editorial reading space, clean negative space.
- **Sage Green (`#A9B887`)**: Subtle organic section accents, status indicators, active pills.
- **Deep Olive (`#2E3D28`)**: Primary typography on light surfaces, primary buttons, high contrast.
- **Cinema Dark (`#172014`)**: Obsidian olive canvas for viewfinder HUDs and master video players.

### Official Brand Logo Variations
Supplied master assets from `assets/logo/` are preserved with 100% vector accuracy in `public/brand/`:
- **Logomark (Arch / Aperture)**: `mark-deep-olive.png`, `mark-white.png`, `mark-black.png`, `mark-sage.png`
- **Horizontal Lockup (Mark + Wordmark)**: `logo-horizontal-olive.png`, `logo-horizontal-white.png`, `logo-horizontal-black.png`
- **Vertical Full Lockup (Mark + Wordmark + PRODUCTIONS)**: `logo-vertical-olive.png`, `logo-vertical-white.png`
- **Favicons & App Icons**: `icon-512.png`, `icon-512-white.png`

---

## 2. Technical Architecture

- **Framework**: Next.js 16+ (App Router, Server Components & Route Handlers)
- **Styling**: Tailwind CSS v4 with custom theme tokens
- **Typography**: Syne (Expressive Cinematic Display) + Geist (Refined Sans & Mono)
- **Animations & Motion**: Framer Motion & CSS hardware-accelerated transitions
- **Database & Persistence**: Structured local JSON database (`data/database.json`) with atomic concurrency write guards, schema validation, and migration readiness for PostgreSQL / SQLite / Supabase
- **Authentication**: Bcrypt password hashing + HTTP-only JWT session cookies (`cinearc_admin_session`)
- **File Uploads**: Server-side upload pipeline with MIME-type and size validation (Max 50MB) saving to `public/uploads/`
- **SEO & Performance**: Open Graph tags, JSON metadata, `robots.ts`, dynamic `sitemap.ts`

---

## 3. Public Website Features

1. **Floating Navigation Header (`/`)**:
   - Official `cine.arc` horizontal brand lockup
   - Dynamic studio timecode clock (e.g. `22:04:15 GMT+5:30`)
   - Real-time availability indicator (`• Available for Production`)
   - Category count badges (`Work [12]`, `Services [06]`)
   - Responsive mobile overlay drawer

2. **Cinema Viewfinder Hero Section**:
   - Framed cinema canvas with viewfinder HUD metadata (`4K DCI 2.39:1`, `[REC 24.00 FPS]`)
   - Ambient video loop with instant mute/unmute audio toggle
   - Fullscreen Cinema Lightbox mode (`Expand Cinema`)
   - Direct CTA links to portfolio and enquiry

3. **Brand Manifesto & Credentials**:
   - Restrained editorial typography with nature-inspired minimalism
   - Bento metric cards with production stats (`120+ Productions`, `09y+ Experience`, `4K/8K DCI Master Workflow`)

4. **Featured Works Showcase**:
   - Filterable project grid (`Brand Films`, `Commercials`, `Music Videos`, `Cinematography`)
   - Interactive hover video previews
   - Production credits display (Director, DP, Duration, Aspect Ratio)

5. **Confirmed Services & Capabilities (`/services`)**:
   - Commercial Video Production
   - Brand Documentaries & Manifesto Films
   - Cinematography & Camera Direction
   - Music Videos & Creative Narrative
   - Product Films & Macro Motion
   - Color Grading & Post-Production
   - Comprehensive deliverables breakdown for every service

6. **Studio Philosophy & Camera Gear (`/about`)**:
   - Narrative of intentional restraint and natural illumination
   - Camera infrastructure (ARRI Alexa Mini LF, RED V-Raptor, Cooke Anamorphic/i, Atlas Orion, DaVinci Resolve)

7. **Commission Brief Questionnaire (`/contact`)**:
   - Client brief form with budget selection, production type, target timeline, and concept notes
   - Real-time validation and instant database submission

---

## 4. Studio Admin Panel (`/admin`)

The website includes a fully functional, password-protected administrative portal:

### Access Credentials (Initial Setup)
- **Portal URL**: `http://localhost:3000/admin/login`
- **Default Email**: `admin@cinearc.com`
- **Default Password**: `CineArcAdmin2026!`
- *(Credentials can be modified via environment variables or directly in `data/database.json`)*

### Admin Capabilities:
- **Dashboard Overview**: Key metrics (total works, published vs drafts, unread enquiries, system status)
- **Projects Manager (`/admin/projects`)**: Full CRUD (Add, Edit, Delete, Toggle Featured on Home, Toggle Publish live, Edit credits)
- **Services Manager (`/admin/services`)**: Edit services, change descriptions, add/remove deliverables, toggle public visibility
- **Website Content Editor (`/admin/content`)**: Live editing of Hero headline, subheadline, availability badge, showreel video URL, brand manifesto, contact details, studio hours, and social media links
- **Commission Pipeline (`/admin/enquiries`)**: Read client briefs, filter by status (`unread`, `read`, `replied`, `archived`), reply directly via email, delete
- **Media Library (`/admin/media`)**: Drag-and-drop file upload for project stills and videos, copy CDN link, file deletion

---

## 5. Getting Started & Development

### Installation
```bash
# Clone the repository
git clone https://github.com/GraphndoStudio/cine.arc-portfolio.git
cd cine.arc-portfolio

# Install dependencies
npm install
```

### Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### Running Locally
```bash
# Start local development server with Turbopack
npm run dev

# Or build and run production server
npm run build
npm run start
```
Open [http://localhost:3000](http://localhost:3000) to view the public site, or [http://localhost:3000/admin](http://localhost:3000/admin) for the studio admin portal.

---

## 6. Deployment Instructions

### Option A: Vercel (Recommended)
1. Push all commits to your GitHub repository:
   ```bash
   git push origin main
   ```
2. Import project into Vercel.
3. Configure environment variables (`ADMIN_JWT_SECRET`, `ADMIN_INITIAL_EMAIL`, `ADMIN_INITIAL_PASSWORD`).
4. Deploy with zero configuration.

### Option B: Node.js / Docker Server
1. Build the standalone app:
   ```bash
   npm run build
   ```
2. Run with PM2 or standard Node process manager:
   ```bash
   pm2 start npm --name "cine-arc" -- start
   ```

---

© 2026 CINE.ARC PRODUCTIONS. Designed & Engineered by GRAPHNDO Studio.
