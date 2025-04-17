import { FC } from "react";
// import { Logo } from "@/components/ui/logo"; // Предположим, что у вас есть компонент Logo

// Социальные иконки (Lucide или другие иконки из ShadCN)
import { Twitter, Linkedin, Github, Instagram } from "lucide-react";
import { Button } from "@/shared/ui/shadcn/button";

const Footer: FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Логотип и описание */}
          <div>
            {/* <Logo className="text-white text-3xl font-bold mb-4" /> */}
            <p className="text-gray-400 text-sm">
              Ваш партнер в сфере эффективных решений. Мы помогаем вам быстро находить релеватных кандидатов.
            </p>
          </div>

          {/* Ссылки */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4"></h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-gray-400 hover:text-white">
                  О нас
                </a>
              </li>
              <li>
                <a href="/services" className="text-gray-400 hover:text-white">
                  Услуги
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white">
                  Контакты
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-400 hover:text-white">
                  Политика конфиденциальности
                </a>
              </li>
            </ul>
          </div>

          {/* Социальные сети */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Следите за нами</h3>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Кнопка для связи */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Свяжитесь с нами</h3>
            {/* <Button variant="outline" className="text-white border-white hover:bg-white hover:text-gray-800">
              Написать нам
            </Button> */}
            <Button
              variant="destructive"
              className="px-6 py-3 mt-4 sm:mt-6 font-medium tracking-wide sm:px-8 border border-red-500 text-white bg-red-500 outline-none rounded-l-full rounded-r-full capitalize hover:bg-red-500 hover:text-white transition-all hover:shadow-lg hover:shadow-red-500/50"
            >
              Оставить заявку
            </Button>
          </div>
        </div>

        {/* Нижняя часть футера */}
        <div className="mt-12 border-t border-gray-700 pt-4 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} RekrutAI. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
