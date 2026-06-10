import { useState } from 'react';
import { useLandingData } from '../../context/LandingDataContext';
import { ProductCard } from '../ui/ProductCard';
import { SectionHeader, ProductCardSkeleton } from '../ui';

const ProdukSection = () => {
  const { data, loading } = useLandingData();
  const { categories, products } = data;
  const [activeCategory, setActiveCategory] = useState('Semua');

  // Filter products based on selected category (case-insensitive check)
  const filteredProducts = activeCategory === 'Semua'
    ? products
    : products.filter(
        (product) => product.category.toLowerCase() === activeCategory.toLowerCase()
      );

  return (
    <section id="produk" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-20">
        
        {/* Section Header */}
        <SectionHeader
          title="Produk Kami"
          subtitle="Temukan furniture dan interior custom yang sempurna untuk ruangan Anda"
          titleClassName="text-[32px] sm:text-[40px] font-bold text-[#4A2612]"
        />

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.nama_kategori)}
              className={`px-7 py-2 rounded-full text-[14px] font-medium transition-all duration-200 border ${
                activeCategory.toLowerCase() === cat.nama_kategori.toLowerCase()
                  ? 'bg-[#D39C80] text-white border-[#D39C80]'
                  : 'bg-white text-stone-500 border-stone-300 hover:border-[#D39C80] hover:text-[#D39C80]'
              }`}
            >
              {cat.nama_kategori}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <ProductCardSkeleton key={idx} />
            ))
          ) : (
            filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
              />
            ))
          )}
        </div>

      </div>
    </section>
  );
};

export default ProdukSection;
