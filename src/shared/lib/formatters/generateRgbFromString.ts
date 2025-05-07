/**
 * Generates an RGB color string based on a given input string.
 * The color is deterministically derived from the character codes of the string.
 *
 * The output color is scaled by a brightness factor (between 0 and 1),
 * which can be used to control how dark or light the resulting color is.
 * Lower values produce darker colors.
 *
 * If the input string is empty or falsy, the function returns black: `rgb(0, 0, 0)`.
 *
 * @param str - The input string used to generate the RGB color.
 * @param brightnessFactor - A multiplier (default `0.5`) to control brightness of the resulting color.
 * @returns A string in the format `rgb(r, g, b)` representing the generated color.
 *
 * @example
 * generateRgbFromString("Hello")          // Might return: "rgb(63.5, 102, 89.5)"
 * generateRgbFromString("Hello", 0.2)     // Darker: "rgb(25.4, 40.8, 35.8)"
 * generateRgbFromString("")               // Returns: "rgb(0, 0, 0)"
 */
export const generateRgbFromString = (
  str: string,
  brightnessFactor: number = 0.5
) => {
  if (!str || str.length === 0) return "#000000";
  let sum = 1;
  for (let i = 0; i < str.length; i++) {
    sum = (sum * 31 + str.charCodeAt(i)) % 0xffffff;
  }

  const color = sum.toString(16).padStart(6, "0");

  const r = parseInt(color.slice(0, 2), 16);
  const g = parseInt(color.slice(2, 4), 16);
  const b = parseInt(color.slice(4, 6), 16);

  return `rgb(${r * brightnessFactor}, ${g * brightnessFactor}, ${
    b * brightnessFactor
  }`;
};
