'use client'
import { FC, useCallback, useRef, KeyboardEvent, useState, useEffect } from "react";
import { Send } from "lucide-react";
import SentSpinnerSvg from '@/assets/icons/spinner_send-comment.svg?rc'
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/shared/ui/shadcn/button";
import { cn } from "@/shared/lib/utils";
import { Textarea } from "@/shared/ui/shadcn/textarea";
import { storeMatchComment } from "@/shared/api/actions";
import { useMutateForm } from "@/shared/model/hooks/useMutateForm";
import { TComment } from "@/shared/api/types";

type TProps = {
  matchId: number | string
}

export const CommentsForm: FC<TProps> = ({
  matchId
}) => {
  const queryClient = useQueryClient()
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  useEffect(() => {
    setIsTouchDevice('onTouchstart' in window)
  }, [])

  const formRef = useRef<HTMLFormElement | null>(null)

  const action = storeMatchComment.bind(null, matchId)

  const { formAction, pending, defaultValues } = useMutateForm<TComment>({
    mutationAction: action,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['match-comments'] })
  })
  //Set submit on Enter when the textarea is focused
  const handleKeydown = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!isTouchDevice && e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit()
    }
  }, [isTouchDevice])

  return (
    <form
      action={formAction}
      ref={formRef}
      className={cn(
        'flex gap-2 max-h-[calc(1.2rem*4)]'
      )}
    >
      <Textarea
        placeholder="Комментировать"
        name="content"
        defaultValue={defaultValues?.content}
        className={cn(
          "ring-2 rounded-sm ring-offset-2 ring-primary/10 resize-none border-none",
          "focus-visible:ring-input"
        )}
        onKeyDown={handleKeydown}
      />
      <Button
        variant={"ghost"}
        className={cn(
          "shrink-0 p-0 w-10 h-10 rounded-full bg-primary ring-1 ring-offset-2 ring-transparent",
          'hover:bg-primary/85 hover:ring-primary/85'
        )}
      >
        {pending
          ? <SentSpinnerSvg className="text-white" />
          : <Send className="text-white" />}

      </Button>

    </form>
  );
}