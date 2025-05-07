/**
 * Normalizes a fractional score to a fixed scale (e.g., from 0–1 to 0–10).
 *
 * @param value - The input score (between 0 and 1), or `null` to indicate no value.
 * @param decimals - Number of decimal places to round the input to before scaling. Defaults to 2.
 * @param scale - The maximum value of the target scale (e.g., 10 for a 0–10 rating). Defaults to 10.
 * @returns The normalized rating as a number on the specified scale, or 0 if `value` is null.
 */
export const normalizeScoreToScale = (
  value: number | null,
  decimals = 2,
  scale = 10
) => {
  if (value === null) return 0;
  //temp needs server to get float on point editing
  if (value >= 1 && value <= 10) {
    return value;
  }

  const rounded = parseFloat(value.toFixed(decimals));
  return rounded * scale;
};

/**
 * Converts a scaled score (e.g., 7.5 on a 10-point scale) back to a fractional score (e.g., 0.75).
 *
 * @param value - The input score on the scale (e.g., 1–10), or null.
 * @param scale - The original scale to normalize from (e.g., 10). Defaults to 10.
 * @returns A fractional value between 0 and 1, or 0 if input is null.
 */
export const getFractionFromScale = (value: number, scale = 10): number => {
  if (value === null) return 0;
  return value / scale;
};
