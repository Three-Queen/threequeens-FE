import { ORDER_STEPS } from '../../constants';
import { useSmoothScroll } from '../../hooks';

// ============================================================
// Alur Pesanan Section
// ============================================================

const AlurSection = () => {
  const { scrollTo } = useSmoothScroll();

  return (
    <section id="alur" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-20">

        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-amber-100 text-amber-700 text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wide mb-3">
            Cara Pemesanan
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-3">
            Alur Pesanan
          </h2>
          <p className="text-stone-500 max-w-xl mx-auto text-base">
            Proses pemesanan yang mudah dan transparan dari awal hingga furniture terpasang di rumah Anda.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {ORDER_STEPS.map((step, index) => (
            <div
              key={step.step}
              className="relative group p-6 bg-stone-50 rounded-2xl hover:bg-amber-50 hover:shadow-md transition-all duration-300"
            >
              {/* Connector Line (desktop) */}
              {index < ORDER_STEPS.length - 1 && (
                <div className="hidden xl:block absolute top-9 left-full w-full h-0.5 bg-amber-200 z-0 -translate-x-6" />
              )}

              {/* Step Number */}
              <div className="relative z-10 w-12 h-12 rounded-full bg-amber-700 group-hover:bg-amber-800 text-white font-bold text-lg flex items-center justify-center mb-4 shadow-md transition-colors duration-200">
                {step.step}
              </div>

              <h3 className="font-semibold text-stone-800 mb-2 group-hover:text-amber-700 transition-colors duration-200">
                {step.title}
              </h3>
              <p className="text-sm text-stone-500 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 bg-amber-700 rounded-2xl p-8 sm:p-10 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Siap Mewujudkan Furniture Impian Anda?
          </h3>
          <p className="text-amber-200 mb-6 text-base">
            Hubungi kami sekarang untuk konsultasi gratis dan penawaran terbaik.
          </p>
          <button
            onClick={() => scrollTo('#kontak')}
            className="bg-white text-amber-700 hover:bg-amber-50 font-semibold px-8 py-3 rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Mulai Konsultasi →
          </button>
        </div>
      </div>
    </section>
  );
};

export default AlurSection;
