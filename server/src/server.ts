import app from './app';
import connectDB from './config/db';
import { seedDefaultAdmin } from './utils/dbSeeder';

const PORT = process.env.PORT || 5000;

connectDB().then(async () => {
  await seedDefaultAdmin();
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });
});
