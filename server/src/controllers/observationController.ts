import { Request, Response, NextFunction } from 'express';
import DailyObservation from '../models/DailyObservation';

export const getAllObservations = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const observations = await DailyObservation.find()
      .populate('babyId', 'displayId motherName registeredAt')
      .populate('sampleId', 'weight')
      .populate('recordedBy', 'name employeeId')
      .sort({ createdAt: -1 })
      .lean();

    // Map to flatten baby data for the table
    const formatted = observations.map(obs => ({
      ...obs,
      babyId: undefined, // omit original ref
      actualBabyId: (obs.babyId as any)?._id,
      displayId: (obs.babyId as any)?.displayId || 'Unknown',
      motherName: (obs.babyId as any)?.motherName || 'Unknown',
      weight: (obs.sampleId as any)?.weight,
    }));

    res.json(formatted);
  } catch (error) {
    next(error);
  }
};
