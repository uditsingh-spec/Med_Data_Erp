"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const babyController_1 = require("../controllers/babyController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const uploadMiddleware_1 = require("../middlewares/uploadMiddleware");
const router = express_1.default.Router();
router.route('/')
    .post(authMiddleware_1.authMiddleware, uploadMiddleware_1.upload.single('motherImage'), babyController_1.createBaby)
    .get(authMiddleware_1.authMiddleware, babyController_1.getBabies);
router.route('/:id')
    .get(authMiddleware_1.authMiddleware, babyController_1.getBabyById)
    .put(authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, babyController_1.updateBaby)
    .delete(authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, babyController_1.deleteBaby);
router.route('/:id/samples')
    .get(authMiddleware_1.authMiddleware, babyController_1.getBabySamples)
    .post(authMiddleware_1.authMiddleware, babyController_1.createSample);
exports.default = router;
//# sourceMappingURL=babyRoutes.js.map