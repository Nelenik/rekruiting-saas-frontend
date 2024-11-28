import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getWordEndings } from "@/utils/getWordEnding";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

interface IVacancyCard {
  vacancyName: string,
  daysInProcessing: number,
  vacancyStatus: string,
  className?: string
}

const VacancyCard = ({ vacancyName, daysInProcessing, vacancyStatus, className, }: IVacancyCard) => {

  const daysString = `${daysInProcessing} ${getWordEndings(daysInProcessing, ['день', 'дня', 'дней'])}`

  //styles for diferent statuses
  const badgeColors: Record<string, string> = {
    'настройка': 'bg-indigo-300 hover:bg-indigo-300/80',
    'в работе': 'bg-blue-300 hover:bg-blue-300/80',
    'на паузе': 'bg-gray-500 hover:bg-gray-500/80',
    'ожидание': 'bg-emerald-400 hover:bg-emerald-400/80',
  }

  //convert vacansy status to lower case
  const lowerCasedStatus = vacancyStatus.toLowerCase()

  return (
    <Card className={cn("w-full py-4 px-6 hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200", className)}>
      <CardHeader className="p-0 mb-2">
        <CardTitle className="text-base">{vacancyName}</CardTitle>
      </CardHeader>
      <CardFooter className="flex justify-between p-0 text-sm text-muted-foreground">
        {daysString}
        <Badge className={badgeColors[lowerCasedStatus] ?? 'bg-zinc-900 hover:bg-zinc-900/80'}>{lowerCasedStatus}</Badge>
      </CardFooter>
    </Card>
  );
}

export default VacancyCard;