// Locale type definitions and configuration
// Requirements: 5.1, 5.2

export type Locale = 'pl' | 'uk';

export interface LocaleConfig {
  code: Locale;
  name: string;
  flag: string;
}

export const SUPPORTED_LOCALES: LocaleConfig[] = [
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'uk', name: 'Українська', flag: '🇺🇦' },
];

export const DEFAULT_LOCALE: Locale = 'pl';

export const STORAGE_KEY = 'preferred-locale';

export interface LocalizationContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

// Translation file imports
import plTranslations from './pl.json';
import ukTranslations from './uk.json';

export type TranslationKeys = typeof plTranslations;

export const translations: Record<Locale, TranslationKeys> = {
  pl: plTranslations,
  uk: ukTranslations,
};
