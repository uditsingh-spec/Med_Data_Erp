import { babySchema } from './src/validators/babyValidators';

const payload = {
  motherName: 'Test Mother',
  motherAge: 25,
  isTwin: false,
  dob: '2026-03-02',
  termStatus: 'Term',
  weight: 2569,
  gender: 'Male',
  gestationalAge: '37W'
};

try {
  const result = babySchema.parse(payload);
  console.log('SUCCESS:', result);
} catch (e: any) {
  console.log('ERROR NAME:', e.name);
  console.log('ERROR MESSAGE:', e.message);
}
