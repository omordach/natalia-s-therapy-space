import { useTranslation } from '@/hooks/useTranslation';
import { SUPPORTED_LOCALES } from '@/locales';

/**
 * Flag buttons for switching between supported languages. Each button is labelled
 * with the language's own name, so it reads correctly in every locale.
 */
export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useTranslation();

  return (
    <div className="flex items-center gap-1" role="group" aria-label={t('a11y.languageSelection')}>
      {SUPPORTED_LOCALES.map((localeConfig, index) => (
        <span key={localeConfig.code} className="flex items-center">
          <button
            type="button"
            onClick={() => setLocale(localeConfig.code)}
            className={`px-2 py-1 text-lg transition-opacity hover:opacity-100 ${
              locale === localeConfig.code ? 'opacity-100' : 'opacity-50'
            }`}
            aria-label={localeConfig.name}
            aria-pressed={locale === localeConfig.code}
            lang={localeConfig.code}
            title={localeConfig.name}
          >
            {localeConfig.flag}
          </button>
          {index < SUPPORTED_LOCALES.length - 1 && (
            <span className="text-sage-300 mx-0.5" aria-hidden="true">/</span>
          )}
        </span>
      ))}
    </div>
  );
}
