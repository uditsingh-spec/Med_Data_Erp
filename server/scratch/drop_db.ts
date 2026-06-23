import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const dropDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/med_data_erp');
    console.log('Connected to MongoDB');
    
    // Drop the collections that hold sample data to ensure fresh start
    try { await mongoose.connection.db?.dropCollection('samples'); } catch(e) {}
    try { await mongoose.connection.db?.dropCollection('dailyobservations_v3'); } catch(e) {}
    try { await mongoose.connection.db?.dropCollection('dailyobservations_v4'); } catch(e) {}
    
    console.log('Dropped sample collections successfully.');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

dropDB();
