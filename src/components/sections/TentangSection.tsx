import { useLandingData } from '../../context/LandingDataContext';

// ============================================================
// Tentang Kami Section
// ============================================================

const TentangSection = () => {
  const { data, loading } = useLandingData();
  const { tentang } = data;

  const paragraphs = tentang.deskripsi
    ? tentang.deskripsi.split('\n\n')
    : [];

  return (
    <section id="tentang" className="py-24 bg-white relative z-20">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
        
        {/* Section Header (Centered) */}
        <div className="text-center mb-16" data-aos="fade-down">
          <h2 className="text-[32px] sm:text-[3rem] font-bold text-[#1a1a1a] mb-3 tracking-tight">
            Tentang Kami
          </h2>
          <p className="text-stone-500 text-[15px] max-w-2xl mx-auto leading-relaxed">
            "Kami adalah perusahaan Desain dan Workshop Interior yang mengutamakan kreativitas dan fungsionalitas untuk menciptakan ruang impian anda"
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Text Block */}
          <div className="space-y-6" data-aos="fade-right">
            <h3 className="text-3xl sm:text-[2.2rem] font-bold text-[#1a1a1a] leading-tight">
              Kami Menciptakan<br />Ruangan Impian Anda!
            </h3>
            
            <div className="space-y-4 text-stone-600 text-[14.5px] leading-relaxed text-justify">
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

            {/* Bottom Row: Stats & Button */}
            <div className="flex flex-wrap items-stretch gap-6 mt-8 pt-4">
              <div className="bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] rounded-md px-6 py-4 flex items-center justify-center gap-3 border border-stone-50">
                <span className="text-3xl font-extrabold text-[#472404]">1000+</span>
                <span className="text-sm font-bold text-[#1a1a1a] leading-tight">Model<br />Furniture</span>
              </div>
              <button
                onClick={() => {
                  const el = document.getElementById('kontak');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#472404] hover:bg-[#3A1F0D] text-white font-medium px-8 flex items-center justify-center rounded-md transition-colors duration-200 shadow-sm"
              >
                Kontak Kami
              </button>
            </div>
          </div>

          {/* Right Column: Visi & Misi Cards */}
          <div className="flex flex-col gap-6 lg:mt-0 mt-8" data-aos="fade-left">
            {/* Visi Card */}
            <div className="bg-white rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-stone-100 p-8 hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)] transition-shadow duration-300">
              <h4 className="text-2xl font-bold text-[#472404] mb-3">Visi</h4>
              <p className="text-stone-600 text-[14.5px] leading-relaxed text-justify">
                Menjadi perusahaan interior dan furniture custom terpercaya yang menghadirkan solusi ruang berkualitas, inovatif, dan bernilai estetika tinggi.
              </p>
            </div>

            {/* Misi Card */}
            <div className="bg-white rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-stone-100 p-8 hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)] transition-shadow duration-300">
              <h4 className="text-2xl font-bold text-[#472404] mb-3">Misi</h4>
              <p className="text-stone-600 text-[14.5px] leading-relaxed text-justify">
                Memberikan layanan terbaik kepada setiap pelanggan.<br/>
                Menghasilkan produk interior dan furniture yang berkualitas.<br/>
                Mengutamakan kepuasan pelanggan dalam setiap proyek.<br/>
                Mengembangkan desain yang inovatif dan fungsional.<br/>
                Menjaga profesionalisme dan integritas dalam setiap pekerjaan
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TentangSection;
