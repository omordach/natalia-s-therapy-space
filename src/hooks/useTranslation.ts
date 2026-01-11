import { useContext } from 'react';
import { LocalizationContext } from '@/contexts/LocalizationContext';

/**
 * Custom hook for accessing localization functionality.
 * Provides the translation function, current locale, and locale setter.
 * Requirements: 1.2
 *
 * @returns {Object} Object containing:
 *   - t: Translation function that accepts a key and optional params
 *   - locale: Current active locale ('pl' | 'uk')
 *   - setLocale: Function to change the active locale
 *
 * @throws {Error} If used outside of LocalizationProvider
 *
 * @example
 * const { t, locale, setLocale } = useTranslation();
 * const greeting = t('hero.title');
 * const copyright = t('footer.copyright', { year: 2024 });
 */
export function useTranslation() {
  const context = useContext(LocalizationContext);

  if (context === undefined) {
    throw new Error('useTranslation must be used within a LocalizationProvider');
  }

  return context;
}
