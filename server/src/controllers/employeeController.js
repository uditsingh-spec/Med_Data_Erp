"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleStatus = exports.resetPassword = exports.deleteEmployee = exports.updateEmployee = exports.createEmployee = exports.getEmployees = void 0;
const User_1 = __importDefault(require("../models/User"));
const employeeUtils_1 = require("../utils/employeeUtils");
const getEmployees = async (req, res, next) => {
    try {
        const employees = await User_1.default.find().select('-password').sort({ createdAt: -1 });
        res.json(employees);
    }
    catch (error) {
        next(error);
    }
};
exports.getEmployees = getEmployees;
const createEmployee = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
        const emailExists = await User_1.default.findOne({ email });
        if (emailExists) {
            res.status(400).json({ message: 'Email already exists' });
            return;
        }
        const employeeId = await (0, employeeUtils_1.generateEmployeeId)(name);
        const employee = await User_1.default.create({
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
    }
    catch (error) {
        next(error);
    }
};
exports.createEmployee = createEmployee;
const updateEmployee = async (req, res, next) => {
    try {
        const { name, email, role } = req.body;
        const employee = await User_1.default.findById(req.params.id);
        if (!employee) {
            res.status(404).json({ message: 'Employee not found' });
            return;
        }
        if (email !== employee.email) {
            const emailExists = await User_1.default.findOne({ email });
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
    }
    catch (error) {
        next(error);
    }
};
exports.updateEmployee = updateEmployee;
const deleteEmployee = async (req, res, next) => {
    try {
        const employee = await User_1.default.findById(req.params.id);
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
    }
    catch (error) {
        next(error);
    }
};
exports.deleteEmployee = deleteEmployee;
const resetPassword = async (req, res, next) => {
    try {
        const { password } = req.body;
        const employee = await User_1.default.findById(req.params.id);
        if (!employee) {
            res.status(404).json({ message: 'Employee not found' });
            return;
        }
        employee.password = password;
        await employee.save();
        res.json({ message: 'Password reset successfully' });
    }
    catch (error) {
        next(error);
    }
};
exports.resetPassword = resetPassword;
const toggleStatus = async (req, res, next) => {
    try {
        const employee = await User_1.default.findById(req.params.id);
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
    }
    catch (error) {
        next(error);
    }
};
exports.toggleStatus = toggleStatus;
//# sourceMappingURL=employeeController.js.map