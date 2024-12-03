"use client";
import Resume from "@/components/Pages/Resume";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

const ResumeModal = () => {
  const router = useRouter();
  return (
    <Dialog open={true} onOpenChange={() => router.back()} >
      <DialogContent className="w-[min(100%,1300px)] h-full bg-white max-w-none ">
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