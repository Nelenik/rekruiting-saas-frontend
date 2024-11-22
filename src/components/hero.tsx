import Image from "next/image";
import { Button } from "@/components/ui/button"; // предполагаем, что вы используете shadcn Button

const Hero = () => {
  return (
    <div className="flex flex-col-reverse sm:flex-row items-center justify-between py-6 sm:py-16 gap-8 max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto">
      {/* Text Section */}
      <div className="flex flex-col justify-center items-start sm:items-start text-left space-y-4 sm:space-y-6 max-w-xl">
        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-black leading-normal">
        Новый подход к подбору персонала <strong>RekrutAL</strong>.
        </h1>
        <p className="text-black/70 text-base sm:text-lg">
        Используя передовые технологии AI, мы автоматизируем процесс поиска и отбора кандидатов.
        </p>
        <Button variant="destructive" className="px-6 py-3 mt-4 sm:mt-6 font-medium tracking-wide py-2 px-5 sm:px-8 border border-red-500 text-black bg-white outline-none rounded-l-full rounded-r-full capitalize hover:bg-red-500 hover:text-white transition-all hover:shadow-red">Оставить заявку</Button>
      </div>

      {/* Image Section */}
      <div className="flex w-full max-w-md sm:max-w-lg justify-center">
        <Image
          src="/assets/Illustration1.png"
          alt="VPN Illustration"
          quality={100}
          width={612}
          height={383}
          layout="responsive"
          className="rounded-md"
        />
      </div>
    </div>
  );
};

export default Hero;
