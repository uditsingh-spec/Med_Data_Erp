import { Request, Response, NextFunction } from 'express';
import Baby from '../models/Baby';
import Sample from '../models/Sample';

export const getDashboardStats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const [stats] = await Baby.aggregate([
      {
        $facet: {
          totalBabies: [{ $count: 'count' }],
          totalTwins: [
            { $match: { isTwin: true } },
            { $count: 'count' }
          ],
          maleBabies: [
            { $match: { gender: 'Male' } },
            { $count: 'count' }
          ],
          femaleBabies: [
            { $match: { gender: 'Female' } },
            { $count: 'count' }
          ],
        }
      }
    ]);

    const totalBabies = stats.totalBabies[0]?.count || 0;
    const totalTwins = stats.totalTwins[0]?.count || 0;
    const maleBabies = stats.maleBabies[0]?.count || 0;
    const femaleBabies = stats.femaleBabies[0]?.count || 0;

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const totalSamplesToday = await Sample.countDocuments({
      createdAt: { $gte: startOfToday }
    });

    res.json({
      totalBabies,
      totalSamplesToday,
      totalTwins,
      maleBabies,
      femaleBabies,
    });
  } catch (error) {
    next(error);
  }
};
