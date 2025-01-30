import { cn } from "@/lib/utils";

interface IFormItem {
  labelText?: string,
  children: React.ReactNode,
  className?: string
  error?: string | null
}

export const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <p className="text-destructive text-xs absolute right-0 top-2">
      {message}
    </p>
  )
}

const FormItem = ({ labelText, children, className, error = null }: IFormItem) => {
  return (
    <label className={cn("relative flex flex-col gap-2.5", className)}>
      {labelText && <span className="font-medium">
        {labelText}
      </span>}
      {children}
      {error && <ErrorMessage message={error} />}
    </label>
  );
}

export default FormItem;