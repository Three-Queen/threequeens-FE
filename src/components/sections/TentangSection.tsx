import { useLandingData } from '../../context/LandingDataContext';

// ============================================================
// Tentang Kami Section
// ============================================================

const TentangSection = () => {
  const { data, loading } = useLandingData();
  const { tentang } = data;

  // Split description by double newline to render paragraphs separately
  const paragraphs = tentang.deskripsi
    ? tentang.deskripsi.split('\n\n')
    : [];

  return (
    <section id="tentang" className="py-24 bg-gradient-to-b from-[#A25016] to-[#803C0B] text-white">
      <div className="max-w-7xl mx-auto px-20">
        
        {/* Section Header (Centered) */}
        <div className="text-center mb-20">
          <h2 className="text-[2.5rem] sm:text-[3rem] font-bold text-white mb-4 tracking-tight">
            Tentang Kami
          </h2>
          <p className="text-[#EBD3C4] text-[15px] max-w-2xl mx-auto leading-relaxed font-light">
            "Kami adalah perusahan Desain dan Workshop Interior yang mengutamakan kreativitas dan fungsionalitas untuk menciptakan ruang impian anda"
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Text Block */}
          <div className="space-y-6 max-w-[480px]">
            <h3 className="text-3xl sm:text-[2.2rem] font-bold text-white leading-tight">
              Kami Menciptakan<br />Ruangan Impian Anda!
            </h3>
            
            <div className="space-y-5 text-[#EBD3C4] text-[15px] leading-relaxed font-light">
              {loading ? (
                <>
                  <div className="h-4 bg-amber-950/40 rounded w-full animate-pulse" />
                  <div className="h-4 bg-amber-950/40 rounded w-5/6 animate-pulse" />
                  <div className="h-4 bg-amber-950/40 rounded w-2/3 animate-pulse" />
                  <div className="h-4 bg-amber-950/40 rounded w-full animate-pulse mt-6" />
                  <div className="h-4 bg-amber-950/40 rounded w-4/5 animate-pulse" />
                </>
              ) : (
                paragraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))
              )}
            </div>
          </div>

          {/* Right Column: Overlapping Images */}
          <div className="relative h-[380px] sm:h-[450px] w-full max-w-[550px] lg:ml-auto">
            {loading ? (
              <div className="w-full h-full bg-amber-950/20 rounded animate-pulse flex items-center justify-center">
                <span className="text-[#EBD3C4]/50 text-sm">Loading Images...</span>
              </div>
            ) : (
              <>
                {/* Top-Right Image (gambar1) */}
                <div className="absolute top-0 right-0 w-[72%] h-[82%] rounded shadow-lg overflow-hidden">
                  {tentang.gambar1 ? (
                    <img
                      src={tentang.gambar1}
                      alt="Interior rendering 1"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-amber-950/30 flex items-center justify-center">
                      <span className="text-[#EBD3C4] text-xs">Desain Interior 1</span>
                    </div>
                  )}
                </div>

                {/* Bottom-Left Image (gambar2) */}
                <div className="absolute bottom-0 left-0 w-[58%] h-[62%] rounded shadow-2xl overflow-hidden border-[10px] border-[#803C0B]">
                  {tentang.gambar2 ? (
                    <img
                      src={tentang.gambar2}
                      alt="Interior rendering 2"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-amber-950/40 flex items-center justify-center">
                      <span className="text-[#EBD3C4] text-xs">Desain Interior 2</span>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default TentangSection;
