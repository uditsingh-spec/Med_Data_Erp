export const calculateObservationDayAndShift = (registrationDate: Date, serverTime: Date = new Date()) => {
  // Calculate Day
  // To avoid timezone/time-of-day offsets messing up the day calculation, 
  // we normalize both dates to midnight UTC or local time
  const regDateOnly = new Date(registrationDate);
  regDateOnly.setHours(0, 0, 0, 0);
  
  const currDateOnly = new Date(serverTime);
  currDateOnly.setHours(0, 0, 0, 0);

  const diffTime = currDateOnly.getTime() - regDateOnly.getTime();
  const day = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

  // Calculate Shift
  const currentHour = serverTime.getHours();
  // 06:00 to 17:59 = M
  const shift = (currentHour >= 6 && currentHour < 18) ? 'M' : 'E' as 'M' | 'E';

  return { day, shift, serverTime };
};
