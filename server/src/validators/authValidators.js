"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    employeeId: zod_1.z.string().min(1, 'Employee ID is required'),
    password: zod_1.z.string().min(1, 'Password is required'),
});
//# sourceMappingURL=authValidators.js.map