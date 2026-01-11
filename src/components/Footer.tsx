import { useTranslation } from '@/hooks/useTranslation';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="py-12 border-t border-border">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-heading text-xl font-semibold text-foreground mb-2">
              {t('footer.name')}
            </p>
            <p className="text-sm text-muted-foreground">
              {t('footer.subtitle')}
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              {t('footer.privacyPolicy')}
            </a>
          </div>
        </div>

        <div className="divider-sage my-8" />

        <p className="text-center text-sm text-muted-foreground">
          {t('footer.copyright', { year: new Date().getFullYear().toString() })}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
