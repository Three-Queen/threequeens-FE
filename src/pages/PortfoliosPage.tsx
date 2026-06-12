import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLandingData } from '../context/LandingDataContext';
import { ProjectCard } from '../components/ui/ProjectCard';
import { ProjectCardSkeleton } from '../components/ui';
import SEO from '../components/SEO';

const PortfoliosPage = () => {
  const { data, loading } = useLandingData();
  const { categories, portfolios } = data;
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeServiceType, setActiveServiceType] = useState<'Semua' | 'Residential' | 'Komersial' | 'Kustom'>('Semua');
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter categories shown in dropdown based on Service Type
  const displayedCategories = categories.filter((cat) => {
    if (activeServiceType === 'Semua') return true;
    return cat.tipe_layanan === activeServiceType || cat.nama_kategori === 'Semua';
  });

  // Filter portfolios based on Service Type, sub-category, and search query
  const filteredPortfolios = portfolios.filter((project) => {
    const catObj = categories.find(
      (c) => c.nama_kategori.toLowerCase() === (project.category || 'Living Room').toLowerCase()
    );
    const serviceType = catObj?.tipe_layanan || 'Residential';

    const matchesServiceType =
      activeServiceType === 'Semua' || serviceType === activeServiceType;

    const matchesCategory =
      activeCategory === 'Semua' ||
      (project.category || 'Living Room').toLowerCase() === activeCategory.toLowerCase();

    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.description || '').toLowerCase().includes(searchQuery.toLowerCase());

    return matchesServiceType && matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-24 pb-20">
      <SEO 
        title="Galeri Portofolio Desain Interior & Custom Furniture"
        description="Lihat kumpulan hasil proyek pengerjaan desain interior dan furniture custom premium kami di Kuningan, Cirebon, dan sekitarnya. Ide desain dapur, lemari, & ruang tamu."
        keywords="portofolio desain interior, portofolio kitchen set, hasil proyek interior kuningan, interior designer kuningan, three queens interior"
      />
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
        
        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex items-center gap-2 text-xs sm:text-sm text-stone-500">
          <Link to="/" className="hover:text-[#472404] transition-colors">Beranda</Link>
          <span className="text-stone-300">/</span>
          <span className="text-[#472404] font-medium">Portofolio</span>
        </div>

        {/* Page Header */}
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mb-3">
            Portofolio Proyek
          </h1>
          <p className="text-stone-500 text-sm sm:text-base max-w-2xl leading-relaxed">
            Melihat lebih dekat hasil pengerjaan kami. Setiap ruangan dirancang dan dibangun dengan mengutamakan presisi, estetika, dan fungsionalitas.
          </p>
        </div>

        {/* Service Type Tab Selector (Level 1) */}
        <div className="flex justify-center mb-8 w-full">
          <div className="bg-stone-100 p-1.5 rounded-2xl flex flex-nowrap gap-1 border border-stone-200/40 overflow-x-auto no-scrollbar whitespace-nowrap w-full sm:w-auto shadow-sm">
            {(['Semua', 'Residential', 'Komersial', 'Kustom'] as const).map((type) => (
              <button
                key={type}
                onClick={() => {
                  setActiveServiceType(type);
                  setActiveCategory('Semua');
                  setIsDropdownOpen(false);
                }}
                className={`flex-1 sm:flex-initial shrink-0 px-5 sm:px-6 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-350 cursor-pointer inline-block ${
                  activeServiceType === type
                    ? 'bg-[#472404] text-white shadow-md'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
                }`}
              >
                {type === 'Semua' ? 'Semua Layanan' : type}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Filter Section (Level 2) */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 sm:p-5 mb-8 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
          
          {/* Custom Dropdown Selector */}
          <div className="relative w-full sm:w-auto">
            {isDropdownOpen && (
              <div 
                className="fixed inset-0 z-20 cursor-default bg-transparent" 
                onClick={() => setIsDropdownOpen(false)}
              />
            )}

            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full sm:w-64 px-4 py-2.5 bg-stone-50 hover:bg-stone-100 text-stone-700 hover:text-stone-900 border border-stone-200 rounded-lg text-sm font-medium flex items-center justify-between transition-colors shadow-sm cursor-pointer z-30 relative focus:border-[#472404]"
            >
              <div className="flex items-center gap-2">
                <svg className="w-4.5 h-4.5 text-stone-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span className="truncate">
                  {activeCategory === 'Semua'
                    ? activeServiceType === 'Semua' 
                      ? 'Semua Kategori' 
                      : `Semua Kategori ${activeServiceType}`
                    : activeCategory}
                </span>
              </div>
              <svg 
                className={`w-4 h-4 text-stone-400 transition-transform duration-200 shrink-0 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-full sm:w-64 bg-white border border-stone-200 rounded-xl shadow-xl z-30 py-1.5 overflow-hidden">
                {displayedCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.nama_kategori);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer flex items-center justify-between ${
                      activeCategory.toLowerCase() === cat.nama_kategori.toLowerCase()
                        ? 'bg-[#472404]/5 text-[#472404] font-bold'
                        : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                    }`}
                  >
                    <span className="truncate">
                      {cat.nama_kategori === 'Semua' && activeServiceType !== 'Semua'
                        ? `Semua ${activeServiceType}`
                        : cat.nama_kategori}
                    </span>
                    {activeCategory.toLowerCase() === cat.nama_kategori.toLowerCase() && (
                      <svg className="w-4 h-4 text-[#472404] shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Input field */}
          <div className="relative w-full sm:max-w-sm">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-stone-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama proyek atau lokasi..."
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

        {/* Portfolio Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, idx) => (
              <ProjectCardSkeleton key={idx} />
            ))}
          </div>
        ) : filteredPortfolios.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPortfolios.map((project, idx) => (
              <div key={project.id} className="h-full">
                <ProjectCard 
                  project={project} 
                  idx={idx} 
                  onClick={() => navigate(`/portofolio/${project.id}`)} 
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-[#E5E7EB] rounded-xl shadow-sm">
            <svg className="w-12 h-12 text-stone-300 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
            <h3 className="text-stone-800 font-bold text-lg mb-1">Proyek Tidak Ditemukan</h3>
            <p className="text-stone-400 text-sm max-w-sm mx-auto">
              Tidak ada proyek yang cocok dengan kata kunci "{searchQuery}" atau filter kategori "{activeCategory}".
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfoliosPage;
