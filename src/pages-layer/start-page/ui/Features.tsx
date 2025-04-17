import { BrainCircuit, FileCheck, StarHalf, UserSearch } from "lucide-react";


const features = [
  { icon: <BrainCircuit className="shrink-0" />, text: "LLM. большая языковая модель анализирует и оценивает ответы кандидатов." },
  { icon: <StarHalf className="shrink-0" />, text: "Система рейтинга. Оцениваем качество резюме и присваиваем им рейтинги." },
  { icon: <UserSearch className="shrink-0" />, text: "Система поиска. Помогаем найти кандидатов по различным критериям." },
  { icon: <FileCheck className="shrink-0" />, text: "Отслеживаем изменения в резюме и проверяем кандидатов на соответствие требованиям." },
];

export const Features = () => {
  return (
    <div className="w-[min(100%,_500px)]">
      <h3 className="text-2xl lg:text-4xl font-semibold leading-relaxed mb-16">
        REKRUTAI — твой AI-помощник в найме
      </h3>
      <ul className=" self-start list-inside ml-2 space-y-4">
        {features.map((feature, index) => (
          <li
            className="flex items-center gap-2 hover:scale-105 transition-transform duration-200"
            key={index}
          >
            {feature.icon}
            {feature.text}
          </li>
        ))}
      </ul>
    </div>
  );
}