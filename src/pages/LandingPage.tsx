import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SEO from '../components/SEO';
import {
  HeroSection,
  ProdukSection,
  TentangSection,
  PortfolioSection,
  AlurSection,
  KontakSection,
  LayananSection,
} from '../components/sections';

const LandingPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        const timer = setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200);
        return () => clearTimeout(timer);
      }
    } else {
      // Scroll to top if no hash
      window.scrollTo(0, 0);
    }
  }, [location.hash, location.pathname]);

  return (
    <>
      <SEO />
      <HeroSection />
      <TentangSection />
      <LayananSection />
      <ProdukSection />
      <PortfolioSection />
      <AlurSection />
      <KontakSection />
    </>
  );
};

export default LandingPage;

