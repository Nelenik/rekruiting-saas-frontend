'use client'

import { ArrowLeft } from "lucide-react";
import { Button } from "./shadcn/button";
import { useRouter } from "next/navigation";
import { cn } from "../lib/utils";
import { useEffect, useState } from "react";

type TProps = {
  className?: string
  text: string
}
export const GoBackLink = ({ className, text }: TProps) => {
  const [isPossibleBack, setIsPossibleBack] = useState(false)

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
        "flex items-center gap-1.5 font-medium text-sm text-primary underline underline-offset-4 decoration-transparent hover:decoration-current transition-colors duration-300",
        className)}
    >
      <ArrowLeft className="h-[1cap]" />
      {text}
    </Button>
  );
}