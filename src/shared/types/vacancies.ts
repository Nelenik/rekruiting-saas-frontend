export enum EVacancyStatus {
  SETTING = 'setting',
  WORK = 'work',
  PAUSE = 'pause',
  WAIT = 'wait',
}

export type TVacancy = {
  id: number;
  name: string;
  salary_from: number;
  salary_to: number;
  salary_candy: number;
  salary_market: number;
  status: EVacancyStatus;
  match_count: number;
  match_hot_count: number;
  created_at: string;
};

export type TVacancyShort = Pick<
  TVacancy,
  'id' | 'name' | 'status' | 'created_at'
>;
