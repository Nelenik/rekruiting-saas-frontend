import { Card } from "../shadcn/card";
import { BoardSkeleton } from "./BoardSkeleton";

export const VacancyPageSkeleton = () => {
  return (
    <div className="flex gap-6 flex-col relative">
      <Card className="w-full py-4 px-6 flex gap-6 relative animate-pulse">

        <div className="p-5 rounded-full bg-gray-200 self-start sm:block hidden">
        </div>

        <div className="grow">
          <p className="h-4  bg-gray-200 rounded-full dark:bg-gray-700 w-[25%] mb-4"> </p>

          <ul
            className="
      grid grid-cols-[repeat(auto-fit,_minmax(145px,_1fr))] gap-6
      w-[min(100%,1000px)]
      [&>li:not(:first-child):after]:content-[''] 
      [&>li:not(:first-child):after]:w-px
      [&>li:not(:first-child):after]:h-[60%]
      [&>li:not(:first-child):after]:bg-gray-300
      [&>li:not(:first-child):after]:text-muted-foreground 
      [&>li:not(:first-child):after]:absolute 
      [&>li:not(:first-child):after]:-left-3 
      [&>li:not(:first-child):after]:top-1/2 
      [&>li:not(:first-child):after]:-translate-y-1/2 
      "
          >
            {Array.from({ length: 6 }, (_, i) => (
              <li
                key={i}
                className="flex flex-col gap-1 relative"
              >
                <p className="h-2.5  bg-gray-200 rounded-full dark:bg-gray-700  w-[40%]"></p>
                <p className="h-4  bg-gray-200 rounded-full dark:bg-gray-700 "></p>
              </li>
            ))}
          </ul>
        </div>
      </Card>
      <BoardSkeleton className="h-[800px]" />
    </div>
  );
}