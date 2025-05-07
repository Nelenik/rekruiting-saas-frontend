import { Avatar, AvatarFallback } from "@/shared/ui/shadcn/avatar";
import { Badge } from "@/shared/ui/shadcn/badge";
import { Card } from "@/shared/ui/shadcn/card";
import List from "@/shared/ui/shadcn/list";
export const CvCardSkeleton = () => {
  return (
    <Card className="py-2 px-6 min-h-[102px] flex gap-6 items-center justify-between h-full animate-pulse">
      <Avatar >
        <AvatarFallback>

        </AvatarFallback>
      </Avatar>
      <div className="w-[40%] mr-auto flex flex-col gap-2">
        <p className="h-4 w-[85%] bg-gray-200 rounded-full dark:bg-gray-700">
        </p>
        <p className="h-4 bg-gray-200 rounded-full dark:bg-gray-700">
        </p>
        <p className="h-4 w-[80%] bg-gray-200 rounded-full dark:bg-gray-700">
        </p>
      </div>
      <div className="w-[25%] flex flex-col gap-2">
        <p className="h-4 bg-gray-200 rounded-full dark:bg-gray-700">
        </p>
        <Badge className="w-10 h-5 bg-gray-200">
        </Badge>
      </div>
      <div className="w-[25%] flex flex-col gap-2">
        <p className="h-4 w-[50%] bg-gray-200 rounded-full dark:bg-gray-700">
        </p>
        <p className="h-4 bg-gray-200 rounded-full dark:bg-gray-700">
        </p>
      </div>
    </Card>
  );
}

export const CvListSkeleton = () => {
  return (
    <List className="flex flex-col gap-4 w-full">
      {Array.from({ length: 10 }, (_, i) => (
        <li key={i} className="w-[min(100%,850px)] mx-auto">
          <CvCardSkeleton />
        </li>
      ))}
    </List>
  );
}