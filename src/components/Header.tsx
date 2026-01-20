import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from '@/hooks/useTranslation';

const Header = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation items with translation keys - section IDs remain constant (Requirement 6.2)
  const navItems = [
    { href: '#o-mnie', labelKey: 'nav.about' },
    { href: '#oferta', labelKey: 'nav.services' },
    { href: '#dla-kogo', labelKey: 'nav.forWho' },
    { href: '#cennik', labelKey: 'nav.pricing' },
    { href: '#lokalizacja', labelKey: 'nav.location' },
    { href: '#kontakt', labelKey: 'nav.contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-soft py-4'
          : 'bg-transparent py-6'
        }`}
    >
      <div className="container-wide flex items-center justify-between">
        <a href="#" className="font-heading text-2xl md:text-3xl font-semibold text-foreground">
          Natalia Rainyk
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="nav-link text-sm">
              {t(item.labelKey)}
            </a>
          ))}
          <a href="#kontakt" className="btn-primary text-sm py-3 px-6">
            {t('nav.bookVisit')}
          </a>
          <LanguageSwitcher />
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/98 backdrop-blur-md border-t border-border"
          >
            <div className="container-wide py-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="nav-link text-lg py-2"
                  onClick={handleNavClick}
                >
                  {t(item.labelKey)}
                </a>
              ))}
              <a
                href="#kontakt"
                className="btn-primary text-center mt-4"
                onClick={handleNavClick}
              >
                {t('nav.bookVisit')}
              </a>
              <div className="flex justify-center mt-4">
                <LanguageSwitcher />
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
