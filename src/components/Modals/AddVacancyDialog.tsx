import { CirclePlus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

export const AddVacancyDialog = ({ className }: { className: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={cn(
            'bg-blue-700 w-max lg:w-full py-6 text-base',
            className
          )}
        >
          <CirclePlus />
          Добавить <span className="hidden sm:inline">вакансию</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Новая вакансия</DialogTitle>
          <DialogDescription>
            Заполните информаци по новой вакансии
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit" className="bg-blue-700">
            Добавить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
