"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const check = async () => {
    await mongoose_1.default.connect(process.env.MONGODB_URI);
    const db = mongoose_1.default.connection.db;
    const admin = await db?.collection('users').findOne({ employeeId: 'ADMIN-0001' });
    console.log('Admin:', admin);
    process.exit(0);
};
check();
//# sourceMappingURL=checkAdmin.js.map