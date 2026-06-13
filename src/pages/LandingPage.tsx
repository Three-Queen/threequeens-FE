import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SEO from '../components/SEO';
import { ArrowUpIcon } from '../components/ui/Icons';
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
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

      {/* Persistent Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-24 right-8 w-[60px] h-[60px] flex items-center justify-center text-[#472404] hover:text-[#5c3106] transition-all duration-300 z-50 cursor-pointer ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Kembali ke atas"
      >
        <ArrowUpIcon className="w-8 h-8 md:w-10 md:h-10" />
      </button>
    </>
  );
};

export default LandingPage;

