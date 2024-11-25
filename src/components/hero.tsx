// import Image from "next/image";
// import { Button } from "@/components/ui/button"; // предполагаем, что вы используете shadcn Button

// const Hero = () => {
//  const listUser = [
//     {
//       name: "Users",
//       number: "390",
//       icon: "/assets/Icon/heroicons_sm-user.svg",
//     },
//     {
//       name: "Locations",
//       number: "20",
//       icon: "/assets/Icon/gridicons_location.svg",
//     },
//     {
//       name: "Server",
//       number: "50",
//       icon: "/assets/Icon/bx_bxs-server.svg",
//     },
//   ]




//   return (
//     <div className="flex flex-col-reverse sm:flex-row items-center justify-between py-6 sm:py-16 gap-8 max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto">
//       {/* Text Section */}
//       <div className="flex flex-col justify-center items-start sm:items-start text-left space-y-4 sm:space-y-6 max-w-xl">
//         <h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-black leading-normal">
//         Новый подход к подбору персонала <strong>RekrutAI</strong>.
//         </h1>
//         <p className="text-black/70 text-base sm:text-lg">
//         Используя передовые технологии AI, мы автоматизируем процесс поиска и отбора кандидатов.
//         </p>
//         <Button variant="destructive" className="px-6 py-3 mt-4 sm:mt-6 font-medium tracking-wide sm:px-8 border border-red-500 text-white bg-red-500 outline-none rounded-l-full rounded-r-full capitalize hover:bg-red-500 hover:text-white transition-all hover:shadow-lg hover:shadow-red-500/50">Оставить заявку</Button>
//       </div>

//       {/* Image Section */}
//       <div className="flex w-full max-w-md sm:max-w-lg justify-center">
//         <Image
//           src="/assets/Illustration1.png"
//           alt="VPN Illustration"
//           quality={100}
//           width={612}
//           height={383}
//           // layout="responsive"

//           className="rounded-md"
//         />
//       </div>
//     </div>
//   );
// };

// export default Hero;

import Image from "next/image";
import { Button } from "@/components/ui/button"; // ShadCN Button
import { User, MapPin, Server } from "lucide-react";

const Hero = () => {
  const listUser = [
    {
      name: "Обработано вакансий",
      number: "19000+",
      icon: <User className="h-6 w-6 text-red-500" />,
    },
    {
      name: "Найдено релевантных кандидатов",
      number: "280+",
      icon: <MapPin className="h-6 w-6 text-red-500" />,
    },
    {
      name: "Процент отбора",
      number: "97.38%",
      icon: <Server className="h-6 w-6 text-red-500" />,
    },
  ];

  return (
    <div className="flex flex-col gap-0">
      {/* Hero Section */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between py-6 sm:py-16 gap-8 max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto">
        {/* Text Section */}
        <div className="flex flex-col justify-center items-start text-left space-y-4 sm:space-y-6 max-w-xl">
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-black leading-normal">
            Новый подход к подбору персонала <strong>RekrutAI</strong>.
          </h1>
          <p className="text-black/70 text-base sm:text-lg">
            Используя передовые технологии AI, мы автоматизируем процесс поиска
            и отбора кандидатов.
          </p>
          <Button
            variant="destructive"
            className="px-6 py-3 mt-4 sm:mt-6 font-medium tracking-wide sm:px-8 border border-red-500 text-white bg-red-500 outline-none rounded-l-full rounded-r-full capitalize hover:bg-red-500 hover:text-white transition-all hover:shadow-lg hover:shadow-red-500/50"
          >
            Оставить заявку
          </Button>
        </div>

        {/* Image Section */}
        <div className="flex w-full max-w-md sm:max-w-lg justify-center">
          <Image
            src="/assets/Illustration1.png"
            alt="VPN Illustration"
            quality={100}
            width={612}
            height={383}
            className="rounded-md"
          />
        </div>
      </div>

      {/* New Section */}
      <div className="relative w-full flex flex-col items-center">
        <div className="max-w-screen-xl w-full flex flex-col sm:flex-row justify-between items-center py-6 sm:py-16 px-6 sm:px-8 lg:px-16 rounded-lg divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-gray-200 bg-gray-100 z-10">
          {listUser.map((item, index) => (
            <div
              key={index}
              className="flex items-center w-full justify-start sm:justify-center py-4 sm:py-0 px-4 sm:px-6"
            >
              <div className="flex items-center w-auto">
                <div className="flex items-center justify-center bg-red-50 w-12 h-12 mr-4 rounded-full">
                  {item.icon}
                </div>
                <div className="flex flex-col">
                  <p className="text-xl text-black font-bold">{item.number}</p>
                  <p className="text-lg text-gray-500">{item.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          className="absolute bg-black opacity-5 w-11/12 rounded-lg h-64 sm:h-48 top-0 mx-auto left-0 right-0"
          style={{ filter: "blur(114px)" }}
        ></div>
      </div>

    </div>
  );
};

export default Hero;

