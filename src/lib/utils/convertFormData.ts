export const convertFormData = (
  formData: FormData
): Record<string, string | undefined> => {
  return Object.fromEntries(formData.entries()) as Record<
    string,
    string | undefined
  >;
};
