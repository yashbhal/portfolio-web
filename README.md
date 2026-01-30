## Project Overview
Modern portfolio site built with Next.js, TypeScript, and Tailwind CSS. It highlights professional experience, projects, and writing in a single responsive layout.

## Tech Stack
- **Framework**: Next.js 15.5.11 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 with DaisyUI 5
- **Fonts**: Google Fonts (Inter, Montserrat)
- **Deployment**: Vercel
- **UI Icons**: react-icons

## Getting Started

### Prerequisites
- Node.js 18 or later
- npm 9 or later

### Setup
```bash
npm install
npm run dev
```
Development server starts on http://localhost:3000.

### Scripts
- `npm run dev` start local development
- `npm run lint` run ESLint (Next.js CLI)
- `npm run build` create production build (Next.js 15). The build may emit a DaisyUI `@property` warning that is safe to ignore.

## Key Files
```
├── next.config.mjs       # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS and DaisyUI configuration
├── postcss.config.mjs    # PostCSS setup
├── tsconfig.json         # TypeScript configuration
└── package.json          # Scripts and dependencies
```

## App Directory Highlights
```
app/
├── layout.tsx            # Root layout with navbar, footer, global providers
├── page.tsx              # Landing page entry
├── globals.css           # Tailwind CSS and DaisyUI theme setup
├── components/           # Reusable UI sections
├── Work/                 # Standalone Work page and data
│   ├── page.tsx
│   └── workData.ts
└── Blog/                 # Blog index and dynamic routes
    ├── page.tsx
    └── [slug]/           # Markdown-driven blog detail pages
app/sitemap.ts            # Generates sitemap.xml at build
```

## Core Components
- **ThemeProvider.tsx** light/dark theme context with persistence and toggle
- **Navbar.tsx** sticky navigation with mobile menu, theme toggle, and shared horizontal padding via `container-responsive`
- **HeroSection.tsx** landing hero with intro copy and calls to action
- **AboutSection.tsx** story, philosophy, and recent work highlights
- **CardSection.tsx** horizontal carousels for projects and experience with scroll controls
- **BlogLayout.tsx** shared wrapper for blog posts
- **Footer.tsx** contact links and copyright icons via react-icons

## Design Notes
- Dual DaisyUI themes (`portfolioLight`, `portfolioDark`) defined in `globals.css`; default is light with user-toggleable dark mode
- Consistent horizontal spacing handled by the `.container-responsive` utility (`app/globals.css`)
- Responsive grids and flex layouts tuned for mobile, tablet, and desktop breakpoints
- Next.js `<Image>` used where appropriate for asset optimization; react-icons for footer/social icons
- Loading screen and scroll indicator add UX polish during navigation

## Data Flow
- Work and project listings sourced from `app/Work/workData.ts`
- Blog posts reside in `app/BlogPosts/*.md` and are consumed by the Blog routes
- Theme state managed via `ThemeProvider` with `localStorage` persistence
- Components receive typed props to encourage reuse and clarity

## Roadmap Ideas
- Expand blog tooling for MDX and richer metadata
- Introduce contact form with backend integration
- Automate deploy previews via Vercel Git integration
