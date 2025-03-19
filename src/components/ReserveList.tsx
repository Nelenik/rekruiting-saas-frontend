import { ECvStatus, TResume } from "@/shared/types/resume";
import List from "./ui/list";
import { FC } from "react";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { MapPin } from "lucide-react";
import { Badge } from "./ui/badge";
import { workStatusDict } from "@/shared/dictionaries/resume";
import { formatPrice } from "@/lib/utils/formatersIntl";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { cn } from "@/lib/utils";
import EditEntityModal from "./modals/EditEntityModal";
import { getDurationFromMonths } from "@/lib/utils/getDurationFromMonths";

type TProps = {
  resumeList: TResume[]
}

const badgeColors = {
  [ECvStatus.LOOKING]: 'ring-emerald-400 text-emerald-400 hover:text-white hover:bg-emerald-400/70',
  [ECvStatus.CONSIDERING]: 'ring-yellow-400 text-yellow-400 hover:text-white hover:bg-yellow-400/70',
  [ECvStatus.NOT_LOOKING]: 'ring-muted-foreground text-muted-foreground hover:text-white hover:bg-muted-foreground/70',
  [ECvStatus.OFFER]: 'ring-sky-500 text-sky-500 hover:text-white hover:bg-sky-500/70',
  default: 'ring-gray-300 text-gray-300 hover:text-white hover:bg-gray-300/70'
}

const ReserveList: FC<TProps> = ({
  resumeList
}) => {

  return (
    <List className="self-start grow flex flex-col gap-4 ">
      {resumeList.map((resume) => (
        <li className="text-lg w-[min(100%,850px)] mx-auto" key={resume.id}>
          <Card className="py-2 px-6 min-h-[102px] flex gap-6 items-center justify-between h-full relative">

            <Avatar >
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>C</AvatarFallback>
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
            <EditEntityModal entityType="resume" triggerView="icon" initialData={resume} className="absolute right-0 top-0" />
          </Card>
        </li>
      ))}
    </List>
  );
}

export default ReserveList;