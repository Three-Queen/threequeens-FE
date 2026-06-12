import { Link, useNavigate } from 'react-router-dom';
import { useLandingData } from '../../context/LandingDataContext';
import { SectionHeader, ProjectCardSkeleton, ProjectCard } from '../ui';

// ============================================================
// Portfolio Section
// ============================================================

const PortfolioSection = () => {
  const { data, loading } = useLandingData();
  const { portfolios } = data;
  const navigate = useNavigate();

  // Limit landing page portfolio to latest 6 items
  const featuredPortfolios = portfolios.slice(0, 6);

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
            featuredPortfolios.map((project, idx) => (
              <div key={project.id} className="h-full">
                <ProjectCard 
                  project={project} 
                  idx={idx} 
                  onClick={() => navigate('/portofolio', { state: { projectId: project.id } })}
                />
              </div>
            ))
          )}
        </div>

        {/* View All Button */}
        {!loading && portfolios.length > 6 && (
          <div className="mt-12 text-center" data-aos="fade-up">
            <Link
              to="/portofolio"
              className="inline-flex items-center gap-2 border-2 border-[#472404] text-[#472404] hover:bg-[#472404] hover:text-white transition-all duration-300 px-8 py-3 rounded-full font-bold text-sm tracking-wide shadow-sm hover:shadow-md cursor-pointer hover:-translate-y-0.5"
            >
              <span>Lihat Semua Portofolio</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;

