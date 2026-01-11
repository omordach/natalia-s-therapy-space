# Design System Documentation

## Brand Identity

### Overview
The design system for Natalia's Therapy Space creates a calm, professional, and trustworthy atmosphere suitable for a psychotherapy practice. The aesthetic balances warmth with professionalism through careful color selection, typography, and spacing.

### Design Principles
1. **Calm & Serene** - Colors and spacing promote tranquility
2. **Professional** - Typography and layout convey expertise
3. **Accessible** - High contrast, clear hierarchy, readable fonts
4. **Welcoming** - Warm tones and gentle animations
5. **Trustworthy** - Consistent, polished design language

## Color System

### Primary Palette

#### Sage Green (Primary Color)
Represents growth, healing, and nature. Used for interactive elements and emphasis.

```css
--sage: 155 25% 42%          /* hsl(155, 25%, 42%) - Main sage */
--sage-light: 155 20% 88%    /* hsl(155, 20%, 88%) - Light sage */
--sage-dark: 155 30% 30%     /* hsl(155, 30%, 30%) - Dark sage */
```

**Tailwind Classes:**
- `bg-sage` / `text-sage`
- `bg-sage-light` / `text-sage-light`
- `bg-sage-dark` / `text-sage-dark`

**Usage:**
- Primary buttons and CTAs
- Icon backgrounds
- Hover states
- Focus rings
- Accent elements

#### Cream (Background & Surface)
Warm, inviting background that's easier on the eyes than pure white.

```css
--cream: 40 33% 98%          /* hsl(40, 33%, 98%) - Light cream */
--cream-dark: 40 30% 94%     /* hsl(40, 30%, 94%) - Darker cream */
```

**Tailwind Classes:**
- `bg-cream`
- `bg-cream-dark`

**Usage:**
- Main background
- Card surfaces
- Secondary backgrounds

### Semantic Colors

#### Background Colors
```css
/* Light Mode */
--background: 40 33% 98%           /* Warm cream base */
--foreground: 160 15% 20%          /* Dark sage for text */

/* Dark Mode */
--background: 160 15% 10%          /* Deep sage-tinted dark */
--foreground: 40 33% 95%           /* Light cream for text */
```

#### Primary (Interactive Elements)
```css
/* Light Mode */
--primary: 155 25% 42%             /* Sage green */
--primary-foreground: 40 33% 98%  /* Cream text on sage */

/* Dark Mode */
--primary: 155 25% 55%             /* Lighter sage for dark bg */
--primary-foreground: 160 15% 10% /* Dark text on sage */
```

#### Secondary (Subtle Backgrounds)
```css
/* Light Mode */
--secondary: 40 30% 94%            /* Light cream */
--secondary-foreground: 160 15% 25% /* Darker sage */

/* Dark Mode */
--secondary: 160 12% 18%           /* Dark sage tint */
--secondary-foreground: 40 30% 90% /* Light cream */
```

#### Muted (Disabled/Subtle Elements)
```css
/* Light Mode */
--muted: 40 20% 92%                /* Very light cream */
--muted-foreground: 160 10% 45%    /* Medium sage */

/* Dark Mode */
--muted: 160 10% 20%               /* Dark muted sage */
--muted-foreground: 40 15% 65%     /* Light muted cream */
```

#### Accent (Highlights)
```css
/* Light Mode */
--accent: 155 20% 88%              /* Very light sage */
--accent-foreground: 155 25% 30%   /* Dark sage */

/* Dark Mode */
--accent: 155 15% 22%              /* Dark sage */
--accent-foreground: 155 25% 75%   /* Light sage */
```

#### Card (Surface)
```css
/* Light Mode */
--card: 40 40% 97%                 /* Slightly darker than bg */
--card-foreground: 160 15% 20%     /* Dark sage text */

/* Dark Mode */
--card: 160 15% 12%                /* Slightly lighter than bg */
--card-foreground: 40 33% 95%      /* Light cream text */
```

#### Destructive (Errors/Warnings)
```css
/* Light Mode */
--destructive: 0 84.2% 60.2%       /* Red for errors */
--destructive-foreground: 210 40% 98% /* Light text */

/* Dark Mode */
--destructive: 0 62.8% 30.6%       /* Darker red */
--destructive-foreground: 210 40% 98% /* Light text */
```

#### Border & Input
```css
/* Light Mode */
--border: 40 20% 88%               /* Subtle cream border */
--input: 40 20% 88%                /* Input border */
--ring: 155 25% 42%                /* Focus ring (sage) */

/* Dark Mode */
--border: 160 10% 20%              /* Dark border */
--input: 160 10% 20%               /* Dark input border */
--ring: 155 25% 55%                /* Lighter focus ring */
```

### Additional Colors

#### Warm Gray
```css
--warm-gray: 30 10% 60%            /* Neutral warm tone */
```

#### Text Colors
```css
--text-primary: 160 15% 20%        /* Main text (dark sage) */
--text-secondary: 160 10% 45%      /* Secondary text (medium sage) */
```

### Color Usage Guidelines

#### Do's
- Use sage for interactive elements (buttons, links, icons)
- Use cream/background for surfaces
- Use muted-foreground for secondary text
- Maintain consistent color roles across components
- Use semantic colors (destructive for errors, etc.)

#### Don'ts
- Don't use pure black (#000000)
- Don't use pure white (#FFFFFF) except for dark mode text
- Don't mix random colors outside the palette
- Don't use sage for large background areas
- Don't use low-contrast color combinations

## Typography

### Font Families

#### Headings
**Font:** Cormorant Garamond (Google Fonts)
**Weights:** 400 (Regular), 500 (Medium), 600 (Semi-bold), 700 (Bold)
**Style:** Serif, elegant, professional

```css
--font-heading: 'Cormorant Garamond', serif;
```

**CSS Class:**
```css
font-family: var(--font-heading);
```

**Tailwind Class:**
```tsx
className="font-heading"
```

**Usage:**
- All heading levels (h1-h6)
- Large display text
- Emphasis text
- Brand name

#### Body Text
**Font:** Inter (Google Fonts)
**Weights:** 300 (Light), 400 (Regular), 500 (Medium), 600 (Semi-bold)
**Style:** Sans-serif, modern, highly readable

```css
--font-body: 'Inter', sans-serif;
```

**CSS Class:**
```css
font-family: var(--font-body);
```

**Tailwind Class:**
```tsx
className="font-body"
```

**Usage:**
- Paragraph text
- Navigation
- Buttons
- Forms
- UI elements

### Type Scale

#### Display Heading
**Class:** `.heading-display`
**Sizes:**
- Mobile: 2.25rem (36px)
- Tablet: 3rem (48px)
- Desktop: 3.75rem (60px)

```css
.heading-display {
  font-family: var(--font-heading);
  font-size: clamp(2.25rem, 5vw, 3.75rem);
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.02em;
}
```

**Usage:** Hero headings, main page titles

#### Section Heading
**Class:** `.heading-section`
**Sizes:**
- Mobile: 1.875rem (30px)
- Tablet: 2.25rem (36px)
- Desktop: 3rem (48px)

```css
.heading-section {
  font-family: var(--font-heading);
  font-size: clamp(1.875rem, 4vw, 3rem);
  font-weight: 500;
  letter-spacing: -0.01em;
}
```

**Usage:** Section headings (About, Services, etc.)

#### Card Heading
**Class:** `.heading-card`
**Sizes:**
- Mobile: 1.25rem (20px)
- Tablet: 1.5rem (24px)
- Desktop: 1.5rem (24px)

```css
.heading-card {
  font-family: var(--font-heading);
  font-size: clamp(1.25rem, 2vw, 1.5rem);
  font-weight: 500;
}
```

**Usage:** Card titles, subsection headings

#### Body Text
**Class:** `.text-body`
**Sizes:**
- Mobile: 1rem (16px)
- Tablet/Desktop: 1.125rem (18px)

```css
.text-body {
  font-size: clamp(1rem, 1.5vw, 1.125rem);
  line-height: 1.7;
  color: hsl(var(--muted-foreground));
}
```

**Usage:** Paragraph text, descriptions

#### Body Large
**Class:** `.text-body-large`
**Sizes:**
- Mobile: 1.125rem (18px)
- Tablet/Desktop: 1.25rem (20px)

```css
.text-body-large {
  font-size: clamp(1.125rem, 2vw, 1.25rem);
  line-height: 1.7;
  color: hsl(var(--muted-foreground));
}
```

**Usage:** Hero descriptions, emphasis paragraphs

### Typography Guidelines

#### Line Height
- **Headings:** 1.2 - 1.3 (tight)
- **Body Text:** 1.6 - 1.7 (relaxed)
- **UI Elements:** 1.5 (normal)

#### Letter Spacing
- **Large Headings:** -0.02em to -0.01em (tighter)
- **Body Text:** 0 (default)
- **Uppercase Text:** 0.05em - 0.1em (wider)
- **Small Text:** 0.01em (slightly wider)

#### Font Weights
```
300 - Light (body only, used sparingly)
400 - Regular (body text, normal weight)
500 - Medium (headings, emphasis)
600 - Semi-bold (strong emphasis)
700 - Bold (Cormorant only, rare use)
```

## Spacing System

### Base Unit
Tailwind's default spacing scale (1 unit = 0.25rem = 4px)

### Common Spacing Values

#### Section Padding
**Class:** `.section-padding`
```css
.section-padding {
  padding-top: 5rem;     /* 80px mobile */
  padding-bottom: 5rem;
}

@media (min-width: 768px) {
  .section-padding {
    padding-top: 7rem;   /* 112px tablet */
    padding-bottom: 7rem;
  }
}

@media (min-width: 1024px) {
  .section-padding {
    padding-top: 8rem;   /* 128px desktop */
    padding-bottom: 8rem;
  }
}
```

#### Container Widths
**Narrow Container:**
```css
.container-narrow {
  max-width: 56rem;      /* 896px */
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;  /* 24px */
  padding-right: 1.5rem;
}
```

**Wide Container:**
```css
.container-wide {
  max-width: 72rem;      /* 1152px */
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;  /* 24px */
  padding-right: 1.5rem;
}
```

#### Component Spacing
- **Margin between sections:** 0 (handled by section-padding)
- **Gap in grids:** 2rem (32px) to 5rem (80px)
- **Card padding:** 2rem (32px)
- **Button padding:** 1rem 2rem (16px 32px)
- **Form field spacing:** 1.5rem (24px)

### Spacing Scale Reference
```
0   = 0px
1   = 4px
2   = 8px
3   = 12px
4   = 16px
5   = 20px
6   = 24px
8   = 32px
10  = 40px
12  = 48px
16  = 64px
20  = 80px
24  = 96px
32  = 128px
```

## Shadows & Elevation

### Shadow Tokens
```css
--shadow-soft: 0 4px 20px -4px hsl(155 25% 42% / 0.1);
--shadow-card: 0 8px 30px -8px hsl(155 25% 42% / 0.12);
--shadow-elevated: 0 20px 50px -12px hsl(155 25% 42% / 0.15);
```

### Tailwind Classes
```
shadow-soft      - Subtle shadow for cards
shadow-card      - Medium shadow for hover states
shadow-elevated  - Heavy shadow for modals/overlays
```

### Usage Guidelines
- **Level 0 (No shadow):** Flat elements, backgrounds
- **Level 1 (Soft):** Default cards, subtle elevation
- **Level 2 (Card):** Hover states, selected items
- **Level 3 (Elevated):** Modals, dropdowns, important overlays

### Colored Shadows
All shadows use sage green tint (`hsl(155 25% 42%)`) for brand consistency

## Border Radius

### Radius Scale
```css
--radius: 0.75rem;       /* 12px - Base radius */
```

### Tailwind Classes
```
rounded-sm   = calc(var(--radius) - 4px)  /* 8px */
rounded-md   = calc(var(--radius) - 2px)  /* 10px */
rounded-lg   = var(--radius)              /* 12px - Default */
rounded-xl   = 1rem                       /* 16px */
rounded-2xl  = 1.5rem                     /* 24px */
rounded-full = 9999px                     /* Fully rounded */
```

### Usage Guidelines
- **Small elements** (badges, chips): `rounded-full`
- **Buttons:** `rounded-full` (pill shape)
- **Cards:** `rounded-2xl` (24px)
- **Inputs:** `rounded-lg` (12px)
- **Images:** `rounded-full` for avatars, `rounded-xl` for photos
- **Icon backgrounds:** `rounded-full`

## Buttons

### Primary Button
**Class:** `.btn-primary`

```css
.btn-primary {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  padding: 1rem 2rem;              /* 16px 32px */
  border-radius: 9999px;           /* Fully rounded */
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-soft);
}

.btn-primary:hover {
  opacity: 0.9;
  box-shadow: var(--shadow-card);
}
```

**Usage:**
```tsx
<button className="btn-primary">Umów wizytę</button>
<a href="#contact" className="btn-primary">Get Started</a>
```

### Outline Button
**Class:** `.btn-outline`

```css
.btn-outline {
  border: 2px solid hsl(var(--primary));
  color: hsl(var(--primary));
  background: transparent;
  padding: 1rem 2rem;
  border-radius: 9999px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-outline:hover {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}
```

**Usage:**
```tsx
<button className="btn-outline">Learn More</button>
```

### Button Sizes
```tsx
// Small
className="btn-primary text-sm py-3 px-6"

// Default
className="btn-primary"

// Large
className="btn-primary text-lg py-5 px-10"
```

## Cards

### Service Card
**Class:** `.card-service`

```css
.card-service {
  background-color: hsl(var(--card));
  padding: 2rem;                    /* 32px */
  border-radius: 1.5rem;           /* 24px */
  transition: all 0.3s ease;
  box-shadow: var(--shadow-soft);
}

.card-service:hover {
  box-shadow: var(--shadow-card);
  transform: translateY(-0.25rem); /* Lift effect */
}
```

**Structure:**
```tsx
<div className="card-service text-center">
  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-sage-light flex items-center justify-center">
    <Icon className="w-7 h-7 text-primary" />
  </div>
  <h3 className="heading-card text-foreground mb-4">Card Title</h3>
  <p className="text-muted-foreground">Description text</p>
</div>
```

### Standard Card
From shadcn/ui:
```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content
  </CardContent>
</Card>
```

## Navigation

### Nav Link
**Class:** `.nav-link`

```css
.nav-link {
  color: hsl(var(--muted-foreground));
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: hsl(var(--foreground));
}
```

### Active Nav Link
**Class:** `.nav-link-active`

```css
.nav-link-active {
  color: hsl(var(--primary));
}
```

## Forms

### Input Fields
```tsx
<input
  type="text"
  className="w-full px-4 py-3 rounded-lg border border-border bg-background
             focus:outline-none focus:ring-2 focus:ring-primary/30
             transition-all"
/>
```

### Textarea
```tsx
<textarea
  rows={4}
  className="w-full px-4 py-3 rounded-lg border border-border bg-background
             focus:outline-none focus:ring-2 focus:ring-primary/30
             transition-all resize-none"
/>
```

### Form Labels
```tsx
<label className="block text-sm font-medium text-foreground mb-2">
  Label Text
</label>
```

### Form Validation States
```tsx
// Error state
<input className="... border-destructive focus:ring-destructive/30" />

// Success state
<input className="... border-primary focus:ring-primary/30" />
```

## Icons

### Icon Library
**Library:** Lucide React
**Version:** 0.462.0

### Icon Sizes
```tsx
// Small icons
<Icon className="w-4 h-4" />

// Default icons
<Icon className="w-5 h-5" />

// Medium icons
<Icon className="w-6 h-6" />

// Large icons
<Icon className="w-7 h-7" />

// Extra large icons
<Icon className="w-12 h-12" />
```

### Icon Colors
```tsx
// Primary color
<Icon className="text-primary" />

// Foreground color
<Icon className="text-foreground" />

// Muted color
<Icon className="text-muted-foreground" />
```

### Icon in Circle Badge
```tsx
<div className="w-12 h-12 rounded-full bg-sage-light flex items-center justify-center">
  <Icon className="w-5 h-5 text-primary" />
</div>
```

## Animations

### Animation Utilities

#### Fade Up
```css
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-up {
  animation: fadeUp 0.6s ease-out forwards;
}
```

#### Fade In
```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}
```

### Framer Motion Patterns

#### Standard Scroll Animation
```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

#### Slide from Left
```tsx
initial={{ opacity: 0, x: -50 }}
animate={isInView ? { opacity: 1, x: 0 } : {}}
```

#### Slide from Right
```tsx
initial={{ opacity: 0, x: 50 }}
animate={isInView ? { opacity: 1, x: 0 } : {}}
```

#### Staggered Children
```tsx
{items.map((item, index) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 30 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, delay: index * 0.15 }}
  >
    {item.content}
  </motion.div>
))}
```

### Animation Duration Guidelines
- **Quick:** 0.2s - 0.3s (hover states, toggles)
- **Standard:** 0.4s - 0.6s (scroll animations, transitions)
- **Slow:** 0.8s - 1.5s (large movements, emphasis)

### Easing Functions
- **Ease-out:** Default for entrances
- **Ease-in-out:** Smooth both ways
- **Ease-in:** Exits and dismissals

## Responsive Design

### Breakpoints
```css
/* Tailwind defaults */
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large desktops */
```

### Mobile-First Approach
Always write base styles for mobile, then add responsive variants:

```tsx
// Wrong
<div className="lg:text-base text-lg">

// Correct
<div className="text-base lg:text-lg">
```

### Responsive Patterns

#### Grid Layouts
```tsx
// 1 col mobile → 2 cols tablet → 3 cols desktop
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

// 1 col mobile → 2 cols desktop
<div className="grid lg:grid-cols-2 gap-12">
```

#### Typography
```tsx
// Responsive heading
<h1 className="text-4xl md:text-5xl lg:text-6xl">

// Responsive body
<p className="text-base md:text-lg">
```

#### Spacing
```tsx
// Responsive padding
<section className="py-20 md:py-28 lg:py-32">

// Responsive gap
<div className="gap-8 lg:gap-20">
```

## Accessibility

### Color Contrast
- **Normal text:** Minimum 4.5:1 contrast ratio
- **Large text:** Minimum 3:1 contrast ratio
- All color combinations tested for WCAG AA compliance

### Focus States
```css
/* Default focus ring */
focus:outline-none focus:ring-2 focus:ring-primary/30

/* Button focus */
focus:ring-offset-2 focus:ring-primary
```

### Interactive Elements
- Minimum touch target: 44x44px (mobile)
- Clear hover states for all clickable elements
- Visible focus indicators

### Keyboard Navigation
- All interactive elements keyboard accessible
- Logical tab order
- Skip navigation links (recommended)

## Component-Specific Patterns

### Section Headers
```tsx
<div className="text-center mb-16">
  <h2 className="heading-section text-foreground mb-4">
    Section Title
  </h2>
  <p className="text-body max-w-2xl mx-auto">
    Description text
  </p>
</div>
```

### Icon Badge
```tsx
<div className="w-16 h-16 mx-auto mb-6 rounded-full bg-sage-light
                flex items-center justify-center">
  <Icon className="w-7 h-7 text-primary" />
</div>
```

### Divider
```tsx
<div className="divider-sage my-12"></div>
```

### Responsive Container
```tsx
<div className="container-wide">
  {/* Content with max-width and padding */}
</div>
```

## Design Tokens Summary

### Color Tokens
- Primary: Sage green family
- Background: Cream family
- Text: Dark sage to medium sage
- Semantic: Standard UI colors

### Typography Tokens
- Heading font: Cormorant Garamond
- Body font: Inter
- Scale: Display → Section → Card → Body

### Spacing Tokens
- Section: 80px → 128px (responsive)
- Container: max-width 56rem / 72rem
- Component: 32px standard padding

### Shadow Tokens
- Soft, Card, Elevated
- All with sage tint

### Border Tokens
- Radius: 12px base, scaling up to 24px
- Color: Subtle cream/sage

## Usage Examples

### Complete Card Component
```tsx
<div className="card-service text-center">
  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-sage-light flex items-center justify-center">
    <User className="w-7 h-7 text-primary" />
  </div>
  <h3 className="heading-card text-foreground mb-4">
    Psychoterapia indywidualna
  </h3>
  <p className="text-muted-foreground">
    Długoterminowa praca nad głębokimi wzorcami emocjonalnymi i relacyjnymi.
  </p>
</div>
```

### Complete Section
```tsx
<section id="services" className="section-padding bg-secondary/30">
  <div className="container-wide">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <h2 className="heading-section text-foreground mb-4">Oferta</h2>
      <p className="text-body max-w-2xl mx-auto">
        Profesjonalne wsparcie psychoterapeutyczne
      </p>
    </motion.div>

    <div className="grid md:grid-cols-3 gap-8">
      {/* Cards go here */}
    </div>
  </div>
</section>
```
