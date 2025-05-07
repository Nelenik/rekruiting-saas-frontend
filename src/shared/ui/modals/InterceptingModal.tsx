'use client'
import { wait } from "@/shared/lib/wait";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { SheetContent, SheetTitle, SheetDescription, Sheet, SheetClose } from "../shadcn/sheet";
import { X } from "lucide-react";

interface IInterceptingModalProps {
  children: React.ReactNode;

  dialogTitle: React.ReactNode;
  dialogDescription: React.ReactNode;
}

/**
 * `InterceptingModal` is a modal window that displays the provided content and allows 
 * the user to close the modal by using the browser's "Back" button (via `router.back()`).
 * More details on https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes#modals
 * 
 * @param {IInterceptingModalProps} props - The props for the component.
 * @param {React.ReactNode} props.dialogTitle - The title of the modal.
 * @param {React.ReactNode} props.dialogDescription - The description of the modal.
 * @param {React.ReactNode} props.children - The content to be displayed inside the modal.
 * 
 * @returns {JSX.Element} A modal window with the provided props.
 */

const InterceptingModal = ({ dialogTitle, dialogDescription, children }: IInterceptingModalProps) => {
  const [open, setOpen] = useState(true)
  const router = useRouter();
  const handleClose = useCallback(() => {
    setOpen(false)
    wait(50).then(router.back)
  }, [router.back])
  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent className="w-[min(100%,1300px)] h-full bg-white sm:max-w-none overflow-y-auto">
        <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </SheetClose>
        <div className="visually-hidden">
          <SheetTitle>
            {dialogTitle}
          </SheetTitle>
          <SheetDescription>
            {dialogDescription}
          </SheetDescription>
        </div>
        {children}
      </SheetContent>
    </Sheet>
  );
}

export default InterceptingModal;