"use client";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
const ResumeModal = () => {
  const router = useRouter();
  return (
    <Dialog open={true} onOpenChange={() => router.back()}>
      <DialogContent className="lg:w-[700px] bg-white">
        <DialogTitle>

          This is resume modal
        </DialogTitle>
        <DialogDescription>
          Candidate info
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

export default ResumeModal;