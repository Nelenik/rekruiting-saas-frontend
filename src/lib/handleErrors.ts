import { AirtableError } from "./customErrors";

export const handleError = (error: unknown) => {
  if (error instanceof AirtableError) {
    console.error(error);
    throw new Error(
      "Не удалось загрузить вакансии. Пожалуйста, попробуйте позже."
    );
  } else {
    console.error(error);
    throw new Error(
      "Произошла непредвиденная ошибка. Попробуйте обновить страницу."
    );
  }
};
