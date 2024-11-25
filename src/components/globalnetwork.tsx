import React from 'react';
import MapIcon from '@/assets/HugeGlobal.svg?rc';


const GlobalNetworkSection = () => {
  return (
    <section className="flex flex-col items-center justify-center py-10 px-6 text-center bg-gray-50 dark:bg-gray-900">
      {/* Заголовок */}
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
        Глобальная сеть для подбора вакансий и кандидатов
      </h2>

      {/* Подзаголовок */}
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-lg">
        Найдите подходящие вакансии или кандидатов по всему миру, где бы вы ни находились.
      </p>

      {/* Карта */}
      <div className="mt-10 w-full max-w-4xl">
        <MapIcon className="w-full h-auto" />
      </div>
    </section>
  );
};

export default GlobalNetworkSection;
