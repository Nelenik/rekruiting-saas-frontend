'use client'
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { ru } from "date-fns/locale";
import { MapPin } from "lucide-react";
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

type TProps = {
  resume: TResume
}

const badgeColors = {
  [ECvStatus.LOOKING]: 'ring-emerald-400 text-emerald-400 hover:text-white hover:bg-emerald-400/70',
  [ECvStatus.CONSIDERING]: 'ring-yellow-400 text-yellow-400 hover:text-white hover:bg-yellow-400/70',
  [ECvStatus.NOT_LOOKING]: 'ring-muted-foreground text-muted-foreground hover:text-white hover:bg-muted-foreground/70',
  [ECvStatus.OFFER]: 'ring-sky-500 text-sky-500 hover:text-white hover:bg-sky-500/70',
  default: 'ring-gray-300 text-gray-300 hover:text-white hover:bg-gray-300/70'
}

export const CvCard: FC<TProps> = ({
  resume
}) => {
  const params = useParams();
  const companyId = params?.companyId as string | undefined;
  return (
    <Link
      scroll={false}
      href={`/dashboard/${companyId}/cvDetails/${resume.id}?name=${resume.name}`}
    >
      <Card className="py-2 px-6 min-h-[102px] flex gap-6 items-center justify-between h-full">
        <Avatar >
          <AvatarImage
            src={resume.candy_photo}
            alt={`${resume.candy_name} avatar`}
          />
          <AvatarFallback>
            {(resume.candy_name || '').at(0)?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="w-[40%] mr-auto">
          <p>
            {resume.candy_name || 'Имя не указано'}
          </p>
          <p className="font-semibold">
            {resume.name}
          </p>
          <p className="text-muted-foreground flex items-center gap-2">
            <MapPin size={16} />
            {resume.candy_location || 'Не указан'}
          </p>
        </div>
        <div className="w-[25%]">
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
        <div className="w-[25%]">
          <p className="font-medium">
            {formatPrice(resume.salary || 0, 'ru-Ru', 'RUB')}
          </p>
          <p>
            {format(new Date(), "d MMMM yyyy", { locale: ru })}
          </p>
        </div>
      </Card>
    </Link>
  );
}
