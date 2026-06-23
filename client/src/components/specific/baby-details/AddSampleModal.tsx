import React, { useState, useMemo } from 'react';
import ModalWrapper from '../../common/ModalWrapper';
import SampleForm from './SampleForm';
import type { SampleFormValues } from './SampleForm';
import { useAddSample } from '../../../hooks/useAddSample';
import Toast from '../../common/Toast';

interface AddSampleModalProps {
  isOpen: boolean;
  onClose: () => void;
  babyId: string;
  babyRegisteredAt?: string;
}

const AddSampleModal: React.FC<AddSampleModalProps> = ({ isOpen, onClose, babyId, babyRegisteredAt }) => {
  const addSampleMutation = useAddSample();
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const defaultValues = useMemo(() => {
    if (!babyRegisteredAt) return {};
    
    const registrationDate = new Date(babyRegisteredAt);
    registrationDate.setHours(0, 0, 0, 0);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffTime = today.getTime() - registrationDate.getTime();
    const day = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

    const currentHour = new Date().getHours();
    const shift = (currentHour >= 15) ? 'E' : 'M' as 'M' | 'E';

    return { day, shift };
  }, [babyRegisteredAt]);

  const handleSubmit = async (data: SampleFormValues) => {
    try {
      await addSampleMutation.mutateAsync({ babyId, ...data });
      setToast({ message: 'Sample added successfully', type: 'success' });
      onClose(); // Close modal on success
    } catch (error: any) {
      setToast({ 
        message: error.response?.data?.message || 'Failed to save sample', 
        type: 'error' 
      });
    }
  };

  return (
    <>
      <ModalWrapper isOpen={isOpen} onClose={onClose} title="Add Today's Sample">
        <SampleForm 
          onSubmit={handleSubmit} 
          onCancel={onClose} 
          isLoading={addSampleMutation.isPending}
          initialValues={defaultValues}
        />
      </ModalWrapper>

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

export default AddSampleModal;
