import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import profilePhoto from '@/assets/NataliaRainyk.jpg';

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
      </div>
    </section>
  );
};

export default About;
