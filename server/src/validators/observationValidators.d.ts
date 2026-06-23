import { z } from 'zod';
export declare const createObservationSchema: z.ZodObject<{
    MBJ20: z.ZodOptional<z.ZodEnum<{
        S: "S";
        F: "F";
    }>>;
    JM103: z.ZodOptional<z.ZodEnum<{
        S: "S";
        F: "F";
    }>>;
    TSB: z.ZodPreprocess<z.ZodOptional<z.ZodNumber>>;
}, z.core.$strip>;
export declare const updateObservationSchema: z.ZodObject<{
    MBJ20: z.ZodPreprocess<z.ZodOptional<z.ZodEnum<{
        S: "S";
        F: "F";
    }>>>;
    JM103: z.ZodPreprocess<z.ZodOptional<z.ZodEnum<{
        S: "S";
        F: "F";
    }>>>;
    TSB: z.ZodPreprocess<z.ZodOptional<z.ZodNumber>>;
}, z.core.$strip>;
//# sourceMappingURL=observationValidators.d.ts.map