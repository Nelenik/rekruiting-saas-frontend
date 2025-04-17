import { StartPageButton } from "@/shared/ui/buttons/StartPageButtons";
import FormItem from "@/shared/ui/FormItem";
import { Input } from "@/shared/ui/shadcn/input";

export const SignInForm = () => {
  return (
    <form className="flex flex-col justify-between grow gap-8">
      <FormItem
        labelText="Логин *"

      // error={errors?.name}
      >

        <Input
          placeholder="Введите логин"
          required
          name="login"
        // defaultValue={defaultValues?.name}
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
          required
          name="password"
        // defaultValue={defaultValues?.inn}
        // className={cn(errors?.inn && 'ring-2 ring-destructive')}
        // onChange={onChange}
        />
      </FormItem>


      <StartPageButton
        type="submit"
      >
        Войти в админ панель
      </StartPageButton>
    </form>
  );
}