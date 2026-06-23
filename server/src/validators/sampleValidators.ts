import { z } from 'zod';

export const createSampleSchema = z.object({
  weight: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number({ message: "Weight is required" }).min(500, 'Weight must be at least 500g').max(5000, 'Weight cannot exceed 5000g')),
  day: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().min(1, 'Day must be at least 1').optional()),
  shift: z.enum(['M', 'E']).optional(),
  mbj20_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  mbj20_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  jm103_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  tsb: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f1_d4_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f2_d4_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f3_d4_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f4_d4_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f5_d4_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f6_d4_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f7_d4_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f8_d4_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f9_d4_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f10_d4_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f1_d4_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f2_d4_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f3_d4_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f4_d4_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f5_d4_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f6_d4_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f7_d4_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f8_d4_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f9_d4_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f10_d4_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f1_d6_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f2_d6_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f3_d6_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f4_d6_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f5_d6_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f6_d6_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f7_d6_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f8_d6_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f9_d6_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f10_d6_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f1_d6_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f2_d6_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f3_d6_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f4_d6_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f5_d6_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f6_d6_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f7_d6_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f8_d6_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f9_d6_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f10_d6_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  remarks: z.string().max(250, 'Remarks cannot exceed 250 characters').optional(),
}).superRefine((data, ctx) => {
  const m1_full = data.mbj20_f != null || data.mbj20_s != null;

  const m2_full = data.jm103_s != null;
  const m3_full = data.tsb != null;

  const d4_f_values = [data.f1_d4_f, data.f2_d4_f, data.f3_d4_f, data.f4_d4_f, data.f5_d4_f, data.f6_d4_f, data.f7_d4_f, data.f8_d4_f, data.f9_d4_f, data.f10_d4_f];
  const d4_f_partial = d4_f_values.some(v => v != null);
  const d4_f_full = d4_f_values.every(v => v != null);
  if (d4_f_partial && !d4_f_full) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Machine 4 (D4) Forehead requires all 10 fields to be completely filled.', path: ['f1_d4_f'] });
  }

  const d4_s_values = [data.f1_d4_s, data.f2_d4_s, data.f3_d4_s, data.f4_d4_s, data.f5_d4_s, data.f6_d4_s, data.f7_d4_s, data.f8_d4_s, data.f9_d4_s, data.f10_d4_s];
  const d4_s_partial = d4_s_values.some(v => v != null);
  const d4_s_full = d4_s_values.every(v => v != null);
  if (d4_s_partial && !d4_s_full) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Machine 4 (D4) Sternum requires all 10 fields to be completely filled.', path: ['f1_d4_s'] });
  }

  const d6_f_values = [data.f1_d6_f, data.f2_d6_f, data.f3_d6_f, data.f4_d6_f, data.f5_d6_f, data.f6_d6_f, data.f7_d6_f, data.f8_d6_f, data.f9_d6_f, data.f10_d6_f];
  const d6_f_partial = d6_f_values.some(v => v != null);
  const d6_f_full = d6_f_values.every(v => v != null);
  if (d6_f_partial && !d6_f_full) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Machine 5 (D6) Forehead requires all 10 fields to be completely filled.', path: ['f1_d6_f'] });
  }

  const d6_s_values = [data.f1_d6_s, data.f2_d6_s, data.f3_d6_s, data.f4_d6_s, data.f5_d6_s, data.f6_d6_s, data.f7_d6_s, data.f8_d6_s, data.f9_d6_s, data.f10_d6_s];
  const d6_s_partial = d6_s_values.some(v => v != null);
  const d6_s_full = d6_s_values.every(v => v != null);
  if (d6_s_partial && !d6_s_full) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Machine 5 (D6) Sternum requires all 10 fields to be completely filled.', path: ['f1_d6_s'] });
  }

  if (!m1_full && !m2_full && !m3_full) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'At least one of MBJ20, JM103, or TSB must be provided.', path: ['mbj20_f'] });
  }
});

export const updateSampleSchema = z.object({
  weight: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number({ message: "Weight is required" }).min(500, 'Weight must be at least 500g').max(5000, 'Weight cannot exceed 5000g')).optional(),
  mbj20_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  mbj20_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  jm103_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  tsb: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f1_d4_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f2_d4_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f3_d4_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f4_d4_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f5_d4_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f6_d4_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f7_d4_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f8_d4_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f9_d4_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f10_d4_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f1_d4_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f2_d4_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f3_d4_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f4_d4_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f5_d4_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f6_d4_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f7_d4_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f8_d4_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f9_d4_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f10_d4_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f1_d6_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f2_d6_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f3_d6_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f4_d6_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f5_d6_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f6_d6_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f7_d6_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f8_d6_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f9_d6_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f10_d6_f: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f1_d6_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f2_d6_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f3_d6_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f4_d6_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f5_d6_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f6_d6_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f7_d6_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f8_d6_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f9_d6_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  f10_d6_s: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
  remarks: z.string().max(250, 'Remarks cannot exceed 250 characters').optional(),
}).superRefine((data, ctx) => {
  const m1_full = data.mbj20_f != null || data.mbj20_s != null;

  const m2_full = data.jm103_s != null;
  const m3_full = data.tsb != null;

  const d4_f_values = [data.f1_d4_f, data.f2_d4_f, data.f3_d4_f, data.f4_d4_f, data.f5_d4_f, data.f6_d4_f, data.f7_d4_f, data.f8_d4_f, data.f9_d4_f, data.f10_d4_f];
  const d4_f_partial = d4_f_values.some(v => v != null);
  const d4_f_full = d4_f_values.every(v => v != null);
  if (d4_f_partial && !d4_f_full) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Machine 4 (D4) Forehead requires all 10 fields to be completely filled.', path: ['f1_d4_f'] });
  }

  const d4_s_values = [data.f1_d4_s, data.f2_d4_s, data.f3_d4_s, data.f4_d4_s, data.f5_d4_s, data.f6_d4_s, data.f7_d4_s, data.f8_d4_s, data.f9_d4_s, data.f10_d4_s];
  const d4_s_partial = d4_s_values.some(v => v != null);
  const d4_s_full = d4_s_values.every(v => v != null);
  if (d4_s_partial && !d4_s_full) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Machine 4 (D4) Sternum requires all 10 fields to be completely filled.', path: ['f1_d4_s'] });
  }

  const d6_f_values = [data.f1_d6_f, data.f2_d6_f, data.f3_d6_f, data.f4_d6_f, data.f5_d6_f, data.f6_d6_f, data.f7_d6_f, data.f8_d6_f, data.f9_d6_f, data.f10_d6_f];
  const d6_f_partial = d6_f_values.some(v => v != null);
  const d6_f_full = d6_f_values.every(v => v != null);
  if (d6_f_partial && !d6_f_full) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Machine 5 (D6) Forehead requires all 10 fields to be completely filled.', path: ['f1_d6_f'] });
  }

  const d6_s_values = [data.f1_d6_s, data.f2_d6_s, data.f3_d6_s, data.f4_d6_s, data.f5_d6_s, data.f6_d6_s, data.f7_d6_s, data.f8_d6_s, data.f9_d6_s, data.f10_d6_s];
  const d6_s_partial = d6_s_values.some(v => v != null);
  const d6_s_full = d6_s_values.every(v => v != null);
  if (d6_s_partial && !d6_s_full) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Machine 5 (D6) Sternum requires all 10 fields to be completely filled.', path: ['f1_d6_s'] });
  }

  if (!m1_full && !m2_full && !m3_full) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'At least one of MBJ20, JM103, or TSB must be provided.', path: ['mbj20_f'] });
  }
});
