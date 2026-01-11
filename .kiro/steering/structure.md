# Project Structure

```
src/
├── assets/           # Images (hero-bg.jpg, profile photo)
├── components/       # React components
│   ├── ui/          # shadcn/ui primitives (do not edit directly)
│   ├── Header.tsx   # Fixed nav with mobile menu
│   ├── Hero.tsx     # Landing hero section
│   ├── About.tsx    # Bio section
│   ├── Services.tsx # Service cards
│   ├── ForWho.tsx   # Target audience
│   ├── HowIWork.tsx # Methodology
│   ├── Pricing.tsx  # Pricing cards
│   ├── Location.tsx # Office location
│   ├── Contact.tsx  # Contact form
│   └── Footer.tsx   # Site footer
├── hooks/           # Custom hooks (use-mobile, use-toast)
├── lib/             # Utilities (cn function for class merging)
├── pages/           # Route components
│   ├── Index.tsx    # Main landing page (composes all sections)
│   └── NotFound.tsx # 404 page
├── App.tsx          # Root with providers and routing
├── main.tsx         # Entry point
└── index.css        # Global styles, CSS variables, custom classes
```

## Conventions
- **Components:** PascalCase, default exports
- **Section IDs:** Polish slugs for anchor nav (#o-mnie, #oferta, #cennik, etc.)
- **Custom classes:** Defined in index.css (.section-padding, .container-wide, .heading-section, .card-service, .btn-primary, .nav-link)
- **Animations:** Use framer-motion with useInView hook, `once: true`, `-100px` margin

## Component Pattern
```tsx
const Section = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="section-id" className="section-padding">
      <div className="container-wide">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Content */}
        </motion.div>
      </div>
    </section>
  );
};
```
