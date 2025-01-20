import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import AddCompanyForm from "../Forms/AddCompanyForm";

const AddCompanyModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={cn(
            'w-max lg:w-full py-6 text-base',
          )}
        >
          Добавить организацию
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[min(100%,800px)] h-full bg-white max-w-none flex flex-col">
        <DialogTitle className="text-3xl">Добавить организацию</DialogTitle>
        <DialogDescription className="visually-hidden">
          Заполние данныее по новой компании
        </DialogDescription>

        {/* add organization/company form */}
        <AddCompanyForm />

      </DialogContent>
    </Dialog >
  );
}

export default AddCompanyModal;