'use client'
import { format } from "date-fns";
import List from "./ui/list";
import { Separator } from "./ui/separator";
import { MessageCircleMore } from "lucide-react";
import { FC, useCallback } from "react";

type TProps = {
  comments: {
    id: number;
    author: string;
    created_at: string; //iso;
    value: string;
  }[]
}

const CandyComments: FC<TProps> = ({
  comments
}) => {
  // ref callback to scroll coments to last message
  const scrollToLastComment = useCallback((node: HTMLLIElement) => {
    node?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest'
    })
  }, [])
  return (
    <div className="">
      <h2 className="scroll-m-20 text-lg font-semibold tracking-tight mb-6 flex items-center gap-2">
        <MessageCircleMore className="stroke-muted-foreground" />
        Комментарии
      </h2>
      <div className="ring-2 rounded-sm ring-offset-2 ring-primary/10">
        <List className="flex flex-col gap-6 max-h-[60vh] overflow-y-auto px-6 [&::-webkit-scrollbar]:w-[4px]" >
          <li></li>
          {comments.map((comment, i, array) => (
            <li key={comment.id} className="flex flex-col gap-2 text-sm ">
              <h3 className='font-semibold text-sm'>
                <span className="mr-3">
                  {comment.author}
                </span>
                <span>
                  {format(new Date(comment.created_at), 'dd.MM.yyyy')}
                </span>
              </h3>
              <p className="text-muted-foreground text-sm">
                {comment.value}
              </p>
              {i !== array.length - 1 && <Separator className="bg-primary/10" />}
            </li>
          ))}
          <li ref={scrollToLastComment}></li>
        </List>
      </div>
    </div>
  );
}

export default CandyComments;