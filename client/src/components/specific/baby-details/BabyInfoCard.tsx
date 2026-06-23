import React, { memo, useState } from 'react';
import { Pencil } from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';
import EditBabyModal from './EditBabyModal';

interface BabyInfoCardProps {
  baby: any;
}

const formatDDMMYYYY = (dateStr: string) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
};

const BabyInfoCard: React.FC<BabyInfoCardProps> = memo(({ baby }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const { user } = useAuthStore();

  if (!baby) return null;

  return (
    <>
      <div className="bg-white rounded-[16px] shadow-sm border border-slate-100 p-6 mb-6">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-100 border-4 border-slate-50 flex-shrink-0">
          {baby.motherImage ? (
            <img src={baby.motherImage} alt={baby.motherName} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400 text-2xl font-bold bg-indigo-50">
              {baby.motherName?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        
        <div className="flex-1 w-full text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-4">
            <div className="flex items-center gap-3">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                  {baby.motherName}
                  {user?.role === 'admin' && (
                    <button 
                      onClick={() => setShowEditModal(true)}
                      className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors focus:outline-none"
                      title="Edit Baby"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                  )}
                </h2>
                <p className="text-sm text-slate-500 font-medium mt-1">ID: {baby.displayId}</p>
              </div>
            </div>
            <div className="mt-2 md:mt-0 px-3 py-1 bg-indigo-50 text-indigo-700 text-sm font-semibold rounded-full border border-indigo-100">
              Registered: {formatDDMMYYYY(baby.registeredAt)}
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">DOB</p>
              <p className="text-slate-800 font-semibold">{baby.dob ? formatDDMMYYYY(baby.dob) : 'N/A'}</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Mother Age</p>
              <p className="text-slate-800 font-semibold">{baby.motherAge} yrs</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Gender</p>
              <p className="text-slate-800 font-semibold">{baby.gender}</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Weight</p>
              <p className="text-slate-800 font-semibold">{baby.weight} g</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Gest. Age</p>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-slate-800 font-semibold">{baby.gestationalAge}</p>
                {baby.termStatus && (
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                    baby.termStatus === 'Preterm' ? 'bg-orange-100 text-orange-700' :
                    baby.termStatus === 'Term' ? 'bg-green-100 text-green-700' : ''
                  }`}>
                    {baby.termStatus}
                  </span>
                )}
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Skin (Forehead)</p>
              <p className="text-slate-800 font-semibold">{baby.skinForehead ?? 'N/A'}</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Skin (Sternum)</p>
              <p className="text-slate-800 font-semibold">{baby.skinSternum ?? 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
      </div>

      {showEditModal && (
        <EditBabyModal 
          isOpen={showEditModal} 
          onClose={() => setShowEditModal(false)} 
          baby={baby} 
        />
      )}
    </>
  );
});

export default BabyInfoCard;
