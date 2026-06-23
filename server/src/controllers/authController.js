"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = void 0;
const User_1 = __importDefault(require("../models/User"));
const jwt_1 = require("../utils/jwt");
const authValidators_1 = require("../validators/authValidators");
const login = async (req, res, next) => {
    try {
        const validatedData = authValidators_1.loginSchema.parse(req.body);
        const user = await User_1.default.findOne({ employeeId: validatedData.employeeId }).select('+password');
        if (user && (await user.comparePassword(validatedData.password))) {
            if (!user.isActive) {
                res.status(403).json({ message: 'Your account has been disabled. Please contact administrator.' });
                return;
            }
            user.lastLogin = new Date();
            await user.save();
            const token = (0, jwt_1.generateTokenAndSetCookie)(res, user._id, user.role);
            res.json({
                token,
                user: {
                    _id: user._id,
                    employeeId: user.employeeId,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                }
            });
            return;
        }
        else {
            res.status(401).json({ message: 'Invalid Employee ID or password' });
            return;
        }
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
const logout = async (req, res, next) => {
    try {
        res.cookie('jwt', '', {
            httpOnly: true,
            expires: new Date(0),
        });
        res.status(200).json({ message: 'Logged out successfully' });
        return;
    }
    catch (error) {
        next(error);
    }
};
exports.logout = logout;
//# sourceMappingURL=authController.js.map