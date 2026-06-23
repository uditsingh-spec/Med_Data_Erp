import express from 'express';
import { deleteSample, updateSample } from '../controllers/sampleController';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/:id')
  .put(authMiddleware, updateSample)
  .delete(authMiddleware, deleteSample);

export default router;
