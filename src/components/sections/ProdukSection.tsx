import { useLandingData } from '../../context/LandingDataContext';
import { ProductCard } from '../ui/ProductCard';
import { SectionHeader, ProductCardSkeleton } from '../ui';
import { Link } from 'react-router-dom';

const ProdukSection = () => {
  const { data, loading } = useLandingData();
  const { products } = data;

  // Show first 6 products as featured
  const featuredProducts = products.slice(0, 6);

  return (
    <section id="produk" className="py-20 bg-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
        
        {/* Section Header */}
        <SectionHeader
          title="Produk Unggulan"
          subtitle="Temukan furniture dan interior custom terbaik untuk hunian dan bisnis Anda"
          titleClassName="text-[32px] sm:text-[40px] font-bold text-[#1a1a1a]"
        />

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <ProductCardSkeleton key={idx} />
            ))
          ) : (
            featuredProducts.map((product, idx) => (
              <div key={product.id} data-aos="fade-up" data-aos-delay={(idx % 3) * 100}>
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>

        {/* Link to Dedicated Products Page */}
        {!loading && products.length > 6 && (
          <div className="flex justify-center mt-12" data-aos="fade-up">
            <Link
              to="/produk"
              className="bg-[#472404] hover:bg-[#5C3A1E] text-white font-semibold px-8 py-3 rounded-md transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base cursor-pointer flex items-center gap-2 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Lihat Semua Produk</span>
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        )}

      </div>
    </section>
  );
};

export default ProdukSection;
