import User from '../models/User';

export const generateEmployeeId = async (name: string): Promise<string> => {
  const firstName = name.trim().split(' ')[0]!.toUpperCase().replace(/[^A-Z]/g, '');
  let isUnique = false;
  let newId = '';

  while (!isUnique) {
    const randomDigits = Math.floor(1000 + Math.random() * 9000).toString();
    newId = `${firstName}-${randomDigits}`;

    const existingUser = await User.findOne({ employeeId: newId });
    if (!existingUser) {
      isUnique = true;
    }
  }

  return newId;
};
