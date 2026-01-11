import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const Location = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useTranslation();

  return (
    <section id="lokalizacja" className="section-padding">
      <div className="container-wide">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="heading-section text-foreground mb-4">{t('location.title')}</h2>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <MapPin className="w-5 h-5 text-primary" />
            <p>{t('location.address')}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-2xl overflow-hidden shadow-elevated"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39102.82694675702!2d20.93690134863282!3d52.226549800000015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecd423f3000cf%3A0xff1cb2d3bbc26edd!2sPsychoterapeuta%20psychodynamiczny%20Natalia%20Mordach!5e0!3m2!1suk!2spl!4v1768143093964!5m2!1suk!2spl"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={t('location.mapTitle')}
            className="w-full"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Location;
