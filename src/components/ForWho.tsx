import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check } from 'lucide-react';

const targetAudience = [
  'Osoby doświadczające lęku i depresji',
  'Osoby w kryzysie życiowym',
  'Osoby z trudnościami w relacjach',
  'Osoby szukające głębszego zrozumienia siebie',
  'Osoby doświadczające trudności emocjonalnych',
];

const ForWho = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="dla-kogo" className="section-padding bg-secondary/30">
      <div className="container-narrow">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="heading-section text-foreground mb-4">Dla kogo</h2>
          <p className="text-body">
            Psychoterapia może pomóc w wielu trudnościach życiowych
          </p>
        </motion.div>

        <div className="space-y-4">
          {targetAudience.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center gap-4 bg-card p-5 rounded-xl shadow-soft"
            >
              <div className="w-10 h-10 rounded-full bg-sage-light flex items-center justify-center flex-shrink-0">
                <Check className="w-5 h-5 text-primary" />
              </div>
              <span className="text-foreground font-medium">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ForWho;
