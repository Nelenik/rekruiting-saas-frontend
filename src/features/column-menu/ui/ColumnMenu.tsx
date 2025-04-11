import { Ellipsis, MoveLeft, MoveRight } from 'lucide-react';
import { FC, memo } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/shadcn/popover';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/shadcn/button';
import { StatusForm } from '@/entities/status';
import { useColumnMenu } from '../model/useColumnMenu';

type TProps = {
  className?: string
  columnId: number | string
}

/**
  * ColumnMenu component renders a menu with options for column management such as adding, editing, and deleting columns.
 * It uses a popover to display the menu options and allows users to perform actions on a specific column.
 * 
 * @param props - The props for the component.
 * @param props.className - Optional additional class name for styling the component.
 * @param props.columnId - The ID of the column to perform actions on.
 * 
 * @returns A React element representing the column menu with options.
 * 
 * @example
 * ```tsx
 * <ColumnMenu columnId={1} />
 * ```
 */

export const ColumnMenu: FC<TProps> = memo(function ColActionMenu({ columnId, className }) {

  const {
    open,
    openMenu,
    toggleMenu,
    columnInitialData,
    selectedAction,
    setSelectedAction,
    handleAddColumn,
    handleEditColumn,
    handleDeleteColumn,
  } = useColumnMenu(columnId)


  // Form content associated with different actions (add-left, add-right, edit)
  const formContent = {
    'add-left': <StatusForm
      type="add"
      onSuccess={(s) => handleAddColumn(s, 'left')}
      onCancel={() => setSelectedAction(null)}
    />,
    'add-right': <StatusForm
      type="add"
      onSuccess={(s) => handleAddColumn(s, 'right')}
      onCancel={() => setSelectedAction(null)}
    />,
    edit: <StatusForm
      type="edit"
      initialData={columnInitialData}
      onSuccess={handleEditColumn}
      onCancel={() => setSelectedAction(null)}
    />
  }


  return (
    <Popover
      open={open}
      onOpenChange={toggleMenu}
    >
      <PopoverTrigger
        onClick={openMenu}
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
              <Button variant="ghost" className="w-full justify-start" onClick={handleDeleteColumn}>Удалить</Button>
            </li>
          </ul>
        )
        }
      </PopoverContent>
    </Popover>
  )
})
