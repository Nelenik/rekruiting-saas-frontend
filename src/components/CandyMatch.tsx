'use client'
import { EMatchStatus } from "@/shared/types";
import EditButton from "./buttons/EditButton";
import { Badge } from "./ui/badge";
import { FC, useActionState, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { matchStatusesDict } from "@/shared/dictionaries";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import ConfirmButton from "./buttons/ConfirmButotn";
import CancelButton from "./buttons/CancelButotn";
import { updateMatch } from "@/actions/updateData";
import { mutationInitialState } from "@/actions/constants";
import convertToFormData from "@/lib/utils/convertToFormData";

const matchTypeDict = {
  'sourcing': 'источник',
  'application': 'отклик'
}

const badgeColors = {
  [EMatchStatus.SCREENING]: 'ring-primary text-primary hover:text-white hover:bg-primary/70',
  [EMatchStatus.SCORING]: 'ring-yellow-400 text-yellow-400 hover:text-white hover:bg-yellow-400/70',
  [EMatchStatus.INTERVIEW]: 'ring-orange-500 text-orange-500 hover:text-white hover:bg-orange-500/70',
  [EMatchStatus.REFUSAL]: 'ring-destructive text-destructive hover:text-white hover:bg-destructive/70',
  [EMatchStatus.OFFER]: 'ring-emerald-400 text-emerald-400 hover:text-white hover:bg-emerald-400/70',
}

type TProps = {
  type: "sourcing" | "application"
  match_status: EMatchStatus;
  match_point: number;
  match_summary: string;
  cv_summary: string;
}

const CandyMatch: FC<TProps> = ({
  type,
  match_status,
  match_point,
  match_summary,
  cv_summary,
}) => {
  const [isEditing, setIsEditing] = useState(false)

  const [status, confirmAction, isPending] = useActionState(
    updateMatch,
    {
      ...mutationInitialState,
      payload: convertToFormData({ match_status })
    }
  )

  const formRef = useRef<HTMLFormElement>(null)

  const defValue = status.payload.get('match_status') as EMatchStatus

  const handleConfirm = () => {
    formRef.current?.requestSubmit()
  }

  useEffect(() => {
    if (!isPending) {
      setIsEditing(false)
    }
  }, [isPending])

  const handleCancel = () => {
    setIsEditing(false)
  }

  return (
    <div className=" flex flex-col gap-6">
      <div>
        <h2 className="scroll-m-20 text-lg font-semibold tracking-tight">
          Мэтч
        </h2>
        <table className=" text-sm text-muted-foreground table-auto">
          <tbody>
            <tr>
              <td >Тип:</td>
              <td className="px-4 py-1">
                {matchTypeDict[type]}
              </td>
            </tr>
            <tr className="group">
              <td >Статус:</td>
              <td className="px-4 py-1">
                {isEditing
                  ? <form action={confirmAction} ref={formRef}>
                    <Select defaultValue={defValue} name="match_status">
                      <SelectTrigger className="w-[180px] focus:ring-0 focus:ring-offset-0 h-8">
                        <SelectValue placeholder="Статус" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(matchStatusesDict).map(([key, value]) => (
                          <SelectItem value={key} key={key}>{value}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </form>
                  : <Badge className={cn("py-1 bg-transparent ring-1", badgeColors[defValue])}>
                    {matchStatusesDict[defValue]}
                  </Badge>
                }
              </td>
              <td>
                {isEditing
                  ? <CancelButton onClick={handleCancel} className="mr-2" />
                  : <EditButton
                    className="opacity-0 group-hover:opacity-100"
                    isIconView={true}
                    onClick={() => setIsEditing(true)}
                  />
                }
                {isEditing && <ConfirmButton onClick={handleConfirm} />}
              </td>
            </tr>
            <tr>
              <td >Балл:</td>
              <td className="px-4 py-1">
                {match_point}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <h2 className="scroll-m-20 text-lg font-semibold tracking-tight">
          Саммори по мэтчу
        </h2>
        <p className='text-muted-foreground text-sm'>
          {match_summary}
        </p>
      </div>

      <div>
        <h2 className="scroll-m-20 text-lg font-semibold tracking-tight">
          Саммори по резюме
        </h2>
        <p className='text-muted-foreground text-sm'>
          {cv_summary}
        </p>
      </div>
    </div>
  );
}

export default CandyMatch;