import React, { memo } from 'react';
import SampleRow from './SampleRow';
import EmptySampleState from './EmptySampleState';

import { useAuthStore } from '../../../store/authStore';

interface SampleTableProps {
  samples: any[];
  babyId: string;
  jm103_s?: number;
  tsb?: number;
  f1?: number;
  f2?: number;
  f3?: number;
  f4?: number;
  f5?: number;
  f6?: number;
  f7?: number;
  f8?: number;
  f9?: number;
  f10?: number;
  remarks?: string;
  onAddSample?: () => void;
}

const SampleTable: React.FC<SampleTableProps> = memo(({ samples, babyId, onAddSample }) => {
  const { user } = useAuthStore();
  if (!samples || samples.length === 0) {
    return <EmptySampleState onAddSample={onAddSample} />;
  }

  return (
    <div className="bg-white rounded-[16px] shadow-sm border border-slate-100 overflow-hidden">
      <div className="overflow-x-auto">
      {/* Table Header - Desktop Only */}
      <div 
        className="hidden md:grid gap-4 p-4 border-b border-slate-100 bg-slate-50"
        style={{
          gridTemplateColumns: user?.role === 'admin' 
            ? 'minmax(40px, auto) minmax(70px, auto) minmax(70px, auto) minmax(50px, auto) minmax(100px, auto) minmax(100px, auto) minmax(70px, auto) 40px'
            : 'minmax(40px, auto) minmax(70px, auto) minmax(70px, auto) minmax(50px, auto) minmax(100px, auto) minmax(100px, auto) 40px'
        }}
      >
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">No.</div>
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Weight</div>
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">JM103 (S)</div>
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">TSB</div>
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Date/Time</div>
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Created By</div>
        {user?.role === 'admin' && (
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</div>
        )}
        <div></div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-slate-50">
        {samples.map((sample) => (
          <SampleRow key={sample.sampleNumber} sample={sample} babyId={babyId} userRole={user?.role} />
        ))}
      </div>
    </div>
  </div>
  );
});

export default SampleTable;
