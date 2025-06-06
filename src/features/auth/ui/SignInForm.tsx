'use client'
// import { useFormMutation } from "@/shared/model/hooks/useFormMutation";
import { StartPageButton } from "@/shared/ui/buttons/StartPageButtons";
import FormItem from "@/shared/ui/FormItem";
import { Input } from "@/shared/ui/shadcn/input";
import { signin } from "../api/auth-actions";
import { useSearchParams } from "next/navigation";
import { useMutateForm } from "@/shared/model/hooks/useMutateForm";

export const SignInForm = () => {
  //Get redirectTo from URL
  const serachParams = useSearchParams()
  // Bind the signin function to the redirectTo parameter
  const { formAction, pending, defaultValues } = useMutateForm<{ email: string, password: string }>({
    mutationAction: signin.bind(null, serachParams.get('redirectTo') || null),

  })
  return (
    <form action={formAction} className="flex flex-col justify-between grow gap-8">
      <FormItem
        labelText="Email *"

      // error={errors?.name}
      >

        <Input
          placeholder="example@mail.com"
          type="email"
          required
          name="email"
          defaultValue={defaultValues?.email}
        // className={errors?.name && 'ring-2 ring-destructive'}
        // onChange={onChange}
        />
      </FormItem>

      <FormItem
        labelText="Пароль *"
      // error={errors?.inn}
      >
        <Input
          placeholder="Введите пароль"
          type='password'
          required
          name="password"
          defaultValue={defaultValues?.password}
        // className={cn(errors?.inn && 'ring-2 ring-destructive')}
        // onChange={onChange}
        />
      </FormItem>


      <StartPageButton
        type="submit"
      >
        {pending ? "Авторизация..." : "Войти в систему"}
      </StartPageButton>
    </form>
  );
}