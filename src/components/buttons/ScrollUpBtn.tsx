'use client'
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { throttle } from "@/lib/utils/throttle";
import { useScrollContainer } from "@/providers/ScrollProvider";
import { CircleChevronUp } from "lucide-react";
import { FC, useEffect, useState } from "react";

type TProps = ButtonProps & {
}

/**
 * A button that appears when the user scrolls down within the container,
 * and allows scrolling back to the top of the page when clicked.
 *
 * @param {TProps} props - The props passed to the button component, extending from `ButtonProps`.
 * @returns {JSX.Element | null} The ScrollUp button or null if hidden.
 */

const ScrollUpBtn: FC<TProps> = ({
  className,
  ...props
}) => {

  const [isHidden, setIsHidden] = useState(true)

  const { scrollContainerRef } = useScrollContainer()

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return

    const handleScroll = throttle(() => {
      if (scrollContainer.scrollTop >= 400) {
        setIsHidden(false)
      } else {
        setIsHidden(true)
      }
    }, 200)

    scrollContainer?.addEventListener('scroll', handleScroll);

    return () => scrollContainer?.removeEventListener('scroll', handleScroll);
  }, [scrollContainerRef])

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

export default ScrollUpBtn;