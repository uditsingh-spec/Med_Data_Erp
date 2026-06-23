import React from 'react';

const DashboardSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 h-24"></div>
        ))}
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-96 h-10 bg-white rounded-xl border border-slate-100"></div>
        <div className="flex gap-2">
          <div className="w-20 h-10 bg-white rounded-lg border border-slate-100"></div>
          <div className="w-24 h-10 bg-white rounded-lg border border-slate-100"></div>
        </div>
        <div className="w-32 h-10 bg-white rounded-xl border border-slate-100 ml-auto"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 h-32 flex flex-col justify-between">
            <div className="flex space-x-4">
              <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                <div className="h-3 bg-slate-200 rounded w-1/2"></div>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="h-5 bg-slate-200 rounded w-16"></div>
              <div className="h-5 bg-slate-200 rounded w-20 ml-auto"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardSkeleton;
