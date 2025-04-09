import { cn } from "@/shared/lib/utils";
import { TextFormatter } from "@/shared/ui/TextFormatter";

type TProps = {
  title: string,
  summary: string,
  className?: string
}
export const Summary = ({
  title,
  summary,
  className
}: TProps) => {
  return (
    <div className={cn(className)}>
      <h2 className="scroll-m-20 mb-3 text-lg font-semibold tracking-tight">
        {title}
      </h2>
      <TextFormatter text={summary || 'Отсутствует'} className="text-muted-foreground text-sm" />
    </div>
  );
}