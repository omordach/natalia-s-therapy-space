import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import profilePhoto from '@/assets/NataliaMordach.jpg';
import masterCert from '@/assets/Master.png';
import annaFreudCert from '@/assets/AnnaFreud.png';
import zswppDyplom from '@/assets/ZSWPP-Dyplom.png';
import zswppZ from '@/assets/ZSWPP-Z.png';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useTranslation } from '@/hooks/useTranslation';

// Certification keys for translation lookup
const certificationKeys = ['cert1', 'cert2', 'cert3', 'cert4'] as const;

// Certificate images mapping
const certificateImages: Record<typeof certificationKeys[number], string> = {
  cert1: masterCert,
  cert2: annaFreudCert,
  cert3: zswppDyplom,
  cert4: zswppZ,
};

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useTranslation();

  return (
    <section id="o-mnie" className="section-padding bg-secondary/30">
      <div className="container-wide">
        <div ref={ref} className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Profile Photo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-elevated">
              <img
                src={profilePhoto}
                alt={t('about.title')}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="heading-section text-foreground mb-8">{t('about.title')}</h2>
            <div className="space-y-6 text-body">
              <p>
                {t('about.paragraph1')}
              </p>
              <p>
                {t('about.paragraph2')}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Certifications Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
            {t('about.certificationsTitle')}
          </h3>

          <div className="max-w-5xl mx-auto">
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {certificationKeys.map((certKey) => (
                  <CarouselItem key={certKey} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <div className="bg-card rounded-lg overflow-hidden shadow-elevated hover:shadow-elevated-hover transition-shadow duration-300">
                        {/* Certificate image */}
                        <div className="aspect-[4/3] bg-secondary/10 overflow-hidden">
                          <img
                            src={certificateImages[certKey]}
                            alt={t(`about.certifications.${certKey}.title`)}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        {/* Certificate info */}
                        <div className="p-6">
                          <h3 className="text-lg font-semibold text-foreground mb-2">
                            {t(`about.certifications.${certKey}.title`)}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {t(`about.certifications.${certKey}.description`)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
