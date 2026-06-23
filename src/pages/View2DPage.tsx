import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useLandingData } from '../context/LandingDataContext';
import { ArrowLeftIcon } from '../components/ui/Icons';
import logoImg from '../assets/images/Logo.png';
import SEO from '../components/SEO';
import { getProxyUrl } from '../utils/url';

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

const View2DPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useLandingData();
  const navigate = useNavigate();
  const { search } = useLocation();

  const product = data.products.find((p) => p.id === Number(id));

  // Determine active index from query parameter
  const queryParams = new URLSearchParams(search);
  const indexParam = queryParams.get('index');
  const initialIndex = indexParam ? parseInt(indexParam, 10) : 0;
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  // Zoom and Pan States
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Reset zoom & pan position whenever active page changes
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [activeIndex]);

  // Navigation Handler (closes tab if target="_blank", otherwise navigates back)
  const handleBack = () => {
    window.close();
    setTimeout(() => {
      if (product) {
        navigate(`/produk/${product.kode_produk || product.id}`);
      } else {
        navigate('/produk');
      }
    }, 100);
  };

  // Wheel Zoom Handler
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = 0.1 * scale;
    const newScale = e.deltaY < 0 ? scale + zoomFactor : scale - zoomFactor;
    setScale(Math.max(0.5, Math.min(newScale, 5)));
  };

  // Mouse Drag Pan Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left click for panning
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch Pan Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      const touch = e.touches[0];
      setDragStart({ x: touch.clientX - position.x, y: touch.clientY - position.y });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setPosition({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y,
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => {
    setScale((prev: number) => Math.min(prev + 0.25, 5));
  };

  const handleZoomOut = () => {
    setScale((prev: number) => Math.max(prev - 0.25, 0.5));
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-950 text-stone-200 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-8 w-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <span>Memuat Dokumen...</span>
        </div>
      </div>
    );
  }

  const images2d = parse2DImages(product?.desain2d);
  const active2dImage = images2d[activeIndex] || '';

  if (!product || !active2dImage) {
    return (
      <div className="min-h-screen bg-stone-950 text-stone-200 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Dokumen Tidak Ditemukan</h2>
        <p className="text-stone-400 mb-6 max-w-sm">
          Maaf, gambar kerja 2D untuk produk ini tidak tersedia atau tidak ditemukan.
        </p>
        <button
          onClick={handleBack}
          className="bg-[#472404] hover:bg-[#5C3A1E] text-white px-6 py-2.5 rounded-full font-semibold transition-colors cursor-pointer"
        >
          Kembali
        </button>
      </div>
    );
  }

  const isPdf = active2dImage.toLowerCase().includes('.pdf');

  return (
    <div className="h-screen w-screen bg-stone-950 text-white flex items-center justify-center select-none overflow-hidden relative p-4 sm:p-8">
      <SEO 
        title={`Gambar Kerja 2D: ${product.title}`}
        description={`Gambar kerja 2D detail teknis untuk ${product.title}.`}
        robots="noindex, nofollow"
      />
      {/* Floating Back Button */}
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 z-40 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 group shadow-lg cursor-pointer"
        title="Kembali"
      >
        <ArrowLeftIcon className="w-5 h-5 transform group-hover:-translate-x-0.5 transition-transform" />
      </button>

      {/* Document Content / Image Viewport */}
      {isPdf ? (
        <div className="w-full h-full max-w-5xl max-h-[90vh] bg-stone-900/40 rounded-xl border border-stone-800/40 overflow-hidden shadow-2xl z-10">
          <iframe
            src={getProxyUrl(active2dImage)}
            title="Preview Gambar Kerja PDF"
            className="w-full h-full border-none"
          />
        </div>
      ) : (
        <div 
          className="relative select-none transition-transform duration-100 ease-out z-10"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
          onDoubleClick={handleReset}
        >
          <div className="relative shadow-2xl rounded-xl overflow-hidden border border-stone-800/40 bg-stone-900/40 max-w-5xl max-h-[90vh] flex items-center justify-center">
            {/* Real image tag to preserve intrinsic dimensions */}
            <img
              src={getProxyUrl(active2dImage)}
              alt={product.title}
              className="max-w-full max-h-[90vh] object-contain select-none block pointer-events-none"
              draggable={false}
            />
            
            {/* Watermark overlay - strictly centered and sized inside the image boundary box */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-20">
              <div className="flex flex-col items-center opacity-[0.08] select-none pointer-events-none">
                <img 
                  src={logoImg} 
                  alt="Watermark Logo" 
                  className="w-48 sm:w-64 md:w-80 h-auto object-contain max-w-[60%] select-none pointer-events-none shadow-none"
                  draggable={false}
                />
                <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase mt-3 text-white text-center select-none pointer-events-none">
                  Three Queens Interior
                </span>
                <span className="text-[8px] sm:text-[10px] font-medium tracking-wide mt-0.5 text-white text-center select-none pointer-events-none">
                  HAK CIPTA DILINDUNGI
                </span>
              </div>
            </div>

            {/* Invisible shield covering the entire image & watermark box to block context menu & drag actions */}
            <div 
              className="absolute inset-0 z-30 cursor-default bg-transparent" 
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
        </div>
      )}

      {/* Floating Page Navigator (if there are multiple 2D images) */}
      {images2d.length > 1 && (
        <div className="absolute bottom-6 left-6 z-40 bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl p-2 flex items-center gap-2 shadow-lg">
          <button
            onClick={() => setActiveIndex(prev => Math.max(0, prev - 1))}
            disabled={activeIndex === 0}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-stone-900/60 hover:bg-stone-850 disabled:opacity-40 disabled:hover:bg-stone-900/60 text-stone-200 hover:text-white transition-colors cursor-pointer"
            title="Halaman Sebelumnya"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <span className="text-xs font-bold px-2 text-stone-200 min-w-[70px] text-center select-none">
            Hal. {activeIndex + 1} / {images2d.length}
          </span>

          <button
            onClick={() => setActiveIndex(prev => Math.min(images2d.length - 1, prev + 1))}
            disabled={activeIndex === images2d.length - 1}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-stone-900/60 hover:bg-stone-850 disabled:opacity-40 disabled:hover:bg-stone-900/60 text-stone-200 hover:text-white transition-colors cursor-pointer"
            title="Halaman Selanjutnya"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Floating Zoom Controls */}
      {!isPdf && (
        <div className="absolute bottom-6 right-6 z-40 bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl p-2 flex items-center gap-2 shadow-lg">
          <button
            onClick={handleZoomOut}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-stone-900/60 hover:bg-stone-850 text-stone-200 hover:text-white transition-colors cursor-pointer"
            title="Zoom Out"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
            </svg>
          </button>
          
          <span className="text-xs font-bold font-mono px-2 text-stone-200 min-w-[48px] text-center select-none">
            {Math.round(scale * 100)}%
          </span>

          <button
            onClick={handleZoomIn}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-stone-900/60 hover:bg-stone-850 text-stone-200 hover:text-white transition-colors cursor-pointer"
            title="Zoom In"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>

          <button
            onClick={handleReset}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-stone-900/60 hover:bg-stone-850 text-stone-200 hover:text-white transition-colors border-l border-white/5 pl-2 cursor-pointer"
            title="Reset"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default View2DPage;
