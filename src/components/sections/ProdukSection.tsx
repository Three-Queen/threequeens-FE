import { useState } from 'react';
import { PRODUCTS } from '../../constants';
import { ProductCard } from '../ui/ProductCard';

const CATEGORIES = ['Semua', 'Kitchen Set', 'Lemari', 'Meja', 'Kursi'];

const ProdukSection = () => {
  const [activeCategory, setActiveCategory] = useState('Semua');

  return (
    <section id="produk" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-20">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-[32px] sm:text-[40px] font-bold text-[#4A2612] mb-3">
            Produk Kami
          </h2>
          <p className="text-stone-600 max-w-2xl mx-auto text-[15px]">
            Temukan furniture dan interior custom yang sempurna untuk ruangan Anda
          </p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-7 py-2 rounded-full text-[14px] font-medium transition-all duration-200 border ${
                activeCategory === cat
                  ? 'bg-[#D39C80] text-white border-[#D39C80]'
                  : 'bg-white text-stone-500 border-stone-300 hover:border-[#D39C80] hover:text-[#D39C80]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProdukSection;
