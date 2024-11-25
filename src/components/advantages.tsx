import { BadgeCheck } from "lucide-react";

export default function Advantages() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900  max-w-screen-xl mx-auto">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-8">
          Наши преимущества
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AdvantageCard
            value="10X"
            description="Ускоряем time to hire до 10 раз"
          />
          <AdvantageCard
            value="50%"
            description="Экономим до 50% бюджета на найм"
          />
          <AdvantageCard
            value="300%"
            description="Увеличиваем конверсию кандидатов в сотрудников до 300%"
          />
          <AdvantageCard
            value="1000+"
            description="Совершаем тысячи звонков и отправляем десятки тысяч сообщений в день"
          />
          <AdvantageCard
            value="100ч."
            description="Экономим до 100 часов рекрутера на одну вакансию"
          />
            <AdvantageCard
            value="98% отбора сотрудников."
            description="Оценка кандидатов 98% отбора сотрудников."
          />
        </div>
      </div>
    </section>
  );
}

function AdvantageCard({ value, description }: { value: string; description: string }) {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-gray-100 dark:hover:bg-gray-700">
      <div className="flex items-center mb-4">
        <BadgeCheck className="w-8 h-8 text-blue-500" />
        <span className="ml-3 text-3xl font-bold text-gray-800 dark:text-white">
          {value}
        </span>
      </div>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}
