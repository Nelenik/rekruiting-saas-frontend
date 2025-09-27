/**
 * Supported currency codes for formatting.
 */
type CurrencyCode =
  | "USD"
  | "EUR"
  | "GBP"
  | "JPY"
  | "RUB"
  | "CNY"
  | "INR"
  | "BRL"
  | "CAD"
  | "AUD";

/**
 * Formats a price according to the specified locale and currency code.
 *
 * @param {number} price - The numeric value representing the price to be formatted.
 * @param {Intl.LocalesArgument} locale - The locale to use for formatting, such as "en-US" or "ru-RU".
 * @param {CurrencyCode} currency - The currency code (e.g., "USD", "EUR") to format the price.
 * @returns {string} A string representing the formatted price, with currency symbol.
 *
 * @example
 * formatPrice(1234.5, "en-US", "USD"); // "$1,234.50"
 * formatPrice(1234.5, "ru-RU", "RUB"); // "1 234,50 ₽"
 */
export const formatPrice = (
  price: number | null,
  locale: Intl.LocalesArgument,
  currency?: CurrencyCode,
  minFractionDigits?: number
): string => {
  if (price === null) return "не указано ₽";

  const formatter = new Intl.NumberFormat(locale, {
    style: currency ? "currency" : "decimal",
    ...(currency && { currency: currency }),
    minimumFractionDigits: minFractionDigits ?? 0,
  });
  return formatter.format(price);
};

/**
 * Formats a number to a specified locale and minimum fraction digits.
 *
 * @param {number} number - The number to format.
 * @param {Intl.LocalesArgument} locale - The locale to use for formatting (e.g., "en-US").
 * @param {number} minFractionDigits - The minimum number of digits to display after the decimal point.
 * @returns {string} - The formatted number as a string.
 *
 * @example
 * // Format a number for the "en-US" locale with 2 fractional digits
 * const formatted = formatNumber(9, "en-US", 2);
 * console.log(formatted); // "9.00"
 */
export const formatNumber = (
  number: number,
  locale: Intl.LocalesArgument,
  minFractionDigits: number
): string => {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: minFractionDigits,
    maximumFractionDigits: minFractionDigits,
  }).format(number);
};
