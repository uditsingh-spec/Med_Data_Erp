import express from 'express';
import { getAllObservations } from '../controllers/observationController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/')
  .get(authMiddleware, getAllObservations);

export default router;
