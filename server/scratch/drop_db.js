"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dropDB = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/med_data_erp');
        console.log('Connected to MongoDB');
        // Drop the collections that hold sample data to ensure fresh start
        try {
            await mongoose_1.default.connection.db?.dropCollection('samples');
        }
        catch (e) { }
        try {
            await mongoose_1.default.connection.db?.dropCollection('dailyobservations_v3');
        }
        catch (e) { }
        try {
            await mongoose_1.default.connection.db?.dropCollection('dailyobservations_v4');
        }
        catch (e) { }
        console.log('Dropped sample collections successfully.');
        process.exit(0);
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
};
dropDB();
//# sourceMappingURL=drop_db.js.map