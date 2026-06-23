import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { generateEmployeeId } from '../utils/employeeUtils';

export const getEmployees = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const employees = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(employees);
  } catch (error) {
    next(error);
  }
};

export const createEmployee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;
    
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      res.status(400).json({ message: 'Email already exists' });
      return;
    }

    const employeeId = await generateEmployeeId(name);

    const employee = await User.create({
      employeeId,
      name,
      email,
      password,
      role,
      createdBy: req.user._id,
    });

    res.status(201).json({
      _id: employee._id,
      employeeId: employee.employeeId,
      name: employee.name,
      email: employee.email,
      role: employee.role,
      isActive: employee.isActive,
      createdAt: employee.createdAt,
    });
  } catch (error) {
    next(error);
  }
};

export const updateEmployee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, role } = req.body;
    
    const employee = await User.findById(req.params.id);
    if (!employee) {
      res.status(404).json({ message: 'Employee not found' });
      return;
    }

    if (email !== employee.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        res.status(400).json({ message: 'Email already exists' });
        return;
      }
    }

    employee.name = name || employee.name;
    employee.email = email || employee.email;
    employee.role = role || employee.role;

    const updatedEmployee = await employee.save();
    res.json({
      _id: updatedEmployee._id,
      employeeId: updatedEmployee.employeeId,
      name: updatedEmployee.name,
      email: updatedEmployee.email,
      role: updatedEmployee.role,
      isActive: updatedEmployee.isActive,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteEmployee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const employee = await User.findById(req.params.id);
    if (!employee) {
      res.status(404).json({ message: 'Employee not found' });
      return;
    }
    
    // Prevent deleting self or the default admin
    if (employee._id.toString() === req.user._id.toString()) {
      res.status(400).json({ message: 'You cannot delete yourself' });
      return;
    }

    await employee.deleteOne();
    res.json({ message: 'Employee removed' });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { password } = req.body;
    const employee = await User.findById(req.params.id);
    if (!employee) {
      res.status(404).json({ message: 'Employee not found' });
      return;
    }

    employee.password = password;
    await employee.save();

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    next(error);
  }
};

export const toggleStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const employee = await User.findById(req.params.id);
    if (!employee) {
      res.status(404).json({ message: 'Employee not found' });
      return;
    }

    if (employee._id.toString() === req.user._id.toString()) {
      res.status(400).json({ message: 'You cannot disable yourself' });
      return;
    }

    employee.isActive = !employee.isActive;
    await employee.save();

    res.json({
      _id: employee._id,
      isActive: employee.isActive,
      message: employee.isActive ? 'Employee activated' : 'Employee disabled'
    });
  } catch (error) {
    next(error);
  }
};
