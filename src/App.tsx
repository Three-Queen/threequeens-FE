import { Routes, Route } from 'react-router-dom';
import { Navbar, Footer } from './components/layout';
import LandingPage from './pages/LandingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import { LandingDataProvider } from './context/LandingDataContext';

// ============================================================
// App — Main entry point, merakit semua sections
// ============================================================

const App = () => {
  return (
    <LandingDataProvider>
      <div className="overflow-x-hidden min-h-screen font-sans antialiased">
        {/* Layout */}
        <Navbar />

        {/* Page Routing */}
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/produk/:id" element={<ProductDetailPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </LandingDataProvider>
  );
};

export default App;