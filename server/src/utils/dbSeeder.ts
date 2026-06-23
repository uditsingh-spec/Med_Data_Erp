import User from '../models/User';

export const seedDefaultAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      await User.create({
        employeeId: 'ADMIN-0001',
        name: 'Super Admin',
        email: 'admin@hospital.com',
        password: 'admin123',
        role: 'admin',
        isActive: true,
      });
      console.log('Default Admin (ADMIN-0001) created successfully.');
    }
  } catch (error) {
    console.error('Error seeding default admin:', error);
  }
};
