import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar, Footer } from './components/layout';
import LandingPage from './pages/LandingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductsPage from './pages/ProductsPage';
import View2DPage from './pages/View2DPage';
import PortfoliosPage from './pages/PortfoliosPage';
import PortfolioDetailPage from './pages/PortfolioDetailPage';
import { useLandingData } from './context/LandingDataContext';
import AOS from 'aos';
import 'aos/dist/aos.css';
import logoImg from './assets/images/Logo.png';

// ============================================================
// App — Handles Page Routing, Splash Loader, and AOS Init
// ============================================================
const App = () => {
  const { loading: apiLoading } = useLandingData();
  const [showSplash, setShowSplash] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [minTimePassed, setMinTimePassed] = useState(false);
  const location = useLocation();
  const isView2DRoute = location.pathname.startsWith('/view-2d');

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-in-out',
      offset: 100,
    });

    // Minimum display time for branding animation: 1.5s
    const timer = setTimeout(() => {
      setMinTimePassed(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Hide splash only when BOTH the minimum time has passed AND the API loading is complete
    if (minTimePassed && !apiLoading && !isFading) {
      const fadeStartTimer = setTimeout(() => {
        setIsFading(true);
      }, 0);
      const fadeTimer = setTimeout(() => {
        setShowSplash(false);
      }, 500); // Matches the opacity transition duration
      return () => {
        clearTimeout(fadeStartTimer);
        clearTimeout(fadeTimer);
      };
    }
  }, [minTimePassed, apiLoading, isFading]);

  return (
    <div className="overflow-x-hidden min-h-screen font-sans antialiased bg-white">
      {/* Splash Screen Loader */}
      {showSplash && (
        <div 
          className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FDFBF7] transition-opacity duration-500 ease-in-out ${
            isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          {/* Keyframe animations styles */}
          <style>{`
            @keyframes splash-pulse {
              0%, 100% { transform: scale(0.95); opacity: 0.8; }
              50% { transform: scale(1.03); opacity: 1; }
            }
            @keyframes line-load {
              0% { width: 0%; }
              100% { width: 100%; }
            }
            .animate-splash-logo {
              animation: splash-pulse 2s ease-in-out infinite;
            }
            .animate-load-line {
              animation: line-load 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            }
          `}</style>
          
          <div className="flex flex-col items-center max-w-[280px]">
            {/* Logo */}
            <img 
              src={logoImg} 
              alt="Three Queens Logo" 
              className="h-16 w-16 sm:h-20 sm:w-20 object-contain mb-8 animate-splash-logo" 
            />
            
            {/* Minimalist horizontal progress line */}
            <div className="w-48 h-[2px] bg-[#472404]/10 rounded-full overflow-hidden relative">
              <div className="absolute top-0 bottom-0 left-0 bg-[#472404] rounded-full animate-load-line" />
            </div>
            
            <span className="text-[11px] font-bold tracking-widest text-[#472404]/40 uppercase mt-4">
              Three Queens
            </span>
          </div>
        </div>
      )}

      {/* Main Layout */}
      {!isView2DRoute && <Navbar />}

      {/* Page Routing */}
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/produk" element={<ProductsPage />} />
          <Route path="/produk/:id" element={<ProductDetailPage />} />
          <Route path="/portofolio" element={<PortfoliosPage />} />
          <Route path="/portofolio/:id" element={<PortfolioDetailPage />} />
          <Route path="/view-2d/:id" element={<View2DPage />} />
        </Routes>
      </main>

      {!isView2DRoute && <Footer />}
    </div>
  );
};

export default App;