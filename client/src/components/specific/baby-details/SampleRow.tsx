import React, { memo } from 'react';
import { Pencil, ChevronDown, ChevronUp } from 'lucide-react';

import DeleteSampleButton from './DeleteSampleButton';
import EditSampleModal from './EditSampleModal';

interface SampleRowProps {
  sample: any;
  babyId: string;
  userRole?: string;
}

const SampleRow: React.FC<SampleRowProps> = memo(({ sample, babyId, userRole }) => {
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const editId = params.get('editSampleId');
    if (editId === sample._id && userRole === 'admin') {
      setShowEditModal(true);
      // Remove it from URL so it doesn't re-open on refresh
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
      
      // Auto expand row as well
      setIsExpanded(true);
      
      // Scroll into view
      setTimeout(() => {
        const el = document.getElementById(`sample-row-${sample._id}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  }, [sample._id, userRole]);

  const renderReadings = () => (
    <div className="col-span-full bg-slate-50 p-4 mt-2 mb-4 mx-4 rounded-xl grid grid-cols-1 md:grid-cols-3 gap-6 shadow-inner border border-slate-200">
      {/* MBJ20 */}
      <div className="space-y-2">
        <h4 className="font-bold text-slate-700 border-b border-slate-200 pb-1 text-xs uppercase tracking-wider">MBJ20</h4>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Forehead:</span>
          <span className="font-medium text-slate-800">{sample.mbj20_f ?? 'N/A'}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Sternum:</span>
          <span className="font-medium text-slate-800">{sample.mbj20_s ?? 'N/A'}</span>
        </div>
      </div>
      {/* D4 */}
      <div className="space-y-2">
        <h4 className="font-bold text-slate-700 border-b border-slate-200 pb-1 text-xs uppercase tracking-wider">Machine 4 (D4)</h4>
        <div className="text-sm">
          <span className="text-slate-500 block mb-1">Forehead (F1-F10):</span>
          <div className="font-medium break-words text-xs text-slate-800 bg-white p-2 rounded border border-slate-100">
            {[sample.f1_d4_f, sample.f2_d4_f, sample.f3_d4_f, sample.f4_d4_f, sample.f5_d4_f, sample.f6_d4_f, sample.f7_d4_f, sample.f8_d4_f, sample.f9_d4_f, sample.f10_d4_f].map((v, i) => v != null && v !== '' ? `F${i+1}:${v}` : null).filter(Boolean).join(', ') || 'N/A'}
          </div>
        </div>
        <div className="text-sm mt-2">
          <span className="text-slate-500 block mb-1">Sternum (F1-F10):</span>
          <div className="font-medium break-words text-xs text-slate-800 bg-white p-2 rounded border border-slate-100">
            {[sample.f1_d4_s, sample.f2_d4_s, sample.f3_d4_s, sample.f4_d4_s, sample.f5_d4_s, sample.f6_d4_s, sample.f7_d4_s, sample.f8_d4_s, sample.f9_d4_s, sample.f10_d4_s].map((v, i) => v != null && v !== '' ? `F${i+1}:${v}` : null).filter(Boolean).join(', ') || 'N/A'}
          </div>
        </div>
      </div>
      {/* D6 */}
      <div className="space-y-2">
        <h4 className="font-bold text-slate-700 border-b border-slate-200 pb-1 text-xs uppercase tracking-wider">Machine 6 (D6)</h4>
        <div className="text-sm">
          <span className="text-slate-500 block mb-1">Forehead (F1-F10):</span>
          <div className="font-medium break-words text-xs text-slate-800 bg-white p-2 rounded border border-slate-100">
            {[sample.f1_d6_f, sample.f2_d6_f, sample.f3_d6_f, sample.f4_d6_f, sample.f5_d6_f, sample.f6_d6_f, sample.f7_d6_f, sample.f8_d6_f, sample.f9_d6_f, sample.f10_d6_f].map((v, i) => v != null && v !== '' ? `F${i+1}:${v}` : null).filter(Boolean).join(', ') || 'N/A'}
          </div>
        </div>
        <div className="text-sm mt-2">
          <span className="text-slate-500 block mb-1">Sternum (F1-F10):</span>
          <div className="font-medium break-words text-xs text-slate-800 bg-white p-2 rounded border border-slate-100">
            {[sample.f1_d6_s, sample.f2_d6_s, sample.f3_d6_s, sample.f4_d6_s, sample.f5_d6_s, sample.f6_d6_s, sample.f7_d6_s, sample.f8_d6_s, sample.f9_d6_s, sample.f10_d6_s].map((v, i) => v != null && v !== '' ? `F${i+1}:${v}` : null).filter(Boolean).join(', ') || 'N/A'}
          </div>
        </div>
      </div>
      {sample.remarks && (
        <div className="col-span-full space-y-2">
          <h4 className="font-bold text-slate-700 border-b border-slate-200 pb-1 text-xs uppercase tracking-wider">Remarks</h4>
          <p className="text-sm text-slate-800">{sample.remarks}</p>
        </div>
      )}
    </div>
  );

  return (
    <div id={`sample-row-${sample._id}`} className="border-b border-slate-100 transition-colors">
      {/* Desktop Row */}
      <div 
        className="hidden md:grid gap-4 p-4 items-center cursor-pointer hover:bg-slate-50"
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          gridTemplateColumns: userRole === 'admin' 
            ? 'minmax(40px, auto) minmax(70px, auto) minmax(70px, auto) minmax(50px, auto) minmax(100px, auto) minmax(100px, auto) minmax(70px, auto) 40px'
            : 'minmax(40px, auto) minmax(70px, auto) minmax(70px, auto) minmax(50px, auto) minmax(100px, auto) minmax(100px, auto) 40px'
        }}
      >
        <div className="text-sm font-semibold text-slate-800">#{sample.sampleNumber}</div>
        <div className="text-sm text-slate-600 font-medium">{sample.weight ? `${sample.weight}g` : 'N/A'}</div>
        <div className="text-sm text-slate-800 font-semibold">{sample.jm103_s ?? 'N/A'}</div>
        <div className="text-sm text-slate-800 font-semibold">{sample.tsb ?? 'N/A'}</div>
        <div className="text-sm text-slate-600">
          <div>{sample.createdDate}</div>
          <div className="text-xs text-slate-400">{sample.createdTime}</div>
        </div>
        <div className="text-sm text-slate-600 truncate" title={sample.createdBy?.name ? `${sample.createdBy.name} (${sample.createdBy.employeeId})` : 'System'}>
          {sample.createdBy?.name ? `${sample.createdBy.name} (${sample.createdBy.employeeId})` : 'System'}
        </div>
        {userRole === 'admin' && (
          <div className="flex items-center space-x-2">
            <button
              onClick={(e) => { e.stopPropagation(); setShowEditModal(true); }}
              className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors focus:outline-none"
              title="Edit Sample"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <DeleteSampleButton babyId={babyId} sampleId={sample._id} />
          </div>
        )}
        <div className="flex justify-end text-slate-400">
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </div>

      {isExpanded && <div className="hidden md:block">{renderReadings()}</div>}

      {/* Mobile Card */}
      <div 
        className="md:hidden p-4 hover:bg-slate-50 cursor-pointer transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded">#{sample.sampleNumber}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">{sample.createdDate} {sample.createdTime}</span>
            <div className="text-slate-400">
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm mt-3">
          <div>
            <span className="text-slate-500 text-xs uppercase block mb-0.5">Weight</span>
            <span className="font-semibold text-slate-800">{sample.weight ? `${sample.weight}g` : 'N/A'}</span>
          </div>
          <div>
            <span className="text-slate-500 text-xs uppercase block mb-0.5">Readings</span>
            <span className="font-semibold text-slate-800 text-xs">Available below</span>
          </div>
          <div>
            <span className="text-slate-500 text-xs uppercase block mb-0.5">JM103 (S)</span>
            <span className="font-semibold text-slate-800">{sample.jm103_s ?? 'N/A'}</span>
          </div>
          <div>
            <span className="text-slate-500 text-xs uppercase block mb-0.5">TSB</span>
            <span className="font-semibold text-slate-800">{sample.tsb ?? 'N/A'}</span>
          </div>
          <div className="col-span-2 mt-2">
            <span className="text-slate-500 text-xs uppercase block mb-0.5">Created By</span>
            <span className="text-slate-700">{sample.createdBy?.name ? `${sample.createdBy.name} (${sample.createdBy.employeeId})` : 'System'}</span>
          </div>
        </div>

        {isExpanded && <div className="mt-4 border-t border-slate-100 pt-2">{renderReadings()}</div>}

        {userRole === 'admin' && (
          <div className="mt-4 pt-4 border-t border-slate-100 flex justify-end items-center space-x-2">
            <button
              onClick={(e) => { e.stopPropagation(); setShowEditModal(true); }}
              className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors focus:outline-none"
              title="Edit Sample"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <DeleteSampleButton babyId={babyId} sampleId={sample._id} />
          </div>
        )}
      </div>

      {showEditModal && (
        <EditSampleModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          babyId={babyId}
          sample={sample}
        />
      )}
    </div>
  );
});

export default SampleRow;
