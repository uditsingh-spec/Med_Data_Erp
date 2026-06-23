"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const observationController_1 = require("../controllers/observationController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.route('/')
    .get(authMiddleware_1.authMiddleware, observationController_1.getAllObservations);
exports.default = router;
//# sourceMappingURL=observationRoutes.js.map