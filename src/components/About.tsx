import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="o-mnie" className="section-padding bg-secondary/30">
      <div className="container-wide">
        <div ref={ref} className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Photo Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-sage-light to-accent overflow-hidden shadow-elevated flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <p className="text-sm text-muted-foreground">Zdjęcie profilowe</p>
              </div>
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
                Jestem certyfikowanym psychoterapeutą psychodynamicznym. Ukończyłam 4-letnie 
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
      </div>
    </section>
  );
};

export default About;
