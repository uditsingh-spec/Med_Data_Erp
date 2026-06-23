"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBabySchema = exports.babySchema = void 0;
const zod_1 = require("zod");
exports.babySchema = zod_1.z.object({
    motherName: zod_1.z.string().min(2, 'Mother Name must be at least 2 characters'),
    motherAge: zod_1.z.preprocess((val) => Number(val), zod_1.z.number().min(18).max(60)),
    registeredAt: zod_1.z.string().optional(),
    dob: zod_1.z.string().min(1, 'Date of Birth is required'),
    isTwin: zod_1.z.preprocess((val) => val === 'true' || val === true, zod_1.z.boolean()),
    // Single baby fields
    weight: zod_1.z.preprocess((val) => val === undefined || val === '' || val === null ? undefined : Number(val), zod_1.z.number().min(500).max(5000)).optional(),
    gender: zod_1.z.enum(['Male', 'Female']).optional(),
    gestationalAge: zod_1.z.string().regex(/^(3[0-9]|4[0-2])W(-[0-6]D)?$/, 'Gestational Age must be valid (e.g. 36W or 36W-2D)').optional(),
    termStatus: zod_1.z.enum(['Term', 'Preterm']),
    // Twin fields
    weightA: zod_1.z.preprocess((val) => val === undefined || val === '' || val === null ? undefined : Number(val), zod_1.z.number().min(500).max(5000)).optional(),
    genderA: zod_1.z.enum(['Male', 'Female']).optional(),
    weightB: zod_1.z.preprocess((val) => val === undefined || val === '' || val === null ? undefined : Number(val), zod_1.z.number().min(500).max(5000)).optional(),
    genderB: zod_1.z.enum(['Male', 'Female']).optional(),
}).refine(data => {
    if (data.isTwin) {
        return data.weightA !== undefined && data.genderA && data.weightB !== undefined && data.genderB && data.gestationalAge;
    }
    else {
        return data.weight !== undefined && data.gender && data.gestationalAge;
    }
}, { message: "Missing required fields for single or twin selection" });
exports.updateBabySchema = zod_1.z.object({
    motherName: zod_1.z.string().min(2, 'Mother Name must be at least 2 characters').optional(),
    motherAge: zod_1.z.preprocess((val) => val === undefined || val === '' || val === null ? undefined : Number(val), zod_1.z.number().min(18).max(60)).optional(),
    dob: zod_1.z.string().min(1, 'Date of Birth is required').optional(),
    weight: zod_1.z.preprocess((val) => val === undefined || val === '' || val === null ? undefined : Number(val), zod_1.z.number().min(500).max(5000)).optional(),
    gender: zod_1.z.enum(['Male', 'Female']).optional(),
    gestationalAge: zod_1.z.string().regex(/^(3[0-9]|4[0-2])W(-[0-6]D)?$/, 'Gestational Age must be valid (e.g. 36W or 36W-2D)').optional(),
    termStatus: zod_1.z.enum(['Term', 'Preterm']).optional(),
});
//# sourceMappingURL=babyValidators.js.map