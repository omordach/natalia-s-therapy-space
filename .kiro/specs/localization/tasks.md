# Implementation Plan

- [x] 1. Set up localization infrastructure
  - [x] 1.1 Create locale type definitions and configuration
    - Create `src/locales/index.ts` with Locale type, SUPPORTED_LOCALES config, and STORAGE_KEY constant
    - Define LocalizationContextType interface
    - _Requirements: 5.1, 5.2_
  - [x] 1.2 Create Polish translation file
    - Create `src/locales/pl.json` with all translation keys organized by section
    - Include nav, hero, about, services, forWho, howIWork, pricing, location, contact, footer sections
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_
  - [x] 1.3 Create Ukrainian translation file
    - Create `src/locales/uk.json` with all translation keys matching Polish structure
    - Translate all content to Ukrainian
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_
  - [ ]* 1.4 Write property test for translation completeness
    - **Property 1: Translation Completeness**
    - **Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5**

- [x] 2. Implement LocalizationContext and useTranslation hook
  - [x] 2.1 Create LocalizationContext provider
    - Create `src/contexts/LocalizationContext.tsx`
    - Implement locale state management with useState
    - Implement browser language detection logic
    - Implement localStorage persistence for locale preference
    - Implement `t()` function with interpolation support
    - _Requirements: 1.2, 1.3, 1.4, 2.1, 2.2, 2.3, 5.3_
  - [x] 2.2 Create useTranslation hook
    - Create `src/hooks/useTranslation.ts`
    - Export t, locale, and setLocale from context
    - _Requirements: 1.2_
  - [ ]* 2.3 Write property test for locale persistence round-trip
    - **Property 2: Locale Persistence Round-Trip**
    - **Validates: Requirements 1.3, 1.4**
  - [ ]* 2.4 Write property test for browser language detection
    - **Property 3: Browser Language Detection**
    - **Validates: Requirements 2.1, 2.2, 2.3**
  - [ ]* 2.5 Write property test for translation interpolation
    - **Property 4: Translation Interpolation**
    - **Validates: Requirements 5.3**

- [x] 3. Implement LanguageSwitcher component
  - [x] 3.1 Create LanguageSwitcher component
    - Create `src/components/LanguageSwitcher.tsx`
    - Display language options with flag emojis (🇵🇱/🇺🇦)
    - Highlight currently active language
    - Handle click to change locale
    - _Requirements: 1.1, 4.1, 4.3_
  - [ ]* 3.2 Write unit tests for LanguageSwitcher
    - Test rendering of both language options
    - Test active language indication
    - Test click handler calls setLocale
    - _Requirements: 1.1, 4.3_

- [x] 4. Integrate localization into App
  - [x] 4.1 Wrap App with LocalizationProvider
    - Update `src/App.tsx` to include LocalizationProvider
    - _Requirements: 1.2_
  - [x] 4.2 Add LanguageSwitcher to Header
    - Update `src/components/Header.tsx` to include LanguageSwitcher in desktop and mobile nav
    - _Requirements: 4.1, 4.2, 4.4_

- [x] 5. Checkpoint - Ensure infrastructure tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Update Header component with translations
  - [x] 6.1 Refactor Header to use translations
    - Replace hardcoded Polish text with t() calls
    - Update navItems to use translation keys
    - _Requirements: 3.1_
  - [ ]* 6.2 Write property test for section ID consistency
    - **Property 5: Section ID Consistency**
    - **Validates: Requirements 6.2**

- [x] 7. Update Hero component with translations
  - [x] 7.1 Refactor Hero to use translations
    - Replace hardcoded Polish text with t() calls
    - _Requirements: 3.2_

- [x] 8. Update About component with translations
  - [x] 8.1 Refactor About to use translations
    - Replace hardcoded Polish text with t() calls
    - Update certifications data to use translations
    - _Requirements: 3.2_

- [x] 9. Update Services component with translations
  - [x] 9.1 Refactor Services to use translations
    - Replace hardcoded Polish text with t() calls
    - Update services array to use translations
    - _Requirements: 3.2_

- [x] 10. Update ForWho component with translations
  - [x] 10.1 Refactor ForWho to use translations
    - Replace hardcoded Polish text with t() calls
    - Update targetAudience array to use translations
    - _Requirements: 3.2_

- [x] 11. Update HowIWork component with translations
  - [x] 11.1 Refactor HowIWork to use translations
    - Replace hardcoded Polish text with t() calls
    - Update principles data to use translations
    - _Requirements: 3.2_

- [x] 12. Update Pricing component with translations
  - [x] 12.1 Refactor Pricing to use translations
    - Replace hardcoded Polish text with t() calls
    - Update pricingItems array to use translations
    - _Requirements: 3.2_

- [x] 13. Update Location component with translations
  - [x] 13.1 Refactor Location to use translations
    - Replace hardcoded Polish text with t() calls
    - _Requirements: 3.2_

- [x] 14. Update Contact component with translations
  - [x] 14.1 Refactor Contact to use translations
    - Replace hardcoded Polish text with t() calls
    - Update form labels, placeholders, and button text
    - Update toast messages
    - _Requirements: 3.2, 3.3, 3.4_

- [ ] 15. Update Footer component with translations
  - [ ] 15.1 Refactor Footer to use translations
    - Replace hardcoded Polish text with t() calls
    - Use interpolation for copyright year
    - _Requirements: 3.5, 5.3_

- [ ] 16. Checkpoint - Ensure all component translations work
  - Ensure all tests pass, ask the user if questions arise.

- [ ]* 17. Write property test for locale change updates content
  - **Property 6: Locale Change Updates Content**
  - **Validates: Requirements 1.2**

- [ ] 18. Final Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
