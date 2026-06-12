import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLandingData } from '../context/LandingDataContext';
import { ArrowLeftIcon, WhatsAppIcon } from '../components/ui/Icons';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useLandingData();
  const { kontak } = data;

  const product = data.products.find((p) => p.id === Number(id));

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isEmbeddable = (url: string) => {
    const lower = url.toLowerCase();
    return (
      lower.includes('sketchfab.com') ||
      lower.includes('autodesk.com') ||
      lower.includes('myhub.autodesk360.com')
    );
  };

  const getEmbedUrl = (url: string) => {
    if (url.includes('sketchfab.com') && !url.includes('/embed')) {
      const matches = url.match(/(?:3d-models\/|models\/)([^/?#]+)/);
      if (matches && matches[1]) {
        return `https://sketchfab.com/models/${matches[1]}/embed?autostart=1&camera=0&preload=1`;
      }
    }
    return url;
  };

  const handleWATanya = () => {
    if (!product) return;
    let formattedWA = kontak.whatsapp.replace(/[^0-9]/g, '');
    if (formattedWA.startsWith('0')) {
      formattedWA = '62' + formattedWA.slice(1);
    }
    if (!formattedWA) {
      formattedWA = '6281234567890';
    }
    const message = `Halo Three Queens, saya tertarik dan ingin berkonsultasi mengenai produk: ${product.title}`;
    const url = `https://wa.me/${formattedWA}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <div className="py-32 bg-stone-50 min-h-screen">
        <div className="max-w-5xl mx-auto px-20">
          <div className="h-6 w-24 bg-stone-200 animate-pulse rounded mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="aspect-[4/3] bg-stone-200 animate-pulse rounded-xl" />
            <div className="space-y-4">
              <div className="h-4 w-1/4 bg-stone-200 animate-pulse rounded" />
              <div className="h-8 w-3/4 bg-stone-200 animate-pulse rounded" />
              <div className="h-6 w-1/3 bg-stone-200 animate-pulse rounded" />
              <div className="h-20 w-full bg-stone-200 animate-pulse rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-32 bg-stone-50 min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-3xl font-extrabold text-stone-900 mb-2">Produk Tidak Ditemukan</h2>
        <p className="text-stone-500 mb-8 max-w-md">
          Maaf, produk yang Anda cari tidak tersedia atau telah dihapus dari sistem kami.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#472404] hover:bg-[#472404] text-white font-semibold px-6 py-3 rounded-full transition-colors shadow-md"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>
    );
  }

  const embedUrl = product.desain3d ? getEmbedUrl(product.desain3d) : '';

  return (
    <div className="pt-28 pb-20 bg-stone-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-20">
        
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-stone-500 hover:text-[#472404] text-sm font-bold mb-8 transition-colors group"
        >
          <ArrowLeftIcon className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
          <span>Kembali ke Beranda</span>
        </Link>

        {/* Detail Layout */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-10 mb-8">
          
          {/* Main Info Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Image Area */}
            <div className="w-full aspect-[4/3] rounded-xl bg-stone-100 overflow-hidden border border-stone-100 shadow-sm">
              {product.image ? (
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <div className="text-stone-400 text-sm h-full flex items-center justify-center">Gambar tidak tersedia.</div>
              )}
            </div>

            {/* Core Info */}
            <div className="flex flex-col h-full justify-between py-1">
              <div>
                <span className="inline-block bg-amber-50 text-[#C18F76] text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-md mb-3">
                  {product.category}
                </span>
                <h1 className="font-extrabold text-[#111827] text-3xl leading-tight mb-4">
                  {product.title}
                </h1>
                
                {/* Price block */}
                <div className="mb-6">
                  <span className="text-stone-400 text-xs block mb-0.5">Mulai dari</span>
                  <span className="font-extrabold text-[#111827] text-2xl">
                    {product.price || 'Rp -'}
                  </span>
                </div>
              </div>

              {/* Badges / CTA */}
              <div className="space-y-4">
                {product.pengerjaan && (
                  <div className="p-4 bg-amber-50/40 border border-amber-100/60 rounded-xl text-sm text-stone-700 flex items-start gap-3">
                    <svg className="w-5 h-5 text-amber-700 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <span className="font-bold block text-stone-900 mb-0.5">Estimasi Pembuatan</span>
                      <span>{product.pengerjaan}</span>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleWATanya}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebd5a] text-white text-[15px] font-bold py-3.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  <span>Konsultasi Produk via WhatsApp</span>
                </button>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="mt-10 border-t border-stone-200 pt-8">
            <h2 className="font-extrabold text-[#111827] text-lg uppercase tracking-wider mb-3">Deskripsi Lengkap</h2>
            <p className="text-stone-600 text-sm leading-relaxed whitespace-pre-line">
              {product.description || 'Deskripsi produk belum tersedia.'}
            </p>
          </div>
        </div>

        {/* 2D Design Sheet Section */}
        {product.desain2d && (
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-10 mb-8">
            <h2 className="font-extrabold text-[#111827] text-lg uppercase tracking-wider mb-3">Gambar Kerja & Desain 2D</h2>
            <p className="text-stone-500 text-sm mb-6">
              Lembar teknis atau blueprint 2D produk ini dapat diunduh atau dilihat dalam resolusi penuh untuk keperluan tata letak ruangan Anda.
            </p>
            <a
              href={product.desain2d}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border-2 border-stone-850 text-stone-850 hover:bg-stone-900 hover:text-white text-sm font-bold px-6 py-3 rounded-xl transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Buka Gambar Kerja 2D (PDF / Gambar)</span>
            </a>
          </div>
        )}

        {/* 3D Model Viewport Section */}
        {product.desain3d && (
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-10">
            <h2 className="font-extrabold text-[#111827] text-lg uppercase tracking-wider mb-2">Model 3D Interaktif</h2>
            <p className="text-stone-500 text-sm mb-6">
              Gunakan mouse Anda (klik & seret untuk memutar, scroll untuk zoom) untuk melihat furniture ini dari berbagai sudut secara detail.
            </p>
            
            {/* Viewport Frame */}
            <div className="w-full aspect-[16/10] bg-stone-900 rounded-xl overflow-hidden shadow-inner border border-stone-800 flex items-center justify-center relative">
              {isEmbeddable(product.desain3d) ? (
                <iframe 
                  src={embedUrl} 
                  title="3D Model Viewer"
                  className="w-full h-full border-0"
                  allowFullScreen
                  allow="autoplay; fullscreen; xr-spatial-tracking"
                  xr-spatial-tracking="true"
                  execution-while-out-of-viewport="true"
                  execution-while-not-rendered="true"
                  web-share="true"
                />
              ) : (
                <div className="text-center p-8 max-w-md">
                  <div className="w-16 h-16 bg-[#472404]/15 rounded-full flex items-center justify-center mx-auto mb-4 text-[#472404]">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-white text-lg mb-2">Model 3D Siap Dibuka</h3>
                  <p className="text-stone-400 text-xs mb-6 leading-relaxed">
                    Visualisasi 3D produk ini dapat dimuat di browser Anda. Klik tombol di bawah untuk membukanya di halaman baru.
                  </p>
                  <a 
                    href={product.desain3d} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#472404] hover:bg-[#472404] text-white text-xs font-bold px-6 py-3 rounded-lg transition-colors cursor-pointer"
                  >
                    Buka Model 3D di Tab Baru
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductDetailPage;
