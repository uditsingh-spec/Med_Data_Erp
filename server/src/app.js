"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// import mongoSanitize from 'express-mongo-sanitize';
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const babyRoutes_1 = __importDefault(require("./routes/babyRoutes"));
const dashboardRoutes_1 = __importDefault(require("./routes/dashboardRoutes"));
const sampleRoutes_1 = __importDefault(require("./routes/sampleRoutes"));
const employeeRoutes_1 = __importDefault(require("./routes/employeeRoutes"));
const observationRoutes_1 = __importDefault(require("./routes/observationRoutes"));
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
const sanitizeMiddleware_1 = require("./middlewares/sanitizeMiddleware");
// Notice: No xss-clean as it is deprecated and not easily available in types. We rely on zod validation and React escaping.
dotenv_1.default.config();
const app = (0, express_1.default)();
// Security Middlewares
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.VITE_API_BASE_URL ? process.env.VITE_API_BASE_URL.replace('/api', '') : 'http://localhost:5173',
    credentials: true,
}));
app.use(sanitizeMiddleware_1.mongoSanitize);
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: process.env.NODE_ENV === 'development' ? 1000 : 100,
    message: { message: 'Too many requests from this IP, please try again after 15 minutes' },
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api', limiter);
// Built-in Middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
app.use('/api/babies', babyRoutes_1.default);
app.use('/api/dashboard', dashboardRoutes_1.default);
app.use('/api/samples', sampleRoutes_1.default);
app.use('/api/employees', employeeRoutes_1.default);
app.use('/api/observations', observationRoutes_1.default);
app.get('/', (req, res) => {
    res.send('API is running...');
});
// Error Handling
app.use(errorMiddleware_1.notFound);
app.use(errorMiddleware_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map