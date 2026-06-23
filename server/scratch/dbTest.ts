import mongoose from 'mongoose';
import Sample from './models/Sample';
import DailyObservation from './models/DailyObservation';

mongoose.connect('mongodb://127.0.0.1:27017/med_data_erp_v3')
  .then(async () => {
    console.log('Connected to DB');
    const sample = await Sample.findOne().sort({ createdAt: -1 });
    if (!sample) {
      console.log('No samples found');
      return;
    }
    console.log('Found sample:', sample._id);
    
    // Simulate what the controller does
    const reqBody = {
      weight: 3200,
      jm103_s: null,
      tsb: 16,
      mbj20_f: 12,
      mbj20_s: 13,
      f1_d4_f: null
    };

    if ('jm103_s' in reqBody) sample.jm103_s = reqBody.jm103_s === null ? undefined : reqBody.jm103_s;
    if ('tsb' in reqBody) sample.tsb = reqBody.tsb === null ? undefined : reqBody.tsb;
    
    try {
      await sample.save();
      console.log('Sample saved successfully. JM103:', sample.jm103_s);
    } catch (e: any) {
      console.error('Error saving sample:', e);
    }

    const obs = await DailyObservation.findOne({ sampleId: sample._id });
    if (obs) {
      if ('jm103_s' in reqBody) obs.jm103_s = reqBody.jm103_s === null ? undefined : reqBody.jm103_s;
      try {
        await obs.save();
        console.log('Obs saved successfully. JM103:', obs.jm103_s);
      } catch (e: any) {
        console.error('Error saving obs:', e);
      }
    } else {
      console.log('No observation found for sample');
    }

    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
