import type { Project } from '../../types';
import { getProxyUrl } from '../../utils/url';

interface ProjectCardProps {
  project: Project;
  idx?: number;
  onClick?: () => void;
}

export const ProjectCard = ({ project, idx = 0, onClick }: ProjectCardProps) => {
  return (
    <div
      onClick={onClick}
      data-aos="fade-up"
      data-aos-delay={(idx % 3) * 100}
      className={`bg-white border border-[#E5E7EB] flex flex-col hover:shadow-md transition-all duration-300 rounded-sm overflow-hidden h-full group ${
        onClick ? 'cursor-pointer hover:border-[#472404]' : ''
      }`}
    >
      {/* Image Area */}
      <div className="w-full aspect-[4/3] bg-stone-100 flex items-center justify-center overflow-hidden relative">
        {project.image ? (
          <img
            src={getProxyUrl(project.image)}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="text-stone-400 text-sm">Image Placeholder</div>
        )}
        
        {onClick && (
          <div className="absolute inset-0 bg-[#472404]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="bg-white/95 text-stone-900 text-xs font-semibold px-4 py-2 rounded-full shadow-sm transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              Lihat Detail
            </span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-grow">
        <span className="text-[#472404] text-[11px] font-semibold uppercase tracking-wider mb-2">
          {project.category || 'LIVING ROOM'}
        </span>
        <h3 className="font-extrabold text-[#111827] text-[16px] mb-2 leading-snug group-hover:text-[#472404] transition-colors">
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
  );
};
