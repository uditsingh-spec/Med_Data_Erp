"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employeeController_1 = require("../controllers/employeeController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.use(authMiddleware_1.authMiddleware);
router.use(authMiddleware_1.adminMiddleware);
router.route('/')
    .get(employeeController_1.getEmployees)
    .post(employeeController_1.createEmployee);
router.route('/:id')
    .put(employeeController_1.updateEmployee)
    .delete(employeeController_1.deleteEmployee);
router.patch('/:id/reset-password', employeeController_1.resetPassword);
router.patch('/:id/toggle-status', employeeController_1.toggleStatus);
exports.default = router;
//# sourceMappingURL=employeeRoutes.js.map