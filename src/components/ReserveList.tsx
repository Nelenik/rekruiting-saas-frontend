import { TResume } from "@/shared/types/resume";
import List from "./ui/list";
import { FC } from "react";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { MapPin } from "lucide-react";
import { Badge } from "./ui/badge";
import { workStatusDict } from "@/shared/dictionaries/resume";

type TProps = {
  resumeList: TResume[]
}

const ReserveList: FC<TProps> = ({
  resumeList
}) => {
  return (
    <List className="grow ">
      {resumeList.map((resume) => (
        <li className="[&:not(:last-child)]:mb-4 text-lg" key={resume.id}>
          <Card className="py-2 px-6 flex gap-6 items-center justify-between">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>C</AvatarFallback>
            </Avatar>
            <div>
              <p>
                {resume.candy_name}
              </p>
              <p className="font-semibold">
                {resume.name}
              </p>
              <p className="text-muted-foreground flex items-center gap-2">
                <MapPin size={16} />
                {resume.candy_location}
              </p>
            </div>
            <div>
              <p>
                8.5 лет опыта
              </p>
              <Badge className="bg-transparent border-none ring-2 ring-primary text-primary">
                {workStatusDict[resume.work_status]}
              </Badge>
            </div>
            <div>
              <p className="font-medium">
                100.000 ₽
              </p>
              <p>
                20 января 2025
              </p>
            </div>
          </Card>
        </li>
      ))}
    </List>
  );
}

export default ReserveList;