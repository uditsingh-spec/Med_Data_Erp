import { z } from 'zod';
export declare const babySchema: z.ZodObject<{
    motherName: z.ZodString;
    motherAge: z.ZodPreprocess<z.ZodNumber>;
    registeredAt: z.ZodOptional<z.ZodString>;
    dob: z.ZodString;
    isTwin: z.ZodPreprocess<z.ZodBoolean>;
    weight: z.ZodOptional<z.ZodPreprocess<z.ZodNumber>>;
    gender: z.ZodOptional<z.ZodEnum<{
        Male: "Male";
        Female: "Female";
    }>>;
    gestationalAge: z.ZodOptional<z.ZodString>;
    termStatus: z.ZodEnum<{
        Term: "Term";
        Preterm: "Preterm";
    }>;
    weightA: z.ZodOptional<z.ZodPreprocess<z.ZodNumber>>;
    genderA: z.ZodOptional<z.ZodEnum<{
        Male: "Male";
        Female: "Female";
    }>>;
    weightB: z.ZodOptional<z.ZodPreprocess<z.ZodNumber>>;
    genderB: z.ZodOptional<z.ZodEnum<{
        Male: "Male";
        Female: "Female";
    }>>;
}, z.core.$strip>;
export declare const updateBabySchema: z.ZodObject<{
    motherName: z.ZodOptional<z.ZodString>;
    motherAge: z.ZodOptional<z.ZodPreprocess<z.ZodNumber>>;
    dob: z.ZodOptional<z.ZodString>;
    weight: z.ZodOptional<z.ZodPreprocess<z.ZodNumber>>;
    gender: z.ZodOptional<z.ZodEnum<{
        Male: "Male";
        Female: "Female";
    }>>;
    gestationalAge: z.ZodOptional<z.ZodString>;
    termStatus: z.ZodOptional<z.ZodEnum<{
        Term: "Term";
        Preterm: "Preterm";
    }>>;
}, z.core.$strip>;
//# sourceMappingURL=babyValidators.d.ts.map