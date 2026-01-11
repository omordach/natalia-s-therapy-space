import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { User, MessageCircle, Video, LucideIcon } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface ServiceItem {
  icon: LucideIcon;
  titleKey: string;
  descriptionKey: string;
}

const serviceItems: ServiceItem[] = [
  {
    icon: User,
    titleKey: 'services.individual.title',
    descriptionKey: 'services.individual.description',
  },
  {
    icon: MessageCircle,
    titleKey: 'services.consultation.title',
    descriptionKey: 'services.consultation.description',
  },
  {
    icon: Video,
    titleKey: 'services.online.title',
    descriptionKey: 'services.online.description',
  },
];

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useTranslation();

  return (
    <section id="oferta" className="section-padding">
      <div className="container-wide">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-section text-foreground mb-4">{t('services.title')}</h2>
          <p className="text-body max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {serviceItems.map((service, index) => (
            <motion.div
              key={service.titleKey}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="card-service text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-sage-light flex items-center justify-center">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="heading-card text-foreground mb-4">{t(service.titleKey)}</h3>
              <p className="text-muted-foreground">{t(service.descriptionKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
