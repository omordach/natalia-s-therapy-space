import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

const HowIWork = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useTranslation();

  const principles = [
    { key: 'safety' },
    { key: 'source' },
    { key: 'reflection' },
    { key: 'professionalism' },
  ];

  return (
    <section className="section-padding">
      <div className="container-narrow">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="heading-section text-foreground mb-8">{t('howIWork.title')}</h2>
          
          <div className="bg-card p-8 md:p-12 rounded-2xl shadow-card">
            <p className="text-body-large leading-relaxed mb-6">
              {t('howIWork.paragraph1')}
            </p>
            <p className="text-body-large leading-relaxed mb-8">
              {t('howIWork.paragraph2')}
            </p>

            <div className="divider-sage my-8" />

            <h3 className="text-xl font-semibold text-foreground mb-6">{t('howIWork.principlesTitle')}</h3>

            <div className="text-left space-y-6">
              {principles.map((principle) => (
                <div key={principle.key}>
                  <p className="font-semibold text-foreground mb-2">
                    {t(`howIWork.principles.${principle.key}.title`)}
                  </p>
                  <p className="text-body">
                    {t(`howIWork.principles.${principle.key}.description`)}
                  </p>
                </div>
              ))}
            </div>

            <div className="divider-sage my-8" />

            <p className="text-body-large leading-relaxed">
              {t('howIWork.conclusion')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowIWork;
