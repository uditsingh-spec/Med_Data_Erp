import Baby from '../models/Baby';

export const generateDisplayId = async (
  motherName: string,
  weight: number,
  gender: string,
  gestationalAge: string
): Promise<string> => {
  // Take first name only, Uppercase, Remove spaces
  const firstName = motherName.trim().split(' ')[0]!.toUpperCase();
  const genderInitial = gender === 'Male' ? 'M' : 'F';
  // Remove the dash or plus from gestational age for the ID (e.g., 36W+4D -> 36W4D)
  const cleanGestationalAge = gestationalAge.replace(/[\-\+]/g, '');
  
  let baseId = `${firstName}-${weight}-${genderInitial}${cleanGestationalAge}`;

  let displayId = baseId;
  let isUnique = false;
  let counter = 1;

  while (!isUnique) {
    const existing = await Baby.findOne({ displayId });
    if (existing) {
      displayId = `${baseId} (${counter})`;
      counter++;
    } else {
      isUnique = true;
    }
  }

  return displayId;
};
