import Image from "next/image";
import React from "react";
import { CircleChevronDown } from "lucide-react"; // Импорт иконки

const features = [
//   "AI. Искусственный интеллект, выбирает лучшие резюме",
//   "Голосовые роботы. Роботы быстрее и эффективнее обзванивают кандидатов",
//   "Чат-боты. Боты ведут диалоги одновременно с тысячами кандидатов",
//   "Системы тестирования. Опросники помогают быстро отобрать кандидатов соответствующих критериям.",
//   "Видеоинтервью. Технология проведения видеоинтервью и записи видео.",
//   "Распознавание голоса. Переводим голос в текст из звонков и интервью для анализа.",
  "LLM. большая языковая модель анализирует и оценивает ответы кандидатов.",
  "Система рейтинга. Оцениваем качество резюме и присваиваем им рейтинги.",
  "Система поиска. Помогаем найти кандидатов по различным критериям.",
  "Отслеживаем изменения в резюме и проверяем кандидатов на соответствие требованиям.",
//   "Автоматизированные рассылки. Система рассылки писем и видео с резюме для кандидатов.",
//   "Computer vision. Анализируем видео, эмоции и подозрительное поведение.",
//   "OCR. Распознавание и генерация документов.",
];

const Feature = () => {
  return (
    <div
      className="max-w-screen-xl mb-6 sm:mt-14 sm:mb-14 px-6 sm:px-8 lg:px-16 mx-auto"
      id="feature"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 py-8 my-12">
        {/* Левая часть: изображение */}
        <div className="flex justify-end w-full sm:w-2/4">
          <div className="h-full w-full p-4">
            <Image
              src="/assets/Illustration2.png"
              alt="AI Illustration"
              priority={false}
              quality={100}
              height={414}
              width={508}
            />
          </div>
        </div>

        {/* Правая часть: текстовые элементы */}
        <div className="flex flex-col items-start justify-center ml-auto w-full sm:w-2/4">
          <h3 className="text-3xl lg:text-4xl font-bold leading-relaxed text-black-600">
            Технологический AI сервис подбора персонала
          </h3>
          <p className="my-2 text-black-500">
            Мы объединили современные технологии в нашем сервисе
          </p>
          <ul className="text-black-500 self-start list-inside ml-2 space-y-4">
            {features.map((feature, index) => (
              <li
                className="flex items-center gap-2 hover:scale-105 transition-transform duration-200"
                key={index}
              >
                <CircleChevronDown className="text-white w-6 h-6 p-1 rounded-full bg-green-500" /> {/* Иконка */}
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Feature;



// import Image from "next/image";
// import React from "react";
// import { CircleChevronDown } from "lucide-react"; // Импорт иконки

// const features = [
//   "AI. Искусственный интеллект, выбирает лучшие резюме",
//   "Голосовые роботы. Роботы быстрее и эффективнее обзваниваю кандидатов",
//   "Чат-боты. Боты ведут диалоги одновременно с тысячами кандидатов",
//   "Системы тестирования. Опросники помогают быстро отобрать кандидатов соответствующих критериям.",
//   "Видеоинтервью. Технология проведения видеоинтервью и записи видео.",
//   "Распознавание голоса. Переводим голос в текст из звонков и интервью для анализа.",
//   "LLM. большая языковая модель анализирует и оценивает ответы кандидатов.",
//   "Система рейтинга. Оцениваем качество резюме и присваиваем им рейтинги.",
//   "Система поиска. Помогаем найти кандидатов по различным критериям.",
//   "Система мониторинга. Отслеживаем изменения в резюме и проверяем кандидатов на соответствие требованиям.",
//   "Автоматизированные рассылки. Система рассылки писем и видео с резюме для кандидатов.",
//   "Computer vision. Анализируем видео, эмоции и подозрительное поведение.",
//   "OCR. Распознавание и генерация документов.",
// ];

// const Feature = () => {
//   return (
//     <div
//       className="max-w-screen-xl mb-6 sm:mt-14 sm:mb-14 px-6 sm:px-8 lg:px-16 mx-auto"
//       id="feature"
//     >
//       <div className="flex flex-col sm:flex-row items-center justify-between gap-8 py-8 my-12">
//         {/* Левая часть: изображение */}
//         <div className="flex justify-end w-full">
//           <div className="h-full w-full p-4">
//             <Image
//               src="/assets/Illustration2.png"
//               alt="AI Illustration"
//               priority={false}
//               quality={100}
//               height={414}
//               width={508}
//             />
//           </div>
//         </div>

//         {/* Правая часть: текстовые элементы */}
//         <div className="flex flex-col items-start justify-center ml-auto w-full lg:w-9/12">
//           <h3 className="text-3xl lg:text-4xl font-bold leading-relaxed text-black-600">
//             Технологический AI сервис подбора персонала
//           </h3>
//           <p className="my-2 text-black-500">
//             Мы объединили современные технологии в нашем сервисе
//           </p>
//           <ul className="text-black-500 self-start list-inside ml-2 space-y-4">
//             {features.map((feature, index) => (
//               <li
//                 className="flex items-center gap-4 hover:scale-105 transition-transform duration-200"
//                 key={index}
//               >
//                 <CircleChevronDown className="text-white w-6 h-6 p-1 rounded-full bg-green-500" /> {/* Иконка */}
//                 {feature}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Feature;




// import Image from "next/image";
// import React from "react";

// const features = [
//   "AI. Искусственный интеллект, выбирает лучшие резюме",
//   "Голосовые роботы. Роботы быстрее и эффективнее обзваниваю кандидатов",
//   "Чат-боты. Боты ведут диалоги одновременно с тысячами кандидатов",
//   "Системы тестирования. Опросники помогают быстро отобрать кандидатов соответствующих критериям.",
//   "Видеоинтервью. Технология проведения видеоинтервью и записи видео.",
//   "Распознавание голоса. Переводим голос в текст из звонков и интервью для анализа.",
//   "LLM. большая языковая модель анализирует и оценивает ответы кандидатов.",
//   "Система рейтинга. Оцениваем качество резюме и присваиваем им рейтинги.",
//   "Система поиска. Помогаем найти кандидатов по различным критериям.",
//   "Система мониторинга. Отслеживаем изменения в резюме и проверяем кандидатов на соответствие требованиям.",
//   "Автоматизированные рассылки. Система рассылки писем и видео с резюме для кандидатов.",
//   "Computer vision. Анализируем видео, эмоции и подозрительное поведение.",
//   "OCR. Распознавание и генерация документов."
// ];

// const Feature = () => {
//   return (
//     <div
//       className="max-w-screen-xl  mb-6 sm:mt-14 sm:mb-14 px-6 sm:px-8 lg:px-16 mx-auto"
//       id="feature"
//     >
//       <div className="flex flex-col sm:flex-row items-center justify-between gap-8 py-8 my-12">
//         {/* Левая часть: изображение */}
//         <div className="flex justify-end w-full">
//           <div className="h-full w-full p-4">
//             <Image
//               src="/assets/Illustration2.png"
//               alt="VPN Illustration"
//             //   layout="responsive"
//             priority={false}
//               quality={100}
//               height={414}
//               width={508}
//             />
//           </div>
//         </div>

//         {/* Правая часть: текстовые элементы */}
//         <div className="flex flex-col items-start justify-center ml-auto w-full lg:w-9/12">
//           <h3 className="text-3xl lg:text-4xl font-medium leading-relaxed text-black-600">
//           Технологический AI сервис подбора персонала
//           </h3>
//           <p className="my-2 text-black-500">
//           Мы объединили современные технологии в нашем сервисе
//           </p>
//           <ul className="text-black-500 self-start list-inside ml-8">
//             {features.map((feature, index) => (
//               <li
//                 className="relative circle-check custom-list hover:scale-110 transition-transform duration-200"
//                 key={feature}
//               >
//                 {feature}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Feature;
