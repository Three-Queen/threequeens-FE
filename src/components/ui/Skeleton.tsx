import React from 'react';

export const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => {
  return <div className={`bg-stone-200 animate-pulse rounded ${className}`} />;
};

export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white border border-[#E5E7EB] flex flex-col rounded-sm animate-pulse h-full">
      {/* Image Area */}
      <div className="w-full aspect-[4/3] bg-stone-200" />

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Category */}
        <div className="h-2.5 w-16 bg-stone-200 rounded mb-3" />
        
        {/* Title */}
        <div className="h-4 w-3/4 bg-stone-200 rounded mb-2.5" />
        
        {/* Description */}
        <div className="h-3 w-full bg-stone-200 rounded mb-2" />
        <div className="h-3 w-5/6 bg-stone-200 rounded mb-2" />
        <div className="h-3 w-2/3 bg-stone-200 rounded mb-6" />

        {/* Footer Area */}
        <div className="mt-auto pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
          <div className="flex flex-col gap-1.5">
            <div className="h-2 w-10 bg-stone-200 rounded" />
            <div className="h-3.5 w-20 bg-stone-200 rounded" />
          </div>
          <div className="h-8 w-16 bg-stone-200 rounded" />
        </div>
      </div>
    </div>
  );
};

export const ProjectCardSkeleton = () => {
  return (
    <div className="bg-white border border-[#E5E7EB] flex flex-col rounded-sm animate-pulse h-full">
      {/* Image Area */}
      <div className="w-full aspect-[4/3] bg-stone-200" />

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Category */}
        <div className="h-2.5 w-16 bg-stone-200 rounded mb-3" />
        
        {/* Title */}
        <div className="h-4 w-3/4 bg-stone-200 rounded mb-4" />

        {/* Location Footer */}
        <div className="mt-auto pt-3 border-t border-[#E5E7EB] flex items-center gap-1.5">
          <div className="h-4 w-4 bg-stone-200 rounded-full" />
          <div className="h-3 w-24 bg-stone-200 rounded" />
        </div>
      </div>
    </div>
  );
};
