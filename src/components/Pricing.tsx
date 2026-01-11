import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Clock } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const Pricing = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useTranslation();

  const pricingItems = [
    {
      key: 'individual',
      title: t('pricing.items.individual.title'),
      duration: t('pricing.items.individual.duration'),
      price: t('pricing.items.individual.price'),
    },
    {
      key: 'consultation',
      title: t('pricing.items.consultation.title'),
      duration: t('pricing.items.consultation.duration'),
      price: t('pricing.items.consultation.price'),
    },
    {
      key: 'online',
      title: t('pricing.items.online.title'),
      duration: t('pricing.items.online.duration'),
      price: t('pricing.items.online.price'),
    },
  ];

  return (
    <section id="cennik" className="section-padding bg-secondary/30">
      <div className="container-wide">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-section text-foreground mb-4">{t('pricing.title')}</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {pricingItems.map((item, index) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-card p-8 rounded-2xl shadow-card text-center"
            >
              <h3 className="heading-card text-foreground mb-4">{item.title}</h3>
              <div className="flex items-center justify-center gap-2 text-muted-foreground mb-6">
                <Clock className="w-4 h-4" />
                <span>{item.duration}</span>
              </div>
              <p className="text-3xl font-heading font-semibold text-primary">
                {item.price}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-muted-foreground text-sm mt-10 max-w-2xl mx-auto"
        >
          {t('pricing.disclaimer')}
        </motion.p>
      </div>
    </section>
  );
};

export default Pricing;
