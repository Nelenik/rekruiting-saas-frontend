export const removeField = <T extends object, K extends keyof T>(
  object: T,
  fieldNames: K[]
): Omit<T, K> => {
  const cleanedObject = { ...object };

  // Remove each field in fieldNames from the new object
  fieldNames.forEach((field) => {
    delete cleanedObject[field];
  });

  return cleanedObject as Omit<T, K>;
};
