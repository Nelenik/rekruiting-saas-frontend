const isValidDateField = (
  dateValue: unknown
): dateValue is string | number | Date => {
  return (
    typeof dateValue === "string" ||
    typeof dateValue === "number" ||
    dateValue instanceof Date
  );
};

export const sortByDateField =
  <T extends Record<string, unknown>>(field: string) =>
  (a: T, b: T) => {
    const aField = a[field];
    const bField = b[field];
    if (!isValidDateField(aField) || !isValidDateField(bField)) {
      return 0;
    }
    const dateA = new Date(aField).valueOf();
    const dateB = new Date(bField).valueOf();
    return dateB - dateA;
  };
