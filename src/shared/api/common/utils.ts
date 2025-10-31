/**
 *
 * Utility functions for API requests
 * @param body - The body of the request, which can be either a `FormData` object or a plain object.
 * @returns   A `FormData` object if the input is a `FormData`, or a JSON string if the input is a plain object.
 */
export const prepareBody = (
  body: FormData | Record<string, unknown> | undefined
) => {
  if (body instanceof FormData) {
    return body;
  } else if (typeof body === "object" && body !== null) {
    return JSON.stringify(body);
  }
};

/**
 *  Parses a `FormData` object into a plain object.
 * This function iterates over the entries of the `FormData` object and constructs a new object.
 * It handles both single values and arrays (indicated by keys ending with `[]`).
 * It also skips any keys that start with `$ACTION`, which are typically used by Next.js for internal purposes.
 * @param formData - The `FormData` object to be parsed.
 * @param enableCastToNumber - Enables converting string numeric values to numbers
 * @template T - The type of the object to be returned.
 * @returns
 */
export const parseFormData = <T>(
  formData: FormData,
  enableCastToNumber: boolean = false
): T => {
  const resultObject = {} as Record<string, unknown>;

  for (const [key, value] of formData.entries()) {
    // May be necessary to remove Next.js internal fields from FormData
    if (key.startsWith("$ACTION")) continue;

    if (key.endsWith("[]")) {
      const cleanedKey = key.slice(0, -2);
      resultObject[cleanedKey] = [
        ...((resultObject[cleanedKey] as unknown[]) || []),
        castToNumber(value, enableCastToNumber),
      ];
    } else {
      resultObject[key] = castToNumber(value, enableCastToNumber);
    }
  }

  return resultObject as T;
};

/**
 *  Converts a plain object into a `FormData` object.
 * This function iterates over the entries of the object and appends each key-value pair to a new `FormData` instance.
 * It handles arrays by appending each item with a key that ends with `[]`, and converts all values to strings.
 * * @template T - The type of the object to be converted.
 * @param data - An object containing key-value pairs where keys are strings and values can be strings, numbers, booleans, null, or arrays of numbers.
 * @returns   A `FormData` object containing the key-value pairs from the input object.
 */
export const convertToFormData = (
  data: Record<string, string | number | boolean | null | number[]>
) => {
  const result = new FormData();
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          result.append(`${key}[]`, String(item));
        });
      } else {
        result.append(key, String(value)); // Преобразуем все значения в строку
      }
    }
  }
  return result;
};

/**
 *
 * @param formData
 * @returns
 */
export const formDataToJson = (formData: FormData): string => {
  return JSON.stringify(parseFormData(formData));
};

/**
 * This function casts the numeric values to number type if enable flag is turned on
 * @param value
 * @param enable
 * @returns
 */
export const castToNumber = (value: unknown, enable: boolean = false) => {
  if (!enable) return value;
  if (typeof value === "number") return value;
  if (typeof value === "string" && /^-?\d+(\.\d+)?$/.test(value.trim())) {
    return Number(value);
  }
  return value;
};
