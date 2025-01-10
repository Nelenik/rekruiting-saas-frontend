'use client'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import React from "react";

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
  const router = useRouter();
  return (
    <Dialog open={true} onOpenChange={() => router.back()} >
      <DialogContent className="w-[min(100%,1300px)] h-full bg-white max-w-none ">
        <div className="visually-hidden">
          <DialogTitle>
            {dialogTitle}
          </DialogTitle>
          <DialogDescription>
            {dialogDescription}
          </DialogDescription>
        </div>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default InterceptingModal;