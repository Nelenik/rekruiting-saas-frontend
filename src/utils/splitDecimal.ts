/**
 * Splits a decimal number into its integer and fractional parts.
 *
 * @param {number} number - The decimal number to split.
 * @returns {{ int: number; decimal: number }} - An object containing the integer part (`int`) and the fractional part (`decimal`).
 *
 * @example
 * splitDecimal(3.5);
 * // Returns: { int: 3, decimal: 0.5 }
 *
 * @example
 * splitDecimal(-2.75);
 * // Returns: { int: -2, decimal: -0.75 }
 */
export const splitDecimal = (
  number: number
): { int: number; decimal: number } => {
  const int = Math.trunc(number);
  const decimal = number - int;
  console.log("int", int);
  console.log("decimal", decimal);
  return {
    int,
    decimal,
  };
};
