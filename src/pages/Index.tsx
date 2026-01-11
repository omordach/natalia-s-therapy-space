import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import ForWho from '@/components/ForWho';
import HowIWork from '@/components/HowIWork';
import Pricing from '@/components/Pricing';
import Location from '@/components/Location';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <ForWho />
        <HowIWork />
        <Pricing />
        <Location />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
