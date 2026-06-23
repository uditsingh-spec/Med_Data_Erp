import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import ModalWrapper from '../../common/ModalWrapper';
import Input from '../../common/Input';
import Button from '../../common/Button';
import GenderSelector from '../../common/GenderSelector';
import TermSelector from '../../common/TermSelector';
import { useUpdateBaby } from '../../../hooks/useUpdateBaby';
import Toast from '../../common/Toast';

const editBabySchema = z.object({
  motherName: z.string().min(2, 'Mother Name must be at least 2 characters').optional(),
  motherAge: z.preprocess((val) => Number(val), z.number().min(18, 'Minimum age is 18').max(60, 'Maximum age is 60')).optional() as z.ZodType<number | undefined, any, any>,
  dob: z.string().min(1, 'Date of Birth is required').optional(),
  
  weight: z.preprocess((val) => val === '' ? undefined : Number(val), z.number().min(0.5).max(5000).optional()) as z.ZodType<number | undefined, any, any>,
  gender: z.enum(['Male', 'Female']).optional(),
  
  gestationalAgeWeeks: z.preprocess((val) => val === '' ? undefined : Number(val), z.number().max(42, 'Max 42W').optional()) as z.ZodType<number | undefined, any, any>,
  gestationalAgeDays: z.preprocess((val) => val === '' ? undefined : Number(val), z.number().min(0).max(6).optional()) as z.ZodType<number | undefined, any, any>,
  
  skinForehead: z.preprocess((val) => val === '' ? undefined : Number(val), z.number().min(1, 'Minimum 1').optional()) as z.ZodType<number | undefined, any, any>,
  skinSternum: z.preprocess((val) => val === '' ? undefined : Number(val), z.number().min(1, 'Minimum 1').optional()) as z.ZodType<number | undefined, any, any>,
  
  termStatus: z.enum(['Term', 'Preterm']).optional(),
});

type EditBabyFormValues = z.infer<typeof editBabySchema>;

interface EditBabyModalProps {
  isOpen: boolean;
  onClose: () => void;
  baby: any;
}

const EditBabyModal: React.FC<EditBabyModalProps> = ({ isOpen, onClose, baby }) => {
  const updateBabyMutation = useUpdateBaby();
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Parse GA string (e.g. "36W-3D")
  const gaMatch = baby.gestationalAge?.match(/^(\d+)W(?:[\-\+](\d+)D)?$/);
  const initialWeeks = gaMatch ? Number(gaMatch[1]) : undefined;
  const initialDays = gaMatch && gaMatch[2] ? Number(gaMatch[2]) : undefined;

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<EditBabyFormValues>({
    resolver: zodResolver(editBabySchema),
    defaultValues: {
      motherName: baby.motherName,
      motherAge: baby.motherAge,
      dob: baby.dob,
      weight: baby.weight,
      gender: baby.gender,
      gestationalAgeWeeks: initialWeeks,
      gestationalAgeDays: initialDays,
      termStatus: baby.termStatus,
      skinForehead: baby.skinForehead,
      skinSternum: baby.skinSternum,
    }
  });

  const onSubmit = async (data: EditBabyFormValues) => {
    try {
      const payload: any = { babyId: baby._id, ...data };
      
      if (payload.weight !== undefined && payload.weight < 15) {
        payload.weight = Math.round(payload.weight * 1000);
      }

      if (data.gestationalAgeWeeks) {
        let ga = `${data.gestationalAgeWeeks}W`;
        if (data.gestationalAgeDays) {
          ga += `+${data.gestationalAgeDays}D`;
        }
        payload.gestationalAge = ga;
      }
      delete payload.gestationalAgeWeeks;
      delete payload.gestationalAgeDays;

      await updateBabyMutation.mutateAsync(payload);
      setToast({ message: 'Baby updated successfully', type: 'success' });
      onClose();
    } catch (error: any) {
      setToast({ 
        message: error.response?.data?.message || 'Failed to update baby', 
        type: 'error' 
      });
    }
  };

  return (
    <>
      <ModalWrapper isOpen={isOpen} onClose={onClose} title="Edit Baby Profile">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <h4 className="text-sm font-semibold text-slate-700">Mother's Details</h4>
            <Input
              label="Mother's Full Name"
              placeholder="e.g. Jane Doe"
              {...register('motherName')}
              error={errors.motherName?.message as string}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Mother's Age"
                type="number"
                placeholder="e.g. 28"
                {...register('motherAge')}
                error={errors.motherAge?.message as string}
              />
              <Input
                label="Date of Birth"
                type="date"
                {...register('dob')}
                error={errors.dob?.message as string}
              />
            </div>
          </div>

          <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <h4 className="text-sm font-semibold text-slate-700">Baby Details</h4>
            
            <TermSelector
              label="Term Status"
              value={watch('termStatus') as any}
              onChange={(val) => setValue('termStatus', val as 'Term' | 'Preterm' | undefined)}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Gestational Age (Weeks)"
                type="number"
                placeholder="e.g. 36"
                {...register('gestationalAgeWeeks')}
                error={errors.gestationalAgeWeeks?.message as string}
              />
              <Input
                label="Days (Optional)"
                type="number"
                placeholder="0-6"
                {...register('gestationalAgeDays')}
                error={errors.gestationalAgeDays?.message as string}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Weight"
                type="number"
                step="any"
                placeholder="e.g. 2.5 or 2500"
                {...register('weight')}
                error={errors.weight?.message as string}
              />
              <div className="flex flex-col space-y-2">
                <label className="block text-sm font-medium text-slate-700">Gender</label>
                <GenderSelector
                  label=""
                  value={watch('gender') as any}
                  onChange={(val) => setValue('gender', val as 'Male' | 'Female' | undefined)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Skin Forehead"
                type="number"
                min="1"
                placeholder="e.g. 1"
                {...register('skinForehead')}
                error={errors.skinForehead?.message as string}
              />
              <Input
                label="Skin Sternum"
                type="number"
                min="1"
                placeholder="e.g. 1"
                {...register('skinSternum')}
                error={errors.skinSternum?.message as string}
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end space-x-3 border-t border-slate-100">
            <Button type="button" variant="secondary" onClick={onClose} disabled={updateBabyMutation.isPending}>
              Cancel
            </Button>
            <Button type="submit" isLoading={updateBabyMutation.isPending}>
              Update Baby
            </Button>
          </div>
        </form>
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

export default EditBabyModal;
