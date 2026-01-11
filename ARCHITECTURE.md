# Architecture Documentation

## Project Overview

**Project Name:** Natalia's Therapy Space
**Project Type:** Psychotherapist Portfolio & Landing Page
**Purpose:** Professional website for psychotherapist Natalia Mordach showcasing services, pricing, and contact information
**Language:** Polish (pl)

## Technology Stack

### Core Technologies
- **Build Tool:** Vite 5.4.19
- **Framework:** React 18.3.1
- **Language:** TypeScript 5.8.3
- **Runtime:** Node.js (with npm/bun package managers)

### UI Framework & Styling
- **Component Library:** shadcn/ui (Radix UI primitives)
- **Styling:** Tailwind CSS 3.4.17
- **Design System:** Custom sage/cream color palette with psychodynamic theme
- **Typography:**
  - Headings: Cormorant Garamond (serif)
  - Body: Inter (sans-serif)
- **Animations:** Framer Motion 12.25.0

### Key Libraries
- **Routing:** React Router DOM 6.30.1
- **State Management:** TanStack Query (React Query) 5.83.0
- **Forms:** React Hook Form 7.61.1 with Zod 3.25.76 validation
- **Icons:** Lucide React 0.462.0
- **Notifications:** Sonner 1.7.4
- **Date Handling:** date-fns 3.6.0
- **Theme:** next-themes 0.3.0 (dark mode support)

### Development Tools
- **Linter:** ESLint 9.32.0
- **Type Checking:** TypeScript
- **Development Tagger:** lovable-tagger (for development mode)

## Project Structure

```
natalia-s-therapy-space/
├── public/                    # Static assets
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
├── src/
│   ├── assets/               # Images and media
│   │   └── hero-bg.jpg
│   ├── components/           # React components
│   │   ├── ui/              # Reusable UI components (shadcn/ui)
│   │   │   ├── accordion.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── form.tsx
│   │   │   ├── input.tsx
│   │   │   ├── toast.tsx
│   │   │   └── [38+ other components]
│   │   ├── About.tsx        # About section
│   │   ├── Contact.tsx      # Contact form section
│   │   ├── Footer.tsx       # Footer component
│   │   ├── ForWho.tsx       # Target audience section
│   │   ├── Header.tsx       # Navigation header
│   │   ├── Hero.tsx         # Hero section
│   │   ├── HowIWork.tsx     # Work methodology section
│   │   ├── Location.tsx     # Location information
│   │   ├── NavLink.tsx      # Navigation link component
│   │   ├── Pricing.tsx      # Pricing table
│   │   └── Services.tsx     # Services offered
│   ├── hooks/               # Custom React hooks
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── lib/                 # Utilities
│   │   └── utils.ts         # Helper functions (cn, etc.)
│   ├── pages/               # Page components
│   │   ├── Index.tsx        # Main landing page
│   │   └── NotFound.tsx     # 404 page
│   ├── App.tsx              # Root application component
│   ├── index.css            # Global styles and design tokens
│   ├── main.tsx             # Application entry point
│   └── vite-env.d.ts        # Vite type definitions
├── .claude/                  # Claude Code settings
├── components.json           # shadcn/ui configuration
├── eslint.config.js         # ESLint configuration
├── index.html               # HTML entry point
├── package.json             # Dependencies and scripts
├── postcss.config.js        # PostCSS configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
├── tsconfig.app.json        # App-specific TS config
├── tsconfig.node.json       # Node-specific TS config
└── vite.config.ts           # Vite build configuration
```

## Application Architecture

### Architecture Pattern
**Single Page Application (SPA)** with component-based architecture

### Routing Structure
- `/` - Main landing page (Index)
- `*` - 404 Not Found page

The main page is structured as a single scrolling page with anchor-linked sections:
- Hero section
- About (#o-mnie)
- Services (#oferta)
- For Who (#dla-kogo)
- How I Work
- Pricing (#cennik)
- Location (#lokalizacja)
- Contact (#kontakt)

### Component Hierarchy

```
App
├── QueryClientProvider (TanStack Query)
├── TooltipProvider
├── Toaster (notifications)
├── Sonner (toast notifications)
└── BrowserRouter
    └── Routes
        ├── Index (Main Page)
        │   ├── Header
        │   │   └── NavLink components
        │   ├── Hero
        │   ├── About
        │   ├── Services
        │   ├── ForWho
        │   ├── HowIWork
        │   ├── Pricing
        │   ├── Location
        │   ├── Contact
        │   └── Footer
        └── NotFound
```

## Design System

### Color Palette
**Primary Theme: Sage Green & Cream (Calming, Professional)**

#### Light Mode
- **Background:** `hsl(40 33% 98%)` - Warm cream
- **Foreground:** `hsl(160 15% 20%)` - Dark sage
- **Primary:** `hsl(155 25% 42%)` - Sage green
- **Secondary:** `hsl(40 30% 94%)` - Light cream
- **Accent:** `hsl(155 20% 88%)` - Very light sage

#### Dark Mode Support
- Inverted color scheme with dark background
- Maintained sage/cream color harmony

### Typography Scale
- **Display Heading:** 4xl - 6xl, Cormorant Garamond
- **Section Heading:** 3xl - 5xl, Cormorant Garamond
- **Card Heading:** xl - 2xl, Cormorant Garamond
- **Body Text:** base - lg, Inter
- **Body Large:** lg - xl, Inter

### Spacing & Layout
- **Section Padding:** py-20 to py-32 (responsive)
- **Container Narrow:** max-w-4xl
- **Container Wide:** max-w-6xl
- **Border Radius:** 0.75rem base

### Shadows
- **Soft:** `0 4px 20px -4px hsl(155 25% 42% / 0.1)`
- **Card:** `0 8px 30px -8px hsl(155 25% 42% / 0.12)`
- **Elevated:** `0 20px 50px -12px hsl(155 25% 42% / 0.15)`

### Animation Strategy
- **Framer Motion** for page transitions and scroll animations
- **useInView hook** for scroll-triggered animations
- Custom animations: fade-up, fade-in
- Smooth scroll behavior enabled globally

## State Management

### Global State
- **TanStack Query:** Server state management (configured but not currently used for API calls)
- **React Context:** Toast notifications via useToast hook

### Local State
- **React useState:** Component-level state (forms, mobile menu, scroll position)
- **React useEffect:** Side effects (scroll listeners, event handlers)

### Form Management
- **React Hook Form:** Contact form state
- **Zod:** Form validation schemas (available but basic HTML validation used)

## Build & Development

### Build Configuration
- **Dev Server:** Port 8080, IPv6 support (::)
- **Path Alias:** `@/` maps to `./src/`
- **SWC:** Fast React refresh with Vite plugin
- **Development Features:** Component tagging in dev mode

### Scripts
```json
{
  "dev": "vite",                              // Development server
  "build": "vite build",                      // Production build
  "build:dev": "vite build --mode development", // Dev build
  "lint": "eslint .",                         // Lint codebase
  "preview": "vite preview"                   // Preview production build
}
```

### Environment Configuration
- No environment variables currently in use
- Ready for expansion with Vite env vars

## Performance Considerations

### Optimization Strategies
1. **Code Splitting:** React.lazy ready (not currently used)
2. **Tree Shaking:** Vite automatically removes unused code
3. **Image Optimization:** Single hero background image
4. **Animation Performance:** Framer Motion with once: true for scroll animations
5. **Bundle Size:** SWC for faster compilation

### Best Practices Implemented
- Smooth scroll with CSS
- Responsive images and layouts
- Minimal external dependencies
- Component memoization ready (not currently used)

## Accessibility

### Current Implementation
- Semantic HTML structure
- ARIA labels on interactive elements (mobile menu button)
- Keyboard navigation support (native link behavior)
- Focus states on form inputs
- Smooth scroll respects user preferences

### Areas for Enhancement
- ARIA landmarks could be added to sections
- Skip navigation link
- Form error announcements
- Focus management in modals

## Security Considerations

### Current Security Measures
- No sensitive data storage
- Form submission currently client-side only (toast notification)
- No authentication or authorization required
- HTTPS ready (deployment dependent)

### Recommendations
1. Implement CSRF protection when adding backend
2. Sanitize form inputs before backend submission
3. Add rate limiting for contact form
4. Configure Content Security Policy headers

## Responsive Design

### Breakpoints (Tailwind defaults)
- **sm:** 640px
- **md:** 768px
- **lg:** 1024px
- **xl:** 1280px
- **2xl:** 1400px (custom container max)

### Mobile-First Approach
- Base styles for mobile
- Progressive enhancement for larger screens
- Mobile menu for screens < 1024px
- Responsive grid layouts (1 col mobile → 2-3 cols desktop)

## Integration Points

### Current Integrations
- **Google Fonts:** Cormorant Garamond & Inter
- **No Backend:** Static frontend only

### Future Integration Opportunities
1. **Email Service:** For contact form (EmailJS, SendGrid, etc.)
2. **CMS:** For content management
3. **Analytics:** Google Analytics / Plausible
4. **Booking System:** For appointment scheduling
5. **Payment Gateway:** For online payments
6. **Maps API:** For location display

## Deployment

### Deployment Target
- **Platform:** Lovable.dev (mentioned in README)
- **Static Hosting:** Compatible with Vercel, Netlify, GitHub Pages

### Build Output
- Static HTML, CSS, JS files
- Production build in `dist/` directory
- Optimized and minified assets

### Deployment Process
1. Run `npm run build`
2. Deploy `dist/` directory to hosting platform
3. Configure custom domain (optional)

## Browser Support

### Target Browsers
- Modern browsers with ES2020 support
- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Polyfills
- None required for target browsers
- Vite handles module transformation

## Maintenance & Updates

### Dependency Management
- Regular updates recommended for security patches
- Lock file: package-lock.json (npm) or bun.lockb (bun)
- No deprecated dependencies currently

### Code Quality
- ESLint configured for React best practices
- TypeScript strict mode recommended for new code
- Component naming: PascalCase
- File naming: PascalCase for components, kebab-case for assets

## Future Enhancements

### Potential Features
1. Blog section for articles
2. Testimonials carousel
3. FAQ section
4. Multi-language support (English, Ukrainian)
5. Booking calendar integration
6. Newsletter subscription
7. Resources/downloads section
8. Video introductions
9. Live chat support
10. SEO optimization (meta tags, structured data)

## Testing Strategy

### Current Testing
- No automated tests currently implemented

### Recommended Testing Approach
1. **Unit Tests:** Vitest + React Testing Library
2. **E2E Tests:** Playwright or Cypress
3. **Accessibility Testing:** axe-core
4. **Visual Regression:** Chromatic or Percy
