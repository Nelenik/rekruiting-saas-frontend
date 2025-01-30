const convertToFormData = (data: Record<string, string | number>) => {
  const result = new FormData();
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) {
      result.append(key, String(value)); // Преобразуем все значения в строку
    }
  }
  return result;
};

export default convertToFormData;
