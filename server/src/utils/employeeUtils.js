"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEmployeeId = void 0;
const User_1 = __importDefault(require("../models/User"));
const generateEmployeeId = async (name) => {
    const firstName = name.trim().split(' ')[0].toUpperCase().replace(/[^A-Z]/g, '');
    let isUnique = false;
    let newId = '';
    while (!isUnique) {
        const randomDigits = Math.floor(1000 + Math.random() * 9000).toString();
        newId = `${firstName}-${randomDigits}`;
        const existingUser = await User_1.default.findOne({ employeeId: newId });
        if (!existingUser) {
            isUnique = true;
        }
    }
    return newId;
};
exports.generateEmployeeId = generateEmployeeId;
//# sourceMappingURL=employeeUtils.js.map