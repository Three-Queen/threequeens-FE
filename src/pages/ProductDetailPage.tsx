import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLandingData } from '../context/LandingDataContext';
import { ArrowLeftIcon, WhatsAppIcon, PhoneIcon } from '../components/ui/Icons';
import SEO from '../components/SEO';
import { getProxyUrl } from '../utils/url';

declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        src?: string;
        'camera-controls'?: boolean;
        'auto-rotate'?: boolean;
        ar?: boolean;
        'ios-src'?: string;
        style?: React.CSSProperties;
      }, HTMLElement>;
    }
  }
}

const isDirectModel = (url: string) => {
  const lower = url.toLowerCase();
  return lower.endsWith('.glb') || lower.endsWith('.gltf');
};

const getEmbedUrl = (url: string) => {
  let embed = url;
  if (url.includes('sketchfab.com') && !url.includes('/embed')) {
    const matches = url.match(/(?:3d-models\/|models\/)([^/?#]+)/);
    if (matches && matches[1]) {
      embed = `https://sketchfab.com/models/${matches[1]}/embed?autostart=1&camera=0&preload=1`;
    }
  }
  if (embed.includes('sketchfab.com') && !embed.includes('transparent=1')) {
    embed += (embed.includes('?') ? '&' : '?') + 'transparent=1';
  }
  if (url.includes('drive.google.com')) {
    const matches = url.match(/\/d\/([^/]+)/);
    if (matches && matches[1]) {
      return `https://drive.google.com/file/d/${matches[1]}/preview`;
    }
  }
  return embed;
};

const parse2DImages = (desain2d: any): string[] => {
  if (!desain2d) return [];
  if (Array.isArray(desain2d)) {
    return desain2d.map(item => String(item).trim());
  }
  const trimmed = String(desain2d).trim();
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.map(item => String(item).trim());
      }
    } catch (e) {
      // ignore
    }
  }
  if (trimmed.includes(',')) {
    return trimmed.split(',').map(item => item.trim()).filter(Boolean);
  }
  return [trimmed];
};

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useLandingData();
  const { kontak } = data;
  const [isDescExpanded, setIsDescExpanded] = useState(false);

  const product = data.products.find((p) => p.kode_produk === id || String(p.id) === id);

  // Tab state for 2D vs 3D views
  const [activeDesignTab, setActiveDesignTab] = useState<'3d' | '2d'>(
    product?.desain3d ? '3d' : '2d'
  );

  const [active2dIndex, setActive2dIndex] = useState(0);

  const productId = product?.id || product?.kode_produk;

  useEffect(() => {
    setActive2dIndex(0);
    if (product) {
      const tab = product.desain3d ? '3d' : '2d';
      const timer = setTimeout(() => {
        setActiveDesignTab(tab);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [productId]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Load Google model-viewer script if a GLB/GLTF model is detected
  useEffect(() => {
    if (product?.desain3d && isDirectModel(product.desain3d)) {
      const scriptId = 'google-model-viewer-script';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.type = 'module';
        script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js';
        document.head.appendChild(script);
      }
    }
  }, [product]);

  const handleWATanya = (type: 'konsultasi' | 'order' = 'konsultasi') => {
    if (!product) return;
    let formattedWA = kontak.whatsapp.replace(/[^0-9]/g, '');
    if (formattedWA.startsWith('0')) {
      formattedWA = '62' + formattedWA.slice(1);
    }
    if (!formattedWA) {
      formattedWA = '6281234567890';
    }

    const message = type === 'konsultasi'
      ? `Halo Three Queens, saya tertarik dan ingin berkonsultasi mengenai produk: ${product.title}`
      : `Halo Three Queens, saya ingin menghubungi Anda untuk mendiskusikan pemesanan produk: ${product.title}`;

    const url = `https://wa.me/${formattedWA}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const getCategoryTags = (category: string) => {
    const catLower = category.toLowerCase();
    if (catLower.includes('kitchen')) {
      return 'Lemari - Meja Makan - Wastafel';
    } else if (catLower.includes('lemari') || catLower.includes('wardrobe')) {
      return 'Lemari Pakaian - Kabinet - Rak Buku';
    } else if (catLower.includes('meja')) {
      return 'Meja Kerja - Meja Makan - Meja Rias';
    } else if (catLower.includes('kursi') || catLower.includes('sofa')) {
      return 'Kursi Kerja - Sofa - Armchair';
    } else {
      return 'Custom Furniture - Interior Design';
    }
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

  if (!product) {
    return (
      <div className="py-32 bg-white min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-3xl font-extrabold text-stone-900 mb-2">Produk Tidak Ditemukan</h2>
        <p className="text-stone-500 mb-8 max-w-md">
          Maaf, produk yang Anda cari tidak tersedia atau telah dihapus dari sistem kami.
        </p>
        <Link
          to="/produk"
          className="inline-flex items-center gap-2 bg-[#472404] hover:bg-[#5C3A1E] text-white font-semibold px-6 py-3 rounded-full transition-colors shadow-md"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span>Kembali ke Katalog Produk</span>
        </Link>
      </div>
    );
  }

  const embedUrl = product.desain3d ? getEmbedUrl(product.desain3d) : '';
  const descText = product.description || 'Deskripsi produk belum tersedia.';
  const shouldTruncate = descText.length > 250;
  const displayedDesc = shouldTruncate && !isDescExpanded
    ? descText.slice(0, 250) + '...'
    : descText;

  const images2d = parse2DImages(product?.desain2d);
  const active2dImage = images2d[active2dIndex] || '';

  return (
    <div className="pt-[60px] pb-12 bg-[#FAF9F7] min-h-screen">
      <SEO
        title={`${product.title} - Custom Furniture`}
        description={product.description ? (product.description.length > 155 ? product.description.slice(0, 155) + '...' : product.description) : `Jasa pembuatan custom furniture ${product.title} berkualitas di Kuningan oleh Three Queen's Interior.`}
        keywords={`${product.title.toLowerCase()}, custom ${product.category.toLowerCase()}, furniture custom kuningan, kitchen set kuningan, three queens interior`}
        image={product.image}
      />
      {/* Banner / Hero Image (Full Width directly below navbar) */}
      <div className="w-full h-[250px] sm:h-[300px] md:h-[380px] lg:h-[440px] bg-stone-100 overflow-hidden relative">
        {/* Floating Back Button */}
        <Link
          to="/produk"
          className="absolute top-4 left-4 sm:top-6 sm:left-10 lg:left-20 z-30 flex items-center justify-center w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#472404] hover:text-[#5C3A1E] shadow-md border border-stone-200/40 backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 group"
          aria-label="Kembali ke Katalog Produk"
        >
          <ArrowLeftIcon className="w-5 h-5 transform group-hover:-translate-x-0.5 transition-transform" />
        </Link>

        {product.image ? (
          <img
            src={getProxyUrl(product.image)}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-stone-400 text-sm h-full flex items-center justify-center">Gambar tidak tersedia.</div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 pt-3 sm:pt-4 pb-0 flex flex-col gap-6">

        {/* Title & Description Unified Card */}
        <div className="bg-white rounded-2xl border border-stone-200/40 shadow-sm p-6 sm:p-8">
          {/* Top Header Section */}
          <div className="mb-6">
            {/* Category Subtags */}
            <p className="text-stone-400 text-[13px] md:text-sm font-medium tracking-wide mb-1.5">
              {getCategoryTags(product.category)}
            </p>
            {/* Main Title */}
            <h1 className="font-extrabold text-[#111827] text-2xl sm:text-3xl md:text-4xl leading-tight">
              {product.title}
            </h1>
            {/* Price block */}
            <p className="font-bold text-[#111827] text-base sm:text-lg mt-1.5">
              <span className="text-stone-500 font-medium mr-1.5">Mulai Dari</span>
              {product.price || 'Rp -'}
            </p>
          </div>

          {/* Description Section */}
          <div className="border-t border-stone-100 pt-6">
            <h2 className="font-extrabold text-[#111827] text-lg md:text-xl mb-4">Deskripsi Produk</h2>
            <div className="text-stone-600 text-sm md:text-base leading-relaxed text-justify mb-6">
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

            {/* Timeline Proyek Inline */}
            <div className="border-t border-stone-100 pt-5 flex items-center gap-3">
              <div className="w-10 h-10 bg-[#472404]/5 text-[#472404] rounded-xl flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <span className="text-stone-400 text-[11px] sm:text-xs uppercase tracking-wide block mb-0.5">Timeline Pengerjaan</span>
                <span className="font-bold text-stone-800 text-sm sm:text-base">{product.pengerjaan || '4 Bulan'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lihat Desain Section */}
        <div className="mt-6 bg-white rounded-2xl border border-stone-200/40 shadow-sm p-6 sm:p-8">
          <h2 className="font-extrabold text-[#111827] text-lg md:text-xl mb-2">Visualisasi Desain</h2>

          {/* Subtitle instructions based on active tab */}
          <p className="text-stone-500 text-sm mb-6">
            {activeDesignTab === '3d'
              ? 'Gunakan mouse Anda (klik & seret untuk memutar, scroll untuk zoom) untuk melihat rancangan ini dari berbagai sudut secara detail.'
              : 'Gunakan lembar teknis blueprint 2D untuk melihat spesifikasi detail ukuran, tata letak, dan konstruksi produk.'}
          </p>

          {/* Tab / Chip Switcher (Visible only if both 2D and 3D designs exist) */}
          {product.desain3d && images2d.length > 0 && (
            <div className="flex justify-center gap-3 mb-8">
              <button
                onClick={() => setActiveDesignTab('3d')}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${activeDesignTab === '3d'
                  ? 'bg-[#472404] text-white shadow-sm'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200/60'
                  }`}
              >
                {/* 3D Cube Icon */}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4L4 8l8 4 8-4-8-4zM4 12l8 4 8-4M4 16l8 4 8-4" />
                </svg>
                <span className="hidden sm:inline">Visualisasi 3D Interaktif</span>
                <span className="sm:hidden">3D Model</span>
              </button>

              <button
                onClick={() => setActiveDesignTab('2d')}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${activeDesignTab === '2d'
                  ? 'bg-[#472404] text-white shadow-sm'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200/60'
                  }`}
              >
                {/* Document Icon */}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="hidden sm:inline">Gambar Kerja 2D</span>
                <span className="sm:hidden">Gambar 2D</span>
              </button>
            </div>
          )}

          {/* Tab 1: 3D Visualization */}
          {activeDesignTab === '3d' && product.desain3d && (
            <div
              style={{ backgroundColor: '#E9E9E9' }}
              className="w-full aspect-[4/3] sm:aspect-[16/10] rounded-xl overflow-hidden shadow-md border border-stone-200 flex items-center justify-center relative mb-6"
            >
              {isDirectModel(product.desain3d) ? (
                <model-viewer
                  src={getProxyUrl(product.desain3d)}
                  camera-controls
                  auto-rotate
                  ar
                  style={{ width: '100%', height: '100%', display: 'block', backgroundColor: '#E9E9E9' }}
                />
              ) : (
                <iframe
                  src={embedUrl}
                  title="3D Model Viewer"
                  className="w-full h-full border-0 bg-transparent"
                  allowFullScreen
                  allow="autoplay; fullscreen; xr-spatial-tracking"
                  xr-spatial-tracking="true"
                  execution-while-out-of-viewport="true"
                  execution-while-not-rendered="true"
                  web-share="true"
                />
              )}
            </div>
          )}

          {/* Tab 2: 2D Blueprint */}
          {activeDesignTab === '2d' && images2d.length > 0 && (
            <div className="space-y-4">
              <div className="w-full aspect-[4/3] sm:aspect-[16/10] bg-stone-100 rounded-xl overflow-hidden border border-stone-200 flex items-center justify-center relative shadow-sm">
                {active2dImage.match(/\.(jpg|jpeg|png|webp|gif|svg)/i) || !active2dImage.includes('pdf') ? (
                  <img
                    src={getProxyUrl(active2dImage)}
                    alt={`Gambar Kerja 2D - Halaman ${active2dIndex + 1}`}
                    className="w-full h-full object-contain p-2 select-none"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                ) : (
                  <div className="text-center p-8 max-w-md">
                    <div className="w-16 h-16 bg-[#472404]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#472404]">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-stone-900 text-lg mb-2">Dokumen Gambar Kerja PDF</h3>
                    <p className="text-stone-500 text-xs mb-4">
                      Lembar teknis produk ini tersedia dalam format PDF. Klik tombol di bawah untuk membukanya secara terpisah.
                    </p>
                  </div>
                )}
              </div>

              {/* Thumbnails if there are more than 1 image */}
              {images2d.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                  {images2d.map((imgUrl: string, idx: number) => {
                    const isPdfThumbnail = imgUrl.toLowerCase().includes('.pdf');
                    return (
                      <button
                        key={idx}
                        onClick={() => setActive2dIndex(idx)}
                        className={`w-20 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all relative cursor-pointer ${
                          active2dIndex === idx
                            ? 'border-[#472404] shadow-sm'
                            : 'border-stone-200/60 opacity-60 hover:opacity-100'
                        }`}
                      >
                        {isPdfThumbnail ? (
                          <div className="w-full h-full bg-stone-100 flex flex-col items-center justify-center text-[#472404]">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span className="text-[9px] font-bold">PDF #{idx + 1}</span>
                          </div>
                        ) : (
                          <img
                            src={getProxyUrl(imgUrl)}
                            alt={`Thumbnail ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-stone-50 rounded-xl border border-stone-200">
                <div className="text-center sm:text-left">
                  <span className="font-bold text-stone-900 text-sm block mb-0.5">Buka Resolusi Penuh</span>
                  <span className="text-stone-500 text-xs">Lihat detail ukuran skala gambar kerja 2D pada tab baru browser Anda.</span>
                </div>
                <a
                  href={`/view-2d/${product.id}?index=${active2dIndex}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-[#472404] text-[#472404] hover:bg-[#472404] hover:text-white text-xs font-bold px-5 py-2.5 rounded-lg transition-all cursor-pointer whitespace-nowrap w-full sm:w-auto"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>Buka Dokumen 2D</span>
                </a>
              </div>
            </div>
          )}

          {/* Empty visualization placeholder if nothing is set */}
          {!product.desain3d && images2d.length === 0 && (
            <div className="w-full aspect-[16/10] bg-stone-100 rounded-xl flex items-center justify-center text-stone-400 text-sm border border-stone-200">
              Visualisasi rancangan sedang dalam proses penyusunan.
            </div>
          )}
        </div>

        {/* CTA Footer Block */}
        <div className="mt-2 bg-[#472404] text-[#FAF9F7] rounded-2xl p-8 sm:p-12 text-center shadow-lg border border-stone-850">
          <h3 className="font-extrabold text-xl sm:text-2xl mb-3 text-white">Konsultasikan Ruang Impian Anda</h3>
          <p className="text-stone-300 text-sm sm:text-base max-w-xl mx-auto mb-8 font-medium leading-relaxed">
            Hubungi kami sekarang dan dapatkan konsultasi desain gratis serta layanan survei lokasi tanpa biaya!
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
        aria-label="Tanya Produk via WhatsApp"
      >
        <WhatsAppIcon className="w-7 h-7" />

        {/* Tooltip on Hover */}
        <span className="absolute right-16 bg-stone-900/90 text-white text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-md pointer-events-none hidden md:block backdrop-blur-sm">
          Hubungi via WhatsApp
        </span>
      </button>
    </div>
  );
};

export default ProductDetailPage;
