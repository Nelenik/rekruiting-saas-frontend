'use client'
import Link from "next/link";
import { ru } from "date-fns/locale";
import { MapPin, UserRound } from "lucide-react";
import { ECvStatus, TResume } from "@/shared/api/types/resume";
import { FC } from "react";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import { cn } from "@/shared/lib/utils";
import { formatPrice } from "@/shared/lib/formatters/formatersIntl";
import { formatDurationFromMonths } from "@/shared/lib/formatters/formatDurationFromMonths";
import { Card } from "@/shared/ui/shadcn/card";
import { Badge } from "@/shared/ui/shadcn/badge";
import { workStatusDict } from "../lib/dictionary";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/shadcn/avatar";
import { encodeSegment } from "@/shared/lib/encodeSegments";

type TProps = {
  resume: TResume,
  className?: string
}

const badgeColors = {
  [ECvStatus.LOOKING]: 'ring-emerald-400 text-emerald-400 hover:text-white hover:bg-emerald-400/70',
  [ECvStatus.CONSIDERING]: 'ring-yellow-400 text-yellow-400 hover:text-white hover:bg-yellow-400/70',
  [ECvStatus.SILENT]: 'ring-muted-foreground text-muted-foreground hover:text-white hover:bg-muted-foreground/70',
  [ECvStatus.OFFER]: 'ring-sky-500 text-sky-500 hover:text-white hover:bg-sky-500/70',
  default: 'ring-gray-300 text-gray-300 hover:text-white hover:bg-gray-300/70'
}

export const CvCard: FC<TProps> = ({
  resume,
  className
}) => {
  const params = useParams();
  const companyId = params?.companyId as string | undefined;
  return (
    <Link
      scroll={false}
      href={`/dashboard/${companyId}/cvDetails/${resume.id}/${encodeSegment(resume.name)}`}
    >
      <Card className={cn(
        "py-2 px-6 min-h-[102px] flex flex-wrap gap-6 items-center justify-between h-full",
        className
      )}>
        <Avatar className="w-[68px] h-[68px]">
          <AvatarImage
            src={resume.candy_photo}
            alt={`${resume.candy_name} avatar`}
          />
          <AvatarFallback>
            {resume.candy_name ? (resume.candy_name).at(0)?.toUpperCase() : <UserRound />}
          </AvatarFallback>
        </Avatar>
        <div className="w-[35%] min-w-[200px] grow">
          <p className="hyphens-auto">
            {resume.candy_name || 'Имя не указано'}
          </p>
          <p className="font-semibold hyphens-auto">
            {resume.name}
          </p>
          <p className="text-muted-foreground flex items-center gap-2">
            <MapPin size={16} />
            {resume.candy_location || 'Не указан'}
          </p>
        </div>
        <div className="w-max min-w-[140px] grow">
          <p>
            {formatDurationFromMonths(resume.experience_months)}
          </p>
          <Badge
            className={cn(
              "py-1 bg-transparent ring-1",
              badgeColors[resume.status || 'default']
            )}>
            {workStatusDict[resume.status] || 'не установлен'}
          </Badge>
        </div>
        <div className="w-max min-w-[140px] grow">
          <p className="font-medium">
            {formatPrice(resume.salary || 0, 'ru-Ru', 'RUB')}
          </p>
          <p>
            {format(new Date(resume.created_at), "d MMMM yyyy", { locale: ru })}
          </p>
        </div>
      </Card>
    </Link>
  );
}
