'use client'
import { useRef, useState } from "react"
import SpinnerTwo from '@/assets/icons/spinner2.svg?rc'
import { useSimpleUpdateMatch } from "../model/useSimpleUpdateMatch"
import { EditButton } from "@/shared/ui/buttons/EditButton"
import { CancelButton } from "@/shared/ui/buttons/CancelButton"
import { ConfirmButton } from "@/shared/ui/buttons/ConfirmButton"
import { matchTypeDict } from "@/entities/match"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/shadcn/select"
import { StatusBadge } from "@/shared/ui/StatusBadge"
import { Input } from "@/shared/ui/shadcn/input"
import { TCandidateFull } from "@/shared/api/types"
import { cn } from "@/shared/lib/utils"

type TProps = {
  matchId: number,
  type: TCandidateFull['type'],
  statusData: TCandidateFull["status"],
  match_point: TCandidateFull["point"];
  match_statuses: Pick<TCandidateFull["status"], 'id' | 'name'>[],
}
export const EditableMatchView = ({
  matchId,
  type,
  statusData,
  match_statuses,
  match_point,
}: TProps) => {

  const { isUpdating, startMatchUpd } = useSimpleUpdateMatch(matchId)
  const [isEditing, setIsEditing] = useState(false)

  const initStatusId = String(statusData.id)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startMatchUpd(formData)

    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false)
  }

  // formRef is used to trigger submitting outside the form
  const formRef = useRef<HTMLFormElement>(null)
  const handleConfirm = () => {
    formRef.current?.requestSubmit()
  }

  return (
    <div className="relative">

      {/* edit, confirm, cancel btns and spinner */}
      <span className="absolute top-0 right-1/4 text-[0px]">
        {!isEditing && !isUpdating && <EditButton
          className="p-0.5 h-max aspect-square"
          isIconView={true}
          onClick={() => setIsEditing(true)}
        />}

        {isEditing && !isUpdating && <>
          <CancelButton onClick={handleCancel} />
          <ConfirmButton onClick={handleConfirm} />
        </>}

        {!isEditing && isUpdating && <SpinnerTwo className="fill-primary/70 w-4 inline-block" />}
      </span>

      <h2 className="scroll-m-20 text-lg font-semibold tracking-tight">
        Мэтч
      </h2>
      <form onSubmit={handleSubmit} ref={formRef}>
        <table className=" text-sm text-muted-foreground table-auto">
          <tbody>
            <tr>
              <td >Тип:</td>
              <td className="px-4 py-1">
                {matchTypeDict[type]}
              </td>
            </tr>
            <tr>
              <td >Статус:</td>
              <td className="px-4 py-1">
                {isEditing
                  ? <Select
                    name="status_id"
                    defaultValue={initStatusId}
                  >
                    <SelectTrigger className="w-[180px] focus:ring-0 focus:ring-offset-0 h-7" >
                      <SelectValue placeholder="Статус" />
                    </SelectTrigger>
                    <SelectContent>
                      {match_statuses.map((status) => (
                        <SelectItem key={status.id} value={String(status.id)}>
                          {status.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  : <StatusBadge
                    color={statusData.color}
                    className={cn(
                      'py-[5px] px-2'
                    )}
                  >
                    {statusData.name}
                  </StatusBadge>
                }

              </td>
            </tr>
            <tr>
              <td >Балл:</td>
              <td className="px-4 py-1">
                {isEditing ?
                  <Input
                    placeholder={String(match_point)}
                    className="w-[180px] focus-visible:ring-0 [&:not(.ring-destructive)]:focus-visible:ring-offset-0 h-7 bg-transparent focus-visible:bg-indigo-50"
                    name="point"
                  />
                  : <>{match_point}</>}

              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}