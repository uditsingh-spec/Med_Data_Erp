import express from 'express';
import { createBaby, getBabies, getBabyById, getBabySamples, createSample, deleteBaby, updateBaby } from '../controllers/babyController';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware';
import { upload } from '../middlewares/uploadMiddleware';

const router = express.Router();

router.route('/')
  .post(authMiddleware, upload.single('motherImage'), createBaby)
  .get(authMiddleware, getBabies);

router.route('/:id')
  .get(authMiddleware, getBabyById)
  .put(authMiddleware, adminMiddleware, upload.single('motherImage'), updateBaby)
  .delete(authMiddleware, adminMiddleware, deleteBaby);

router.route('/:id/samples')
  .get(authMiddleware, getBabySamples)
  .post(authMiddleware, createSample);

export default router;
