'use client'
import Link from "next/link";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils/formatersIntl";
import { getDurationFromMonths } from "@/lib/utils/getDurationFromMonths";
import { workStatusDict } from "@/shared/dictionaries/resume";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { ru } from "date-fns/locale";
import { MapPin } from "lucide-react";
import { ECvStatus, TResume } from "@/shared/types/resume";
import { FC } from "react";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import { Badge } from "../ui/badge";

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

const ReserveCvCard: FC<TProps> = ({
  resume
}) => {
  const { companyId } = useParams()
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
            {getDurationFromMonths(resume.experience_months)}
          </p>
          <Badge className={cn("py-1 bg-transparent ring-1", badgeColors[resume.status || 'default'])}>
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

export default ReserveCvCard;