import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const check = async () => {
  await mongoose.connect(process.env.MONGODB_URI as string);
  const db = mongoose.connection.db;
  const admin = await db?.collection('users').findOne({ employeeId: 'ADMIN-0001' });
  console.log('Admin:', admin);
  process.exit(0);
};
check();
