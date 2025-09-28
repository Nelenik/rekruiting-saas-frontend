'use client'

import { cn } from "@/shared/lib/utils";
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

  useEffect(() => {

    const checkScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset
      setShow(scrollY > 300)

    }

    checkScroll()

    window.addEventListener('scroll', checkScroll)

    return () => window.removeEventListener('scroll', checkScroll)

  }, [])

  if (!shown) return null

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}

    >
      <PopoverTrigger
        className={cn(
          'fixed bottom-8 -left-[10px] p-2 bg-background ring ring-secondary-foreground/70 rounded-lg', 'md-lg:hidden md-lg:invisible', open && 'invisible'
        )}
      >
        <ChevronsRight />
      </PopoverTrigger>
      <PopoverContent
        side="right"
        sideOffset={-20}
        onOpenAutoFocus={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        className={cn(
          'flex items-center gap-12 justify-center py-3 px-5 rounded-3xl w-[calc(100vw_-_40px)]'
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