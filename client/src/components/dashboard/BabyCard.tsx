import React, { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Users, Trash2, Pencil } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useDeleteBaby } from '../../hooks/useDeleteBaby';
import EditBabyModal from '../specific/baby-details/EditBabyModal';

interface BabyCardProps {
  baby: {
    _id: string;
    displayId: string;
    motherName: string;
    motherImage?: string;
    gender?: string;
    isTwin?: boolean;
    twinLabel?: string;
    registeredAt: string;
    isGroup?: boolean;
    twins?: any[];
    dob?: string;
    weight?: number;
    termStatus?: string;
  }
}

const BabyCard: React.FC<BabyCardProps> = memo(({ baby }) => {
  const navigate = useNavigate();
  const [showTwinSelector, setShowTwinSelector] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const { user } = useAuthStore();
  const deleteBabyMutation = useDeleteBaby();

  const formattedDate = new Date(baby.registeredAt).toLocaleDateString('en-GB').replace(/\//g, '-');
  
  const dobStr = baby.dob ? new Date(baby.dob).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : null;
  const weightStr = baby.weight ? `${baby.weight} g` : null;

  const handleClick = () => {
    if (baby.isGroup) {
      setShowTwinSelector(!showTwinSelector);
    } else {
      navigate(`/babies/${baby._id}`);
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(baby.isGroup ? 'Are you sure you want to delete both twins? All associated samples will be deleted.' : 'Are you sure you want to delete this baby profile? All associated samples will also be permanently deleted.')) {
      if (baby.isGroup && baby.twins) {
        await deleteBabyMutation.mutateAsync(baby.twins[0]._id);
        if (baby.twins[1]) {
          await deleteBabyMutation.mutateAsync(baby.twins[1]._id);
        }
      } else {
        await deleteBabyMutation.mutateAsync(baby._id);
      }
    }
  };

  if (baby.isGroup && showTwinSelector) {
    return (
      <div className="bg-indigo-50 p-5 rounded-2xl shadow-sm border border-indigo-100 flex flex-col">
        <div className="flex items-center space-x-3 mb-4 text-indigo-800">
          <Users className="w-5 h-5" />
          <h3 className="font-semibold">Select Twin</h3>
        </div>
        
        <div className="flex flex-col gap-3 mt-auto">
          {baby.twins?.map((twin: any) => {
            const twinDobStr = twin.dob ? new Date(twin.dob).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : null;
            const twinWeightStr = twin.weight ? `${twin.weight} g` : null;
            
            return (
              <button
                key={twin._id}
                onClick={() => navigate(`/babies/${twin._id}`)}
                className="w-full text-left bg-white px-4 py-3 rounded-xl shadow-sm border border-indigo-100 hover:border-indigo-300 hover:shadow transition-all flex justify-between items-center group"
              >
                <div className="flex flex-col gap-1">
                  <div>
                    <span className="font-medium text-slate-800">Twin {twin.twinLabel === 'A' ? '1' : twin.twinLabel === 'B' ? '2' : twin.twinLabel}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md ml-2 bg-slate-100 text-slate-600">{twin.gender}</span>
                  </div>
                  <div className="flex gap-2 text-xs text-slate-500">
                    {twin.termStatus && <span>{twin.termStatus}</span>}
                    {twinWeightStr && <span>• {twinWeightStr}</span>}
                    {twinDobStr && <span>• DOB: {twinDobStr}</span>}
                  </div>
                </div>
                <span className="text-indigo-400 group-hover:text-indigo-600">→</span>
              </button>
            );
          })}
          <button 
            onClick={() => setShowTwinSelector(false)}
            className="text-xs text-center text-slate-500 mt-2 hover:text-slate-700"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={handleClick}
      className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer flex flex-row items-center gap-4 w-full"
    >
      {/* Photo on the Left */}
      <div className="flex-shrink-0">
        {baby.motherImage ? (
          <img src={baby.motherImage} alt={baby.motherName} className="w-14 h-14 rounded-full object-cover border border-slate-200 shadow-sm" />
        ) : (
          <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-200 shadow-sm">
            {baby.isGroup ? <Users className="w-7 h-7" /> : <User className="w-7 h-7" />}
          </div>
        )}
      </div>

      {/* Details one after another */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between flex-1 gap-2 sm:gap-6 min-w-0">
        
        {/* Name and ID */}
        <div className="flex flex-col min-w-[150px] truncate">
          <h3 className="font-semibold text-slate-900 truncate text-lg">{baby.motherName}</h3>
          <p className="text-sm text-slate-500 font-mono truncate">{baby.displayId}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 items-center flex-1">
          {baby.isGroup ? (
            <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-purple-50 text-purple-700 border border-purple-100">
              Twins
            </span>
          ) : (
            <>
              <span className={`px-2.5 py-1 text-xs font-semibold rounded-md ${baby.gender === 'Male' ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'bg-pink-50 text-pink-700 border border-pink-100'}`}>
                {baby.gender}
              </span>
              {baby.termStatus && (
                <span className={`px-2.5 py-1 text-xs font-semibold rounded-md ${baby.termStatus.toLowerCase() === 'term' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-orange-50 text-orange-700 border border-orange-100'}`}>
                  {baby.termStatus}
                </span>
              )}
              {weightStr && (
                <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-slate-50 text-slate-700 border border-slate-200">
                  {weightStr}
                </span>
              )}
              {dobStr && (
                <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-slate-50 text-slate-700 border border-slate-200">
                  DOB: {dobStr}
                </span>
              )}
              {baby.isTwin && (
                <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-purple-50 text-purple-700 border border-purple-100">
                  Twin {baby.twinLabel === 'A' ? '1' : baby.twinLabel === 'B' ? '2' : baby.twinLabel}
                </span>
              )}
            </>
          )}
        </div>

        {/* Date and Actions */}
        <div className="flex items-center gap-4 ml-auto sm:ml-0 mt-2 sm:mt-0">
          <span className="px-2.5 py-1 text-xs font-medium rounded-md bg-slate-50 text-slate-500 border border-slate-200 whitespace-nowrap">
            {formattedDate}
          </span>
          
          {user?.role === 'admin' && (
            <div className="flex space-x-1 border-l border-slate-200 pl-4">
              {!baby.isGroup && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowEditModal(true);
                  }}
                  className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors focus:outline-none"
                  title="Edit Baby"
                >
                  <Pencil className="w-4 h-4" />
                </button>
              )}
              <button 
                onClick={handleDelete}
                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors focus:outline-none"
                title={baby.isGroup ? "Delete Twin Group" : "Delete Baby"}
                disabled={deleteBabyMutation.isPending}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {!baby.isGroup && showEditModal && (
        <EditBabyModal 
          isOpen={showEditModal} 
          onClose={() => setShowEditModal(false)} 
          baby={baby} 
        />
      )}
    </div>
  );
});

export default BabyCard;
