"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowRoles = void 0;
const allowRoles = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            res.status(403).json({ message: 'Forbidden, insufficient permissions' });
            return;
        }
        next();
    };
};
exports.allowRoles = allowRoles;
//# sourceMappingURL=roleMiddleware.js.map