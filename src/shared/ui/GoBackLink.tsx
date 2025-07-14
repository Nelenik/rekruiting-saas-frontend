'use client'

import { LinkIcon } from "lucide-react";
import { Button } from "./shadcn/button";
import { useRouter } from "next/navigation";
import { cn } from "../lib/utils";
import { useEffect, useState } from "react";

type TProps = {
  className?: string
  text: string
}
export const GoBackLink = ({ className, text }: TProps) => {
  const [isPossibleBack, setIsPossibleBack] = useState(true)

  useEffect(() => {
    const isPossible = window.history.length > 1
    setIsPossibleBack(isPossible)
  }, [])

  const router = useRouter()

  const handleClick = () => {
    router.back()
  }
  if (!isPossibleBack) return null
  return (
    <Button
      onClick={handleClick}
      variant="link"
      className={cn(
        "flex items-center mb-6 font-medium text-sm text-primary/80 underline underline-offset-2 decoration-transparent hover:decoration-current transition-colors duration-300",
        className)}
    >
      {text}
      <LinkIcon className="h-[1cap]" />
    </Button>
  );
}