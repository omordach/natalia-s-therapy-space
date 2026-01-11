import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const HowIWork = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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
          <h2 className="heading-section text-foreground mb-8">Jak pracuję</h2>
          
          <div className="bg-card p-8 md:p-12 rounded-2xl shadow-card">
            <p className="text-body-large leading-relaxed">
              Psychoterapia psychodynamiczna opiera się na założeniu, że nasze obecne 
              trudności mają korzenie w przeszłych doświadczeniach. Podczas sesji wspólnie 
              eksplorujemy nieświadome wzorce, które wpływają na Twoje życie, relacje 
              i samopoczucie.
            </p>
            <div className="divider-sage my-8" />
            <p className="text-body">
              Celem jest nie tylko złagodzenie objawów, ale trwała zmiana i lepsze 
              rozumienie siebie.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowIWork;
