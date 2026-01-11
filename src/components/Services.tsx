import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { User, MessageCircle, Video } from 'lucide-react';

const services = [
  {
    icon: User,
    title: 'Psychoterapia indywidualna',
    description:
      'Długoterminowa praca nad głębokimi wzorcami emocjonalnymi i relacyjnymi.',
  },
  {
    icon: MessageCircle,
    title: 'Konsultacje psychologiczne',
    description:
      'Krótkoterminowe wsparcie w konkretnych trudnościach życiowych.',
  },
  {
    icon: Video,
    title: 'Sesje online',
    description:
      'Możliwość spotkań przez platformy wideo dla osób spoza Warszawy.',
  },
];

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="oferta" className="section-padding">
      <div className="container-wide">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-section text-foreground mb-4">Oferta</h2>
          <p className="text-body max-w-2xl mx-auto">
            Oferuję profesjonalne wsparcie psychoterapeutyczne dostosowane do Twoich potrzeb
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="card-service text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-sage-light flex items-center justify-center">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="heading-card text-foreground mb-4">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
