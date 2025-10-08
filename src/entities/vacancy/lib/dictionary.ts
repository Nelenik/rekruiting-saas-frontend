import {
  EVacancyEmployment,
  EVacancyExperience,
  EVacancyPosition,
  EVacancyWorkFormat,
} from "@/shared/api/types";

export const vacancyPositionsDict: Record<string, string> = {
  [EVacancyPosition.DEVELOPER]: "Разработчик",
  [EVacancyPosition.TEAM_LEAD]: "Тим лид",
  [EVacancyPosition.TESTER]: "Тестировщик",
  [EVacancyPosition.PM]: "Продакт/Проджект менеджер",
  [EVacancyPosition.ANALYST]: "Аналитик",
  [EVacancyPosition.DEVOPS]: "DevOps/SRE",
  [EVacancyPosition.DESIGNER]: "Дизайнер",
  [EVacancyPosition.DATA_SCIENTIST]: "Data Scientist",
  [EVacancyPosition.TECHNICAL_SUPPORT]: "Тех.поддержка",
};

export const vacancyEpmpoymentDict: Record<string, string> = {
  [EVacancyEmployment.FULL]: "полная",
  [EVacancyEmployment.PARTIAL]: "частичная",
  [EVacancyEmployment.PROJECT]: "на проект",
};

export const vacancyWorkFormatDict: Record<string, string> = {
  [EVacancyWorkFormat.HYBRID]: "гибрид",
  [EVacancyWorkFormat.OFFICE]: "офис",
  [EVacancyWorkFormat.REMOTE]: "удаленно",
};

export const vacancyExperienceDict: Record<string, string> = {
  [EVacancyExperience.LESS_THAN_1]: "до года",
  [EVacancyExperience.FROM_1_TO_3]: "от 1 года до 3 лет",
  [EVacancyExperience.FROM_3_TO_5]: "от 3 до 5 лет",
  [EVacancyExperience.MORE_THAN_5]: "более 5 лет",
};

export const experienceAliases: Record<string, EVacancyExperience> = {
  "от 1 года до 3 лет": EVacancyExperience.FROM_1_TO_3,
  "1-3 лет": EVacancyExperience.FROM_1_TO_3,
  "от 3 до 5 лет": EVacancyExperience.FROM_3_TO_5,
  "более 6 лет": EVacancyExperience.MORE_THAN_5,
  "нет опыта": EVacancyExperience.LESS_THAN_1,
};
