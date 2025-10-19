// import { EHhEmployment, EHhExperience, EHhGender } from "../api/types";

// export const hhExperienceDictionary = {
//   [EHhExperience.NO_EXPERIENCE]: "нет опыта",
//   [EHhExperience.BETWEEN_1_AND_3]: "от 1 года до 3",
//   [EHhExperience.BETWEEN_3_AND_6]: "от 3 до 6 лет",
//   [EHhExperience.MORE_THAN_6]: "более 6 лет",
// };

// // занятость
// export const hhEmploymentDictionary = {
//   [EHhEmployment.FULL]: "полная занятость",
//   [EHhEmployment.PART]: "частичная занятость",
//   [EHhEmployment.PROJECT]: "проектная работа",
//   [EHhEmployment.VOLUNTEER]: "волонтерство",
//   [EHhEmployment.PROBATION]: "стажировка",
// };

// export const hhGenderDictionary = {
//   [EHhGender.FEMALE]: "женский",
//   [EHhGender.MALE]: "мужской",
//   [EHhGender.UNKNOWN]: "не имеет значения",
// };

export const HH_FIELDS_DICT = {
  job_search_statuses_employer: [
    { id: "active_search", name: "Активно ищет работу" },
    { id: "looking_for_offers", name: "Рассматривает предложения" },
    { id: "not_looking_for_job", name: "Не ищет работу" },
    { id: "has_job_offer", name: "Предложили работу, решает" },
    { id: "accepted_job_offer", name: "Вышел на новое место" },
  ],
  gender: [
    { id: "male", name: "мужской" },
    { id: "female", name: "женский" },
    { id: "unknown", name: "не имеет значения" },
  ],
  experience: [
    { id: "noExperience", name: "нет опыта" },
    { id: "between1And3", name: "от 1 года до 3 лет" },
    { id: "between3And6", name: "от 3 до 6 лет" },
    { id: "moreThan6", name: "более 6 лет" },
  ],
  employment: [
    { id: "full", name: "полная занятость" },
    { id: "part", name: "частичная занятость" },
    { id: "project", name: "проектная работа" },
    { id: "volunteer", name: "волонтерство" },
    { id: "probation", name: "стажировка" },
  ],
  professional_role: [
    {
      id: 156,
      name: "BI-аналитик, аналитик данных",
    },
    {
      id: 160,
      name: "DevOps-инженер",
    },
    {
      id: 10,
      name: "Аналитик",
    },
    {
      id: 12,
      name: "Арт-директор, креативный директор",
    },
    {
      id: 150,
      name: "Бизнес-аналитик",
    },
    {
      id: 25,
      name: "Гейм-дизайнер",
    },
    {
      id: 165,
      name: "Дата-сайентист",
    },
    {
      id: 34,
      name: "Дизайнер, художник",
    },
    {
      id: 36,
      name: "Директор по информационным технологиям (CIO)",
    },
    {
      id: 73,
      name: "Менеджер продукта",
    },
    {
      id: 155,
      name: "Методолог",
    },
    {
      id: 96,
      name: "Программист, разработчик",
    },
    {
      id: 164,
      name: "Продуктовый аналитик",
    },
    {
      id: 104,
      name: "Руководитель группы разработки",
    },
    {
      id: 157,
      name: "Руководитель отдела аналитики",
    },
    {
      id: 107,
      name: "Руководитель проектов",
    },
    {
      id: 112,
      name: "Сетевой инженер",
    },
    {
      id: 113,
      name: "Системный администратор",
    },
    {
      id: 148,
      name: "Системный аналитик",
    },
    {
      id: 114,
      name: "Системный инженер",
    },
    {
      id: 116,
      name: "Специалист по информационной безопасности",
    },
    {
      id: 121,
      name: "Специалист технической поддержки",
    },
    {
      id: 124,
      name: "Тестировщик",
    },
    {
      id: 125,
      name: "Технический директор (CTO)",
    },
    {
      id: 126,
      name: "Технический писатель",
    },
  ],
  area: [
    {
      id: 113,
      name: "Россия",
    },
    {
      id: 1,
      name: "Москва",
    },
    {
      id: 2,
      name: "Санкт-Петербург",
    },
    {
      id: 145,
      name: "Ленинградская область",
    },
    {
      id: 2019,
      name: "Московская область",
    },
  ],
};
