import { cn } from "@/shared/lib/utils";
import { Card } from "@/shared/ui/shadcn/card";
import { TextFormatter } from "@/shared/ui/TextFormatter";
import { Fragment } from "react";

type TProps = {
  className?: string,
  description?: string,
  skills?: string,
  responsibilities?: string,
  conditions?: string,
  addition?: string
}
export const VacancyDescription = ({
  className,
  description = '',
  skills = '',
  responsibilities = '',
  conditions = '',
  addition = ''
}: TProps) => {
  const vacancyCharacteristics: { title: string, content: string }[] = [
    {
      title: 'Обязанности',
      content: responsibilities,
    },
    {
      title: 'Требования',
      content: skills,
    },
    {
      title: 'Условия',
      content: conditions,
    },
    {
      title: 'Дополнительно',
      content: addition,
    }
  ]
  return (
    <div className={cn('flex flex-col gap-5', className)}>
      {description && <Card
        className={cn(
          'py-6 px-8 rounded-3xl border-secondary'
        )}
      >
        <h3 className="text-xl text-foreground font-semibold mb-5">
          Описание вакансии
        </h3>
        <TextFormatter text={description} className="text-foreground text-sm" />
      </Card>}
      {vacancyCharacteristics.map((item) => (
        <Fragment key={item.title}>
          {item.content && <Card
            className={cn(
              'py-6 px-8 rounded-3xl border-secondary'
            )}
          >
            <h3 className="text-xl text-foreground font-semibold mb-5">
              {item.title}
            </h3>
            <TextFormatter text={item.content} className="text-foreground text-sm" />
          </Card>}
        </Fragment>
      ))}
    </div>
  );
}