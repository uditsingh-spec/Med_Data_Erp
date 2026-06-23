"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateObservationSchema = exports.createObservationSchema = void 0;
const zod_1 = require("zod");
exports.createObservationSchema = zod_1.z.object({
    MBJ20: zod_1.z.enum(['F', 'S']).optional(),
    JM103: zod_1.z.enum(['F', 'S']).optional(),
    TSB: zod_1.z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), zod_1.z.number().optional()),
}).refine(data => {
    return data.MBJ20 !== undefined || data.JM103 !== undefined || data.TSB !== undefined;
}, { message: "At least one reading (MBJ20, JM103, or TSB) must be provided." });
exports.updateObservationSchema = zod_1.z.object({
    MBJ20: zod_1.z.preprocess((val) => val === '' ? undefined : val, zod_1.z.enum(['F', 'S']).optional()),
    JM103: zod_1.z.preprocess((val) => val === '' ? undefined : val, zod_1.z.enum(['F', 'S']).optional()),
    TSB: zod_1.z.preprocess((val) => val === '' || val === null || val === undefined ? undefined : Number(val), zod_1.z.number().optional()),
});
//# sourceMappingURL=observationValidators.js.map