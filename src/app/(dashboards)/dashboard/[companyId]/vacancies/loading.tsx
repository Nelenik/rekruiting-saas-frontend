import { BoardSkeleton } from "@/shared/ui/BoardSkeleton";
/**
 * 
 * @returns Loader skeleton for vacancies page
 */
export default function Loading() {

  return (
    <div className="flex flex-col gap-6 h-full animate-pulse">
      <div className="w-52 h-12 rounded-sm bg-gray-200 self-end"></div>
      <BoardSkeleton
        cols={[
          {
            cardsCount: 5
          },
          {
            cardsCount: 1
          },
        ]}
      />
    </div >
  )
}