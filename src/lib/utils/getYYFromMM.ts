export const getYYFromMM = (
  months: number
): { years: number; months: number } => {
  return {
    years: Math.floor(months / 12),
    months: months % 12,
  };
};
