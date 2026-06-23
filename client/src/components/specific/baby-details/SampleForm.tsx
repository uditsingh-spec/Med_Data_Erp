import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '../../common/Input';
import Button from '../../common/Button';

const sampleSchema = z.object({
  weight: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number({ message: 'Weight is required' }).min(500, 'Must be at least 500g').max(5000, 'Cannot exceed 5000g')) as z.ZodType<number, any, any>,
  day: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()) as z.ZodType<number | undefined, any, any>,
  shift: z.preprocess((val) => val === '' ? undefined : val, z.enum(['M', 'E'], { message: 'Shift is required' }).optional()),
  jm103_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()) as z.ZodType<number | undefined, any, any>,
  tsb: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()) as z.ZodType<number | undefined, any, any>,
  remarks: z.string().optional(),
  mbj20_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()) as z.ZodType<number | undefined, any, any>,
  mbj20_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()) as z.ZodType<number | undefined, any, any>,
  
  f1_d4_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()) as z.ZodType<number | undefined, any, any>,
  f2_d4_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()) as z.ZodType<number | undefined, any, any>,
  f3_d4_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()) as z.ZodType<number | undefined, any, any>,
  f4_d4_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()) as z.ZodType<number | undefined, any, any>,
  f5_d4_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()) as z.ZodType<number | undefined, any, any>,
  f6_d4_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()) as z.ZodType<number | undefined, any, any>,
  f7_d4_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()) as z.ZodType<number | undefined, any, any>,
  f8_d4_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()) as z.ZodType<number | undefined, any, any>,
  f9_d4_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()) as z.ZodType<number | undefined, any, any>,
  f10_d4_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()) as z.ZodType<number | undefined, any, any>,
  f1_d4_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()) as z.ZodType<number | undefined, any, any>,
  f2_d4_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()) as z.ZodType<number | undefined, any, any>,
  f3_d4_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()) as z.ZodType<number | undefined, any, any>,
  f4_d4_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()) as z.ZodType<number | undefined, any, any>,
  f5_d4_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()) as z.ZodType<number | undefined, any, any>,
  f6_d4_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()) as z.ZodType<number | undefined, any, any>,
  f7_d4_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()) as z.ZodType<number | undefined, any, any>,
  f8_d4_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()) as z.ZodType<number | undefined, any, any>,
  f9_d4_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()) as z.ZodType<number | undefined, any, any>,
  f10_d4_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()) as z.ZodType<number | undefined, any, any>,
  f1_d6_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()) as z.ZodType<number | undefined, any, any>,
  f2_d6_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()) as z.ZodType<number | undefined, any, any>,
  f3_d6_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()) as z.ZodType<number | undefined, any, any>,
  f4_d6_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()) as z.ZodType<number | undefined, any, any>,
  f5_d6_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()) as z.ZodType<number | undefined, any, any>,
  f6_d6_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()) as z.ZodType<number | undefined, any, any>,
  f7_d6_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()) as z.ZodType<number | undefined, any, any>,
  f8_d6_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()) as z.ZodType<number | undefined, any, any>,
  f9_d6_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()) as z.ZodType<number | undefined, any, any>,
  f10_d6_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()) as z.ZodType<number | undefined, any, any>,
  f1_d6_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()) as z.ZodType<number | undefined, any, any>,
  f2_d6_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()) as z.ZodType<number | undefined, any, any>,
  f3_d6_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()) as z.ZodType<number | undefined, any, any>,
  f4_d6_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()) as z.ZodType<number | undefined, any, any>,
  f5_d6_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()) as z.ZodType<number | undefined, any, any>,
  f6_d6_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()) as z.ZodType<number | undefined, any, any>,
  f7_d6_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()) as z.ZodType<number | undefined, any, any>,
  f8_d6_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()) as z.ZodType<number | undefined, any, any>,
  f9_d6_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()) as z.ZodType<number | undefined, any, any>,
  f10_d6_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()) as z.ZodType<number | undefined, any, any>,
}).superRefine((data, ctx) => {
  // Check M1
  const m1_full = data.mbj20_f != null || data.mbj20_s != null;

  // Check M2
  const m2_full = data.jm103_s != null;

  // Check M3
  const m3_full = data.tsb != null;

  // Check M4 (D4) Forehead
  const d4_f_values = [data.f1_d4_f, data.f2_d4_f, data.f3_d4_f, data.f4_d4_f, data.f5_d4_f, data.f6_d4_f, data.f7_d4_f, data.f8_d4_f, data.f9_d4_f, data.f10_d4_f];
  const d4_f_partial = d4_f_values.some(v => v != null);
  const d4_f_full = d4_f_values.every(v => v != null);
  
  if (d4_f_partial && !d4_f_full) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Machine 4 (D4) Forehead requires all 10 fields to be completely filled.', path: ['f1_d4_f'] });
  }

  // Check M4 (D4) Sternum
  const d4_s_values = [data.f1_d4_s, data.f2_d4_s, data.f3_d4_s, data.f4_d4_s, data.f5_d4_s, data.f6_d4_s, data.f7_d4_s, data.f8_d4_s, data.f9_d4_s, data.f10_d4_s];
  const d4_s_partial = d4_s_values.some(v => v != null);
  const d4_s_full = d4_s_values.every(v => v != null);
  
  if (d4_s_partial && !d4_s_full) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Machine 4 (D4) Sternum requires all 10 fields to be completely filled.', path: ['f1_d4_s'] });
  }

  // Check M5 (D6) Forehead
  const d6_f_values = [data.f1_d6_f, data.f2_d6_f, data.f3_d6_f, data.f4_d6_f, data.f5_d6_f, data.f6_d6_f, data.f7_d6_f, data.f8_d6_f, data.f9_d6_f, data.f10_d6_f];
  const d6_f_partial = d6_f_values.some(v => v != null);
  const d6_f_full = d6_f_values.every(v => v != null);

  if (d6_f_partial && !d6_f_full) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Machine 5 (D6) Forehead requires all 10 fields to be completely filled.', path: ['f1_d6_f'] });
  }

  // Check M5 (D6) Sternum
  const d6_s_values = [data.f1_d6_s, data.f2_d6_s, data.f3_d6_s, data.f4_d6_s, data.f5_d6_s, data.f6_d6_s, data.f7_d6_s, data.f8_d6_s, data.f9_d6_s, data.f10_d6_s];
  const d6_s_partial = d6_s_values.some(v => v != null);
  const d6_s_full = d6_s_values.every(v => v != null);

  if (d6_s_partial && !d6_s_full) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Machine 5 (D6) Sternum requires all 10 fields to be completely filled.', path: ['f1_d6_s'] });
  }

  // Enforce at least one of MBJ20, JM103, TSB
  if (!m1_full && !m2_full && !m3_full) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'At least one of MBJ20, JM103, or TSB must be provided.',
      path: ['mbj20_f'],
    });
  }
});

export type SampleFormValues = z.infer<typeof sampleSchema>;

interface SampleFormProps {
  onSubmit: (data: SampleFormValues) => void;
  onCancel: () => void;
  isLoading?: boolean;
  initialValues?: Partial<SampleFormValues>;
  submitLabel?: string;
}

const ReadingGrid = ({ device, title, register, watch, handleKeyDown, errors }: any) => {
  const fields = Array.from({ length: 10 }, (_, i) => i + 1);
  const f_error = errors?.[`f1_${device}_f`]?.message;
  const s_error = errors?.[`f1_${device}_s`]?.message;
  
  return (
    <div className="space-y-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
      <h3 className="text-lg font-bold text-slate-800">{title}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Forehead Section */}
        <div className={`space-y-4 p-3 rounded-lg border ${f_error ? 'border-red-500' : 'border-transparent'}`}>
          <h4 className="font-semibold text-slate-700 border-b pb-2">Forehead</h4>
          <div className="grid grid-cols-5 gap-2">
            {fields.map((n) => {
              const fieldName = `f${n}_${device}_f`;
              const reg = register(fieldName);
              const val = watch(fieldName);
              const isEmpty = val === '' || val == null || Number.isNaN(val as any);
              const hasFieldErr = f_error && isEmpty;
              return (
                <div key={fieldName} className="flex flex-col space-y-1">
                  <label className="text-sm font-medium text-slate-700">F{n}</label>
                  <input
                    type="number"
                    step="any"
                    name={reg.name}
                    onChange={reg.onChange}
                    onBlur={reg.onBlur}
                    onKeyDown={handleKeyDown}
                    ref={reg.ref}
                    className={`px-3 py-2 border rounded-xl text-slate-900 bg-white focus:outline-none focus:ring-2 ${hasFieldErr ? 'border-red-500 ring-1 ring-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-blue-500'}`}
                  />
                </div>
              );
            })}
          </div>
          {f_error && <p className="text-sm text-red-600 mt-2">{f_error}</p>}
        </div>

        {/* Sternum Section */}
        <div className={`space-y-4 p-3 rounded-lg border ${s_error ? 'border-red-500' : 'border-transparent'}`}>
          <h4 className="font-semibold text-slate-700 border-b pb-2">Sternum</h4>
          <div className="grid grid-cols-5 gap-2">
            {fields.map((n) => {
              const fieldName = `f${n}_${device}_s`;
              const reg = register(fieldName);
              const val = watch(fieldName);
              const isEmpty = val === '' || val == null || Number.isNaN(val as any);
              const hasFieldErr = s_error && isEmpty;
              return (
                <div key={fieldName} className="flex flex-col space-y-1">
                  <label className="text-sm font-medium text-slate-700">F{n}</label>
                  <input
                    type="number"
                    step="any"
                    name={reg.name}
                    onChange={reg.onChange}
                    onBlur={reg.onBlur}
                    onKeyDown={handleKeyDown}
                    ref={reg.ref}
                    className={`px-3 py-2 border rounded-xl text-slate-900 bg-white focus:outline-none focus:ring-2 ${hasFieldErr ? 'border-red-500 ring-1 ring-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-blue-500'}`}
                  />
                </div>
              );
            })}
          </div>
          {s_error && <p className="text-sm text-red-600 mt-2">{s_error}</p>}
        </div>
      </div>
    </div>
  );
};

const SampleForm: React.FC<SampleFormProps> = ({ onSubmit, onCancel, isLoading, initialValues, submitLabel = "Save Sample" }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SampleFormValues>({
    resolver: zodResolver(sampleSchema),
    defaultValues: initialValues,
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const form = (e.target as HTMLInputElement).form;
      if (form) {
        const elements = Array.from(form.elements) as HTMLInputElement[];
        const currentIndex = elements.indexOf(e.target as HTMLInputElement);
        if (currentIndex < elements.length - 1) {
          elements[currentIndex + 1].focus();
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Hidden Shift Input */}
      <input type="hidden" {...register('shift')} />

      <Input 
        label="Weight (grams) *" 
        type="number" 
        step="any" 
        placeholder="e.g. 2500" 
        onKeyDown={handleKeyDown}
        {...register('weight')} 
        error={errors.weight?.message as string} 
      />

      {/* Machine 1: MBJ20 */}
      <div className={`p-4 bg-blue-50/50 border rounded-xl space-y-4 ${errors.mbj20_f ? 'border-red-500' : 'border-blue-100'}`}>
        <h3 className="text-lg font-bold text-blue-900">Machine 1: MBJ20</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Forehead" type="number" step="any" onKeyDown={handleKeyDown} {...register('mbj20_f')} />
          <Input label="Sternum" type="number" step="any" onKeyDown={handleKeyDown} {...register('mbj20_s')} />
        </div>
        {errors.mbj20_f && <p className="text-sm text-red-600 mt-2">{errors.mbj20_f.message as string}</p>}
      </div>

      {/* Machine 2: JM103 */}
      <div className={`p-4 bg-emerald-50/50 border rounded-xl space-y-4 ${errors.mbj20_f ? 'border-red-500' : 'border-emerald-100'}`}>
        <h3 className="text-lg font-bold text-emerald-900">Machine 2: JM103</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Sternum" type="number" step="any" onKeyDown={handleKeyDown} {...register('jm103_s')} error={errors.jm103_s?.message as string} />
        </div>
      </div>

      {/* Machine 3: TSB */}
      <div className={`p-4 bg-purple-50/50 border rounded-xl space-y-4 ${errors.mbj20_f ? 'border-red-500' : 'border-purple-100'}`}>
        <h3 className="text-lg font-bold text-purple-900">Machine 3: TSB</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="TSB Reading" type="number" step="any" onKeyDown={handleKeyDown} {...register('tsb')} error={errors.tsb?.message as string} />
        </div>
      </div>

      {/* Machine 4: D4 */}
      <ReadingGrid device="d4" title="Machine 4: D4" register={register} watch={watch} handleKeyDown={handleKeyDown} errors={errors} />
      
      {/* Machine 5: D6 */}
      <ReadingGrid device="d6" title="Machine 5: D6" register={register} watch={watch} handleKeyDown={handleKeyDown} errors={errors} />

      <Input label="Remarks" type="text" placeholder="Optional notes" onKeyDown={handleKeyDown} {...register('remarks')} error={errors.remarks?.message as string} />

      {/* Display validation errors */}
      {(errors.weight || errors.day) && (
        <div className="space-y-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          {errors.weight && (
            <p className="text-xs text-red-700">{errors.weight.message as string}</p>
          )}
          {errors.day && (
            <p className="text-xs text-red-700">{errors.day.message as string}</p>
          )}
        </div>
      )}

      <div className="pt-4 flex items-center justify-end space-x-3 border-t border-slate-200 mt-6">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isLoading}>Cancel</Button>
        <Button type="submit" isLoading={isLoading}>{submitLabel}</Button>
      </div>
    </form>
  );
};

export default SampleForm;
