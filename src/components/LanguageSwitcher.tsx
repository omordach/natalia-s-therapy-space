import { useTranslation } from '@/hooks/useTranslation';
import { SUPPORTED_LOCALES, Locale } from '@/locales';

/**
 * LanguageSwitcher component that displays language options with flag emojis.
 * Allows users to switch between supported languages.
 * Requirements: 1.1, 4.1, 4.3
 */
export default function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation();

  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale !== locale) {
      setLocale(newLocale);
    }
  };

  return (
    <div className="flex items-center gap-1" role="group" aria-label="Language selection">
      {SUPPORTED_LOCALES.map((localeConfig, index) => (
        <span key={localeConfig.code} className="flex items-center">
          <button
            onClick={() => handleLocaleChange(localeConfig.code)}
            className={`px-2 py-1 text-lg transition-opacity hover:opacity-100 ${
              locale === localeConfig.code
                ? 'opacity-100'
                : 'opacity-50'
            }`}
            aria-label={`Switch to ${localeConfig.name}`}
            aria-pressed={locale === localeConfig.code}
            title={localeConfig.name}
          >
            {localeConfig.flag}
          </button>
          {index < SUPPORTED_LOCALES.length - 1 && (
            <span className="text-sage-300 mx-0.5">/</span>
          )}
        </span>
      ))}
    </div>
  );
}
