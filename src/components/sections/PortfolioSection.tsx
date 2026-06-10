import { PROJECTS } from '../../constants';

// ============================================================
// Portfolio Section
// ============================================================

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="py-20 bg-stone-100">
      <div className="max-w-7xl mx-auto px-20">

        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-amber-100 text-amber-700 text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wide mb-3">
            Hasil Karya Kami
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-3">
            Portofolio Proyek
          </h2>
          <p className="text-stone-500 max-w-xl mx-auto text-base">
            Beberapa proyek unggulan yang telah kami kerjakan dengan penuh dedikasi dan profesionalisme.
          </p>
        </div>

        {/* Masonry-style Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROJECTS.map((project, index) => (
            <div
              key={project.id}
              className={`group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                index === 0 ? 'sm:col-span-2 sm:row-span-2' : ''
              }`}
            >
              {/* Image */}
              <div
                className={`bg-gradient-to-br from-stone-300 to-amber-200 flex items-center justify-center ${
                  index === 0 ? 'h-72 sm:h-full min-h-[280px]' : 'h-44'
                }`}
              >
                <span className="text-stone-500 text-sm">Foto Proyek</span>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white font-semibold text-base">{project.title}</h3>
                <p className="text-amber-300 text-xs mt-0.5">📍 {project.location}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <button className="border-2 border-amber-700 text-amber-700 hover:bg-amber-700 hover:text-white font-semibold px-8 py-3 rounded-full transition-all duration-200">
            Lihat Semua Portofolio
          </button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
