"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoSanitize = void 0;
const sanitizeObject = (obj) => {
    if (obj instanceof Object) {
        for (const key in obj) {
            if (key.startsWith('$')) {
                delete obj[key];
            }
            else {
                sanitizeObject(obj[key]);
            }
        }
    }
    return obj;
};
const mongoSanitize = (req, res, next) => {
    if (req.body)
        sanitizeObject(req.body);
    if (req.query)
        sanitizeObject(req.query);
    if (req.params)
        sanitizeObject(req.params);
    next();
};
exports.mongoSanitize = mongoSanitize;
//# sourceMappingURL=sanitizeMiddleware.js.map