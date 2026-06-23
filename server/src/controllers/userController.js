"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = void 0;
const User_1 = __importDefault(require("../models/User"));
const getMe = async (req, res, next) => {
    try {
        const user = await User_1.default.findById(req.user._id);
        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
            });
            return;
        }
        else {
            res.status(404).json({ message: 'User not found' });
            return;
        }
    }
    catch (error) {
        next(error);
    }
};
exports.getMe = getMe;
//# sourceMappingURL=userController.js.map