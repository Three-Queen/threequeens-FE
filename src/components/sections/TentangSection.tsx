// ============================================================
// Tentang Kami Section
// ============================================================

const TentangSection = () => {
  const keunggulan = [
    { icon: '🪵', title: 'Material Premium', desc: 'Menggunakan bahan pilihan berkualitas tinggi dan ramah lingkungan.' },
    { icon: '🎨', title: 'Desain Custom', desc: 'Setiap produk dirancang sesuai kebutuhan dan karakter ruangan Anda.' },
    { icon: '⏱️', title: 'Tepat Waktu', desc: 'Komitmen pengerjaan sesuai jadwal yang telah disepakati bersama.' },
    { icon: '🛡️', title: 'Bergaransi', desc: 'Garansi produk dan layanan purna jual untuk ketenangan Anda.' },
  ];

  return (
    <section id="tentang" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Image Block */}
          <div className="relative">
            <div className="w-full h-[420px] bg-gradient-to-br from-amber-100 to-stone-200 rounded-2xl overflow-hidden shadow-xl flex items-center justify-center">
              <span className="text-stone-500 text-sm">Foto Tim / Showroom</span>
            </div>
            {/* Decorative Badge */}
            <div className="absolute -bottom-6 -right-6 bg-amber-700 text-white rounded-2xl p-6 shadow-xl hidden sm:block">
              <p className="text-3xl font-bold">10+</p>
              <p className="text-amber-200 text-sm mt-1">Tahun Pengalaman</p>
            </div>
          </div>

          {/* Text Block */}
          <div className="space-y-6">
            <span className="inline-block bg-amber-100 text-amber-700 text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wide">
              Tentang Kami
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
              Kami Menghadirkan Ruangan Impian dengan Sentuhan Berkelas
            </h2>
            <p className="text-stone-600 leading-relaxed">
              Three Queens adalah perusahaan furniture dan interior custom yang berdedikasi
              menghadirkan kualitas terbaik. Dengan pengalaman lebih dari 10 tahun, kami telah
              membantu ratusan klien mewujudkan hunian dan ruang kerja impian mereka.
            </p>
            <p className="text-stone-600 leading-relaxed">
              Setiap detail dikerjakan dengan teliti oleh tim pengrajin berpengalaman kami,
              menggunakan material pilihan yang terjamin kualitasnya.
            </p>

            {/* Keunggulan Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {keunggulan.map((item) => (
                <div key={item.title} className="flex items-start gap-3 p-4 bg-stone-50 rounded-xl hover:bg-amber-50 transition-colors duration-200">
                  <span className="text-2xl mt-0.5">{item.icon}</span>
                  <div>
                    <h4 className="font-semibold text-stone-800 text-sm">{item.title}</h4>
                    <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TentangSection;
