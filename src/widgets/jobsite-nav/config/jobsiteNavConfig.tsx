type NavConfig = {
  routeName: string;
  href: string;
}
export const createJobsiteNavConfig = (): NavConfig[] => [
  {
    routeName: ' Вакансии',
    href: '/vacancies'
  },
  {
    routeName: 'Стажировки',
    href: '/internships'
  },
  {
    routeName: 'Стартапы',
    href: '/startups'
  },
  {
    routeName: 'Кофаундеры',
    href: '/cofounders'
  }
]