'use client'
import { CircleChevronUp } from "lucide-react";
import { FC } from "react";
import { cn } from "@/shared/lib/utils";
import { Button, ButtonProps } from "@/shared/ui/shadcn/button";
import { useScrollUpBtn } from "../hooks/useScrollUpBtn";

type TProps = ButtonProps & {
}

/**
 * A button that appears when the user scrolls down within the container,
 * and allows scrolling back to the top of the page when clicked.
 *
 * @param {TProps} props - The props passed to the button component, extending from `ButtonProps`.
 * @returns {JSX.Element | null} The ScrollUp button or null if hidden.
 */

export const ScrollUpBtn: FC<TProps> = ({
  className,
  ...props
}) => {

  const { isHidden } = useScrollUpBtn()

  if (isHidden) return null

  return (
    <Button
      {...props}
      variant={'outline'}
      className={cn(
        "p-0 border-primary w-10 aspect-square rounded-full fixed bottom-4 right-4 z-10 bg-transparent",
        "hover:bg-primary/70 [&:hover_svg]:text-white",
        className
      )}>
      <CircleChevronUp className="text-primary" />
    </Button>
  );
}
