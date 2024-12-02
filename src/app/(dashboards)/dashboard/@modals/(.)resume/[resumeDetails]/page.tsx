"use client";
import Resume from "@/components/Pages/Resume";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

const ResumeModal = () => {
  const router = useRouter();
  return (
    <Dialog open={true} onOpenChange={() => router.back()} >
      <DialogContent className="w-[min(100%,1300px)] h-full bg-white max-w-none translate-x-0 translate-y-0 left-[unset] right-0 top-0">
        <div className="visually-hidden">
          <DialogTitle>
            Резюме
          </DialogTitle>
          <DialogDescription>
            Подробная информация о кандидате
          </DialogDescription>
        </div>
        <Resume />
      </DialogContent>
    </Dialog>
  );
}

export default ResumeModal;