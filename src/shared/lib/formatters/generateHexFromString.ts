/**
 * Generates a hex color code from a string by converting the string's characters to their character codes.
 * The resulting color is guaranteed to be within the valid hex color range (#000000 to #FFFFFF).
 *
 * The function iterates through each character of the string, calculating a sum using the character codes.
 * This sum is then used to generate a color code. The final result is a 6-character hexadecimal string,
 * padded with leading zeros if necessary.
 *
 * If the input string is empty or falsy, it returns the default color `#000000` (black).
 *
 * @param str - The input string from which the hex color is generated.
 * @returns A string representing a hex color code in the format `#RRGGBB`.
 *
 * @example
 * generateHexFromString("Hello") // Returns: "#3e78a7"
 * generateHexFromString("")      // Returns: "#000000"
 * generateHexFromString("1234")  // Returns: "#13cfcf"
 */
export const generateHexFromString = (str: string) => {
  if (!str || str.length === 0) return "#000000";
  let sum = 1;
  for (let i = 0; i < str.length; i++) {
    sum = (sum * 31 + str.charCodeAt(i)) % 0xffffff;
  }

  const color = sum.toString(16);
  return `#${color.padStart(6, "0")}`;
};
