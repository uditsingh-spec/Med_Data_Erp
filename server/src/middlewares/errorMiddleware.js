"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFound = void 0;
const zod_1 = require("zod");
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};
exports.notFound = notFound;
const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;
    if (err instanceof zod_1.ZodError || err.name === 'ZodError') {
        statusCode = 400;
        const issues = err.issues || [];
        message = issues.map((e) => e.message).join(', ');
    }
    else if (err.name === 'ValidationError') {
        // Handle Mongoose Validation Error
        statusCode = 400;
        message = Object.values(err.errors).map(e => e.message).join(', ');
    }
    else if (err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = 404;
        message = 'Resource not found';
    }
    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorMiddleware.js.map