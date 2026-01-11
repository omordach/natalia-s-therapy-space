# Component Documentation

## Overview
This document provides detailed information about all custom components in the application, their props, usage patterns, and responsibilities.

## Page Components

### Index
**File:** [src/pages/Index.tsx](src/pages/Index.tsx)

**Purpose:** Main landing page that composes all sections

**Structure:**
```tsx
<div className="min-h-screen">
  <Header />
  <main>
    <Hero />
    <About />
    <Services />
    <ForWho />
    <HowIWork />
    <Pricing />
    <Location />
    <Contact />
  </main>
  <Footer />
</div>
```

**Usage:**
- Default route (`/`)
- Single-page layout with anchor navigation
- No props required

---

### NotFound
**File:** [src/pages/NotFound.tsx](src/pages/NotFound.tsx)

**Purpose:** 404 error page for unmatched routes

**Usage:**
- Catch-all route (`*`)
- Displays when user navigates to non-existent page

---

## Section Components

### Header
**File:** [src/components/Header.tsx](src/components/Header.tsx:1-101)

**Purpose:** Fixed navigation header with desktop and mobile menus

**Features:**
- Sticky header with scroll-based styling
- Desktop horizontal navigation (lg+)
- Mobile hamburger menu (< lg)
- Smooth scroll to sections
- Background blur on scroll

**State:**
- `isScrolled`: boolean - Tracks if page is scrolled > 50px
- `isMobileMenuOpen`: boolean - Mobile menu visibility

**Navigation Items:**
```typescript
const navItems = [
  { href: '#o-mnie', label: 'O mnie' },
  { href: '#oferta', label: 'Oferta' },
  { href: '#dla-kogo', label: 'Dla kogo' },
  { href: '#cennik', label: 'Cennik' },
  { href: '#lokalizacja', label: 'Lokalizacja' },
  { href: '#kontakt', label: 'Kontakt' },
];
```

**Styling Classes:**
- `.nav-link` - Navigation link styles
- `.btn-primary` - CTA button
- Conditional background based on scroll state

**Animations:**
- Framer Motion AnimatePresence for mobile menu
- Height animation on mobile menu open/close

---

### Hero
**File:** [src/components/Hero.tsx](src/components/Hero.tsx:1-75)

**Purpose:** Landing hero section with background image and main CTA

**Features:**
- Full-screen hero section
- Background image with gradient overlay
- Animated text entrance
- Scroll indicator animation
- CTA button to contact section

**Content Structure:**
- Subtitle: "Psychoterapeuta psychodynamiczny"
- Main heading: "Natalia Mordach"
- Description: "Pomagam odnaleźć spokój i zrozumienie siebie"
- CTA: "Umów wizytę" → #kontakt

**Animations:**
- Staggered fade-up for text elements (0.1s delays)
- Infinite bounce animation for scroll indicator
- Initial render animations with Framer Motion

**Background:**
- Image: `src/assets/hero-bg.jpg`
- Gradient overlay: from transparent to full background

---

### About
**File:** [src/components/About.tsx](src/components/About.tsx:1-68)

**Purpose:** Introduction section with photo and bio

**Features:**
- Two-column layout (image | text)
- Scroll-triggered animations
- Profile image placeholder with icon
- Professional background information

**Layout:**
- Grid: md:grid-cols-2
- Gap: 12 (3rem) to 20 (5rem)
- Background: secondary/30

**Content:**
- Profile image area (circular, 72-96 size)
- Heading: "O mnie"
- Bio paragraphs about qualifications and approach

**Animations:**
- Profile image: fade from left (x: -50)
- Text content: fade from right (x: 50)
- Uses useInView hook with -100px margin

---

### Services
**File:** [src/components/Services.tsx](src/components/Services.tsx:1-70)

**Purpose:** Display offered services in card layout

**Services Data:**
```typescript
const services = [
  {
    icon: User,
    title: 'Psychoterapia indywidualna',
    description: 'Długoterminowa praca nad głębokimi wzorcami...',
  },
  {
    icon: MessageCircle,
    title: 'Konsultacje psychologiczne',
    description: 'Krótkoterminowe wsparcie w konkretnych...',
  },
  {
    icon: Video,
    title: 'Sesje online',
    description: 'Możliwość spotkań przez platformy wideo...',
  },
];
```

**Layout:**
- Grid: md:grid-cols-3
- Card style: `.card-service`
- Icon in circular badge

**Animations:**
- Title/description: fade-up
- Cards: staggered entrance (0.15s delay between)

**Icons:** Lucide React (User, MessageCircle, Video)

---

### ForWho
**File:** [src/components/ForWho.tsx](src/components/ForWho.tsx)

**Purpose:** Describe target audience for therapy services

**Expected Content:**
- Who can benefit from therapy
- Common issues addressed
- Client personas/scenarios

**Note:** Component exists but specific implementation details should be reviewed in source file

---

### HowIWork
**File:** [src/components/HowIWork.tsx](src/components/HowIWork.tsx)

**Purpose:** Explain therapy methodology and approach

**Expected Content:**
- Therapy process overview
- Session structure
- Therapeutic approach (psychodynamic)
- What to expect

**Note:** Component exists but specific implementation details should be reviewed in source file

---

### Pricing
**File:** [src/components/Pricing.tsx](src/components/Pricing.tsx:1-76)

**Purpose:** Display pricing information for services

**Pricing Data:**
```typescript
const pricingItems = [
  {
    title: 'Sesja indywidualna',
    duration: '50 min',
    price: '200 zł',
  },
  {
    title: 'Konsultacja wstępna',
    duration: '50 min',
    price: '200 zł',
  },
  {
    title: 'Sesja online',
    duration: '50 min',
    price: '200 zł',
  },
];
```

**Layout:**
- Grid: md:grid-cols-3
- Max width: 4xl
- Background: secondary/30
- Cards with shadow-card

**Features:**
- Clock icon for duration
- Prominent price display (3xl, font-heading)
- Disclaimer note about pricing changes

**Animations:**
- Cards: staggered fade-up (0.15s delay)
- Disclaimer: delayed fade-in (0.5s)

---

### Location
**File:** [src/components/Location.tsx](src/components/Location.tsx)

**Purpose:** Display practice location and accessibility information

**Expected Content:**
- Office address
- Map integration (future)
- Public transport information
- Parking details
- Accessibility information

**Note:** Component exists but specific implementation details should be reviewed in source file

---

### Contact
**File:** [src/components/Contact.tsx](src/components/Contact.tsx:1-173)

**Purpose:** Contact information and form for appointment requests

**Features:**
- Two-column layout (contact info | form)
- Contact details with icons
- Contact form with validation
- Toast notifications on submit

**Form Fields:**
```typescript
{
  name: string (required)
  email: string (required)
  phone: string (optional)
  message: string (required)
}
```

**Contact Information:**
- Email: kontakt@nataliamordach.pl
- Phone: +48 XXX XXX XXX (placeholder)

**Form Behavior:**
- Client-side validation (HTML5)
- Toast notification on submit
- Form reset after submission
- No backend integration yet

**Icons:** Mail, Phone, Send (Lucide React)

**Styling:**
- Form in card with shadow-card
- Input focus ring in primary color
- Textarea non-resizable, 4 rows

---

### Footer
**File:** [src/components/Footer.tsx](src/components/Footer.tsx)

**Purpose:** Site footer with additional links and information

**Expected Content:**
- Copyright notice
- Legal links (privacy policy, terms)
- Social media links
- Additional contact info
- Credentials/certifications

**Note:** Component exists but specific implementation details should be reviewed in source file

---

### NavLink
**File:** [src/components/NavLink.tsx](src/components/NavLink.tsx)

**Purpose:** Reusable navigation link component

**Expected Props:**
```typescript
interface NavLinkProps {
  href: string;
  label: string;
  onClick?: () => void;
}
```

**Styling:**
- `.nav-link` base styles
- Active state detection
- Hover effects

---

## UI Components (shadcn/ui)

### Directory: src/components/ui/

These are pre-built, customizable components from shadcn/ui. They are based on Radix UI primitives and styled with Tailwind CSS.

#### Available UI Components

**Layout & Structure:**
- `accordion.tsx` - Collapsible content sections
- `card.tsx` - Card container with header, content, footer
- `separator.tsx` - Visual divider
- `scroll-area.tsx` - Scrollable area with custom scrollbar
- `resizable.tsx` - Resizable panels
- `sidebar.tsx` - Sidebar navigation component
- `tabs.tsx` - Tabbed interface

**Forms & Inputs:**
- `form.tsx` - Form wrapper with React Hook Form integration
- `input.tsx` - Text input field
- `textarea.tsx` - Multi-line text input
- `label.tsx` - Form label
- `checkbox.tsx` - Checkbox input
- `radio-group.tsx` - Radio button group
- `select.tsx` - Dropdown select
- `switch.tsx` - Toggle switch
- `slider.tsx` - Range slider
- `input-otp.tsx` - OTP/PIN input
- `calendar.tsx` - Date picker calendar

**Buttons & Actions:**
- `button.tsx` - Button component with variants
- `toggle.tsx` - Toggle button
- `toggle-group.tsx` - Group of toggle buttons

**Overlays & Dialogs:**
- `dialog.tsx` - Modal dialog
- `alert-dialog.tsx` - Confirmation dialog
- `popover.tsx` - Popover overlay
- `dropdown-menu.tsx` - Dropdown menu
- `context-menu.tsx` - Right-click context menu
- `menubar.tsx` - Menu bar navigation
- `navigation-menu.tsx` - Navigation menu with submenus
- `sheet.tsx` - Slide-out panel
- `drawer.tsx` - Bottom drawer (mobile-friendly)
- `hover-card.tsx` - Hover-triggered card
- `tooltip.tsx` - Tooltip on hover

**Feedback & Notifications:**
- `toast.tsx` - Toast notification component
- `toaster.tsx` - Toast container
- `sonner.tsx` - Alternative toast system
- `alert.tsx` - Alert/notice component
- `badge.tsx` - Status badge
- `progress.tsx` - Progress bar
- `skeleton.tsx` - Loading skeleton

**Data Display:**
- `table.tsx` - Data table
- `avatar.tsx` - User avatar
- `chart.tsx` - Chart components (Recharts integration)
- `aspect-ratio.tsx` - Aspect ratio container
- `carousel.tsx` - Image/content carousel

**Navigation:**
- `breadcrumb.tsx` - Breadcrumb navigation
- `pagination.tsx` - Pagination controls
- `command.tsx` - Command palette (⌘K style)

**Utilities:**
- `collapsible.tsx` - Collapsible content
- `use-toast.ts` - Toast hook

### Usage Example

#### Button
```tsx
import { Button } from '@/components/ui/button';

<Button variant="default">Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
```

#### Card
```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Content goes here
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

#### Dialog
```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Dialog description</DialogDescription>
    </DialogHeader>
    {/* Dialog content */}
  </DialogContent>
</Dialog>
```

#### Form
```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  username: z.string().min(2).max(50),
});

function MyForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormDescription>Your public username</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
```

#### Toast
```tsx
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

function Component() {
  const { toast } = useToast();

  return (
    <Button
      onClick={() => {
        toast({
          title: 'Success',
          description: 'Your action completed successfully',
        });
      }}
    >
      Show Toast
    </Button>
  );
}
```

## Custom Hooks

### use-mobile
**File:** [src/hooks/use-mobile.tsx](src/hooks/use-mobile.tsx)

**Purpose:** Detect if viewport is mobile size

**Usage:**
```tsx
import { useMobile } from '@/hooks/use-mobile';

const Component = () => {
  const isMobile = useMobile();

  return (
    <div>
      {isMobile ? <MobileView /> : <DesktopView />}
    </div>
  );
};
```

**Implementation:**
- Uses window.matchMedia
- Breakpoint: 768px (md)
- Returns boolean

---

### use-toast
**File:** [src/hooks/use-toast.ts](src/hooks/use-toast.ts)

**Purpose:** Toast notification system hook

**Usage:**
```tsx
import { useToast } from '@/hooks/use-toast';

const Component = () => {
  const { toast } = useToast();

  const showNotification = () => {
    toast({
      title: 'Title',
      description: 'Description',
      variant: 'default', // or 'destructive'
    });
  };

  return <button onClick={showNotification}>Show Toast</button>;
};
```

**Toast Options:**
```typescript
interface Toast {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
  action?: ReactNode;
}
```

## Component Patterns

### Scroll Animation Pattern
Used across most section components for consistent entrance animations.

```tsx
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const Component = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* Content */}
    </motion.div>
  );
};
```

**Key Points:**
- `ref` attached to animated element
- `once: true` - animation runs only once
- `margin: '-100px'` - triggers 100px before viewport
- Common initial states: `{ opacity: 0, y: 30 }` or `{ opacity: 0, x: -50 }`

### Section Layout Pattern
Consistent structure for page sections.

```tsx
<section id="section-id" className="section-padding bg-optional">
  <div className="container-wide">
    <motion.div className="text-center mb-16">
      <h2 className="heading-section text-foreground mb-4">
        Section Title
      </h2>
      <p className="text-body max-w-2xl mx-auto">
        Section description
      </p>
    </motion.div>

    {/* Section content */}
  </div>
</section>
```

**Key Elements:**
- `id` attribute for anchor navigation
- `.section-padding` for consistent spacing
- `.container-wide` or `.container-narrow` for width constraints
- Centered title/description block
- Optional background color

### Card Grid Pattern
Used for services, pricing, etc.

```tsx
<div className="grid md:grid-cols-3 gap-8">
  {items.map((item, index) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="card-service"
    >
      {/* Card content */}
    </motion.div>
  ))}
</div>
```

**Key Features:**
- Responsive grid (1 col mobile → 3 cols desktop)
- Staggered animation delays (index * 0.15)
- `.card-service` or custom card styling

## Component Communication

### Parent to Child
Props-based communication (standard React)

```tsx
// Parent
<ChildComponent title="Title" onAction={handleAction} />

// Child
interface ChildProps {
  title: string;
  onAction: () => void;
}

const ChildComponent = ({ title, onAction }: ChildProps) => {
  // Component logic
};
```

### Global State
Currently minimal global state:
- Toast notifications via useToast hook
- React Query for future API integration

### Event-based
Anchor links for navigation:
```tsx
<a href="#section-id">Go to Section</a>
```

Smooth scroll enabled globally in CSS:
```css
html {
  scroll-behavior: smooth;
}
```

## Accessibility Notes

### Current Implementation
- Semantic HTML elements
- ARIA labels where needed (e.g., mobile menu button)
- Keyboard navigation for links and buttons
- Focus states on interactive elements
- Required fields marked in forms

### Recommended Enhancements
- Add ARIA landmarks to sections
- Implement skip navigation link
- Add focus management for modals
- Enhance form error announcements
- Add ARIA live regions for dynamic content

## Performance Considerations

### Optimization Techniques Used
- `once: true` on scroll animations prevents re-renders
- Minimal re-renders with proper state management
- No unnecessary useEffect dependencies

### Future Optimizations
- Lazy load below-fold sections
- Image lazy loading
- Code splitting for heavy components
- React.memo for expensive components
