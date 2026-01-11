# Tech Stack

## Core
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite 5 (SWC plugin for fast refresh)
- **Styling:** Tailwind CSS 3.4 with CSS variables
- **Components:** shadcn/ui (Radix UI primitives)

## Key Libraries
- **Routing:** react-router-dom v6
- **Animations:** framer-motion
- **Icons:** lucide-react
- **Forms:** react-hook-form + zod (validation)
- **State:** @tanstack/react-query (configured, minimal use)
- **Notifications:** sonner + custom toast system

## Typography
- Headings: Cormorant Garamond (Google Fonts)
- Body: Inter (Google Fonts)

## Design Tokens
Custom CSS variables in `src/index.css` for colors (sage/cream palette), shadows, and spacing.

## Commands
```bash
npm run dev      # Start dev server (port 8080)
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Path Alias
`@/` maps to `./src/` (configured in tsconfig.json and vite.config.ts)

## Adding UI Components
```bash
npx shadcn-ui@latest add [component-name]
```
