import { Ellipsis, MoveLeft, MoveRight } from 'lucide-react';
import { FC, memo, useCallback, useMemo, useState } from 'react';
import { TStatus } from '@/shared/api/types/statuses';
import { useSingleVacancy } from '@/shared/providers/SingleVacancyProvider';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/shadcn/popover';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/shadcn/button';
import { StatusForm } from '@/entities/status';

type TProps = {
  className?: string
  currentColId: number | string
}

export const ColActionMenu: FC<TProps> = memo(function ColActionMenu({ currentColId, className }) {

  const [open, setOpen] = useState(false)

  const { addColumn, deleteColumn, updateColumn, columns } = useSingleVacancy()

  const columnStatusData = useMemo(() => columns.find(item => item.id === currentColId), [columns, currentColId])

  const [selectedAction, setSelectedAction] = useState<'add-left' | 'add-right' | 'edit' | null>(null)

  const handleSuccess = useCallback((newStatus: TStatus, position: 'left' | 'right') => {
    addColumn(currentColId, newStatus, position)
    setSelectedAction(null)
    setOpen(false)
  }, [addColumn, currentColId])

  const handleEditSuccess = useCallback((statusChanges: TStatus) => {
    updateColumn(currentColId, statusChanges)
    setSelectedAction(null)
    setOpen(false)
  }, [currentColId, updateColumn])


  const handleDelete = useCallback(() => { deleteColumn(currentColId) }, [currentColId, deleteColumn])


  const formContent = {
    'add-left': <StatusForm
      type="add"
      onSuccess={(s) => handleSuccess(s, 'left')}
      onCancel={() => setSelectedAction(null)}
    />,
    'add-right': <StatusForm
      type="add"
      onSuccess={(s) => handleSuccess(s, 'right')}
      onCancel={() => setSelectedAction(null)}
    />,
    edit: <StatusForm
      type="edit"
      initialData={columnStatusData}
      onSuccess={handleEditSuccess}
      onCancel={() => setSelectedAction(null)}
    />
  }


  return (
    <Popover
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen)
        if (!isOpen) setSelectedAction(null)
      }}
    >
      <PopoverTrigger
        onClick={() => setOpen(true)}
        className={cn('rounded-full border border-transparent hover:border-primary/70 transition-colors', className)}
      >
        <Ellipsis
          className='text-muted-foreground'
          width={20}
          height={20}
        />
      </PopoverTrigger>
      <PopoverContent className='w-max p-0'>

        {selectedAction ? formContent[selectedAction] : (
          <ul className='text-muted-foreground'>
            <li>
              <Button variant="ghost" className="w-full justify-start" onClick={() => setSelectedAction('add-left')}>
                <MoveLeft />
                Добавить слева
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start" onClick={() => setSelectedAction('add-right')}>
                <MoveRight />
                Добавить справа
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start" onClick={() => setSelectedAction('edit')}>Редактировать</Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start" onClick={handleDelete}>Удалить</Button>
            </li>
          </ul>
        )
        }
      </PopoverContent>
    </Popover>
  )
})
