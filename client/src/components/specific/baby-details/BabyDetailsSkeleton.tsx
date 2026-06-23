import React, { memo } from 'react';

const BabyDetailsSkeleton: React.FC = memo(() => {
  return (
    <div className="animate-pulse">
      {/* Back button skeleton */}
      <div className="w-24 h-6 bg-slate-200 rounded mb-6"></div>
      
      {/* Baby Info Card Skeleton */}
      <div className="bg-white rounded-[16px] shadow-sm border border-slate-100 p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-slate-200 flex-shrink-0"></div>
          <div className="flex-1 w-full">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-4 gap-4">
              <div className="w-full flex flex-col items-center md:items-start">
                <div className="h-8 bg-slate-200 rounded w-48 mb-2"></div>
                <div className="h-4 bg-slate-200 rounded w-32"></div>
              </div>
              <div className="h-8 bg-slate-200 rounded-full w-32"></div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <div className="h-3 bg-slate-200 rounded w-16 mb-2"></div>
                  <div className="h-5 bg-slate-200 rounded w-20"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="mt-8">
        <div className="h-8 bg-slate-200 rounded w-48 mb-4"></div>
        <div className="bg-white rounded-[16px] shadow-sm border border-slate-100 overflow-hidden">
          <div className="hidden md:grid grid-cols-7 gap-4 p-4 border-b border-slate-100 bg-slate-50">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="h-4 bg-slate-200 rounded w-full"></div>
            ))}
          </div>
          <div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 border-b border-slate-50">
                <div className="h-6 bg-slate-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default BabyDetailsSkeleton;
