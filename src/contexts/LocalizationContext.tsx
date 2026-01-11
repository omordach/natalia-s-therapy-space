import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import {
  Locale,
  LocalizationContextType,
  DEFAULT_LOCALE,
  STORAGE_KEY,
  translations,
  SUPPORTED_LOCALES,
} from '@/locales';

// Create context with undefined default (will be provided by provider)
export const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

/**
 * Detects the browser's preferred language and maps it to a supported locale.
 * Returns the default locale if no match is found.
 * Requirements: 2.1, 2.2, 2.3
 */
function detectBrowserLocale(): Locale {
  if (typeof navigator === 'undefined') {
    return DEFAULT_LOCALE;
  }

  const browserLang = navigator.language || (navigator as { userLanguage?: string }).userLanguage || '';
  const langCode = browserLang.split('-')[0].toLowerCase();

  // Check if the browser language matches any supported locale
  const matchedLocale = SUPPORTED_LOCALES.find((loc) => loc.code === langCode);
  
  return matchedLocale ? matchedLocale.code : DEFAULT_LOCALE;
}

/**
 * Gets the initial locale from localStorage or browser detection.
 * Requirements: 1.3, 1.4, 2.1, 2.2, 2.3
 */
function getInitialLocale(): Locale {
  // First, try to get from localStorage
  if (typeof localStorage !== 'undefined') {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && SUPPORTED_LOCALES.some((loc) => loc.code === stored)) {
        return stored as Locale;
      }
    } catch {
      // localStorage not available (e.g., private browsing)
    }
  }

  // Fall back to browser detection
  return detectBrowserLocale();
}

/**
 * Gets a nested value from an object using a dot-notation key.
 */
function getNestedValue(obj: Record<string, unknown>, key: string): string | undefined {
  const keys = key.split('.');
  let current: unknown = obj;

  for (const k of keys) {
    if (current && typeof current === 'object' && k in current) {
      current = (current as Record<string, unknown>)[k];
    } else {
      return undefined;
    }
  }

  return typeof current === 'string' ? current : undefined;
}

/**
 * Interpolates parameters into a translation string.
 * Replaces {{key}} patterns with corresponding values from params.
 * Requirements: 5.3
 */
function interpolate(text: string, params?: Record<string, string | number>): string {
  if (!params) return text;

  return text.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    const value = params[key];
    return value !== undefined ? String(value) : `{{${key}}}`;
  });
}

interface LocalizationProviderProps {
  children: React.ReactNode;
}

/**
 * LocalizationProvider component that manages locale state and provides
 * translation functionality to the application.
 * Requirements: 1.2, 1.3, 1.4, 2.1, 2.2, 2.3, 5.3
 */
export function LocalizationProvider({ children }: LocalizationProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  // Persist locale to localStorage when it changes
  // Requirements: 1.3
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      // localStorage not available
    }
  }, [locale]);

  // setLocale function that validates and updates the locale
  // Requirements: 1.2
  const setLocale = useCallback((newLocale: Locale) => {
    if (SUPPORTED_LOCALES.some((loc) => loc.code === newLocale)) {
      setLocaleState(newLocale);
    } else {
      console.warn(`Invalid locale: ${newLocale}. Falling back to ${DEFAULT_LOCALE}.`);
      setLocaleState(DEFAULT_LOCALE);
    }
  }, []);

  // Translation function with interpolation support
  // Requirements: 5.3
  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      const translation = getNestedValue(
        translations[locale] as unknown as Record<string, unknown>,
        key
      );

      if (translation === undefined) {
        if (import.meta.env.DEV) {
          console.warn(`Missing translation key: ${key} for locale: ${locale}`);
        }
        return key; // Return key as fallback
      }

      return interpolate(translation, params);
    },
    [locale]
  );

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo<LocalizationContextType>(
    () => ({
      locale,
      setLocale,
      t,
    }),
    [locale, setLocale, t]
  );

  return (
    <LocalizationContext.Provider value={contextValue}>
      {children}
    </LocalizationContext.Provider>
  );
}
