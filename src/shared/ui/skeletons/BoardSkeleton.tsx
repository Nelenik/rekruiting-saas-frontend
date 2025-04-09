'use client'
import { cn } from "@/shared/lib/utils"
import { Card } from "../shadcn/card"

export const BoardCardSkeleton = () => {
  return (
    <Card
      className='w-full py-4 pr-6 pl-7 flex flex-col gap-2'
    >
      <p className="h-4 w-[85%] bg-gray-200 rounded-full dark:bg-gray-700"></p>
      <p className="h-4 w-[75%] bg-gray-200 rounded-full dark:bg-gray-700">

      </p>
      <p className="h-4 w-[65%] bg-gray-200 rounded-full dark:bg-gray-700">
      </p>
    </Card>
  )
}

export const BoardListSkeleton = ({ count = 10 }: { count: number }) => {
  return (
    <div className="flex flex-col gap-2 grow overflow-hidden">
      {Array.from({ length: count }, (_, i) => (
        <BoardCardSkeleton key={i} />
      ))}
    </div>
  )
}

export const BoardColSkeleton = ({
  count = 10,
}: { count: number }) => {
  return (
    <div className="flex flex-col gap-6 ring-2 ring-offset-4 rounded-lg ring-border w-1/5 min-w-[250px] animate-pulse pb-1">
      <Card
        className="w-full  py-4 px-6 flex flex-col items-center gap-2"
      >
        <p className="h-4  bg-gray-200 rounded-full dark:bg-gray-700 w-[30%]"></p>
        <p className="w-6"></p>

      </Card>
      <BoardListSkeleton count={count} />
    </div>
  )
}

type Props = {
  cols?: { cardsCount: number }[],
  simpleCols?: boolean,
  className?: string
}

const defCols = [{
  cardsCount: 10
},
{
  cardsCount: 0
},
{
  cardsCount: 3
},
{
  cardsCount: 4
},
{
  cardsCount: 5
}
]

export const BoardSkeleton = ({ cols = defCols, simpleCols = false, className }: Props) => {
  return (
    <div className={cn("flex gap-4 w-full p-2 overflow-hidden", className)}>
      {cols.map((el, i) => (
        simpleCols ? <div key={i} className="h-full ring-2 ring-offset-4 rounded-lg ring-border w-1/5 min-w-[250px] animate-pulse bg-gray-200"></div>
          : <BoardColSkeleton key={i} count={el.cardsCount} />
      ))}


    </div>
  );
}