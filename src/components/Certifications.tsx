import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
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

const Certifications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="certyfikaty" className="section-padding bg-background">
      <div className="container-wide">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading-section text-foreground mb-12 text-center">
            Certyfikaty i kwalifikacje
          </h2>

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

          {/* Optional: Add dots indicator for mobile */}
          <div className="flex justify-center gap-2 mt-8 md:hidden">
            {certifications.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-primary/30"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
