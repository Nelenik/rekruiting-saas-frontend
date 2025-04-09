import { BadgeCheck } from "lucide-react";

export default function Advantages() {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 via-gray-100 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-6 max-w-7xl">
        <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">
          Наши преимущества
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {advantages.map((advantage, index) => (
            <AdvantageCard
              key={index}
              value={advantage.value}
              description={advantage.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const advantages = [
  { value: "10X", description: "Ускоряем time to hire до 10 раз" },
  { value: "50%", description: "Экономим до 50% бюджета на найм" },
  {
    value: "300%",
    description: "Увеличиваем конверсию кандидатов в сотрудников до 300%",
  },
  {
    value: "1000+",
    description: "Совершаем тысячи звонков и отправляем десятки тысяч сообщений в день",
  },
  {
    value: "100ч.",
    description: "Экономим до 100 часов рекрутера на одну вакансию",
  },
  {
    value: "98%",
    description: "Оценка кандидатов с точностью отбора 98%",
  },
];

function AdvantageCard({
  value,
  description,
}: {
  value: string;
  description: string;
}) {
  return (
    <div className="relative p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-all transform hover:-translate-y-2 hover:shadow-2xl hover:bg-blue-50 dark:hover:bg-gray-700 group">
      <div className="absolute -top-4 -left-4 w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
        <BadgeCheck className="w-6 h-6 text-blue-500 dark:text-blue-300" />
      </div>
      <div className="mt-6">
        <h3 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
          {value}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}



// import { BadgeCheck } from "lucide-react";

// export default function Advantages() {
//   return (
//     <section className="py-16 bg-gray-50 dark:bg-gray-900  max-w-screen-xl mx-auto">
//       <div className="container mx-auto px-6">
//         <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-8">
//           Наши преимущества
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           <AdvantageCard
//             value="10X"
//             description="Ускоряем time to hire до 10 раз"
//           />
//           <AdvantageCard
//             value="50%"
//             description="Экономим до 50% бюджета на найм"
//           />
//           <AdvantageCard
//             value="300%"
//             description="Увеличиваем конверсию кандидатов в сотрудников до 300%"
//           />
//           <AdvantageCard
//             value="1000+"
//             description="Совершаем тысячи звонков и отправляем десятки тысяч сообщений в день"
//           />
//           <AdvantageCard
//             value="100ч."
//             description="Экономим до 100 часов рекрутера на одну вакансию"
//           />
//             <AdvantageCard
//             value="98% отбора сотрудников."
//             description="Оценка кандидатов 98% отбора сотрудников."
//           />
//         </div>
//       </div>
//     </section>
//   );
// }

// function AdvantageCard({ value, description }: { value: string; description: string }) {
//   return (
//     <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-gray-100 dark:hover:bg-gray-700">
//       <div className="flex items-center mb-4">
//         <BadgeCheck className="w-8 h-8 text-blue-500" />
//         <span className="ml-3 text-3xl font-bold text-gray-800 dark:text-white">
//           {value}
//         </span>
//       </div>
//       <p className="text-gray-600 dark:text-gray-400">{description}</p>
//     </div>
//   );
// }
