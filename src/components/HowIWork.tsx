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
            <p className="text-body-large leading-relaxed mb-6">
              Moje podejście opiera się na psychoterapii psychodynamicznej. Zakłada ona, że zrozumienie przeszłych doświadczeń pozwala rozwiązać obecne trudności oraz przerwać bolesne, powtarzające się schematy.
            </p>
            <p className="text-body-large leading-relaxed mb-8">
              W procesie terapeutycznym wykorzystuję również metodę mentalizacji (MBT). Pomaga ona lepiej rozumieć stany emocjonalne — zarówno własne, jak i innych osób. Rozwijanie tej zdolności pozwala na odzyskanie stabilności wewnętrznej oraz budowanie zdrowszych, bardziej satysfakcjonujących relacji.
            </p>

            <div className="divider-sage my-8" />

            <h3 className="text-xl font-semibold text-foreground mb-6">Kluczowe zasady współpracy:</h3>

            <div className="text-left space-y-6">
              <div>
                <p className="font-semibold text-foreground mb-2">Bezpieczeństwo i zaufanie</p>
                <p className="text-body">Zapewniam przestrzeń wolną od oceniania, opartą na empatii i pełnej poufności.</p>
              </div>

              <div>
                <p className="font-semibold text-foreground mb-2">Praca u źródła</p>
                <p className="text-body">Celem nie jest jedynie doraźne złagodzenie objawów, lecz dotarcie do ich przyczyn, co prowadzi do trwałej zmiany.</p>
              </div>

              <div>
                <p className="font-semibold text-foreground mb-2">Refleksja i świadomość</p>
                <p className="text-body">Wspólna praca nad zrozumieniem procesów wewnętrznych pozwala na odzyskanie poczucia wpływu na własne życie.</p>
              </div>

              <div>
                <p className="font-semibold text-foreground mb-2">Profesjonalizm</p>
                <p className="text-body">Praktyka prowadzona jest zgodnie ze standardami etycznymi, z dbałością o komfort i dobro pacjenta.</p>
              </div>
            </div>

            <div className="divider-sage my-8" />

            <p className="text-body-large leading-relaxed">
              Celem terapii jest głębokie zrozumienie siebie, które staje się fundamentem do trwałej poprawy jakości życia.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowIWork;
