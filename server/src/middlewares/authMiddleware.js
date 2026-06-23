"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const authMiddleware = async (req, res, next) => {
    try {
        let token = req.cookies.jwt;
        if (!token) {
            res.status(401).json({ message: 'Not authorized, no token' });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = await User_1.default.findById(decoded.userId).select('-password');
        next();
    }
    catch (error) {
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({ message: 'Not authorized, token expired' });
        }
        else {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
        return;
    }
};
exports.authMiddleware = authMiddleware;
const adminMiddleware = async (req, res, next) => {
    if (req.user && (req.user.role?.toLowerCase() === 'admin' || req.user.role?.toLowerCase() === 'super_admin')) {
        next();
    }
    else {
        res.status(403).json({ message: 'Not authorized as an admin' });
    }
};
exports.adminMiddleware = adminMiddleware;
//# sourceMappingURL=authMiddleware.js.map