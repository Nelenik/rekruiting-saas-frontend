import { LoaderPinwheel } from "lucide-react"; // Используйте lucide-react вместо lucide-preact для React
import React from "react";

const Logo: React.FC = () => {
  return (
    <div className="flex items-center space-x-2">
      {/* Иконка */}
      <LoaderPinwheel className="text-red-500 w-6 h-6 animate-spin" />
      {/* Текст */}
      <span className="text-xl font-bold">RekrutAI</span>
    </div>
  );
};

export default Logo;
