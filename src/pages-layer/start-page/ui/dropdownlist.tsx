"use client"

import { useState } from 'react';
// import { Card, CardHeader, CardContent } from "@/components/ui/card";

import { ChevronDown } from 'lucide-react'; // Стрелка вниз из Lucide



const DropdownList = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index); // Если тот же элемент открыт, закрываем его
  };

  return (
    <section className=" py-8 text-gray-900">
      <div className="container mx-auto px-6 max-w-screen-xl mb-6 sm:mt-14 sm:mb-14 lg:px-16">
        
        {/* Массовый подбор */}
        <div
          className="mb-4 bg-white text-black shadow-md rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
          onClick={() => toggleItem(0)}
        >
          <div className="flex justify-between items-center bg-transparent border-b border-gray-300 p-6">
            <h3 className="text-xl font-semibold text-gray-800">Массовый подбор</h3>
            <ChevronDown
              className={`transition-transform duration-300 ${openItem === 0 ? 'rotate-180' : ''}`}
              size={20}
              color="#4B5563"
            />
          </div>
          {openItem === 0 && (
            <div className="p-6">
              <p className="text-gray-600">
                Для крупных компаний или проектов, требующих большого количества сотрудников, традиционные методы могут
                оказаться слишком медленными и дорогостоящими. Сервис обеспечивает быстрый и эффективный массовый подбор
                линейного персонала.
              </p>
            </div>
          )}
        </div>

        {/* Поиск квалифицированных кадров */}
        <div
          className="mb-4 bg-white text-black shadow-md rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
          onClick={() => toggleItem(1)}
        >
          <div className="flex justify-between items-center bg-transparent border-b border-gray-300 p-6">
            <h3 className="text-xl font-semibold text-gray-800">Поиск квалифицированных кадров</h3>
            <ChevronDown
              className={`transition-transform duration-300 ${openItem === 1 ? 'rotate-180' : ''}`}
              size={20}
              color="#4B5563"
            />
          </div>
          {openItem === 1 && (
            <div className="p-6">
              <p className="text-gray-600">
                Автоматизируем и ускоряем поиск офисных и производственных квалифицированных специалистов. Проводим
                собеседование и тестирование.
              </p>
            </div>
          )}
        </div>

        {/* Найм IT и экспертов */}
        <div
          className="mb-4 bg-white text-black shadow-md rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
          onClick={() => toggleItem(2)}
        >
          <div className="flex justify-between items-center bg-transparent border-b border-gray-300 p-6">
            <h3 className="text-xl font-semibold text-gray-800">Найм IT и экспертов</h3>
            <ChevronDown
              className={`transition-transform duration-300 ${openItem === 2 ? 'rotate-180' : ''}`}
              size={20}
              color="#4B5563"
            />
          </div>
          {openItem === 2 && (
            <div className="p-6">
              <p className="text-gray-600">
                Автоматизируем всю цепочку собеседований итишников: техническое, алгоритмы, лайв кодинг, мягкие навыки.
                Вам не требуется отвлекать от основной работы сотрудников.
              </p>
            </div>
          )}
        </div>

        {/* Контент для четвертого раздела */}
        <div
          className="mb-4 bg-white text-black shadow-md rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
          onClick={() => toggleItem(3)}
        >
          <div className="flex justify-between items-center bg-transparent border-b border-gray-300 p-6">
            <h3 className="text-xl font-semibold text-gray-800">Рекрутинг для стартапов</h3>
            <ChevronDown
              className={`transition-transform duration-300 ${openItem === 3 ? 'rotate-180' : ''}`}
              size={20}
              color="#4B5563"
            />
          </div>
          {openItem === 3 && (
            <div className="p-6">
              <p className="text-gray-600">
                Помогаем стартапам находить нужных специалистов на ранних стадиях, предлагая быструю подборку и
                адаптацию команды. Наши инструменты позволяют эффективно масштабировать персонал.
              </p>
            </div>
          )}
        </div>

        {/* Контент для пятого раздела */}
        <div
          className="mb-4 bg-white text-black shadow-md rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
          onClick={() => toggleItem(4)}
        >
          <div className="flex justify-between items-center bg-transparent border-b border-gray-300 p-6">
            <h3 className="text-xl font-semibold text-gray-800">Консультации по HR</h3>
            <ChevronDown
              className={`transition-transform duration-300 ${openItem === 4 ? 'rotate-180' : ''}`}
              size={20}
              color="#4B5563"
            />
          </div>
          {openItem === 4 && (
            <div className="p-6">
              <p className="text-gray-600">
                Предоставляем консультации по улучшению процессов найма и управления персоналом. Помогаем выстроить
                грамотные HR-стратегии и повышаем эффективность работы с людьми.
              </p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default DropdownList;
