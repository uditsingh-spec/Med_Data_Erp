"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const db_1 = __importDefault(require("./config/db"));
const dbSeeder_1 = require("./utils/dbSeeder");
const PORT = process.env.PORT || 5000;
(0, db_1.default)().then(async () => {
    await (0, dbSeeder_1.seedDefaultAdmin)();
    app_1.default.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
});
//# sourceMappingURL=server.js.map