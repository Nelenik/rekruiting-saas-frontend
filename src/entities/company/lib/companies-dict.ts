export const companiesMap: Record<string, string> = {
  "X5 Group": "x5",
  Авито: "avito",
  Вайлдберриз: "wb",
  ВК: "vk",
  Магнит: "magnit",
  МТС: "mtc",
  РСХБ: "rshb",
  Сбер: "sber",
  "Т-1": "t1",
  "Т-Банк": "tbank",
  Яндекс: "yandex",
  Озон: "ozon",
};

export const getCompanyLogoByName = (companyName: string): string => {
  const key = companiesMap[companyName];
  return key
    ? `/assets/companies/${key}.webp`
    : "/assets/companies/default.webp";
};

const companiesSiteDict: Record<string, string> = {
  "X5 Group": "https://x5.tech/vacancy",
  Авито: "https://career.avito.com/vacancies",
  Вайлдберриз: "https://career.wb.ru/vacancies",
  ВК: "https://team.vk.company/",
  Магнит: "https://magnit.tech/vacancies",
  МТС: "https://job.mts.ru/vacancies",
  РСХБ: "https://svoevagro.ru/vacancies/region-russia/kompaniya-rosselkhozbank",
  Сбер: "https://rabota.sber.ru/",
  "Т-1": "https://career.t1.ru/",
  "Т-Банк": "https://www.tbank.ru/career/",
  Яндекс: "https://yandex.ru/jobs/vacancies",
  Озон: "https://job.ozon.ru/",
};

export const getCompanyLinkByName = (
  companyName: string
): string | undefined => {
  return companiesSiteDict[companyName];
};
