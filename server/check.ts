import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const check = async () => {
  try {
    const uri = process.env.MONGO_URI;
    console.log('MONGO_URI:', uri);
    await mongoose.connect(uri as string);
    const db = mongoose.connection.db;
    const admin = await db?.collection('users').findOne({ employeeId: 'ADMIN-0001' });
    console.log('Admin role in DB:', admin?.role);
    console.log('Full admin record:', JSON.stringify(admin, null, 2));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
check();
