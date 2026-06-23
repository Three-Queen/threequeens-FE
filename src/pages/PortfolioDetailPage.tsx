import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLandingData } from '../context/LandingDataContext';
import { ArrowLeftIcon, WhatsAppIcon, PhoneIcon } from '../components/ui/Icons';
import { ProductCard } from '../components/ui/ProductCard';
import SEO from '../components/SEO';
import { getProxyUrl } from '../utils/url';

const PortfolioDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useLandingData();
  const { kontak } = data;
  const [isDescExpanded, setIsDescExpanded] = useState(false);

  const project = data.portfolios.find((p) => p.slug === id || String(p.id) === id);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleWATanya = (type: 'konsultasi' | 'order' = 'konsultasi') => {
    if (!project) return;
    let formattedWA = kontak.whatsapp.replace(/[^0-9]/g, '');
    if (formattedWA.startsWith('0')) {
      formattedWA = '62' + formattedWA.slice(1);
    }
    if (!formattedWA) {
      formattedWA = '6281234567890';
    }
    
    const message = type === 'konsultasi'
      ? `Halo Three Queens, saya tertarik dan ingin berkonsultasi mengenai desain portofolio Anda: ${project.title}`
      : `Halo Three Queens, saya ingin berdiskusi mengenai proyek portofolio Anda: ${project.title} yang berlokasi di ${project.location}`;

    const url = `https://wa.me/${formattedWA}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <div className="py-32 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-6">
          <div className="h-6 w-24 bg-stone-200 animate-pulse rounded mb-8" />
          <div className="aspect-[16/9] bg-stone-200 animate-pulse rounded-xl mb-10" />
          <div className="space-y-4">
            <div className="h-4 w-1/4 bg-stone-200 animate-pulse rounded" />
            <div className="h-8 w-3/4 bg-stone-200 animate-pulse rounded" />
            <div className="h-6 w-1/3 bg-stone-200 animate-pulse rounded" />
            <div className="h-20 w-full bg-stone-200 animate-pulse rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="py-32 bg-white min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-3xl font-extrabold text-stone-900 mb-2">Proyek Tidak Ditemukan</h2>
        <p className="text-stone-500 mb-8 max-w-md">
          Maaf, portofolio proyek yang Anda cari tidak tersedia atau telah dihapus dari sistem kami.
        </p>
        <Link
          to="/portofolio"
          className="inline-flex items-center gap-2 bg-[#472404] hover:bg-[#5C3A1E] text-white font-semibold px-6 py-3 rounded-full transition-colors shadow-md"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span>Kembali ke Galeri Portofolio</span>
        </Link>
      </div>
    );
  }

  const descText = project.description || 'Deskripsi detail proyek pengerjaan interior custom ini belum tersedia.';
  const shouldTruncate = descText.length > 250;
  const displayedDesc = shouldTruncate && !isDescExpanded 
    ? descText.slice(0, 250) + '...' 
    : descText;

  return (
    <div className="pt-[60px] pb-12 bg-[#FAF9F7] min-h-screen">
      <SEO 
        title={`${project.title} - Portofolio Interior`}
        description={project.description ? (project.description.length > 155 ? project.description.slice(0, 155) + '...' : project.description) : `Lihat hasil pengerjaan desain interior ${project.title} di ${project.location} oleh Three Queen's Interior.`}
        keywords={`${project.title.toLowerCase()}, interior ${project.location.toLowerCase()}, custom ${project.category?.toLowerCase() || 'furniture'}, three queens interior`}
        image={project.image}
      />
      {/* Banner / Hero Image (Full Width directly below navbar) */}
      <div className="w-full h-[250px] sm:h-[300px] md:h-[380px] lg:h-[440px] bg-stone-100 overflow-hidden relative">
        {/* Floating Back Button */}
        <Link
          to="/portofolio"
          className="absolute top-4 left-4 sm:top-6 sm:left-10 lg:left-20 z-30 flex items-center justify-center w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#472404] hover:text-[#5C3A1E] shadow-md border border-stone-200/40 backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 group"
          aria-label="Kembali ke Galeri Portofolio"
        >
          <ArrowLeftIcon className="w-5 h-5 transform group-hover:-translate-x-0.5 transition-transform" />
        </Link>

        {project.image ? (
          <img 
            src={getProxyUrl(project.image)} 
            alt={project.title} 
            className="w-full h-full object-cover" 
          />
        ) : (
          <div className="text-stone-400 text-sm h-full flex items-center justify-center">Gambar tidak tersedia.</div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 pt-3 sm:pt-4 pb-0 flex flex-col gap-6">
        
        {/* Title Block */}
        <div className="bg-white rounded-2xl border border-stone-200/40 shadow-sm p-6 sm:p-8 flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex-grow">
            {/* Category Tag */}
            <p className="text-stone-400 text-[13px] md:text-sm font-semibold uppercase tracking-wider mb-2">
              {project.category || 'LIVING ROOM'}
            </p>
            {/* Main Title */}
            <h1 className="font-extrabold text-[#111827] text-2xl sm:text-3xl md:text-4xl leading-tight">
              {project.title}
            </h1>
          </div>
        </div>

        {/* Project Info Block */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 p-6 sm:p-8 bg-white rounded-2xl border border-stone-200/40 shadow-sm divide-y divide-stone-200/40 sm:divide-y-0">
          <div className="pb-3.5 sm:pb-0">
            <span className="text-stone-400 text-[10px] sm:text-xs uppercase tracking-wide block mb-1">Lokasi</span>
            <span className="font-bold text-stone-900 text-sm md:text-base flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-1.5">
              <span className="line-clamp-1">{project.location}</span>
            </span>
          </div>
          <div className="py-3.5 sm:py-0">
            <span className="text-stone-400 text-[10px] sm:text-xs uppercase tracking-wide block mb-1">Waktu Proyek</span>
            <span className="font-bold text-stone-900 text-sm md:text-base line-clamp-1">
              {project.waktuPengerjaan ? new Date(project.waktuPengerjaan).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : '-'}
            </span>
          </div>
          <div className="pt-3.5 sm:pt-0">
            <span className="text-stone-400 text-[10px] sm:text-xs uppercase tracking-wide block mb-1">Durasi</span>
            <span className="font-bold text-stone-900 text-sm md:text-base line-clamp-1">
              {project.durasiPengerjaan || '-'}
            </span>
          </div>
        </div>

        {/* Deskripsi Proyek Section */}
        <div className="bg-white rounded-2xl border border-stone-200/40 shadow-sm p-6 sm:p-8">
          <h2 className="font-extrabold text-[#111827] text-lg md:text-xl mb-4">Detail Proyek</h2>
          <div className="text-stone-600 text-sm md:text-base leading-relaxed text-justify">
            <p className="whitespace-pre-line inline">
              {displayedDesc}
            </p>
            {shouldTruncate && (
              <button
                onClick={() => setIsDescExpanded(!isDescExpanded)}
                className="text-[#472404] hover:text-[#5C3A1E] font-bold text-sm ml-1.5 cursor-pointer inline transition-colors"
              >
                {isDescExpanded ? ' tampilkan lebih sedikit' : ' tampilkan lebih banyak'}
              </button>
            )}
          </div>
        </div>

        {/* Galeri Tambahan */}
        {project.galeri && project.galeri.length > 0 && (
          <div className="bg-white rounded-2xl border border-stone-200/40 shadow-sm p-6 sm:p-8">
            <h2 className="font-extrabold text-[#111827] text-lg md:text-xl mb-6">Galeri Tambahan</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {project.galeri.map((g, idx) => (
                <div key={idx} className="aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 relative group shadow-sm border border-stone-200/50">
                  <img src={getProxyUrl(g)} alt={`Galeri ${idx + 1} - ${project.title}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Produk Terkait */}
        {project.produk && project.produk.length > 0 && (
          <div className="mt-4">
            <h2 className="font-extrabold text-[#111827] text-lg md:text-xl mb-6 pl-2">Produk yang Terkait</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {project.produk.map((prod: any, idx: number) => {
                const mappedProduct = {
                  id: idx,
                  kode_produk: prod.kode_produk,
                  title: prod.nama_produk,
                  category: project.category || 'Interior',
                  image: prod.gambar_url,
                  description: prod.deskripsi_produk,
                };
                return <ProductCard key={idx} product={mappedProduct} />;
              })}
            </div>
          </div>
        )}

        {/* CTA Footer Block */}
        <div className="mt-2 bg-[#472404] text-[#FAF9F7] rounded-2xl p-8 sm:p-12 text-center shadow-lg border border-stone-850">
          <h3 className="font-extrabold text-xl sm:text-2xl mb-3 text-white">Wujudkan Desain Ruangan Impian Anda</h3>
          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 font-medium leading-relaxed">
            Tertarik dengan rancangan interior atau furniture kustom seperti proyek ini? Konsultasikan ruang impian Anda bersama desainer kami sekarang!
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => handleWATanya('order')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-stone-100 text-[#472404] text-sm font-bold px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 cursor-pointer border-0"
            >
              <PhoneIcon className="w-4 h-4" />
              <span>Hubungi Marketing Kami</span>
            </button>
          </div>
        </div>

      </div>

      {/* Persistent Floating WhatsApp Button */}
      <button
        onClick={() => handleWATanya('konsultasi')}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1ebd5a] text-white flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 cursor-pointer z-50 group"
        aria-label="Konsultasi via WhatsApp"
      >
        <WhatsAppIcon className="w-7 h-7" />
        
        {/* Tooltip on Hover */}
        <span className="absolute right-16 bg-stone-900/90 text-white text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-md pointer-events-none hidden md:block backdrop-blur-sm">
          Konsultasi via WhatsApp
        </span>
      </button>
    </div>
  );
};

export default PortfolioDetailPage;
