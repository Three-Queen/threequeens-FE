import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLandingData } from '../context/LandingDataContext';
import { ProductCard } from '../components/ui/ProductCard';
import { ProductCardSkeleton } from '../components/ui';

const ProductsPage = () => {
  const { data, loading } = useLandingData();
  const { categories, products } = data;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter products based on category and search query (case-insensitive checks)
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === 'Semua' ||
      product.category.toLowerCase() === activeCategory.toLowerCase();
    
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description || '').toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-24 pb-20">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
        
        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex items-center gap-2 text-xs sm:text-sm text-stone-500">
          <Link to="/" className="hover:text-[#472404] transition-colors">Beranda</Link>
          <span className="text-stone-300">/</span>
          <span className="text-[#472404] font-medium">Katalog Produk</span>
        </div>

        {/* Page Header */}
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mb-3">
            Katalog Produk Kami
          </h1>
          <p className="text-stone-500 text-sm sm:text-base max-w-2xl leading-relaxed">
            Jelajahi seluruh koleksi furniture custom dan desain interior premium buatan workshop Three Queens.
          </p>
        </div>

        {/* Search & Filter Section */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 mb-8 shadow-sm flex flex-col md:flex-row gap-5 items-center justify-between">
          
          {/* Categories Horizontal Selector */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.nama_kategori)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 border cursor-pointer ${
                  activeCategory.toLowerCase() === cat.nama_kategori.toLowerCase()
                    ? 'bg-[#472404] text-white border-[#472404] shadow-sm'
                    : 'bg-white text-stone-500 border-stone-200 hover:border-[#472404] hover:text-[#472404]'
                }`}
              >
                {cat.nama_kategori}
              </button>
            ))}
          </div>

          {/* Search Input field */}
          <div className="relative w-full md:max-w-sm">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-stone-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari produk..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#FDFBF7] border border-stone-200 rounded-lg text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#472404] focus:ring-1 focus:ring-[#472404] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-600 cursor-pointer"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, idx) => (
              <ProductCardSkeleton key={idx} />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="h-full">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-[#E5E7EB] rounded-xl shadow-sm">
            <svg className="w-12 h-12 text-stone-300 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
            <h3 className="text-stone-800 font-bold text-lg mb-1">Produk Tidak Ditemukan</h3>
            <p className="text-stone-400 text-sm max-w-sm mx-auto">
              Tidak ada produk yang cocok dengan pencarian "{searchQuery}" atau filter kategori "{activeCategory}". Coba kata kunci lainnya.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductsPage;
