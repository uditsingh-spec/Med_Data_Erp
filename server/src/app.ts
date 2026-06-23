import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
// import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import babyRoutes from './routes/babyRoutes';
import dashboardRoutes from './routes/dashboardRoutes';
import sampleRoutes from './routes/sampleRoutes';
import employeeRoutes from './routes/employeeRoutes';
import observationRoutes from './routes/observationRoutes';
import { notFound, errorHandler } from './middlewares/errorMiddleware';
import { mongoSanitize } from './middlewares/sanitizeMiddleware';
// Notice: No xss-clean as it is deprecated and not easily available in types. We rely on zod validation and React escaping.

dotenv.config();

const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.VITE_API_BASE_URL ? process.env.VITE_API_BASE_URL.replace('/api', '') : 'http://localhost:5173',
  credentials: true,
}));

app.use(mongoSanitize);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'development' ? 1000 : 100,
  message: { message: 'Too many requests from this IP, please try again after 15 minutes' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

// Built-in Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/babies', babyRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/samples', sampleRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/observations', observationRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error Handling
app.use(notFound);
app.use(errorHandler);

export default app;
