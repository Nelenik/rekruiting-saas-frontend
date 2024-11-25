import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CheckCircle, Circle } from "lucide-react";

const timelineData = [
  {
    id: 0,
    title: "Размещаем вакансии",
    description: "Создаем понятное описание и разбираем отзывы",
  },
  {
    id: 1,
    title: "Отбираем резюме",
    description: "AI выбирает самых подходящих кандидатов из базы 75 миллионов резюме",
  },
  {
    id: 2,
    title: "Контактируем",
    description: "Устанавливаем контакт по телефону или в мессенджерах с кандидатами и выполняем скрининг",
  },
  {
    id: 3,
    title: "Проведение интервью или тестирование",
    description: "Запишем и проанализируем результаты",
  },
  {
    id: 4,
    title: "Формирование отчета",
    description:
      "Вы получаете контакты подходящих кандидатов и наш отчет по каждому. В отчете результаты скрининга и тестирования или интервью",
  },
];

export default function Timeline() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="relative">
        {/* Вертикальная линия таймлайна */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-300"></div>
        {/* Контент таймлайна */}
        {timelineData.map((item, index) => (
          <div
            key={item.id}
            className={cn(
              "flex items-start mb-6",
              index % 2 === 0 ? "flex-row-reverse" : "flex-row"
            )}
          >
            {/* Карточка */}
            <div
              className={cn(
                "w-[calc(50%-1rem)]",
                index % 2 === 0 ? "text-right pr-6" : "text-left pl-6"
              )}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            </div>
            {/* Индикатор таймлайна */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full border",
                  index === 0 ? "border-blue-500 bg-blue-100" : "border-gray-300 bg-white"
                )}
              >
                {index === 0 ? (
                  <CheckCircle className="text-blue-500 w-5 h-5" />
                ) : (
                  <Circle className="text-gray-400 w-5 h-5" />
                )}
              </div>
              {/* Соединительная линия между индикаторами */}
              {index < timelineData.length - 1 && (
                <div className="h-full w-0.5 bg-gray-300"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
