"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/shadcn/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/ui/shadcn/card";
import { useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Анна Иванова",
    position: "Менеджер по продажам",
    avatar: "https://i.pravatar.cc/150?img=3",
    feedback:
      "Отличная работа! Команда превзошла все ожидания. Сервис был быстрым, а поддержка — на высшем уровне.",
  },
  {
    id: 2,
    name: "Игорь Петров",
    position: "Директор по маркетингу",
    avatar: "https://i.pravatar.cc/150?img=8",
    feedback:
      "Потрясающий результат. Очень приятно работать с такими профессионалами. Рекомендую всем!",
  },
  {
    id: 3,
    name: "Екатерина Сидорова",
    position: "HR-специалист",
    avatar: "https://i.pravatar.cc/150?img=12",
    feedback:
      "Сервис действительно экономит время. Команда понимает задачи клиента и предлагает лучшие решения.",
  },
  {
    id: 4,
    name: "Олег Кузнецов",
    position: "Старший разработчик",
    avatar: "https://i.pravatar.cc/150?img=15",
    feedback:
      "Очень впечатлен качеством работы и вниманием к деталям. Буду работать с вами снова!",
  },
  {
    id: 5,
    name: "Марина Смирнова",
    position: "Аналитик данных",
    avatar: "https://i.pravatar.cc/150?img=21",
    feedback:
      "Быстро, эффективно и профессионально. Приятно, когда понимают твои потребности с первого раза.",
  },
  {
    id: 6,
    name: "Дмитрий Волков",
    position: "Владелец бизнеса",
    avatar: "https://i.pravatar.cc/150?img=5",
    feedback:
      "Сервис действительно на высоте. Помогли реализовать сложный проект в короткие сроки.",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (testimonials.length - 2));
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length - 2) % (testimonials.length - 2)
    );
  };

  return (
    <section id="testimoni" className="max-w-7xl mx-auto px-4 py-16 mb-10">
      <h2 className="text-center text-3xl font-bold mb-10 text-gray-800">
        Отзывы наших клиентов
      </h2>

      <div className="relative">
        {/* Контейнер для отзывов */}
        <div className="flex space-x-4 overflow-hidden">
          {/* Отзывы */}
          {testimonials.slice(currentIndex, currentIndex + 3).map((testimonial) => (
            <Card
              key={testimonial.id}
              className="w-full sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3 shadow-lg"
            >
              <CardHeader className="flex items-center space-x-4 pb-4 border-b">
                <Avatar>
                  <AvatarImage
                    src={testimonial.avatar}
                    alt={testimonial.name}
                  />
                  <AvatarFallback>
                    {testimonial.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <p className="text-sm text-gray-500">{testimonial.position}</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 italic">
                  {testimonial.feedback}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Кнопки для переключения */}
        <div className="absolute top-full left-0 right-0 flex justify-center space-x-4 mt-4">
          <button
            onClick={prevTestimonial}
            className="bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-full p-2"
          >
            &lt;
          </button>
          <button
            onClick={nextTestimonial}
            className="bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-full p-2"
          >
            &gt;
          </button>
        </div>
      </div>
    </section>
  );
}




// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";


// const testimonials = [
//   {
//     id: 1,
//     name: "Анна Иванова",
//     position: "Менеджер по продажам",
//     avatar: "https://i.pravatar.cc/150?img=3",
//     feedback:
//       "Отличная работа! Команда превзошла все ожидания. Сервис был быстрым, а поддержка — на высшем уровне.",
//   },
//   {
//     id: 2,
//     name: "Игорь Петров",
//     position: "Директор по маркетингу",
//     avatar: "https://i.pravatar.cc/150?img=8",
//     feedback:
//       "Потрясающий результат. Очень приятно работать с такими профессионалами. Рекомендую всем!",
//   },
//   {
//     id: 3,
//     name: "Екатерина Сидорова",
//     position: "HR-специалист",
//     avatar: "https://i.pravatar.cc/150?img=12",
//     feedback:
//       "Сервис действительно экономит время. Команда понимает задачи клиента и предлагает лучшие решения.",
//   },
// ];

// export default function Testimonials() {
//   return (
//     <section className="max-w-5xl mx-auto px-4 py-16">
//       <h2 className="text-center text-3xl font-bold mb-10 text-gray-800">
//         Отзывы наших клиентов
//       </h2>
//       <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//         {testimonials.map((testimonial) => (
//           <Card key={testimonial.id} className="shadow-lg">
//             <CardHeader className="flex items-center space-x-4 pb-4 border-b">
//               <Avatar>
//                 <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
//                 <AvatarFallback>
//                   {testimonial.name[0]}
//                 </AvatarFallback>
//               </Avatar>
//               <div>
//                 <CardTitle className="text-lg">{testimonial.name}</CardTitle>
//                 <p className="text-sm text-gray-500">{testimonial.position}</p>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <p className="text-gray-600 italic">{testimonial.feedback}</p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </section>
//   );
// }
