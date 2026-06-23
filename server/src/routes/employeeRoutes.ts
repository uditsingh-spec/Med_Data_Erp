import express from 'express';
import { getEmployees, createEmployee, updateEmployee, deleteEmployee, resetPassword, toggleStatus } from '../controllers/employeeController';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.use(authMiddleware);
router.use(adminMiddleware);

router.route('/')
  .get(getEmployees)
  .post(createEmployee);

router.route('/:id')
  .put(updateEmployee)
  .delete(deleteEmployee);

router.patch('/:id/reset-password', resetPassword);
router.patch('/:id/toggle-status', toggleStatus);

export default router;
