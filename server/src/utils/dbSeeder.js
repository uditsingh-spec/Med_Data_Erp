"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDefaultAdmin = void 0;
const User_1 = __importDefault(require("../models/User"));
const seedDefaultAdmin = async () => {
    try {
        const adminExists = await User_1.default.findOne({ role: 'admin' });
        if (!adminExists) {
            await User_1.default.create({
                employeeId: 'ADMIN-0001',
                name: 'Super Admin',
                email: 'admin@hospital.com',
                password: 'admin123',
                role: 'admin',
                isActive: true,
            });
            console.log('Default Admin (ADMIN-0001) created successfully.');
        }
    }
    catch (error) {
        console.error('Error seeding default admin:', error);
    }
};
exports.seedDefaultAdmin = seedDefaultAdmin;
//# sourceMappingURL=dbSeeder.js.map