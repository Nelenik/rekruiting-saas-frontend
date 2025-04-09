enum EVacancyPosition {
  DEVELOPER = "developer",
  TEAM_LEAD = "team-lead",
  TESTER = "qa",
  PM = "pm",
  ANALYST = "analyst",
  DEVOPS = "devops",
  DESIGNER = "designer",
  DATA_SCIENTIST = "data-scientist",
  TECHNICAL_SUPPORT = "technical-support",
}

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
