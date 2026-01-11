# Design Document: Localization Support

## Overview

This design document outlines the architecture and implementation approach for adding multi-language support (Polish and Ukrainian) to the Natalia Mordach psychotherapy website. The solution uses React Context for state management, JSON-based translation files, and a custom hook-based API for accessing translations throughout the application.

## Architecture

The localization system follows a provider-consumer pattern using React Context:

```
┌─────────────────────────────────────────────────────────────┐
│                        App.tsx                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              LocalizationProvider                    │    │
│  │  ┌─────────────────┐  ┌─────────────────────────┐   │    │
│  │  │  Language State │  │  Translation Loader     │   │    │
│  │  │  (pl | uk)      │  │  (JSON files)           │   │    │
│  │  └─────────────────┘  └─────────────────────────┘   │    │
│  │                                                      │    │
│  │  ┌─────────────────────────────────────────────┐    │    │
│  │  │              Components                      │    │    │
│  │  │  useTranslation() hook                       │    │    │
│  │  │  - t('key') → translated string              │    │    │
│  │  │  - locale → current language                 │    │    │
│  │  │  - setLocale() → change language             │    │    │
│  │  └─────────────────────────────────────────────┘    │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

1. User visits site → Check localStorage for saved preference
2. No preference → Detect browser language
3. Set active locale (pl or uk, default: pl)
4. Load corresponding translation file
5. Components access translations via `useTranslation()` hook
6. User changes language → Update state, persist to localStorage, re-render

## Components and Interfaces

### LocalizationContext

```typescript
interface LocalizationContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

type Locale = 'pl' | 'uk';
```

### LocalizationProvider

A React context provider that:
- Manages current locale state
- Handles language detection on initial load
- Persists language preference to localStorage
- Provides the `t()` translation function

### useTranslation Hook

```typescript
function useTranslation(): {
  t: (key: string, params?: Record<string, string | number>) => string;
  locale: Locale;
  setLocale: (locale: Locale) => void;
}
```

### LanguageSwitcher Component

A UI component displaying language options:
- Shows flag icons or language codes (PL/UA)
- Highlights current selection
- Accessible via keyboard navigation
- Works in both desktop nav and mobile menu

## Data Models

### Translation File Structure

```typescript
// src/locales/pl.json
{
  "nav": {
    "about": "O mnie",
    "services": "Oferta",
    "forWho": "Dla kogo",
    "pricing": "Cennik",
    "location": "Lokalizacja",
    "contact": "Kontakt",
    "bookVisit": "Umów wizytę"
  },
  "hero": {
    "subtitle": "Psychoterapeutka psychodynamiczna",
    "title": "Natalia Mordach",
    "description": "Pomagam odnaleźć spokój i zrozumienie siebie"
  },
  // ... more sections
}
```

### Locale Configuration

```typescript
interface LocaleConfig {
  code: Locale;
  name: string;
  flag: string; // emoji or icon identifier
}

const SUPPORTED_LOCALES: LocaleConfig[] = [
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'uk', name: 'Українська', flag: '🇺🇦' }
];
```

### Storage Keys

```typescript
const STORAGE_KEY = 'preferred-locale';
```



## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Translation Completeness

*For any* translation key used in the application, that key SHALL exist in all supported locale files (pl.json and uk.json) with a non-empty string value.

**Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5**

### Property 2: Locale Persistence Round-Trip

*For any* supported locale value, if that locale is set via `setLocale()`, then reading from localStorage and initializing a new context SHALL restore the same locale value.

**Validates: Requirements 1.3, 1.4**

### Property 3: Browser Language Detection

*For any* browser language string, the detected locale SHALL be the matching supported locale if one exists, or 'pl' (Polish) as the default otherwise.

**Validates: Requirements 2.1, 2.2, 2.3**

### Property 4: Translation Interpolation

*For any* translation string containing placeholder patterns (e.g., `{{year}}`) and any valid parameter object, the `t()` function SHALL return a string with all placeholders replaced by their corresponding parameter values.

**Validates: Requirements 5.3**

### Property 5: Section ID Consistency

*For any* section component, the HTML `id` attribute SHALL remain constant regardless of the active locale.

**Validates: Requirements 6.2**

### Property 6: Locale Change Updates Content

*For any* locale change from one supported locale to another, all components using the `t()` function SHALL render text matching the new locale's translations.

**Validates: Requirements 1.2**

## Error Handling

### Missing Translation Keys

When a translation key is not found:
1. Return the key itself as fallback (e.g., `t('missing.key')` returns `'missing.key'`)
2. Log a warning in development mode for debugging
3. Never throw an error that would break the UI

### Invalid Locale

When an invalid locale is provided:
1. Fall back to the default locale ('pl')
2. Log a warning in development mode

### localStorage Unavailable

When localStorage is not available (e.g., private browsing):
1. Use in-memory storage for the session
2. Language preference will not persist across sessions
3. No error shown to user

### Interpolation Errors

When interpolation parameters are missing:
1. Leave the placeholder as-is in the output
2. Log a warning in development mode

## Testing Strategy

### Property-Based Testing Library

The project will use **fast-check** for property-based testing, integrated with Vitest as the test runner.

### Unit Tests

Unit tests will cover:
- `useTranslation` hook initialization
- `LanguageSwitcher` component rendering
- Edge cases for missing translations
- localStorage interaction mocking

### Property-Based Tests

Each correctness property will be implemented as a property-based test:

1. **Translation Completeness Test**: Generate random keys from one locale file, verify they exist in all other locale files
2. **Locale Persistence Round-Trip Test**: Generate random supported locales, set them, verify localStorage contains the value
3. **Browser Language Detection Test**: Generate random browser language strings, verify detection returns valid locale
4. **Translation Interpolation Test**: Generate random parameter objects, verify all placeholders are replaced
5. **Section ID Consistency Test**: Generate locale changes, verify section IDs remain constant
6. **Locale Change Updates Content Test**: Generate locale switches, verify rendered content matches new locale

### Test Annotations

Each property-based test MUST include a comment in this format:
```typescript
// **Feature: localization, Property 1: Translation Completeness**
```

### Test Configuration

Property-based tests will run with a minimum of 100 iterations to ensure adequate coverage of the input space.

## File Structure

```
src/
├── locales/
│   ├── pl.json          # Polish translations
│   ├── uk.json          # Ukrainian translations
│   └── index.ts         # Locale exports and types
├── contexts/
│   └── LocalizationContext.tsx  # Context provider
├── hooks/
│   └── useTranslation.ts        # Translation hook
├── components/
│   └── LanguageSwitcher.tsx     # Language switcher UI
```
