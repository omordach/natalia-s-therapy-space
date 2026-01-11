import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import profilePhoto from '@/assets/NataliaRainyk.jpg';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

// Placeholder certification data
const certifications = [
  {
    id: 1,
    title: 'Certyfikat 1',
    description: 'Opis certyfikatu 1',
  },
  {
    id: 2,
    title: 'Certyfikat 2',
    description: 'Opis certyfikatu 2',
  },
  {
    id: 3,
    title: 'Certyfikat 3',
    description: 'Opis certyfikatu 3',
  },
  {
    id: 4,
    title: 'Certyfikat 4',
    description: 'Opis certyfikatu 4',
  },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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
                alt="Natalia Rainyk - Psychoterapeutka"
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
            <h2 className="heading-section text-foreground mb-8">O mnie</h2>
            <div className="space-y-6 text-body">
              <p>
                Jestem certyfikowaną psychoterapeutką psychodynamiczną. Ukończyłam 4-letnie
                szkolenie w podejściu psychodynamicznym. Pracuję z osobami dorosłymi, pomagając
                im zrozumieć źródła ich trudności emocjonalnych i wprowadzić trwałe zmiany w życiu.
              </p>
              <p>
                W swojej pracy kieruję się przekonaniem, że każdy człowiek ma w sobie zasoby
                do zmiany. Moją rolą jest towarzyszyć w procesie odkrywania i rozumienia siebie.
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
            Certyfikaty i kwalifikacje
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
                {certifications.map((cert) => (
                  <CarouselItem key={cert.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <div className="bg-card rounded-lg overflow-hidden shadow-elevated hover:shadow-elevated-hover transition-shadow duration-300">
                        {/* Placeholder image - aspect ratio 4:3 for certificates */}
                        <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-secondary/20 flex items-center justify-center">
                          <div className="text-center p-8">
                            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 text-primary"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                />
                              </svg>
                            </div>
                            <p className="text-muted-foreground font-medium">
                              Placeholder
                            </p>
                          </div>
                        </div>
                        {/* Certificate info */}
                        <div className="p-6">
                          <h3 className="text-lg font-semibold text-foreground mb-2">
                            {cert.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {cert.description}
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
