import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Phone, Send, MessageCircle, Facebook } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/useTranslation';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const Contact = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { toast } = useToast();
  const { t } = useTranslation();

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    try {
      const formDataObj = new FormData(form);
      const formEntries: Record<string, string> = {};
      formDataObj.forEach((value, key) => {
        formEntries[key] = value.toString();
      });

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formEntries).toString(),
      });

      if (response.ok) {
        toast({
          title: t('contact.toast.successTitle'),
          description: t('contact.toast.successDescription'),
        });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      toast({
        title: t('contact.toast.errorTitle'),
        description: t('contact.toast.errorDescription'),
        variant: 'destructive',
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="kontakt" className="section-padding bg-secondary/30">
      <div className="container-wide">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-section text-foreground mb-4">{t('contact.title')}</h2>
          <p className="text-body">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="heading-card text-foreground mb-6">{t('contact.infoTitle')}</h3>
              <div className="space-y-4">
                {/* <a
                  href="mailto:taska.mail@gmail.com"
                  className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-sage-light flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <span>taska.mail@gmail.com</span>
                </a> */}
                <a
                  href="tel:+48785422814"
                  className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-sage-light flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <span>+48 785 422 814</span>
                </a>
                <a
                  href="tg://resolve?domain=NataliaRainyk"
                  title="Telegram"
                  className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-sage-light flex items-center justify-center">
                    <Send className="w-5 h-5 text-primary" />
                  </div>
                  <span>Telegram</span>
                </a>
                <a
                  href="https://wa.me/48785422814"
                  title="WhatsApp"
                  className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-sage-light flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-primary" />
                  </div>
                  <span>WhatsApp</span>
                </a>
                <a
                  href="https://m.me/RainykPsyHelp"
                  title="Facebook"
                  className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-sage-light flex items-center justify-center">
                    <Facebook className="w-5 h-5 text-primary" />
                  </div>
                  <span>Facebook</span>
                </a>
              </div>
            </div>

            <div className="bg-card p-6 rounded-xl shadow-soft">
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t('contact.infoNote')}
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            name="contact"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-card p-8 rounded-2xl shadow-card space-y-6"
          >
            {/* Netlify form fields */}
            <input type="hidden" name="form-name" value="contact" />
            <input type="hidden" name="bot-field" />
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                {t('contact.form.name')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                placeholder={t('contact.form.namePlaceholder')}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                {t('contact.form.email')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                placeholder={t('contact.form.emailPlaceholder')}
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                {t('contact.form.phone')}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                placeholder={t('contact.form.phonePlaceholder')}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                {t('contact.form.message')}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
                placeholder={t('contact.form.messagePlaceholder')}
              />
            </div>

            <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
              <Send className="w-4 h-4" />
              {t('contact.form.submit')}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
