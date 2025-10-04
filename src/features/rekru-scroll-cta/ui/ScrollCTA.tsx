'use client'

import { cn } from "@/shared/lib/utils";
import { useMatchMedia } from "@/shared/model/hooks/useMatchMedia";
import { RekruCTA } from "@/shared/ui/buttons/RekruCTA";
import { Button } from "@/shared/ui/shadcn/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/shadcn/popover";
import { ArrowLeft, Check, ChevronsRight } from "lucide-react";
import { useEffect, useState } from "react";

type TProps = {
  ctaLink?: string
}
export const ScrollCTA = ({ ctaLink = '#!' }: TProps) => {
  const [shown, setShow] = useState(false)
  const [open, setOpen] = useState(true)

  const isDesktop = useMatchMedia('(min-width: 992px)')

  useEffect(() => {

    const checkScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset
      setShow(scrollY > 300)

    }

    checkScroll()

    window.addEventListener('scroll', checkScroll)

    return () => window.removeEventListener('scroll', checkScroll)

  }, [])

  if (isDesktop || !shown) return null

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}

    >
      <PopoverTrigger
        className={cn(
          'fixed bottom-8 -left-[10px] p-2 bg-background shadow-[0_2px_2px_rgba(35,112,242,4%),0_4px_6px_rgba(35,112,242,4%),0_12px_16px_rgba(35,112,242,8%)] rounded-lg', open && 'invisible'
        )}
      >
        <ChevronsRight />
      </PopoverTrigger>
      <PopoverContent
        side="right"
        sideOffset={-10}
        onOpenAutoFocus={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        className={cn(
          'flex items-center gap-12 justify-center py-3 px-5 rounded-2xl shadow-[0_2px_2px_rgba(35,112,242,4%),0_4px_6px_rgba(35,112,242,4%),0_12px_16px_rgba(35,112,242,8%)] w-[calc(100vw_-_50px)]'
        )}
      >
        <Button
          variant={'ghost'}
          onClick={() => setOpen(false)}
          className="w-10 h-10 hover:bg-unset "
        >
          <ArrowLeft />
        </Button>
        <RekruCTA
          view="dark"
          className="self-start"
          asChild
        >
          <a
            href={ctaLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Check />
            Откликнуться
          </a>


        </RekruCTA>
      </PopoverContent>
    </Popover>
  );
}