import { EVacancyPosition } from '../types';

export const vacancyPositionsDict: Record<string, string> = {
  [EVacancyPosition.DEVELOPER]: 'Разработчик',
  [EVacancyPosition.TEAM_LEAD]: 'Тим лид(рук. команды разработки)',
  [EVacancyPosition.TESTER]: 'Тестировщик',
  [EVacancyPosition.PM]: 'Продакт/Проджект менеджер',
  [EVacancyPosition.ANALYST]: 'Аналитик',
  [EVacancyPosition.DEVOPS]: 'DevOps/SRE',
  [EVacancyPosition.DESIGNER]: 'Дизайнер',
  [EVacancyPosition.DATA_SCIENTIST]: 'Data Scientist',
  [EVacancyPosition.TECHNICAL_SUPPORT]: 'Тех.поддержка',
};
