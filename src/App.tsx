import { Navbar, Footer } from './components/layout';
import {
  HeroSection,
  ProdukSection,
  TentangSection,
  PortfolioSection,
  AlurSection,
  KontakSection,
} from './components/sections';

// ============================================================
// App — Main entry point, merakit semua sections
// ============================================================

const App = () => {
  return (
    <div className="overflow-x-hidden min-h-screen font-sans antialiased">
      {/* Layout */}
      <Navbar />

      {/* Page Sections */}
      <main>
        <HeroSection />
        <ProdukSection />
        <TentangSection />
        <PortfolioSection />
        <AlurSection />
        <KontakSection />
      </main>

      <Footer />
    </div>
  );
};

export default App;