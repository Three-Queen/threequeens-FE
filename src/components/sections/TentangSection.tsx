import { useLandingData } from '../../context/LandingDataContext';
import { getProxyUrl } from '../../utils/url';

// ============================================================
// Tentang Kami Section
// ============================================================

const TentangSection = () => {
  const { data, loading } = useLandingData();
  const { tentang } = data;

  const paragraphs = tentang.deskripsi
    ? tentang.deskripsi.split('\n\n')
    : [];

  // Parse dynamic Visi & Misi from database if available
  const visionText = tentang.visi || 'Menjadi perusahaan interior dan furniture custom terpercaya yang menghadirkan solusi ruang berkualitas, inovatif, dan bernilai estetika tinggi.';
  const missionItems = tentang.misi
    ? tentang.misi.split('\n').map(item => item.replace(/^[•\-\*]\s*/, '').trim()).filter(Boolean)
    : [];

  return (
    <section id="tentang" className="pt-10 pb-16 bg-white relative z-20">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">

        {/* Section Header (Centered) */}
        <div className="text-center mb-6 sm:mb-8" data-aos="fade-down">
          <h2 className="text-3xl sm:text-[2.25rem] font-bold text-[#1a1a1a] mb-2 tracking-tight">
            Tentang Kami
          </h2>
          <p className="text-stone-500 text-[14.5px] sm:text-[15px] max-w-2xl mx-auto leading-relaxed">
            "Kami adalah perusahaan Desain dan Workshop Interior yang mengutamakan kreativitas dan fungsionalitas untuk menciptakan ruang impian anda"
          </p>
        </div>

        {/* Main Grid: Profile Content (Left) & Images (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Heading, Description & CTA */}
          <div className="lg:col-span-7 space-y-4" data-aos="fade-right">
            <h3 className="text-2xl sm:text-[2rem] font-bold text-[#1a1a1a] leading-tight">
              Kami Menciptakan<br />Ruangan Impian Anda!
            </h3>

            {/* Description content stays directly below the title */}
            <div className="space-y-3 text-stone-600 text-[14px] sm:text-[14.5px] leading-relaxed text-justify">
              {loading ? (
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-stone-200 rounded w-full" />
                  <div className="h-4 bg-stone-200 rounded w-5/6" />
                  <div className="h-4 bg-stone-200 rounded w-4/5" />
                </div>
              ) : (
                paragraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))
              )}
            </div>

            {/* Stats & Button Row */}
            <div className="flex flex-col sm:flex-row items-stretch gap-4 pt-2">
              <div className="bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] rounded-md px-6 py-4 flex items-center justify-center gap-3 border border-stone-50 w-full sm:w-auto">
                <span className="text-3xl font-extrabold text-[#472404]">1000+</span>
                <span className="text-sm font-bold text-[#1a1a1a] leading-tight">Model<br />Furniture</span>
              </div>
              <button
                onClick={() => {
                  const el = document.getElementById('kontak');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#472404] hover:bg-[#3A1F0D] text-white font-medium px-8 py-4 flex items-center justify-center rounded-md transition-colors duration-200 shadow-sm cursor-pointer w-full sm:w-auto text-center"
              >
                Kontak Kami
              </button>
            </div>
          </div>

          {/* Right Column: 2 Photos from CRUD */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 pb-2 items-center lg:mt-0 mt-4" data-aos="fade-left">
            <div className="rounded-[20px] overflow-hidden shadow-md border border-stone-100 bg-stone-50 aspect-[4/5] hover:scale-[1.02] transition-all duration-300 group">
              {tentang.gambar1 ? (
                <img src={getProxyUrl(tentang.gambar1)} alt="Three Queens Interior 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-stone-300 text-xs">Foto 1</div>
              )}
            </div>
            <div className="rounded-[20px] overflow-hidden shadow-md border border-stone-100 bg-stone-50 aspect-[4/5] translate-y-3 hover:scale-[1.02] transition-all duration-300 group">
              {tentang.gambar2 ? (
                <img src={getProxyUrl(tentang.gambar2)} alt="Three Queens Interior 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-stone-300 text-xs">Foto 2</div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Block: Visi & Misi (Spans horizontally/memanjang across container) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch mt-8 pt-8 border-t border-stone-100" data-aos="fade-up">
          {/* Visi Card */}
          <div className="md:col-span-4 bg-white rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-stone-100 p-6 hover:shadow-[0_8px_30px_rgb(0,0,0,0.09)] transition-all duration-300 flex flex-col h-full">
            <h4 className="text-2xl font-bold text-[#472404] mb-4 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-[#472404] rounded-full inline-block"></span>
              Visi
            </h4>
            <p className="text-stone-700 text-lg sm:text-[18px] font-medium italic leading-relaxed text-left flex-grow whitespace-pre-line">
              "{visionText}"
            </p>
          </div>

          {/* Misi Card */}
          <div className="md:col-span-8 bg-white rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-stone-100 p-6 hover:shadow-[0_8px_30px_rgb(0,0,0,0.09)] transition-all duration-300 flex flex-col h-full">
            <h4 className="text-2xl font-bold text-[#472404] mb-4 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-[#472404] rounded-full inline-block"></span>
              Misi
            </h4>
            {missionItems.length > 0 ? (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-stone-600 text-[14.5px] leading-relaxed list-none pl-0 flex-grow">
                {missionItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#472404] font-bold mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-stone-600 text-[14.5px] leading-relaxed flex-grow">
                <div className="space-y-3">
                  <p className="flex items-start gap-2">
                    <span className="text-[#472404] font-bold mt-0.5">•</span>
                    <span>Memberikan layanan terbaik kepada setiap pelanggan.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-[#472404] font-bold mt-0.5">•</span>
                    <span>Menghasilkan produk interior dan furniture yang berkualitas.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-[#472404] font-bold mt-0.5">•</span>
                    <span>Mengutamakan kepuasan pelanggan dalam setiap project.</span>
                  </p>
                </div>
                <div className="space-y-3">
                  <p className="flex items-start gap-2">
                    <span className="text-[#472404] font-bold mt-0.5">•</span>
                    <span>Mengembangkan desain yang inovatif dan fungsional.</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-[#472404] font-bold mt-0.5">•</span>
                    <span>Menjaga profesionalisme dan integritas dalam setiap pekerjaan.</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default TentangSection;
