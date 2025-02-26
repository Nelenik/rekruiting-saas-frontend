import {
  EVacancyEmployment,
  EVacancyExperience,
  EVacancyPosition,
  EVacancyStatus,
  EVacancyWorkFormat,
} from "../types";

export const vacancyPositionsDict: Record<string, string> = {
  [EVacancyPosition.DEVELOPER]: "Разработчик",
  [EVacancyPosition.TEAM_LEAD]: "Тим лид(рук. команды разработки)",
  [EVacancyPosition.TESTER]: "Тестировщик",
  [EVacancyPosition.PM]: "Продакт/Проджект менеджер",
  [EVacancyPosition.ANALYST]: "Аналитик",
  [EVacancyPosition.DEVOPS]: "DevOps/SRE",
  [EVacancyPosition.DESIGNER]: "Дизайнер",
  [EVacancyPosition.DATA_SCIENTIST]: "Data Scientist",
  [EVacancyPosition.TECHNICAL_SUPPORT]: "Тех.поддержка",
};

export const vacancyStatusDict: Record<string, string> = {
  [EVacancyStatus.SETTING]: "Настройка",
  [EVacancyStatus.WORK]: "В работе",
  [EVacancyStatus.PAUSE]: "На паузе",
  [EVacancyStatus.WAIT]: "Ожидание",
  [EVacancyStatus.UNASSIGNED]: "Не задан",
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
  [EVacancyExperience.LESS_THAN_1]: "0-1 год",
  [EVacancyExperience.FROM_1_TO_3]: "1-3 года",
  [EVacancyExperience.FROM_3_TO_5]: "3-5 лет",
  [EVacancyExperience.MORE_THAN_5]: "более 5 лет",
};
