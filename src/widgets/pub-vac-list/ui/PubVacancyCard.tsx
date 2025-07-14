import { vacancyExperienceDict, vacancyWorkFormatDict } from "@/entities/vacancy";
import { EVacancyWorkFormat, TPublicVacancy } from "@/shared/api/types";
import { encodeSegment } from "@/shared/lib/encodeSegments";
import { formatSalaryRange } from "@/shared/lib/formatters/formatSalaryRange";
import { generateRgbFromString } from "@/shared/lib/formatters/generateRgbFromString";
import { cn } from "@/shared/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/shadcn/avatar";
import { Badge } from "@/shared/ui/shadcn/badge";
import { Card } from "@/shared/ui/shadcn/card";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { MapPin } from "lucide-react";
import Link from "next/link";

const badgeColors = {
  [EVacancyWorkFormat.HYBRID]: 'ring-yellow-400 text-yellow-400 hover:text-white hover:bg-yellow-400/70',
  [EVacancyWorkFormat.OFFICE]: 'ring-sky-500 text-sky-500 hover:text-white hover:bg-sky-500/70',
  [EVacancyWorkFormat.REMOTE]: 'ring-emerald-400 text-emerald-400 hover:text-white hover:bg-emerald-400/70',
  default: 'ring-gray-300 text-gray-300 hover:text-white hover:bg-gray-300/70'
}

type Props = {
  vacancy: TPublicVacancy
}
export const PubVacancyCard = ({
  vacancy
}: Props) => {
  const salaryOfferString = formatSalaryRange(vacancy.salary_from || 0, vacancy.salary_to || 0);

  //get avatar fallback color
  const avatarBgColor = generateRgbFromString(vacancy.name)
  return (
    <Link
      scroll={false}
      href={`/vacancy/${vacancy.id}/${encodeSegment(vacancy.name)}`}
    >
      <Card className={cn(
        "py-2 px-6 min-h-[102px] flex gap-6 flex-wrap items-center justify-between h-full",
        "hover:shadow-md transform hover:-translate-y-1 transition-all duration-200"
      )}>
        <Avatar className="w-[68px] h-[68px]">
          <AvatarImage
            src={''}
            alt={`${vacancy.company.name} avatar`}
          />
          <AvatarFallback
            className="text-white "
            style={{ background: avatarBgColor }}
          >
            {(vacancy.company.name || '').at(0)?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="w-[200px] ">
          <p>
            {vacancy.company.name || 'Компания неизвестна'}
          </p>
          <p className="font-semibold">
            {vacancy.name}
          </p>
          <p className="text-muted-foreground flex items-center gap-2">
            <MapPin size={16} />
            {vacancy.location || 'Не указан'}
          </p>
        </div>
        <div className="w-max min-w-[140px] mr-auto">
          <p className="mb-3">
            <span className="font-medium">Опыт: </span>{vacancyExperienceDict[vacancy.experience]}
          </p>
          <Badge
            className={cn(
              "py-0.5 bg-transparent ring-1 min-w-[75px] justify-center items-center ",
              badgeColors[vacancy.work_format as EVacancyWorkFormat || 'default']
            )}>
            {vacancyWorkFormatDict[vacancy.work_format] || 'Не указан'}
          </Badge>
        </div>
        <div className="w-max min-w-[140px] grow">
          <p className="font-semibold">
            {salaryOfferString}
          </p>
          <p>
            {vacancy.publication_at ? format(new Date(vacancy.publication_at), "d MMMM yyyy", { locale: ru }) : 'Дата публикации неизвестна'}
          </p>
        </div>
      </Card>
    </Link>
  );
}