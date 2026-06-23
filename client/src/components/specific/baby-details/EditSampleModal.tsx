import React, { useState } from 'react';
import ModalWrapper from '../../common/ModalWrapper';
import SampleForm from './SampleForm';
import type { SampleFormValues } from './SampleForm';
import { useUpdateSample } from '../../../hooks/useUpdateSample';
import Toast from '../../common/Toast';

interface EditSampleModalProps {
  isOpen: boolean;
  onClose: () => void;
  babyId: string;
  sample: any;
}

const EditSampleModal: React.FC<EditSampleModalProps> = ({ isOpen, onClose, babyId, sample }) => {
  const updateSampleMutation = useUpdateSample();
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (data: SampleFormValues) => {
    try {
      await updateSampleMutation.mutateAsync({ 
        babyId, 
        sampleId: sample._id, 
        ...data 
      });
      setToast({ message: 'Sample updated successfully', type: 'success' });
      onClose();
    } catch (error: any) {
      setToast({ 
        message: error.response?.data?.message || 'Failed to update sample', 
        type: 'error' 
      });
    }
  };

  return (
    <>
      <ModalWrapper isOpen={isOpen} onClose={onClose} title="Edit Sample">
        <SampleForm 
          initialValues={{
            weight: sample.weight,
            day: sample.day,
            shift: sample.shift,
            mbj20_f: sample.mbj20_f,
            mbj20_s: sample.mbj20_s,
            jm103_s: sample.jm103_s,
            tsb: sample.tsb,
            f1_d4_f: sample.f1_d4_f, f2_d4_f: sample.f2_d4_f, f3_d4_f: sample.f3_d4_f, f4_d4_f: sample.f4_d4_f, f5_d4_f: sample.f5_d4_f,
            f6_d4_f: sample.f6_d4_f, f7_d4_f: sample.f7_d4_f, f8_d4_f: sample.f8_d4_f, f9_d4_f: sample.f9_d4_f, f10_d4_f: sample.f10_d4_f,
            f1_d4_s: sample.f1_d4_s, f2_d4_s: sample.f2_d4_s, f3_d4_s: sample.f3_d4_s, f4_d4_s: sample.f4_d4_s, f5_d4_s: sample.f5_d4_s,
            f6_d4_s: sample.f6_d4_s, f7_d4_s: sample.f7_d4_s, f8_d4_s: sample.f8_d4_s, f9_d4_s: sample.f9_d4_s, f10_d4_s: sample.f10_d4_s,
            f1_d6_f: sample.f1_d6_f, f2_d6_f: sample.f2_d6_f, f3_d6_f: sample.f3_d6_f, f4_d6_f: sample.f4_d6_f, f5_d6_f: sample.f5_d6_f,
            f6_d6_f: sample.f6_d6_f, f7_d6_f: sample.f7_d6_f, f8_d6_f: sample.f8_d6_f, f9_d6_f: sample.f9_d6_f, f10_d6_f: sample.f10_d6_f,
            f1_d6_s: sample.f1_d6_s, f2_d6_s: sample.f2_d6_s, f3_d6_s: sample.f3_d6_s, f4_d6_s: sample.f4_d6_s, f5_d6_s: sample.f5_d6_s,
            f6_d6_s: sample.f6_d6_s, f7_d6_s: sample.f7_d6_s, f8_d6_s: sample.f8_d6_s, f9_d6_s: sample.f9_d6_s, f10_d6_s: sample.f10_d6_s,
            remarks: sample.remarks,
          }}
          onSubmit={handleSubmit} 
          onCancel={onClose} 
          isLoading={updateSampleMutation.isPending} 
          submitLabel="Update Sample"
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

export default EditSampleModal;
