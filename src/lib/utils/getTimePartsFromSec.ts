/**
 * Converts a total number of seconds into an object with hours, minutes, and seconds.
 *
 * @param {number} totalSeconds - The total time in seconds to be converted.
 * @returns {{days:number, hours:number, min:number, sec:number}} An object with `hours`, `min`, and `sec` properties, representing
 * the hours, minutes, and seconds derived from the total seconds.
 */

export const getTimePartsFromSec = (
  totalSeconds: number
): { days: number; hours: number; min: number; sec: number } => {
  totalSeconds = totalSeconds < 0 ? 0 : totalSeconds;
  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const daysRest = totalSeconds % (24 * 60 * 60);

  const hours = Math.floor(daysRest / 3600);
  const hoursRest = daysRest % 3600;

  const min = Math.floor(hoursRest / 60);

  const sec = hoursRest % 60;
  return { days, hours, min, sec };
};
