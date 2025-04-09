const convertToFormData = (
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

export default convertToFormData;
