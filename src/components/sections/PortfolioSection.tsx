import { useLandingData } from '../../context/LandingDataContext';
import { SectionHeader, ProjectCardSkeleton } from '../ui';

// ============================================================
// Portfolio Section
// ============================================================

const PortfolioSection = () => {
  const { data, loading } = useLandingData();
  const { portfolios } = data;

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">

        {/* Section Header */}
        <div data-aos="fade-down">
          <SectionHeader
            title="Portofolio Proyek"
            subtitle="Setiap proyek adalah hasil kolaborasi dengan pelanggan untuk mencapai ruang impian mereka"
          />
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <ProjectCardSkeleton key={index} />
            ))
          ) : (
            portfolios.map((project, idx) => (
              <div
                key={project.id}
                data-aos="fade-up"
                data-aos-delay={(idx % 3) * 100}
                className="bg-white border border-[#E5E7EB] flex flex-col hover:shadow-md transition-shadow duration-300 rounded-sm overflow-hidden"
              >
                {/* Image Area */}
                <div className="w-full aspect-[4/3] bg-stone-100 flex items-center justify-center overflow-hidden">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <div className="text-stone-400 text-sm">Image Placeholder</div>
                  )}
                </div>

                {/* Content Area */}
                <div className="p-5 flex flex-col flex-grow">
                  <span className="text-[#472404] text-[11px] font-semibold uppercase tracking-wider mb-2">
                    {project.category || 'LIVING ROOM'}
                  </span>
                  <h3 className="font-extrabold text-[#111827] text-[16px] mb-2 leading-snug">
                    {project.title}
                  </h3>
                  {project.description && (
                    <p className="text-stone-500 text-[13px] leading-relaxed mb-4 line-clamp-2">
                      {project.description}
                    </p>
                  )}
                  
                  {/* Location Footer */}
                  <div className="mt-auto pt-3 border-t border-[#E5E7EB] flex items-center gap-1.5 text-stone-500 text-[13px]">
                    <svg className="w-4 h-4 text-stone-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{project.location}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
