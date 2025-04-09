import { throttle } from "@/shared/lib/throttle";
import { useScrollContainer } from "@/shared/providers/ScrollProvider";
import { useEffect, useState } from "react";

export const useScrollUpBtn = () => {
  const [isHidden, setIsHidden] = useState(true);

  const { scrollContainerRef } = useScrollContainer();

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = throttle(() => {
      if (scrollContainer.scrollTop >= 400) {
        setIsHidden(false);
      } else {
        setIsHidden(true);
      }
    }, 200);

    scrollContainer?.addEventListener("scroll", handleScroll);

    return () => scrollContainer?.removeEventListener("scroll", handleScroll);
  }, [scrollContainerRef]);

  return {
    isHidden,
  };
};
