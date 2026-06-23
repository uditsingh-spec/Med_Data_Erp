import { z } from 'zod';

export const createObservationSchema = z.object({
  MBJ20: z.enum(['F', 'S']).optional(),
  JM103: z.enum(['F', 'S']).optional(),
  TSB: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
}).refine(data => {
  return data.MBJ20 !== undefined || data.JM103 !== undefined || data.TSB !== undefined;
}, { message: "At least one reading (MBJ20, JM103, or TSB) must be provided." });

export const updateObservationSchema = z.object({
  MBJ20: z.preprocess((val) => val === '' ? undefined : val, z.enum(['F', 'S']).optional()),
  JM103: z.preprocess((val) => val === '' ? undefined : val, z.enum(['F', 'S']).optional()),
  TSB: z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), z.number().optional()),
});
