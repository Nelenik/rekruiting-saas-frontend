'use client'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "../ui/sheet";
import { wait } from "@/lib/utils/wait";
import { createPortal } from "react-dom";

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
    // <Dialog open={open} onOpenChange={handleClose} >
    //   <DialogContent className="w-[min(100%,1300px)] h-full bg-white max-w-none ">
    //     <div className="visually-hidden">
    //       <DialogTitle>
    //         {dialogTitle}
    //       </DialogTitle>
    //       <DialogDescription>
    //         {dialogDescription}
    //       </DialogDescription>
    //     </div>
    //     {children}
    //   </DialogContent>
    // </Dialog>
    <Sheet open={open} onOpenChange={handleClose} modal={false}>
      <SheetContent className="w-[min(100%,1300px)] h-full bg-white sm:max-w-none overflow-y-auto">
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
      {open &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />,
          document.body
        )}
    </Sheet>
  );
}

export default InterceptingModal;