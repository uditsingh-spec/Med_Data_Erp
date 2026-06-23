import React, { useState } from 'react';
import { useDeleteSample } from '../../../hooks/useDeleteSample';
import { Loader2, Trash2, AlertTriangle } from 'lucide-react';
import Toast from '../../common/Toast';
import ModalWrapper from '../../common/ModalWrapper';

interface DeleteSampleButtonProps {
  babyId: string;
  sampleId: string;
}

const DeleteSampleButton: React.FC<DeleteSampleButtonProps> = ({ babyId, sampleId }) => {
  const deleteSampleMutation = useDeleteSample();
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteSampleMutation.mutateAsync({ babyId, sampleId });
      setToast({ message: 'Sample deleted successfully', type: 'success' });
      setShowConfirm(false);
    } catch (error: any) {
      setToast({ 
        message: error.response?.data?.message || 'Failed to delete sample', 
        type: 'error' 
      });
      setShowConfirm(false);
    }
  };

  return (
    <>
      <button 
        onClick={(e) => { e.stopPropagation(); setShowConfirm(true); }}
        disabled={deleteSampleMutation.isPending}
        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
        title="Delete Sample"
      >
        {deleteSampleMutation.isPending ? (
          <Loader2 className="w-4 h-4 animate-spin text-red-500" />
        ) : (
          <Trash2 className="w-4 h-4" />
        )}
      </button>

      {showConfirm && (
        <ModalWrapper isOpen={showConfirm} onClose={() => setShowConfirm(false)} title="Confirm Delete">
          <div className="flex flex-col items-center p-4">
            <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
            <p className="text-slate-700 text-center mb-6">Are you sure you want to delete this sample? This action cannot be undone.</p>
            <div className="flex gap-4 w-full">
              <button 
                onClick={(e) => { e.stopPropagation(); setShowConfirm(false); }}
                className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); handleDelete(); }}
                disabled={deleteSampleMutation.isPending}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 flex justify-center items-center transition-colors"
              >
                {deleteSampleMutation.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Delete'}
              </button>
            </div>
          </div>
        </ModalWrapper>
      )}

      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </>
  );
};

export default DeleteSampleButton;
