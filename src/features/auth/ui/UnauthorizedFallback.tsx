'use client'
import { Card } from "@/shared/ui/shadcn/card";
import { SignOutForm } from "./SignOutForm";
import { usePathname, useSearchParams } from "next/navigation";

export const UnauthorizedFallback = () => {
  const pathname = usePathname();
  const search = useSearchParams().toString();
  const nextPath = pathname + (search ? `?${search}` : '');
  const redirectTo = `/?redirectTo=${encodeURIComponent(nextPath)}`;

  return (
    <div className="w-full h-dvh relative">
      <Card
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90%,500px)] p-12 flex flex-col items-center text-xl"
      >
        <h1 className="mb-8 text-xl font-semibold">Ваша сессия истекла</h1>
        <p className="text-center mb-3 text-base max-w-[85%]">
          Пожалуйста, авторизуйтесь, чтобы продолжить работу с приложением.
        </p>
        <p className="text-center mb-8 text-base max-w-[80%]">
          Если у вас нет учетной записи, пожалуйста, свяжитесь с администратором.
        </p>

        <SignOutForm
          redirectTo={redirectTo.toString()}
        >
          Перейти к авторизации
        </SignOutForm>
      </Card>
    </div>
  );
}