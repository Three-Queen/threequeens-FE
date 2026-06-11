import type { Product } from '../../types';
import { useLandingData } from '../../context/LandingDataContext';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const { data } = useLandingData();
  const { kontak } = data;

  const handleCardClick = () => {
    navigate(`/produk/${product.id}`);
  };

  const handleWATanya = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation
    let formattedWA = kontak.whatsapp.replace(/[^0-9]/g, '');
    if (formattedWA.startsWith('0')) {
      formattedWA = '62' + formattedWA.slice(1);
    }
    if (!formattedWA) {
      formattedWA = '6281234567890';
    }
    const message = `Halo Three Queens, saya ingin bertanya tentang produk: ${product.title}`;
    const url = `https://wa.me/${formattedWA}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white border border-[#E5E7EB] flex flex-col hover:shadow-md transition-shadow duration-300 rounded-sm h-full group cursor-pointer hover:border-amber-400"
    >
      {/* Image Area */}
      <div className="w-full aspect-[4/3] bg-stone-100 flex items-center justify-center overflow-hidden relative">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
          />
        ) : (
          <div className="text-stone-400 text-sm">Image Placeholder</div>
        )}
        
        {/* Overlay hover indicator */}
        <div className="absolute inset-0 bg-[#3A1F0D]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="bg-white/95 text-stone-900 text-xs font-semibold px-4 py-2 rounded-full shadow-sm transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            Lihat Detail
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-grow">
        <span className="text-[#C18F76] text-[11px] font-semibold uppercase tracking-wider mb-2">
          {product.category}
        </span>
        <h3 className="font-extrabold text-[#111827] text-[16px] mb-2 leading-snug group-hover:text-amber-800 transition-colors">
          {product.title}
        </h3>
        <p className="text-[#6B7280] text-[13px] leading-relaxed mb-6 line-clamp-2">
          {product.description || 'Deskripsi produk belum tersedia.'}
        </p>

        {/* Footer Area */}
        <div className="mt-auto pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[#9CA3AF] text-[11px] mb-0.5">Mulai dari</span>
            <span className="font-extrabold text-[#111827] text-[14px]">
              {product.price || 'Rp. -'}
            </span>
          </div>
          <button 
            onClick={handleWATanya}
            className="wa-btn flex items-center gap-1.5 border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors px-3 py-1.5 rounded-[4px] text-[13px] font-bold"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Tanya
          </button>
        </div>
      </div>
    </div>
  );
};
