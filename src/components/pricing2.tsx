import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function Pricing() {
  return (
    <section id="pricing" className="py-16 bg-gray-50 dark:bg-gray-900 max-w-screen-xl mx-auto">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-4">
          Выберите подходящий тариф
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
          Подберите идеальных кандидатов, используя наш сервис.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Basic Plan */}
          <div className="w-full max-w-sm p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl hover:border-red-500 border border-transparent hover:bg-gray-100 dark:hover:bg-gray-700">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Базовый
            </h3>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Идеально для небольших компаний.
            </p>
            <div className="mt-6 text-gray-800 dark:text-white">
              <span className="text-4xl font-bold">₽990</span>
              <span className="text-lg">/месяц</span>
            </div>
            <ul className="mt-6 space-y-3">
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                1 вакансия
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                Основной поиск кандидатов
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                Поддержка по email
              </li>
            </ul>
            <Button variant="destructive" className="w-full mt-6">
              Выбрать Базовый
            </Button>
          </div>

          {/* Pro Plan */}
          <div className="w-full max-w-sm p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border-2 border-blue-500 transition-transform transform hover:scale-105 hover:shadow-xl hover:border-red-500 hover:bg-gray-100 dark:hover:bg-gray-700">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Профессиональный
            </h3>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Для компаний, активно ищущих специалистов.
            </p>
            <div className="mt-6 text-gray-800 dark:text-white">
              <span className="text-4xl font-bold">₽2,990</span>
              <span className="text-lg">/месяц</span>
            </div>
            <ul className="mt-6 space-y-3">
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                10 вакансий
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                Расширенный поиск кандидатов
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                Приоритетная поддержка
              </li>
            </ul>
            <Button variant="destructive" className="w-full mt-6">
              Выбрать Профессиональный
            </Button>
          </div>

          {/* Enterprise Plan */}
          <div className="w-full max-w-sm p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl hover:border-red-500 border border-transparent hover:bg-gray-100 dark:hover:bg-gray-700">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Корпоративный
            </h3>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Для крупных компаний и агентств.
            </p>
            <div className="mt-6 text-gray-800 dark:text-white">
              <span className="text-4xl font-bold">₽9,990</span>
              <span className="text-lg">/месяц</span>
            </div>
            <ul className="mt-6 space-y-3">
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                Неограниченное количество вакансий
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                Расширенный поиск кандидатов
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                Выделенный менеджер
              </li>
            </ul>
            <Button variant="destructive" className="w-full mt-6">
              Выбрать Корпоративный
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
